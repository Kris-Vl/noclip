import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App.js';

const rootElement = document.getElementById('root');
const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
