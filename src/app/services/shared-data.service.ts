import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SharedDataService {
  private eventCoordinates: { lat: number, lng: number } = { lat: 0, lng: 0 };
  private disablePlaceSelect: boolean = false;
  private attemptsRemaining: number = 3;
  private lastAttemptTime: number = Date.now();

  setCoordinates(coords: { lat: number, lng: number }): void {
    this.eventCoordinates = coords;
    console.log('Coordenadas guardadas en el servicio:', this.eventCoordinates);
  }

  getCoordinates(): { lat: number, lng: number } {
    console.log('Coordenadas recuperadas del servicio:', this.eventCoordinates);
    return this.eventCoordinates;
  }

  setDisablePlaceSelect(value: boolean): void {
    this.disablePlaceSelect = value;
  }

  getDisablePlaceSelect(): boolean {
    return this.disablePlaceSelect;
  }

  setAttemptsRemaining(attempts: number): void {
    this.attemptsRemaining = attempts;
  }

  getAttemptsRemaining(): number {
    return this.attemptsRemaining;
  }

  setLastAttemptTime(time: number): void {
    this.lastAttemptTime = time;
  }

  getLastAttemptTime(): number {
    return this.lastAttemptTime;
  }
}
