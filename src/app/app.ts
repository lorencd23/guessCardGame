import { Component, signal } from '@angular/core';
import { Options } from './components/options/options';
import { Privacy } from './components/privacy/privacy';
import { LevelSelector } from './components/level-selector/level-selector';
import { StartComponent } from './components/start/start';
import { AppNavigationService } from './services/app-navigation-service';
import { WinComponent } from './components/win-component/win-component';
import { LoseComponent } from './components/lose-component/lose-component';
import { FinishedComponent } from './components/finished-component/finished-component';
import { GameStateService } from './services/game-state-service';

type Screen = 'menu' | 'levels' | 'game' | 'options' | 'privacy';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [LevelSelector, StartComponent, Options, Privacy, WinComponent, LoseComponent, FinishedComponent],
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class App {
  
  screen = signal<Screen>('menu');

  constructor(public nav: AppNavigationService, private game: GameStateService) {}

  openLevelSelector(){
    this.nav.goTo('levels');
  }

  openOptions(){
    this.nav.goTo('options');
  }

  openPrivacy(){
    this.nav.goTo('privacy');
  }

  back(){
    if(this.nav.screen() === 'game'){ 
      this.nav.goTo('levels');
    } else {
      this.nav.goTo('menu');
    }
  }
}
