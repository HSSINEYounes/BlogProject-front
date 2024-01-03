import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { Observable, catchError, of, tap } from 'rxjs';
import { User } from '../models/blog.model';
import { Page } from '../models/page.model';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.css'
})
export class NavBarComponent {
  search = "";
  users: { uid: number, firstname: string, lastname: string }[] = [];
  currentUser?: User;
  usersRes: { uid: string, firstname: string; lastname: string; profilDescription: string; }[] = [];
  allUsers: { uid: string, firstname: string; lastname: string; profilDescription: string; }[] = [];
  displayedUsers: { uid: number, firstname: string, lastname: string }[] = [];
  constructor(private router: Router, private httpService: UserService) { }

  onLogout(): void {
    localStorage.removeItem("activeToken");
    localStorage.removeItem("uid");
    localStorage.removeItem("firstname");
    localStorage.removeItem("lastname");
    localStorage.removeItem("email");
    localStorage.removeItem("phonenumber");

    alert("LOGOUT: \n activeToken: " + localStorage.getItem("activeToken") + "\n uid: " + localStorage.getItem("uid") + "\n firstname: " + localStorage.getItem("firstname") + "\n lastname: " + localStorage.getItem("lastname") + "\n email: " + localStorage.getItem("email") + "\n phonenumber: " + localStorage.getItem("phonenumber"));
    this.router.navigate(["login"]);
  }

  ngOnInit(): void {
    this.getUserById();
  }

  getAccounts(searchWord: string): void {
    this.httpService.findAccounts("http://localhost:8080/userController/find-users-by-debut/" + searchWord + "/0/10").subscribe(
      (response: User[]) => {
        this.usersRes = response;
      },
      (error) => {
        console.error('Error:', error);
      }
    );
  }

  getAllUsers(searchWord: string): void {
    this.httpService.findAllUsers("http://localhost:8080/userController/findAll/0/100").subscribe(
      (response: User[]) => {
        this.allUsers = response;
      },
      (error) => {
        console.error('Error:', error);
      }
    );
  }


  onSearchChange(): void {
    if (this.search != "") {
      this.getAccounts(this.search)
    }
  }

  showProfile(searchR: string): void {
    this.router.navigate(["profile"])
  }

  getUserById(): void{
    this.httpService.findUserByUid(localStorage.getItem("uid")??'').subscribe(
      (response: User) => {
        this.currentUser = response;
        // console.log("this.currentUser");
      },
      (error) => {
        console.error('Error:', error);
      }
    );
  }

}
