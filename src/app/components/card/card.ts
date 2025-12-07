import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Card } from '../../models/card.model';

@Component({
  selector: 'app-card',
  templateUrl: './card.html',
  styleUrl: './card.css',
})
export class CardComponent {
  @Input() card!: Card;
  @Output() flip = new EventEmitter<Card>();

  onClick() {
    if(!this.card.flipped && !this.card.matched){
      this.flip.emit(this.card);
    }
  }
}
