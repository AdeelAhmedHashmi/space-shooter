import { GameScene as MainGame } from "./scenes/Game";
import { AUTO, Game, Types } from "phaser";
import GameOver from "./scenes/GameOver";
// import Start from "./scenes/Start";

const config: Types.Core.GameConfig = {
    type: AUTO,
    scale: {
        height: window.innerHeight,
        width: window.innerWidth,
    },
    backgroundColor: "red",
    physics: {
        default: "arcade",
        arcade: {
            // gravity: { x: 0, y: 20000 },
            debug: false,
        },
    },
    scene: [MainGame, GameOver],
};

const StartGame = (parent: string) => {
    return new Game({ ...config, parent });
};

export default StartGame;

