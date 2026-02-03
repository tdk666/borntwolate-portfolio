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
// import { Chatbot } from './components/chatbot/Chatbot'; // REMOVE DIRECT IMPORT
import Prints from './pages/Prints';
import CertificateGenerator from './pages/admin/CertificateGenerator';

import Footer from './components/Footer';
import NotFound from './pages/NotFound';
import Legals from './pages/Legals';
import ScrollToTop from './components/ScrollToTop';

// LAZY LOAD CHATBOT
const Chatbot = lazy(() => import('./components/chatbot/Chatbot').then(module => ({ default: module.Chatbot })));
const PhotographeArgentique = lazy(() => import('./pages/PhotographeArgentique'));


function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Home />} />
        <Route path="/portfolio" element={<Portfolio />} />
        <Route path="/series" element={<Series />} />
        <Route path="/series/:id" element={<SeriesDetail />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/prints" element={<Prints />} />
        <Route path="/photographe-argentique" element={<PhotographeArgentique />} />
        <Route path="/admin/certificate" element={<CertificateGenerator />} />
        <Route path="/legals" element={<Legals />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </AnimatePresence>
  );
}

// ... (other imports remain, but remove direct toast usage imports if checking specific lines)

// ...

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
      <Toaster
        position="bottom-right"
        containerStyle={{
          zIndex: 99999, // Force on top of everything
        }}
      />
      <div
        className={`min-h-screen transition-colors duration-700 font-sans selection:bg-darkroom-red selection:text-off-white ${isDarkroom ? 'darkroom-mode' : ''} flex flex-col`}
      >
        <div className="film-grain" style={{ backgroundImage: 'url("/assets/noise.svg")' }}></div>
        <ScrollToTop />
        <Navbar />
        <main className="flex-grow">
          <AnimatedRoutes />
        </main>
        <Footer />
        <Suspense fallback={null}>
          <Chatbot />
        </Suspense>
      </div>
    </Router>
  );
}

export default App;
