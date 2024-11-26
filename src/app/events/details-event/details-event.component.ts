import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EventService } from '../../services/event.service';
import { Ievent } from '../interfaces/ievent';
import { AlertService } from '../../services/alert.service';
import { jwtDecode } from 'jwt-decode';

@Component({
  selector: 'app-details-event',
  templateUrl: './details-event.component.html',
  styleUrls: ['./details-event.component.css']
})
export class DetailsEventComponent implements OnInit {
  event: Ievent | undefined;
  deleteModal: any;
  updateModal: any;
  imageSelected: boolean = true;
  selectedFiles: File[] = [];
  nameValid: boolean = true;
  descriptionValid: boolean = true;
  addressValid: boolean = true;
  isOwner: boolean = false;

  constructor(private eventService: EventService, private route: ActivatedRoute, private router: Router, private alertService: AlertService) {}

  ngOnInit(): void {
    const eventId = this.route.snapshot.paramMap.get('id');
    if (eventId) {
      this.eventService.getEventById(eventId).subscribe((data: Ievent) => {
        this.event = data;
        this.imageSelected = this.event.images.length > 0;

        const token = localStorage.getItem('jwtToken');
        if (token) { 
        const decodedToken: any = jwtDecode(token);
        const userId = parseInt(decodedToken.sub, 10); 
        const userOwner = this.event?.userOwner;
        console.log('User ID:', userId);
        console.log('User Owner:', userOwner); 
        this.isOwner = userId === userOwner;
        console.log('Is Owner:', this.isOwner); 
        }
      }, error => {
        console.error('Error al obtener los detalles del evento:', error);
      });
    }
  }

  openDeleteModal(): void {
    const modalElement = document.getElementById('deleteModal');
    if (modalElement) {
      this.deleteModal = new (window as any).bootstrap.Modal(modalElement);
      this.deleteModal.show();
    }
  }

  showUpdateModal = false;
  
  openUpdateModal(): void {
      this.showUpdateModal = true;
      

      setTimeout(() => {
          const modalElement = document.getElementById('updateModal');
          if (modalElement) {
           
              this.updateModal = new (window as any).bootstrap.Modal(modalElement);
               console.log(this.updateModal)
              this.updateModal.show();
          }
      }, 0); // Permitir que el DOM actualice antes de mostrar la modal
  }
  
  closeUpdateModal(): void {
      if (this.updateModal) {
          this.updateModal.hide();
          this.showUpdateModal = false;
      }
  }
  

  onFileSelected(event: any): void {
    this.selectedFiles = event.target.files;
    this.imageSelected = this.selectedFiles.length > 0;
  }

  validateName(name: string): boolean {
    const namePattern = /^[A-Za-z][A-Za-z0-9 ]*$/;
    return namePattern.test(name) && /[A-Za-z]/.test(name) && name.length <= 50;
  }

  validateDescription(description: string): boolean {
    return description.length <= 250;
  }

  updateEvent(): void {
    if (this.event && this.nameValid && this.descriptionValid && this.addressValid) {
      const formData = new FormData();
      formData.append('name', this.event.name);
      formData.append('description', this.event.description);
      formData.append('address', this.event.address);

      if (this.selectedFiles.length > 0) {
        for (let i = 0; i < this.selectedFiles.length; i++) {
          formData.append('images', this.selectedFiles[i], this.selectedFiles[i].name);
        }
      } else {
        this.event.images.forEach((image) => {
          formData.append('images', image);
        });
      }

      this.eventService.updateEvent(this.event._id, formData).subscribe(response => {
        this.alertService.showSuccess('Lugar actualizado exitosamente.');
        if (this.updateModal) {
          this.updateModal.hide();
        }
        this.router.navigate(['/info-event']);
      }, error => {
        this.alertService.showError('Hubo un error al actualizar el lugar.');
        console.error('Error al actualizar el lugar:', error);
      });
    } else {
      this.alertService.showWarning('Por favor, corrige los errores antes de enviar.');
    }
  }

  deleteEvent(): void {
    if (this.event && this.event._id) {
      this.eventService.deleteEvent(this.event._id).subscribe(response => {
        this.alertService.showSuccess('Lugar eliminado exitosamente.');
        if (this.deleteModal) {
          this.deleteModal.hide();
        }
        this.router.navigate(['/info-event']);
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