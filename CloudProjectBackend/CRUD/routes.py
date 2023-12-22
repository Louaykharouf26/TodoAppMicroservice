from bson.objectid import ObjectId
from __init__ import app, collection
from flask import render_template, request, redirect, flash, jsonify
import json

@app.route("/")
def hello():
    return "Hello World !"

@app.route("/todos", methods=["GET", "POST"])
def Todo():
    
    if request.method =="GET":
        todos=list(collection.find())
        return json.dumps(todos, default=str)
    
    else: 
        todo = request.json
        collection.insert_one(todo)
        return json.dumps(todo, default=str)


@app.route("/todos/<id>", methods=["PATCH","DELETE"])
def UpdateTodo(id):
    
    if request.method== "PATCH":
        toModify=request.json
        collection.update_one({"_id":ObjectId(id)},toModify)
        #return "todo updated successfully"
        return jsonify({"message": "todo updated successfully"})
    
    else: 
        collection.delete_one({"_id": ObjectId(id)})
        return "todo deleted successfully"
    
@app.route("/todos/<email>")
def GetByUsername(email):
    todos=list(collection.find({"email": str(email)}))
    return json.dumps(todos, default=str)
