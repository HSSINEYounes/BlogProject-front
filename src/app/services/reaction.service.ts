import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Reaction } from '../models/blog.model';

@Injectable({
  providedIn: 'root'
})
export class ReactionService {
  private baseUrl = 'http://localhost:8080/reactionController/';
  constructor(private http: HttpClient) { }

  findAllReactions(): Observable<Reaction[]> {
    return this.http.get<Reaction[]>("http://localhost:8080/reactionController/getreactions");
  }

  findByuserBlog(url: string): Observable<Reaction[]> {
    return this.http.get<Reaction[]>(url);
  }

  findByBlog(url: string): Observable<Reaction[]> {
    return this.http.get<Reaction[]>(url);
  }

  public postRequest(url: string, request: any): Observable<any> {
    return this.http.post<any>(url, request);
  }

  deleteReaction(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}delete-reaction/${id}`);
  }
}
