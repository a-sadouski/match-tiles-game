import {App} from '../system/App';

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

    getTile(row, col) {
        if (row < 0 || row >= App.config.board.rows || col < 0 || col >= App.config.board.cols) {
            return null;
        }
        return this.board.fields.find(field => field.col === col && field.row === row).tile;
    }

    getNeighbours(initialTile) {
        const initialTileRow = initialTile.field.row;
        const initialTileColumn = initialTile.field.col;

        let neighbours = [
            this.getTile(initialTileRow + 1, initialTileColumn),
            this.getTile(initialTileRow - 1, initialTileColumn),
            this.getTile(initialTileRow, initialTileColumn + 1),
            this.getTile(initialTileRow, initialTileColumn - 1)
        ];

        neighbours = neighbours.filter(item => item);

        return neighbours;
    }


    getMatchGroup(initialTile, existMatches = []) {
        let matches = existMatches;

        const neighbours = this.getNeighbours(initialTile);

        neighbours.forEach((checkingTile) => {
            if (
                initialTile.color === checkingTile.color &&
                !existMatches.includes(checkingTile)
            ) {
                matches.push(checkingTile);
                matches = this.getMatchGroup(checkingTile, matches);
            }
        });

        return matches;
    }

    checkIsNeighbourCondition(initialTile, checkingField) {
        return initialTile && checkingField.tile &&
            ((Math.abs(initialTile.field.row - checkingField.row) === 1
            && Math.abs(initialTile.field.col - checkingField.col) === 0)
            || (Math.abs(initialTile.field.row - checkingField.row) === 0
            && Math.abs(initialTile.field.col - checkingField.col) === 1));
    }

    getMatches(initialTile, existMatches = []) {
        let matches = existMatches;

        this.board.fields.forEach((checkingField) => {
            if (this.checkIsNeighbourCondition(initialTile, checkingField)) {
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

    checkIsFiredByBomb(initialTile, checkingField) {
        const bombFireRadius = App.config.bombFireRadius;

        return ((Math.abs(initialTile.field.row - checkingField.row) <=
                bombFireRadius
                && Math.abs(initialTile.field.col - checkingField.col) <=
                bombFireRadius)
                || (Math.abs(initialTile.field.row - checkingField.row) <=
                bombFireRadius
                && Math.abs(initialTile.field.col - checkingField.col) <=
                bombFireRadius));
    }

    getBombMatches(initialTile) {
        const matches = [];

        this.board.fields.forEach((checkingField) => {
            const isNeighbourCondition = initialTile && checkingField.tile
                && this.checkIsFiredByBomb(initialTile, checkingField);
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
