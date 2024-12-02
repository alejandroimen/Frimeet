import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RecommendationsService {
  private apiUrl = 'http://127.0.0.1:5000/'; 

  constructor(private http: HttpClient) { }

  private createAuthorizationHeader(): HttpHeaders {
    const token = localStorage.getItem('jwtToken'); 
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  }

  suggest(data: { tipo: string, etiquetas: string[] }): Observable<any> { 
    const headers = this.createAuthorizationHeader(); 
    return this.http.post(`${this.apiUrl}tags/places/filter`, data, { headers }); 
  }
}
