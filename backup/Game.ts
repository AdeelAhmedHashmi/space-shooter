import { Scene } from "phaser";
import { EventBus } from "../EventBus";

export class Game extends Scene {
    private hero!: Phaser.Physics.Arcade.Sprite;
    private ground!: Phaser.Physics.Arcade.Sprite;
    private cursors!: Phaser.Types.Input.Keyboard.CursorKeys;
    private keys:
        | {
              j: Phaser.Input.Keyboard.Key;
              k: Phaser.Input.Keyboard.Key;
              l: Phaser.Input.Keyboard.Key;
          }
        | undefined
        | object;

    constructor() {
        super({ key: "Game" });
        this.hero;
    }

    preload() {
        this.load.setPath("assets");

        this.load.image("star", "star.png");
        this.load.image("background", "bg.png");
        this.load.spritesheet("ground", "grounds.png", {
            frameWidth: 458,
            frameHeight: 545 / 6,
        });

        this.load.spritesheet("hero_idle", "hero/idle.png", {
            frameWidth: 384 / 6,
            frameHeight: 64,
        });

        this.load.spritesheet("hero_run", "hero/run.png", {
            frameWidth: 384 / 6,
            frameHeight: 64,
        });

        this.load.spritesheet("hero_hit", "hero/hit.png", {
            frameWidth: 384 / 6,
            frameHeight: 64,
        });

        this.load.spritesheet("hero_throw", "hero/throw.png", {
            frameWidth: 256 / 4,
            frameHeight: 64,
        });

        this.load.spritesheet("hero_fight", "hero/fight.png", {
            frameWidth: 552 / 8,
            frameHeight: 64,
        });
    }

    create() {
        const gameX = this.scale.width;
        const gameY = this.scale.height;

        const bg = this.add.image(0, 0, "background");
        bg.setPosition(gameX / 2, gameY / 2);

        this.anims.create({
            key: "idle",
            frames: this.anims.generateFrameNumbers("hero_idle", {
                start: 0,
                end: 5,
            }),
            frameRate: 12,
            repeat: -1,
        });

        this.anims.create({
            key: "run",
            frames: this.anims.generateFrameNumbers("hero_run", {
                start: 0,
                end: 5,
            }),
            frameRate: 12,
            repeat: -1,
        });

        this.anims.create({
            key: "hit",
            frames: this.anims.generateFrameNumbers("hero_hit", {
                start: 0,
                end: 5,
            }),
            frameRate: 12,
            repeat: 0,
        });

        this.anims.create({
            key: "throw",
            frames: this.anims.generateFrameNumbers("hero_throw", {
                start: 0,
                end: 3,
            }),
            frameRate: 12,
            repeat: -1,
        });

        this.anims.create({
            key: "fight",
            frames: this.anims.generateFrameNumbers("hero_fight", {
                start: 0,
                end: 3,
            }),
            frameRate: 10,
            repeat: 0,
        });

        this.hero = this.physics.add.sprite(200, 200, "hero_idle");
        this.hero.setBounce(1);
        this.hero.setCollideWorldBounds(true);
        this.hero.setScale(3);
        this.hero.setSize(20, 30);
        this.hero.setDepth(2);

        const plateformer = this.physics.add.staticGroup();
        this.ground = plateformer
            .create(
                this.scale.width / 2,
                this.scale.height - 60 / 2,
                "ground",
                2
            )
            .refreshBody();

        this.ground.setSize(this.scale.width, 80);
        this.ground.setScale(1.35);
        this.physics.add.collider(this.hero, plateformer);

        this.cursors = this.input.keyboard?.createCursorKeys()!;
        this.keys = this.input?.keyboard?.addKeys({
            j: Phaser.Input.Keyboard.KeyCodes.J,
            k: Phaser.Input.Keyboard.KeyCodes.K,
            l: Phaser.Input.Keyboard.KeyCodes.L,
        });

        EventBus.emit("current-scene-ready", this);
    }

    update() {
        this.hero.setVelocity(0);

        if (this.cursors.left?.isDown) {
            this.hero.setVelocityX(-300);
            this.hero.play("run", true);
            this.hero.setFlipX(true);
            return;
        } else if (this.cursors.right?.isDown) {
            this.hero.setVelocityX(300);
            this.hero.play("run", true);
            this.hero.setFlipX(false);
            return;
        } else if (this.cursors.up?.isDown) {
            this.hero.setGravityY(500);
            this.hero.setVelocityY(-1005);
            this.hero.play("run");
            return;
        } else if (this.cursors.space?.isDown) {
            this.hero.play("hit");
            return;
        } else {
            if (
                this.hero.anims.currentAnim?.key !== "idle" &&
                this.hero.anims.currentAnim?.key !== "hit"
            ) {
                this.hero.play("idle", true);
            }
        }
    }
}

