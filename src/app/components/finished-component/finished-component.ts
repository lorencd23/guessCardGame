import { Component } from '@angular/core';
import { AppNavigationService } from '../../services/app-navigation-service';
import { GameStateService } from '../../services/game-state-service';

@Component({
  selector: 'app-finished-component',
  imports: [],
  templateUrl: './finished-component.html',
  styleUrl: './finished-component.css',
})
export class FinishedComponent {
  
  constructor(public nav: AppNavigationService, public game: GameStateService) {}

  newGame() {
    this.game.newGame();
    this.nav.closeModal();
  }

  levels() {
    this.nav.goTo('levels');
  }

  menu() {
    this.nav.goTo('menu');
  }
}
