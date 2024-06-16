import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
    const [noclip, setNoclip] = useState(false);
    const [speed, setSpeed] = useState(1.0);

    useEffect(() => {
        window.addEventListener('message', (event) => {
            if (event.data.type === 'toggleNoclip') {
                setNoclip(event.data.status);
                setSpeed(event.data.speed);
            }
        });
    }, []);

    return (
        <div className="App">
            {noclip && (
                <div className="noclip-ui">
                    <h1>Noclip Enabled</h1>
                    <p>Speed: {speed}</p>
                </div>
            )}
        </div>
    );
}

export default App;
