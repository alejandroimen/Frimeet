import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { PlaceService } from '../../places/services/place.service';
import { ParticlesWelcomeComponent } from '../particles-welcome/particles-welcome.component';
import { SharedDataService } from '../../services/shared-data.service'; // Importa SharedDataService
import { NgIf } from '@angular/common'; // Importa NgIf para usar *ngIf
import { jwtDecode } from 'jwt-decode';

@Component({
  selector: 'app-welcome',
  standalone: true,
  imports: [
    ParticlesWelcomeComponent,
    NgIf // Agrega NgIf a los imports del componente
  ],
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent {
  userIdRol: number = 0;
  attemptsRemaining: number = 3;
  lastAttemptTime: number = 0;

  constructor(
    private router: Router,
    private placeService: PlaceService,
    private sharedDataService: SharedDataService // Inyecta SharedDataService
  ) {}

  ngOnInit(): void {
    this.getUserRole();
    this.initializeAttempts();
  }

  getUserRole(): void {
    const token = localStorage.getItem('jwtToken');
    if (token) {
      const decodedToken: any = jwtDecode(token); // Asegúrate de importar jwtDecode
      this.userIdRol = decodedToken.id_Rol;
    }
  }

  initializeAttempts(): void {
    this.attemptsRemaining = this.sharedDataService.getAttemptsRemaining();
    this.lastAttemptTime = this.sharedDataService.getLastAttemptTime();

    const currentTime = Date.now();
    if (currentTime - this.lastAttemptTime >= 3600000) {
      this.attemptsRemaining = 3;
      this.lastAttemptTime = currentTime;
      this.sharedDataService.setAttemptsRemaining(this.attemptsRemaining);
      this.sharedDataService.setLastAttemptTime(this.lastAttemptTime);
    }
  }

  surpriseMe(): void {
    const currentTime = Date.now();
    if (this.userIdRol === 1 && this.attemptsRemaining <= 0) {
      alert('Has alcanzado el límite de intentos. Inténtalo de nuevo en una hora.');
      return;
    }

    this.placeService.getRandomPlace().subscribe(
      (response: any) => {
        const placeId = response._id; // Asumiendo que la respuesta contiene el ID del lugar
        this.router.navigate(['/random', placeId]);

        if (this.userIdRol === 1) {
          this.attemptsRemaining--;
          this.lastAttemptTime = currentTime;
          this.sharedDataService.setAttemptsRemaining(this.attemptsRemaining);
          this.sharedDataService.setLastAttemptTime(this.lastAttemptTime);
        }
      },
      (error: any) => {
        console.error('Error al obtener lugar aleatorio:', error);
      }
    );
  }
}
