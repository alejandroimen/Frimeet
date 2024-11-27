import { Component, OnInit } from '@angular/core';
import { ReviewService } from '../../places/services/review.service';

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.css']
})
export class ReviewComponent implements OnInit {
  reviews: any[] = [];

  constructor(private reviewService: ReviewService) {}

  ngOnInit(): void {
    this.loadReviews();
  }

  loadReviews(): void {
    this.reviewService.getReviewById().subscribe(
      (data: any[]) => {
        this.reviews = data;
        console.log('Reseñas obtenidas:', this.reviews);
      },
      (error: any) => {
        console.error('Error al obtener las reseñas:', error);
      }
    );
  }
}
