import { Component, DoCheck, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Ievent } from '../interfaces/ievent';
import { EventService } from '../../services/event.service';
import { PlaceService } from '../../places/services/place.service';
import { Iplace } from '../../places/interfaces/iplace';
import { Router } from '@angular/router';
import { SharedDataService } from '../../services/shared-data.service';
import { AlertService } from '../../services/alert.service';
import { TagsService } from '../../services/tags.service';
import { NavbarService } from '../../services/navbar.service';

@Component({
  selector: 'app-add-event',
  templateUrl: './add-event.component.html',
  styleUrls: ['./add-event.component.css']
})
export class AddEventComponent implements OnInit, DoCheck {
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
    attendees: [],
    images: [],
    tag: [],
    userOwner: 0,
    coordinates: {
      lat: 0,
      lng: 0,
    }
  };

  places: Iplace[] = [];
  selectedFiles: File[] = [];
  selectedImagePreview: string | null = null;
  isSubmitting: boolean = false;
  nameValid: boolean = true;
  descriptionValid: boolean = true;
  dateValid: boolean = true;
  endDateValid: boolean = true;
  maxPeoplesValid: boolean = true;
  addressValid: boolean = true;
  coordinatesValid: boolean = true;
  imageSelected: boolean = false;
  disablePlaceSelect: boolean = false;
  currentDate: string = '';

  allTags: string[] = []; 
  selectedTags: string[] = [];
  itemsPerPage: number = 8;
  currentPage: number = 0;
  visibleTags: string[] = [];

  isCollapsed: boolean = true;

  constructor(
    private eventService: EventService,
    private placeService: PlaceService,
    private router: Router,
    private sharedDataService: SharedDataService,
    private alertService: AlertService,
    private tagsService: TagsService,
    private navbarService: NavbarService
  ) {}

  ngOnInit(): void {
    const now = new Date();
    this.currentDate = now.toISOString().slice(0, 16);

    this.placeService.getPlaces().subscribe((data: Iplace[]) => {
      this.places = data;
    });

    const coords = this.sharedDataService.getCoordinates();
    if (coords.lat !== 0 && coords.lng !== 0) {
      this.event.coordinates = coords;
    }
    this.disablePlaceSelect = this.sharedDataService.getDisablePlaceSelect();

    this.tagsService.getTagsEvent().subscribe(tagsData => {
      this.allTags = tagsData.tagsEvent.map((tag: any) => tag.tagsEvent);
      this.updateVisibleTags();
    });

    this.navbarService.isCollapsed$.subscribe(state => {
      this.isCollapsed = state;
    });
  }

  updateVisibleTags(): void {
    const start = this.currentPage * this.itemsPerPage;
    const end = start + this.itemsPerPage;
    this.visibleTags = this.allTags.slice(start, end);
  }

  toggleTag(event: Event, tag: string): void {
    event.preventDefault();
    const index = this.selectedTags.indexOf(tag);
    if (index > -1) {
      this.selectedTags.splice(index, 1);
    } else {
      this.selectedTags.push(tag);
    }
  }  

  scrollLeft(event: Event): void {
    event.preventDefault();
    if (this.currentPage > 0) {
      this.currentPage--;
      this.updateVisibleTags();
    }
  }

  scrollRight(event: Event): void {
    event.preventDefault();
    const maxPage = Math.ceil(this.allTags.length / this.itemsPerPage) - 1;
    if (this.currentPage < maxPage) {
      this.currentPage++;
      this.updateVisibleTags();
    }
  }

  onPlaceChange(): void {
    const selectedPlace = this.places.find(place => place._id === this.event.idPlace);
    if (selectedPlace) {
      this.event.coordinates = selectedPlace.coordinates;
    }
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
    const descriptionPattern = /^(?=.*[A-Za-z]).{1,250}$/;
    const hasEnoughLetters = (description.match(/[A-Za-z]/g) || []).length >= 10;
    return descriptionPattern.test(description) && hasEnoughLetters;
  }

  validateAddress(address: string): boolean {
    return address.length <= 200;
  }

  validateMaxPeoples(maxPeoples: number): boolean {
    return maxPeoples >= 1;
  }

  validateDates(startDate: Date, endDate: Date): boolean {
    return new Date(startDate) < new Date(endDate);
  }

  validateCoordinates(coords: { lat: number; lng: number }): boolean {
    return coords.lat !== 0 && coords.lng !== 0;
  }

  ngDoCheck(): void {
    this.nameValid = this.validateName(this.event.name);
    this.descriptionValid = this.validateDescription(this.event.description);
    this.addressValid = this.validateAddress(this.event.address);
    this.dateValid = this.validateDates(this.event.date, this.event.endDate);
    this.endDateValid = this.event.endDate > this.event.date;
    this.maxPeoplesValid = this.validateMaxPeoples(this.event.maxPeoples);
    this.coordinatesValid = this.validateCoordinates(this.event.coordinates);
  }

  onSubmit(form: NgForm): void {
    this.isSubmitting = true;
    if (
      form.invalid ||
      !this.nameValid ||
      !this.descriptionValid ||
      !this.addressValid ||
      !this.imageSelected ||
      !this.dateValid ||
      !this.endDateValid ||
      !this.maxPeoplesValid ||
      !this.coordinatesValid
    ) {
      this.isSubmitting = false;
      return;
    }

    this.event.tag = this.selectedTags;

    const formData = new FormData();
    formData.append('name', this.event.name);
    formData.append('maxPeoples', this.event.maxPeoples.toString());
    formData.append('date', this.event.date.toISOString());
    formData.append('endDate', this.event.endDate.toISOString());
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

    this.eventService.addEvent(formData).subscribe(response => {
      this.isSubmitting = false;
      form.resetForm();
      this.router.navigate(['/info-event']);
    }, error => {
      this.isSubmitting = false;
    });
  }

  onAddNewPlace(): void {
    this.router.navigate(['/check-availability']);
  }
}
