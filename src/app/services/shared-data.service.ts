import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SharedDataService {
  private eventCoordinates: { lat: number, lng: number } = { lat: 0, lng: 0 };

  setCoordinates(coords: { lat: number, lng: number }): void {
    this.eventCoordinates = coords;
    console.log('Coordenadas guardadas en el servicio:', this.eventCoordinates);
  }

  getCoordinates(): { lat: number, lng: number } {
    console.log('Coordenadas recuperadas del servicio:', this.eventCoordinates);
    return this.eventCoordinates;
  }
}
