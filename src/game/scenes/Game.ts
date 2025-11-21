import Phaser from "phaser";
import { EventBus } from "../EventBus";
import Player from "../objects/player";
import Enemy from "../objects/enemy";
import UiManager from "../objects/uiManager";
import Meteor from "../objects/metior";

export class GameScene extends Phaser.Scene {
    ui: UiManager;
    player: Player;
    enemies: Phaser.Physics.Arcade.Group;
    enemyBullets: Phaser.Physics.Arcade.Group;

    constructor() {
        super({ key: "Game" });
    }

    preload() {
        this.load.setPath("assets");
        this.load.atlasXML(
            "sheet",
            "space-shooter/sheet.png",
            "space-shooter/sheet.xml"
        );
        this.load.image("bg", "space-shooter/background/black.png");
    }

    create() {
        const w = this.scale.width; // game width
        const h = this.scale.height; // game height

        const bg = this.add.image(0, 0, "bg").setOrigin(0);
        this.ui = new UiManager(this);
        bg.setDisplaySize(
            this.game.config.width as number,
            this.game.config.height as number
        );

        this.player = new Player(this, w / 2, h - 20);

        this.enemies = this.physics.add.group();
        this.enemyBullets = this.physics.add.group({
            classType: Phaser.Physics.Arcade.Image,
            runChildUpdate: true,
        });

        this.time.addEvent({
            delay: 1000,
            loop: true,
            callback: () => this.spawnEnemy(),
        });
        this.time.addEvent({
            delay: 300,
            loop: true,
            callback: () => {
                new Meteor(this, Phaser.Math.Between(0, this.scale.width), -50);
            },
        });

        // destroy enemy wit bulits
        this.physics.add.overlap(
            this.player.bullets,
            this.enemies,
            (bullet, enemy) => {
                const b = bullet as Phaser.Physics.Arcade.Image;
                const e = enemy as Phaser.Physics.Arcade.Sprite;
                b.destroy();
                const enemyObj = e.getData("ref") as Enemy;
                enemyObj.hit(1); // 1 damage per bullet
                this.ui.addScore(1);
            }
        );

        this.physics.add.overlap(
            this.player.bullets,
            this.enemyBullets,
            (bullet, enemyBullets) => {
                const b = bullet as Phaser.Physics.Arcade.Image;
                b.destroy();
                enemyBullets.destroy();
            }
        );

        // colllision of player with enemy bullets
        this.physics.add.overlap(
            this.player.sprite,
            this.enemyBullets,
            (_, bullet) => {
                bullet.destroy();
                this.player.takeHit(1);
                this.ui.updateHealth(this.player.health);
                console.log("Player hit by enemy bullet!");
            }
        );

        // cllision of player wiht enemy
        this.physics.add.collider(
            this.player.sprite,
            this.enemies,
            (_, enemySprite) => {
                const enemy = enemySprite as Phaser.Physics.Arcade.Sprite;
                const enemyObj = enemy.getData("ref") as Enemy;

                if (enemyObj) enemyObj.destroy();
                this.player.takeHit(1);
                this.ui.updateHealth(this.player.health);
                console.log("Player hit!");
            }
        );

        EventBus.emit("current-scene-ready", this);
    }

    spawnEnemy() {
        const x = Phaser.Math.Between(50, this.scale.width - 50);
        const y = -50; // spawn above screen
        const enemy = new Enemy(
            this,
            this.enemyBullets,
            x,
            y,
            Phaser.Math.Between(3, 8)
        );
        enemy.sprite.setData("ref", enemy);
        this.enemies.add(enemy.sprite);
    }

    update(): void {
        this.player.update();

        this.enemies.children.each((e) => {
            const enemySprite = e as Phaser.Physics.Arcade.Sprite;
            enemySprite.y += 1.5;
            if (enemySprite.y > this.scale.height + 50) enemySprite.destroy();
            return null;
        });
    }
}

