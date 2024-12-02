import { Component } from '@angular/core';
import { ReminderService } from '../../services/reminder.service';
import { Ireminder } from '../../interfaces/ireminder';

@Component({
  selector: 'app-reminders-views',
  templateUrl: './reminders-views.component.html',
  styleUrl: './reminders-views.component.css'
})
export class RemindersViewsComponent {
  remProof: Ireminder = {
    nameReminder: '¡¡Bienvenido a frimeet!!',
    eventReminder: 'Frimeet',
    contentReminder: 'Te damos una cordial bienvenida a nuestra plataforma de recomendaciones, que te ayudara a tomar una decisión rapida de a donde ir, y planificar tú salida perfecta.'
  }
  reminders: Ireminder[] = []

  constructor(private remServ: ReminderService){}

  ngOnInit(){
    if(localStorage.getItem('userId'))
      this.remServ.getReminders(parseInt(localStorage.getItem('userId') || '')).subscribe(
        response => {
          this.reminders = response.recordatorios
          console.log('Estos sonn los recordatorios: ', this.reminders);
          
        },
        error => {
          console.log('Error al obtener los recordatorios', error);
          
        }
      )
  }
}
