import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import './i18n';
import App from './App.tsx'
import { DarkroomProvider } from './context/DarkroomContext';
import { HelmetProvider } from 'react-helmet-async';

if (import.meta.env.PROD) {
  console.log(
    "%c Born Too Late %c v1.0.0 ",
    "background: #0a0a0a; color: #f0f0f0; padding: 4px; border-radius: 4px 0 0 4px;",
    "background: #B91C1C; color: #f0f0f0; padding: 4px; border-radius: 0 4px 4px 0;"
  );
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <HelmetProvider>
      <DarkroomProvider>
        <App />
      </DarkroomProvider>
    </HelmetProvider>
  </StrictMode>,
)
