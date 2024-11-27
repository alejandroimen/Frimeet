import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DesireFormComponent } from './components/desire-form/desire-form.component';
import { EventsModule } from "../events/events.module";
import { TellUsComponent } from './components/tell-us/tell-us.component';
import { DesireViewComponent } from './components/desire-view/desire-view.component';
import { InterestSelectorComponent } from './components/interest-selector/interest-selector.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    DesireFormComponent,
    TellUsComponent,
    DesireViewComponent,
    InterestSelectorComponent,
  ],
  imports: [
    CommonModule,
    EventsModule,
    FormsModule
  ],
  exports: [
    DesireViewComponent,
    TellUsComponent,
    DesireFormComponent
  ]
})
export class RecommendationsModule { }
