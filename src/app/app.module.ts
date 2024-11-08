import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CheckAvailabilityComponent } from './events/check-availability/check-availability.component';
import { GoogleMapsModule } from '@angular/google-maps';
import { AddEventComponent } from './events/add-event/add-event.component';
import { NavbarComponent } from './standalone/navbar/navbar.component';
import { HeaderComponent } from './standalone/header/header.component';
import { WelcomeComponent } from './standalone/welcome/welcome.component';
@NgModule({
  declarations: [
    AppComponent,
    CheckAvailabilityComponent,
    AddEventComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    GoogleMapsModule,
    HeaderComponent,
    NavbarComponent,
    WelcomeComponent
  ],
  providers: [],
})
export class AppModule { }
