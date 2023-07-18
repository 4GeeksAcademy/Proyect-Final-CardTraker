from flask_sqlalchemy import SQLAlchemy
# from itsdangerous import URLSafeTimedSerializer as Serializer

db = SQLAlchemy()

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), unique=True, nullable=False)
    user_name = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(80), unique=False, nullable=False)
    is_admin = db.Column(db.Boolean(), unique=False, nullable=False)
    token = db.Column(db.String(60), nullable=True, default='')
    cards = db.relationship('Cards', backref='user', lazy=True)

    def __repr__(self):
        return f'<User {self.email}>'

    def serialize(self):
        return {
            "id": self.id,
            "email": self.email,
            "user_name": self.user_name,
            # do not serialize the password, its a security breach
        }
    
#DB de Establecimientos como Usuario

class UserStablishments(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    card=db.Column(db.Integer, db.ForeignKey('cards.id'), nullable=False)
    stablishment=db.Column(db.Integer, db.ForeignKey('stablishments.id'), nullable=False)

    def __repr__(self):
        return f'<UserStablishments {self.id}>'

    def serialize(self):
        return {
            "id": self.id,            
            "card":self.card,
            "stablishment":self.stablishment,                    
            # do not serialize the password, its a security breach
        }
#DB Tarjetas
class Cards(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    card_provider = db.Column(db.String(120), nullable=False)
    last_four = db.Column(db.Integer(), nullable=False)
    bank_name = db.Column(db.String(), nullable=False)    
    card_user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    usr_stb= db.relationship('UserStablishments', backref='cards', lazy=True)   

    def __repr__(self):
        return f'<Cards {self.id}>'

    def serialize(self):
        return {
            "id": self.id,            
            "card_provider":self.card_provider,
            "last_four":self.last_four,
            "bank_name":self.bank_name,
            "card_user_id":self.card_user_id            
            # do not serialize the password, its a security breach
        }
    
# DB de Establecimientos como Admin
class Stablishments(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    stablishments_name = db.Column(db.String(120), unique=True, nullable=False)
    stablishments_links = db.Column(db.String(80), unique=False, nullable=False)
    status = db.Column(db.Boolean(), unique=False, nullable=False)
    usr_stb= db.relationship('UserStablishments', backref='stablishments', lazy=True)
    # tags = db.relationship('Cards', secondary=user_stablishments, backref='stablishments')

    def __repr__(self):
        return f'<Stablishments {self.stablishments_name, self.stablishments_links}>'

    def serialize(self):
        return {
            "id": self.id,
            "stablishments": self.stablishments_name,
            "links": self.stablishments_links,   
        }         
            

