from flask import Flask, request
from flask_cors import CORS, cross_origin
from flask_restful import Resource, Api
import pymongo
from pymongo import MongoClient
from json import dumps
from flask_jsonpify import jsonify
import json
from bson.json_util import dumps, loads 
from imutils.perspective import four_point_transform
from imutils import contours
import imutils
import io
import cv2
import numpy
from PIL import Image
import pytesseract

# Start flask, api, and cors to allow connection to the front end
app = Flask(__name__)
api = Api(app)
CORS(app)

# Connect to mongodb using atlas string

cluster = pymongo.MongoClient("mongodb+srv://TestUsers:1234@cluster0.juunr.mongodb.net/test?retryWrites=true&w=majority")
db = cluster.test
collectionDoctors = db.doctors
collectionPatients = db.patients
collectionInfo = db.info

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
# Check whether email address present
class loginCheck(Resource):
    def post(self):
         data = request.data
         data = json.loads(data)
         cursor=collectionDoctors.find_one({"email":data['email']})
         jsonData = dumps(cursor)
         print(jsonData)
         return jsonData

class insertInfo(Resource):
    def post(self):
         data = request.data
         data = json.loads(data)
         entry={
		"patientEmail": data['patientEmail'],
		"date": data['date'],
		"bloodPressure": data['bloodPressure'],
		"medication": data['medication']
	      
	 }
         collectionInfo.insert_one(entry) # insert into database
# get all patients
class getAllPatients(Resource):
    def get(self):
         cursor=collectionPatients.find()
         jsonData = dumps(cursor)
         print(jsonData)
         return jsonData

# Get digits from blood pressure images
class getBloodPressure(Resource):
    def post(self):
	    # load the example image
	    #read image file string data
	    filestr = request.files['file'].read()
            #convert string data to numpy array
	    npimg = numpy.fromstring(filestr, numpy.uint8)
            # convert numpy array to image
	    image = cv2.imdecode(npimg, cv2.IMREAD_COLOR)
	   """ original = image.copy()
	    gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
	    canny = cv2.Canny(gray, 20, 200, 1)
	    kernel = cv2.getStructuringElement(cv2.MORPH_RECT, (3,3))
	    close = cv2.morphologyEx(canny, cv2.MORPH_CLOSE, kernel, iterations=1)
	    cnts = cv2.findContours(close, cv2.RETR_TREE, cv2.CHAIN_APPROX_SIMPLE)
	    cnts = cnts[0] if len(cnts) == 2 else cnts[1]
	    for c in cnts:
	        peri = cv2.arcLength(c, True)
	        approx = cv2.approxPolyDP(c, 0.01 * peri, True)
	        area = cv2.contourArea(approx)
	        if len(approx) == 4 and area > 1000:
	            x,y,w,h = cv2.boundingRect(approx)
	            cv2.rectangle(image, (x, y), (x + w, y + h), (36,255,12), 3)
	            ROI = original[y:y+h, x:x+w]"""
	    text = pytesseract.image_to_string(image)
	    print("text",text)
	    return text
# add how you want to call the resources
api.add_resource(Doctors, '/Doctors') 
api.add_resource(Patients, '/Patients') 
api.add_resource(loginCheck, '/Login')
api.add_resource(insertInfo, '/InsertInfo')
api.add_resource(getAllPatients, '/GetAllPatients')
api.add_resource(getBloodPressure, '/GetBloodPressure')
# Run the server port 
if __name__ == '__main__':
     app.run(port=5002)

