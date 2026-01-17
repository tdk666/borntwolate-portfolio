import { useParams, Link, Navigate } from 'react-router-dom';
import { SEO } from '../components/SEO';
import { motion, AnimatePresence } from 'framer-motion';
import { seriesData } from '../data/photos';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { useState, useEffect } from 'react';
import Masonry from 'react-masonry-css';
import Lightbox from '../components/Lightbox';
import { useTranslation } from 'react-i18next';
import SeriesNavigation from '../components/SeriesNavigation';
import { useDarkroom } from '../context/DarkroomContext';
import { FadeIn } from '../components/animations/FadeIn';

const SeriesDetail = () => {
    const { id } = useParams<{ id: string }>();
    const { isDarkroom } = useDarkroom();
    const { t, i18n } = useTranslation();
    const currentLang = i18n.language.split('-')[0] as 'fr' | 'en';

    const seriesIndex = seriesData.findIndex((s) => s.id === id);
    const series = seriesData[seriesIndex];
    const [selectedPhotoIndex, setSelectedPhotoIndex] = useState<number | null>(null);

    useEffect(() => {
        window.scrollTo(0, 0);
        const root = document.getElementById('root');
        if (series?.theme && !isDarkroom) {
            document.body.style.backgroundColor = series.theme.background;
            document.body.style.color = series.theme.text;
            if (root) { root.style.backgroundColor = series.theme.background; root.style.color = series.theme.text; }
        }
        return () => {
            document.body.style.backgroundColor = ''; document.body.style.color = '';
            if (root) { root.style.backgroundColor = ''; root.style.color = ''; }
        };
    }, [series, id, isDarkroom]);

    if (!series) {
        return <Navigate to="/404" replace />;
    }

    const nextSeries = seriesData[(seriesIndex + 1) % seriesData.length];
    const prevSeries = seriesData[(seriesIndex - 1 + seriesData.length) % seriesData.length];

    const handleNextPhoto = () => selectedPhotoIndex !== null && setSelectedPhotoIndex((prev) => (prev! + 1) % series.photos.length);
    const handlePrevPhoto = () => selectedPhotoIndex !== null && setSelectedPhotoIndex((prev) => (prev! - 1 + series.photos.length) % series.photos.length);

    // HYBRID FLUID TYPOGRAPHY LOGIC (Mobile & Desktop)
    // 1. Split title into lines based on length (Short: 1 word/line, Long: 2 words/line)
    // 2. Calculate font size based on the longest line to fill the width

    const words = series.title.split(' ');
    // Threshold increased to 18 to include "Puglia Famiglia" (15) & "Psychadelic MTL" (15) in the 'Short' stack logic (1 word/line)
    const isShortTitle = series.title.length <= 18;
    let lines: string[] = [];

    if (isShortTitle) {
        // 1 word per line
        lines = words;
    } else {
        // 2 words per line (grouping)
        for (let i = 0; i < words.length; i += 2) {
            lines.push(words.slice(i, i + 2).join(' '));
        }
    }

    // Find the longest line to calculate the scaling factor
    const longestLineChars = Math.max(...lines.map(line => line.length));

    // Desktop Calculation (Target STRICT ~35vw width to avoid overlap)
    // Left col is ~37vw (5/12 of 90vw). Factor reduced to 50 for absolute safety (fixes "White Mounts").
    const desktopFactor = 50;
    const desktopSize = `${desktopFactor / longestLineChars}vw`;

    // Mobile Calculation (Target ~90vw width)
    // Factor: 90 / 0.6 = 150. 
    // Increased to 120 for "Monumental" mobile feel (was 100), safe within margins.
    const mobileFactor = 120;
    const mobileSize = `${mobileFactor / longestLineChars}vw`;

    // Création du Schema.org "ImageGallery" dynamique
    const gallerySchema = {
        "@type": "ImageGallery",
        "name": series.title,
        "description": series.description[currentLang],
        "author": { "@type": "Person", "name": "Théophile Dequecker" },
        "locationCreated": { "@type": "Place", "name": series.title }, // Fallback to title as location is not in data
        "image": series.photos.map(photo => ({
            "@type": "ImageObject",
            "contentUrl": `https://borntwolate.com${photo.url}`,
            "name": photo.alt_accessible?.[currentLang] || photo.title,
            "description": photo.caption_artistic?.[currentLang] || photo.title,
            "author": "Théophile Dequecker"
        }))
    };

    return (
        <div key={id} className="min-h-screen pt-24 px-4 md:px-8 pb-12 transition-colors duration-1000 ease-in-out">
            <SEO
                title={series.seo_title?.[currentLang] || `Série ${series.title} | Photographie Argentique | Born Too Late`}
                description={series.description[currentLang].substring(0, 160)}
                image={series.coverImage}
                url={`/series/${series.id}`}
                type="article"
                schema={gallerySchema}
            />

            {/* LATERAL NAVIGATION (Disabled when Lightbox is open) */}
            <SeriesNavigation
                nextId={nextSeries.id}
                prevId={prevSeries.id}
                isActive={selectedPhotoIndex === null}
            />

            <div className="relative w-full px-6 md:px-12 mb-24 mt-12 grid grid-cols-1 md:grid-cols-12 gap-8 items-center">

                {/* COLONNE GAUCHE : Titre Sticky & Monumental */}
                <div className="md:col-span-5 md:sticky md:top-32 z-10">
                    <FadeIn delay={0.2}>
                        <span className="block font-space-mono text-xs text-darkroom-red uppercase tracking-widest mb-4">
                            {t('series_detail.series_no')} {seriesData.length - seriesIndex} — {series.year}
                        </span>
                        <h1
                            className="font-bold font-space-mono uppercase tracking-tighter leading-[0.8] mb-8 text-outline cursor-default whitespace-nowrap"
                            style={{ color: isDarkroom ? undefined : series.theme?.text }}
                        >
                            {/* Mobile Structure: Fluid based on mobileSize */}
                            <span
                                className="md:hidden block"
                                style={{ fontSize: `clamp(2rem, ${mobileSize}, 10rem)` }}
                            >
                                {lines.map((line, i) => (
                                    <span key={i} className="block">{line}</span>
                                ))}
                            </span>

                            {/* Desktop Structure: Fluid based on desktopSize */}
                            <span
                                className="hidden md:block"
                                style={{ fontSize: `clamp(3rem, ${desktopSize}, 12rem)` }}
                            >
                                {lines.map((line, i) => (
                                    <span key={i} className="block">{line}</span>
                                ))}
                            </span>
                        </h1>
                    </FadeIn>
                </div>

                {/* COLONNE DROITE : Texte Éditorial */}
                <div className="md:col-span-7">
                    <FadeIn delay={0.6}>
                        <div className="prose prose-invert prose-lg max-w-none">
                            {/* Utilisation de la Lettrine CSS définie plus tôt */}
                            <p className="font-inter font-light text-xl md:text-2xl leading-relaxed text-justify drop-cap opacity-90">
                                {series.description[currentLang]}
                            </p>
                        </div>
                    </FadeIn>
                </div>
            </div>

            <div className="w-full max-w-[90%] mx-auto">
                <Masonry breakpointCols={{ default: 2, 700: 1 }} className="my-masonry-grid flex w-full mx-auto -ml-4 md:-ml-10" columnClassName="pl-4 md:pl-10 bg-clip-padding space-y-10">
                    {series.photos.map((photo, index) => (
                        <motion.figure
                            key={photo.id}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "0px 0px -50px 0px" }}
                            transition={{ duration: 0.8, delay: index * 0.05, ease: "easeOut" }}
                            className="mb-10 gallery-matting cursor-examine relative group block m-0 bg-white/5 min-h-[200px] focus:outline-none focus:ring-2 focus:ring-current focus:ring-offset-4 focus:ring-offset-black rounded-sm"
                            onClick={() => setSelectedPhotoIndex(index)}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter' || e.key === ' ') {
                                    e.preventDefault();
                                    setSelectedPhotoIndex(index);
                                }
                            }}
                            tabIndex={0}
                            role="button"
                            aria-label={`Agrandir la photo : ${photo.title}`}
                        >
                            <img
                                src={photo.url}
                                alt={photo.alt_accessible?.[currentLang] || photo.title}
                                loading={index < 2 ? "eager" : "lazy"}
                                fetchPriority={index < 2 ? "high" : "auto"}
                                decoding={index < 2 ? "sync" : "async"}
                                className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-[1.01]"
                                onContextMenu={(e) => e.preventDefault()}
                                draggable="false"
                            />
                            <figcaption className="absolute inset-0 flex items-end justify-center pb-6 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                                <span className="text-off-white font-space-mono text-sm uppercase tracking-widest transform translate-y-0 md:translate-y-2 md:group-hover:translate-y-0 transition-transform duration-500 drop-shadow-md">
                                    {photo.title}
                                </span>
                            </figcaption>
                        </motion.figure>
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
