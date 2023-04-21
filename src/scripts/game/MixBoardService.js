export class MixBoardService {
    constructor(board) {
        this.board = board;
    }

    mixBoard() {
        const tiles = [];
        let i = 0;
        this.board.fields.forEach((field) => tiles.push(field.tile));
        tiles.sort(() => Math.random() - 0.5);
        tiles.forEach((tile) => {
            this.board.fields[i].setTile(tile);
            i++;
        });
    }
}
