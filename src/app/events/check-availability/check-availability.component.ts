import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SharedDataService } from '../../services/shared-data.service';
import { Ievent } from '../interfaces/ievent';

@Component({
  selector: 'app-check-availability',
  templateUrl: './check-availability.component.html',
  styleUrls: ['./check-availability.component.css']
})
export class CheckAvailabilityComponent {
  event: Ievent = {
    _id: '',
    name: '',
    maxPeoples: 0,
    idPlace: '',
    date: new Date(),
    endDate: new Date(),
    description: '',
    address: '',
    price: 0,
    willAttend: 0,
    images: [],
    coordinates: {
      lat: 0,
      lng: 0,
    }
  };

  constructor(private router: Router, private sharedDataService: SharedDataService) {}

  onCoordinatesSelected(coords: { lat: number, lng: number }): void {
    this.event.coordinates = coords;
    this.sharedDataService.setCoordinates(coords);
    console.log('Coordenadas guardadas en el servicio:', this.sharedDataService.getCoordinates());
  }

  onNext(): void {
    console.log('Redireccionando con coordenadas:', this.sharedDataService.getCoordinates());
    this.router.navigate(['/add-event']); // Actualizar la ruta según sea necesario
  }
}
