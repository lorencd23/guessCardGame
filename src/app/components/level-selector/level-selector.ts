import { Component, EventEmitter, inject, input, Output, output } from '@angular/core';
import { GameStateService } from '../../services/game-state-service';
import { AppNavigationService } from '../../services/app-navigation-service';

@Component({
  selector: 'app-level-selector',
  imports: [],
  templateUrl: './level-selector.html',
  styleUrl: './level-selector.css',
})
export class LevelSelector {
  constructor(public gameState: GameStateService, public nav: AppNavigationService) {}

  select(index: number) {
    this.gameState.selectLevel(index);
    this.nav.goTo('game');
  }
}
