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
  updateModal: any;
  selectedFiles: File[] = [];

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

  openDeleteModal(): void {
    const modalElement = document.getElementById('deleteModal');
    if (modalElement) {
      this.deleteModal = new (window as any).bootstrap.Modal(modalElement);
      this.deleteModal.show();
    }
  }

  openUpdateModal(): void {
    const modalElement = document.getElementById('updateModal');
    if (modalElement) {
      this.updateModal = new (window as any).bootstrap.Modal(modalElement);
      this.updateModal.show();
    }
  }

  onFileSelected(event: any): void {
    this.selectedFiles = event.target.files;
  }

  updatePlace(): void {
    if (this.place) {
      const formData = new FormData();
      formData.append('name', this.place.name);
      formData.append('types', this.place.types);
      formData.append('description', this.place.description);
      formData.append('address', this.place.address);
      formData.append('tag', this.place.tags);

      for (let i = 0; i < this.selectedFiles.length; i++) {
        formData.append('images', this.selectedFiles[i], this.selectedFiles[i].name);
      }

      this.placeService.updatePlace(this.place._id, formData).subscribe(response => {
        console.log('Lugar actualizado:', response);
        if (this.updateModal) {
          this.updateModal.hide();
        }
        this.router.navigate(['/info-place']);
      }, error => {
        console.error('Error al actualizar el lugar:', error);
      });
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
