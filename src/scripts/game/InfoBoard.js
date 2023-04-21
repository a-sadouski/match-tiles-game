import * as PIXI from 'pixi.js';
import { Score } from './Score';
import { Turns } from './Turns';
import { App } from '../system/App';

export class InfoBoard {
    constructor(boardWidth) {
        this.container = new PIXI.Container();
        this.score = new Score(40, 20);
        this.turns = new Turns(150, 210);
        this.bg = App.sprite('info-board');
        this.bg.width = 300;
        this.bg.height = 300;
        this.container.addChild(this.bg, this.turns.sprite, this.score.sprite);

        this.setCorrectPosition(boardWidth);
    }

    updateScore(value) {
        this.score.updateScore(value);
    }

    decreaseTurnsCounter() {
        this.turns.decreaseTurns();
    }

    setCorrectPosition(boardWidth) {
        this.container.x = innerWidth / 2 + boardWidth - this.container.width;
        this.container.y = innerHeight / 2 - this.container.height / 2;
    }
}
