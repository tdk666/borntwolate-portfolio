import { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { photos } from '../data/photos';
import { useTranslation } from 'react-i18next';

const Hero = () => {
    const { t } = useTranslation();
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isLoading, setIsLoading] = useState(true);
    const [isMobile, setIsMobile] = useState(() => typeof window !== 'undefined' ? window.innerWidth < 768 : false);

    // Pre-calculate shuffled lists for both orientations
    const landscapePhotos = useMemo(() =>
        photos.filter(p => p.orientation === 'landscape').sort(() => 0.5 - Math.random()).slice(0, 8)
        , []);

    const portraitPhotos = useMemo(() =>
        photos.filter(p => p.orientation === 'portrait').sort(() => 0.5 - Math.random()).slice(0, 8)
        , []);

    // Select the active list based on screen width
    const currentPhotos = isMobile ? portraitPhotos : landscapePhotos;

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 768);
        };

        // Listen for resize
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    useEffect(() => {
        // Reset index when switching modes to avoid out-of-bounds
        setCurrentIndex(0);
    }, [isMobile]);

    useEffect(() => {
        // Simulate "Developing" effect
        const timer = setTimeout(() => setIsLoading(false), 2000);
        return () => clearTimeout(timer);
    }, []);

    useEffect(() => {
        if (currentPhotos.length === 0) return;

        const interval = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % currentPhotos.length);
        }, 6000);
        return () => clearInterval(interval);
    }, [currentPhotos.length]); // Re-run if list length changes (mostly stable though)

    return (
        <section className="relative w-full h-screen overflow-hidden bg-deep-black flex flex-col justify-center items-center">
            {/* Loading Screen */}
            <AnimatePresence>
                {isLoading && (
                    <motion.div
                        initial={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 1.5 }}
                        className="absolute inset-0 z-40 bg-deep-black flex items-center justify-center"
                    >
                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: [0, 1, 0] }}
                            transition={{ duration: 2, repeat: Infinity }}
                            className="text-warm-sepia font-space-mono text-sm tracking-[0.5em] uppercase"
                        >
                            {t('home.loading')}
                        </motion.p>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Slideshow */}
            <AnimatePresence mode='wait'>
                <motion.div
                    key={`${isMobile ? 'mobile' : 'desktop'}-${currentIndex}`} // Unique key forces re-render if mode changes
                    initial={{ opacity: 0, scale: 1.05 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 2, ease: "easeInOut" }}
                    className="absolute inset-0 w-full h-full"
                >
                    {/* Check if we have photos before trying to render */}
                    {currentPhotos.length > 0 && (
                        <img
                            src={currentPhotos[currentIndex]?.url}
                            alt="Hero Background"
                            className="w-full h-full object-cover opacity-50"
                            loading={currentIndex === 0 ? "eager" : "lazy"}
                            fetchPriority={currentIndex === 0 ? "high" : "auto"}
                            decoding={currentIndex === 0 ? "sync" : "async"}
                        />
                    )}
                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-b from-deep-black/30 via-transparent to-deep-black/60" />
                </motion.div>
            </AnimatePresence>

            {/* Overlay Text */}
            <div className="absolute inset-0 z-10 flex flex-col items-center justify-center text-center px-4">
                <motion.h1
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 2.2, duration: 1, ease: "easeOut" }}
                    className="text-4xl md:text-6xl font-space-mono font-bold text-off-white tracking-tighter mb-6 uppercase"
                >
                    Théophile Dequecker
                </motion.h1>
                <div className="h-px w-24 bg-warm-sepia/60 mb-6" />
                <motion.h2
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.8 }}
                    transition={{ delay: 2.8, duration: 1 }}
                    className="text-sm md:text-base font-space-mono text-silver uppercase tracking-[0.3em]"
                >
                    {t('home.subtitle')}
                </motion.h2>
            </div>
        </section>
    );
};

export default Hero;
