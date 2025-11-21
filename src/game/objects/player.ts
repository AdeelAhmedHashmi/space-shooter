import Phaser from "phaser";
export default class Player {
    scene: Phaser.Scene;
    sprite: Phaser.Physics.Arcade.Sprite;
    bullets: Phaser.Physics.Arcade.Group;
    fireTimer: Phaser.Time.TimerEvent | null = null;
    health: number = 4;
    isMega: boolean = true;
    bulletsBreak: boolean = false;
    isProtected: boolean = false;
    shield: Phaser.Physics.Arcade.Sprite | null;

    constructor(scene: Phaser.Scene, x: number, y: number) {
        this.scene = scene;
        this.sprite = scene.physics.add.sprite(
            x,
            y,
            "sheet",
            "playerShip1_green.png"
        );
        this.sprite.setScale(0.5);
        this.sprite.setInteractive();

        this.bullets = scene.physics.add.group({
            classType: Phaser.Physics.Arcade.Image,
            runChildUpdate: true,
        });

        this.fireTimer = scene.time.addEvent({
            delay: 200,
            loop: true,
            callback: () => this.fire(),
        });

        scene.time.addEvent({
            delay: 10000,
            loop: true,
            callback: () => this.emptyBullet(),
        });
        this.makeShield();
    }

    emptyBullet() {
        this.bulletsBreak = true;
        this.scene.time.delayedCall(3000, () => {
            this.bulletsBreak = false;
        });
    }

    fire() {
        if (!this.sprite.active) return;
        if (this.bulletsBreak) return;

        if (this.isMega) {
            const bullet1 = this.bullets.get(
                this.sprite.x - 23,
                this.sprite.y,
                "sheet",
                "laserGreen02.png"
            ) as Phaser.Physics.Arcade.Image;

            const bullet2 = this.bullets.get(
                this.sprite.x + 23,
                this.sprite.y,
                "sheet",
                "laserGreen02.png"
            ) as Phaser.Physics.Arcade.Image;

            if (!bullet1 || !bullet2) return;

            bullet2.setActive(true);
            bullet2.setVisible(true);
            bullet2.setVelocityY(-400);
            bullet2.setScale(0.3);

            bullet1.setActive(true);
            bullet1.setVisible(true);
            bullet1.setVelocityY(-400);
            bullet1.setScale(0.3);
        } else {
            const bullet2 = this.bullets.get(
                this.sprite.x,
                this.sprite.y - 30,
                "sheet",
                "laserGreen02.png"
            ) as Phaser.Physics.Arcade.Image;

            if (!bullet2) return;

            bullet2.setActive(true);
            bullet2.setVisible(true);
            bullet2.setVelocityY(-400);
            bullet2.setScale(0.3);
        }
    }

    makeShield() {
        if (this.isProtected) return;
        console.log("<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<");
        this.isProtected = true;

        this.shield = this.scene.physics.add.sprite(
            this.sprite.x,
            this.sprite.y,
            "sheet",
            "shield3.png"
        );

        this.shield.setScale(0.5);
        this.scene.events.on("update", this.updateShield, this);
        this.scene.time.delayedCall(3000, () => {
            this.destroyShield();
        });
    }

    updateShield() {
        if (!this.shield) return;
        this.shield.x = this.sprite.x;
        this.shield.y = this.sprite.y;
    }

    destroyShield() {
        console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>");
        this.isProtected = false;

        if (this.shield) {
            this.shield.destroy();
            this.shield = null;
        }

        this.scene.events.off("update", this.updateShield, this);
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
