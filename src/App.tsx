import { useRef } from "react";
import { IRefPhaserGame, PhaserGame } from "./PhaserGame";

function App() {
    //  References to the PhaserGame component (game and scene are exposed)
    const phaserRef = useRef<IRefPhaserGame | null>(null);

    return (
        <div id="app" style={{ display: "flex", flexDirection: "column" }}>
            <PhaserGame ref={phaserRef} />
        </div>
    );
}

export default App;

