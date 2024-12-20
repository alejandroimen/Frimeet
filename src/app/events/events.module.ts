import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddEventComponent } from './components/add-event/add-event.component';
import { CheckAvailabilityComponent } from './components/check-availability/check-availability.component';
import { InfoEventComponent } from './components/info-event/info-event.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DetailsEventComponent } from './components/details-event/details-event.component';
import { RouterModule } from '@angular/router';
import { MapsComponent } from './map-display2/map-display2.component';
import { MapDisplayComponent } from '../standalone/map-display/map-display.component';

@NgModule({
  declarations: [
    AddEventComponent,
    CheckAvailabilityComponent,
    InfoEventComponent,
    DetailsEventComponent,
    MapsComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MapDisplayComponent
  ],
  exports: [
    RouterModule,
    AddEventComponent,
    CheckAvailabilityComponent,
    InfoEventComponent
  ]
})
export class EventsModule { }
