import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PlaceService } from '../../services/place.service';
import { Iplace } from '../../interfaces/iplace';

@Component({
  selector: 'app-info-place',
  templateUrl: './info-place.component.html',
  styleUrls: ['./info-place.component.css']
})
export class InfoPlaceComponent implements OnInit {
  places: Iplace[] = [];

  constructor(private placeService: PlaceService, private router: Router) {}

  ngOnInit(): void {
    this.placeService.getPlaces().subscribe((data: Iplace[]) => {
      this.places = data;
      console.log('Lugares obtenidos:', this.places);
    }, error => {
      console.error('Error al obtener los lugares:', error);
    });
  }

  goToDetails(placeId: string): void {
    this.router.navigate(['/places', placeId]);
  }
}
