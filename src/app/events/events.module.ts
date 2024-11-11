import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddEventComponent } from './add-event/add-event.component';
import { CheckAvailabilityComponent } from './check-availability/check-availability.component';
import { InfoEventComponent } from './info-event/info-event.component';



@NgModule({
  declarations: [
    AddEventComponent,
    CheckAvailabilityComponent,
    InfoEventComponent,
  ],
  imports: [
    CommonModule
  ],
  exports: [
    AddEventComponent,
    CheckAvailabilityComponent,
  ]
})
export class EventsModule { }
