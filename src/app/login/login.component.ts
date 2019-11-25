import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

export class Token {
  token: string;
}


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  private validateUser = 'http://localhost:5000/register/validate/user/';
  private userName;
  message: string;
  constructor( private http: HttpClient,
               private route: Router) {
  }

  ngOnInit() {
    this.setUserName('');
    this.userName = '';
  }

  public next() {

    this.http.get<number>(this.validateUser + this.userName)
      .subscribe(value => this.evaluateValidation(value));
  }

  public setUserName(userName: string) {
    this.userName = userName;
  }

  public evaluateValidation(value: number) {
    localStorage.setItem('user', this.userName);
    if ( value === 1) {
      this.message = 'El usuario actualmente no existe en el sistema, si lo deseas puedes ir al modulo de registro';
    } else if (value === 3) {
      this.message = 'Tienes pendiente la verificacion de cuenta, valida tu bandeja de correo para completar el registro';
    } else if (value === 2) {
      this.route.navigateByUrl('/complete-register');
    } else {
      this.route.navigateByUrl('/complete-login');
    }
  }

}
