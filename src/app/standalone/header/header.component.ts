import { Component, ElementRef, HostListener } from '@angular/core';
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
  isMenuOpen = false;



  constructor(private router: Router, private elementRef: ElementRef) { }

  goToReminders() {
    console.log(this.idUser = localStorage.getItem('userId') || '');
    this.idUser = localStorage.getItem('userId') || ''
    this.router.navigate(['/reminders', this.idUser])
  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  closeMenu() {
    this.isMenuOpen = false;
  }

  @HostListener('document:click', ['$event'])
  onClickOutside(event: MouseEvent) {
    const clickedInside = this.elementRef.nativeElement.contains(event.target);
    if (!clickedInside) {
      this.closeMenu();
    }
  }
}
