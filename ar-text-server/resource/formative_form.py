# using flask_restful
from flask import Flask, jsonify, request
from flask_restful import Resource, Api
import sqlite3
import json


# Insert new JSON data into SQLite database and return the new json_id
def insert_new_json(json_title, json_value):
    conn = sqlite3.connect('ar-text-formative.db')
    c = conn.cursor()
    c.execute("INSERT INTO json_data (json_title, json_value) VALUES (?, ?)", (json_title, json.dumps(json_value)))
    conn.commit()
    new_id = c.lastrowid  # Get the new json_id
    conn.close()
    return new_id


# Fetch data from SQLite database
def get_json_from_db(json_id):
    conn = sqlite3.connect('ar-text-formative.db')
    c = conn.cursor()
    c.execute("SELECT json_title, json_value FROM json_data WHERE json_id=?", (json_id,))
    row = c.fetchone()
    conn.close()
    if row:
        return {"title": row[0], "data": json.loads(row[1])}
    return None

def put_json_into_db(json_id, json_title, json_value):
    conn = sqlite3.connect('ar-text-formative.db')
    c = conn.cursor()
    c.execute("REPLACE INTO json_data (json_id, json_title, json_value) VALUES (?, ?, ?)", (json_id, json_title, json.dumps(json_value)))
    conn.commit()
    conn.close()

 
# making a class for a particular resource
# the get, post methods correspond to get and post requests
# they are automatically mapped by flask_restful.
# other methods include put, delete, etc.
class FormativeFormResource(Resource):
  
    # corresponds to the GET request.
    # this function is called whenever there
    # is a GET request for this resource
    def get(self, form_id):
        
        data = get_json_from_db(form_id)
        return  "SHIIIT"
        if data:
            return {form_id: data}
        else:
            return {"error": "Entry not found"}, 404

  
    # Corresponds to POST request
    def post(self, form_id):
        json_data = request.get_json()
        print(json_data)
        if "title" not in json_data:
            return {"error": "Missing title field"}, 400
        json_title = json_data.pop("title")  # Remove title from json_data
        print(form_id)
        put_json_into_db(form_id, json_title, json_data)
        return {form_id: {"title": json_title, "data": json_data}}

