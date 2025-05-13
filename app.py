from flask import Flask, send_from_directory, request, jsonify
import os
import json

app = Flask(__name__, static_folder="static/")

CONFIG_FOLDER = "config"

@app.route('/')
def index():
    return send_from_directory(app.static_folder, 'index.html')

@app.route('/config/icons/<path:filename>')
def serve_icon(filename):
    return send_from_directory('config/icons', filename)

@app.route('/<path:filename>')
def static_files(filename):
    return send_from_directory(app.static_folder, filename)

@app.route('/config/<name>', methods=['GET'])
def get_json(name):
    path = os.path.join(CONFIG_FOLDER, name)
    if os.path.exists(path):
        return send_from_directory(CONFIG_FOLDER, name)
    return jsonify({"error": "Fichier non trouvé"}), 404

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=False)
