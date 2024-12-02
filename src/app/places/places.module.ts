import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AddPlaceComponent } from './components/add-place/add-place.component';
import { InfoPlaceComponent } from './components/info-place/info-place.component';
import { DetailsPlaceComponent } from './components/details-place/details-place.component';
import { InfoCardComponent } from "../standalone/info-card/info-card.component";
import { MapComponent } from '../map/map.component';
import { MapDisplayComponent } from '../map-display/map-display.component';
import { AceptPlacesComponent } from './components/acept-places/acept-places.component';
import { InfoAceptPlacesComponent } from './components/info-acept-places/info-acept-places.component';
import { SorpresePlaceComponent } from './components/sorprese-place/sorprese-place.component';

@NgModule({
  declarations: [
    AddPlaceComponent,
    InfoPlaceComponent,
    DetailsPlaceComponent,
    MapComponent,
    AceptPlacesComponent,
    InfoAceptPlacesComponent,
    SorpresePlaceComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    InfoCardComponent,
    MapDisplayComponent
]
})
export class PlacesModule { }
