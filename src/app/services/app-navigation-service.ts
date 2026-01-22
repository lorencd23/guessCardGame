import { Injectable, signal } from '@angular/core';
export type Screen = 'menu' | 'levels' | 'game' | 'options' | 'privacy';
export type Modal = null | 'win' | 'lose' | 'finished';

@Injectable({
  providedIn: 'root'
})
export class AppNavigationService {
  screen = signal<Screen>('menu');
  modal = signal<Modal>(null);

  goTo(screen: Screen) {
    this.screen.set(screen);
    this.closeModal();
  }

  openModal(modal: Modal) {
    this.modal.set(modal);
  }

  closeModal() {
    this.modal.set(null);
  }

} 
