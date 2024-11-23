import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginFormComponent } from './components/login-form/login-form.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from '../app-routing.module';
import { FormsModule } from '@angular/forms';
import { RegisterViewComponent } from './register-view/register-view.component';
import { ProfileComponent } from './profile/profile.component';
import { NavbarComponent } from '../standalone/navbar/navbar.component';

@NgModule({
  declarations: [
    LoginFormComponent,
    LoginComponent,
    RegisterComponent,
    RegisterViewComponent,
    ProfileComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    AppRoutingModule,
    FormsModule,
    NavbarComponent
  ],
  exports: [
    LoginComponent,
    LoginFormComponent,
    RegisterComponent,
  ]
})
export class UsersModule { }
