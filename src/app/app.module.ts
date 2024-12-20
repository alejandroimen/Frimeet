import { HttpClientModule } from '@angular/common/http';
import { GoogleMapsModule } from '@angular/google-maps';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PlacesModule } from './places/places.module';
import { EventsModule } from './events/events.module';
import { UsersModule } from './users/users.module';
import { PaymentsModule } from './payments/payments.module';
import { NavbarComponent } from './standalone/navbar/navbar.component';
import { HeaderComponent } from './standalone/header/header.component';
import { FormsModule } from '@angular/forms';
import { RecommendationsModule } from './recommendations/recommendations.module';
import { WelcomeStartComponent } from './standalone/welcome-start/welcome-start.component';
import { RemindersModule } from './reminders/reminders.module';
import { NotFoundComponent } from './standalone/not-found/not-found.component';

@NgModule({
  declarations: [
    AppComponent,
    WelcomeStartComponent,
    NotFoundComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    GoogleMapsModule,
    PlacesModule,
    EventsModule,
    HttpClientModule,
    FormsModule,
    UsersModule,
    PaymentsModule,
    RemindersModule,
    RecommendationsModule,
    NavbarComponent,
    HeaderComponent,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
