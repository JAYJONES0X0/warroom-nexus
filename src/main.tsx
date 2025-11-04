import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

// Remove loading screen
const loading = document.getElementById('loading');
if (loading) {
  setTimeout(() => {
    loading.style.opacity = '0';
    setTimeout(() => loading.remove(), 300);
  }, 1000);
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);