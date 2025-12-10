import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { DarkroomProvider } from './context/DarkroomContext';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <DarkroomProvider>
      <App />
    </DarkroomProvider>
  </StrictMode>,
)
