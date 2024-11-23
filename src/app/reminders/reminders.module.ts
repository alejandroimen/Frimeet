import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReminderComponent } from './components/reminder/reminder.component';
import { RemindersViewsComponent } from './components/reminders-views/reminders-views.component';


@NgModule({
  declarations: [
    ReminderComponent,
    RemindersViewsComponent
  ],
  imports: [
    CommonModule
  ]
})
export class RemindersModule { }
