import Phaser from "phaser";
import Player from "../objects/player";

export default class EventManager {
    constructor(
        private scene: Phaser.Scene,
        private player: Player,
        private healths: Phaser.Physics.Arcade.Group,
        private shields: Phaser.Physics.Arcade.Group,
        private boosters: Phaser.Physics.Arcade.Group,
        private enemyBullets: Phaser.Physics.Arcade.Group,
        private enemies: Phaser.Physics.Arcade.Group
    ) {
        console.log("------Manager Initialized------");
    }
}
