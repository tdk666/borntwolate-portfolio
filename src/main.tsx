import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import './i18n';
import App from './App.tsx'
import { DarkroomProvider } from './context/DarkroomContext';
import { CurrencyProvider } from './context/CurrencyContext';
import { SearchProvider } from './context/SearchContext';
import { HelmetProvider } from 'react-helmet-async';

import { validatePricing } from './utils/validation';

if (import.meta.env.PROD || import.meta.env.DEV) {
  // STRICT DATA VALIDATION HOOK
  const validationErrors = validatePricing();

  if (validationErrors.length > 0) {
    console.error("🚨 CRITICAL DATA INTEGRITY ERROR 🚨");
    console.error(validationErrors.join("\n"));

    // In development, make it impossible to miss
    if (import.meta.env.DEV) {
      alert("CRITICAL DATA ERROR:\n" + validationErrors.join("\n"));
    }
  } else {
    console.log("✅ Data Integrity Check Passed");
  }

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
        <CurrencyProvider>
          <SearchProvider>
            <App />
          </SearchProvider>
        </CurrencyProvider>
      </DarkroomProvider>
    </HelmetProvider>
  </StrictMode>,
)
