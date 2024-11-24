import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Ievent } from '../interfaces/ievent';
import { EventService } from '../../services/event.service';
import { PlaceService } from '../../places/services/place.service';
import { Iplace } from '../../places/interfaces/iplace';
import { Router } from '@angular/router';
import { SharedDataService } from '../../services/shared-data.service';

@Component({
  selector: 'app-add-event',
  templateUrl: './add-event.component.html',
  styleUrls: ['./add-event.component.css']
})
export class AddEventComponent implements OnInit {
  event: Ievent = {
    _id: '',
    name: '',
    maxPeoples: 0,
    idPlace: '0',
    date: new Date(),
    endDate: new Date(),
    description: '',
    address: '',
    price: 0,
    willAttend: 0,
    images: [],
    coordinates: {
      lat: 0,
      lng: 0,
    }
  };

  places: Iplace[] = [];
  selectedFiles: File[] = [];
  selectedImagePreview: string | null = null;

  constructor(
    private eventService: EventService,
    private placeService: PlaceService,
    private router: Router,
    private sharedDataService: SharedDataService
  ) {}

  ngOnInit(): void {
    this.placeService.getPlaces().subscribe((data: Iplace[]) => {
      this.places = data;
    });

    // Recuperar coordenadas si existen
    const coords = this.sharedDataService.getCoordinates();
    if (coords.lat !== 0 && coords.lng !== 0) {
      this.event.coordinates = coords;
      console.log('Coordenadas recuperadas del servicio:', coords);
    }
  }

  onFileSelected(event: any): void {
    this.selectedFiles = event.target.files;
    const file = event.target.files[0];
    console.log(file);
    
    if (file) {
      this.selectedImagePreview = URL.createObjectURL(file);
    }
  }
  
  onSubmit(form: NgForm): void {
    if (form.invalid) {   
      console.log('Form Errors:', form.errors);
      console.log('Form Controls:', form.controls);
      return;
    }
  
    const formData = new FormData();
    formData.append('name', this.event.name);
    formData.append('maxPeoples', this.event.maxPeoples.toString());
    formData.append('date', this.event.date.toString());
    formData.append('endDate', this.event.endDate.toString());
    formData.append('description', this.event.description);
    formData.append('address', this.event.address);
    formData.append('price', this.event.price.toString());
    formData.append('coordinates[lat]', this.event.coordinates.lat.toString());
    formData.append('coordinates[lng]', this.event.coordinates.lng.toString());

    if (this.event.idPlace) {
      formData.append('idPlace', this.event.idPlace);
    }

    for (let i = 0; i < this.selectedFiles.length; i++) {
      formData.append('images', this.selectedFiles[i], this.selectedFiles[i].name);
    }

    // Crear un objeto para depurar el contenido de formData
    const formDataObj: { [key: string]: any } = {};
    formData.forEach((value, key) => {
      formDataObj[key] = value;
    });
    console.log('Form Data:', formDataObj);

    this.eventService.addEvent(formData).subscribe(response => {
      console.log('Evento agregado:', response);
      form.resetForm();
      this.router.navigate(['/info-event']); // Redirecciona a la vista de éxito
    }, error => {
      console.error('Error al agregar el evento:', error);
    });
  }

  onAddNewPlace(): void {
    this.router.navigate(['/check-availability']); // Actualiza la ruta según sea necesario
  }
}
