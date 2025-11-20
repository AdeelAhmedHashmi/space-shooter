import Phaser from "phaser";

export default class GameOver extends Phaser.Scene {
    finalScore: number;

    constructor() {
        super({ key: "GameOver" });
    }

    init(data: { score: number }) {
        this.finalScore = data.score;
    }
    create() {
        const { width, height } = this.scale;
        this.add.rectangle(0, 0, width, height, 0x000000, 0.8).setOrigin(0);

        // Dark background
        this.add.rectangle(0, 0, width, height, 0x000000, 0.8).setOrigin(0);

        // Game Over text
        this.add
            .text(width / 2, height / 2 - 50, "GAME OVER", {
                fontSize: "48px",
                color: "#ff0000",
                fontStyle: "bold",
                fontFamily: "Heading",
            })
            .setOrigin(0.5);

        // Score text
        this.add
            .text(width / 2, height / 2 + 10, `Score: ${this.finalScore}`, {
                fontSize: "32px",
                color: "#ffffff",
                fontFamily: "normal",
            })
            .setOrigin(0.5);

        // Restart button
        const restart = this.add
            .text(width / 2, height / 2 + 80, "Restart", {
                fontSize: "20px",
                color: "#00ff00",
                backgroundColor: "#111",
                padding: { x: 20, y: 10 },
                fontFamily: "normal",
            })
            .setOrigin(0.5)
            .setInteractive({ useHandCursor: true });

        // restart the game
        restart.on("pointerdown", () => {
            this.scene.start("Game");
        });
    }
}
