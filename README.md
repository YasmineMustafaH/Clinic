To see my work, please 

1) clone the directory.

2) Update the server.py with your own atlas connection link.
        Create using mongodb atlas two collections under the 'test' db. 
        Colection # 1 : Patients
        Collection # 2 : Doctors 
        Run python server.py to run the backend server

3) Run npm start or ng serve in the terminal. 
        Next navigate `http://localhost:4200/` 
        to open the user interface
_____________________________________________________________________________________
Structure: 

app.module.ts : imports the needed modules

root folder : contains the html and functions of the registration and login pages

profile folder : contains the html and functions of the profile page that shows patient's info, and 
                 doctor can add blood pressure or medictions to the database using OCR
_____________________________________________________________________________________

Thank You ^__^

