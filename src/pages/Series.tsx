import { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import { seriesData as series } from '../data/photos';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { SEO } from '../components/SEO'; // <--- AJOUT SEO

const Series = () => {
    const { t, i18n } = useTranslation();
    const [columns, setColumns] = useState(1);

    // Handle Window Resize for responsive columns
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 768) setColumns(2);
            else setColumns(1);
        };

        handleResize(); // Init
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // DISTRIBUTE SERIES INTO COLUMNS (Masonry Logic)
    const distributedSeries = useMemo(() => {
        const cols: typeof series[] = Array.from({ length: columns }, () => []);
        const heights = new Array(columns).fill(0);

        series.forEach((seriesItem) => {
            const coverPhoto = seriesItem.photos.find(p => p.url === seriesItem.coverImage);
            const isPortrait = coverPhoto?.orientation === 'portrait';
            const shortestColIndex = heights.indexOf(Math.min(...heights));

            cols[shortestColIndex].push(seriesItem);
            const heightToAdd = isPortrait ? 1.6 : 1.0;
            heights[shortestColIndex] += heightToAdd;
        });

        return cols;
    }, [columns]);

    return (
        <div className="min-h-screen pt-32 px-4 md:px-12 pb-20">
            {/* SEO META DESCRIPTION */}
            {/* SEO META DESCRIPTION */}
            <SEO
                title={t('series_seo.title')}
                description={t('series_seo.desc')}
            />

            <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="text-5xl md:text-7xl font-space-mono font-bold text-off-white mb-16 text-center uppercase tracking-tighter hover-analog"
            >
                {t('nav.series')}
            </motion.h1>

            <div className="flex gap-12 md:gap-20 items-start">
                {distributedSeries.map((column, colIndex) => (
                    <div key={colIndex} className="flex flex-col gap-12 md:gap-20 flex-1 min-w-0">
                        {column.map((seriesItem, index) => {
                            // OPTIMISATION LCP :
                            // On charge en priorité la première image de chaque colonne (les 2 du haut sur desktop)
                            const isPriority = index === 0;
                            const coverPhoto = seriesItem.photos.find(p => p.url === seriesItem.coverImage);

                            return (
                                <motion.div
                                    key={seriesItem.id}
                                    initial={{ opacity: 0, y: 40 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.8, delay: index * 0.2 }}
                                    className="group relative cursor-pointer"
                                >
                                    <Link
                                        to={`/series/${seriesItem.id}`}
                                        className="block focus:outline-none focus:ring-2 focus:ring-darkroom-red focus:ring-offset-4 focus:ring-offset-black rounded-sm"
                                        aria-label={t('series_seo.aria_view', { title: seriesItem.title })}
                                    >
                                        <div className="overflow-hidden mb-6 bg-gray-900 border border-white/10"> {/* Fond gris pour éviter flash */}
                                            <img
                                                src={seriesItem.coverImage}
                                                alt={coverPhoto?.alt_accessible?.[i18n.language.startsWith('en') ? 'en' : 'fr'] || seriesItem.title}
                                                className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105 block"
                                                // PERFORMANCE
                                                loading={isPriority ? "eager" : "lazy"}
                                                fetchPriority={isPriority ? "high" : "auto"}
                                                decoding="async"
                                            />
                                        </div>
                                        <div className="flex justify-between items-baseline border-b border-silver/20 pb-4 group-hover:border-warm-sepia transition-colors duration-500">
                                            <h2 className="text-2xl md:text-3xl font-space-mono text-off-white group-hover:text-warm-sepia transition-colors duration-300">
                                                {seriesItem.title}
                                            </h2>
                                            <span className="text-sm font-inter text-silver opacity-60">{seriesItem.year}</span>
                                        </div>
                                        <p className="mt-4 text-silver font-inter text-sm max-w-md opacity-80 group-hover:opacity-100 transition-opacity">
                                            {seriesItem.description[i18n.language.startsWith('en') ? 'en' : 'fr']}
                                        </p>
                                    </Link>
                                </motion.div>
                            );
                        })}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Series;
