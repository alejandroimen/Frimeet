import { Component, OnInit, DoCheck } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PlaceService } from '../../services/place.service';
import { Iplace } from '../../interfaces/iplace';
import { AlertService } from '../../../services/alert.service';
import { ReviewService } from '../../services/review.service';
import { jwtDecode } from 'jwt-decode';

@Component({
  selector: 'app-details-place',
  templateUrl: './details-place.component.html',
  styleUrls: ['./details-place.component.css']
})
export class DetailsPlaceComponent implements OnInit, DoCheck {
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
  isOwner: boolean = false; // Nueva propiedad para verificar si el usuario es propietario

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
        }

        this.loadReviews(placeId);
      }, error => {
        this.alertService.showError('Error al obtener los detalles del lugar.');
        console.error('Error al obtener los detalles del lugar:', error);
      });
    }
  }

  ngDoCheck(): void {
    if (this.place) {
      this.nameValid = this.validateName(this.place.name);
      this.descriptionValid = this.validateDescription(this.place.description);
      this.tagsValid = this.place.tag ? this.place.tag.trim().length > 0 : false;
      this.addressValid = this.place.address ? this.place.address.trim().length > 0 : false;
    }
  }

  validateName(name: string): boolean {
    const namePattern = /^[A-Za-z][A-Za-z0-9 ]*$/;
    return namePattern.test(name) && /[A-Za-z]/.test(name) && name.length <= 50;
  }

  validateDescription(description: string): boolean {
    return description.length <= 250;
  }

  openDeleteModal(): void {
    const modalElement = document.getElementById('deleteModal');
    if (modalElement) {
      this.deleteModal = new (window as any).bootstrap.Modal(modalElement);
      this.deleteModal.show();
    }
  }

  openUpdateModal(): void {
    const modalElement = document.getElementById('updateModal');
    if (modalElement) {
      this.updateModal = new (window as any).bootstrap.Modal(modalElement);
      this.updateModal.show();
    }
  }

  onFileSelected(event: any): void {
    this.selectedFiles = event.target.files;
    this.imageSelected = this.selectedFiles.length > 0;
  }

  updatePlace(): void {
    if (this.place && this.nameValid && this.descriptionValid && this.tagsValid && this.addressValid) {
      const formData = new FormData();
      formData.append('name', this.place.name);
      formData.append('types', this.place.types);
      formData.append('description', this.place.description);
      formData.append('address', this.place.address);
      formData.append('tag', this.place.tag);

      if (this.selectedFiles.length > 0) {
        for (let i = 0; i < this.selectedFiles.length; i++) {
          formData.append('images', this.selectedFiles[i], this.selectedFiles[i].name);
        }
      } else {
        this.place.images.forEach((image) => {
          formData.append('images', image);
        });
      }

      this.placeService.updatePlace(this.place._id, formData).subscribe(response => {
        this.alertService.showSuccess('Lugar actualizado exitosamente.');
        if (this.updateModal) {
          this.updateModal.hide();
        }
        this.router.navigate(['/info-place']);
      }, error => {
        this.alertService.showError('Hubo un error al actualizar el lugar.');
        console.error('Error al actualizar el lugar:', error);
      });
    } else {
      this.alertService.showWarning('Por favor, corrige los errores antes de enviar.');
    }
  }

  deletePlace(): void {
    if (this.place && this.place._id) {
      this.placeService.deletePlace(this.place._id).subscribe(response => {
        this.alertService.showSuccess('Lugar eliminado exitosamente.');
        if (this.deleteModal) {
          this.deleteModal.hide();
        }
        this.router.navigate(['/info-place']);
      }, error => {
        this.alertService.showError('Hubo un error al eliminar el lugar.');
        console.error('Error al eliminar el lugar:', error);
      });
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

  loadReviews(placeId: string): void {
    this.reviewService.getReviewByPlace(placeId).subscribe((reviews: any[]) => {
      this.reviews = reviews;
      console.log('Reseñas cargadas:', this.reviews);
    }, error => {
      //this.alertService.showError('Error al cargar las reseñas.');
      console.error('Error al cargar las reseñas:', error);
    });
  }

  submitReview(): void {
    if (!this.newReview || this.newReviewStars === 0) {
      this.alertService.showWarning('Por favor, completa la reseña y selecciona una calificación.');
      return;
    }

    const reviewData = {
      content: this.newReview,
      starts: this.newReviewStars,
      idPlace: this.place?._id
    };

    this.reviewService.addReview(reviewData).subscribe(response => {
      this.alertService.showSuccess('Reseña agregada exitosamente.');
      this.newReview = '';
      this.newReviewStars = 0;
      if (this.place) {
        this.loadReviews(this.place._id);
      }
    }, error => {
      this.alertService.showError('Hubo un error al agregar la reseña.');
      console.error('Error al agregar la reseña:', error);
    });
  }
}
