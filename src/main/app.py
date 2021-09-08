# Import the Flask module that has been installed.
from flask import Flask, jsonify, request
import json
from service.service import Service
from flask_cors import CORS


# Creating a new "app" by using the Flask constructor. Passes __name__ as a parameter.
app = Flask(__name__)
CORS(app)
serv = Service()

# Annotation that allows the function to be hit at the specific URL.
@app.route("/")
# Generic Python functino that returns "Hello world!"
def index():
    return "Hello world!"
    
# Annotation that allows the function to be hit at the specific URL. Indicates a GET HTTP method.
@app.route("/projet/v1.0/liens", methods=["GET"])
# Function that will run when the endpoint is hit.

# curl http://localhost:5000/projet/v1.0/liens

def get_liens():
    return serv.get_liens()
    
# Annotation that allows the function to be hit at the specific URL with a parameter. Indicates a GET HTTP method.
@app.route("/projet/v1.0/liens/<string:hostname>", methods=["GET"])
# This function requires a parameter from the URL.

# curl http://localhost:5000/projet/v1.0/liens/Web

def get_lien(hostname):
    return serv.get_lien(hostname)
    
@app.route("/projet/v1.0/liens/<string:hostname>", methods=["DELETE"])
# This function requires a parameter from the URL.

# curl -X DELETE http://localhost:5000/projet/v1.0/liens/ad

def delete_lien(hostname):
    return serv.delete_lien(hostname)
    
@app.route("/projet/v1.0/liens", methods=["PUT"])
# This function requires a parameter from the URL.

# curl -X PUT -H "Content-Type: application/json" -d @update-lien.txt http://localhost:5000/projet/v1.0/liens/python

def update_lien():
    return serv.update_lien(request.json)
    
@app.route("/projet/v1.0/liens", methods=["POST"])
# This function requires a parameter from the URL.
# $ curl -X POST -H "Content-Type: application/json" -d @create-lien.txt http://localhost:5000/projet/v1.0/liens

def add_lien():
    return serv.add_lien(request.json)

# Checks to see if the name of the package is the run as the main package.
if __name__ == "__main__":
    # Runs the Flask application only if the main.py file is being run.
    app.run(host= '0.0.0.0')
