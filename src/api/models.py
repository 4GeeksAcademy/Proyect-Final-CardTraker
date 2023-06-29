from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(80), unique=False, nullable=False)
    is_active = db.Column(db.Boolean(), unique=False, nullable=False)

    def __repr__(self):
        return f'<User {self.email}>'

    def serialize(self):
        return {
            "id": self.id,
            "email": self.email,
            # do not serialize the password, its a security breach
        }

class Stablishments(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    stablishments_name = db.Column(db.String(120), unique=True, nullable=False)
    stablishments_links = db.Column(db.String(80), unique=False, nullable=False)
    status = db.Column(db.Boolean(), unique=False, nullable=False)

    def __repr__(self):
        return f'<Stablishments {self.stablishments}>'

    def serialize(self):
        return {
            "id": self.id,
            "stablishment": self.stablishments_name,
        }    