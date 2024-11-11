import { Component } from '@angular/core';
import { Ievent } from '../interfaces/ievent';

@Component({
  selector: 'app-info-event',
  templateUrl: './info-event.component.html',
  styleUrl: './info-event.component.css'
})
export class InfoEventComponent {

  event: Ievent = {

    name: " ",
    maxPeoples: 0,
    idPlace: 0,
    date: new Date,
    description: " ",
    address: " ",
    price: 0,
    willAttend: 0,
    images: []
  }
}
