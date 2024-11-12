import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Ievent } from '../interfaces/ievent';
import { EventService } from '../../services/event.service';

@Component({
  selector: 'app-add-event',
  templateUrl: './add-event.component.html',
  styleUrls: ['./add-event.component.css']
})
export class AddEventComponent {
  event: Ievent = {
    _id:'',
    name: '',
    maxPeoples: 0,
    idPlace: '',
    date: new Date(),
    description: '',
    address: '',
    price: 0,
    willAttend: 0,
    images: []
  };

  selectedFiles: File[] = [];
  selectedImagePreview: string | null = null;

  constructor(private eventService: EventService) {}

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
    formData.append('idPlace', this.event.idPlace.toString());
    formData.append('date', this.event.date.toString());
    formData.append('description', this.event.description);
    formData.append('address', this.event.address);
    formData.append('price', this.event.price.toString());
    formData.append('willAttend', this.event.willAttend.toString());
    console.log(this.event.name)
    for (let i = 0; i < this.selectedFiles.length; i++) {
      formData.append('images', this.selectedFiles[i], this.selectedFiles[i].name);
    }

    console.log(this.selectedFiles);
  
    this.eventService.addEvent(formData).subscribe(response => {
      console.log('Evento agregado:', response);
      form.resetForm();
    }, error => {
      console.error('Error al agregar el evento:', error);
    });
  }
}
