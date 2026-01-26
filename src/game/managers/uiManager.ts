import Phaser from "phaser";

export default class UiManager {
    private score: number = 0;
    private health: number = 3;
    private scoreText: Phaser.GameObjects.Text;
    private healthText: Phaser.GameObjects.Text;

    constructor(private readonly scene: Phaser.Scene) {
        this.scoreText = this.scene.add
            .text(20, 20, `Score: ${this.score}`, {
                fontSize: "16px",
                color: "#fff",
                fontFamily: "normal",
            })
            .setDepth(999);

        this.healthText = this.scene.add
            .text(20, 55, `Health: ${this.health}`, {
                fontSize: "16px",
                color: "#ff6961",
                fontFamily: "normal",
            })
            .setDepth(999);
    }

    updateHealth(newHealth: number) {
        console.log(
            "this.health: " + this.health,
            "player.health: " + newHealth,
        );
        this.health = newHealth;
        this.healthText.setText("Health: " + this.health);
    }

    addScore(amount: number) {
        console.log("this.score" + this.score, "score: " + amount);
        this.score += Number(amount);
        this.scoreText.setText("Score: " + this.score);
    }
}
