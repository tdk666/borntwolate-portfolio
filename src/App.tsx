// Force TS re-evaluation
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
import { Chatbot } from './components/chatbot/Chatbot';

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
      </Routes>
    </AnimatePresence>
  );
}

function App() {
  const { isDarkroom } = useDarkroom();

  return (
    <Router>
      <div className={`min-h-screen transition-colors duration-700 font-sans selection:bg-darkroom-red selection:text-off-white ${isDarkroom ? 'darkroom-mode' : ''}`}>
        <div className="fixed inset-0 pointer-events-none z-50 opacity-[0.03] mix-blend-overlay" style={{ backgroundImage: 'url("https://grainy-gradients.vercel.app/noise.svg")' }}></div>
        <Navbar />
        <AnimatedRoutes />
        <Chatbot />
      </div>
    </Router>
  );
}

export default App;
