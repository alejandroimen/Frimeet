import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navbar',   
  standalone: true,
  imports: [
    RouterModule,
    CommonModule
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
