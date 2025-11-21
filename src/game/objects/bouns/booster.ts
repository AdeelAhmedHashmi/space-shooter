import Phaser from "phaser";
import Bonus from "./bonus";

export default class Booster extends Bonus {
    constructor(
        scene: Phaser.Scene,
        boostersGroup: Phaser.Physics.Arcade.Group,
        x: number,
        y: number
    ) {
        super();
        this.scene = scene;
        this.sprite = this.scene.physics.add.sprite(
            x,
            y,
            "sheet",
            "bolt_bronze.png"
        );
        this.sprite.setDepth(2);
        this.sprite.setVisible(true);

        this.circle = this.scene.physics.add
            .sprite(x, y, "sheet", "shield3.png")
            .setDepth(this.sprite.depth - 1)
            .setScale(0.4)
            .setAlpha(0.5);

        boostersGroup.add(this.sprite);
        scene.events.on("update", this.update, this);
        this.sprite.setData("ref", this);
    }
}
