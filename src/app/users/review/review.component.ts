import { Component, OnInit } from '@angular/core';
import { ReviewService } from '../../places/services/review.service';
import { NavbarService } from '../../services/navbar.service';
@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.css']
})
export class ReviewComponent implements OnInit {
  reviews: any[] = [];
  isNavbarCollapsed: boolean = true;

  constructor(private reviewService: ReviewService, private navbarService: NavbarService) { }

  ngOnInit(): void {
    this.loadReviews();
    this.navbarService.isCollapsed$.subscribe((isCollapsed) => {
      this.isNavbarCollapsed = isCollapsed;
    });
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
