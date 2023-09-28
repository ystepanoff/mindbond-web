from flask import Flask

from config import DevConfig


def get_service_url(config_class: object = DevConfig, type: str = None) -> str:
    return "http://{0}:{1}{2}".format(
        config_class.API_HOST,
        config_class.API_PORT,
        config_class.PATHS[type],
    )


def create_app(config_class=DevConfig):
    app = Flask(__name__)
    app.config.from_object(config_class)
    app.get_service_url = lambda type: get_service_url(config_class, type)

    # Initialize Flask extensions here

    # Register blueprints here
    with app.app_context():
        from app.main import bp as main_bp
        from app.auth import bp as auth_bp
        app.register_blueprint(main_bp)
        app.register_blueprint(auth_bp)

    return app
