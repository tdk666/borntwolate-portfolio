import { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { photos, type Photo } from '../data/photos';

import Lightbox from '../components/Lightbox';

const categories = ['Tout', 'Urbain', 'Nature', 'Portrait', 'Noir & Blanc'];

const Portfolio = () => {
    const [filter, setFilter] = useState('Tout');
    const [selectedPhotoIndex, setSelectedPhotoIndex] = useState<number | null>(null);
    const [columns, setColumns] = useState(1);

    // Filter photos based on selection
    const filteredPhotos = useMemo(() => {
        return filter === 'Tout'
            ? photos
            : photos.filter((photo) => photo.category === filter);
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
    // Distribute photos into columns to maintain even heights
    const distributedPhotos = useMemo(() => {
        const cols: Photo[][] = Array.from({ length: columns }, () => []);
        const heights = new Array(columns).fill(0);

        filteredPhotos.forEach((photo) => {
            // Find the shortest column
            const shortestColIndex = heights.indexOf(Math.min(...heights));

            // Add photo to shortest column
            cols[shortestColIndex].push(photo);

            // Estimate height increase (Portrait = 1.5 units, Landscape = 0.66 units)
            // Adding a small randomization factor or just strict height prevents identical columns
            const height = photo.orientation === 'portrait' ? 1.5 : 0.67;
            heights[shortestColIndex] += height;
        });

        return cols;
    }, [filteredPhotos, columns]);


    // Lightbox Navigation Logic (Needs to map back to flattened filtered list)
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
            {/* Filter Tabs */}
            <div className="flex flex-wrap justify-center gap-6 mb-12">
                {categories.map((category) => (
                    <button
                        key={category}
                        onClick={() => setFilter(category)}
                        className={`text-sm font-space-mono uppercase tracking-widest transition-colors duration-300 ${filter === category ? 'text-darkroom-red underline underline-offset-4' : 'text-silver hover:text-off-white'
                            }`}
                    >
                        {category}
                    </button>
                ))}
            </div>

            {/* Smart Masonry Grid */}
            <div className="flex gap-8 items-start justify-center">
                <AnimatePresence mode="popLayout">
                    {distributedPhotos.map((column, colIndex) => (
                        <div key={colIndex} className="flex flex-col gap-8 flex-1 min-w-0">
                            {column.map((photo) => (
                                <motion.div
                                    layout
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.9 }}
                                    transition={{ duration: 0.5 }}
                                    key={photo.id}
                                    className="relative group cursor-pointer overflow-hidden"
                                    onClick={() => handlePhotoClick(photo)}
                                >
                                    <img
                                        src={photo.url}
                                        alt={photo.title}
                                        className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105"
                                        loading="lazy"
                                    />
                                    {/* Hover Overlay */}
                                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                                        <div className="text-center">
                                            <h3 className="text-off-white font-space-mono text-lg">{photo.title}</h3>
                                            <p className="text-warm-sepia font-inter text-xs uppercase tracking-widest mt-2">
                                                {photo.category}
                                            </p>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
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
