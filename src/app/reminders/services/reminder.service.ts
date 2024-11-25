import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Ireminder } from '../interfaces/ireminder';

@Injectable({
  providedIn: 'root'
})
export class ReminderService {
  urlMongoDB: string = 'http://127.0.0.1:3000'
  urlPostgress: string = 'http://127.0.0.1:5000'

  constructor(private http: HttpClient) { }

  private createAuthorizationHeader(): HttpHeaders {
    console.log( localStorage.getItem('jwtToken'));
    
    const token = localStorage.getItem('jwtToken'); 
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  }

  getReminders(id:number): Observable<any> {
    const headers: HttpHeaders = this.createAuthorizationHeader();

    return this.http.get(`${this.urlPostgress}/users/${id}/reminders`, {headers}) 
  }

  addReminder(): Observable<any> {
    return this.http.get(`${this.urlPostgress}/api`) 
  }
}
