import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'header.header',
  standalone: true,
  imports: [
    RouterModule
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  idUser: string = '';
  isMenuOpen: boolean = false;


  constructor(private router: Router) { }

  goToReminders(){
    console.log(this.idUser=localStorage.getItem('userId') || '');
    this.idUser=localStorage.getItem('userId') || ''
    this.router.navigate(['/reminders', this.idUser])
  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

}
