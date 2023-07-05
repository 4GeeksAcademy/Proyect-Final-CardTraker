from flask_sqlalchemy import SQLAlchemy
# from itsdangerous import TimedSerializer as Serializer

db = SQLAlchemy()

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), unique=True, nullable=False)
    user_name = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(80), unique=False, nullable=False)
    is_admin = db.Column(db.Boolean(), unique=False, nullable=False)

    # def get_reset_token(self,expires_sec=1800):
    #     s = Serializer(app.)
    
    # def verify_reset_token(token):
    #     s = Serializer(app.config['SECRET KEY'])

    def __repr__(self):
        return f'<User {self.email}>'

    def serialize(self):
        return {
            "id": self.id,
            "email": self.email,
            "user name": self.user_name,
            # do not serialize the password, its a security breach
        }