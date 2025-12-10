import { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import { seriesData as series } from '../data/photos';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

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
            // Find cover photo to determine orientation
            const coverPhoto = seriesItem.photos.find(p => p.url === seriesItem.coverImage);
            const isPortrait = coverPhoto?.orientation === 'portrait';

            // Find shortest column
            const shortestColIndex = heights.indexOf(Math.min(...heights));

            // Add to column
            cols[shortestColIndex].push(seriesItem);

            // Update height (Portrait = 1.6, Landscape = 1)
            // We add extra for text height roughly
            const heightToAdd = isPortrait ? 1.6 : 1.0;
            heights[shortestColIndex] += heightToAdd;
        });

        return cols;
    }, [columns]);

    return (
        <div className="min-h-screen pt-32 px-4 md:px-12 pb-20">
            <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="text-4xl md:text-6xl font-space-mono font-bold text-off-white mb-16 text-center tracking-tighter"
            >
                {t('nav.series')}
            </motion.h1>

            <div className="flex gap-12 md:gap-20 items-start">
                {distributedSeries.map((column, colIndex) => (
                    <div key={colIndex} className="flex flex-col gap-12 md:gap-20 flex-1 min-w-0">
                        {column.map((seriesItem, index) => (
                            <motion.div
                                key={seriesItem.id}
                                initial={{ opacity: 0, y: 40 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.8, delay: index * 0.2 }}
                                className="group relative cursor-pointer"
                            >
                                <Link to={`/series/${seriesItem.id}`} className="block">
                                    <div className="overflow-hidden mb-6">
                                        <img
                                            src={seriesItem.coverImage}
                                            alt={seriesItem.title}
                                            className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105"
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
                        ))}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Series;
