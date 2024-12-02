import { Component, OnInit, DoCheck } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PlaceService } from '../../services/place.service';
import { Iplace } from '../../interfaces/iplace';
import { AlertService } from '../../../services/alert.service';
import { ReviewService } from '../../services/review.service';
import { jwtDecode } from 'jwt-decode';

@Component({
  selector: 'app-info-acept-places',
  templateUrl: './info-acept-places.component.html',
  styleUrls: ['./info-acept-places.component.css']
})
export class InfoAceptPlacesComponent implements OnInit, DoCheck {

  place: Iplace | undefined;
  reviews: any[] = [];
  newReview: string = '';
  newReviewStars: number = 0;
  deleteModal: any;
  updateModal: any;
  selectedFiles: File[] = [];
  nameValid: boolean = true;
  descriptionValid: boolean = true;
  tagsValid: boolean = true;
  addressValid: boolean = true;
  imageSelected: boolean = true;
  isOwner: boolean = false;
  userRol: number = 0;

  constructor(
    private placeService: PlaceService,
    private route: ActivatedRoute,
    private router: Router,
    private alertService: AlertService,
    private reviewService: ReviewService
  ) {}

  ngOnInit(): void {
    const placeId = this.route.snapshot.paramMap.get('id');
    if (placeId) {
      this.placeService.getPlaceById(placeId).subscribe((data: Iplace) => {
        this.place = data;
        this.imageSelected = this.place.images.length > 0;

        const token = localStorage.getItem('jwtToken');
        if (token) { 
          const decodedToken: any = jwtDecode(token);
          const userId = parseInt(decodedToken.sub, 10); 
          const userOwner = this.place?.userOwner;
          console.log('User ID:', userId); // Log del ID del usuario 
          console.log('User Owner:', userOwner); // Log del propietario del lugar 
          this.isOwner = userId === userOwner; // Verifica si el usuario es el propietario 
          console.log('Is Owner:', this.isOwner); // Log del resultado de la verificación 

          this.userRol = decodedToken.id_Rol; // Obtenemos el rol del usuario
          console.log('este es el rol del usuario: ', this.userRol);
        }

      }, error => {
        this.alertService.showError('Error al obtener los detalles del lugar.');
        console.error('Error al obtener los detalles del lugar:', error);
      });
    }
  }

  ngDoCheck(): void {
    if (this.place) {
      this.tagsValid = this.place.tag.length > 0; // Verificar si hay tags
      this.addressValid = this.place.address ? this.place.address.trim().length > 0 : false;
    }
  }

  goBack(): void {
    window.history.back();
  }

  openPhotosModal() {
    const modal = document.getElementById('photosModal');
    if (modal) {
      modal.style.display = 'flex';
    }
  }

  closePhotosModal() {
    const modal = document.getElementById('photosModal');
    if (modal) {
      modal.style.display = 'none';
    }
  }

  approvePlace(approve: boolean): void {
    if (this.place && this.place._id) {
      this.placeService.approvePlaces(this.place._id, { approve }).subscribe(
        (response: any) => {
          this.alertService.showSuccess(approve ? 'Lugar aprobado correctamente.' : 'Lugar rechazado y eliminado.');
          this.router.navigate(['/acept-place']);
        },
        (error: any) => {
          this.alertService.showError('Hubo un error al actualizar el estado del lugar.');
          console.error('Error al actualizar el estado del lugar:', error);
        }
      );
    }
  }
}
