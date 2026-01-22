import { effect, Injectable, signal } from '@angular/core';
import { LevelConfig } from '../interfaces/level-config';

@Injectable({
  providedIn: 'root'
})
export class GameStateService {
  currentLevel = signal(0);
  maxUnlockedLevel = signal(0);
  gameVersion = signal(0);

  levels: LevelConfig[] = [
    {
      id: 1,
      time: 30,
      values: ['🍎', '🍌', '🍇', '🍓', '🍒', '🍉'], // 6 parejas
      completed: false
    },
    {
      id: 2,
      time: 40,
      values: ['🍎', '🍌', '🍇', '🍓', '🍒', '🍉'], // mismo número de cartas pero menos tiempo
      completed: false
    },
    {
      id: 3,
      time: 50,
      values: ['🍎', '🍌', '🍇', '🍓', '🍒', '🍉', '🥝', '🍍'], // más cartas
      completed: false
    },
    {
      id: 4,
      time: 50,
      values: ['🍎', '🍌', '🍇', '🍓', '🍒', '🍉', '🥝', '🍍', '🍑', '🥥'], // aún más
      completed: false
    },
    {
      id: 5,
      time: 55,
      values: ['🍎', '🍌', '🍇', '🍓', '🍒', '🍉', '🥝', '🍍', '🍑', '🥥', '🥑'], // aún más
      completed: false
    }
  ];

  constructor() { 
    effect(() => {
      localStorage.setItem('gameState', JSON.stringify({
        currentLevel: this.currentLevel(),
        maxUnlockedLevel: this.maxUnlockedLevel(),
        levels: this.levels,
      }));
    });

    const saved = localStorage.getItem('gameState');
    if(saved){
      const data = JSON.parse(saved);
      this.currentLevel.set(data.currentLevel ?? 0);
      this.maxUnlockedLevel.set(data.maxUnlockedLevel ?? 0);
      this.levels = data.levels ?? this.levels;
    }
  }

  public selectLevel(levelIndex: number): void {
    if(levelIndex <= this.maxUnlockedLevel()){
      this.currentLevel.set(levelIndex);
    }
  }

  public completeLevel(): void {
    const next = this.currentLevel() + 1;
    this.levels[this.currentLevel()].completed = true;
    if(next > this.maxUnlockedLevel()){
      this.maxUnlockedLevel.set(next);
    }
  }

  public getCurrentLevelConfig(): LevelConfig {
    return this.levels[this.currentLevel()];
  }

  public nextLevel(): void {
    const next = this.currentLevel() + 1;
    if (next < this.levels.length) {
      this.currentLevel.set(next);

      if (next > this.maxUnlockedLevel()) {
        this.maxUnlockedLevel.set(next);
      }
    } else {
      console.log('🎉 Juego completado');
    }
  }

  public retryGame(): void {
    this.gameVersion.update(v => v + 1);
  }

  public newGame(): void {
    this.currentLevel.set(0);
    this.maxUnlockedLevel.set(0);
    this.levels.forEach(level => level.completed = false);
    this.gameVersion.update(v => v + 1);
  }
}