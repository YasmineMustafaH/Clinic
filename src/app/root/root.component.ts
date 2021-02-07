import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router'

@Component({
  selector: 'app-root',
  templateUrl: './root.component.html',
  styleUrls: ['./root.component.css']
})


export class RootComponent implements OnInit {
 patientuserForm: FormGroup;
 doctoruserForm: FormGroup;
 hide = true;
showMsgd: boolean = false;
showMsgp: boolean = false;

 constructor(private formBuilder: FormBuilder,private http: HttpClient, private _router: Router) {

    this.doctoruserForm = this.formBuilder.group({
      dfirstName: ['', [Validators.required, Validators.pattern('^[a-zA-Z]+$')]],
      dlastName: ['', [Validators.required, Validators.pattern('^[a-zA-Z]+$')]],
      demail: ['',[Validators.required, Validators.email]],
      dpassword: ['',[Validators.required]],
      dage: ['',[Validators.required]],
      specialization: ['',[Validators.required]]
    });

    this.patientuserForm = this.formBuilder.group({
      pfirstName: ['', [Validators.required, Validators.pattern('^[a-zA-Z]+$')]],
      plastName: ['', [Validators.required, Validators.pattern('^[a-zA-Z]+$')]],
      pemail: ['',[Validators.required, Validators.email]],
      ppassword: ['',[Validators.required]],
      page: ['',[Validators.required]],
      symptoms: ['',[Validators.required]]
    });
}


ngOnInit() {
    this.doctoruserForm = this.formBuilder.group({
      dfirstName: ['', [Validators.required, Validators.pattern('^[a-zA-Z]+$')]],
      dlastName: ['', [Validators.required, Validators.pattern('^[a-zA-Z]+$')]],
      demail: ['',[Validators.required, Validators.email]],
      dpassword: ['',[Validators.required]],
      dage: ['',[Validators.required]],
      specialization: ['',[Validators.required]]
    });
    this.patientuserForm = this.formBuilder.group({
      pfirstName: ['', [Validators.required, Validators.pattern('^[a-zA-Z]+$')]],
      plastName: ['', [Validators.required, Validators.pattern('^[a-zA-Z]+$')]],
      pemail: ['',[Validators.required, Validators.email]],
      ppassword: ['',[Validators.required]],
      page: ['',[Validators.required]],
      symptoms: ['',[Validators.required]]
    });
  }


saveDoctor(doctor: any){
let headers = new HttpHeaders();
headers.append('Content-Type', 'application/json');
      console.log('doctor',doctor);
      this.http.post('http://127.0.0.1:5002/Doctors', JSON.stringify(doctor), {headers: headers})
      .subscribe((data)=>{
        this.showMsgd= true;
      })
    
  }


savePatient(patient: any){
let headers = new HttpHeaders();
headers.append('Content-Type', 'application/json');
      console.log('patient',patient);
      this.http.post('http://127.0.0.1:5002/Patients', JSON.stringify(patient), {headers: headers})
      .subscribe((data)=>{
        this.showMsgp= true;
      })
    
  }

openProfile()
{


} }
