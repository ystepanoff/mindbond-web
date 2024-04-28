from .base import Config


class DevConfig(Config):
    DEBUG = True
    TESTING = True
    SECRET_KEY = ''
    API_HOST = 'localhost'
    API_PORT = 3000
    WS_HOST = 'localhost'
    WS_PORT = 50054
