import traceback

from flask import (
    request,
    jsonify,
    json,
    current_app,
    redirect,
    Blueprint,
    make_response,
)

bp = Blueprint('main', __name__)


@bp.route('/')
def index():
    user_id = request.cookies.get('_id')
    user_token = request.cookies.get('_token')

    if (
        user_id is not None and
        user_token is not None
    ):
        return user_id

    return redirect('/login')
