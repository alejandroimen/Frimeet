import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'header.header',
  standalone: true,
  imports: [
    RouterModule
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  idUser: string = ''

  ngOnInit():void {
    this.idUser=sessionStorage.getItem('idUser') || ''
  }
}
