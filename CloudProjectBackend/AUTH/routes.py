from __init__ import app, collection
from flask import render_template, request, redirect, flash, jsonify, make_response
import json




@app.route("/signup", methods=["POST"])
def Signup():
    user=request.json
    user_found=collection.find_one({"username": user["username"]})
    if user_found:
        return "User duplicated error !"
    collection.insert_one(user)
    return json.dumps(user, default=str)


@app.route("/login", methods=["POST"])
def Login():
    user=request.json
    user_found=collection.find_one({"email": user["email"]})
    if user_found == None:
        return "User not found !"

    elif user_found != None and user_found["password"] != user["password"]:
        return jsonify({"message": "Password is incorrect !"})

    else:
        resp=make_response()
        resp.set_cookie("logged", "true", secure=True, httponly=True)
        return jsonify({"token": "123456", "message": "You are logged in!", "email": user_found["email"]})
