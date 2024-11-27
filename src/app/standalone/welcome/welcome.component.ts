import { Component, AfterViewInit } from '@angular/core';
import { ParticlesWelcomeComponent } from '../particles-welcome/particles-welcome.component';

@Component({
  selector: 'app-welcome',
  standalone: true,
  imports: [
    ParticlesWelcomeComponent
  ],
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent {
 
}
