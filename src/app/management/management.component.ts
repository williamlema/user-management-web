import { Component, Input, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User, Permissions } from '../home/home.component';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-management',
  templateUrl: './management.component.html',
  styleUrls: ['./management.component.css']
})
export class ManagementComponent implements OnInit {
  private userUrl = 'http://localhost:5000/user';
  private usersUrl = 'http://localhost:5000/user/all';
  private importUser = 'http://localhost:5000/register/bulk';

  allUsers: Array<User>;
  editUser: boolean;
  userForm: FormGroup;
  uploadForm: FormGroup;
  @Input() userPermissions: Permissions;

  private httpOptions = {
    headers: new HttpHeaders(
      { Authorization: localStorage.getItem('token'),
        'Access-Control-Allow-Origin' : '*',
        'Access-Control-Request-Methods' : 'GET, PATCH, POST',
        'Access-Control-Request-Header' : 'Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With'
      })
  };

  constructor(private http: HttpClient,
              private fb: FormBuilder) { }

  ngOnInit() {
    this.editUser = false;
    this.userForm = this.fb.group(
      {
        name: new FormControl(''),
        email: new FormControl(''),
        userName: new FormControl(''),
        phoneNumber: new FormControl('')
      }
    );
    this.getAllUser();
    this.uploadForm = this.fb.group({
      profile: ['']
    });
  }

  onFileSelect(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.uploadForm.get('profile').setValue(file);
    }
  }

  doUpLoadFile() {
    const formData = new FormData();
    formData.append('userFile', this.uploadForm.get('profile').value);

    this.http.post<any>(this.importUser, formData, this.httpOptions).subscribe(
      (res) => this.getAllUser(),
      (err) => console.log(err)
    );
  }

  public selectUser(user: User) {
    this.editUser = true;
    this.userForm.patchValue({
      name: user.name,
      email: user.email,
      userName: user.userName,
      phoneNumber: user.phoneNumber
    });
    this.userForm.controls.userName.disable();
  }

  private getAllUser() {
    this.cancelUpdate();
    this.http.get<Array<User>>(this.usersUrl, this.httpOptions)
      .subscribe(value => this.allUsers = value);
  }



  cancelUpdate() {
    this.editUser = false;
    this.userForm.patchValue({
      name: '',
      email: '',
      userName: '',
      phoneNumber: ''
    });
  }

  doUpdate() {
    if (this.editUser) {
      const body = this.userForm.getRawValue();
      console.log(body);
      this.http.patch(this.userUrl, body, this.httpOptions)
        .subscribe(value => { this.getAllUser(); });
    }
  }
}
