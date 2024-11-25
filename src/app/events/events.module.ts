import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddEventComponent } from './add-event/add-event.component';
import { CheckAvailabilityComponent } from './check-availability/check-availability.component';
import { InfoEventComponent } from './info-event/info-event.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DetailsEventComponent } from './details-event/details-event.component';
import { RouterModule } from '@angular/router';

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
    RouterModule,
    AddEventComponent,
    CheckAvailabilityComponent,
    InfoEventComponent
  ]
})
export class EventsModule { }
