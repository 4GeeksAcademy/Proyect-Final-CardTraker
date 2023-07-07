from ssl import ALERT_DESCRIPTION_ACCESS_DENIED
from flask import Flask, request, jsonify, url_for, Blueprint, flash, redirect
from api.models import db, User
from api.utils import generate_sitemap, APIException
from flask_jwt_extended import create_access_token, get_jwt_identity, jwt_required
from flask_login import login_required, current_user
from flask_mail import Message 
import random, string, os
from extensions import mail

api = Blueprint('api', __name__)

# //////////////////////LOGIN & REGISTRO/////////////////////////

#Creacion de usuario, Registro
@api.route('/signup' , methods=['POST'])
def sign_up():
    body = request.get_json()
    user = User.query.filter_by(email=body["email"]).first()

    if user == None:
        new_user = User(email = body["email"], user_name = body["user_name"], password = body["password"], is_admin = False)
        db.session.add(new_user)
        db.session.commit()

        response_body = {
            "message": "Se creo un nuevo usuario con existo.",
            "flash_message": "Se ha creado usuario con exito"
        }
        return jsonify(response_body), 200
    

    response_body = {
            "message": "Ya existe el usuario que intenta crear",
            "flash_message": "Ya existe este usuario"
        }
    return jsonify(response_body), 401

#Recupera todos los usuarios creados.
@api.route('/user', methods=['GET'])
def get_users():
    all_users = User.query.all()
    result = list(map(lambda item: item.serialize(), all_users))
    return jsonify(result), 200

# Elimina un usuario registrado
@api.route('/user/<int:user_id>', methods=['DELETE'])
@login_required
def delete_user(user_id):
    user = User.query.filter_by(id=user_id).first()
    db.session.delete(user)
    db.session.commit()

    return jsonify({'message': 'The user has been succesfully deleted'}),200

# LOGIN Autenticacion.
@api.route("/login", methods=["POST"])
def login():
    email = request.json.get("email", None)
    password = request.json.get("password", None)
    user = User.query.filter_by(email=email).first() #Valida que existe un usuario en la base de datos que estoy manejando
    
    if user is None or email != user.email or password != user.password:
        flash("Incorrect username or password", "error")
        return jsonify({"msg": "Incorrect username or password"}), 401
    
    access_token = create_access_token(identity=email)
    return jsonify({
        "access_token":access_token,
        "user":user.serialize()
        })


# //////////////////////RECUPERACION DE CONTRASENA/////////////////////////


#Funcion que manda el correo.
def send_reset_email (user):
    token = user.token
    msg = Message('Password reset request', 
                sender='noreply@demo.com',
                recipients=[user.email])
    msg.body = f'''To reset your password visit the following link:

{os.getenv('FRONTEND_URL')+"reset_password/"+token}

Si tu no hiciste este requerimiento por favor ignora este mensaje.
    '''
    mail.send(msg)
    return 200

#Funcion genera Token random
def get_random_token():
    source = string.ascii_letters + string.digits
    token = ''.join((random.choice(source) for i in range(24)))
    return token

#Solicitud de cambio de contrasena
@api.route("/request_reset", methods=["GET","POST"])
def reset_request():
    email = request.json.get("email", None)
    user = User.query.filter_by(email=email).first()
    if user is None:
        response_body = {
            "message": "No existe ese usuario.",
            "flash_message": "No existe este usuario, debe registrarse primero."
        }
        return jsonify(response_body), 401
    token = get_random_token()
    user.token = token  # Set the token value for the user
    db.session.commit()  # Commit the changes to the database
    
    resp = send_reset_email(user)
    if resp == 200:
        response_body = {
                "message": "Correo enviado con exito.",
                "flash_message": "Un correo ha sido enviado a su email."
            }
        return jsonify(response_body), 200
    return "Error al enviar el correo."

# Validacion del Token
@api.route("/validate_token/<token>", methods=["GET"])
def validate_token(token):
    user = User.query.filter_by(token=token).first()
    if user is None:
        # flash('Tu token esta inavilidado.','warning')
        return jsonify({"valid_token": False}), 401
    return jsonify({"valid_token": True}), 200

# Recuperacion de la contrasena
@api.route("/request_reset/<token>", methods=["GET", "POST"])
def reset_password(token):
    user = User.query.filter_by(token=token).first()
    if user is None:
        flash("Invalid token.")
        return jsonify({"msg": "Invalid token."}), 401
    else:
        password = request.json.get("password", None)
        user.password = password
        user.token = ''
        db.session.commit()  # Commit the changes to the database  
        response_body = {
                "message": "Su contraseña ha sido cambiada con exito.",
                "flash_message": "Su contraseña ha sido cambiada con exito."
            }
        return jsonify(response_body), 200

# Protect a route with jwt_required, which will kick out requests
# without a valid JWT present.
@api.route("/private", methods=["GET"])
@jwt_required()
def protected():
    # Access the identity of the current user with get_jwt_identity
    current_user = get_jwt_identity()
    return jsonify(logged_in_as=current_user), 200

if __name__ == "__main__":
    api.run()
