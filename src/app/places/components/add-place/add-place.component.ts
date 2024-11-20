import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Iplace } from '../../interfaces/iplace';
import { PlaceService } from '../../services/place.service';

@Component({
  selector: 'app-add-place',
  templateUrl: './add-place.component.html',
  styleUrls: ['./add-place.component.css']
})
export class AddPlaceComponent {
  place: Iplace = {
    _id: "",
    name: '',
    types: '',
    images: [],
    description: '',
    tags: '',
    address: 'enmicasa',
  };

  selectedFiles: File[] = [];
  selectedImagePreview: string | null = null;

  constructor(private placeService: PlaceService) {}

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
    formData.append('name', this.place.name);
    formData.append('types', this.place.types);
    formData.append('description', this.place.description);
    formData.append('address', this.place.address);
    formData.append('tag', this.place.tags);
    console.log(this.place.name)
    for (let i = 0; i < this.selectedFiles.length; i++) {
      formData.append('images', this.selectedFiles[i], this.selectedFiles[i].name);
    }

    console.log(this.selectedFiles);
  
    this.placeService.addPlace(formData).subscribe(response => {
      console.log('Lugar agregado:', response);
      form.resetForm();
    }, error => {
      console.error('Error al agregar el lugar:', error);
    });
  }
}
