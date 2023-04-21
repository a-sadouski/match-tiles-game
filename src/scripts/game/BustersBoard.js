import * as PIXI from 'pixi.js';
import { Buster } from './Buster';

export class BustersBoard {
    constructor(boardWidth) {
        this.container = new PIXI.Container();
        this.isBombBusterActivated = false;
        this.fields = [];
        this.create();
        this.setCorrectPosition(boardWidth);
    }

    create() {
        this.createBusters();
    }

    createBusters() {
        this.bombBuster = new Buster('bomb');

        this.bombBuster.sprite.interactive = true;
        this.bombBuster.sprite.on('click', () => {
            this.changeBombBusterState();
        });

        this.container.addChild(this.bombBuster.sprite);
    }

    changeBombBusterState() {
        this.isBombBusterActivated = !this.isBombBusterActivated;
        this.bombBuster.changeSize(this.isBombBusterActivated);
    }

    setCorrectPosition(boardWidth) {
        this.container.x =
            innerWidth / 2 - boardWidth / 2 - this.container.width * 2;
        this.container.y = innerHeight / 2 - this.container.width;
    }
}
