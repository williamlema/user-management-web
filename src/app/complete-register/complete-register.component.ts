import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-complete-register',
  templateUrl: './complete-register.component.html',
  styleUrls: ['./complete-register.component.css']
})
export class CompleteRegisterComponent implements OnInit {

  private completeRegisterUrl = 'http://localhost:5000/register/complete';
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

  public completeRegister() {
    this.http.post(this.completeRegisterUrl, this.credentialForms.getRawValue())
      .subscribe(value => this.route.navigateByUrl('/login'));
  }

}
