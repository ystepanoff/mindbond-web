import http

import requests
import orjson as json

from flask import (
    current_app,
    request,
    redirect,
    render_template,
    make_response,
    flash,
    Blueprint,
)

from .main import validate_user

bp = Blueprint('chat', __name__)

@bp.route('/chats', methods=['GET', 'POST'])
def chats():
    user_id = int(request.cookies.get('_id', 0))
    user_token = request.cookies.get('_token', '')

    user = validate_user(user_id, user_token)
    if user is None:
        return redirect('/login')

    if request.method == 'POST':
        pass

    return render_template('chat/chats.html', **user)
