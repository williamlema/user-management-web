import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';

@Component({
  selector: 'app-complete-login',
  templateUrl: './complete-login.component.html',
  styleUrls: ['./complete-login.component.css']
})
export class CompleteLoginComponent implements OnInit {
  private loginUrl = 'http://localhost:5000/authentication/login';

  credentialForms: FormGroup;

  constructor(private http: HttpClient,
              private route: Router,
              private fb: FormBuilder) { }

  ngOnInit() {
    this.credentialForms = this.fb.group(
      {
        username: new FormControl(''),
        password: new FormControl('')
      }
    );
    this.credentialForms.patchValue({username: localStorage.getItem('user')});
    this.credentialForms.controls.username.disable();
  }

  public completeLogin() {
    this.http.post(this.loginUrl, this.credentialForms.getRawValue())
      .subscribe(value => this.redirectToHome(value.token));
  }

  public redirectToHome(token: string) {
    localStorage.setItem('token', token);
    this.route.navigateByUrl('/home');
  }
}
