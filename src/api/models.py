from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), unique=True, nullable=False)
    user_name = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(80), unique=False, nullable=False)
    is_admin = db.Column(db.Boolean(), unique=False, nullable=False)

    def __repr__(self):
        return f'<User {self.email}>'

    def serialize(self):
        return {
            "id": self.id,
            "email": self.email,
            "user name": self.user_name,
            # do not serialize the password, its a security breach
        }

class Cards(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    card_provider = db.Column(db.String(120), unique=True, nullable=False)
    last_four = db.Column(db.Integer(), unique=True, nullable=False)
    bank_name = db.Column(db.String(), unique=True, nullable=False)
    user_id = db.Column(db.Integer(), nullable=False)

    def __repr__(self):
        return f'<Cards {self.id}>'

    def serialize(self):
        return {
            "id": self.id,            
            "card_provider":self.card_provider,
            "last_four":self.last_four,
            "bank_name":self.bank_name,
            "user_id":self.user_id            
            # do not serialize the password, its a security breach
        }