from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User, Cards
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
            "message": "Se creo un nuevo usuario con exito."
        }
        return jsonify(response_body), 200
    
    response_body = {
            "message": "Ya existe el usuario que intenta crear"
        }
    return jsonify(response_body), 200


#Recupera todos los usuarios creados.
@api.route('/user', methods=['GET'])
def get_users():
    all_users = User.query.all()
    result = list(map(lambda item: item.serialize(), all_users))
    return jsonify(result), 200

#Autenticacion.
@api.route("/login", methods=["POST"])
def login():
    email = request.json.get("email", None)
    password = request.json.get("password", None)
    user = User.query.filter_by(email=email).first() #Valida que existe un usuario en la base de datos que estoy manejando
    
    if user == None:
        return jsonify({"msg": "Incorrect username or password"}), 401
    
    if email != user.email or password != user.password:
        return jsonify({"msg": "Incorrect username or password"}), 401
    
    access_token = create_access_token(identity=email)
    print(access_token)
    return jsonify({
        "access_token":access_token,
        "user":user.serialize()
        })
   

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

#Llama todas las tarjetas OK
@api.route('/cards', methods=['GET'])
def get_cards():
    all_cards = Cards.query.all()
    print(all_cards)
    result = list(map(lambda card: card.serialize() ,all_cards))
    print(result)    

    return jsonify(result), 200

#Llama una sola tarjeta OK
@api.route('/cards/<int:card_id>', methods=['GET'])
def get_card(card_id):
    card=Cards.query.filter_by(id=card_id).first()

    return jsonify(card.serialize()), 200

#Crea una nueva tarjeta OK

@api.route('/cards', methods=['POST'])
def create_new_card():
    
    print(request.get_json()["card_provider"])

    card_body=request.get_json()
    new_card=Cards(card_provider=card_body["card_provider"],last_four=card_body["last_four"], bank_name=card_body["bank_name"], card_user_id=card_body["card_user_id"])
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