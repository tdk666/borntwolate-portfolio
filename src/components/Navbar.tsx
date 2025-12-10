import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Lightbulb, LightbulbOff, Instagram } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useDarkroom } from '../context/DarkroomContext';
import { useTranslation } from 'react-i18next';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const { isDarkroom, toggleDarkroom } = useDarkroom();
    const { t, i18n } = useTranslation();
    const location = useLocation();

    const toggleMenu = () => setIsOpen(!isOpen);

    const toggleLanguage = () => {
        const newLang = i18n.language.startsWith('fr') ? 'en' : 'fr';
        i18n.changeLanguage(newLang);
    };

    const menuItems = [
        { title: t('nav.portfolio'), path: '/portfolio' },
        { title: t('nav.series'), path: '/series' },
        { title: t('nav.about'), path: '/about' },
        { title: t('nav.contact'), path: '/contact' },
    ];

    return (
        <nav className="fixed top-0 left-0 w-full z-50 px-6 py-6 flex justify-between items-center bg-gradient-to-b from-black/80 to-transparent text-off-white">
            <div>
                {location.pathname !== '/' && (
                    <Link to="/" className="text-xl font-space-mono font-bold tracking-tighter uppercase relative z-50 whitespace-nowrap">
                        Théophile Dequecker
                    </Link>
                )}
            </div>

            <div className="flex items-center space-x-6 z-50">
                {/* Desktop Menu */}
                <div className="hidden md:flex space-x-8">
                    {menuItems.map((item) => (
                        <Link
                            key={item.title}
                            to={item.path}
                            className="text-sm font-inter uppercase tracking-widest hover:text-warm-sepia transition-colors duration-300"
                        >
                            {item.title}
                        </Link>
                    ))}
                </div>

                {/* Toggles */}
                <div className="flex items-center space-x-4">
                    <a
                        href="https://instagram.com/borntwolate"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="Instagram"
                        className="hover:text-warm-sepia transition-colors cursor-pointer"
                    >
                        <Instagram size={20} />
                    </a>
                    <button onClick={toggleLanguage} className="font-space-mono text-xs uppercase hover:text-warm-sepia transition-colors cursor-pointer w-6 text-center">
                        {i18n.language.startsWith('fr') ? 'EN' : 'FR'}
                    </button>
                    <button onClick={toggleDarkroom} aria-label="Toggle Darkroom Mode" className="hover:text-warm-sepia transition-colors cursor-pointer">
                        {isDarkroom ? <LightbulbOff size={20} /> : <Lightbulb size={20} />}
                    </button>
                </div>

                {/* Mobile Menu Button */}
                <button onClick={toggleMenu} className="md:hidden cursor-pointer">
                    {isOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </div>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="fixed inset-0 bg-deep-black flex flex-col items-center justify-center space-y-8 md:hidden z-40"
                    >
                        {menuItems.map((item) => (
                            <Link
                                key={item.title}
                                to={item.path}
                                onClick={toggleMenu}
                                className="text-2xl font-space-mono uppercase tracking-widest hover:text-warm-sepia transition-colors duration-300"
                            >
                                {item.title}
                            </Link>
                        ))}
                        <button onClick={() => { toggleLanguage(); toggleMenu(); }} className="text-xl font-space-mono uppercase tracking-widest hover:text-warm-sepia transition-colors mt-8">
                            {i18n.language.startsWith('fr') ? 'Switch to English' : 'Passer en Français'}
                        </button>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
};

export default Navbar;
