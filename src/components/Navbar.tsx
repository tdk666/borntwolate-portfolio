import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { Menu, X, Instagram, Moon, Sun } from 'lucide-react';
import { useDarkroom } from '../context/DarkroomContext';

const Navbar = () => {
    const location = useLocation();
    const { t, i18n } = useTranslation();
    const { isDarkroom, toggleDarkroom } = useDarkroom();
    const isHome = location.pathname === '/';
    const [isOpen, setIsOpen] = useState(false);
    // Fermer le menu quand on change de page
    useEffect(() => { setIsOpen(false); }, [location]);

    // Empêcher le scroll quand le menu est ouvert
    useEffect(() => {
        document.body.style.overflow = isOpen ? 'hidden' : 'unset';
    }, [isOpen]);

    const toggleLang = () => {
        i18n.changeLanguage(i18n.language === 'fr' ? 'en' : 'fr');
    };

    const links = [
        { path: '/portfolio', label: t('nav.portfolio') },
        { path: '/series', label: t('nav.series') },
        { path: '/about', label: t('nav.about') },
        { path: '/contact', label: t('nav.contact') },
    ];

    return (
        <>
            <motion.nav
                initial={{ y: -100 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.6, ease: [0.33, 1, 0.68, 1] }}
                className="fixed top-0 left-0 w-full z-40 px-6 py-6 flex justify-between items-center mix-blend-difference text-off-white"
            >
                {/* Logo Adaptatif */}
                {/* Logo Adaptatif */}
                <div>
                    {!isHome && (
                        <Link to="/" className="text-xl md:text-2xl font-bold font-space-mono tracking-tighter uppercase hover:opacity-70 transition-opacity z-50">
                            Théophile Dequecker
                        </Link>
                    )}
                </div>

                {/* Desktop Menu */}
                <div className="hidden md:flex items-center gap-8 font-space-mono text-sm tracking-widest uppercase">
                    {links.map((link) => (
                        <Link key={link.path} to={link.path} className="hover:text-warm-sepia transition-colors relative group">
                            {link.label}
                            <span className="absolute -bottom-1 left-0 w-0 h-px bg-warm-sepia transition-all duration-300 group-hover:w-full" />
                        </Link>
                    ))}

                    <div className="flex items-center gap-6 ml-4 px-6 border-l border-white/20">
                        <button onClick={toggleLang} className="hover:text-warm-sepia transition-colors font-bold">
                            {i18n.language === 'fr' ? 'EN' : 'FR'}
                        </button>

                        <button onClick={toggleDarkroom} className="hover:text-darkroom-red transition-colors" aria-label="Darkroom Mode">
                            {isDarkroom ? <Sun size={20} /> : <Moon size={20} />}
                        </button>

                        <a href="https://instagram.com/borntwolate" target="_blank" rel="noopener noreferrer" className="hover:text-darkroom-red transition-colors">
                            <Instagram size={20} />
                        </a>
                    </div>
                </div>

                {/* Mobile Hamburger Button */}
                <button onClick={() => setIsOpen(!isOpen)} className="md:hidden z-50 p-4 -mr-4 text-off-white">
                    {isOpen ? <X size={28} /> : <Menu size={28} />}
                </button>
            </motion.nav>

            {/* Mobile Fullscreen Menu Overlay */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: '-100%' }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: '-100%' }}
                        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                        className="fixed inset-0 bg-black z-30 flex flex-col items-center justify-center space-y-8 md:hidden"
                    >
                        {links.map((link, i) => (
                            <motion.div
                                key={link.path}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.1 + i * 0.1 }}
                            >
                                <Link
                                    to={link.path}
                                    className="text-3xl font-serif italic text-off-white hover:text-darkroom-red transition-colors"
                                >
                                    {link.label}
                                </Link>
                            </motion.div>
                        ))}

                        <motion.div
                            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}
                            className="pt-8 border-t border-white/10 w-24 text-center"
                        >
                            <button onClick={toggleLang} className="font-space-mono text-sm text-silver uppercase tracking-widest mb-8">
                                {i18n.language === 'fr' ? 'Switch to EN' : 'Passer en FR'}
                            </button>

                            <div className="flex justify-center items-center gap-8 border-t border-white/10 pt-8 w-full">
                                {/* Darkroom Toggle */}
                                <button onClick={toggleDarkroom} className="text-silver hover:text-darkroom-red transition-colors">
                                    {isDarkroom ? <Sun size={24} /> : <Moon size={24} />}
                                </button>

                                {/* Instagram */}
                                <a href="https://instagram.com/borntwolate" target="_blank" rel="noopener noreferrer" className="text-silver hover:text-darkroom-red transition-colors">
                                    <Instagram size={24} />
                                </a>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default Navbar;
