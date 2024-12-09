import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { EventService } from '../../../services/event.service';
import { Ievent } from '../../interfaces/ievent';
import { NavbarService } from '../../../services/navbar.service';

@Component({
  selector: 'app-info-event',
  templateUrl: './info-event.component.html',
  styleUrls: ['./info-event.component.css'],
  encapsulation: ViewEncapsulation.Emulated
})
export class InfoEventComponent implements OnInit {
  isCollapsed: boolean = true;
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

  constructor(
    private eventService: EventService,
    private router: Router,
    private navbarService: NavbarService
  ) {}

  ngOnInit(): void {
    this.eventService.getEvents().subscribe(
      (data: Ievent[]) => {
        this.events = data;
        console.log('Eventos obtenidos:', this.events);
      },
      (error) => {
        console.error('Error al obtener eventos:', error);
      }
    );

    this.navbarService.isCollapsed$.subscribe((state) => {
      this.isCollapsed = state;
    });
  }

  goToDetails(eventId: string): void {
    console.log('ID del evento seleccionado:', eventId);
    this.router.navigate(['/events', eventId]);
  }
}
