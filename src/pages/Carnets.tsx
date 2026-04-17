import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { SEO } from '../components/SEO';
import { carnets } from '../data/carnets';

const Carnets = () => {
    const { i18n } = useTranslation();
    const lang = i18n.language.startsWith('en') ? 'en' : 'fr';

    const seoFr = {
        title: 'Carnets | Notes de terrain — Borntwolate',
        description: 'Journal de bord d\'un photographe argentique. Les coulisses des séries, les films choisis, les instants d\'avant et d\'après.',
    };
    const seoEn = {
        title: 'Field Notes | Analog Photography Journal — Borntwolate',
        description: 'A film photographer\'s field journal. Behind the series, the films chosen, the moments before and after.',
    };
    const seo = lang === 'fr' ? seoFr : seoEn;

    return (
        <div className="min-h-screen bg-deep-black text-off-white pt-32 pb-32 px-6 md:px-12">
            <SEO
                title={seo.title}
                description={seo.description}
                url="/carnets"
            />

            {/* HEADER */}
            <motion.header
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="max-w-4xl mx-auto mb-24"
            >
                <p className="font-space-mono text-[10px] tracking-[0.4em] uppercase text-darkroom-red mb-6">
                    {lang === 'fr' ? 'Notes de terrain' : 'Field Notes'}
                </p>
                <h1 className="font-serif text-5xl md:text-6xl italic font-light text-off-white mb-6">
                    {lang === 'fr' ? 'Carnets' : 'Journal'}
                </h1>
                <p className="text-silver/50 font-light text-lg max-w-lg">
                    {lang === 'fr'
                        ? 'Les coulisses des séries. Les films choisis. Ce qu\'on cherchait avant de trouver.'
                        : 'Behind the series. The films chosen. What was sought before it was found.'}
                </p>
            </motion.header>

            {/* LISTING */}
            <div className="max-w-4xl mx-auto space-y-2">
                {[...carnets].sort((a, b) => {
                    const order = ['polish-hike', 'white-mounts', 'puglia-famiglia', 'retro-mountain', 'winter-in-the-fruit', 'psychadelic-mtl', 'canadian-evasion', 'mauvais-garcons'];
                    return order.indexOf(a.id) - order.indexOf(b.id);
                }).map((carnet, i) => (
                    <motion.div
                        key={carnet.id}
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.1 + i * 0.1 }}
                    >
                        <Link
                            to={`/carnets/${carnet.id}`}
                            className="group flex flex-col md:flex-row gap-0 border-b border-white/5 hover:border-white/20 transition-colors duration-500"
                        >
                            {/* IMAGE */}
                            <div className="w-full md:w-64 h-48 md:h-40 overflow-hidden flex-shrink-0">
                                <img
                                    src={carnet.coverImage}
                                    alt={carnet.coverAlt[lang]}
                                    className="w-full h-full object-cover opacity-70 group-hover:opacity-100 transition-opacity duration-700 group-hover:scale-105 transform"
                                />
                            </div>

                            {/* TEXT */}
                            <div className="flex flex-col justify-center py-6 md:pl-10 gap-3">
                                <p className="font-space-mono text-[9px] tracking-[0.3em] uppercase text-darkroom-red">
                                    {carnet.film}
                                </p>
                                <h2 className="font-serif text-2xl md:text-3xl italic font-light text-off-white group-hover:text-warm-sepia transition-colors duration-300">
                                    {carnet.title}
                                </h2>
                                <p className="font-space-mono text-xs text-silver/40 uppercase tracking-widest">
                                    {carnet.location[lang]}
                                </p>
                                <p className="text-silver/50 text-sm font-light mt-1 max-w-md line-clamp-2">
                                    {carnet.content[lang][0]}
                                </p>
                            </div>
                        </Link>
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

export default Carnets;
