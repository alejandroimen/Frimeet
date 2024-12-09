import { Component, AfterViewInit, Output, EventEmitter } from '@angular/core';
import * as L from 'leaflet';

delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

@Component({
  selector: 'app-map-display2',
  templateUrl: './map-display2.component.html',
  styleUrls: ['./map-display2.component.css']
})
export class MapsComponent implements AfterViewInit {
  @Output() coordinatesSelected = new EventEmitter<{ lat: number, lng: number }>();
  private map!: L.Map;

  ngAfterViewInit(): void {
    this.initializeMap();
  }

  private initializeMap(): void {
    // Crear el mapa centrado en una ubicación inicial
    this.map = L.map('map').setView([16.753045453139816, -93.1156221748877], 12);

    // Agregar el mapa base de OpenStreetMap
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors',
    }).addTo(this.map);

    // Evento para seleccionar un punto en el mapa
    this.map.on('click', (event: any) => {
      const coords = event.latlng;
      console.log('Coordenadas seleccionadas:', coords);
      this.addMarker(coords.lat, coords.lng);
      this.coordinatesSelected.emit(coords); // Emitir las coordenadas seleccionadas
    });
  }

  private addMarker(lat: number, lng: number): void {
    // Limpiar marcadores previos
    this.map.eachLayer((layer) => {
      if (layer instanceof L.Marker) {
        this.map.removeLayer(layer);
      }
    });

    // Agregar un marcador en la ubicación seleccionada
    L.marker([lat, lng]).addTo(this.map);
  }

}
