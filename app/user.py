from typing import Union

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
from werkzeug.wrappers import Response

from .main import validate_user

LANGUAGE_CODES = ['af', 'sq', 'am', 'ar', 'an', 'hy', 'ast', 'az', 'eu', 'be', 'bn', 'bs', 'br', 'bg', 'ca', 'ckb',
                  'zh', 'zh-HK', 'zh-CN', 'zh-TW', 'co', 'hr', 'cs', 'da', 'nl', 'en', 'en-AU', 'en-CA', 'en-IN',
                  'en-NZ', 'en-ZA', 'en-GB', 'en-US', 'eo', 'et', 'fo', 'fil', 'fi', 'fr', 'fr-CA', 'fr-FR', 'fr-CH',
                  'gl', 'ka', 'de', 'de-AT', 'de-DE', 'de-LI', 'de-CH', 'el', 'gn', 'gu', 'ha', 'haw', 'he', 'hi', 'hu',
                  'is', 'id', 'ia', 'ga', 'it', 'it-IT', 'it-CH', 'ja', 'kn', 'kk', 'km', 'ko', 'ku', 'ky', 'lo', 'la',
                  'lv', 'ln', 'lt', 'mk', 'ms', 'ml', 'mt', 'mr', 'mn', 'ne', 'no', 'nb', 'nn', 'oc', 'or', 'om', 'ps',
                  'fa', 'pl', 'pt', 'pt-BR', 'pt-PT', 'pa', 'qu', 'ro', 'mo', 'rm', 'ru', 'gd', 'sr', 'sh', 'sn', 'sd',
                  'si', 'sk', 'sl', 'so', 'st', 'es', 'es-AR', 'es-419', 'es-MX', 'es-ES', 'es-US', 'su', 'sw', 'sv',
                  'tg', 'ta', 'tt', 'te', 'th', 'ti', 'to', 'tr', 'tk', 'tw', 'uk', 'ur', 'ug', 'uz', 'vi', 'wa', 'cy',
                  'fy', 'xh', 'yi', 'yo', 'zu']

bp = Blueprint('user', __name__)


@bp.route('/login', methods=['GET', 'POST'])
def login() -> Union[Response, str]:
    if request.method == 'POST':
        data = {
            'email': request.form.get('email', ''),
            'password': request.form.get('password', ''),
        }
        response = requests.post(current_app.get_service_url('/auth/login'), json=data)
        payload = json.loads(response.text)
        if payload['status'] == http.HTTPStatus.OK:
            user_id = payload['userId']
            user_token = payload['token']
            response = make_response(redirect('/'))
            response.set_cookie('_id', str(user_id))
            response.set_cookie('_token', user_token)
            return response
        else:
            flash(f"{payload['status']}: {payload['error']}")
    return render_template('user/login.html')


@bp.route('/logout', methods=['GET', 'POST'])
def logout() -> Union[Response, str]:
    user_id = int(request.cookies.get('_id', 0))
    user_token = request.cookies.get('_token', '')
    if validate_user(user_id, user_token):
        data = {
            'id': user_id,
            'token': user_token,
        }
        requests.post(current_app.get_service_url('/auth/logout'), json=data)
    return redirect('/login')


@bp.route('/signup', methods=['GET', 'POST'])
def signup() -> Union[Response, str]:
    if request.method == 'POST':
        email = request.form.get('email')
        password = request.form.get('password')
        confirm_password = request.form.get('confirm_password')
        handle = request.form.get('handle')
        language = request.form.get('language')
        if language not in LANGUAGE_CODES:
            flash('Please specify a correct language code.')
        elif password != confirm_password:
            flash('Passwords do not match')
        else:
            data = {
                'email': email,
                'password': password,
                'handle': handle,
                'language': language,
            }
            response = requests.post(current_app.get_service_url('/auth/register'), json=data)
            payload = json.loads(response.text)
            if payload['status'] == http.HTTPStatus.CREATED:
                flash("Successfully registered. You may log in now.")
                return redirect('/login')
            else:
                flash(f"{payload['status']}: {payload['error']}")
    return render_template('user/signup.html')


@bp.route('/settings', methods=['GET', 'POST'])
def settings() -> Union[Response, str]:
    user_id = int(request.cookies.get('_id', 0))
    user_token = request.cookies.get('_token', '')
    user = validate_user(user_id, user_token)
    if user is None:
        return redirect('/login')
    if request.method == 'POST':
        email = request.form.get('email')
        current_password = request.form.get('current_password')
        new_password = request.form.get('new_password')
        confirm_new_password = request.form.get('confirm_new_password')
        handle = request.form.get('handle')
        language = request.form.get('language')
        if current_password is None:
            flash('Please specify the current password')
        elif language not in LANGUAGE_CODES:
            flash('Please specify a correct language code.')
        else:
            data = {
                'email': user['email'],
                'password': current_password,
            }
            response = requests.post(current_app.get_service_url('/auth/dry-login'), json=data)
            payload = json.loads(response.text)
            if payload['status'] == http.HTTPStatus.OK:
                if (
                    new_password is None or
                    new_password == confirm_new_password
                ):
                    update_data = {
                        'userId': user['userId'],
                        'email': email,
                        'password': new_password or current_password,
                        'handle': handle,
                        'language': language,
	                    'token': user_token,
                    }
                    update_response = requests.post(current_app.get_service_url('/auth/update'), json=update_data)
                    update_payload = json.loads(update_response.text)
                    if update_payload['status'] == http.HTTPStatus.OK:
                        update_data.pop('password')
                        user.update(update_data)
                        flash('Updated successfully')
                    else:
                        flash(f"{update_payload['status']}: {update_payload['error']}")
                else:
                    if new_password is not None:
                        flash("Passwords do not match")
            else:
                flash(f"{payload['status']}: {payload['error']}")

    return render_template('user/settings.html', **user)
