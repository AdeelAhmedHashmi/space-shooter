import Phaser from "phaser";

type BounsType = "health" | "hullets" | "shield";

export default class Bonus {
    scene: Phaser.Scene;
    sprite: Phaser.Physics.Arcade.Sprite;
    type: BounsType;
    speed: number;

    constructor(scene: Phaser.Scene, x: number, y: number, type: BounsType) {
        this.scene = scene;
        this.type = type;

        const frames: Record<string, string> = {
            health: "star_gold.png",
            bullets: "powerupBlue_star.png",
            shield: "things_bronze.png",
        };

        const frame = frames[type];

        this.sprite = scene.physics.add.sprite(x, y, "sheet", frame);
        this.sprite.setScale(1.1);
        this.speed = Phaser.Math.FloatBetween(2, 4);
        this.sprite.setVelocityX(Phaser.Math.Between(-40, 40));

        scene.events.on("update", this.update, this);
        this.sprite.setData("ref", this);
    }

    update() {
        if (!this.sprite.active) return;

        this.sprite.y += this.speed;

        if (this.sprite.y > this.scene.scale.height + 50) {
            this.destroy();
        }
    }

    destroy() {
        this.scene.events.off("update", this.update, this);
        this.sprite.destroy();
    }
}
