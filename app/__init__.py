from flask import Flask

from config import DevConfig

def create_app(config_class=DevConfig):
    app = Flask(__name__)
    app.config.from_object(config_class)
    app.service_url = lambda path: f"http://{config_class.API_HOST}:{config_class.API_PORT}{path}"
    app.ws_endpoint = f"ws://{app.config['WS_HOST']}:{app.config['WS_PORT']}"

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
