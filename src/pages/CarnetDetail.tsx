import { useParams, Link, Navigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { SEO } from '../components/SEO';
import { carnets } from '../data/carnets';
import { ArrowLeft } from 'lucide-react';

const CarnetDetail = () => {
    const { id } = useParams<{ id: string }>();
    const { i18n } = useTranslation();
    const lang = i18n.language.startsWith('en') ? 'en' : 'fr';

    const carnet = carnets.find(c => c.id === id);
    if (!carnet) return <Navigate to="/carnets" replace />;

    const seo = carnet.seo[lang];
    const content = carnet.content[lang];
    const location = carnet.location[lang];

    // Split content: first 2 paragraphs, then inline photo 1, next paragraph, inline photo 2, last paragraph
    const [p0, p1, p2, p3, p4] = content;

    const articleSchema = {
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: carnet.title,
        description: seo.description,
        image: `https://borntwolate.com${carnet.coverImage}`,
        author: {
            '@type': 'Person',
            name: 'Théophile Dequecker',
            url: 'https://borntwolate.com',
        },
        publisher: {
            '@type': 'Organization',
            name: 'Borntwolate',
            url: 'https://borntwolate.com',
        },
        datePublished: '2024-01-01',
        inLanguage: lang === 'fr' ? 'fr-FR' : 'en-US',
    };

    return (
        <div className="min-h-screen bg-deep-black text-off-white">
            <SEO
                title={seo.title}
                description={seo.description}
                image={carnet.coverImage}
                url={`/carnets/${carnet.id}`}
                type="article"
                structuredData={articleSchema}
            />

            {/* COVER — full bleed */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1.2 }}
                className="relative h-[75vh] overflow-hidden"
            >
                <img
                    src={carnet.coverImage}
                    alt={carnet.coverAlt[lang]}
                    className="w-full h-full object-cover object-center"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-deep-black" />
            </motion.div>

            {/* CONTENT */}
            <article className="max-w-2xl mx-auto px-6 pb-32">

                {/* HEADER */}
                <motion.header
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.3 }}
                    className="-mt-16 relative z-10 mb-20 text-center"
                >
                    <p className="font-space-mono text-[10px] tracking-[0.3em] uppercase text-darkroom-red mb-4">
                        {carnet.film}
                    </p>
                    <h1 className="font-serif text-5xl md:text-6xl italic font-light text-off-white mb-4">
                        {carnet.title}
                    </h1>
                    <p className="font-space-mono text-xs tracking-widest text-silver/50 uppercase">
                        {location}
                    </p>
                </motion.header>

                {/* BODY */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.6 }}
                    className="space-y-8 text-silver/75 text-lg leading-relaxed font-light"
                >
                    <p>{p0}</p>
                    <p>{p1}</p>
                </motion.div>

                {/* INLINE PHOTO 1 */}
                {carnet.inlinePhotos[0] && (
                    <motion.figure
                        initial={{ opacity: 0, y: 16 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: '-80px' }}
                        transition={{ duration: 0.8 }}
                        className={`my-16 group ${carnet.inlinePhotos[0].orientation === 'portrait' ? 'max-w-xs mx-auto' : '-mx-6 md:-mx-16'}`}
                    >
                        <div className="overflow-hidden">
                            <img
                                src={carnet.inlinePhotos[0].src}
                                alt={carnet.inlinePhotos[0].alt[lang]}
                                className="w-full object-cover opacity-90 group-hover:opacity-100 group-hover:scale-[1.03] transition-all duration-700 ease-out"
                            />
                        </div>
                        <figcaption className="mt-4 text-center font-space-mono text-[10px] tracking-widest uppercase text-darkroom-red opacity-70">
                            {carnet.inlinePhotos[0].caption[lang]}
                        </figcaption>
                    </motion.figure>
                )}

                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="space-y-8 text-silver/75 text-lg leading-relaxed font-light"
                >
                    <p>{p2}</p>
                    <p>{p3}</p>
                </motion.div>

                {/* INLINE PHOTO 2 */}
                {carnet.inlinePhotos[1] && (
                    <motion.figure
                        initial={{ opacity: 0, y: 16 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: '-80px' }}
                        transition={{ duration: 0.8 }}
                        className={`my-16 group ${carnet.inlinePhotos[1].orientation === 'portrait' ? 'max-w-xs mx-auto' : '-mx-6 md:-mx-16'}`}
                    >
                        <div className="overflow-hidden">
                            <img
                                src={carnet.inlinePhotos[1].src}
                                alt={carnet.inlinePhotos[1].alt[lang]}
                                className="w-full object-cover opacity-90 group-hover:opacity-100 group-hover:scale-[1.03] transition-all duration-700 ease-out"
                            />
                        </div>
                        <figcaption className="mt-4 text-center font-space-mono text-[10px] tracking-widest uppercase text-darkroom-red opacity-70">
                            {carnet.inlinePhotos[1].caption[lang]}
                        </figcaption>
                    </motion.figure>
                )}

                {/* LAST PARAGRAPH — signature */}
                {p4 && (
                    <motion.p
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="text-silver/50 text-base font-space-mono tracking-wide border-t border-white/5 pt-10 mt-10"
                    >
                        {p4}
                    </motion.p>
                )}

                {/* CTA */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="mt-20 flex flex-col sm:flex-row items-center justify-between gap-6 pt-10 border-t border-white/5"
                >
                    <Link
                        to="/carnets"
                        className="flex items-center gap-2 text-silver/40 hover:text-silver/80 transition-colors font-space-mono text-xs uppercase tracking-widest"
                    >
                        <ArrowLeft size={14} />
                        {lang === 'fr' ? 'Tous les carnets' : 'All field notes'}
                    </Link>

                    <Link
                        to={carnet.seriesUrl}
                        className="btn-primary"
                    >
                        <span>{lang === 'fr' ? 'Voir les tirages' : 'View prints'}</span>
                    </Link>
                </motion.div>
            </article>
        </div>
    );
};

export default CarnetDetail;
