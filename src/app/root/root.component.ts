import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router, NavigationExtras } from '@angular/router'

@Component({
  selector: 'app-root',
  templateUrl: './root.component.html',
  styleUrls: ['./root.component.css']
})

export class RootComponent implements OnInit {

/* Forms to send info to backend */
 patientuserForm: FormGroup;
 doctoruserForm: FormGroup;
 loginForm: FormGroup;
 
/* hide is used to show or hide password */
hide = true;

/* booleans to show success messeges */
showMsgd: boolean = false;
showMsgp: boolean = false;
showTab: boolean = false;
serverData: any = [];
/*--------------------------------------------------------------------------*/
/* constructor to initialize variables */
 constructor(private formBuilder: FormBuilder,private http: HttpClient, private _router: Router) {
    this.serverData = [];
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

    this.loginForm = this.formBuilder.group({
      email: ['',[Validators.required, Validators.email]],
      password: ['',[Validators.required]]
    });


}

/*--------------------------------------------------------------------------*/
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

      this.loginForm = this.formBuilder.group({
      email: ['',[Validators.required, Validators.email]],
      password: ['',[Validators.required]]
    });

  }
/*--------------------------------------------------------------------------*/
/* Send doctor registration info to python */
saveDoctor(doctor: any){
let headers = new HttpHeaders();
headers.append('Content-Type', 'application/json');
      console.log('doctor',doctor);
      this.http.post('http://127.0.0.1:5002/Doctors', JSON.stringify(doctor), {headers: headers})
      .subscribe((data)=>{
        this.showMsgd= true;
      })
    
  }
/*--------------------------------------------------------------------------*/
/* Send patient registration info to python */
savePatient(patient: any){
let headers = new HttpHeaders();
headers.append('Content-Type', 'application/json');
      console.log('patient',patient);
      this.http.post('http://127.0.0.1:5002/Patients', JSON.stringify(patient), {headers: headers})
      .subscribe((data)=>{
        this.showMsgp= true;
      })
    
  }
/*--------------------------------------------------------------------------*/
/* Send login info to backend and route to profile */
openProfile(user: any)
{

let headers = new HttpHeaders();
headers.append('Content-Type', 'application/json');
      this.http.post('http://127.0.0.1:5002/Login', JSON.stringify(user), {headers: headers})
      .subscribe((data)=>{
         this.serverData = data as JSON /* convert to JSON */
/* get parameters needed to load profile page */ 
let navigationExtras: NavigationExtras = {
        queryParams: {
            serverData: this.serverData            
        },
    };
    this.showTab = true;
   /* route to profile */
    this._router.navigate(['./profile'], navigationExtras);
      })
 
} }
