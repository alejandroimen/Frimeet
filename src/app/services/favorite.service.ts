import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FavoriteService {

  //private apiUrl = 'https://frimeetapi2.integrador.xyz/'
  private apiUrl = 'http://127.0.0.1:5000/'; 

  constructor(private http: HttpClient) {}

  private createAuthorizationHeader(): HttpHeaders {
    const token = localStorage.getItem('jwtToken'); 
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  }

  addFavorite(idPlace: string): Observable<any> {
    const url = `${this.apiUrl}favorite`;
    const headers = this.createAuthorizationHeader();
    const body = { idPlace };

    return this.http.post(url, body, { headers });
  }

  getFavorites(): Observable<any> {
    const url = `${this.apiUrl}favorites`;
    const headers = this.createAuthorizationHeader();
    return this.http.get(url, { headers });
  }

  deleteFavorite(idFavorite: number): Observable<any> {
    const url = `${this.apiUrl}favorites/${idFavorite}`;
    const headers = this.createAuthorizationHeader();

    return this.http.delete(url, { headers });
  }
}
