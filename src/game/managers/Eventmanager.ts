import Phaser from "phaser";
import Meteor from "../objects/metior";
import Shield from "../objects/bouns/shield";
import Booster from "../objects/bouns/booster";
import Health from "../objects/bouns/health";

export default class EventManager {
    constructor(
        private scene: Phaser.Scene,
        private healths: Phaser.Physics.Arcade.Group,
        private shields: Phaser.Physics.Arcade.Group,
        private boosters: Phaser.Physics.Arcade.Group,
    ) {
        this.configureEvents();
    }

    private configureEvents() {
        this.scene.time.addEvent({
            delay: 200,
            loop: true,
            callback: () => {
                new Health(
                    this.scene,
                    this.healths,
                    Phaser.Math.Between(0, this.scene.scale.width),
                    -50,
                );
            },
        });

        this.scene.time.addEvent({
            delay: 100,
            loop: true,
            callback: () => {
                new Booster(
                    this.scene,
                    this.boosters,
                    Phaser.Math.Between(0, this.scene.scale.width),
                    -50,
                );
            },
        });

        this.scene.time.addEvent({
            delay: 150,
            loop: true,
            callback: () => {
                new Shield(
                    this.scene,
                    this.shields,
                    Phaser.Math.Between(0, this.scene.scale.width),
                    -50,
                );
            },
        });

        this.scene.time.addEvent({
            delay: 300,
            loop: true,
            callback: () => {
                new Meteor(
                    this.scene,
                    Phaser.Math.Between(0, this.scene.scale.width),
                    -50,
                );
            },
        });
    }
}
