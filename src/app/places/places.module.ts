import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AddPlaceComponent } from './components/add-place/add-place.component';
import { InfoPlaceComponent } from './components/info-place/info-place.component';

@NgModule({
  declarations: [
    AddPlaceComponent,
    InfoPlaceComponent
  ],
  imports: [
    CommonModule,
    FormsModule
  ]
})
export class PlacesModule { }
