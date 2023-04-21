export class TileManipulationService {
    constructor(board) {
        this.board = board;
    }

    addTiles() {
        return new Promise((resolve) => {
            const fields = this.board.fields.filter(
                (field) => field.tile === null
            );
            let total = fields.length;
            let completed = 0;

            fields.forEach((field) => {
                const tile = this.board.createTile(field);
                tile.sprite.y = -100;
                tile.moveDown(field.position).then(() => {
                    ++completed;
                    if (completed >= total) {
                        resolve();
                    }
                });
            });
        });
    }

    resolveTilesFalling() {
        return new Promise((resolve) => {
            let completed = 0;
            let started = 0;

            for (let row = this.board.rows - 1; row >= 0; row--) {
                for (let col = this.board.cols - 1; col >= 0; col--) {
                    const field = this.board.getField(row, col);

                    if (!field.tile) {
                        ++started;

                        this.moveTilesDown(field).then(() => {
                            ++completed;
                            if (completed >= started) {
                                resolve();
                            }
                        });
                    }
                }
            }
        });
    }

    moveTilesDown(emptyField) {
        for (let row = emptyField.row - 1; row >= 0; row--) {
            let fallingField = this.board.getField(row, emptyField.col);

            if (fallingField.tile) {
                const fallingTile = fallingField.tile;
                fallingTile.field = emptyField;
                emptyField.tile = fallingTile;
                fallingField.tile = null;
                return fallingTile.moveDown(emptyField.position);
            }
        }

        return Promise.resolve();
    }
}
