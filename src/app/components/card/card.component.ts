import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './card.component.html',
  styleUrl: './card.component.css'
})
export class CardComponent {
  @Input() idMovie: number = 0;
  @Input() imgMovie: string = '';
  @Input() descriptionMovie: string = '';
  @Input() titleMovie: string = '';

  public currentRoute: string = '';

    constructor (private route: Router){
      this.currentRoute = this.route.url;
    }

}
