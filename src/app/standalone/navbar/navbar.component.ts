import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common'; // Importa CommonModule

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    RouterModule,
    CommonModule // Agrega CommonModule aquí
  ],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  isCollapsed: boolean = true;

  toggleMenu(): void {
    this.isCollapsed = !this.isCollapsed;
  }

  show: boolean = false;

  toggleNavbar(): void {
    this.show = !this.show;
  }
}
