import { Component, OnInit } from '@angular/core';
import { Game } from '../../classes/game';
import { MatTableDataSource } from '@angular/material/table';
import { Player } from '../../interfaces/player';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})

export class TableComponent implements OnInit {

  displayedColumns: string[] = ['position', 'name', 'finalResult'];
  dataSource: MatTableDataSource<Player> = new MatTableDataSource<Player>();
  players: Player[] = [];

  rounds: Array<number> = [];
  fileData = '';

  constructor() {}

  ngOnInit(): void {
    this.fillRounds(21);
  }

  fillRounds(numbers: number): void {
    for (let i = 0; i < numbers; ++i) {
      this.rounds.push(i);
      this.displayedColumns.push(String(i+1));
    }
  }

  fileLoad(event: string): void {
    this.fileData = event;
    this.prepareData();
  }

  prepareData(): void {
    const splitByLine = this.fileData.split(/\r?\n/);

    let playerName = '';
    let playerScore: Array<number> = [];
    let position = 0;

    this.players = [];

    splitByLine.forEach((value, index) => {
      if (value) {
        if (index % 2 === 0) {
          playerName = value;
        } else {
          playerScore = value.split(`,`).map(x=>+x);
          this.players.push({
            position: ++position,
            name: playerName,
            finalResult: this.calculateFinalResult(playerScore),
            scores: playerScore
          });
        }
      }
    });

    this.dataSource.data = this.players;
    this.dataSource._updateChangeSubscription();
  }

  calculateFinalResult(scores: Array<number>): number {
    return new Game(scores).getFinalScore();
  }
}
