import traceback

from flask import (
    request,
    jsonify,
    json,
    current_app,
    redirect,
    Blueprint,
)
from flask_jwt_extended import (
    jwt_required,
    verify_jwt_in_request,
    get_jwt_identity,
    JWTManager,
)
from flask_jwt_extended.exceptions import NoAuthorizationError

bp = Blueprint('main', __name__)

jwt = JWTManager(current_app)
jwt._set_error_handler_callbacks(current_app)


@bp.route('/')
def index():
    current_user = None
    try:
        verify_jwt_in_request()
        current_user = get_jwt_identity()
        return str(current_user)
    except NoAuthorizationError:
        pass

    return 'not logged in'
