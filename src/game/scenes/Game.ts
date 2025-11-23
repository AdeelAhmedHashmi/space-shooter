import Phaser from "phaser";
import { EventBus } from "../EventBus";
import Player from "../objects/player";
import Enemy from "../objects/enemy";
import UiManager from "../managers/uiManager";
import EventManager from "../managers/Eventmanager";
import SETTINGS from "../settings";
import CollisionManager from "../managers/CollisionManager";

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
        this.load.image("megaenemy", "space-shooter/megaenemy.png");
        this.load.spritesheet(
            "explosion",
            "space-shooter/effects/explosion.png",
            {
                frameWidth: 601 / 6,
                frameHeight: 576 / 6,
            }
        );
    }

    create() {
        const w = this.scale.width; // game width
        const h = this.scale.height; // game height

        // this.add.image(200, 200, "megaenemy").setDepth(6).setScale(0.5);

        this.anims.create({
            key: "explosion",
            frames: this.anims.generateFrameNumbers("explosion", {
                start: 0,
                end: 33,
            }),
            frameRate: 16,
            repeat: 0,
        });

        const bg = this.add.image(0, 0, "bg").setOrigin(0);
        this.ui = new UiManager(this);
        bg.setDisplaySize(this.scale.width, this.scale.height);

        this.player = new Player(this, w / 2, h - 20);

        this.enemies = this.physics.add.group();
        this.enemyBullets = this.physics.add.group({
            classType: Phaser.Physics.Arcade.Image,
            runChildUpdate: true,
        });
        this.healths = this.physics.add.group();
        this.shields = this.physics.add.group();
        this.boosters = this.physics.add.group();

        new EventManager(
            this,
            this.player,
            this.healths,
            this.shields,
            this.boosters,
            this.enemyBullets,
            this.enemies
        );

        new CollisionManager(
            this,
            this.player,
            this.healths,
            this.shields,
            this.boosters,
            this.enemyBullets,
            this.enemies,
            this.ui
        );

        // Events Depends on main Game class
        this.time.addEvent({
            delay: 1000,
            loop: true,
            callback: () => this.spawnEnemy(),
        });

        this.scale.on("resize", () => {
            bg.setDisplaySize(this.scale.width, this.scale.height);
        });
        EventBus.emit("current-scene-ready", this);
    }

    spawnEnemy() {
        const x = Phaser.Math.Between(50, this.scale.width - 50);
        const y = -50;
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
            enemySprite.y += SETTINGS.ENEMY_FALLING_SPEED;
            if (enemySprite.y > this.scale.height + 50) enemySprite.destroy();
            return null;
        });

        SETTINGS.ENEMY_FALLING_SPEED += 0.0001;
    }
}

