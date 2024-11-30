import { Component, Input } from '@angular/core';
import { Iplace } from '../../../places/interfaces/iplace';
import { ActivatedRoute, Router } from '@angular/router';
import { PlaceService } from '../../../places/services/place.service';
import { AlertService } from '../../../services/alert.service';

@Component({
  selector: 'app-result-view',
  templateUrl: './result-view.component.html',
  styleUrl: './result-view.component.css'
})
export class ResultViewComponent {
  @Input() place!: Iplace;

   constructor(
    private placeService: PlaceService,
    private route: ActivatedRoute,
    private router: Router,
    private alertService: AlertService
  ) {}

  ngOnInit(): void {
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
}
