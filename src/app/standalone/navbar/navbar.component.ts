import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    RouterModule
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  isCollapsed: boolean = true;


  toggleMenu(): void {
    this.isCollapsed = !this.isCollapsed;
  }

  show: boolean = false;

  toggleNavbar(): void {
    this.show =  !this.show;
  }
}
