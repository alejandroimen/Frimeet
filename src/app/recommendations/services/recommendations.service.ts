import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Iplace } from '../../places/interfaces/iplace';


@Injectable({
  providedIn: 'root'
})
export class RecommendationsService {
  url: string = 'http://localhost:3000/api/places'

  constructor(private http: HttpClient) { }

  private createAuthorizationHeader(): HttpHeaders {
    console.log( localStorage.getItem('jwtToken'));
    
    const token = localStorage.getItem('jwtToken'); 
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  }

  suggest(tagList: number[], typePlace: string): Observable<any> {
    const headers: HttpHeaders = this.createAuthorizationHeader()
    return this.http.post(`${this.url}/suggest`, {
      tags: tagList,
      type: typePlace
    }, {headers})
  }
}
