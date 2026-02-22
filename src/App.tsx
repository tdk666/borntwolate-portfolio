import { useEffect, Suspense, lazy } from 'react';
import { Toaster, toast } from 'react-hot-toast';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Portfolio from './pages/Portfolio';
import Series from './pages/Series';
import SeriesDetail from './pages/SeriesDetail';
import About from './pages/About';
import Contact from './pages/Contact';
import { useDarkroom } from './context/DarkroomContext';
import Prints from './pages/Prints';
import CertificateGenerator from './pages/admin/CertificateGenerator';
import { ErrorBoundary } from './components/ErrorBoundary';

import Footer from './components/Footer';
import NotFound from './pages/NotFound';
import Legals from './pages/Legals';
import ScrollToTop from './components/ScrollToTop';
import { GoogleAnalytics } from './components/GoogleAnalytics';

// LAZY LOAD CHATBOT
const Chatbot = lazy(() => import('./components/chatbot/Chatbot').then(module => ({ default: module.Chatbot })));
const PhotographeArgentique = lazy(() => import('./pages/PhotographeArgentique'));
import { CookieConsent } from './components/CookieConsent';
import Success from './pages/Success';
import { PageLoader } from './components/PageLoader';
import Legacy from './pages/Legacy'; // Import once


function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Home />} />
        <Route path="/portfolio" element={<Portfolio />} />
        <Route path="/series" element={<Series />} />
        <Route path="/series/:id" element={<SeriesDetail />} />
        <Route path="/series/:id/:photoId" element={<SeriesDetail />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/prints" element={<Prints />} />
        <Route path="/photographe-argentique" element={<PhotographeArgentique />} />
        <Route path="/admin/certificate" element={<CertificateGenerator />} />
        <Route path="/legals" element={<Legals />} />
        <Route path="/success" element={<Success />} />
        <Route path="/legacy" element={<Legacy />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </AnimatePresence>
  );
}


function App() {
  const { isDarkroom } = useDarkroom();

  // PREVENT RIGHT CLICK
  useEffect(() => {
    const handleContextMenu = (e: MouseEvent) => {
      e.preventDefault();
    };
    document.addEventListener('contextmenu', handleContextMenu);
    return () => document.removeEventListener('contextmenu', handleContextMenu);
  }, []);

  // EASTER EGG: MOLTBOOK
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const source = params.get('utm_source');

    if (source === 'moltbook') {
      setTimeout(() => {
        toast("👋 Bienvenue, visiteur du futur.", {
          icon: '🤖',
          style: {
            background: '#1a1a1a',
            color: '#fff',
            border: '1px solid rgba(255,255,255,0.2)',
            fontFamily: 'serif',
            zIndex: 99999, // Keeping z-index to ensure visibility
          },
          duration: 5000,
        });
      }, 1500);
    }
  }, []);

  return (
    <Router>
      <LayoutContent isDarkroom={isDarkroom} />
    </Router>
  );
}

// Sub-component to use useLocation() inside Router context
function LayoutContent({ isDarkroom }: { isDarkroom: boolean }) {
  const location = useLocation();
  const isLegacyPage = location.pathname === '/legacy';

  return (
    <>
      <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 z-[99999] bg-darkroom-red text-white px-4 py-2 font-mono uppercase text-xs">
        Skip to content
      </a>
      <Toaster
        position="bottom-right"
        containerStyle={{
          zIndex: 99999, // Force on top of everything
        }}
        toastOptions={{
          style: {
            background: '#111',
            color: '#fff',
            border: '1px solid #333'
          }
        }}
      />
      <div
        className={`min-h-screen transition-colors duration-700 font-sans selection:bg-darkroom-red selection:text-off-white ${isDarkroom ? 'darkroom-mode' : ''} flex flex-col`}
      >
        <div className="film-grain" style={{ backgroundImage: 'url("/assets/noise.svg")' }}></div>
        <GoogleAnalytics />
        
        {!isLegacyPage && <ScrollToTop />}
        {!isLegacyPage && <Navbar />}
        
        <main id="main-content" className="flex-grow">
          <Suspense fallback={<PageLoader />}>
            <AnimatedRoutes />
          </Suspense>
        </main>
        
        {!isLegacyPage && <Footer />}
        
        <ErrorBoundary fallback={null}>
          <Suspense fallback={null}>
            <Chatbot />
          </Suspense>
        </ErrorBoundary>
      </div>
      {!isLegacyPage && <CookieConsent />}
    </>
  );
}

export default App;
