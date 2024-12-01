import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PlaceService {

  //private apiUrl = 'https://frimeetapi.integrador.xyz/'
  private apiUrl = 'http://localhost:3000/'

  constructor(private http: HttpClient) { }

  private createAuthorizationHeader(): HttpHeaders {
    const token = localStorage.getItem('jwtToken'); // Asumiendo que el token se almacena en localStorage
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  }

  addPlace(placeData: FormData): Observable<any> {
    const headers = this.createAuthorizationHeader();
    return this.http.post(`${this.apiUrl}api/places/`, placeData, { headers });
  }
  
  getPlaces(): Observable<any> {
    return this.http.get(`${this.apiUrl}api/places`);
  }

  getPendingPlaces(): Observable<any> {
    const headers = this.createAuthorizationHeader();
    return this.http.get(`${this.apiUrl}api/places/pending/places`, {headers})
  }

  getPlaceById(id: string): Observable<any> {
    return this.http.get(`${this.apiUrl}api/places/${id}`);
  }

  updatePlace(id: string, placeData: any): Observable<any> {
    const headers = this.createAuthorizationHeader();
    return this.http.put(`${this.apiUrl}api/places/update/${id}`, placeData, { headers });
  }

  deletePlace(id: string): Observable<any> {
    const headers = this.createAuthorizationHeader();
    return this.http.delete(`${this.apiUrl}api/places/delete/${id}`, { headers });
  }

  approvePlaces(id: string, placeData: any): Observable<any> {
    const headers = this.createAuthorizationHeader();
    return this.http.put(`${this.apiUrl}api/places/approve/${id}`, placeData, {headers})
  }

  getApprovedPlaces(): Observable<any> {
    const headers = this.createAuthorizationHeader();
    return this.http.get(`${this.apiUrl}api/places/approved`, {headers})
  }

  getRandomPlace(): Observable<any> {
    const headers = this.createAuthorizationHeader();
    return this.http.get(`${this.apiUrl}api/places/random/place`, {headers})
  }

}
