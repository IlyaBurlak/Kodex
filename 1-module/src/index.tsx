import { createRoot } from 'react-dom/client';
import App from './App';
import './styles/base/_reset.scss'
import './styles/base/_global.scss'
import './styles/components/_app-container.scss'
import { StrictMode } from "react";

const container = document.getElementById('root');

if (!container) {
  throw new Error('Root element not found');
}

const root = createRoot(container);
root.render(
  <StrictMode>
    <App />
  </StrictMode>
);