import { StrictMode } from 'react';import { createRoot } from 'react-dom/client';import App from './app/App';import './styles/global.css';import './styles/dashboard.css';import './styles/emotion.css';import './styles/controls.css';
createRoot(document.getElementById('root')!).render(<StrictMode><App/></StrictMode>);
