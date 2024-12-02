import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { PlaceService } from '../../places/services/place.service';
import { Iplace } from '../../places/interfaces/iplace';
import { FavoriteService } from '../../services/favorite.service';
import { NavbarService } from '../../services/navbar.service';

@Component({
  selector: 'app-places-review',
  templateUrl: './places-review.component.html',
  styleUrls: ['./places-review.component.css']
})
export class PlacesReviewComponent {
  isNavbarCollapsed: boolean = true;
  places: Iplace[] = [];
  place: Iplace = {
    _id: "",
    name: "",
    types: "",
    description: "",
    images: [],
    address: "",
    tag: [],
    totalStarts: 0,
    userOwner: 0,
    coordinates: {
      lat: 0,
      lng: 0,
    }
  };

  constructor(private placeService: PlaceService, private router: Router, private favoriteService: FavoriteService,  private navbarService: NavbarService) {}

  ngOnInit(): void {
    this.favoriteService.getFavorites().subscribe(
      (data: any) => {
        // Suponiendo que el servicio devuelve una estructura como { idFavorite: ..., place: {...} }
        this.places = data.map((item: any) => item.place);
        console.log('Lugares obtenidos:', this.places);
      },
      error => {
        console.error('Error al obtener lugares:', error);
      }
    );

    this.navbarService.isCollapsed$.subscribe((isCollapsed) => {
      this.isNavbarCollapsed = isCollapsed;
    });
  }

  goToDetails(placeId: string): void {
    console.log('ID del lugar seleccionado:', placeId);
    this.router.navigate(['/places', placeId]);
  }
}
