import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';
import { FormBuilder } from '@angular/forms';

export class User {
  name: string;
  userName: string;
  email: string;
  phoneNumber: string;
  permissions: Permissions;
}
export class Permissions {
  id: number;
  description: string;
  updatePermission: boolean;
  readOwnData: boolean;
  editOwnData: boolean;
  readOtherUserData: boolean;
  editOtherUserData: boolean;
}


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  private userUrl = 'http://localhost:5000/user';
  private logoutUrl = 'http://localhost:5000/authentication/logout';
  userForm: FormGroup;
  userPermission: Permissions;
  private disable: boolean;

  private httpOptions = {
    headers: new HttpHeaders(
      { Authorization: localStorage.getItem('token'),
        'Access-Control-Allow-Origin' : '*',
        'Access-Control-Request-Methods' : 'GET, PATCH',
        'Access-Control-Request-Header' : 'Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With'
      })
  };

  constructor(private http: HttpClient,
              private route: Router,
              private fb: FormBuilder) {
  }

  ngOnInit() {
    if (!localStorage.getItem('token')) {
      this.route.navigateByUrl('/login');
    }
    this.disable = true;
    this.userForm = this.fb.group(
      {
        name: new FormControl(''),
        email: new FormControl(''),
        userName: new FormControl(''),
        phoneNumber: new FormControl('')
      }
    );
    this.userForm.disable();
    this.userPermission = {
      id: 0,
      description: '',
      updatePermission: false,
      readOwnData: false,
      editOwnData: false,
      readOtherUserData: false,
      editOtherUserData: false
    };
    this.getPeronsalInfo();
  }

  private getPeronsalInfo() {
    this.http.get<User>(this.userUrl, this.httpOptions)
      .subscribe(value => {
        this.userForm.patchValue({name: value.name,
          email: value.email,
          userName: value.userName,
          phoneNumber: value.phoneNumber});
        this.userPermission = value.permissions;
      });
  }
  logout() {
    this.http.post(this.logoutUrl, null, this.httpOptions)
      .subscribe(value => {
        localStorage.removeItem('token');
        this.route.navigateByUrl('/login');
      });
  }

  doEnableFields() {
    this.disable = false;
    this.userForm.enable();
    this.userForm.controls.userName.disable();
  }

  doUpdate() {
    if (!this.disable) {
      const body = this.userForm.getRawValue();
      console.log(body);
      this.http.patch(this.userUrl, body, this.httpOptions)
        .subscribe(value => {this.disable = true, this.userForm.disable(); });
    }
  }
}
