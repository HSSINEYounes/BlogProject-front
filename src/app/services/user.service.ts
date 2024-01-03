import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Page } from '../models/page.model';
import { Blog, User } from '../models/blog.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private userUrl = 'http://localhost:8080/userController/user'; // Adjust as needed
  private userBlogsUrl = 'http://localhost:8080/blogController/blogs'; // Adjust as needed

  constructor(private http: HttpClient) { }

  public postRequest(url: string, request: any): Observable<any> {
    return this.http.post<any>(url, request);
  }

  public getRequest(url: string): Observable<any> {
    return this.http.get<any>(url);
  }

  public getRequestWithParams(baseUrl: string, search: string) {
    let url = `${baseUrl}/${search}/0/20`;
    return this.http.get<any>(url);
  }

  findAccounts(url: string): Observable<User[]> {
    return this.http.get<User[]>(url);
  }

  findAllUsers(url: string): Observable<User[]> {
    return this.http.get<User[]>(url);
  }

  getUser(): Observable<User> {
    return this.http.get<User>(this.userUrl);
  }

  // getUserBlogs(userId: string): Observable<Blog[]> {
  //   return this.http.get<Blog[]>("http://localhost:8080/blogController/find-blogs-by-user/2b7272d6-dfab-4b19-9c31-aba135d167d3/0/10");
  // }
  getUserBlogs(userId: string): Observable<Page<Blog>> {
    const url = `http://localhost:8080/blogController/find-blogs-by-user/${userId}/0/10`;
    return this.http.get<Page<Blog>>(url);
  }

  findUserByUid(userId: string): Observable<User> {
    const url = `http://localhost:8080/userController/findByUid/${userId}`;
    return this.http.get<User>(url);
  }
  
}
