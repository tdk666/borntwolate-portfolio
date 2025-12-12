import { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { photos, type Photo } from '../data/photos';
import { useTranslation } from 'react-i18next';
import { SEO } from '../components/SEO'; // <--- AJOUT CRUCIAL SEO

import Lightbox from '../components/Lightbox';

const categories = ['all', 'urban', 'nature', 'portrait', 'bnw'];

const Portfolio = () => {
    const { t, i18n } = useTranslation();
    const [filter, setFilter] = useState('all');
    const [selectedPhotoIndex, setSelectedPhotoIndex] = useState<number | null>(null);
    const [columns, setColumns] = useState(1);

    // Filter photos based on selection
    const filteredPhotos = useMemo(() => {
        let result = filter === 'all'
            ? [...photos]
            : photos.filter((photo) => photo.category === filter);

        const seed = 12345;
        const m = 0x80000000;
        const a = 1103515245;
        const c = 12345;

        let state = seed;
        const random = () => {
            state = (a * state + c) % m;
            return state / (m - 1);
        }

        // Fisher-Yates Shuffle with strict seed
        for (let i = result.length - 1; i > 0; i--) {
            const j = Math.floor(random() * (i + 1));
            [result[i], result[j]] = [result[j], result[i]];
        }

        return result;
    }, [filter]);

    // Handle Window Resize for responsive columns
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 1024) setColumns(3);
            else if (window.innerWidth >= 768) setColumns(2);
            else setColumns(1);
        };

        handleResize(); // Init
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // SMART MASONRY LOGIC
    const distributedPhotos = useMemo(() => {
        const cols: Photo[][] = Array.from({ length: columns }, () => []);
        const heights = new Array(columns).fill(0);

        filteredPhotos.forEach((photo) => {
            const shortestColIndex = heights.indexOf(Math.min(...heights));
            cols[shortestColIndex].push(photo);
            const height = photo.orientation === 'portrait' ? 1.5 : 0.666;
            heights[shortestColIndex] += height;
        });

        // Rebalancing Pass (Hill Climber)
        if (columns > 1) {
            for (let i = 0; i < 5; i++) {
                const maxH = Math.max(...heights);
                const minH = Math.min(...heights);
                const maxColIndex = heights.indexOf(maxH);
                const minColIndex = heights.indexOf(minH);

                if (maxH - minH < 0.5) break;

                const candidateIndexInCol = cols[maxColIndex].length - 1;
                if (candidateIndexInCol < 0) continue;

                const photoToMove = cols[maxColIndex][candidateIndexInCol];
                const moveHeight = photoToMove.orientation === 'portrait' ? 1.5 : 0.666;
                const newMaxH = maxH - moveHeight;
                const newMinH = minH + moveHeight;

                if (Math.abs(newMaxH - newMinH) < (maxH - minH)) {
                    cols[maxColIndex].pop();
                    cols[minColIndex].push(photoToMove);
                    heights[maxColIndex] -= moveHeight;
                    heights[minColIndex] += moveHeight;
                }
            }
        }
        return cols;
    }, [filteredPhotos, columns]);

    // Lightbox Navigation Logic
    const handlePhotoClick = (photo: Photo) => {
        const index = filteredPhotos.findIndex(p => p.id === photo.id);
        setSelectedPhotoIndex(index);
    };

    const handleCloseLightbox = () => {
        setSelectedPhotoIndex(null);
    };

    const handleNextPhoto = () => {
        if (selectedPhotoIndex !== null) {
            setSelectedPhotoIndex((prev) => (prev! + 1) % filteredPhotos.length);
        }
    };

    const handlePrevPhoto = () => {
        if (selectedPhotoIndex !== null) {
            setSelectedPhotoIndex((prev) => (prev! - 1 + filteredPhotos.length) % filteredPhotos.length);
        }
    };

    return (
        <div className="min-h-screen pt-24 px-4 md:px-8 pb-12">
            {/* AJOUT SEO : Corrige le score SEO */}
            <SEO
                title="Portfolio"
                description="Galerie complète des œuvres de Théophile Dequecker. Photographie argentique, paysages, portraits et explorations urbaines."
            />

            {/* Filter Tabs */}
            <div className="flex flex-wrap justify-center gap-6 mb-12">
                {categories.map((category) => (
                    <button
                        key={category}
                        onClick={() => setFilter(category)}
                        className={`text-sm font-space-mono uppercase tracking-widest transition-colors duration-300 ${filter === category ? 'text-darkroom-red underline underline-offset-4' : 'text-silver hover:text-off-white'
                            }`}
                        aria-label={`Filtrer par catégorie : ${t(`categories.${category}`)}`} // AJOUT ACCESSIBILITÉ
                    >
                        {t(`categories.${category}`)}
                    </button>
                ))}
            </div>

            {/* Smart Masonry Grid */}
            <div className="flex gap-4 items-start justify-center">
                <AnimatePresence mode="popLayout">
                    {distributedPhotos.map((column, colIndex) => (
                        <div key={colIndex} className="flex flex-col gap-4 flex-1 min-w-0">
                            {column.map((photo, imgIndex) => {
                                // OPTIMISATION PERFORMANCE : 
                                // On charge en priorité les 2 premières images de chaque colonne.
                                // Le reste est chargé "à la demande" (lazy).
                                const isPriority = imgIndex < 2;

                                return (
                                    <motion.figure
                                        layout
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0, scale: 0.9 }}
                                        transition={{ duration: 0.5 }}
                                        key={photo.id}
                                        // AJOUT ACCESSIBILITÉ CLAVIER
                                        className="relative group cursor-pointer m-0 outline-none focus:ring-2 focus:ring-darkroom-red focus:ring-offset-2 focus:ring-offset-black rounded-sm"
                                        onClick={() => handlePhotoClick(photo)}
                                        onKeyDown={(e) => {
                                            if (e.key === 'Enter' || e.key === ' ') {
                                                e.preventDefault();
                                                handlePhotoClick(photo);
                                            }
                                        }}
                                        tabIndex={0}
                                        role="button"
                                        aria-label={`Agrandir la photo : ${photo.title}`}
                                    >
                                        {/* CADRE GALERIE */}
                                        <div className="bg-[#F9F8F4] p-3 shadow-md group-hover:shadow-xl transition-shadow duration-300 ease-out">

                                            {/* MASQUE INTERNE */}
                                            <div className="relative overflow-hidden bg-gray-200">
                                                <img
                                                    src={photo.url}
                                                    alt={photo.alt_accessible?.[i18n.language.startsWith('en') ? 'en' : 'fr'] || photo.title}
                                                    className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105 select-none block"
                                                    // OPTIMISATION CHARGEMENT
                                                    loading={isPriority ? "eager" : "lazy"}
                                                    fetchPriority={isPriority ? "high" : "auto"}
                                                    decoding={isPriority ? "sync" : "async"}
                                                    onContextMenu={(e) => e.preventDefault()}
                                                    draggable="false"
                                                />

                                                {/* Hover Overlay */}
                                                <figcaption className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 focus-within:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                                                    <div className="text-center p-2">
                                                        <h3 className="text-off-white font-space-mono text-lg">{photo.title}</h3>
                                                        <p className="text-warm-sepia font-inter text-xs uppercase tracking-widest mt-2">
                                                            {t(`categories.${photo.category}`)}
                                                        </p>
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

            {/* Lightbox */}
            <AnimatePresence>
                {selectedPhotoIndex !== null && (
                    <Lightbox
                        photo={filteredPhotos[selectedPhotoIndex]}
                        onClose={handleCloseLightbox}
                        onNext={handleNextPhoto}
                        onPrev={handlePrevPhoto}
                    />
                )}
            </AnimatePresence>
        </div>
    );
};

export default Portfolio;
