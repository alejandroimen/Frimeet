import { Component, Input } from '@angular/core';
import { Iinterest } from '../../interfaces/iinterest';

@Component({
  selector: 'app-interest-selector',
  templateUrl: './interest-selector.component.html',
  styleUrl: './interest-selector.component.css'
})
export class InterestSelectorComponent {
  buttonActivate: boolean = false
  @Input() interest: string= ''
  @Input() content: Iinterest[] = []

  changeVisibility (): void {
    this.buttonActivate = !this.buttonActivate
  }
}
