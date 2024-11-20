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

  ngAfterViewInit(): void {
    this.initMap();
  }

  initMap(): void {
    const map = new google.maps.Map(document.getElementById('google-map') as HTMLElement, {
      center: { lat: 37.7749, lng: -122.4194 }, // Coordenadas de ejemplo: San Francisco
      zoom: 12,
    });
  }
}
