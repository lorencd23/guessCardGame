import { Component, signal } from '@angular/core';
import { Card } from '../../models/card.model';
import { CardComponent } from '../card/card';
import { GameStateService } from '../../services/game-state-service';

@Component({
  selector: 'app-start',
  imports: [CardComponent],
  templateUrl: './start.html',
  styleUrls: ['./start.css']
})
export class StartComponent {
  cards = signal<Card[]>([]);
  flippedCards = signal<Card[]>([]);
  timeLeft = signal(0);
  timerRunning = signal(false);
  
  private timer: any;

  constructor(public gameState: GameStateService) {
    this.startGame();
  }

  startGame(){
    const level = this.gameState.getCurrentLevelConfig();

    const deck = [...level.values, ...level.values]
        .map((value, index) => ({
          id: index,
          value,
          flipped: false,
          matched: false
        })).sort(() => Math.random() - 0.5);

    this.cards.set(deck);
    this.timeLeft.set(level.time);
    this.startTimer();
  }
  
  startTimer(){
    clearInterval(this.timer);
    this.timerRunning.set(true);

    this.timer = setInterval(() => {
      const current = this.timeLeft();

      if(current > 0){
        this.timeLeft.set(current - 1);
      }else{
        clearInterval(this.timer);
        this.timerRunning.set(false);
        alert("¡Fracaso!");
      }
    }, 1000)
  }

  onCardFlip(card: any) {
    if (card.flipped || card.matched) return;

    const flipped = this.flippedCards();
    if (flipped.length < 2) {
      card.flipped = true;
      this.flippedCards.set([...flipped, card]);

      if (this.flippedCards().length === 2) {
        setTimeout(() => this.checkMatch(), 700);
      }
    }
  }

  checkMatch() {
    const [a, b] = this.flippedCards();

    if (a.value === b.value) {
      a.matched = b.matched = true;
      this.flippedCards.set([]);

      if (this.cards().every(c => c.matched)) {
        clearInterval(this.timer);
        this.gameState.completeLevel();
        alert('🎉 Nivel completado');
      }
    } else {
      a.flipped = b.flipped = false;
      this.flippedCards.set([]);
    }
  }

  checkWin() {
    if (this.cards().every(card => card.matched)) {
      clearInterval(this.timer);
      this.gameState.completeLevel();
      alert("¡Nivel completado!");
    }
  }

}
