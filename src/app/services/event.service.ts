import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  private apiUrl = 'http://localhost:3000/'
  
  constructor(private http: HttpClient) { }

  private createAuthorizationHeader(): HttpHeaders {
    const token = localStorage.getItem('jwtToken'); 
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  }

  addEvent(eventData: FormData): Observable<any> {
    const headers = this.createAuthorizationHeader();
    return this.http.post(`${this.apiUrl}api/events`, eventData, { headers });
  }

  getEvents(): Observable<any> {
    const headers = this.createAuthorizationHeader();
    return this.http.get(`${this.apiUrl}api/events`, {headers});
  }

  getEventById(id: string): Observable<any> {
    const headers = this.createAuthorizationHeader();
    return this.http.get(`${this.apiUrl}api/events/${id}`, {headers});
  }

  updateEvent(id: string, eventData: any): Observable<any> {
    const headers = this.createAuthorizationHeader();
    return this.http.put(`${this.apiUrl}api/events/${id}`, eventData, { headers });
  }

  deleteEvent(id: string): Observable<any> {
    const headers = this.createAuthorizationHeader();
    return this.http.delete(`${this.apiUrl}api/events/delete/${id}`, { headers});
  }

  joinEvent(id: string): Observable<any> {
    const headers = this.createAuthorizationHeader();
    return this.http.post(`${this.apiUrl}api/events/${id}/join`, {}, { headers });
  }

  leaveEvent(id: string): Observable<any> {
    const headers = this.createAuthorizationHeader();
    return this.http.post(`${this.apiUrl}api/events/${id}/leave`, {}, { headers });
  }

  getAttendingEvents(): Observable<any> {
    const headers = this.createAuthorizationHeader();
    return this.http.get(`${this.apiUrl}api/events/user/attending`, { headers})
  }
}
