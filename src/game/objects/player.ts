import Phaser from "phaser";
export default class Player {
    scene: Phaser.Scene;
    sprite: Phaser.Physics.Arcade.Sprite;
    bullets: Phaser.Physics.Arcade.Group;
    fireTimer: Phaser.Time.TimerEvent | null = null;
    health: number = 4;

    constructor(scene: Phaser.Scene, x: number, y: number) {
        this.scene = scene;
        this.sprite = scene.physics.add.sprite(
            x,
            y,
            "sheet",
            "playerShip1_green.png"
        );
        this.sprite.setScale(0.5);

        this.bullets = scene.physics.add.group({
            classType: Phaser.Physics.Arcade.Image,
            runChildUpdate: true,
        });

        this.fireTimer = scene.time.addEvent({
            delay: 100,
            loop: true,
            callback: () => this.fire(),
        });
    }

    fire() {
        if (!this.sprite.active) return;
        const bullet = this.bullets.get(
            this.sprite.x,
            this.sprite.y - 30,
            "sheet",
            "laserGreen02.png"
        ) as Phaser.Physics.Arcade.Image;

        if (!bullet) return;

        bullet.setActive(true);
        bullet.setVisible(true);
        bullet.setVelocityY(-400);
        bullet.setScale(0.3);
    }

    takeHit(amount = 1) {
        this.health -= amount;

        console.log(this.health, ">", amount);
        if (this.health <= 0) {
            this.sprite.destroy();
            if (this.fireTimer) this.fireTimer.remove(false);
            this.bullets.children.each((b) => {
                const bullet = b as Phaser.Physics.Arcade.Image;
                bullet.destroy();
                return null;
            });
            this.scene.scene.start("GameOver", {
                score: (this.scene as any).ui.score,
            });
        }
    }

    update() {
        if (!this.sprite) return;
        this.bullets.children.each((b) => {
            const bullet = b as Phaser.Physics.Arcade.Image;
            if (bullet.y < -20) {
                bullet.destroy();
            }

            return null;
        });

        if (this.scene.input.activePointer.isDown) {
            this.sprite.x = this.scene.input.x;
            this.sprite.y = this.scene.input.y;
        }
    }
}
