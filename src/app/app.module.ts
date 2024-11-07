import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CheckAvailabilityComponent } from './eventos/components/check-availability/check-availability.component';
import { GoogleMapsComponent } from './eventos/services/google-maps/google-maps.component';
import { GoogleMapsModule } from '@angular/google-maps';
import { AddEventComponent } from './eventos/components/add-event/add-event.component';
@NgModule({
  declarations: [
    AppComponent,
    CheckAvailabilityComponent,
    GoogleMapsComponent,
    AddEventComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    GoogleMapsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
