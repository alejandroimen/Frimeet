import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TagsService {

  //private apiUrl = 'https://frimeetapi2.integrador.xyz/'
  private apiUrl = 'http://127.0.0.1:5000/'; 

  constructor(private http: HttpClient) {}

  private createAuthorizationHeader(): HttpHeaders {
    const token = localStorage.getItem('jwtToken'); 
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  }

  getEventsByTags(id: number): Observable<any> {
    const headers = this.createAuthorizationHeader();
    return this.http.get(`${this.apiUrl}/tags/${id}/events`, {headers})
  }

  createTags(tags: { tagsEvent?: string; tagsPlace?: string }[]): Observable<any> {
    const headers = this.createAuthorizationHeader();
    return this.http.post(`${this.apiUrl}tags`, tags, { headers });
  }
  
  getPlacesByTags(id: number): Observable<any> {
    const headers = this.createAuthorizationHeader();
    return this.http.get(`${this.apiUrl}tags/${id}/places`, { headers });
  }

  getAllTags(): Observable<any> {
    const headers = this.createAuthorizationHeader();
    return this.http.get(`${this.apiUrl}tags`, { headers });
  }

  deleteTag(id: number): Observable<any> {
    const headers = this.createAuthorizationHeader();
    return this.http.delete(`${this.apiUrl}tags/${id}/delete`, { headers });
  }

}