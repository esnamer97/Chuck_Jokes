import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { userInfo } from 'os';
import { Observable } from 'rxjs';
import { User } from '../models/user';
import { UserLoginDao } from '../models/user-login-dao';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  hide = true;

  loginForm: FormGroup;

  constructor(private fb: FormBuilder, private route: ActivatedRoute,
    private router: Router,
    private http: HttpClient) {
    this.loginForm = this.fb.group({
      userName: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  ngOnInit() {
    sessionStorage.setItem('token', '');
    sessionStorage.setItem('id', '');
  }

  login() {
    let url = 'http://localhost:8080/login';
    if(this.loginForm.invalid){
      return;
    }
    this.http.post<UserLoginDao>(url, {
      userName: this.loginForm.controls['userName'].value,
      password: this.loginForm.controls['password'].value
    }).subscribe(resp => {
      if (resp.isValid) {
        sessionStorage.setItem(
          'token',
          btoa(resp.userName + ':' + resp.password)
        );
        sessionStorage.setItem(
          'id',
          resp.id.toString()
        );
        this.router.navigate(['/landing']);
      } else {
        alert("Authentication failed.")
      }
    });
  }

}


