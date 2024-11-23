import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {
  cards = [
    { image: 'https://via.placeholder.com/150', title: 'Título 1', description: 'Descripción breve 1' },
    { image: 'https://via.placeholder.com/150', title: 'Título 2', description: 'Descripción breve 2' },
    { image: 'https://via.placeholder.com/150', title: 'Título 3', description: 'Descripción breve 3' },
    { image: 'https://via.placeholder.com/150', title: 'Título 4', description: 'Descripción breve 4' },
  ];

}
