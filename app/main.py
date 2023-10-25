from typing import Optional, Dict, Any

import requests
import http
from flask import (
    request,
    json,
    current_app,
    redirect,
    render_template,
    Blueprint,
)


def validate_user(user_id: int, user_token: str) -> Optional[Dict[str, Any]]:
    response = requests.post(current_app.get_service_url('validate'), json={'token': user_token})
    payload = json.loads(response.text)
    print(payload)
    if payload['status'] == http.HTTPStatus.OK and payload['userId'] == user_id:
        return payload


bp = Blueprint('main', __name__)


@bp.route('/')
def index():
    user_id = int(request.cookies.get('_id', 0))
    user_token = request.cookies.get('_token', '')

    user = validate_user(user_id, user_token)
    if user is not None:
        return render_template('index.html', **user)

    return redirect('/login')
