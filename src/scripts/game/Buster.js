import { App } from '../system/App';

export class Buster {
    constructor(busterName) {
        this.sprite = App.sprite(busterName);
        this.sprite.width = 96;
        this.sprite.height = 96;
        this.sprite.y = 60;
    }

    changeSize(isActivated) {
        if (isActivated) {
            this.sprite.width = 128;
            this.sprite.height = 128;
        } else {
            this.sprite.width = 96;
            this.sprite.height = 96;
        }
    }
}
