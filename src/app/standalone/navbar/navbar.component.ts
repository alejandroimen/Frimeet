import { UserService } from './../../users/services/user.service';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
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
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  isCollapsed: boolean = true;
  isPremium!: boolean;

  constructor(private router: Router, private userServ: UserService) {}

  ngOnInit(): void {
    this.isPremium = localStorage.getItem('userRol') == '2'
  }

  toggleMenu(): void {
    this.isCollapsed = !this.isCollapsed;
  }

  show: boolean = false;

  toggleNavbar(): void {
    this.show = !this.show;
  }

  logout():void {
    this.userServ.logout()
  }
}
