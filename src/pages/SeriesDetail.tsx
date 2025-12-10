import { useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { seriesData } from '../data/photos';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { useState, useEffect } from 'react';
import Masonry from 'react-masonry-css';
import Lightbox from '../components/Lightbox';

const SeriesDetail = () => {
    const { id } = useParams<{ id: string }>();
    const seriesIndex = seriesData.findIndex((s) => s.id === id);
    const series = seriesData[seriesIndex];
    const [selectedPhotoIndex, setSelectedPhotoIndex] = useState<number | null>(null);

    useEffect(() => {
        window.scrollTo(0, 0);
        const root = document.getElementById('root');
        if (series?.theme) {
            document.body.style.backgroundColor = series.theme.background;
            document.body.style.color = series.theme.text;
            if (root) { root.style.backgroundColor = series.theme.background; root.style.color = series.theme.text; }
        }
        return () => {
            document.body.style.backgroundColor = ''; document.body.style.color = '';
            if (root) { root.style.backgroundColor = ''; root.style.color = ''; }
        };
    }, [series, id]);

    if (!series) return <div className="min-h-screen flex items-center justify-center">Series not found.</div>;

    const nextSeries = seriesData[(seriesIndex + 1) % seriesData.length];
    const prevSeries = seriesData[(seriesIndex - 1 + seriesData.length) % seriesData.length];

    const handleNextPhoto = () => selectedPhotoIndex !== null && setSelectedPhotoIndex((prev) => (prev! + 1) % series.photos.length);
    const handlePrevPhoto = () => selectedPhotoIndex !== null && setSelectedPhotoIndex((prev) => (prev! - 1 + series.photos.length) % series.photos.length);

    return (
        <div key={id} className="min-h-screen pt-24 px-4 md:px-8 pb-12 transition-colors duration-1000 ease-in-out">
            <div className="max-w-4xl mx-auto mb-16 text-center">
                <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-5xl md:text-7xl font-bold font-space-mono mb-6 uppercase tracking-tighter" style={{ color: series.theme?.text }}>{series.title}</motion.h1>
                <p className="text-silver font-inter text-sm tracking-widest uppercase mb-8">{series.year}</p>
                <div className="w-12 h-0.5 bg-current mx-auto mb-8 opacity-50" />
                <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} className="text-xl md:text-2xl leading-relaxed font-inter font-light whitespace-pre-line opacity-90">{series.description}</motion.p>
            </div>

            <div className="w-full max-w-[90%] mx-auto">
                <Masonry breakpointCols={{ default: 2, 700: 1 }} className="my-masonry-grid flex w-full mx-auto -ml-10" columnClassName="pl-10 bg-clip-padding space-y-10">
                    {series.photos.map((photo, index) => (
                        <motion.div
                            key={photo.id}
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true, margin: "500px" }}
                            transition={{ duration: 0.5, delay: index * 0.05 }}
                            className="mb-10 gallery-matting cursor-examine relative group"
                            onClick={() => setSelectedPhotoIndex(index)}
                        >
                            <img src={photo.url} alt={photo.alt_accessible || photo.title} loading={index < 4 ? "eager" : "lazy"} className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-[1.01]" />
                            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
                        </motion.div>
                    ))}
                </Masonry>
            </div>

            <div className="max-w-[90%] mx-auto mt-20 flex justify-between items-center border-t border-current pt-8 opacity-60 hover:opacity-100 transition-opacity">
                <Link to={`/series/${prevSeries.id}`} className="flex items-center gap-4 group"><ArrowLeft className="w-5 h-5 transition-transform group-hover:-translate-x-1" /><span className="font-space-mono">{prevSeries.title}</span></Link>
                <Link to={`/series/${nextSeries.id}`} className="flex items-center gap-4 text-right group"><span className="font-space-mono">{nextSeries.title}</span><ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" /></Link>
            </div>

            <AnimatePresence>
                {selectedPhotoIndex !== null && (
                    <Lightbox photo={series.photos[selectedPhotoIndex]} onClose={() => setSelectedPhotoIndex(null)} onNext={handleNextPhoto} onPrev={handlePrevPhoto} />
                )}
            </AnimatePresence>
        </div>
    );
};
export default SeriesDetail;
