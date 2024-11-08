import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PlacesModule } from './places/places.module';
import { NavbarComponent } from './standalone/navbar/navbar.component';
import { HeaderComponent } from './standalone/header/header.component';
import { WelcomeComponent } from './standalone/welcome/welcome.component';
@NgModule({
  declarations: [
    AppComponent,
    WelcomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule, 
    PlacesModule,
    HeaderComponent,
    NavbarComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
