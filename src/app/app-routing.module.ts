import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WelcomeComponent } from './standalone/welcome/welcome.component';
import { AddPlaceComponent } from './places/components/add-place/add-place.component';
import { InfoPlaceComponent } from './places/components/info-place/info-place.component';

const routes: Routes = [
  {path: '', component: WelcomeComponent},
  {path: 'add-place', component: AddPlaceComponent},
  {path: 'info-place', component: InfoPlaceComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
