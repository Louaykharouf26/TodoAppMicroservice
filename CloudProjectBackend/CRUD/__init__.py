from flask import Flask
from pymongo import *
from flask_cors import CORS
app = Flask(__name__)
CORS(app) 
#client = MongoClient('localhost', 27017)
#mongo_host = 'mongodb'
#mongo_port = 27017
#mongo_username = 'admin'  # Replace with your MongoDB username
#mongo_password = 'admin'  # Replace with your MongoDB password
#mongo_database = 'mydatabase'
cosmos_connection_string = (
    "mongodb://cosmos-for-python:2FkThuLJGPBb2EisGUsQyYdZUElfuz4xLApbgJuHKScBfu35EGTXgVBczLzEFtvxe7eyiMR4JeveACDbkWpU8w==@"
    "cosmos-for-python.mongo.cosmos.azure.com:10255/?ssl=true&retrywrites=false&replicaSet=globaldb&maxIdleTimeMS=120000&appName=@cosmos-for-python@"
)
# Create a MongoClient with authentication
client = MongoClient(cosmos_connection_string)
#client = MongoClient('localhost', 27017)
db = client["mydatabase"]
collection= db["todos"]
    
import routes
    
    
