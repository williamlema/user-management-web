import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  private registerUrl = 'http://localhost:5000/register';
  private name;
  private username;
  private password;
  private email;
  private phone;

  constructor(private http: HttpClient,
              private route: Router) {
    this.setName('');
    this.setUserName('');
    this.setPassword('');
    this.setEmail('');
    this.setPhone('');
  }

  ngOnInit() {
  }

  setName(value: string) {
    this.name = value;
  }

  setUserName(value: string) {
    this.username = value;
  }

  setPassword(value: string) {
    this.password = value;
  }

  setEmail(value: string) {
    this.email = value;
  }

  setPhone(value: string) {
    this.phone = value;
  }

  doRegister() {
    const body = {
      name: this.name,
      email: this.email,
      userName: this.username,
      password: this.password,
      phoneNumber: this.phone
    };
    this.http.post(this.registerUrl, body)
      .subscribe(value => this.redirectToLogin());
  }

  public redirectToLogin() {
    this.route.navigateByUrl('/login');
  }
}
