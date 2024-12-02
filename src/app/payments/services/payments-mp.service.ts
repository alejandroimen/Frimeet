import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { IdataMP } from '../interfaces/idata-mp';

@Injectable({
  providedIn: 'root'
})
export class PaymentsMpService {
  
  private apiUrl = 'http://localhost:3000/'
  private apiUrlPG = 'http://localhost:5000/'

  constructor(private http: HttpClient) { }

  private createAuthorizationHeader(): HttpHeaders {
    const token = localStorage.getItem('jwtToken'); // Asumiendo que el token se almacena en localStorage
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  }

  pay(data: IdataMP): Observable<any> {
    return this.http.post(`${this.apiUrl}api/payments/`, data)
  }

  updateRolUser(id: number): Observable<any> {
    const headers = this.createAuthorizationHeader();
    console.log('Estos son',headers);
    
    return this.http.post(`${this.apiUrlPG}users/${id}/premium`, {activar: true}, {headers})
  }
}
