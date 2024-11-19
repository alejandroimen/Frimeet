import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WelcomeComponent } from './standalone/welcome/welcome.component';
import { AddPlaceComponent } from './places/components/add-place/add-place.component';
import { InfoPlaceComponent } from './places/components/info-place/info-place.component';
import { AddEventComponent } from './events/add-event/add-event.component';
import { CheckAvailabilityComponent } from './events/check-availability/check-availability.component';
import { InfoEventComponent } from './events/info-event/info-event.component';
import { DetailsEventComponent } from './events/details-event/details-event.component';
import { DetailsPlaceComponent } from './places/components/details-place/details-place.component';
import { PaymentViewComponent } from './payments/components/payment-view/payment-view.component';
import { RegisterViewComponent } from './users/register-view/register-view.component';
import { LoginComponent } from './users/login/login.component';

const routes: Routes = [
  {path: '', component: WelcomeComponent},
  {path: 'register', component: RegisterViewComponent},
  {path: 'login', component: LoginComponent },   
  {path: 'add-place', component: AddPlaceComponent},
  {path: 'info-place', component: InfoPlaceComponent},
  {path: 'add-event', component: AddEventComponent },
  {path: 'check-availability', component: CheckAvailabilityComponent },
  {path: 'info-event', component: InfoEventComponent},
  {path: 'events/:id', component: DetailsEventComponent},
  {path: 'places/:id', component: DetailsPlaceComponent},
  {path: 'payment', component: PaymentViewComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
