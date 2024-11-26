import { Component } from '@angular/core';
import { RecommendationsService } from '../../services/recommendations.service';
import { RecommendationsModule } from "../../recommendations.module";
import { TellUsComponent } from "../tell-us/tell-us.component";

@Component({
  selector: 'app-desire-view',
  templateUrl: './desire-view.component.html',
  styleUrl: './desire-view.component.css'
})
export class DesireViewComponent {
  isInInterest: boolean = true
  selected: number[] = []

  constructor(private recServ: RecommendationsService) {  }

  ngDoCheck():void {
    console.log(this.isInInterest);
  }

  back(): void {
    this.isInInterest = true
  }
}
