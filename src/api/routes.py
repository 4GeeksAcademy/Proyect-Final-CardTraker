"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User, Cards
from api.utils import generate_sitemap, APIException

api = Blueprint('api', __name__)



@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():

    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }

    return jsonify(response_body), 200

@api.route('/cards', methods=['GET'])
def hande_hello():
    all_cards = Cards.query.all()
    print(all_cards)
    result = list(map(lambda card: card.serialize() ,all_cards))
    print(result)    

    return jsonify(result), 200

@api.route('/cards', methods=['POST'])
def create_new_card():
    
    print(request.get_json())
    
    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }

    
    return jsonify(response_body)