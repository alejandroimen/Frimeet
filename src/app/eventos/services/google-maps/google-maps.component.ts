import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-google-maps',
  templateUrl: './google-maps.component.html',
  styleUrl: './google-maps.component.css'
})
export class GoogleMapsComponent implements OnInit{

  constructor() {}

  ngOnInit(): void {}

  display: any;
  center: google.maps.LatLngLiteral = {
    lat: 22.2736208,
    lng: 70.7512555
  };

  zoom = 6;

  /*
  moveMap()
  */

  move(event: google.maps.MapMouseEvent) {
    if (event.latLng != null) this.display = event.latLng.toJSON();
  }
}
