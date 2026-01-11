import { Component, inject, OnInit, signal } from '@angular/core';
import { Options } from './components/options/options';
import { Privacy } from './components/privacy/privacy';
import { LevelSelector } from './components/level-selector/level-selector';
import { StartComponent } from './components/start/start';
import { AppNavigationService } from './services/app-navigation-service';

type Screen = 'menu' | 'levels' | 'game' | 'options' | 'privacy';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [LevelSelector, StartComponent, Options, Privacy],
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class App {
  
  screen = signal<Screen>('menu');

  constructor(public nav: AppNavigationService) {}

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
    this.nav.goTo('menu');
  }
}
