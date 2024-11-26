import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { EventService } from '../../services/event.service';
import { Ievent } from '../../events/interfaces/ievent';

@Component({
  selector: 'app-events-review',
  templateUrl: './events-review.component.html',
  styleUrls: ['./events-review.component.css']
})
export class EventsReviewComponent {
  events: Ievent[] = []; // Lista de eventos obtenidos.
  event: Ievent = {
    _id: "",
    name: "",
    maxPeoples: 0,
    idPlace: "",
    date: new Date(),
    endDate: new Date(),
    description: "",
    address: "",
    price: 0,
    willAttend: 0,
    images: [],
    userOwner: 0,
    coordinates: {
      lat: 0,
      lng: 0,
    }
  };


  constructor(private eventService: EventService, private router: Router) {}

  ngOnInit(): void {
    // Obtención de los eventos al cargar el componente.
    this.eventService.getEvents().subscribe(
      (data: Ievent[]) => {
        this.events = data;
        console.log('Eventos obtenidos:', this.events);
      },
      error => {
        console.error('Error al obtener eventos:', error);
      }
    );
  }

  // Navega a los detalles del evento seleccionado.
  goToDetails(eventId: string): void {
    console.log('ID del evento seleccionado:', eventId);
    this.router.navigate(['/events', eventId]);
  }
}
