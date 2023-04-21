import * as PIXI from 'pixi.js';
import { App } from '../system/App';
import { Field } from './Field';
import { Tile } from './TIle';
import { Tools } from '../system/Tools';
import { Config as config } from './Config';

export class Board {
    constructor() {
        this.container = new PIXI.Container();
        this.fields = [];
        this.rows = App.config.board.rows;
        this.cols = App.config.board.cols;
        this.create();
        this.setCorrectPosition();
    }

    create() {
        this.createFields();
        this.createTiles();
    }

    createFields() {
        for (let row = 0; row < this.rows; row++) {
            for (let col = 0; col < this.cols; col++) {
                this.createField(row, col);
            }
        }
    }

    createField(row, col) {
        const field = new Field(row, col);
        this.fields.push(field);
        this.container.addChild(field.sprite);
    }

    createTiles() {
        this.fields.forEach((field) => this.createTile(field));
    }

    createTile(field) {
        const randomColor =
            config.tilesColors[
                Tools.randomNumber(0, App.config.tilesColors.length - 1)
            ];
        const tile = new Tile(randomColor);

        tile.sprite.interactive = true;
        tile.sprite.on('click', () => {
            this.container.emit('tile-clicked', tile);
        });

        field.setTile(tile);
        this.container.addChild(tile.sprite);
        return tile;
    }

    getField(row, col) {
        return this.fields.find(
            (field) => field.row === row && field.col === col
        );
    }

    setCorrectPosition() {
        this.fieldSize = this.fields[0].sprite.width;
        this.width = this.cols * this.fieldSize;
        this.height = this.rows * this.fieldSize;
        this.container.x =
            (window.innerWidth - this.width) / 2 + this.fieldSize / 2;
        this.container.y =
            (window.innerHeight - this.height) / 2 + this.fieldSize / 2;
    }
}
