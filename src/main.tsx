import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import CustomCursor from './components/CustomCursor';
import './global.css';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <CustomCursor />
    <App />
  </React.StrictMode>
);
