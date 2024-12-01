import { Component, Input } from '@angular/core';
import { Iplace } from '../../../places/interfaces/iplace';
import { ActivatedRoute, Router } from '@angular/router';
import { PlaceService } from '../../../places/services/place.service';
import { AlertService } from '../../../services/alert.service';
import { jwtDecode } from 'jwt-decode';
import { SharedDataService } from '../../../services/shared-data.service'; // Importa SharedDataService

@Component({
  selector: 'app-sorprese-place',
  templateUrl: './sorprese-place.component.html',
  styleUrl: './sorprese-place.component.css'
})
export class SorpresePlaceComponent {

  @Input() place!: Iplace;
  userIdRol: number = 0;
  attemptsRemaining: number = 3; // Número máximo de intentos por hora
  lastAttemptTime: number = 0;

  constructor(
    private placeService: PlaceService,
    private route: ActivatedRoute,
    private router: Router,
    private alertService: AlertService,
    private sharedDataService: SharedDataService // Inyecta SharedDataService
  ) {}

  ngOnInit(): void {
    this.loadPlace();
    this.getUserRole(); // Obtener el rol del usuario
    this.initializeAttempts(); // Inicializar intentos
  }

  loadPlace(): void {
    const placeId = this.route.snapshot.paramMap.get('id');
    if (placeId) {
      this.placeService.getPlaceById(placeId).subscribe((data: Iplace) => {
        this.place = data;

        const token = localStorage.getItem('jwtToken');
        if (token) { 
          const userId = localStorage.getItem('userId'); 
          const userOwner = this.place?.userOwner;
          console.log('User ID:', userId); // Log del ID del usuario 
          console.log('User Owner:', userOwner); // Log del propietario del lugar 
        }

      }, error => {
        this.alertService.showError('Error al obtener los detalles del lugar, lo sentimos :c');
        console.error('Error al obtener los detalles del lugar:', error);
      });
    }
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

  goBack(): void {
    window.history.back();
  }

  openPhotosModal() {
    const modal = document.getElementById('photosModal');
    if (modal) {
      modal.style.display = 'flex';
    }
  }

  closePhotosModal() {
    const modal = document.getElementById('photosModal');
    if (modal) {
      modal.style.display = 'none';
    }
  }

  surpriseMe(): void {
    const currentTime = Date.now();
    if (this.userIdRol === 1 && this.attemptsRemaining <= 0) {
      this.alertService.showError('Has alcanzado el límite de intentos. Inténtalo de nuevo en una hora.');
      return;
    }

    this.placeService.getRandomPlace().subscribe(
      (response: any) => {
        console.log('Respuesta del lugar aleatorio:', response);
        const placeId = response._id; // Asumiendo que la respuesta contiene el ID del lugar
        this.router.navigate(['/random', placeId]).then(() => {
          this.loadPlace();
          window.scrollTo({ top: 0, behavior: 'smooth' }); // Desplazarse hacia arriba
        });

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
