import { Component, Input } from '@angular/core';
import { Ireminder } from '../../interfaces/ireminder';

@Component({
  selector: 'div.reminder-div',
  templateUrl: './reminder.component.html',
  styleUrl: './reminder.component.css'
})
export class ReminderComponent {
  @Input() reminder: Ireminder = {
    eventReminder: '',
    nameReminder: '',
    contentReminder: ''
  }

}
