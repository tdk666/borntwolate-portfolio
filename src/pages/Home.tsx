import { SEO } from '../components/SEO';
import Hero from '../components/Hero';
import { useTranslation, Trans } from 'react-i18next';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const FEATURED_SERIES = [
    { id: 'retro-mountain',      title: 'Retro Mountain',        cover: '/images/retro-mountain/mountain-retro.avif',      film: 'Rollei Retro 400S' },
    { id: 'winter-in-the-fruit', title: 'A Winter in the Fruit', cover: '/images/winter-in-the-fruit/empire-state.avif',   film: 'Kodak Portra 400'  },
    { id: 'mauvais-garcons',     title: 'Mauvais Garçons',       cover: '/images/mauvais-garcons/le-rendez-vous.avif',     film: 'Kodak Gold 200'    },
    { id: 'puglia-famiglia',     title: 'Puglia Famiglia',       cover: '/images/puglia/vespa.avif',                       film: 'CineStill 400D'    },
];

const Home = () => {
    const { t } = useTranslation();

    return (
        <>
            <SEO
                title="Théophile Dequecker | Photographe Argentique Paris"
                description={t('home.seo_desc')}
                url="/"
            />
            <Hero />
            
            <section className="bg-deep-black text-silver py-24 px-6 md:px-12 border-t border-white/5 font-sans">
                <div className="max-w-4xl mx-auto text-center">
                    <h2 className="text-3xl md:text-5xl font-serif italic mb-8 text-off-white">
                        <Trans i18nKey="home.manifest_title" />
                    </h2>
                    <div className="text-lg md:text-xl font-light leading-relaxed mb-6 text-silver/80 text-justify md:text-left drop-cap">
                        <Trans i18nKey="home.manifest_p1" components={{ 1: <strong /> }} />
                    </div>
                    <div className="text-lg md:text-xl font-light leading-relaxed mb-12 text-silver/80 text-justify md:text-left">
                        <Trans i18nKey="home.manifest_p2" />
                    </div>
                    
                    <div className="flex flex-col md:flex-row justify-center items-center gap-4">
                        <Link to="/photographe-argentique" className="btn-ghost">
                            <span>{t('home.manifest_cta_explore')}</span>
                        </Link>
                        <Link to="/prints" className="btn-primary">
                            <span>{t('home.manifest_cta_buy')}</span>
                        </Link>
                    </div>
                </div>
            </section>

            {/* SERIES STRIP — visual discovery, reduces bounce */}
            <section className="bg-deep-black pb-24 px-6 md:px-12">
                <div className="max-w-6xl mx-auto">
                    <div className="flex items-center gap-4 mb-10">
                        <span className="font-space-mono text-[10px] tracking-[0.4em] uppercase text-darkroom-red">
                            {t('nav.series', 'Séries')}
                        </span>
                        <span className="flex-1 h-px bg-white/5" />
                        <Link
                            to="/series"
                            className="font-space-mono text-[10px] tracking-widest uppercase text-silver/30 hover:text-silver/70 transition-colors duration-300"
                        >
                            {t('home.see_all', 'Tout voir')} →
                        </Link>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-3">
                        {FEATURED_SERIES.map((s, i) => (
                            <motion.div
                                key={s.id}
                                initial={{ opacity: 0, y: 16 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: '-40px' }}
                                transition={{ duration: 0.7, delay: i * 0.08 }}
                            >
                                <Link
                                    to={`/series/${s.id}`}
                                    className="group relative block aspect-square overflow-hidden bg-white/5"
                                >
                                    <img
                                        src={s.cover}
                                        alt={`Série photographique argentique ${s.title}`}
                                        className="w-full h-full object-cover opacity-60 group-hover:opacity-90 group-hover:scale-105 transition-all duration-700 ease-out"
                                        loading="lazy"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />
                                    <div className="absolute bottom-0 left-0 right-0 p-4">
                                        <p className="font-space-mono text-[9px] tracking-widest uppercase text-darkroom-red mb-1 opacity-80">
                                            {s.film}
                                        </p>
                                        <p className="font-space-mono text-xs md:text-sm uppercase tracking-wider text-off-white font-medium leading-tight">
                                            {s.title}
                                        </p>
                                    </div>
                                </Link>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>
        </>
    );
};

export default Home;
