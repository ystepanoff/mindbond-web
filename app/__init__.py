import os
from flask import Flask
from flask_login import LoginManager

basedir = os.path.abspath(os.path.dirname(__file__))

app = Flask(__name__)
app.config.from_object('app.config.Config')

login_manager = None

# login_manager = LoginManager()
# login_manager.init_app(app)

from app import views
