import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { version } from 'leaflet';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  apiUrl: string = 'http://127.0.0.1:5000'

  constructor(private http: HttpClient) { }

  verifyTokenAPI(): Observable<any> {
    const token = localStorage.getItem('jwtToken') 
    console.log('este es token ', token);
    
    return this.http.post(`${this.apiUrl}/verificar-token`, {token: token})
  }

  verifyUserPremium(): boolean {
    return localStorage.getItem('userRol') == '2'
  }
}
