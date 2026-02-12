import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';
import { Menu, X, Instagram, Moon, Sun, Search } from 'lucide-react';
import { useSearch } from '../context/SearchContext';
import { useDarkroom } from '../context/DarkroomContext';
import { useSound } from '../hooks/useSound';
// ... previous imports

const Navbar = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { t, i18n } = useTranslation();
    const { isDarkroom, toggleDarkroom } = useDarkroom();
    const { openSearch, resetSearch } = useSearch();
    const [isOpen, setIsOpen] = useState(false);
    const { scrollY } = useScroll();
    const [hidden, setHidden] = useState(false);

    // Search State
    const [isSearchVisible, setIsSearchVisible] = useState(false);
    const searchInputRef = useRef<HTMLInputElement>(null);
    const mobileSearchInputRef = useRef<HTMLInputElement>(null);

    useMotionValueEvent(scrollY, "change", (latest) => {
        const previous = scrollY.getPrevious() || 0;
        if (latest > previous && latest > 150 && !isOpen) setHidden(true);
        else setHidden(false);
    });

    // eslint-disable-next-line react-hooks/set-state-in-effect
    useEffect(() => { setIsOpen(false); }, [location]);
    useEffect(() => { document.body.style.overflow = isOpen ? 'hidden' : 'unset'; }, [isOpen]);

    const toggleLang = () => i18n.changeLanguage(i18n.language === 'fr' ? 'en' : 'fr');

    // Search Handler
    const handleSearchSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const term = searchInputRef.current?.value || mobileSearchInputRef.current?.value;
        if (term) {
            openSearch(term);
            const isPortfolio = location.pathname === '/portfolio';
            if (!isPortfolio) {
                navigate('/portfolio');
            }
            if (searchInputRef.current) searchInputRef.current.value = '';
            if (mobileSearchInputRef.current) mobileSearchInputRef.current.value = '';
            setIsSearchVisible(false); // Close input after search
        }
    };

    // SOUND DESIGN
    // SFX for navigation interaction
    const { play: playClick } = useSound('/sounds/shutter-click.mp3', { volume: 0.4 });
    const { play: playHover } = useSound('/sounds/slide-projector.mp3', { volume: 0.1 });

    const links = [
        { path: '/portfolio', label: t('nav.portfolio') },
        { path: '/series', label: t('nav.series') },
        { path: '/prints', label: "Atelier" },
        { path: '/about', label: t('nav.about') },
        { path: '/contact', label: t('nav.contact') },
    ];

    return (
        <>
            <motion.nav
                variants={{ visible: { y: 0 }, hidden: { y: '-100%' } }}
                animate={hidden ? "hidden" : "visible"}
                transition={{ duration: 0.35, ease: "easeInOut" }}
                className="fixed top-0 left-0 w-full z-[100] px-6 py-6 flex justify-between items-center text-white bg-gradient-to-b from-black/60 to-transparent pointer-events-auto"
            >
                <div className="z-50 drop-shadow-md">
                    {location.pathname !== '/' && (
                        <Link to="/" className="text-xl md:text-2xl font-bold font-space-mono tracking-tighter uppercase hover:opacity-70 transition-opacity whitespace-nowrap">
                            borntwolate
                        </Link>
                    )}
                </div>

                {/* DESKTOP NAVIGATION */}
                <div className="hidden md:flex items-center gap-6 font-space-mono text-sm tracking-widest uppercase drop-shadow-lg">
                    {/* Search Input Transition */}
                    <div className="relative flex items-center">
                        <AnimatePresence>
                            {isSearchVisible && (
                                <motion.form
                                    initial={{ width: 0, opacity: 0 }}
                                    animate={{ width: 200, opacity: 1 }}
                                    exit={{ width: 0, opacity: 0 }}
                                    onSubmit={handleSearchSubmit}
                                    className="overflow-hidden mr-2"
                                >
                                    <input
                                        ref={searchInputRef}
                                        type="text"
                                        placeholder="Search..."
                                        className="w-full bg-white/10 border border-white/20 rounded-full px-4 py-1 text-xs text-white placeholder:text-white/70 focus:outline-none focus:border-white/50"
                                        autoFocus
                                        onBlur={() => !searchInputRef.current?.value && setIsSearchVisible(false)}
                                    />
                                </motion.form>
                            )}
                        </AnimatePresence>
                        <button
                            onClick={() => {
                                setIsSearchVisible(!isSearchVisible);
                                if (!isSearchVisible) setTimeout(() => searchInputRef.current?.focus(), 100);
                            }}
                            className="hover:text-warm-sepia transition-colors drop-shadow-lg"
                            aria-label="Rechercher"
                        >
                            <Search size={20} />
                        </button>
                    </div>

                    <div className="w-px h-6 bg-white/20 mx-2" />

                    {links.map((link) => {
                        const isActive = location.pathname === link.path;
                        return (
                            <Link
                                key={link.path}
                                to={link.path}
                                onClick={() => {
                                    playClick();
                                    resetSearch();
                                }}
                                onMouseEnter={() => playHover()}
                                className="relative group px-4 py-2 overflow-hidden"
                            >
                                <span className={`relative z-10 transition-colors duration-500 ${isActive ? 'text-off-white font-medium' : 'text-off-white/90 group-hover:text-warm-sepia'} hover-analog inline-block drop-shadow-lg`}>
                                    {link.label}
                                </span>

                                {/* Red Light District - Active Glow (Safe Light) */}
                                {isActive && (
                                    <motion.div
                                        layoutId="activeNav"
                                        className="absolute inset-0 bg-gradient-to-t from-darkroom-red/40 to-transparent blur-md rounded-sm z-0"
                                        transition={{ type: "spring", stiffness: 200, damping: 30 }}
                                    />
                                )}
                            </Link>
                        );
                    })}

                    <div className="w-px h-6 bg-white/20 mx-2" />

                    <button onClick={toggleLang} aria-label="Changer la langue" className="hover:text-warm-sepia transition-colors font-bold drop-shadow-lg">
                        {i18n.language === 'fr' ? 'EN' : 'FR'}
                    </button>
                    <a href="https://instagram.com/borntwolate" target="_blank" rel="noopener noreferrer" aria-label="Suivre sur Instagram" className="hover:text-warm-sepia transition-colors drop-shadow-lg">
                        <Instagram size={20} />
                    </a>
                    <button onClick={toggleDarkroom} aria-label="Mode Chambre Noire" className="hover:text-darkroom-red transition-colors drop-shadow-lg">
                        {isDarkroom ? <Sun size={20} /> : <Moon size={20} />}
                    </button>
                </div>

                {/* MOBILE NAVIGATION CONTROLS */}
                <div className="flex items-center gap-4 md:hidden z-50">
                    {/* Mobile Search */}
                    <div className="relative flex items-center">
                        <AnimatePresence>
                            {isSearchVisible && (
                                <motion.form
                                    initial={{ width: 0, opacity: 0 }}
                                    animate={{ width: 140, opacity: 1 }}
                                    exit={{ width: 0, opacity: 0 }}
                                    onSubmit={handleSearchSubmit}
                                    className="overflow-hidden mr-2"
                                >
                                    <input
                                        ref={mobileSearchInputRef}
                                        type="text"
                                        placeholder="Search..."
                                        className="w-full bg-black/50 backdrop-blur-md border border-white/20 rounded-full px-3 py-1 text-xs text-white placeholder:text-white/70 focus:outline-none focus:border-white/50"
                                        onBlur={() => !mobileSearchInputRef.current?.value && setIsSearchVisible(false)}
                                    />
                                </motion.form>
                            )}
                        </AnimatePresence>
                        <button
                            onClick={() => {
                                setIsSearchVisible(!isSearchVisible);
                                if (!isSearchVisible) setTimeout(() => mobileSearchInputRef.current?.focus(), 100);
                            }}
                            className="text-off-white drop-shadow-lg p-1"
                            aria-label="Rechercher"
                        >
                            <Search size={24} />
                        </button>
                    </div>

                    <button onClick={() => setIsOpen(!isOpen)} aria-label="Ouvrir le menu de navigation" className="text-off-white drop-shadow-lg -mr-2 p-2">
                        {isOpen ? <X size={28} /> : <Menu size={28} />}
                    </button>
                </div>
            </motion.nav>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: '-100%' }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: '-100%' }}
                        className="fixed inset-0 bg-black z-[90] flex flex-col items-center justify-center space-y-8 md:hidden"
                    >
                        {links.map((link, i) => (
                            <motion.div key={link.path} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 + i * 0.1 }}>
                                <Link to={link.path} className="text-2xl font-space-mono uppercase tracking-widest text-off-white hover:text-darkroom-red transition-colors hover-analog">
                                    {link.label}
                                </Link>
                            </motion.div>
                        ))}
                        <div className="pt-8 border-t border-white/10 w-48 flex flex-col items-center gap-6">
                            <button onClick={toggleLang} className="font-space-mono text-sm text-silver uppercase tracking-widest">
                                {i18n.language === 'fr' ? 'Switch to EN' : 'Passer en FR'}
                            </button>
                            <div className="flex items-center gap-8">
                                <button onClick={toggleDarkroom} aria-label="Mode Chambre Noire" className="text-silver hover:text-darkroom-red transition-colors">
                                    {isDarkroom ? <Sun size={24} /> : <Moon size={24} />}
                                </button>
                                <a href="https://instagram.com/borntwolate" target="_blank" rel="noopener noreferrer" aria-label="Suivre sur Instagram" className="text-silver hover:text-darkroom-red transition-colors">
                                    <Instagram size={24} />
                                </a>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};
export default Navbar;
