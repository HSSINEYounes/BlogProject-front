import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { setAlternateWeakRefImpl } from '@angular/core/primitives/signals';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.css'
})
export class LoginPageComponent {

  email: string = '';
  password: string = '';

  private apiUrl = 'http://localhost:8080/authenticationController';

  constructor(private http: HttpClient, private router: Router) {}
  

  postData(request: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/authenticate`, request);
  }

  onLogin(): void {
    const request = {
      "email": this.email,
      "password": this.password
    };
  
    this.postData(request).subscribe(
      (response) => {
        // Handle the response from the server
        const jsonResponse = JSON.stringify(response, null, 2);
        localStorage.setItem("activeToken", response.activeToken)
        localStorage.setItem("uid", response.uid)
        localStorage.setItem("firstname", response.firstname)
        localStorage.setItem("lastname", response.lastname)
        localStorage.setItem("email", response.email)
        localStorage.setItem("phonenumber", response.phonenumber)
        
        alert('Login successful: \n' + jsonResponse);

        this.router.navigate(['homePage']);
      },
      (error) => {
        // Handle errors from the server
        alert('Login failed');
        console.error(error);
      }
    );
  }

  onSubmit(): void{
    this.router.navigate(["sign-up"])
  }
}
