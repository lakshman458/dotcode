import { Component, OnInit } from '@angular/core';
import { Login } from '../models/login.model';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { ApiservicesService } from '../services/apiservices.service';
import { AuthService } from '../services/auth.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  emailAddress: string;
  password: string;

  loading: boolean = false;
  submitted = false;
  isComplete = false;
  success = null;
  error = null;

  responce = null;

  constructor(private formBuilder: FormBuilder, private api: ApiservicesService, public auth: AuthService, private router: Router,) { 
    if (this.auth.isAuthenticated()) {
      this.router.navigate(['/']);
    }
  }
 

  ngOnInit(): void {
    
    this.loginForm = this.formBuilder.group({
      emailAddress: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(4)]],
    });
  }
  get f() { return this.loginForm.controls; }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.loginForm.invalid) {
      //this.submitted = false;
      return;
    }
    var LoginRequest = new Login();
    LoginRequest.Contact_Email = this.emailAddress;
    LoginRequest.password = this.password;
    this.loading = true;
    this.api.LoginUser(LoginRequest).subscribe(data => {
      this.loading = false;
      this.isComplete = true;
      this.success = null;
      this.error = null;
      this.responce = data;
      console.log(this.responce,"response")
      localStorage.setItem('token', this.responce.data);
      this.router.navigate(["/"])
    },
      (error: ErrorEvent) => {
        this.loading = false;
        this.error = error.error;
        this.success = null;
      });
  }

}
