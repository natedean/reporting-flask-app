from flask import Flask, request, render_template, jsonify, url_for, redirect, g, send_from_directory
from .models import User
from index import app, db
from get_report_data import get_report_data

app = Flask(__name__, static_folder="../client/build/static", template_folder="../client/build")

@app.route("/")
def index():
    return render_template("index.html")

@app.route("/api/report")
def report():
    report_data = get_report_data()
    return jsonify(report_data)

if __name__ == "__main__":
    app.run()
