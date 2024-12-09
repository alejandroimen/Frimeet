import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LoginFormComponent } from './components/login-form/login-form.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent} from './components/register/register.component';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from '../app-routing.module';
import { RegisterViewComponent } from './components/register-view/register-view.component';
//import { NavbarComponent } from '../standalone/navbar/navbar.component';
import { ReviewComponent } from './components/review/review.component';
import { PlacesReviewComponent } from './components/places-review/places-review.component';
import { EventsReviewComponent } from './components/events-review/events-review.component';
import { EditProfileComponent } from './components/edit-profile/edit-profile.component';
//import { ProfileNavbarComponent } from '../standalone/profile-navbar/profile-navbar.component';

@NgModule({
  declarations: [
    LoginFormComponent,
    LoginComponent,
    RegisterComponent,
    RegisterViewComponent,
    ReviewComponent,
    PlacesReviewComponent,
    EventsReviewComponent,
    EditProfileComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    AppRoutingModule,
    FormsModule,
    //NavbarComponent,
    //ProfileNavbarComponent
],
  exports: [
    RouterModule,
    LoginComponent,
    LoginFormComponent,
  ]
})
export class UsersModule { }
