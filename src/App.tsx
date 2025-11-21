import { useEffect, useRef, useState } from "react";
import { IRefPhaserGame, PhaserGame } from "./PhaserGame";

function App() {
    //  References to the PhaserGame component (game and scene are exposed)
    const phaserRef = useRef<IRefPhaserGame | null>(null);

    const [fontsLoaded, setFontsLoaded] = useState(false);

    useEffect(() => {
        async function loadFonts() {
            console.log("⏳ Waiting for fonts...");
            await document.fonts.ready;
            console.log("✅ Fonts loaded");

            setFontsLoaded(true);
        }

        loadFonts();
    }, []);

    return (
        <div id="app" style={{ display: "flex", flexDirection: "column" }}>
            {!fontsLoaded ? (
                <p style={{ color: "white" }}>Loading...</p>
            ) : (
                <PhaserGame ref={phaserRef} />
            )}
        </div>
    );
}

export default App;

