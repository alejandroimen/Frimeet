import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Iuser } from '../interfaces/iuser';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  url:string = 'http://127.0.0.1:5000'

  constructor(private http: HttpClient) { }

  login(user: Iuser): Observable<any>{
    return this.http.post(`${this.url}/login`, {
      nombre: user.name,
      email:  user.email,
      password: user.password
    })
  }

  register(user: Iuser): Observable<any> {
    return this.http.post(`${this.url}/users`, {
      nombre: user.name,
      email:  user.email,
      password: user.password
    })
  }

  delete(id: number): Observable<any> {
    return this.http.delete(`${this.url}users/${id}`)
  }

  getPremium(id:number): Observable<any> {
    return this.http.post(`${this.url}/users/${id}/premium`, false)
  }
}
