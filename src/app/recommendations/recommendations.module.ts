import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DesireFormComponent } from './desire-form/desire-form.component';
import { EventsModule } from "../events/events.module";
import { ProfileNavbarComponent } from "../standalone/profile-navbar/profile-navbar.component";
import { TellUsComponent } from './tell-us/tell-us.component';


@NgModule({
  declarations: [
    DesireFormComponent,
    TellUsComponent,
  ],
  imports: [
    CommonModule,
    EventsModule,
    ProfileNavbarComponent
]
})
export class RecommendationsModule { }
