import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { SEO } from '../components/SEO';
import NotFound from './NotFound';
import { motion, AnimatePresence } from 'framer-motion';
import { seriesData } from '../data/photos';
import { useState, useEffect } from 'react';
import Masonry from 'react-masonry-css';
import Lightbox from '../components/Lightbox';
import { useTranslation } from 'react-i18next';
import SeriesNavigation from '../components/SeriesNavigation';
import { useDarkroom } from '../context/DarkroomContext';
import { FadeIn } from '../components/animations/FadeIn';
import { GrainedImage } from '../components/GrainedImage';
import { StructuredData } from '../components/StructuredData';

const SeriesDetail = () => {
    const { id, photoId } = useParams<{ id: string; photoId?: string }>();
    const { isDarkroom } = useDarkroom();
    const { t, i18n } = useTranslation();
    const currentLang = i18n.language.split('-')[0] as 'fr' | 'en';

    const currentSeries = seriesData.find((s) => s.id === id);
    const seriesIndex = seriesData.findIndex((s) => s.id === id);

    // Robust Check: Redirect if series not found
    if (!currentSeries) {
        return <NotFound />;
    }

    const breadcrumbSchema = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
            { "@type": "ListItem", "position": 1, "name": "Accueil", "item": "https://borntwolate.com" },
            { "@type": "ListItem", "position": 2, "name": "Portfolio", "item": "https://borntwolate.com/portfolio" },
            { "@type": "ListItem", "position": 3, "name": currentSeries.title, "item": `https://borntwolate.com/series/${currentSeries.id}` }
        ]
    };

    const series = currentSeries;
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

    // Deep Linking Effect
    useEffect(() => {
        if (photoId && series) {
            const index = series.photos.findIndex(p => p.slug === photoId);
            if (index !== -1) setSelectedPhotoIndex(index);
        }
    }, [photoId, series]);


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

    return (
        <div key={id} className="min-h-screen pt-24 px-4 md:px-8 pb-12 transition-colors duration-1000 ease-in-out">
            <Helmet>
                <script type="application/ld+json">{JSON.stringify(breadcrumbSchema)}</script>
            </Helmet>
            <SEO
                title={series.seo_title?.[currentLang] || `Série ${series.title} | Photographie Argentique | Born Too Late`}
                description={series.description[currentLang].substring(0, 160)}
                image={series.coverImage}
                url={`/series/${series.id}`}
                type="article"
            />
            {/* Generate distinct Product Schema for each photo */}
            <StructuredData type="series" seriesId={series.id} />

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
                            {t('series_detail.series_no')} {seriesData.length - seriesIndex} — <time dateTime="2024">{typeof series.year === 'string' ? series.year : series.year[currentLang]}</time>
                        </span>
                        <h1
                            className="font-space-mono font-bold uppercase tracking-tighter leading-[0.8] mb-8 text-outline cursor-default whitespace-nowrap"
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
                            <div className="group-hover:scale-[1.01] transition-transform duration-700 ease-out">
                                <GrainedImage
                                    src={photo.url}
                                    alt={photo.alt_accessible?.[currentLang] || `Photographie argentique grainée, ${series.title}, ${photo.title}, tirage limité`}
                                    orientation={photo.orientation}
                                    loading={index < 2 ? "eager" : "lazy"}
                                    fetchPriority={index < 2 ? "high" : "auto"}
                                    className="w-full h-full"
                                    onClick={() => setSelectedPhotoIndex(index)}
                                />
                            </div>
                            <figcaption className="absolute inset-0 flex items-end justify-center pb-6 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-[60]">
                                <span className="text-off-white font-space-mono text-sm uppercase tracking-widest transform translate-y-0 md:translate-y-2 md:group-hover:translate-y-0 transition-transform duration-500 drop-shadow-md">
                                    {photo.title}
                                </span>
                            </figcaption>
                        </motion.figure>
                    ))}
                </Masonry>

            </div>

            {/* MAILLAGE SÉMANTIQUE (Semantic Linking) */}
            <FadeIn delay={0.8} className="w-full max-w-4xl mx-auto mt-24 mb-12 border-t border-white/10 pt-12 px-6">
                <h3 className="font-serif italic text-2xl text-off-white mb-6 text-center">{t('series_detail.see_also', { defaultValue: "Dans la même atmosphère..." })}</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <Link to={`/series/${prevSeries.id}`} className="group relative block overflow-hidden aspect-[3/2]">
                        <div className="absolute inset-0 bg-black/40 group-hover:bg-transparent transition-colors duration-500 z-10" />
                        <img src={prevSeries.coverImage} alt={prevSeries.title} className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 grayscale group-hover:grayscale-0" />
                        <div className="absolute bottom-4 left-4 z-20">
                            <span className="font-space-mono text-xs text-darkroom-red uppercase tracking-widest block mb-1">{t('series_detail.previous_series', { defaultValue: "Série Précédente" })}</span>
                            <span className="font-space-mono text-xl text-off-white uppercase tracking-widest">{prevSeries.title}</span>
                        </div>
                    </Link>
                    <Link to={`/series/${nextSeries.id}`} className="group relative block overflow-hidden aspect-[3/2]">
                        <div className="absolute inset-0 bg-black/40 group-hover:bg-transparent transition-colors duration-500 z-10" />
                        <img src={nextSeries.coverImage} alt={nextSeries.title} className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 grayscale group-hover:grayscale-0" />
                        <div className="absolute bottom-4 right-4 z-20 text-right">
                            <span className="font-space-mono text-xs text-darkroom-red uppercase tracking-widest block mb-1">{t('series_detail.next_series', { defaultValue: "Série Suivante" })}</span>
                            <span className="font-space-mono text-xl text-off-white uppercase tracking-widest">{nextSeries.title}</span>
                        </div>
                    </Link>
                </div>
            </FadeIn>



            {/* Redundant navigation removed as per user request (replaced by Semantic Linking above) */}

            <AnimatePresence>
                {selectedPhotoIndex !== null && (
                    <Lightbox
                        photo={series.photos[selectedPhotoIndex as number]}
                        onClose={() => setSelectedPhotoIndex(null)}
                        onNext={handleNextPhoto}
                        onPrev={handlePrevPhoto}
                        showContextualLink={true}
                    />
                )}
            </AnimatePresence>
        </div >
    );
};
export default SeriesDetail;
