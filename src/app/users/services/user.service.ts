import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Iuser } from '../interfaces/iuser';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  url: string = 'http://127.0.0.1:5000';

  constructor(private http: HttpClient, private router: Router) {}

  login(user: Iuser): Observable<any> {
    return this.http.post(`${this.url}/login`, {
      nombre: user.name,
      email: user.email,
      password: user.password,
    });
  }

  register(user: Iuser): Observable<any> {
    return this.http.post(`${this.url}/users`, {
      nombre: user.name,
      email: user.email,
      password: user.password,
    });
  }

  delete(id: number): Observable<any> {
    return this.http.delete(`${this.url}/users/${id}`);
  }

  getUser(): Observable<any> {
    return this.http.get(`${this.url}/profile`);
  }

  updateProfile(id: number, user: Iuser): Observable<any> {
    return this.http.put(`${this.url}/users/${id}/edit`, {
      nombre: user.name,
      email: user.email,
      password: user.password,
    });
  }

  getPremium(id: number, activar: boolean): Observable<any> {
    return this.http.post(`${this.url}/users/${id}/premium`, {
      activar: activar,
    });
  }

  addReminder(id: number, reminder: any): Observable<any> {
    return this.http.patch(`${this.url}/users/${id}/addReminder`, reminder);
  }

  getReminders(id: number): Observable<any> {
    return this.http.get(`${this.url}/users/${id}/reminders`);
  }

  logout(): void {
    localStorage.removeItem('jwtToken');
    this.router.navigate(['/login']);
  }
}
