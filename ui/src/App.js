import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
    const [noclip, setNoclip] = useState(false);
    const [speed, setSpeed] = useState(0.0);

    useEffect(() => {
        const handleMessage = (event) => {
            if (event.data.type === 'toggleNoclip') {
                setNoclip(event.data.status);
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
                    <p>Speed: {speed.toFixed(2)}</p>
                    <p>Noclip Controls:</p>
                    <ul>
                        <li>W - Move Forward</li>
                        <li>S - Move Backward</li>
                        <li>A - Move Left</li>
                        <li>D - Move Right</li>
                        <li>Q - Move Up</li>
                        <li>E - Move Down</li>
                        <li>Shift - Increase Speed</li>
                    </ul>
                </div>
            )}
        </div>
    );
}

export default App;
