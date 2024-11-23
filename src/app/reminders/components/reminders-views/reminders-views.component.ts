import { Component } from '@angular/core';
import { Ireminder } from '../../interfaces/ireminder';

@Component({
  selector: 'app-reminders-views',
  templateUrl: './reminders-views.component.html',
  styleUrl: './reminders-views.component.css'
})
export class RemindersViewsComponent {
  reminders: Ireminder[] = [
    {
      eventReminder: 'Fiesta',
      nameReminder: 'La fiesta te espera',
      contentReminder: 'No olvides ir a la fiesta que habrá hoy en el parque central, ya te habías apuntado'
    },
    {
      eventReminder: 'Boda de Vianey',
      nameReminder: 'No te olvides de venir',
      contentReminder: 'Es un dia muy especial para mí y espero tu presencia, no faltes xfi'
    },
    {
      eventReminder: 'Reunión de ex-alumnos',
      nameReminder: 'Hoy a las 8:30',
      contentReminder: 'reunión de exalumnos de la secundaria para que platiquemos y pasemos el rato, no faltes'
    }
  ]

}
