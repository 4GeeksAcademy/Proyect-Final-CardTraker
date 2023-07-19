from flask import Flask, request, jsonify, url_for, Blueprint, flash, redirect
from sqlalchemy import or_
from api.models import db, User, Cards, UserStablishments, Stablishments
from api.utils import generate_sitemap, APIException
from flask_jwt_extended import create_access_token, get_jwt_identity, jwt_required, decode_token
from flask_login import login_required, current_user
from flask_mail import Message 
import random, string, os
from extensions import mail
from flask_cors import CORS, cross_origin

api = Blueprint('api', __name__)
CORS(api)

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
            "message": "Se creo un nuevo usuario con exito.",
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

#LOGIN Autenticacion.
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


#Llama todas las tarjetas OK
@api.route('/cards', methods=['GET'])
@jwt_required()
def get_cards():
    # Access the identity of the current user with get_jwt_identity
    current_user = get_jwt_identity()    
    user=User.query.filter_by(email=current_user).first()
    all_cards = Cards.query.filter_by(card_user_id=user.id).all()
    print(all_cards)
    result = list(map(lambda card: card.serialize() ,all_cards))
    print(result)   
    return jsonify(result), 200  

   

#Llama una sola tarjeta OK
@api.route('/cards/<int:card_id>', methods=['GET'])
def get_card(card_id):
    card=Cards.query.filter_by(id=card_id).first()

    return jsonify(card.serialize()), 200


#Decodifica el codigo para obtener el ID
def getid(token):
    decoded_token = decode_token(token)
    user_email = decoded_token["sub"]
    print(user_email)
    user = User.query.filter_by(email=user_email).first()
    user_id = user.id
    return user_id

#Crea una nueva tarjeta OK
@api.route('/cards', methods=['POST'])
def create_new_card():    
    
    print(request.get_json()["card_provider"])
    token=request.json.get("token", None)
    user_id=getid(token)
    card_body=request.get_json()
    new_card=Cards(card_provider=card_body["card_provider"],last_four=card_body["last_four"], bank_name=card_body["bank_name"], card_user_id=user_id)
    db.session.add(new_card)
    db.session.commit()
    
    response_body = {
        "message": "Se crea una nueva tarjeta"
    }
    
    return jsonify(response_body)

#Borra una tarjeta OK
@api.route('/cards/<int:card_id>', methods=['DELETE'])
def delete_card(card_id):
    card=Cards.query.filter_by(id=card_id).first()    
    db.session.delete(card)
    db.session.commit()  
    
    response_body = {
        "message": "Se BORRA una tarjeta"
    }

    
    return jsonify(response_body)


#Llama todas las tarjetas y su relación con establecimientos OK
@api.route('/card_stab', methods=['GET'])
def get_cards_stab():
    all_cards_stab = UserStablishments.query.all()
    print(all_cards_stab)
    result = list(map(lambda cardstb: cardstb.serialize() ,all_cards_stab))
    print(result)    

    return jsonify(result), 200

# Genera una nueva relación entre tarjetas y establecimientos OK 
@api.route('/card_stab', methods=['POST'])
@cross_origin()
def create_new_stb_card():    
    
    # print(request.get_json()["card_stablishments"])
    # token=request.json.get("token", None)
    # user_id=getid(token)
    card_stb_body=request.get_json()
    new_card=UserStablishments(card=card_stb_body["card"],stablishment=card_stb_body["stablishment"])
    db.session.add(new_card)
    db.session.commit()
    
    response_body = {
        "message": "Se crea una nueva relacion tarjeta-establecimiento"
    }
    
    return jsonify(response_body)

#Borra una relacion tarjeta-establecimiento OK
@api.route('/card_stab/<int:cardstb_id>', methods=['DELETE'])
def delete_stb_card(cardstb_id):
    cardstb=UserStablishments.query.filter_by(id=cardstb_id).first()    
    db.session.delete(cardstb)
    db.session.commit()  
    
    response_body = {
        "message": "Se BORRA una relacion"
    }

    
    return jsonify(response_body)


#Llama los establecimientos
@api.route('/stablishments', methods=['GET'])
def get_all_stablishments():
    all_stablishments = Stablishments.query.all()
    print(all_stablishments)
    result = list(map(lambda item: item.serialize(), all_stablishments))
    return jsonify(result), 200

@api.route('/stablishments', methods=['POST'])
def create_stablishment():
    name = request.get_json()["name"]
    links = request.get_json()["links"]
    record_exist = Stablishments.query.filter(or_(Stablishments.stablishments_name == name, Stablishments.stablishments_links == links) ).first()
    if record_exist is None:
        new_stablishment = Stablishments (stablishments_name = name, stablishments_links = links, status = True)
        db.session.add(new_stablishment)
        db.session.commit()
        return jsonify({"msg" : "el establecimiento agregado con exito"}), 200
    else:
        return jsonify({"msg" : "el establecimeinto ya existe"}), 409

@api.route('/stablishments/<int:stablishments_id>', methods=['DELETE'])
def delete_stablishments(stablishments_id):
    remove_Stablishments=Stablishments.query.filter_by(id=stablishments_id).first()
    db.session.delete(remove_Stablishments)
    db.session.commit()
    response_body = {
        "message": "Stablishment Deleted"
        }
    return jsonify(response_body), 200









if __name__ == "__main__":
    api.run()