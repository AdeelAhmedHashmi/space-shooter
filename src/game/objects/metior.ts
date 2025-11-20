export default class Meteors {
    scene: Phaser.Scene;
    sprite: Phaser.Physics.Arcade.Sprite;
    speed: number;

    constructor(scene: Phaser.Scene, x: number, y: number) {
        this.scene = scene;
        this.sprite = scene.physics.add.sprite(x, y, "sheet", "");
    }
}
