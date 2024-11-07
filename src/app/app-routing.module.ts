import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddEventComponent } from './eventos/components/add-event/add-event.component';
import { CheckAvailabilityComponent } from './eventos/components/check-availability/check-availability.component';

const routes: Routes = [
  { path: "add-event", component: AddEventComponent },
  { path: "check-availability", component: CheckAvailabilityComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
