import { App } from '../system/App';

export class MatchService {
    constructor(board) {
        this.board = board;
    }

    fireMatches(matches) {
        return new Promise((resolve) => {
            matches.forEach((tile) => {
                tile.remove().then(() => resolve());
            });
        });
    }

    getMatches(initialTile, existMatches = []) {
        let matches = existMatches;
        this.board.fields.forEach((checkingField) => {
            const isNeighbourCondition =
                initialTile &&
                checkingField.tile &&
                ((Math.abs(initialTile.field.row - checkingField.row) === 1 &&
                    Math.abs(initialTile.field.col - checkingField.col) ===
                        0) ||
                    (Math.abs(initialTile.field.row - checkingField.row) ===
                        0 &&
                        Math.abs(initialTile.field.col - checkingField.col) ===
                            1));
            if (isNeighbourCondition) {
                if (
                    initialTile.color === checkingField.tile.color &&
                    !existMatches.includes(checkingField.tile)
                ) {
                    matches.push(checkingField.tile);
                    matches = this.getMatches(checkingField.tile, matches);
                }
            }
        });
        return [...new Set(matches)];
    }

    getBombMatches(initialTile) {
        const matches = [];
        this.board.fields.forEach((checkingField) => {
            const isNeighbourCondition =
                initialTile &&
                checkingField.tile &&
                ((Math.abs(initialTile.field.row - checkingField.row) <=
                    App.config.bombFireRadius &&
                    Math.abs(initialTile.field.col - checkingField.col) <=
                        App.config.bombFireRadius) ||
                    (Math.abs(initialTile.field.row - checkingField.row) <=
                        App.config.bombFireRadius &&
                        Math.abs(initialTile.field.col - checkingField.col) <=
                            App.config.bombFireRadius));
            if (isNeighbourCondition) {
                matches.push(checkingField.tile);
            }
        });
        return matches;
    }

    isThereAnyMatches() {
        for (const field of this.board.fields) {
            if (this.getMatches(field.tile).length >= App.config.groupSize) {
                return true;
            }
        }
        return false;
    }
}
