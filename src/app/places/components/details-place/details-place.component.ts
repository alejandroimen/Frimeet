import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PlaceService } from '../../services/place.service';
import { Iplace } from '../../interfaces/iplace';

@Component({
  selector: 'app-details-place',
  templateUrl: './details-place.component.html',
  styleUrls: ['./details-place.component.css']
})
export class DetailsPlaceComponent implements OnInit {
  place: Iplace | undefined;
  deleteModal: any;

  constructor(private placeService: PlaceService, private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    const placeId = this.route.snapshot.paramMap.get('id');
    if (placeId) {
      this.placeService.getPlaceById(placeId).subscribe((data: Iplace) => {
        this.place = data;
      }, error => {
        console.error('Error al obtener los detalles del lugar:', error);
      });
    }
  }

  openModal(): void {
    const modalElement = document.getElementById('deleteModal');
    if (modalElement) {
      this.deleteModal = new (window as any).bootstrap.Modal(modalElement);
      this.deleteModal.show();
    }
  }

  deletePlace(): void {
    if (this.place && this.place._id) {
      this.placeService.deletePlace(this.place._id).subscribe(response => {
        console.log('Lugar eliminado:', response);
        if (this.deleteModal) {
          this.deleteModal.hide();
        }
        this.router.navigate(['/info-place']);
      }, error => {
        console.error('Error al eliminar el lugar:', error);
      });
    }
  }
}
