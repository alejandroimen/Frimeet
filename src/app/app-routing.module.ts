import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WelcomeComponent } from './standalone/welcome/welcome.component';
import { AddPlaceComponent } from './places/components/add-place/add-place.component';
import { InfoPlaceComponent } from './places/components/info-place/info-place.component';
import { AddEventComponent } from './events/components/add-event/add-event.component';
import { CheckAvailabilityComponent } from './events/components/check-availability/check-availability.component';
import { InfoEventComponent } from './events/components/info-event/info-event.component';
import { DetailsEventComponent } from './events/components/details-event/details-event.component';
import { DetailsPlaceComponent } from './places/components/details-place/details-place.component';
import { ReviewComponent } from './users/components/review/review.component';
import { PlacesReviewComponent } from './users/components/places-review/places-review.component';
import { EventsReviewComponent } from './users/components/events-review/events-review.component';
import { DesireViewComponent } from './recommendations/components/desire-view/desire-view.component';
import { WelcomeStartComponent } from './standalone/welcome-start/welcome-start.component';
import { PaymentViewComponent } from './payments/components/payment-view/payment-view.component';
import { RegisterViewComponent } from './users/components/register-view/register-view.component';
import { LoginComponent } from './users/components/login/login.component';
import { RemindersViewsComponent } from './reminders/components/reminders-views/reminders-views.component';
import { MapComponent } from './places/components/map/map.component';
import { EditProfileComponent } from './users/components/edit-profile/edit-profile.component';
import { ResultViewComponent } from './recommendations/components/result-view/result-view.component';
import { AceptPlacesComponent } from './places/components/acept-places/acept-places.component';
import { InfoAceptPlacesComponent } from './places/components/info-acept-places/info-acept-places.component';
import { SorpresePlaceComponent } from './places/components/sorprese-place/sorprese-place.component';
import { canActivateGuard } from './services/guards/can-activate.guard';
import { isPremiumGuard } from './services/guards/is-premium.guard';
import { NotFoundComponent } from './standalone/not-found/not-found.component';

const routes: Routes = [
  {path: 'login', component: LoginComponent },
  {path: 'register', component: RegisterViewComponent},
  {path: '', component: WelcomeStartComponent},
  {path: 'home', component: WelcomeComponent},
  {path: 'add-place', component: AddPlaceComponent, canActivate: [canActivateGuard]},
  {path: 'add-event', component: AddEventComponent, canActivate: [canActivateGuard] },
  {path: 'info-place', component: InfoPlaceComponent, canActivate: [canActivateGuard]},
  {path: 'info-event', component: InfoEventComponent, canActivate: [canActivateGuard]},
  {path: 'check-availability', component: CheckAvailabilityComponent, canActivate: [canActivateGuard]},
  {path: 'review', component: ReviewComponent, canActivate: [canActivateGuard]},
  {path: 'places-review', component: PlacesReviewComponent, canActivate: [canActivateGuard]},
  {path: 'events-review', component: EventsReviewComponent, canActivate: [canActivateGuard]},
  {path: 'desire', component: DesireViewComponent, canActivate: [canActivateGuard]},
  {path: 'recommendation/:id', component: ResultViewComponent, canActivate: [canActivateGuard]},
  {path: 'edit-profile', component: EditProfileComponent, canActivate: [canActivateGuard]},
  {path: 'events/:id', component: DetailsEventComponent, canActivate: [canActivateGuard]},
  {path: 'places/:id', component: DetailsPlaceComponent, canActivate: [canActivateGuard]},
  {path: 'payment', component: PaymentViewComponent, canActivate: [canActivateGuard]},
  {path: 'reminders/:id', component: RemindersViewsComponent, canActivate: [canActivateGuard]},
  { path: 'map', component: MapComponent, canActivate: [canActivateGuard]},
  {path: 'accept-place', component: AceptPlacesComponent, canActivate: [canActivateGuard, isPremiumGuard]},
  {path: 'accept-place/:id', component: InfoAceptPlacesComponent, canActivate: [canActivateGuard, isPremiumGuard]},
  {path: 'random/:id', component: SorpresePlaceComponent, canActivate: [canActivateGuard]},
  {path: '**', component: NotFoundComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
