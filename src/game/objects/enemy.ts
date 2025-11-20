import Phaser from "phaser";

export default class Enemy {
    scene: Phaser.Scene;
    sprite: Phaser.Physics.Arcade.Sprite;
    bullets: Phaser.Physics.Arcade.Group;
    speed: number;
    health: number;

    constructor(
        scene: Phaser.Scene,
        bulitsGroup: Phaser.Physics.Arcade.Group,
        x: number,
        y: number,
        health = 3
    ) {
        this.scene = scene;
        this.health = health;

        const varients = ["Red", "Green", "Blue", "Black"];
        this.sprite = scene.physics.add.sprite(
            x,
            y,
            "sheet",
            `enemy${
                varients[Phaser.Math.Between(0, varients.length - 1)]
            }${Phaser.Math.Between(1, 5)}.png`
        );
        this.sprite.setScale(0.5);
        this.sprite.setDepth(5);

        // link the class instance to the sprite
        this.sprite.setData("ref", this);

        this.bullets = bulitsGroup;

        scene.time.addEvent({
            delay: 1000,
            loop: true,
            callback: () => this.fire(),
        });

        this.speed = Phaser.Math.Between(100, 200);
    }

    fire() {
        if (!this.sprite.active) return;
        const bullet = this.bullets.get(
            this.sprite.x,
            this.sprite.y + 30,
            "sheet",
            "laserRed04.png"
        ) as Phaser.Physics.Arcade.Image;

        if (!bullet) return;

        bullet.setActive(true);
        bullet.setVisible(true);
        bullet.setScale(0.3);

        const bulletSpeed = Phaser.Math.Between(150, 400);

        bullet.setVelocityY(bulletSpeed);

        // (this.scene as any).enemyBullets.add(bullet);
    }

    hit(damage = 1) {
        this.health -= damage;
        if (this.health <= 0) {
            this.sprite.destroy();
        }
    }

    destroy() {
        this.sprite.destroy();
    }

    update() {
        if (this.sprite.y > this.scene.scale.height + 50) {
            this.sprite.destroy();
        }

        this.bullets.children.each((b) => {
            const bullet = b as Phaser.Physics.Arcade.Image;

            if (bullet.y > this.scene.scale.height + 20) {
                bullet.destroy();
            }

            return null;
        });
    }
}
