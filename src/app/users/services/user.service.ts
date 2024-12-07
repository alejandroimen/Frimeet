import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Iuser } from '../components/interfaces/iuser';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  url: string = 'http://127.0.0.1:5000';

  constructor(private http: HttpClient, private router: Router) {}

  private createAuthorizationHeader(): HttpHeaders {
    const token = localStorage.getItem('jwtToken'); // Asumiendo que el token se almacena en localStorage
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  }

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
    const headers = this.createAuthorizationHeader();
    return this.http.delete(`${this.url}/users/${id}`, {headers});
  }

  getUser(): Observable<any> {
    const headers = this.createAuthorizationHeader();
    return this.http.get(`${this.url}/profile`, {headers});
  }

  updateProfile(id: number, user: Iuser): Observable<any> {
    const headers = this.createAuthorizationHeader();
    return this.http.put(`${this.url}/users/${id}/edit`, {
      nombre: user.name,
      email: user.email,
      password: user.password,
    }, {headers});
  }

  getPremium(id: number, activar: boolean): Observable<any> {
    const headers = this.createAuthorizationHeader();
    return this.http.post(`${this.url}/users/${id}/premium`, {
      activar: activar,
    }, {headers});
  }

  addReminder(id: number, reminder: any): Observable<any> {
    const headers = this.createAuthorizationHeader();
    return this.http.patch(`${this.url}/users/${id}/addReminder`, reminder, {headers});
  }

  getReminders(id: number): Observable<any> {
    return this.http.get(`${this.url}/users/${id}/reminders`);
  }

  logout(): void {
    localStorage.removeItem('jwtToken');
    this.router.navigate(['/login']);
  }
}
