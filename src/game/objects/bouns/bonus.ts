import Phaser from "phaser";

export default class Bonus {
    scene: Phaser.Scene;
    sprite: Phaser.Physics.Arcade.Sprite;
    circle: Phaser.Physics.Arcade.Sprite;
    speed: number = 3;

    update() {
        if (!this.sprite.active) return;

        this.sprite.y += this.speed;

        this.circle.y = this.sprite.y;
        this.circle.x = this.sprite.x;

        if (this.sprite.y > this.scene.scale.height + 50) {
            this.destroy();
        }
    }

    destroy() {
        this.scene.events.off("update", this.update, this);
        this.sprite.destroy();
        this.circle.destroy();
    }
}
