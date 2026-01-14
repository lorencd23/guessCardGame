import { Component } from '@angular/core';
import { AppNavigationService } from '../../services/app-navigation-service';
import { GameStateService } from '../../services/game-state-service';

@Component({
  selector: 'app-win-component',
  imports: [],
  templateUrl: './win-component.html',
  styleUrl: './win-component.css',
})
export class WinComponent {
  constructor(public nav: AppNavigationService, public game: GameStateService) {}

    next() {
      this.game.nextLevel();
      this.nav.closeModal();
    }

    levels() {
      this.nav.goTo('levels');
    }

    menu() {
    this.nav.goTo('menu');
  }
}
