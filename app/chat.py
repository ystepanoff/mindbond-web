import http
import json
from typing import Union

import requests
from flask import (
    current_app,
    request,
    redirect,
    render_template,
    make_response,
    flash,
    Blueprint,
)
from werkzeug.wrappers import Response

from .main import validate_user

bp = Blueprint('chat', __name__)


@bp.route('/chats', methods=['GET', 'POST'])
def chats() -> Union[Response, str]:
    user_id = int(request.cookies.get('_id', 0))
    user_token = request.cookies.get('_token', '')

    user = validate_user(user_id, user_token)
    if user is None:
        return redirect('/login')

    if request.method == 'POST':
        pass

    return render_template('chat/chats.html', **user, ws_endpoint=current_app.ws_endpoint)


@bp.route('/chats/add_contact', methods=['POST'])
def add_contact() -> Union[Response, str]:
    user_id = int(request.cookies.get('_id', 0))
    user_token = request.cookies.get('_token', '')

    user = validate_user(user_id, user_token)
    if user is None:
        return json.dumps({'status': http.HTTPStatus.UNAUTHORIZED, 'error': 'Unauthorized'})

    request_data = json.loads(request.data.decode('utf-8'))

    data = {
        'userId': user_id,
        'token': user_token,
        'handle': request_data.get('handle', ''),
    }
    response = requests.post(
        current_app.service_url('/chat/add_contact'),
        headers={'Authorization': f'Bearer {user_token}'},
        json=data,
    )

    response_data = json.loads(response.text)

    if response_data['status'] == http.HTTPStatus.CREATED:
        return json.dumps({'status': http.HTTPStatus.CREATED})

    return json.dumps({'status': response_data['status'], 'error': response_data['error']})
