from flask import Flask, request, render_template, jsonify, url_for, redirect, g, send_from_directory
from .models import User
from index import app, db
from sqlalchemy.exc import IntegrityError
from .utils.auth import generate_token, requires_auth, verify_token

app = Flask(__name__, static_folder="../client/build/static", template_folder="../client/build")

@app.route("/")
def index():
    return render_template("index.html")

if __name__ == "__main__":
    app.run()
