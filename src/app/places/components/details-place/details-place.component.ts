import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PlaceService } from '../../services/place.service';
import { Iplace } from '../../interfaces/iplace';

@Component({
  selector: 'app-details-place',
  templateUrl: './details-place.component.html',
  styleUrls: ['./details-place.component.css']
})
export class DetailsPlaceComponent implements OnInit {
  place: Iplace | undefined;

  constructor(private placeService: PlaceService, private route: ActivatedRoute) {}

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
}
