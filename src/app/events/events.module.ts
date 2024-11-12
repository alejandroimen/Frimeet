import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddEventComponent } from './add-event/add-event.component';
import { CheckAvailabilityComponent } from './check-availability/check-availability.component';
import { InfoEventComponent } from './info-event/info-event.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DetailsEventComponent } from './details-event/details-event.component';

@NgModule({
  declarations: [
    AddEventComponent,
    CheckAvailabilityComponent,
    InfoEventComponent,
    DetailsEventComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    AddEventComponent,
    CheckAvailabilityComponent,
    InfoEventComponent
  ]
})
export class EventsModule { }
