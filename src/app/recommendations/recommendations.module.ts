import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DesireFormComponent } from './components/desire-form/desire-form.component';
import { EventsModule } from '../events/events.module';
import { TellUsComponent } from './components/tell-us/tell-us.component';
import { DesireViewComponent } from './components/desire-view/desire-view.component';
import { InterestSelectorComponent } from './components/interest-selector/interest-selector.component';
import { FormsModule } from '@angular/forms';
import { ResultViewComponent } from './components/result-view/result-view.component';
import { MapDisplayComponent } from '../standalone/map-display/map-display.component';

@NgModule({
  declarations: [
    DesireFormComponent,
    TellUsComponent,
    DesireViewComponent,
    InterestSelectorComponent,
    ResultViewComponent,
  ],
  imports: [
    CommonModule,
    EventsModule,
    FormsModule,
    MapDisplayComponent
  ],
  exports: [
    DesireViewComponent,
    TellUsComponent,
    DesireFormComponent,
    ResultViewComponent
  ]
})
export class RecommendationsModule { }
