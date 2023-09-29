from typing import Tuple
import http

import requests
import orjson as json

from flask import (
    current_app,
    request,
    redirect,
    render_template,
    flash,
    Blueprint,
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
        response = requests.post(current_app.get_service_url('login'), json=data)
        if response.status_code == http.HTTPStatus.OK:
            return response.text
        else:
            return str(response.text)
    return render_template('auth/login.html')


@bp.route('/signup', methods=['GET', 'POST'])
def signup():
    if request.method == 'POST':
        email = request.form.get('email')
        password = request.form.get('password')
        confirm_password = request.form.get('confirm_password')
        if password == confirm_password:
            data = {
                'email': email,
                'password': password,
            }
            response = requests.post(current_app.get_service_url('signup'), json=data)
            payload = json.loads(response.text)
            if response.status_code == http.HTTPStatus.CREATED:
                flash("Successfully registered. You may log in now.")
                return redirect('/login')
            else:
                flash(f"{payload['status']}: {payload['error']}")
        else:
            flash('Passwords do not match')
    return render_template('auth/signup.html')
