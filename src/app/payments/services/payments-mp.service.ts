import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { IdataMP } from '../interfaces/idata-mp';

@Injectable({
  providedIn: 'root'
})
export class PaymentsMpService {
  
  private apiUrl = 'http://localhost:3000/'

  constructor(private http: HttpClient) { }

  pay(data: IdataMP): Observable<any> {
    return this.http.post(`${this.apiUrl}api/payments/`, data)
  }
}
