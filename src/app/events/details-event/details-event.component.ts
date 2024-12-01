import { Component, OnInit, DoCheck } from '@angular/core';
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
export class DetailsEventComponent implements OnInit, DoCheck {
  event: Ievent | undefined;

  imageSelected: boolean = true;
  selectedFiles: File[] = [];
  nameValid: boolean = true;
  descriptionValid: boolean = true;
  addressValid: boolean = true;
  isOwner: boolean = false;
  isAttendee: boolean = false;
  userId: number | null = null;

  constructor(private eventService: EventService, private route: ActivatedRoute, private router: Router, private alertService: AlertService) {}

  ngOnInit(): void {
    const eventId = this.route.snapshot.paramMap.get('id');
    if (eventId) {
      this.eventService.getEventById(eventId).subscribe((data: Ievent) => {
        this.event = data;
        this.imageSelected = this.event.images.length > 0;

        if (!this.event.tag) {
          this.event.tag = [];
        }

        const token = localStorage.getItem('jwtToken');
        if (token) {
          const decodedToken: any = jwtDecode(token);
          this.userId = parseInt(decodedToken.sub, 10);
          const userOwner = this.event?.userOwner;
          this.isOwner = this.userId === userOwner;
          this.isAttendee = this.event?.attendees.includes(this.userId);
        }
      }, error => {
        this.alertService.showError('Error al obtener los detalles del evento.');

        console.error('Error al obtener los detalles del evento:', error);
      });
    }
  }

  ngDoCheck(): void {
    if (this.event) {
      this.nameValid = this.validateName(this.event.name);
      this.descriptionValid = this.validateDescription(this.event.description);
      this.addressValid = !!this.event.address?.trim();
    }
  }

  openUpdateModal(): void {
    const modalElement = document.getElementById('updateModal');
    if (modalElement) {
      modalElement.style.display = 'block';
    }
  }

  closeUpdateModal(): void {
    const modalElement = document.getElementById('updateModal');
    if (modalElement) {
      modalElement.style.display = 'none';
    }
  }

  openDeleteModal(): void {
    const modalElement = document.getElementById('deleteModal');
    if (modalElement) {
      modalElement.style.display = 'block';
    }
  }

  closeDeleteModal(): void {
    const modalElement = document.getElementById('deleteModal');
    if (modalElement) {
      modalElement.style.display = 'none';
    }
  }

  onFileSelected(event: any): void {
    this.selectedFiles = Array.from(event.target.files); // Actualizar la lista de archivos seleccionados
    this.imageSelected = this.selectedFiles.length > 0;

    if (this.imageSelected) {
      console.log('Archivos seleccionados:', this.selectedFiles);

      // Limpiar las imágenes previas de la vista previa local
      if (this.event) {
        this.event.images = [];
      }

      // Generar vistas previas locales de las nuevas imágenes seleccionadas
      this.selectedFiles.forEach((file) => {
        const previewUrl = URL.createObjectURL(file);
        if (this.event) {
          this.event.images.push(previewUrl);
        }
        console.log('Vista previa generada:', previewUrl);
      });
    } else {
      console.log('No se seleccionaron archivos.');
    }
  }

  ngOnDestroy(): void {
    if (this.event?.images) {
      this.event.images.forEach((url) => URL.revokeObjectURL(url));
    }
  }

  validateName(name: string): boolean {
    const namePattern = /^[A-Za-z][A-Za-z0-9 ]*$/;
    return namePattern.test(name) && /[A-Za-z]/.test(name) && name.length <= 50;
  }

  validateDescription(description: string): boolean {
    return description.length <= 250;
  }

  updateEvent(eventForm: any): void {
    if (!eventForm.valid || !this.nameValid || !this.descriptionValid || !this.addressValid) {
      this.alertService.showWarning('Por favor, corrige los errores antes de enviar.');
      return;
    }

    if (this.event) {
      const formData = new FormData();
      formData.append('name', this.event.name.trim());
      formData.append('description', this.event.description.trim());
      formData.append('address', this.event.address.trim());
      formData.append('maxPeoples', this.event.maxPeoples.toString());
      formData.append('date', new Date(this.event.date).toISOString());
      formData.append('endDate', new Date(this.event.endDate).toISOString());
      formData.append('price', this.event.price ? this.event.price.toString() : '0');

      // Añadir etiquetas (tags)
      if (this.event.tag) {
        this.event.tag.forEach((tag, index) => formData.append(`tag[${index}]`, tag));
      }

      // Subir solo nuevas imágenes
      if (this.selectedFiles.length > 0) {
        this.selectedFiles.forEach((file) => {
          formData.append('images', file); // Usa exactamente el mismo nombre que en multer
        });
      }

      // Llamar al servicio para actualizar el evento
      this.eventService.updateEvent(this.event._id, formData).subscribe(
        (response) => {
          console.log('Respuesta del backend:', response);
          this.alertService.showSuccess('Evento actualizado exitosamente.');
          this.closeUpdateModal();
          this.router.navigate(['/info-event']);
        },
        (error) => {
          this.alertService.showError('Hubo un error al actualizar el evento.');
          console.error('Error al actualizar el evento:', error);
        }
      );
    }
  }

  joinEvent(): void {
    if (this.event && this.event._id) {
      this.eventService.joinEvent(this.event._id).subscribe(
        (response) => {
          this.alertService.showSuccess('Te has unido al evento exitosamente.');
          this.isAttendee = true;
          if (this.userId !== null) {
            this.event?.attendees.push(this.userId); // Actualiza la lista de asistentes localmente
          }
        },
        (error) => {
          this.alertService.showError('Hubo un error al unirse al evento.');
          console.error('Error al unirse al evento:', error);
        }
      );
    }
  }

  leaveEvent(): void {
    if (this.event && this.event._id) {
      this.eventService.leaveEvent(this.event._id).subscribe(
        (response) => {
          this.alertService.showSuccess('Te has salido del evento exitosamente.');
          this.isAttendee = false;
          if (this.userId !== null && this.event?.attendees) {
            this.event.attendees = this.event.attendees.filter(attendee => attendee !== this.userId); // Actualiza la lista de asistentes localmente
          }
        },
        (error) => {
          this.alertService.showError('Hubo un error al salir del evento.');
          console.error('Error al salir del evento:', error);
        }
      );
    }
  }

  deleteEvent(): void {
    if (this.event && this.event._id) {
      this.eventService.deleteEvent(this.event._id).subscribe(response => {
        this.alertService.showSuccess('Evento eliminado exitosamente.');
        this.closeDeleteModal();
        this.router.navigate(['/info-event']);
      }, error => {
        this.alertService.showError('Hubo un error al eliminar el evento.');
        console.error('Error al eliminar el evento:', error);

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