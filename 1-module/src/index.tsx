import { createRoot } from 'react-dom/client';
import App from './App';
import React from 'react';
import './styles/base/_reset.scss'
import './styles/base/_global.scss'
import './styles/components/_app-container.scss'

const container = document.getElementById('root');

const root = createRoot(container);
root.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);