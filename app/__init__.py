from flask import Flask

from config import DevConfig

def create_app(config_class=DevConfig):
	app = Flask(__name__)
	app.config.from_object(config_class)

	# Initialize Flask extensions here

	# Register blueprints here
	with app.app_context():
		from app.main import bp as main_bp
		from app.auth import bp as auth_bp
		app.register_blueprint(main_bp)
		app.register_blueprint(auth_bp)

	return app
