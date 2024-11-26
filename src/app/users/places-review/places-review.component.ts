import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { PlaceService } from '../../places/services/place.service';
import { Iplace } from '../../places/interfaces/iplace';

@Component({
  selector: 'app-places-review',
  templateUrl: './places-review.component.html',
  styleUrls: ['./places-review.component.css']
})
export class PlacesReviewComponent {
  places: Iplace[] = [];
  place: Iplace = {
    _id: "",
    name: "",
    types: "",
    description: "",
    images: [],
    address: "",
    tags: "",
    coordinates: {
      lat: 0,
      lng: 0,
    }
  };

  constructor(private placeService: PlaceService, private router: Router) {}

  ngOnInit(): void {
    this.placeService.getPlaces().subscribe(
      (data: Iplace[]) => {
        this.places = data;
        console.log('Lugares obtenidos:', this.places);
      },
      error => {
        console.error('Error al obtener lugares:', error);
      }
    );
  }

  goToDetails(placeId: string): void {
    console.log('ID del lugar seleccionado:', placeId);
    this.router.navigate(['/places', placeId]);
  }
}
