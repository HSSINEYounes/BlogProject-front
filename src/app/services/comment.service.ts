import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Comment } from '../models/blog.model';

@Injectable({
  providedIn: 'root'
})
export class CommentService {
  private baseUrl = 'http://localhost:8080/commentController/';
  constructor(private http: HttpClient) {}

  getAllComments(): Observable<Comment[]> {
    const url = `http://localhost:8080/commentController/find-comments`;
    return this.http.get<Comment[]>(url);
  }

  getCommentsByBlog(id: string): Observable<Comment[]> {
    const url = `http://localhost:8080/commentController/find-comment-Blog/`+id;
    return this.http.get<Comment[]>(url);
  }

  createComment(blogRequestEntity: any): Observable<void> {
    return this.http.post<void>(`${this.baseUrl}/create-blog`, blogRequestEntity);
  }

  public postRequest(url: string, request: any): Observable <any>{
    return this.http.post<any>(url, request);
  }
}
