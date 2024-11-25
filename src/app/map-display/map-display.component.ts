import { Component, Input, OnInit } from '@angular/core';
import * as L from 'leaflet';

@Component({
  selector: 'app-map-display',
  templateUrl: './map-display.component.html',
  styleUrls: ['./map-display.component.css']
})
export class MapDisplayComponent implements OnInit {
  @Input() lat!: number;
  @Input() lng!: number;
  private map!: L.Map;

  ngOnInit(): void {
    this.initializeMap();
  }

  private initializeMap(): void {
    if (this.lat && this.lng) {
      this.map = L.map('map-display').setView([this.lat, this.lng], 12); // Zoom nivel 12
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors',
      }).addTo(this.map);

      L.marker([this.lat, this.lng]).addTo(this.map);
    }
  }
}
