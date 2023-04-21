import { App } from '../system/App';
import { gsap } from 'gsap';

export class Tile {
    constructor(color) {
        this.color = color;
        this.sprite = App.sprite(this.color);
        this.sprite.width = 57;
        this.sprite.height = 64;
        this.sprite.anchor.set(0.5);
    }

    setPosition({ x, y }) {
        this.sprite.x = x;
        this.sprite.y = y;
    }

    async remove() {
        if (!this.sprite) {
            return;
        }
        await new Promise((resolve) => {
            gsap.to(this.sprite, {
                pixi: {
                    x: 1000,
                },
                onComplete: () => {
                    resolve();
                },
            });
        });
        this.sprite.destroy();
        this.sprite = null;

        if (this.field) {
            this.field.tile = null;
            this.field = null;
        }
    }

    moveDown({ y }) {
        return new Promise((resolve) => {
            gsap.to(this.sprite, {
                pixi: { y },
                onComplete: () => {
                    resolve();
                },
            });
        });
    }
}
