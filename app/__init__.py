from flask import Flask

from config import DevConfig


def get_service_url(config_class: object = DevConfig, path: str = None) -> str:
    return "http://{0}:{1}{2}".format(
        config_class.API_HOST,
        config_class.API_PORT,
        path,
    )


def create_app(config_class=DevConfig):
    app = Flask(__name__)
    app.config.from_object(config_class)
    app.get_service_url = lambda type: get_service_url(config_class, type)

    # Initialize Flask extensions here

    # Register blueprints here
    with app.app_context():
        from app.main import bp as main_bp
        from app.user import bp as user_bp
        from app.chat import bp as chat_bp
        app.register_blueprint(main_bp)
        app.register_blueprint(user_bp)
        app.register_blueprint(chat_bp)

    return app
