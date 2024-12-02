import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Iinterest } from '../../interfaces/iinterest';

@Component({
  selector: 'app-interest-selector',
  templateUrl: './interest-selector.component.html',
  styleUrl: './interest-selector.component.css'
})
export class InterestSelectorComponent {
  buttonActivate: boolean = false
  @Input() allSelected: string[] = []
  @Input() id: number = 0
  @Input() interest: string = ''
  @Input() content: Iinterest[] = []

  @Input() selected: string = ''
  @Output() selectedChange: EventEmitter<string> = new EventEmitter()

  @Input() idGroup: number = -1
  @Output() idGroupChange: EventEmitter<number> = new EventEmitter()

  changeVisibility(): void {
    this.buttonActivate = !this.buttonActivate
  }

  clickCard(id: string): void {
    console.log(id, this.id);
    
    this.selectedChange.emit(id)
    this.idGroupChange.emit(this.id)
  }

  ngDoCheck(): void {
    console.log('Todos en interest: ', this.allSelected);
  }
}
