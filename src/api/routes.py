from flask import Flask, request, jsonify, url_for, Blueprint
from sqlalchemy import or_
from api.models import db, User, Stablishments
from api.utils import generate_sitemap, APIException
from flask_jwt_extended import create_access_token, get_jwt_identity, jwt_required

api = Blueprint('api', __name__)

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
# @login_required
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

#Recuperacion de la contraseña
@api.route("/reset_password", methods=["GET","POST"])
def reset_request():
    email = request.json.get("email", None)
    user = User.query.filter_by(email=email).first()
    if user :
        flash('Se ha mandado el correo, revisa tu bandeja de entrada.',)
        # send_mail();



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

@api.route('/stablishments', methods=['GET'])
def get_all_stablishments():
    all_stablishments = Stablishments.query.all()
    print(all_stablishments)
    result = list(map(lambda item: item.serialize(), all_stablishments))
    return jsonify(result), 200

@api.route('/stablishments', methods=['POST']) 
def create_stablishment():
    name = request.get_json()["name"]
    link = request.get_json()["link"]
    record_exist = Stablishments.query.filter(or_(Stablishments.stablishments_name == name, Stablishments.stablishments_links == link) ).first()
    if record_exist is None: 
        new_stablishment = Stablishments (stablishments_name = name, stablishments_links = link, status = True)
        db.session.add(new_stablishment)
        db.session.commit()
    
        return jsonify({"msg" : "el establecimiento agregado con exito"}), 200
    
    else: 
        return jsonify({"msg" : "el establecimeinto ya existe"}), 409
    
@api.route('/stablishments/<int:stablishments_id>', methods=['DELETE'])
def delete_stablishments(stablishments_id):
    stablishments = Stablishments.query.get(stablishments_id)
    db.session.delete(stablishments)
    db.session.commit()
    return jsonify({"msg" : "The stablishment has been deleted"}), 100
    

        
    
    



