import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddEventComponent } from './add-event/add-event.component';
import { CheckAvailabilityComponent } from './check-availability/check-availability.component';



@NgModule({
  declarations: [
    AddEventComponent,
    CheckAvailabilityComponent,
  ],
  imports: [
    CommonModule
  ]
})
export class EventsModule { }
