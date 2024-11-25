import { Component } from '@angular/core';

@Component({
  selector: 'app-profile-navbar',
  standalone: true,
  templateUrl: './profile-navbar.component.html',
  styleUrls: ['./profile-navbar.component.css']
})
export class ProfileNavbarComponent {
  cards = [
    { image: 'https://via.placeholder.com/150', title: 'Título 1', description: 'Descripción breve 1' },
    { image: 'https://via.placeholder.com/150', title: 'Título 2', description: 'Descripción breve 2' },
    { image: 'https://via.placeholder.com/150', title: 'Título 3', description: 'Descripción breve 3' },
    { image: 'https://via.placeholder.com/150', title: 'Título 4', description: 'Descripción breve 4' },
  ];
}
