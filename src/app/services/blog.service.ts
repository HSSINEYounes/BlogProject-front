// src/app/services/blog.service.ts

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Blog, User } from '../models/blog.model';
import { Page } from '../models/page.model';

@Injectable({
  providedIn: 'root'
})
export class BlogService {
  private baseUrl = 'http://localhost:8080/blogController/';

  constructor(private http: HttpClient) {}

  createBlog(blogRequestEntity: any): Observable<void> {
    return this.http.post<void>(`${this.baseUrl}/create-blog`, blogRequestEntity);
  }

  public postRequest(url: string, request: any): Observable <any>{
    return this.http.post<any>(url, request);
  } 
  

  updateBlogInformation(blogUpdateEntity: any): Observable<void> {
    return this.http.post<void>(`${this.baseUrl}/update-blog`, blogUpdateEntity);
  }

  findBlogs(url: string): Observable<Page<any>> {
    return this.http.get<any>(url);
  }

  findBlogById(url: string): Observable<any> {
    return this.http.get<any>(url);
  }

  findBlogsByUser(userId: string, page: number, pageSize: number): Observable<Page<Blog>> {
    return this.http.get<Page<Blog>>(`${this.baseUrl}/find-blogs-by-user/${userId}/${page}/${pageSize}`);
  }

  findAllUsers(url: string): Observable<User[]> {
    return this.http.get<User[]>(url);
  }

  createBlog2(blogData: any): Observable<any> {
    const url = `${this.baseUrl}/create-blog`;
    return this.http.post(url, blogData);
  }
}
