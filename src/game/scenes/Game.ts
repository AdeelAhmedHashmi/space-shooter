import Phaser from "phaser";
import { EventBus } from "../EventBus";
import Player from "../objects/player";
import Enemy from "../objects/enemy";
import UiManager from "../managers/uiManager";
import Meteor from "../objects/metior";
import Health from "../objects/bouns/health";
import Shield from "../objects/bouns/shield";
import Booster from "../objects/bouns/booster";

export class GameScene extends Phaser.Scene {
    ui: UiManager;
    player: Player;
    enemies: Phaser.Physics.Arcade.Group;
    enemyBullets: Phaser.Physics.Arcade.Group;
    healths: Phaser.Physics.Arcade.Group;
    shields: Phaser.Physics.Arcade.Group;
    boosters: Phaser.Physics.Arcade.Group;

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
        this.healths = this.physics.add.group();
        this.shields = this.physics.add.group();
        this.boosters = this.physics.add.group();

        this.time.addEvent({
            delay: 20000,
            loop: true,
            callback: () => {
                new Health(
                    this,
                    this.healths,
                    Phaser.Math.Between(0, this.scale.width),
                    -50
                );
            },
        });

        this.time.addEvent({
            delay: 10000,
            loop: true,
            callback: () => {
                new Booster(
                    this,
                    this.boosters,
                    Phaser.Math.Between(0, this.scale.width),
                    -50
                );
            },
        });

        this.time.addEvent({
            delay: 40000,
            loop: true,
            callback: () => {
                new Shield(
                    this,
                    this.shields,
                    Phaser.Math.Between(0, this.scale.width),
                    -50
                );
            },
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

        this.physics.add.overlap(
            this.player.sprite,
            this.shields,
            (_, shield) => {
                const h = shield as Phaser.Physics.Arcade.Sprite;

                const shieldObj = h.getData("ref") as Shield;
                this.player.makeShield();

                shieldObj.destroy();
            }
        );

        this.physics.add.overlap(
            this.player.sprite,
            this.boosters,
            (_, booster) => {
                const h = booster as Phaser.Physics.Arcade.Sprite;

                const boosterObj = h.getData("ref") as Shield;
                this.player.upgradeShip();

                boosterObj.destroy();
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

