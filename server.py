from flask import Flask, request
from flask_cors import CORS, cross_origin
from flask_restful import Resource, Api
import pymongo
from pymongo import MongoClient
from json import dumps
from flask_jsonpify import jsonify
import json

# Start flask, api, and cors to allow connection to the front end
app = Flask(__name__)
api = Api(app)
CORS(app)



# Connect to mongodb using atlas string

cluster = pymongo.MongoClient("mongodb+srv://TestUsers:1234@cluster0.juunr.mongodb.net/test?retryWrites=true&w=majority")
db = cluster.test
collectionDoctors = db.doctors
collectionPatients = db.patients

@app.route("/")
def hello():
    return jsonify({'text':'Hello World!'})


# Create one resource for the patients. 
class Patients(Resource):
# This is a post api to insert a patient record. This method is called from angular.
	def post(self):
	    data = request.data # get sent data
	    data = json.loads(data) # convert data to json        
	    entry={
		"firstName": data['pfirstName'],
		"lastName": data['plastName'],
		"email": data['pemail'],
		"age": data['page'],
		"password": data['ppassword'],
		"symptoms": data['symptoms'],
	      
	    }
	    collectionPatients.insert_one(entry) # insert into database
# Create one resource for the doctors. 
class Doctors(Resource):
# This is a post api to insert a doctor record. This method is called from angular.
	def post(self):
	    data = request.data # get sent data
	    data = json.loads(data) # convert data to json   
	    entry={
		"firstName": data['dfirstName'],
		"lastName": data['dlastName'],
		"email": data['demail'],
		"age": data['dage'],
		"password": data['dpassword'],
		"specialization": data['specialization'],
	      
	    }
	    collectionDoctors.insert_one(entry) # insert into database

# add how you want to call the resources
api.add_resource(Doctors, '/Doctors') 
api.add_resource(Patients, '/Patients') 

# Run the server port 
if __name__ == '__main__':
     app.run(port=5002)

