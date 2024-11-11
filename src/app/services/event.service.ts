import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  private apiUrl = 'http://localhost:3000/'
  
  constructor(private http: HttpClient) { }

  addEvent(eventData: FormData): Observable<any> {
    return this.http.post(`${this.apiUrl}api/events`, eventData);
  }

  getEvents(): Observable<any> {
    return this.http.get(`${this.apiUrl}api/events`);
  }

  getEventById(id: string): Observable<any> {
    return this.http.get(`${this.apiUrl}api/events/${id}`);
  }

  updateEvent(id: string, eventData: any): Observable<any> {
    return this.http.put(`${this.apiUrl}api/events/${id}`, eventData);
  }

  deleteEvent(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}api/events/delete/${id}`);
  }
}
