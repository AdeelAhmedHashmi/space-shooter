import Phaser from "phaser";
import Meteor from "../objects/metior";

export default class StartScene extends Phaser.Scene {
    constructor() {
        super({ key: "StartScene" });
    }

    preload() {
        // Load any custom fonts or assets here if needed
        // Example: this.load.image("bg", "assets/bg.jpg");
    }

    create() {
        const w = this.scale.width;
        const h = this.scale.height;

        // Background color (optional)
        this.cameras.main.setBackgroundColor("#0a0a0a");

        // Heading
        this.add
            .text(w / 2, h / 3, "Space Shooter", {
                fontFamily: "heading",
                fontSize: "36px",
                color: "#e60000ff",
                fontStyle: "bold",
            })
            .setOrigin(0.5);

        // Paragraph
        this.add
            .text(w / 2, h / 2.2, "An interactive game for entertainment", {
                fontFamily: "normal",
                fontSize: "20px",
                color: "#00fa04ff",
                align: "center",
                wordWrap: { width: w - 100 },
            })
            .setOrigin(0.5);

        // Play Button
        const playButton = this.add
            .text(w / 2, h / 2 + 200, "PLAY", {
                fontFamily: "normal",
                fontSize: "32px",
                color: "#000",
                backgroundColor: "#ffffff",
                padding: { x: 20, y: 10 },
            })
            .setOrigin(0.5)
            .setInteractive({ useHandCursor: true });

        playButton.on("pointerover", () =>
            playButton.setStyle({ backgroundColor: "#ff0" })
        );
        playButton.on("pointerout", () =>
            playButton.setStyle({ backgroundColor: "#fff" })
        );
        playButton.on("pointerdown", () => this.scene.start("GameScene"));

        this.add
            .text(w / 2, h - 30, "@adeelahmed", {
                fontFamily: "Arial",
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
    }
}
