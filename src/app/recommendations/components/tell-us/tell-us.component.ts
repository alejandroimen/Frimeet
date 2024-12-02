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
  numPeople: number = 1
  money: number = 1
  timeOut: number= 1
  distance: number = 1
  validNumPeople: boolean = true
  validMoney: boolean = true
  validDistance: boolean = true

  constructor(private recServ: RecommendationsService,
              private alertServ: AlertService,
              private router: Router){}

  sendForm():void {
    if(!this.type ||
      !this.validNumber(this.numPeople) ||
      !this.validNumber(this.money) ||
      !this.timeOut ||
      !this.validNumber(this.distance) ) {
        console.log(this.type,
          this.numPeople,
          this.money,
          this.timeOut,
          this.distance);       
        this.alertServ.showWarning('Por favor completa todos los campos')
        return
    }
    let loadingTimeout: any;

    // Inicia un temporizador para mostrar la alerta después de 0.5 segundos
    loadingTimeout = setTimeout(() => {
      this.alertServ.showLoading();
    }, 500);

    this.recServ.suggest({type: this.type, tags: this.tags}).subscribe(
      response => {
        clearTimeout(loadingTimeout);//Limpia el temporizador para que la alerta se muestre solamente despues de 0.5s
        this.alertServ.closeLoading();
        console.log('Exito', response);
        const id = response.places[0]._id
        this.router.navigate(['/recommendation', id])
      },
      error => {
        clearTimeout(loadingTimeout);
        this.alertServ.closeLoading();
        console.log('Error: ', error);
        if(error.error.message === 'No se encontraron lugares para las etiquetas y tipo proporcionados'){
          this.alertServ.showError('Lo sentimos, no encontramos lugares que coincidan :C')
        }
      }
    )
  }

  validNumber(num: number): boolean {
    if(this.numPeople && this.numPeople>0)
      return true
    else return false
  }

  ngDoCheck(): void {
    this.validNumPeople = this.validNumber(this.numPeople)
    this.validMoney = this.validNumber(this.money)
    this.validDistance = this.validNumber(this.distance)
  }
}
