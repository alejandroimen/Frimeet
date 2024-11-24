import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class ReviewService {

  //private apiUrl = 'https://frimeetapi.integrador.xyz/'
    private apiUrl = 'http://localhost:3000/'

    constructor(private http: HttpClient){}

    private createAuthorizationHeader(): HttpHeaders {
        const token = localStorage.getItem('jwtToken'); // Asumiendo que el token se almacena en localStorage
        return new HttpHeaders({
          'Authorization': `Bearer ${token}`
        });
      }

    addReview(reviewData: any): Observable<any> {
        const headers = this.createAuthorizationHeader();
        return this.http.post(`${this.apiUrl}api/reviews`, reviewData, {headers})
    }

    getReviewByPlace(id: string): Observable<any> {
        const headers = this.createAuthorizationHeader();
        return this.http.get(`${this.apiUrl}api/reviews/place/${id}`, {headers})
    }

    deleteReview(id: string): Observable<any> {
        const headers = this.createAuthorizationHeader();
        return this.http.delete(`${this.apiUrl}api/reviews/${id}`, {headers})
    }
}