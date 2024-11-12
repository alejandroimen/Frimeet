import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EventService } from '../../services/event.service';
import { Ievent } from '../interfaces/ievent';

@Component({
  selector: 'app-details-event',
  templateUrl: './details-event.component.html',
  styleUrl: './details-event.component.css'
})
export class DetailsEventComponent {
  event: Ievent | undefined;
  deleteModal: any;
  updateModal: any;
  selectedFiles: File[] = [];

  constructor(private eventService: EventService, private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    const eventId = this.route.snapshot.paramMap.get('id');
    if (eventId) {
      this.eventService.getEventById(eventId).subscribe((data: Ievent) => {
        this.event = data;
      }, error => {
        console.error('Error al obtener los detalles del lugar:', error);
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

  openUpdateModal(): void {
    const modalElement = document.getElementById('updateModal');
    if (modalElement) {
      this.updateModal = new (window as any).bootstrap.Modal(modalElement);
      this.updateModal.show();
    }
  }

  onFileSelected(event: any): void {
    this.selectedFiles = event.target.files;
  }

  updatePlace(): void {
    if (this.event) {
      const formData = new FormData();
      formData.append('name', this.event.name);
      formData.append('maxPeoples', this.event.maxPeoples.toString());
      formData.append('idPlace', this.event.idPlace.toString());
      formData.append('date', this.event.date.toString());
      formData.append('description', this.event.description);
      formData.append('address', this.event.address);
      formData.append('price', this.event.price.toString());
      formData.append('willAttend', this.event.willAttend.toString());
      console.log(this.event.name)
      for (let i = 0; i < this.selectedFiles.length; i++) {
        formData.append('images', this.selectedFiles[i], this.selectedFiles[i].name);
      }

      this.eventService.updateEvent(this.event._id, formData).subscribe(response => {
        console.log('Lugar actualizado:', response);
        if (this.updateModal) {
          this.updateModal.hide();
        }
        this.router.navigate(['/info-event']);
      }, error => {
        console.error('Error al actualizar el lugar:', error);
      });
    }
  }

  deletePlace(): void {
    if (this.event && this.event._id) {
      this.eventService.deleteEvent(this.event._id).subscribe(response => {
        console.log('Lugar eliminado:', response);
        if (this.deleteModal) {
          this.deleteModal.hide();
        }
        this.router.navigate(['/info-event']);
      }, error => {
        console.error('Error al eliminar el lugar:', error);
      });
    }
  }

}
