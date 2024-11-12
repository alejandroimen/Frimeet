import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WelcomeComponent } from './standalone/welcome/welcome.component';
import { AddPlaceComponent } from './places/components/add-place/add-place.component';
import { InfoPlaceComponent } from './places/components/info-place/info-place.component';
import { AddEventComponent } from './events/add-event/add-event.component';
import { CheckAvailabilityComponent } from './events/check-availability/check-availability.component';
import { InfoEventComponent } from './events/info-event/info-event.component';
import { DetailsEventComponent } from './events/details-event/details-event.component';

const routes: Routes = [
  {path: '', component: WelcomeComponent},     
  {path: 'add-place', component: AddPlaceComponent},
  {path: 'info-place', component: InfoPlaceComponent},
  { path: "add-event", component: AddEventComponent },
  { path: "check-availability", component: CheckAvailabilityComponent },
  {path: "info-event", component: InfoEventComponent},
  
  {path: "events/:id", component: DetailsEventComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
