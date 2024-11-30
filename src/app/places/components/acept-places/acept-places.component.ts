import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { PlaceService } from '../../services/place.service';
import { FavoriteService } from '../../../services/favorite.service';
import { Iplace } from '../../interfaces/iplace';

@Component({
  selector: 'app-acept-places',
  templateUrl: './acept-places.component.html',
  styleUrl: './acept-places.component.css'
})
export class AceptPlacesComponent implements OnInit{

  places: Iplace[] = [];
  favorites: Map<string, number> = new Map(); // Map to store placeId and idFavorite

  constructor(
    private placeService: PlaceService,
    private favoriteService: FavoriteService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.placeService.getPendingPlaces().subscribe((data: Iplace[]) => {
      this.places = data;
      console.log('Lugares obtenidos:', this.places);

      this.favoriteService.getFavorites().subscribe((favoritesData: any[]) => {
        this.favorites = new Map(favoritesData.map(fav => [fav.idPlace, fav.idFavorite]));
        console.log('Favoritos obtenidos:', this.favorites);
      }, error => {
        console.error('Error al obtener los favoritos:', error);
      });
    }, error => {
      console.error('Error al obtener los lugares:', error);
    });
  }

  toggleFavorite(placeId: string): void {
    if (this.favorites.has(placeId)) {
      const idFavorite = this.favorites.get(placeId);
      if (idFavorite !== undefined) {
        this.favoriteService.deleteFavorite(idFavorite).subscribe(() => {
          this.favorites.delete(placeId);
          console.log('Favorito eliminado:', placeId);
        }, error => {
          console.error('Error al eliminar el favorito:', error);
        });
      }
    } else {
      this.favoriteService.addFavorite(placeId).subscribe((response) => {
        this.favorites.set(placeId, response.idFavorite);
        console.log('Favorito agregado:', placeId);
      }, error => {
        console.error('Error al agregar el favorito:', error);
      });
    }
  }

  goToDetails(placeId: string): void {
    console.log('Id del lugar obtenido', placeId);
    this.router.navigate(['/acept-place', placeId]);
  }
}
