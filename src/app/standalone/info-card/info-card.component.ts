import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Iplace } from '../../places/interfaces/iplace'; // Asegúrate de que la ruta a la interfaz sea correcta

@Component({
  selector: 'app-info-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './info-card.component.html',
  styleUrls: ['./info-card.component.css']
})
export class InfoCardComponent {
  @Input() place!: Iplace; // El lugar se recibe del padre
  @Output() navigateToDetails = new EventEmitter<string>(); // Emite el ID del lugar

  goToDetails(): void {
    if (this.place && this.place._id) {
      this.navigateToDetails.emit(this.place._id); // Emite el evento hacia el padre
    }
  }
}
