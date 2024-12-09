import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PlaceService } from '../../services/place.service';
import { FavoriteService } from '../../../services/favorite.service';
import { NavbarService } from '../../../services/navbar.service';
import { Iplace } from '../../interfaces/iplace';

@Component({
  selector: 'app-acept-places',
  templateUrl: './acept-places.component.html',
  styleUrls: ['./acept-places.component.css'],
})
export class AceptPlacesComponent implements OnInit {
  places: Iplace[] = [];
  favorites: Map<string, number> = new Map();
  isCollapsed: boolean = true;
  noPendingPlaces: boolean = false; // Propiedad para mostrar el mensaje cuando no hay lugares por aprobar

  constructor(
    private placeService: PlaceService,
    private favoriteService: FavoriteService,
    private navbarService: NavbarService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.navbarService.isCollapsed$.subscribe((state) => {
      this.isCollapsed = state;
    });

    this.placeService.getPendingPlaces().subscribe(
      (data: Iplace[]) => {
        this.places = data;

        // Mostrar mensaje si no hay lugares por aprobar
        if (this.places.length === 0) {
          this.noPendingPlaces = true;
        }

        this.favoriteService.getFavorites().subscribe(
          (favoritesData: any[]) => {
            this.favorites = new Map(
              favoritesData.map((fav) => [fav.idPlace, fav.idFavorite])
            );
          },
          (error) => {
            console.error('Error al obtener los favoritos:', error);
          }
        );
      },
      (error) => {
        console.error('Error al obtener los lugares:', error);
      }
    );

    this.navbarService.isCollapsed$.subscribe((isCollapsed) => {
      this.isCollapsed = isCollapsed;
    });
  }

  toggleFavorite(placeId: string): void {
    if (this.favorites.has(placeId)) {
      const idFavorite = this.favorites.get(placeId);
      if (idFavorite !== undefined) {
        this.favoriteService.deleteFavorite(idFavorite).subscribe(
          () => {
            this.favorites.delete(placeId);
          },
          (error) => {
            console.error('Error al eliminar el favorito:', error);
          }
        );
      }
    } else {
      this.favoriteService.addFavorite(placeId).subscribe(
        (response) => {
          this.favorites.set(placeId, response.idFavorite);
        },
        (error) => {
          console.error('Error al agregar el favorito:', error);
        }
      );
    }
  }

  goToDetails(placeId: string): void {

    console.log('Id del lugar obtenido', placeId);
    this.router.navigate(['/accept-place', placeId]);
  }
}
