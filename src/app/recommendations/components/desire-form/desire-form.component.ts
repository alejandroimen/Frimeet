import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Iinterest } from '../../interfaces/iinterest';

@Component({
  selector: 'app-desire-form',
  templateUrl: './desire-form.component.html',
  styleUrl: './desire-form.component.css'
})
export class DesireFormComponent {
  urlImages: string = 'assets/images/'
  @Input() isHere: boolean = true
  @Output() isHereChange: EventEmitter<boolean> = new EventEmitter()
  interestsList : {
    name:string,
    content: Iinterest[]
  } [] = [
    {
      name: 'Alimentos',
      content: [
        {id: 1, name: 'Comida rapida', image: `${this.urlImages}comida/rapida.jpg`},
        {id: 2, name: 'Heladeria', image: `${this.urlImages}comida/helados.webp`},
        {id: 3, name: 'Cafeteria', image: `${this.urlImages}comida/cafe.webp`},
        {id: 4, name: 'Comida', image: `${this.urlImages}comida/comida.webp`}
      ]
    },
    {
      name: 'Naturaleza',
      content: [
        {id: 19, name: 'Animales', image: `${this.urlImages}naturaleza/animales.webp`},
        {id: 20, name: 'Plantas', image: `${this.urlImages}naturaleza/planta.webp`},
        {id: 22, name: 'Senderismo', image: `${this.urlImages}naturaleza/senderismo.jpg`},
        {id: 23, name: 'Exploración', image: `${this.urlImages}naturaleza/exploracion.webp`},
        {id: 31, name: 'Parques', image: `${this.urlImages}naturaleza/parque.webp`}
      ]
    },
    {
      name: 'Cultura',
      content: [
        {id: 9, name: 'Grupos de musica', image: `${this.urlImages}cultura/grupos.jpeg`},
        {id: 10, name: 'Teatro', image: `${this.urlImages}cultura/teatro.jpg`},
        {id: 11, name: 'Arte', image: `${this.urlImages}cultura/arte.jpg`},
        {id: 12, name: 'Galerias', image: `${this.urlImages}cultura/galeria.jpg`},
        {id: 13, name: 'Museo', image: `${this.urlImages}cultura/museo.jpg`}
      ]
    },
    {
      name: 'Salidas casuales',
      content: [
        {id: 5, name: 'Bar', image: `${this.urlImages}casual/bar.jpg`},
        {id: 6, name: 'Boliche', image: `${this.urlImages}casual/boliche.webp`},
        {id: 7, name: 'Karaoke', image: `${this.urlImages}casual/karaoke.jpg`},
        {id: 8, name: 'Concierto', image: `${this.urlImages}casual/concierto.jpg`},
        {id: 15, name: 'Mirador', image: `${this.urlImages}casual/mirador.jpg`}
      ]
    },
    {
      name: 'Ciencia',
      content: [
        {id: 14, name: 'Planetario', image: `${this.urlImages}ciencia/planetario.jpg`},
        {id: 16, name: 'Astronomia', image: `${this.urlImages}ciencia/astronomia.jpg`},
        {id: 17, name: 'Historia', image: `${this.urlImages}ciencia/historia.jpg`},
        {id: 18, name: 'Paleontología', image: `${this.urlImages}ciencia/paleon.jpg`}
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
