import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-sign-up-page',
  templateUrl: './sign-up-page.component.html',
  styleUrl: './sign-up-page.component.css'
})
export class SignUpPageComponent {

  username: string = '';
  email: string = '';
  password: string = '';
  firstname: string = '';
  lastname: string = '';
  phone_number: string = '';

  private apiUrl = 'http://localhost:8080/authenticationController';

  constructor(private http: HttpClient) {}

  //FETCHING POST REQUEST FUNCTION
  postData(request: any): Observable<any> {           
    return this.http.post<any>(`${this.apiUrl}/register`, request);
  }

  //EMAIL VALIDITY REGULAR EXPRESSION
  expression: RegExp = /^(?=.{1,254}$)(?=.{1,64}@)[-!#$%&'*+/0-9=?A-Z^_`a-z{|}~]+(\.[-!#$%&'*+/0-9=?A-Z^_`a-z{|}~]+)*@[A-Za-z0-9]([A-Za-z0-9-]{0,61}[A-Za-z0-9])?(\.[A-Za-z0-9]([A-Za-z0-9-]{0,61}[A-Za-z0-9])?)*$/;

  onSubmit(): void {
    const request = {
      "username": this.username,
      "firstname": this.firstname,
      "lastname": this.lastname,
      "password": this.password,
      "profilDescription": "",
      "email": this.email,
      "phonenumber": this.phone_number
    };

    const valid: boolean = this.expression.test(this.email);    //TESTING EMAIL FORM VALIDITY

    if(valid){
      this.postData(request).subscribe(
        (response) => {
          alert('Sign up successful');
          console.log(response);
        },
        (error) => {
          alert('Email already in use.');
          console.error(error);
        }
      );
    }

    else{
      alert('invalid email');
    }
    

  }
}
