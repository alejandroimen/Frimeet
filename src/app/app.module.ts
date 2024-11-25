import { GoogleMapsModule } from '@angular/google-maps';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PlacesModule } from './places/places.module';
import { EventsModule } from './events/events.module';
import { NavbarComponent } from './standalone/navbar/navbar.component';
import { HeaderComponent } from './standalone/header/header.component';
import { HttpClientModule } from '@angular/common/http';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormsModule } from '@angular/forms';
import { ProfileNavbarComponent } from './standalone/profile-navbar/profile-navbar.component';
import { UsersModule } from './users/users.module';
import { WelcomeStartComponent } from './standalone/welcome-start/welcome-start.component';

@NgModule({
  declarations: [
    AppComponent,
    WelcomeStartComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HeaderComponent,
    NavbarComponent,
    GoogleMapsModule,
    FontAwesomeModule,
    PlacesModule,
    EventsModule,
    HttpClientModule,
    FormsModule,
    ProfileNavbarComponent,
    UsersModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
