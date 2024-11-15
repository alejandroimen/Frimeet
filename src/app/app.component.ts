import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Frimeet';
  isLoged: boolean = false

  ngOnCheck(){
    const token: string | null = localStorage.getItem('token') 
    this.isLoged = token ? true : false
  }
}