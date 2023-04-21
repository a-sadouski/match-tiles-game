import { Graphics, Text } from 'pixi.js';
import { Config } from './Config';

export class Score {
    constructor(x, y) {
        this.scoreCounter = 0;
        this.sprite = new Graphics();
        const width = 220;
        const height = 120;

        this.sprite.lineStyle(2, 0xffffff, 1);
        this.sprite.beginFill(664905);
        this.sprite.drawRoundedRect(x, y, width, height, 10);
        this.sprite.endFill();

        this.scoreText = new Text('', {
            fontSize: 32,
            fill: '#ffffff',
        });

        this.scoreText.position.set(x + width / 2, y + height / 2);

        this.scoreText.anchor.set(0.5);

        this.sprite.addChild(this.scoreText);

        this.updateScore();
    }

    updateScore(value = 0) {
        this.scoreCounter += value;
        if (this.scoreCounter > Config.winScoreCount) {
            this.scoreText.style.fill = '#1ed94d';
        }
        this.scoreText.text = `Score: ${this.scoreCounter}/${Config.winScoreCount}`;
    }
}
