import { Component, Input } from '@angular/core';
import { RecommendationsService } from '../../services/recommendations.service';
import { AlertService } from '../../../services/alert.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tell-us',
  templateUrl: './tell-us.component.html',
  styleUrl: './tell-us.component.css'
})
export class TellUsComponent {
  @Input() tags: string[] = [];
  type: string = '';
  validNumPeople: boolean = true;

  constructor(private recServ: RecommendationsService,
              private alertServ: AlertService,
              private router: Router) {}

  sendForm(): void {
    if (!this.type || this.tags.length === 0) {
      console.log(this.type, this.tags);      
      this.alertServ.showWarning('Por favor completa todos los campos');
      return;
    }

    let loadingTimeout: any;

    // Inicia un temporizador para mostrar la alerta después de 0.5 segundos
    loadingTimeout = setTimeout(() => {
      this.alertServ.showLoading();
    }, 500);

    const requestData = {
      tipo: this.type,
      etiquetas: this.tags // Asegúrate de que coincida con la clave esperada en el backend
    };

    console.log('Datos enviados:', requestData); // Log para verificar los datos enviados

    this.recServ.suggest(requestData).subscribe(
      response => {
        clearTimeout(loadingTimeout);
        this.alertServ.closeLoading();
        console.log('Exito', response);
        const id = response.lugar_seleccionado._id;
        this.router.navigate(['/recommendation', id]);
      },
      error => {
        clearTimeout(loadingTimeout);
        this.alertServ.closeLoading();
        console.log('Error: ', error);
        if (error.error.message === 'No se encontraron lugares para las etiquetas y tipo proporcionados') {
          this.alertServ.showError('Lo sentimos, no encontramos lugares que coincidan :C');
        } else {
          this.alertServ.showError('Hubo un error al procesar tu solicitud');
        }
      }
    );
  }

  validNumber(num: number): boolean {
    return num > 0;
  }

  ngDoCheck(): void {
    this.validNumPeople = this.validNumber(this.tags.length);
  }
}
