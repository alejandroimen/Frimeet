import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrl: './login-form.component.css'
})
export class LoginFormComponent {
  
  constructor( private router: Router) {}

  goToRegister():void {
    this.router.navigate(['/register'])
  }

  login():void {
    this.router.navigate(['/'])   
  }

}
