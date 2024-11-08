import { Component } from '@angular/core';
import { Iplace } from '../../interfaces/iplace';

@Component({
  selector: 'app-add-place',
  templateUrl: './add-place.component.html',
  styleUrl: './add-place.component.css'
})
export class AddPlaceComponent {
  place: Iplace = {
    name: '',
    type: '',
    image: '',
    price: 0,
    description: '',
  }

}
