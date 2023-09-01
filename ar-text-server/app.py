# using flask_restful
from flask import Flask, jsonify, request
from flask_restful import Resource, Api
from resource.formative_form import FormativeFormResource
from resource.formative_all_form import FormativeAllFormResource

import sqlite3
# creating the flask app
app = Flask(__name__)
# creating an API object
api = Api(app)
# Initialize SQLite database
def init_db():
    conn = sqlite3.connect('ar-text-formative.db')
    c = conn.cursor()
    c.execute('CREATE TABLE IF NOT EXISTS json_data (json_id INTEGER PRIMARY KEY AUTOINCREMENT, json_title TEXT, json_value TEXT)')
    conn.commit()
    conn.close()
    

# adding the defined resources along with their corresponding urls
api.add_resource(FormativeFormResource, '/api/formative/<string:form_id>')
api.add_resource(FormativeAllFormResource, '/api/formative/')

  
# driver function
if __name__ == '__main__':
    init_db()
    app.run(debug = True, port=9000)
