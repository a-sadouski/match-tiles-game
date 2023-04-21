import { Graphics, Text } from 'pixi.js';
import { Config } from './Config';

export class Turns {
    constructor(x, y) {
        this.turnsCounter = Config.turnsCount;
        this.sprite = new Graphics();
        const radius = 55;
        this.x = x;
        this.y = y;

        this.sprite.lineStyle(2, 0xffffff, 1);
        this.sprite.beginFill(0xec6ebf);
        this.sprite.drawCircle(x, y, radius);
        this.sprite.endFill();

        this.scoreText = new Text(this.turnsCounter, {
            fontSize: 32,
            fill: '#ffffff',
        });
        this.setCorrectTextPlacement();
        this.sprite.addChild(this.scoreText);
    }

    decreaseTurns() {
        this.turnsCounter--;
        this.scoreText.text = this.turnsCounter;
        this.setCorrectTextPlacement();
    }

    setCorrectTextPlacement() {
        this.scoreText.x = this.x - this.scoreText.width / 2;
        this.scoreText.y = this.y - this.scoreText.height / 2;
    }
}
