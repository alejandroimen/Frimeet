import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

  constructor( private router: Router) {}

  goToLogin():void {
    this.router.navigate(['/'])
  }

  register(): void {
    localStorage.setItem('token', 'tokencitoWASAA')
    this.router.navigate(['/'])   
  }
}