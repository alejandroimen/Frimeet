import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AddPlaceComponent } from './components/add-place/add-place.component';
import { InfoPlaceComponent } from './components/info-place/info-place.component';
import { DetailsPlaceComponent } from './components/details-place/details-place.component';
import { InfoCardComponent } from "../standalone/info-card/info-card.component";
import { MapComponent } from '../map/map.component';
import { MapDisplayComponent } from '../map-display/map-display.component';

@NgModule({
  declarations: [
    AddPlaceComponent,
    InfoPlaceComponent,
    DetailsPlaceComponent,
    MapComponent,
    MapDisplayComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    InfoCardComponent
]
})
export class PlacesModule { }
