import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
    const [noclip, setNoclip] = useState(false);
    const [speed, setSpeed] = useState(0.0);
    const [instructions, setInstructions] = useState("");

    useEffect(() => {
        const handleMessage = (event) => {
            if (event.data.type === 'toggleNoclip') {
                setNoclip(event.data.status);
                setInstructions(event.data.instructions);
                setSpeed(event.data.speed);
            } else if (event.data.type === 'updateSpeed') {
                setSpeed(event.data.speed);
            }
        };

        window.addEventListener('message', handleMessage);
    
        return () => {
            window.removeEventListener('message', handleMessage);
        };
    }, []);

    return (
        <div className="App">
            {noclip && (
                <div className="noclip-ui">
                    <h1>Noclip Enabled</h1>
                    <p>Speed: {speed}</p>
                    <p>{instructions}</p>
                </div>
            )}
        </div>
    );
}

export default App;
