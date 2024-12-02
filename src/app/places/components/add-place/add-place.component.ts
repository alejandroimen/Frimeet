import { Component, DoCheck, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { NavbarService } from '../../../services/navbar.service';
import { Iplace } from '../../interfaces/iplace';
import { PlaceService } from '../../services/place.service';
import { AlertService } from '../../../services/alert.service';

@Component({
  selector: 'app-add-place',
  templateUrl: './add-place.component.html',
  styleUrls: ['./add-place.component.css'],
})
export class AddPlaceComponent implements DoCheck, OnInit {
  place: Iplace = {
    _id: '',
    name: '',
    types: '',
    images: [],
    description: '',
    tag: '',
    totalStarts: 0,
    address: '',
    userOwner: 0,
    coordinates: {
      lat: 0,
      lng: 0,
    },
  };
  selectedFiles: File[] = [];
  selectedImagePreview: string | null = null;
  isSubmitting: boolean = false;
  nameValid: boolean = true;
  descriptionValid: boolean = true;
  addressValid: boolean = true;
  imageSelected: boolean = false;
  isCollapsed: boolean = true;

  constructor(
    private placeService: PlaceService,
    private alertService: AlertService,
    private router: Router,
    private navbarService: NavbarService
  ) {}

  ngOnInit(): void {
    this.navbarService.isCollapsed$.subscribe((state) => {
      this.isCollapsed = state;
    });
  }

  onFileSelected(event: any): void {
    this.selectedFiles = event.target.files;
    const file = event.target.files[0];
    this.imageSelected = file !== undefined;
    if (file) {
      this.selectedImagePreview = URL.createObjectURL(file);
    }
  }

  validateName(name: string): boolean {
    const namePattern = /^[A-Za-z][A-Za-z0-9 ]*$/;
    return namePattern.test(name) && /[A-Za-z]/.test(name) && name.length <= 50;
  }

  validateDescription(description: string): boolean {
    return description.length <= 250;
  }

  validateAddress(address: string): boolean {
    return address.length <= 70 && address.trim().length > 0;
  }

  ngDoCheck(): void {
    this.nameValid = this.validateName(this.place.name);
    this.descriptionValid = this.validateDescription(this.place.description);
    this.addressValid = this.validateAddress(this.place.address);
  }

  onCoordinatesSelected(coords: { lat: number; lng: number }): void {
    this.place.coordinates = coords;
  }

  onSubmit(form: NgForm): void {
    this.isSubmitting = true;
    if (form.invalid || !this.nameValid || !this.descriptionValid || !this.addressValid || !this.imageSelected) {
      if (form.invalid) {
        this.alertService.showWarning('Por favor, completa todos los campos.');
      } else if (!this.nameValid) {
        this.alertService.showWarning(
          'El nombre debe comenzar con una letra, contener al menos una letra y no más de 50 caracteres.'
        );
      } else if (!this.descriptionValid) {
        this.alertService.showWarning('La descripción no puede tener más de 250 caracteres.');
      } else if (!this.addressValid) {
        this.alertService.showWarning('La dirección no puede tener más de 70 caracteres y no puede estar vacía.');
      } else if (!this.imageSelected) {
        this.alertService.showWarning('Por favor, selecciona al menos una imagen.');
      }
      this.isSubmitting = false;
      return;
    }

    const formData = new FormData();
    formData.append('name', this.place.name);
    formData.append('types', this.place.types);
    formData.append('description', this.place.description);
    formData.append('address', this.place.address);
    formData.append('tag', this.place.tag);
    formData.append('coordinates[lat]', this.place.coordinates.lat.toString());
    formData.append('coordinates[lng]', this.place.coordinates.lng.toString());

    for (let i = 0; i < this.selectedFiles.length; i++) {
      formData.append('images', this.selectedFiles[i], this.selectedFiles[i].name);
    }

    this.placeService.addPlace(formData).subscribe(
      (response) => {
        this.alertService.showSuccess('Lugar agregado exitosamente.');
        form.resetForm();
        this.isSubmitting = false;
        this.router.navigate(['/info-place']);
      },
      (error) => {
        this.alertService.showError('Hubo un error al agregar el lugar.');
        this.isSubmitting = false;
      }
    );
  }
}
