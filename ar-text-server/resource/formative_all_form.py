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


def get_all_formative_forms():
    conn = sqlite3.connect('ar-text-formative.db')
    c = conn.cursor()
    c.execute("SELECT json_id, json_title, json_value FROM json_data")
    rows = c.fetchall()
    conn.close()

    all_data = []
    for row in rows:
        json_id, json_title, json_value = row
        all_data.append({"id": json_id, "title": json_title, "data": json.loads(json_value)})
    
    return all_data

class FormativeAllFormResource(Resource):
    def get(self):
        return get_all_formative_forms()

    # Corresponds to POST request
    def post(self):
        json_data = request.get_json()
        if "title" not in json_data:
            return {"error": "Missing title field"}, 400
        json_title = json_data.pop("title")  # Remove title from json_data
        insert_new_json(json_title, json_data)
        return {"title": json_title, "data": json_data}