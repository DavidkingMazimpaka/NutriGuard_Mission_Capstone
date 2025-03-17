
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';

// Redirect to welcome page if first visit and not already on welcome page
if (!localStorage.getItem('hasVisited') && !window.location.pathname.includes('/welcome')) {
  localStorage.setItem('hasVisited', 'true');
  window.location.href = '/welcome';
} 

createRoot(document.getElementById("root")!).render(<App />);
