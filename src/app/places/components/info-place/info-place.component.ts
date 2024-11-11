import { Iplace } from './../../interfaces/iplace';
import { Component } from '@angular/core';

@Component({
  selector: 'app-info-place',
  templateUrl: './info-place.component.html',
  styleUrl: './info-place.component.css'
})
export class InfoPlaceComponent {
  etiquetas: string[] = [
    'Comida rapida',
    'Entretenimiento',
    'Helados',
    'Para ir en pareja'
  ]

  place: Iplace = {
    name: 'UPChiapas',
    types: 'Educativo',
    images: [],
    description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quos aperiam tempora sit sint necessitatibus eum, excepturi obcaecati unde placeat. In atque corrupti voluptas consequatur similique ab alias aliquid aliquam pariatur. Lorem ipsum dolor sit amet consectetur adipisicing elit. Debitis sed error qui iste reprehenderit est saepe eveniet itaque illum temporibus, minus illo deserunt, accusamus harum. Voluptate voluptatum culpa distinctio laborum.',
    tags: '',
    address: '',
  }

}
