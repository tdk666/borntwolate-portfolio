import { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { photos, type Photo } from '../data/photos';
import { useTranslation } from 'react-i18next';
import { SEO } from '../components/SEO'; // AJOUT SEO
import { FadeIn } from '../components/animations/FadeIn'; // AJOUT SEO
import Lightbox from '../components/Lightbox';
import { Magnetic } from '../components/Magnetic';

const categories = ['all', 'urban', 'nature', 'portrait', 'bnw'];

const Portfolio = () => {
    const { t, i18n } = useTranslation(); // Récupération de i18n pour la langue
    const [filter, setFilter] = useState('all');
    const [selectedPhotoIndex, setSelectedPhotoIndex] = useState<number | null>(null);
    const [columns, setColumns] = useState(1);

    // Filter & Shuffle
    const [filteredPhotos, setFilteredPhotos] = useState<Photo[]>(photos);

    useEffect(() => {
        let result = filter === 'all'
            ? [...photos]
            : photos.filter((photo) => photo.category === filter);

        // Fisher-Yates Shuffle for 'all' category
        // Done in useEffect to keep the render pure (Math.random is impure)
        if (filter === 'all') {
            for (let i = result.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [result[i], result[j]] = [result[j], result[i]];
            }
        }
        // eslint-disable-next-line
        setFilteredPhotos(result);
    }, [filter]);

    // Responsive Columns
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 1024) setColumns(3);
            else if (window.innerWidth >= 768) setColumns(2);
            else setColumns(1);
        };
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // Masonry Logic
    const distributedPhotos = useMemo(() => {
        const cols: Photo[][] = Array.from({ length: columns }, () => []);
        const heights = new Array(columns).fill(0);
        filteredPhotos.forEach((photo) => {
            const shortestColIndex = heights.indexOf(Math.min(...heights));
            cols[shortestColIndex].push(photo);
            const height = photo.orientation === 'portrait' ? 1.5 : 0.666;
            heights[shortestColIndex] += height;
        });
        return cols;
    }, [filteredPhotos, columns]);

    // Lightbox Handlers
    const handlePhotoClick = (photo: Photo) => {
        const index = filteredPhotos.findIndex(p => p.id === photo.id);
        setSelectedPhotoIndex(index);
    };
    const handleNext = () => selectedPhotoIndex !== null && setSelectedPhotoIndex((selectedPhotoIndex + 1) % filteredPhotos.length);
    const handlePrev = () => selectedPhotoIndex !== null && setSelectedPhotoIndex((selectedPhotoIndex - 1 + filteredPhotos.length) % filteredPhotos.length);

    return (
        <div className="min-h-screen pt-24 px-4 md:px-8 pb-12">
            <SEO
                title={t('portfolio.seo_title')}
                description={t('portfolio.seo_desc')}
            />

            {/* Filters */}
            <FadeIn delay={0.2} noVertical>
                <div className="flex flex-wrap justify-center gap-6 mb-12">
                    {categories.map((category) => (
                        <Magnetic key={category}>
                            <button
                                onClick={() => setFilter(category)}
                                aria-label={`Filtrer par ${t(`categories.${category}`)}`}
                                className={`text-sm font-space-mono uppercase tracking-widest transition-colors duration-300 hover-analog ${filter === category ? 'text-darkroom-red underline underline-offset-4' : 'text-silver hover:text-off-white'}`}
                            >
                                {t(`categories.${category}`)}
                            </button>
                        </Magnetic>
                    ))}
                </div>
            </FadeIn>

            {/* Grid */}
            <div className="flex gap-4 items-start justify-center">
                <AnimatePresence mode="popLayout">
                    {distributedPhotos.map((column, colIndex) => (
                        <div key={colIndex} className="flex flex-col gap-4 flex-1 min-w-0">
                            {column.map((photo, imgIndex) => {
                                const isPriority = imgIndex < 2; // Smart Loading

                                // Developing Entrance Variants (Sequential)
                                const developVariants = {
                                    hidden: {
                                        opacity: 0,
                                        filter: "blur(8px) sepia(0.8) contrast(1.2)", // L'image latente
                                        scale: 0.98,
                                        y: 20
                                    },
                                    visible: {
                                        opacity: 1,
                                        filter: "blur(0px) sepia(0) contrast(1)", // Le fixateur agit
                                        scale: 1,
                                        y: 0,
                                        transition: {
                                            duration: 1.2,
                                            ease: [0.25, 1, 0.5, 1] as [number, number, number, number] // Courbe "liquide"
                                        }
                                    },
                                    exit: {
                                        opacity: 0,
                                        filter: "blur(5px)",
                                        transition: { duration: 0.3 }
                                    }
                                };

                                return (
                                    <motion.figure
                                        layout
                                        variants={developVariants} // Utilise les nouveaux variants
                                        initial="hidden"
                                        whileInView="visible" // CHANGED from animate to whileInView for Scroll Trigger
                                        viewport={{ once: true, margin: "0px 0px -100px 0px" }} // TRIGGER
                                        exit="exit"
                                        key={photo.id}
                                        className="relative group cursor-pointer m-0 outline-none focus:ring-2 focus:ring-darkroom-red rounded-sm"
                                        onClick={() => handlePhotoClick(photo)}
                                        onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && handlePhotoClick(photo)}
                                        tabIndex={0}
                                        role="button"
                                        aria-label={`Voir ${photo.title}`}
                                    >
                                        {/* DESIGN GALERIE - BORDER REMOVED */}
                                        <div className="group-hover:shadow-xl transition-shadow duration-300 ease-out border border-white/10">
                                            <div className="relative overflow-hidden bg-gray-900">
                                                <motion.img
                                                    src={photo.url}
                                                    alt={photo.alt_accessible?.[i18n.language.startsWith('en') ? 'en' : 'fr'] || photo.title}
                                                    className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105 select-none block"
                                                    loading={isPriority ? "eager" : "lazy"}
                                                    fetchPriority={isPriority ? "high" : "auto"}
                                                    decoding={isPriority ? "sync" : "async"}
                                                    draggable="false"
                                                />
                                                <figcaption className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center z-[60]">
                                                    <div className="text-center p-2">
                                                        <h3 className="text-off-white font-space-mono text-lg">{photo.title}</h3>
                                                        <p className="text-warm-sepia font-inter text-xs uppercase tracking-widest mt-2">{t(`categories.${photo.category}`)}</p>
                                                    </div>
                                                </figcaption>
                                            </div>
                                        </div>
                                    </motion.figure>
                                );
                            })}
                        </div>
                    ))}
                </AnimatePresence>
            </div>

            <AnimatePresence>
                {selectedPhotoIndex !== null && (
                    <Lightbox photo={filteredPhotos[selectedPhotoIndex]} onClose={() => setSelectedPhotoIndex(null)} onNext={handleNext} onPrev={handlePrev} />
                )}
            </AnimatePresence>
        </div>
    );
};
export default Portfolio;
