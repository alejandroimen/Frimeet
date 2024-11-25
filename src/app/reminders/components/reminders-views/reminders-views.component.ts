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
    nameReminder: 'Holaaaaaaaa',
    eventReminder: 'oliwi event',
    contentReminder: 'noshe unuuuuuuuuuuuuuuuuuuuuuuuuu ola q tal chalal shalala haciendo bulto nomas jsjs'
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
