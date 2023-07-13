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
    
class Stablishments(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    stablishments_name = db.Column(db.String(120), unique=True, nullable=False)
    stablishments_links = db.Column(db.String(80), unique=False, nullable=False)
    status = db.Column(db.Boolean(), unique=False, nullable=False)

    def __repr__(self):
        return f'<Stablishments {self.stablishments_name}>'

    def serialize(self):
        return {
            "id": self.id,
            "stablishments": self.stablishments_name,
            "links": self.stablishments_links   
        }         