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
import { ReviewComponent } from './users/review/review.component';
import { PlacesReviewComponent } from './users/places-review/places-review.component';
import { EventsReviewComponent } from './users/events-review/events-review.component';
import { DesireViewComponent } from './recommendations/components/desire-view/desire-view.component';
import { ProfileNavbarComponent } from './standalone/profile-navbar/profile-navbar.component';
import { DesireFormComponent } from './recommendations/desire-form/desire-form.component';
import { WelcomeStartComponent } from './standalone/welcome-start/welcome-start.component';
import { PaymentViewComponent } from './payments/components/payment-view/payment-view.component';
import { RegisterViewComponent } from './users/components/register-view/register-view.component';
import { LoginComponent } from './users/components/login/login.component';
import { RemindersViewsComponent } from './reminders/components/reminders-views/reminders-views.component';
import { MapComponent } from './map/map.component';
import { EditProfileComponent } from './users/edit-profile/edit-profile.component';

const routes: Routes = [
  {path: '', component: WelcomeComponent},
  {path: 'welcome', component: WelcomeComponent},
  {path: 'register', component: RegisterViewComponent},
  {path: 'login', component: LoginComponent },
  {path: 'add-place', component: AddPlaceComponent},
  {path: 'add-event', component: AddEventComponent },
  {path: 'info-place', component: InfoPlaceComponent},
  {path: 'info-event', component: InfoEventComponent},
  {path: 'check-availability', component: CheckAvailabilityComponent },
  {path: 'review', component: ReviewComponent},
  {path: 'places-review', component: PlacesReviewComponent},
  {path: 'events-review', component: EventsReviewComponent},
  {path: 'desire-form', component: DesireViewComponent},
  {path: 'welcome-start', component: WelcomeStartComponent},
  {path: 'edit-profile', component: EditProfileComponent},
  {path: 'events/:id', component: DetailsEventComponent},
  {path: 'places/:id', component: DetailsPlaceComponent},
  {path: 'payment', component: PaymentViewComponent},
  {path: 'reminders/:id', component: RemindersViewsComponent},
  { path: 'map', component: MapComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
