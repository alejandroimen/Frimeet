import { Component } from '@angular/core';
import { Iinterest } from '../../interfaces/iinterest';

@Component({
  selector: 'app-desire-form',
  templateUrl: './desire-form.component.html',
  styleUrl: './desire-form.component.css'
})
export class DesireFormComponent {
  interestsList : {
    name:string,
    content: Iinterest[]
  } [] = [
    {
      name: 'Senderismo',
      content: [
        {name: 'Senderismo', image: 'assets/images/siluetas.jpg'},
        {name: 'Senderismo', image: 'assets/images/siluetas.jpg'},
        {name: 'Senderismo', image: 'assets/images/siluetas.jpg'}
      ]
    },
    {
      name: 'Senderismo',
      content: [
        {name: 'Senderismo', image: 'assets/images/siluetas.jpg'},
        {name: 'Senderismo', image: 'assets/images/siluetas.jpg'},
        {name: 'Senderismo', image: 'assets/images/siluetas.jpg'}
      ]
    },
    {
      name: 'Senderismo',
      content: [
        {name: 'Senderismo', image: 'assets/images/siluetas.jpg'},
        {name: 'Senderismo', image: 'assets/images/siluetas.jpg'},
        {name: 'Senderismo', image: 'assets/images/siluetas.jpg'}
      ]
    }
  ]
}
