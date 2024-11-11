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

  addPlace(placeData: FormData): Observable<any> {
    return this.http.post(`${this.apiUrl}api/places/`, placeData);
  }
  
  getPlaces(): Observable<any> {
    return this.http.get(`${this.apiUrl}api/places`);
  }

  getPlaceById(id: string): Observable<any> {
    return this.http.get(`${this.apiUrl}api/places/${id}`);
  }

  updatePlace(id: string, placeData: any): Observable<any> {
    return this.http.put(`${this.apiUrl}api/places/${id}`, placeData);
  }

  deletePlace(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}api/places/delete/${id}`);
  }

}

