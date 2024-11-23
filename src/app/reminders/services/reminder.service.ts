import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Ireminder } from '../interfaces/ireminder';

@Injectable({
  providedIn: 'root'
})
export class ReminderService {
  urlMongoDB: string = 'http://127.0.0.1/3000'
  urlPostgress: string = 'http://127.0.0.1/5000'

  constructor(private http: HttpClient) { }

  getReminders(): Observable<any> {
    return this.http.get(`${this.urlPostgress}/api`) 
  }

  addReminder(): Observable<any> {
    return this.http.get(`${this.urlPostgress}/api`) 
  }
}
