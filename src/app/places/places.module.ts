import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddPlaceComponent } from './components/add-place/add-place.component';
import { InfoPlaceComponent } from './components/info-place/info-place.component';

@NgModule({
  declarations: [
    AddPlaceComponent,
    InfoPlaceComponent
  ],
  imports: [
    CommonModule
  ]
})
export class PlacesModule { }
