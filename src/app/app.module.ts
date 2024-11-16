import { GoogleMapsModule } from '@angular/google-maps';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PlacesModule } from './places/places.module';
import { EventsModule } from './events/events.module';
import { UsersModule } from './users/users.module';
import { NavbarComponent } from './standalone/navbar/navbar.component';
import { HeaderComponent } from './standalone/header/header.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HeaderComponent,
    NavbarComponent,
    GoogleMapsModule,
    PlacesModule,
    EventsModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
