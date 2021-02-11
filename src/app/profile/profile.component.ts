import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from "rxjs/operators"; 
import { Router, Routes, RouterModule, ActivatedRoute, ParamMap } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import * as Tesseract from 'tesseract.js';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
    providers: [DatePipe]
})

export class ProfileComponent implements OnInit {

/* boolean to show success messeges */
showMsg: boolean = false

/* strings to hold OCR values */
resultpres =""
resultbp: any = '';

/* variable to hold input values*/
addPatientInfoForm: FormGroup;


public serverData: any = {};  


public files: any[]; 
myDate = new Date();

/* variable to hold all patients records from back end*/
patients: any = [];

/* create titles for the table of patients shown to the doctor */
columnDefs = [
        { field: 'firstName' },
        { field: 'lastName' },
        { field: 'email'},
{field:'age'},
{field:'symptoms'}
    ];
/*--------------------------------------------------------------------------*/
/*constructor to initialize values*/
  constructor(private datePipe: DatePipe, private formBuilder: FormBuilder,private route: ActivatedRoute, private http: HttpClient) { 
    
           this.files = [];
   this.addPatientInfoForm = this.formBuilder.group({
      email: ['',[Validators.required, Validators.email]],
      password: ['',[Validators.required]]
    });

  this.myDate = new Date(Date.now());

let headers = new HttpHeaders();
headers.append('Content-Type', 'application/json');
      this.http.get('http://127.0.0.1:5002/GetAllPatients').subscribe(data => {
      this.patients = data as JSON;
      this.patients = JSON.parse(this.patients);
      console.log("hihi",this.patients);
    });
    

}  
/*--------------------------------------------------------------------------*/
ngOnInit() {

               this.route.queryParams.subscribe(params => {
            
            this.serverData = JSON.parse(params.serverData) ;
        });
console.log(this.serverData.firstName)  

}
/*--------------------------------------------------------------------------*/
/* take image of medication, and extract text. */
/* Split the the text by "RX", since name of medicines usually come after "RX" */
onFileChangedpres(event: any) {

      Tesseract.recognize(event.target.files[0],
   'eng',
).then(({ data: { text } }) => {
  this.resultpres = (text.split('RX'))[1];
  console.log(this.resultpres[1]);

});
  
}
/*--------------------------------------------------------------------------*/
/* take blood pressure image and send to pythin to extract digits*/
onFileChangedbp(event: any) {
  let formData = new FormData();
      formData.append('file', event.target.files[0]);
     
 
let headers = new HttpHeaders();
headers.append('Content-Type', 'application/json');
            this.http.post('http://127.0.0.1:5002/GetBloodPressure', formData
 , {headers: headers})
      .subscribe((data)=>{
        this.resultbp = data;
      });
  
}
/*--------------------------------------------------------------------------*/
/*Add blood pressure , medication info to patient's database*/
addPatientInfo(email: any)
{
   this.myDate = new Date(Date.now());

let info = {
"patientEmail": email,
"bloodPressure": this.resultbp,
"medication": this.resultpres,
"date": this.myDate
}
let headers = new HttpHeaders();
headers.append('Content-Type', 'application/json');
      console.log('info',info);
      this.http.post('http://127.0.0.1:5002/InsertInfo', JSON.stringify(info), {headers: headers})
      .subscribe((data)=>{
           this.showMsg = true;
      })
}




}
