import { Injectable, signal } from '@angular/core';
export type Screen = 'menu' | 'levels' | 'game' | 'options' | 'privacy';

@Injectable({
  providedIn: 'root'
})
export class AppNavigationService {
  screen = signal<Screen>('menu');

  goTo(screen: Screen) {
    this.screen.set(screen);
  }
} 
