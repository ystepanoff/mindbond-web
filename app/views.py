import os
import logging

from flask import render_template, request, url_for, redirect, flash
#from flask_login import login_user, logout_user, current_user
from jinja2 import TemplateNotFound

from app import app, login_manager

@app.route('/', defaults={'path': 'index.html'})
@app.route('/<path>')
def index(path):
	print(path)
	return render_template('index.html')


	# if not current_user.is_authenticated:
	# 	return redirect(url_for('login'))
	#
	# try:
	#
	# 	# Inject a simple flask message
	# 	flash('[Flash message] current page: ' + path)
	#
	# 	# Serve the file (if exists) from app/templates/FILE.html
	# 	return render_template('home/' + path)
	#
	# except TemplateNotFound:
	# 	return render_template('home/page-404.html'), 404
	#
	# except:
	# 	return render_template('home/page-500.html'), 500
