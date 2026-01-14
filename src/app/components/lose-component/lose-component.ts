import { Component } from '@angular/core';
import { AppNavigationService } from '../../services/app-navigation-service';
import { GameStateService } from '../../services/game-state-service';

@Component({
  selector: 'app-lose-component',
  imports: [],
  templateUrl: './lose-component.html',
  styleUrl: './lose-component.css',
})
export class LoseComponent {
  constructor(public nav: AppNavigationService, public game: GameStateService) {}

  retry() {
    this.game.retryGame();
    this.nav.closeModal();
  }

  levels() {
    this.nav.goTo('levels');
  }

  menu() {
    this.nav.goTo('menu');
  }
}
