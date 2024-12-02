import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { EventService } from '../../services/event.service';
import { Ievent } from '../../events/interfaces/ievent';
import { NavbarService } from '../../services/navbar.service';

@Component({
  selector: 'app-events-review',
  templateUrl: './events-review.component.html',
  styleUrls: ['./events-review.component.css']
})
export class EventsReviewComponent {
  isNavbarCollapsed: boolean = true;
  events: Ievent[] = [];
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
    attendees: [],
    images: [],
    tag: [],
    userOwner: 0,
    coordinates: {
      lat: 0,
      lng: 0,
    }
  };


  constructor(private eventService: EventService, private router: Router, private navbarService: NavbarService) {}

  ngOnInit(): void {
    this.eventService.getAttendingEvents().subscribe(
      (data: Ievent[]) => {
        this.events = data;
        console.log('Eventos obtenidos:', this.events);
      },
      error => {
        console.error('Error al obtener eventos:', error);
      }
    );

    this.navbarService.isCollapsed$.subscribe((isCollapsed) => {
      this.isNavbarCollapsed = isCollapsed;
    });
  }

  goToDetails(eventId: string): void {
    console.log('ID del evento seleccionado:', eventId);
    this.router.navigate(['/events', eventId]);
  }
}
