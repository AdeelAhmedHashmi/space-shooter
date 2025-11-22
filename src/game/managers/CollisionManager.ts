import Phaser from "phaser";
import Player from "../objects/player";
import Health from "../objects/bouns/health";
import Enemy from "../objects/enemy";
import Shield from "../objects/bouns/shield";
import UiManager from "./uiManager";
import SETTIGNS from "../settings";

export default class CollisionManager {
    constructor(
        private scene: Phaser.Scene,
        private player: Player,
        private healths: Phaser.Physics.Arcade.Group,
        private shields: Phaser.Physics.Arcade.Group,
        private boosters: Phaser.Physics.Arcade.Group,
        private enemyBullets: Phaser.Physics.Arcade.Group,
        private enemies: Phaser.Physics.Arcade.Group,
        private ui: UiManager
    ) {
        this.configureCollisions();
    }

    configureCollisions() {
        // Enemy & Bullets
        this.scene.physics.add.overlap(
            this.player.bullets,
            this.enemies,
            (bullet, enemy) => {
                const b = bullet as Phaser.Physics.Arcade.Image;
                const e = enemy as Phaser.Physics.Arcade.Sprite;
                b.destroy();
                const enemyObj = e.getData("ref") as Enemy;
                enemyObj.hit(1); // 1 damage per bullet
                if (enemyObj.health < 1) {
                    this.explosion(e.x, e.y);
                }
                this.ui.addScore(1);
            }
        );

        // Player & Bonus Health
        this.scene.physics.add.overlap(
            this.player.sprite,
            this.healths,
            (_, health) => {
                const h = health as Phaser.Physics.Arcade.Sprite;

                const healthObj = h.getData("ref") as Health;
                this.player.increaseHealth(1);
                this.ui.updateHealth(this.player.health);

                healthObj.destroy();
            }
        );

        // Player & Bonus Shield
        this.scene.physics.add.overlap(
            this.player.sprite,
            this.shields,
            (_, shield) => {
                const h = shield as Phaser.Physics.Arcade.Sprite;

                const shieldObj = h.getData("ref") as Shield;
                this.player.makeShield();

                shieldObj.destroy();
            }
        );

        // Player & Bonus Booster
        this.scene.physics.add.overlap(
            this.player.sprite,
            this.boosters,
            (_, booster) => {
                const h = booster as Phaser.Physics.Arcade.Sprite;

                const boosterObj = h.getData("ref") as Shield;
                this.player.upgradeShip();

                boosterObj.destroy();
            }
        );

        // Bullets & Bullets
        this.scene.physics.add.overlap(
            this.player.bullets,
            this.enemyBullets,
            (bullet, enemyBullets) => {
                const b = bullet as Phaser.Physics.Arcade.Image;
                b.destroy();
                enemyBullets.destroy();
            }
        );

        // Player & Enemy Bullets
        this.scene.physics.add.overlap(
            this.player.sprite,
            this.enemyBullets,
            (_, bullet) => {
                bullet.destroy();
                this.player.takeHit(1);
                if (this.player.health < 1) {
                    this.explosion(this.player.sprite.x, this.player.sprite.y);
                }
                this.ui.updateHealth(this.player.health);
                console.log("Player hit by enemy bullet!");
            }
        );

        // Player & Enemy
        this.scene.physics.add.collider(
            this.player.sprite,
            this.enemies,
            (_, enemySprite) => {
                const enemy = enemySprite as Phaser.Physics.Arcade.Sprite;
                const enemyObj = enemy.getData("ref") as Enemy;

                if (enemyObj) enemyObj.destroy();
                this.explosion(enemy.x, enemy.y);

                this.player.takeHit(1);
                this.ui.updateHealth(this.player.health);
                console.log("Player hit!");
            }
        );
    }

    explosion(x: number, y: number) {
        const explo = this.scene.physics.add.sprite(x, y, "explosion");
        explo.setScale(0.5);
        explo.play("explosion");

        const updateExplosion = () => {
            if (!explo.active) return;
            explo?.setVelocityY(SETTIGNS.ENEMY_FALLING_SPEED);
        };

        this.scene.events.on("update", updateExplosion);

        explo.once("animationcomplete", () => {
            this.scene.events.off("update", updateExplosion);
            explo.destroy();
        });
    }
}
