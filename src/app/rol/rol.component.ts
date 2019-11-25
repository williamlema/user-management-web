import { Component, OnInit } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Permissions} from '../home/home.component';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-rol',
  templateUrl: './rol.component.html',
  styleUrls: ['./rol.component.css']
})
export class RolComponent implements OnInit {

  private rolUrl = 'http://localhost:5000/rol';
  allPermissions: Array<Permissions>;
  permisionForm: FormGroup;
  editPermission: boolean;

  private httpOptions = {
    headers: new HttpHeaders(
      { Authorization: localStorage.getItem('token'),
        'Access-Control-Allow-Origin' : '*',
        'Access-Control-Request-Methods' : 'GET, PATCH',
        'Access-Control-Request-Header' : 'Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With'
      })
  };

  constructor(private http: HttpClient,
              private fb: FormBuilder) { }

  ngOnInit() {
    this.allPermissions = [];
    this.permisionForm = this.fb.group(
      {
        id: new FormControl(''),
        description: new FormControl(''),
        updatePermission: new FormControl(''),
        readOwnData: new FormControl(''),
        editOwnData: new FormControl(''),
        readOtherUserData: new FormControl(''),
        editOtherUserData: new FormControl(''),
      }
    );
    this.getAllRol();
  }

  private getAllRol() {
    this.cancelEdition();
    this.http.get<Array<Permissions>>(this.rolUrl, this.httpOptions)
      .subscribe(value => this.allPermissions = value);
  }

  editRol() {
    if (this.editPermission){
      this.http.put(this.rolUrl, this.permisionForm.getRawValue(), this.httpOptions)
        .subscribe(value => this.getAllRol());
    }
  }

  cancelEdition() {
    this.editPermission = false;
    this.permisionForm.patchValue({
      id: '',
      description: '',
      updatePermission: '',
      readOwnData: '',
      editOwnData: '',
      readOtherUserData: '',
      editOtherUserData: ''
    });
  }

  selectPermision(permissions: Permissions) {
    this.editPermission = true;
    this.permisionForm.patchValue({
      id: permissions.id,
      description: permissions.description,
      updatePermission: permissions.updatePermission,
      readOwnData: permissions.readOwnData,
      editOwnData: permissions.editOwnData,
      readOtherUserData: permissions.readOtherUserData,
      editOtherUserData: permissions.editOtherUserData
    });
  }
}
