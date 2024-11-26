import { Component, Input } from '@angular/core';
import { RecommendationsService } from '../../services/recommendations.service';
import { AlertService } from '../../../services/alert.service';
import { Router } from '@angular/router';
import { Time } from '@angular/common';

@Component({
  selector: 'app-tell-us',
  templateUrl: './tell-us.component.html',
  styleUrl: './tell-us.component.css'
})
export class TellUsComponent {
  @Input() tags: number[] = []
  type: string = ''
  numPeople: number = 0
  money: number = 0
  //time: string = '12:00 p.m'
  timeOut: number= 0
  distance: number = 0

  constructor(private recServ: RecommendationsService,
              private alertServ: AlertService,
              private router: Router){}

  sendForm():void {
    if(!this.type ||
      !this.numPeople ||
      !this.money ||
      //!this.time ||
      !this.timeOut ||
      !this.distance ) {
        console.log(this.type,
          this.numPeople,
          this.money,
          //this.time,
          this.timeOut,
          this.distance);
        
        this.alertServ.showWarning('Por favor completa todos los campos')
        return
    }

    this.recServ.suggest(this.tags, this.type).subscribe(
      response => {
        console.log('Exito', response);
        const id = response.places[0].id
        this.router.navigate(['/places', id])
      },
      error => {
        console.log('Error: ', error);
        if(error.error.message === 'No se encontraron lugares para las etiquetas y tipo proporcionados'){
          this.alertServ.showError('Lo sentimos, no encontramos lugares que coincidan :C')
        }
      }
    )
  }
}
