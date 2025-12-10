import { useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { seriesData } from '../data/photos';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { useState, useEffect } from 'react';
import Lightbox from '../components/Lightbox';
import Masonry from 'react-masonry-css';

const SeriesDetail = () => {
    const { id } = useParams<{ id: string }>();
    const seriesIndex = seriesData.findIndex((s) => s.id === id);
    const series = seriesData[seriesIndex];

    const [selectedPhotoIndex, setSelectedPhotoIndex] = useState<number | null>(null);

    if (!series) {
        return (
            <div className="min-h-screen flex items-center justify-center text-off-white font-space-mono">
                Series not found.
            </div>
        );
    }

    const nextSeries = seriesData[(seriesIndex + 1) % seriesData.length];
    const prevSeries = seriesData[(seriesIndex - 1 + seriesData.length) % seriesData.length];

    const handlePhotoClick = (index: number) => {
        setSelectedPhotoIndex(index);
    };

    const handleCloseLightbox = () => {
        setSelectedPhotoIndex(null);
    };

    const handleNextPhoto = () => {
        if (selectedPhotoIndex !== null) {
            setSelectedPhotoIndex((prev) => (prev! + 1) % series.photos.length);
        }
    };

    const handlePrevPhoto = () => {
        if (selectedPhotoIndex !== null) {
            setSelectedPhotoIndex((prev) => (prev! - 1 + series.photos.length) % series.photos.length);
        }
    };

    useEffect(() => {
        window.scrollTo(0, 0); // Scroll to top on route change

        const root = document.getElementById('root');

        if (series?.theme) {
            document.body.style.backgroundColor = series.theme.background;
            document.body.style.color = series.theme.text;
            if (root) {
                root.style.backgroundColor = series.theme.background;
                root.style.color = series.theme.text;
            }
        }

        return () => {
            document.body.style.backgroundColor = '';
            document.body.style.color = '';
            if (root) {
                root.style.backgroundColor = '';
                root.style.color = '';
            }
        };
    }, [series, id]); // Added id to dependency

    return (
        <div key={id} className={`min-h-screen pt-24 px-4 md:px-8 pb-12 transition-colors duration-1000 ease-in-out`}>
            {/* Header */}
            <div className="max-w-4xl mx-auto mb-16">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="text-center"
                >
                    <h1
                        className="text-5xl md:text-7xl font-bold font-space-mono mb-6 uppercase tracking-tighter transition-colors duration-500"
                        style={{ color: series.theme ? series.theme.text : 'var(--color-off-white)' }}
                    >
                        {series.title}
                    </h1>
                    <p className="text-silver font-inter text-sm tracking-widest uppercase mb-8">
                        {series.year}
                    </p>
                    <div className="w-12 h-0.5 bg-darkroom-red mx-auto mb-8" />
                    <motion.p
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2, duration: 0.8 }}
                        className="max-w-4xl mx-auto text-center text-xl md:text-2xl leading-relaxed mb-20 font-inter font-light whitespace-pre-line transition-colors duration-500"
                        style={{ color: series.theme ? series.theme.text : 'rgba(248, 246, 240, 0.9)' }}
                    >
                        {series.description}
                    </motion.p>
                </motion.div>
            </div>

            {/* Grid */}
            {/* Grid */}
            <div className="w-full max-w-[90%] mx-auto px-4 flex justify-center pt-10 pb-0">
                <Masonry
                    breakpointCols={{ default: 2, 700: 1 }}
                    className="my-masonry-grid flex !justify-center w-full mx-auto -ml-10"
                    columnClassName="pl-10 bg-clip-padding space-y-10"
                >
                    {series.photos.map((photo, index) => (
                        <motion.div
                            key={photo.id}
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true, margin: "1000px" }} // Huge buffer to pre-trigger visibility
                            transition={{ duration: 0.5, delay: index * 0.05, ease: "easeOut" }}
                            className="mb-10 break-inside-avoid relative group cursor-pointer overflow-hidden min-h-[200px] bg-white/5" // Placeholder to prevent collapse
                            onClick={() => handlePhotoClick(index)}
                        >
                            <img
                                src={photo.url}
                                alt={photo.title}
                                loading={index < 4 ? "eager" : "lazy"} // Force first 4 to load immediately
                                className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105"
                            />
                            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                                <p className="text-off-white font-space-mono text-sm uppercase tracking-widest">
                                    {photo.title}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </Masonry>
            </div>

            {/* Navigation */}
            <div className="max-w-[90%] mx-auto mt-8 flex justify-between items-center border-t border-white/10 pt-8">
                <Link
                    to={`/series/${prevSeries.id}`}
                    className="group flex items-center gap-4 text-silver hover:text-off-white transition-colors"
                >
                    <ArrowLeft className="w-5 h-5 transition-transform group-hover:-translate-x-1" />
                    <div className="text-left">
                        <span className="block text-xs font-inter uppercase tracking-widest text-darkroom-red mb-1">Previous</span>
                        <span className="font-space-mono text-sm md:text-base">{prevSeries.title}</span>
                    </div>
                </Link>

                <Link
                    to={`/series/${nextSeries.id}`}
                    className="group flex items-center gap-4 text-silver hover:text-off-white transition-colors text-right"
                >
                    <div className="text-right">
                        <span className="block text-xs font-inter uppercase tracking-widest text-darkroom-red mb-1">Next</span>
                        <span className="font-space-mono text-sm md:text-base">{nextSeries.title}</span>
                    </div>
                    <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                </Link>
            </div>

            {/* Lightbox */}
            <AnimatePresence>
                {selectedPhotoIndex !== null && (
                    <Lightbox
                        photo={series.photos[selectedPhotoIndex]}
                        onClose={handleCloseLightbox}
                        onNext={handleNextPhoto}
                        onPrev={handlePrevPhoto}
                    />
                )}
            </AnimatePresence>
        </div>
    );
};

export default SeriesDetail;
