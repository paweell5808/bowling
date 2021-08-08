export class Game {
  scores: Array<number> = [];

  strikeBonus: Array<number> = [];
  spareBonus: Array<number> = [];

  finalScore = 0;

  constructor(scores: Array<number>) {
    this.scores = scores;
  }

  getFinalScore(): number {
    let firstRoll = 0;
    let secondRoll = 0;

    this.scores.forEach((value, index) => {
      if (index % 2 === 0) {
        firstRoll = value;

        if (value === 10) {
          this.addStrike(index);
        }
      } else if (index % 2 === 1) {
        secondRoll = value;

        if (firstRoll + secondRoll === 10 && secondRoll !== 0) {
          this.addSpare(index);
        }
      }

      this.finalScore += value;
    });

    if (this.strikeBonus.length > 0) {
      this.finalScore += this.strikeBonus.reduce((a, b) => a + b);
    }
    if (this.spareBonus.length > 0) {
      this.finalScore += this.spareBonus.reduce((a, b) => a + b);
    }

    return this.finalScore;
  }

  addStrike(index: number): void {
    if (index < 18) {
      let firstToAdd = this.scores[index+2];
      let secondToAdd = firstToAdd === 10 ? this.scores[index+4] : this.scores[index+3];

      this.strikeBonus.push(firstToAdd, secondToAdd);
    }
  }

  addSpare(index: number): void {
    if (index < 19) {
      this.spareBonus.push(this.scores[index+1]);
    }
  }

}
