import { Game } from './Game';
import { Tools } from '../system/Tools';

export const Config = {
    loader: Tools.massiveRequire(
        require['context']('./../../sprites/', true, /\.(mp3|png|jpe?g)$/)
    ),
    scenes: {
        Game: Game,
    },
    board: {
        rows: 9,
        cols: 9,
    },
    tilesColors: ['blue', 'green', 'purple', 'red', 'yellow'],
    turnsCount: 10,
    winScoreCount: 40,
    groupSize: 2,
    mixTries: 3,
    bombFireRadius: 1,
};
