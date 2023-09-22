from typing import Tuple

import requests
import orjson as json

from flask import (
	current_app,
	request,
	redirect,
	render_template,
	Blueprint,
)

AUTH_URL = "http://{0}:{1}{2}".format(
	current_app.config['API_HOST'],
	current_app.config['API_PORT'],
	current_app.config['PATHS']['login'],
)

bp = Blueprint('auth', __name__)


@bp.route('/login', methods=['GET', 'POST'])
def login():
	if request.method == 'POST':
		data = {
			'email': request.form.get('email', ''),
			'password': request.form.get('password', ''),
		}
		print(data)
		response = requests.post(AUTH_URL, json=data)
		if response.status_code == 200:
			return response.text
		else:
			return str(response.text)
	return render_template('main/login.html')
