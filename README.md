# **Space Shooter – A Modern Browser Arcade Game**

A high-performance, fast-paced space combat game built using **React**, **TypeScript**, **Phaser 3**, and **Vite**.
The project demonstrates advanced game-state management, dynamic rendering and mobile-first optimization inside a modern web framework.

---

## **Features**

-   Smooth 60 FPS gameplay powered by Phaser 3.
-   Player movement with keyboard or touch controls.
-   Dynamic enemy spawning with progressive difficulty scaling.
-   Power-up system including shields, health booster, and weapon boosts.
-   Collision detection, physics simulation, and hit feedback.
-   Modular scene architecture for maintainability.
-   Optimized asset loading pipeline for instant startup.
-   Responsive canvas scaling for all screen sizes.
-   Clean TypeScript architecture for predictable debugging and scalability.

---

## **Tech Stack**

-   **Phaser 3** – Core game engine.
-   **React + TypeScript** – UI wrapper and state exposure layer.
-   **Vite** – Dev server and build tool for high-speed bundling.
-   **ESBuild + Rollup** – Asset and module bundling.

---

## **Live Demo**

```
https://shipshooter.netlify.app
```

---

## **Installation**

Clone the repository:

```bash
git clone https://github.com/AdeelAhmedHashmi/space-shooter.git
cd space-shooter
```

Install dependencies:

```bash
npm install
or yarn
```

Start development server:

```bash
npm run dev
or yarn dev
```

Build for production:

```bash
npm run build
```

---

## **Gameplay Overview**

### Player

The player controls a starfighter capable of firing projectiles and collecting power-ups.
Movement is smooth and responsive, optimized for both Mouse (desktop) and touch (mobile).

### Enemies

Enemies spawn procedurally and scale based on score and elapsed time.
Different types include slow drones, fast scouts, and armored units.

### Power-Ups

-   Shield: temporary protection against damage
-   Health Booster: increases player health
-   Rapid Fire: increases firing rate

### Game Loop

The game uses Phaser’s main loop combined with event-driven logic for enemies, collision handling, and difficulty scaling.

---

## **Controls**

### Desktop

-   Mouse Draging | Movements

### Mobile

-   touch drag
-   auto fire

---

## **Performance Optimizations**

-   Spritesheets with texture atlas to reduce draw calls.
-   WebGL pipeline with batching and culling.
-   Dedicated object pooling for bullets and explosions.
-   Efficient delta-time based animations and movements.

---

```bash
npm run build
```

---

## **Font Preloading**

Custom fonts load before the game initializes using `document.fonts.ready` to prevent layout flickering and ensure UI consistency.

---

## **Development Notes**

-   Fully typed with TypeScript.
-   Hot module replacement enabled via Vite.
-   Clean separation between React UI and Phaser game logic.
-   Scenes are self-contained and reusable.
-   Ideal boilerplate for future Phaser + React projects.

---

## **Future Enhancements**

-   Boss battles
-   Additional weapons
-   Online leaderboard
-   Achievement system
-   Cloud saves
-   Story mode

---

## **License**

```
MIT License
© 2025 AdeelAhmed
```

---

## **Author**

```
Created by Adeel Ahmed
A Full stack Web Developer
```
