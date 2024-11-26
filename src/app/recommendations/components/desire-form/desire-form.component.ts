import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Iinterest } from '../../interfaces/iinterest';

@Component({
  selector: 'app-desire-form',
  templateUrl: './desire-form.component.html',
  styleUrl: './desire-form.component.css'
})
export class DesireFormComponent {
  @Input() isHere: boolean = true
  @Output() isHereChange: EventEmitter<boolean> = new EventEmitter()
  interestsList : {
    name:string,
    content: Iinterest[]
  } [] = [
    {
      name: 'Alimentos',
      content: [
        {id: 1, name: 'Comida rapida', image: 'assets/images/siluetas.jpg'},
        {id: 2, name: 'Heladeria', image: 'assets/images/siluetas.jpg'},
        {id: 3, name: 'Cafeteria', image: 'assets/images/siluetas.jpg'},
        {id: 4, name: 'Comida', image: 'assets/images/siluetas.jpg'},
        {id: 5, name: 'Bar', image: 'assets/images/siluetas.jpg'}
      ]
    },
    {
      name: 'Naturaleza',
      content: [
        {id: 19, name: 'Animales', image: 'assets/images/siluetas.jpg'},
        {id: 20, name: 'Plantas', image: 'assets/images/siluetas.jpg'},
        {id: 21, name: 'Naturaleza', image: 'assets/images/siluetas.jpg'},
        {id: 22, name: 'Senderismo', image: 'assets/images/siluetas.jpg'},
        {id: 23, name: 'Exploración', image: 'assets/images/siluetas.jpg'},
        {id: 31, name: 'Parques', image: 'assets/images/siluetas.jpg'}
      ]
    },
    {
      name: 'Cultura',
      content: [
        {id: 8, name: 'Conciertos', image: 'assets/images/siluetas.jpg'},
        {id: 9, name: 'Grupos de musica', image: 'assets/images/siluetas.jpg'},
        {id: 10, name: 'Teatro', image: 'assets/images/siluetas.jpg'},
        {id: 11, name: 'Arte', image: 'assets/images/siluetas.jpg'},
        {id: 12, name: 'Galerias', image: 'assets/images/siluetas.jpg'},
        {id: 13, name: 'Museo', image: 'assets/images/siluetas.jpg'}
      ]
    },
    {
      name: 'Salidas casuales',
      content: [
        {id: 5, name: 'Bar', image: 'assets/images/siluetas.jpg'},
        {id: 6, name: 'Boliche', image: 'assets/images/siluetas.jpg'},
        {id: 7, name: 'Karaoke', image: 'assets/images/siluetas.jpg'},
        {id: 8, name: 'Concierto', image: 'assets/images/siluetas.jpg'}
      ]
    },
    {
      name: 'Ciencia',
      content: [
        {id: 14, name: 'Planetario', image: 'assets/images/siluetas.jpg'},
        {id: 15, name: 'Mirador', image: 'assets/images/siluetas.jpg'},
        {id: 16, name: 'Astronomia', image: 'assets/images/siluetas.jpg'},
        {id: 17, name: 'Historia', image: 'assets/images/siluetas.jpg'},
        {id: 18, name: 'Paleontología', image: 'assets/images/siluetas.jpg'}
      ]
    }
  ]
  indexSelected: number = -1
  @Input() interestsSelected: number[] = []
  @Output() interestsSelectedChange:EventEmitter<number[]> = new EventEmitter()
  interestBidirectional: number[] = new Array(this.interestsList.length).fill(-1)
  
  next(): void {
    this.isHereChange.emit(false)
  }

  ngDoCheck():void {
    console.log('EL pinshi numero: ', this.interestBidirectional[this.indexSelected]);
    if(this.interestBidirectional[this.indexSelected]  !== -1 &&
      this.interestBidirectional[this.indexSelected]  !== undefined
    ){
    
      const index = this.interestsSelected.indexOf(this.interestBidirectional[this.indexSelected]);
      console.log('El index es ', index);
      
      if (index !== -1) {
        this.interestsSelected.splice(index, 1);
      } else {
        this.interestsSelected.push(this.interestBidirectional[this.indexSelected]);
      }
      console.log('Etos son', this.interestsSelected);
      this.interestsSelectedChange.emit(this.interestsSelected)
    }
  }
}
