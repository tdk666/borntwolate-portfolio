import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { photos, type Photo } from '../data/photos';
import { useTranslation } from 'react-i18next';

const Hero = () => {
    const { t, i18n } = useTranslation();
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isLoading, setIsLoading] = useState(true);
    const [isMobile, setIsMobile] = useState(() => typeof window !== 'undefined' ? window.innerWidth < 768 : false);

    // State for shuffled photos to avoid impure render calls
    const [landscapePhotos] = useState<Photo[]>(() =>
        photos.filter(p => p.orientation === 'landscape').sort(() => 0.5 - Math.random()).slice(0, 8)
    );
    const [portraitPhotos] = useState<Photo[]>(() =>
        photos.filter(p => p.orientation === 'portrait').sort(() => 0.5 - Math.random()).slice(0, 8)
    );

    // Select the active list based on screen width
    const currentPhotos = isMobile ? portraitPhotos : landscapePhotos;

    // LCP OPTIMIZATION: Fixed landing image that matches index.html preload
    // We use a flagship analog photo instead of a mockup
    const landingImage = "/images/winter-in-the-fruit/empire-state.avif";

    const [isImageReady, setIsImageReady] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 768);
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    useEffect(() => {
        setCurrentIndex(0);
    }, [isMobile]);

    // PRELOAD CHECK: If image already in cache, it might not fire onLoad properly
    useEffect(() => {
        const img = new Image();
        img.src = landingImage;
        if (img.complete) {
            setIsImageReady(true);
            setTimeout(() => setIsLoading(false), 800);
        }
    }, [landingImage]);

    useEffect(() => {
        if (currentPhotos.length === 0) return;

        const interval = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % currentPhotos.length);
        }, 6000);
        return () => clearInterval(interval);
    }, [currentPhotos.length]);

    const getOptimizedUrl = (url: string, format: 'avif' | 'webp') => {
        return url.replace(/\.(jpg|jpeg|png)$/i, `.${format}`);
    };

    return (
        <section className="relative w-full h-screen overflow-hidden bg-deep-black flex flex-col justify-center items-center">
            {/* NOTE: LCP preload is already declared statically in index.html.
                Duplicating it here via Helmet causes the browser to see two identical
                preload hints for the same resource. Removed to avoid double fetch. */}

            {/* Loading Screen — "BROOK'S DARKROOM" */}
            <AnimatePresence>
                {isLoading && (
                    <motion.div
                        initial={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 1.2, ease: "easeInOut" }}
                        className="absolute inset-0 z-40 bg-deep-black flex flex-col items-center justify-center"
                    >
                        <div className="film-grain" />
                        <motion.div
                            initial={{ opacity: 0.3 }}
                            animate={{ opacity: [0.3, 0.6, 0.3] }}
                            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                            className="absolute inset-0 bg-darkroom-red/5 pointer-events-none"
                        />
                        <motion.p
                            initial={{ opacity: 0, scale: 0.98 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 1 }}
                            className="text-warm-sepia font-space-mono text-[10px] tracking-[0.8em] uppercase mb-4"
                        >
                            {t('home.loading', 'DÉVELOPPEMENT...')}
                        </motion.p>
                        <div className="w-24 h-[1px] bg-white/10 overflow-hidden">
                            <motion.div 
                                initial={{ x: '-100%' }}
                                animate={{ x: '100%' }}
                                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                                className="w-full h-full bg-darkroom-red/40"
                            />
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Slideshow with Optimized Format Support */}
            <AnimatePresence>
                <motion.div
                    key={`${isMobile ? 'mobile' : 'desktop'}-${currentIndex}`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1, transition: { duration: 1.5, ease: "easeInOut" } }}
                    exit={{ opacity: 0, transition: { duration: 1.5, ease: "easeInOut" } }}
                    className="absolute inset-0 w-full h-full"
                    aria-hidden="true"
                    tabIndex={-1}
                >
                    <picture>
                        {currentIndex === 0 ? (
                            // First Image is always the preloaded optimized AVIF
                            <img
                                src={landingImage}
                                alt="Photographie argentique d'art - Théophile Dequecker"
                                className="w-full h-full object-cover opacity-50"
                                loading="eager"
                                fetchPriority="high"
                                decoding="sync"
                                onLoad={() => {
                                    setIsImageReady(true);
                                    setTimeout(() => setIsLoading(false), 800); // Small buffer for CSS paint
                                }}
                            />
                        ) : (
                            // Subsquent images use standard dynamic optimization
                            <>
                                <source srcSet={getOptimizedUrl(currentPhotos[currentIndex]?.url || '', 'avif')} type="image/avif" />
                                <source srcSet={getOptimizedUrl(currentPhotos[currentIndex]?.url || '', 'webp')} type="image/webp" />
                                <img
                                    src={currentPhotos[currentIndex]?.url}
                                    alt={currentPhotos[currentIndex]?.alt_accessible?.[i18n.language.startsWith('en') ? 'en' : 'fr'] || "Photographie argentique d'art"}
                                    className="w-full h-full object-cover opacity-50"
                                    loading="lazy"
                                    decoding="async"
                                />
                            </>
                        )}
                    </picture>
                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-b from-deep-black/30 via-transparent to-deep-black/60" />
                </motion.div>
            </AnimatePresence>

            {/* Overlay Text — SYNCED WITH isImageReady & isLoading */}
            <div className={`absolute inset-0 z-10 flex flex-col items-center justify-center text-center px-4 transition-opacity duration-700 ${!isImageReady || isLoading ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
                <AnimatePresence>
                    {isImageReady && !isLoading && (
                        <>
                            <motion.h1
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 1.5, delay: 0.2, ease: "easeOut" }}
                                className="text-5xl md:text-8xl font-serif italic text-white tracking-tighter mb-6 drop-shadow-2xl"
                            >
                                Théophile Dequecker
                            </motion.h1>

                            <motion.div
                                initial={{ scaleX: 0 }}
                                animate={{ scaleX: 1 }}
                                transition={{ duration: 1, delay: 0.8 }}
                                className="h-px w-32 bg-darkroom-red/80 mb-6 drop-shadow-lg"
                            />

                            <motion.h2
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 1.2, delay: 1.2 }}
                                className="text-xs md:text-sm font-space-mono text-white/90 uppercase tracking-[0.5em] drop-shadow-lg mb-12"
                            >
                                {t('home.subtitle')}
                            </motion.h2>

                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8, delay: 1.8 }}
                            >
                                <Link
                                    to="/portfolio"
                                    className="btn-primary"
                                >
                                    <span>{t('home.manifest_cta_buy')}</span>
                                </Link>
                            </motion.div>
                        </>
                    )}
                </AnimatePresence>
            </div>
        </section>
    );
};

export default Hero;
