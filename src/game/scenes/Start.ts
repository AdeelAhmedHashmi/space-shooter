import Phaser from "phaser";
import Meteor from "../objects/metior";

export default class StartScene extends Phaser.Scene {
    constructor() {
        super({ key: "StartScene" });
    }

    preload() {
        this.load.setPath("assets");
        this.load.atlasXML(
            "sheet",
            "space-shooter/sheet.png",
            "space-shooter/sheet.xml"
        );
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
        const w = this.scale.width;
        const h = this.scale.height;

        // Background color (optional)
        this.cameras.main.setBackgroundColor("#0a0a0a");

        this.anims.create({
            key: "explosion",
            frames: this.anims.generateFrameNumbers("explosion", {
                start: 0,
                end: 33,
            }),
            frameRate: 16,
            repeat: 0,
        });

        // Heading
        this.add
            .text(w / 2, h / 2 - 60, "Space Shooter", {
                fontFamily: "heading",
                fontSize: "36px",
                color: "#e60000ff",
                fontStyle: "bold",
            })
            .setOrigin(0.5);

        // Play Button
        const playButton = this.add
            .text(w / 2, h / 2 + 30, "PLAY", {
                fontFamily: "heading",
                fontSize: "25px",
                color: "#000000ff",
                backgroundColor: "#25dc00ff",
                padding: { x: 10, y: 5 },
            })
            .setOrigin(0.5)
            .setInteractive({ useHandCursor: true });

        playButton.on("pointerover", () =>
            playButton.setStyle({ backgroundColor: "#ff0" })
        );
        playButton.on("pointerout", () =>
            playButton.setStyle({ backgroundColor: "#fff" })
        );
        playButton.on("pointerdown", () => this.scene.start("Game"));

        this.add
            .text(w / 2, h - 30, "@adeelahmed", {
                fontFamily: "heading",
                fontSize: "16px",
                color: "#888888",
            })
            .setOrigin(0.5);

        this.time.addEvent({
            delay: 300,
            loop: true,
            callback: () => {
                new Meteor(this, Phaser.Math.Between(0, this.scale.width), -50);
            },
        });

        this.time.addEvent({
            delay: 1000,
            loop: true,
            callback: () => {
                const explo = this.physics.add.sprite(
                    Phaser.Math.Between(0, this.scale.width),
                    Phaser.Math.Between(0, this.scale.height),
                    "explosion"
                );
                explo.setScale(0.5);
                explo.play("explosion");

                explo.once("animationcomplete", () => {
                    explo.destroy();
                });
            },
        });
    }
}
