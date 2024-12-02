import { UserService } from './../../users/services/user.service';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NavbarService } from '../../services/navbar.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    RouterModule,
    CommonModule
  ],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  isCollapsed: boolean = true;
  show: boolean = false;
  isPremium!: boolean;


  constructor(
    private router: Router,
    private userServ: UserService,
    private navbarService: NavbarService
  ) {}


  ngOnInit(): void {
    this.isPremium = localStorage.getItem('userRol') == '2'
  }

  toggleMenu(): void {
    this.isCollapsed = !this.isCollapsed;
    this.navbarService.setCollapsedState(this.isCollapsed);
  }

  toggleNavbar(): void {
    this.show = !this.show;
  }

  logout(): void {
    this.userServ.logout();
    this.router.navigate(['/login']);
  }
}
