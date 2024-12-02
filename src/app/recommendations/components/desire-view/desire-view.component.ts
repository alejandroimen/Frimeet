import { Component, OnInit } from '@angular/core';
import { NavbarService } from '../../../services/navbar.service';

@Component({
  selector: 'app-desire-view',
  templateUrl: './desire-view.component.html',
  styleUrl: './desire-view.component.css'
})
export class DesireViewComponent implements OnInit {
  isNavbarCollapsed: boolean = true;
  isInInterest: boolean = true;
  selected: string[] = [];
  isCollapsed: boolean = true;

  constructor(private navbarService: NavbarService) {}

  ngOnInit(): void {
    this.navbarService.isCollapsed$.subscribe((isCollapsed) => {
      this.isNavbarCollapsed = isCollapsed;
    });

    this.navbarService.isCollapsed$.subscribe((state) => {
      this.isCollapsed = state;
    });
  }

  ngDoCheck(): void {
    console.log(this.isInInterest);
  }

  back(): void {
    this.isInInterest = true;
  }
}
