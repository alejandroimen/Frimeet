import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Ievent } from '../interfaces/ievent';
import { EventService } from '../../services/event.service';
@Component({
  selector: 'app-info-event',
  templateUrl: './info-event.component.html',
  styleUrls: ['./info-event.component.css']
})
export class InfoEventComponent {
  events: Ievent[] = []
  event: Ievent = {
    _id: "",
    name: " ",
    maxPeoples: 0,
    idPlace: '',
    date: new Date,
    description: " ",
    address: " ",
    price: 0,
    willAttend: 0,
    images: []
  }

  constructor(private eventService: EventService, private router: Router){}

  ngOnInit(){
    this.eventService.getEvents().subscribe(
      (data: Ievent[]) => {
        this.events = data
        console.log(this.events);
      },
      error => {
        console.log('Error al obtener eventos', error);
        
      }
    )
  }

  goToDetails(id: string): void {
    console.log(id);
    
    this.router.navigate(['/events', id])
  }
}
