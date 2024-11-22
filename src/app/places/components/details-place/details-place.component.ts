import { Component, OnInit, DoCheck } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PlaceService } from '../../services/place.service';
import { Iplace } from '../../interfaces/iplace';
import { AlertService } from '../../../services/alert.service';

@Component({
  selector: 'app-details-place',
  templateUrl: './details-place.component.html',
  styleUrls: ['./details-place.component.css']
})
export class DetailsPlaceComponent implements OnInit, DoCheck {
  place: Iplace | undefined;
  deleteModal: any;
  updateModal: any;
  selectedFiles: File[] = [];
  nameValid: boolean = true;
  descriptionValid: boolean = true;
  tagsValid: boolean = true;
  addressValid: boolean = true;
  imageSelected: boolean = true;

  constructor(
    private placeService: PlaceService,
    private route: ActivatedRoute,
    private router: Router,
    private alertService: AlertService
  ) {}

  ngOnInit(): void {
    const placeId = this.route.snapshot.paramMap.get('id');
    if (placeId) {
      this.placeService.getPlaceById(placeId).subscribe((data: Iplace) => {
        this.place = data;
        this.imageSelected = this.place.images.length > 0;
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
      this.tagsValid = this.place.tags ? this.place.tags.trim().length > 0 : false;
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
      formData.append('tag', this.place.tags);

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
}
