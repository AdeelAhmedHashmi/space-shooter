import type { CapacitorConfig } from "@capacitor/cli";

const config: CapacitorConfig = {
    appId: "com.spaceshooter",
    appName: "SpaceShooter",
    webDir: "dist",
    server: {
        androidScheme: "https",
    },
};

export default config;

