import Phaser from "phaser";

export default class Meteor {
    scene: Phaser.Scene;
    sprite: Phaser.Physics.Arcade.Sprite;
    speed: number;

    constructor(scene: Phaser.Scene, x: number, y: number) {
        this.scene = scene;

        const frames = [
            "meteorBrown_big1.png",
            "meteorBrown_big2.png",
            "meteorBrown_big3.png",
            "meteorBrown_big4.png",
            "meteorBrown_med1.png",
            "meteorBrown_med3.png",
            "meteorBrown_small1.png",
            "meteorBrown_small2.png",
        ];

        const frame = Phaser.Utils.Array.GetRandom(frames);
        this.sprite = scene.physics.add
            .sprite(x, y, "sheet", frame)
            .setDepth(0);
        this.sprite.setScale(Phaser.Math.FloatBetween(0.2, 1));
        this.sprite.setAlpha(Phaser.Math.FloatBetween(0, 0.2));
        this.speed = Phaser.Math.FloatBetween(1, 2.9);
        this.sprite.setAngularVelocity(Phaser.Math.Between(-40, 40));

        scene.events.on("update", this.update, this);
    }

    update() {
        if (!this.sprite.active) return;

        this.sprite.y += this.speed;

        if (this.sprite.y > this.scene.scale.height + 100) {
            this.destroy();
        }
    }

    destroy() {
        this.scene.events.off("update", this.update, this);
        this.sprite.destroy();
    }
}
