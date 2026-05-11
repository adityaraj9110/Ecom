import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import '@styles/main.scss';
import { App } from './app/App';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/service-worker.js').catch(err => {
      console.log('ServiceWorker registration failed: ', err);
    });
  });
}

