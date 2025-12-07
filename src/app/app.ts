import { Component, OnInit, signal } from '@angular/core';
import { Card } from './models/card.model';
import { CardComponent } from './components/card/card';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CardComponent],
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class App implements OnInit {
  cards = signal<Card[]>([]);
  flippedCards = signal<Card[]>([]);
  timeLeft = signal(30);
  timerRunning = signal(false);
  values = ['🍎', '🍌', '🍇', '🍓', '🍒', '🍉'];
  private timerInterval: any;

  ngOnInit() {
    // this.startGame();
  }

  startGame(){
    const deck = [...this.values, ...this.values]
        .map((value, index) => ({
          id: index,
          value,
          flipped: false,
          matched: false
        })).sort(() => Math.random() - 0.5);

    this.cards.set(deck);
    this.flippedCards.set([]);
    this.resetTimer();
  }

  onCardFlip(card: Card) {
    if(!this.timerRunning()){
      return;
    }

    const flipped = this.flippedCards();

    if (flipped.length < 2) {
      card.flipped = true;
      this.flippedCards.set([...flipped, card]);

      if (this.flippedCards().length === 2) {
        this.checkMatch();
      }
    }
  }

  checkMatch() {
    const [card1, card2] = this.flippedCards();

    if (card1.value === card2.value) {
      card1.matched = card2.matched = true;
      this.flippedCards.set([]);

      const allMatched = this.cards().every(c => c.matched);

      if(allMatched){
        this.stopTimer();
        alert("¡Éxito!");
      }
    } else {
      setTimeout(() => {
        card1.flipped = false;
        card2.flipped = false;
        this.flippedCards.set([]);
      }, 800);
    }
  }

  resetTimer(){
    clearInterval(this.timerInterval);
    this.timeLeft.set(30);
    this.timerRunning.set(true);

    this.timerInterval = setInterval(() => {
      const current = this.timeLeft();

      if(current > 0){
        this.timeLeft.set(current - 1);
      }else{
        this.stopTimer();
        alert("¡Fracaso!");
      }
    }, 1000)
  }

  stopTimer(){
    clearInterval(this.timerInterval);
    this.timerRunning.set(false);
  }

  protected readonly title = signal('guessCardGame');
}
