import { App } from '../system/App';
import { Scene } from '../system/Scene';
import { Board } from './Board';
import { MatchService } from './MatchService';
import { InfoBoard } from './InfoBoard';
import { Config } from './Config';
import { BustersBoard } from './BustersBoard';
import { MixBoardService } from './MixBoardService';
import { TileManipulationService } from './TileManipulationService';

export class Game extends Scene {
    create() {
        this.createBackground();

        this.mixingTimeout = null;
        this.messageTimeout = null;

        this.board = new Board();
        this.infoBoard = new InfoBoard(this.board.width);
        this.bustersBoard = new BustersBoard(this.board.width);

        this.container.addChild(
            this.board.container,
            this.infoBoard.container,
            this.bustersBoard.container
        );

        this.board.container.on('tile-clicked', this.onTileClick.bind(this));

        this.tileManipulationService = new TileManipulationService(this.board);
        this.matchService = new MatchService(this.board);
        this.mixBoardService = new MixBoardService(this.board);

        this.mixTilesBeforeAnyMatch();
    }

    createBackground() {
        this.bg = App.sprite('bg');
        this.bg.width = window.innerWidth;
        this.bg.height = window.innerHeight;
        this.container.addChild(this.bg);
    }

    onTileClick(clickedTile) {
        if (this.infoBoard.turns.turnsCounter) {
            this.resolveMatches(clickedTile);
        }
    }

    mixTilesBeforeAnyMatch() {
        while (!this.matchService.isThereAnyMatches()) {
            this.mixBoardService.mixBoard();
        }
    }

    resolveMatches(clickedTile) {
        let matchGroup;
        if (this.bustersBoard.isBombBusterActivated) {
            matchGroup = this.matchService.getBombMatches(clickedTile);
            this.bustersBoard.changeBombBusterState();
        } else {
            matchGroup = this.matchService.getMatches(clickedTile);
        }
        if (matchGroup.length >= Config.groupSize) {
            this.infoBoard.decreaseTurnsCounter();
            this.infoBoard.updateScore(matchGroup.length);
            this.matchService
                .fireMatches(matchGroup)
                .then(() => this.tileManipulationService.resolveTilesFalling())
                .then(() => this.tileManipulationService.addTiles())
                .then(() => {
                    if (this.mixingTimeout) clearTimeout(this.mixingTimeout);
                    if (!this.matchService.isThereAnyMatches()) {
                        this.mixingTimeout = setTimeout(() => {
                            this.mixTilesBeforeAnyMatch();
                            this.mixTries--;
                        }, 1000);
                    }
                })
                .then(() => this.showGameResult());
        }
    }

    showGameResult() {
        if (this.mixTries === 0) {
            alert(`You lose, because you ran out of mix attempts.
            Your result - ${this.infoBoard.score.scoreCounter}. Do you want to try again?`);
            this.create();
        } else if (this.infoBoard.turns.turnsCounter === 0) {
            if (this.messageTimeout) clearTimeout(this.messageTimeout);
            const resultWord =
                this.infoBoard.score.scoreCounter >= Config.winScoreCount
                    ? 'won'
                    : 'lose';
            this.messageTimeout = setTimeout(() => {
                alert(
                    `You ${resultWord}. Your result - ${this.infoBoard.score.scoreCounter}. Do you want to try again?`
                );
                this.create();
            }, 1000);
        }
    }
}
