import { Link } from 'react-router-dom';
import { SEO } from '../components/SEO';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const NotFound = () => {
    const { t } = useTranslation();

    return (
        <>
            <SEO
                title={t('not_found.seo_title')}
                description={t('not_found.seo_desc')}
            />
            {/* FILM BURN BACKGROUND */}
            <div className="min-h-screen w-full flex flex-col items-center justify-center bg-black text-off-white relative overflow-hidden">
                {/* Heavy Grain Overlay */}
                <div className="absolute inset-0 opacity-[0.35] pointer-events-none film-grain"></div>

                {/* Film Burn / Light Leak Effect */}
                <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(circle_at_70%_20%,rgba(220,50,50,0.4),transparent_60%)] mix-blend-screen pointer-events-none animate-pulse duration-[5000ms]"></div>
                <div className="absolute bottom-0 left-0 w-2/3 h-2/3 bg-[radial-gradient(circle_at_20%_80%,rgba(255,100,50,0.2),transparent_60%)] mix-blend-screen pointer-events-none"></div>

                <motion.div
                    initial={{ opacity: 0, filter: 'blur(10px)' }}
                    animate={{ opacity: 1, filter: 'blur(0px)' }}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                    className="z-10 text-center px-4 relative"
                >
                    <h1 className="font-space-mono text-6xl md:text-9xl font-bold mb-4 text-darkroom-red mix-blend-screen tracking-tighter opacity-90 relative inline-block">
                        <span className="absolute -left-1 -top-0.5 text-blue-500 mix-blend-screen opacity-70 animate-pulse">{t('not_found.title')}</span>
                        {t('not_found.title')}
                    </h1>

                    <div className="w-32 h-0.5 bg-warm-sepia/40 mx-auto my-8"></div>

                    <h2 className="font-space-mono uppercase tracking-widest text-lg md:text-xl mb-4 text-off-white/90">
                        {t('not_found.subtitle')}
                    </h2>

                    <p className="font-inter font-light text-silver max-w-md mx-auto mb-10 opacity-70" dangerouslySetInnerHTML={{ __html: t('not_found.text') }}>
                    </p>

                    <Link
                        to="/"
                        className="inline-flex items-center gap-3 px-8 py-3 border border-white/20 rounded-sm font-space-mono text-xs uppercase tracking-widest hover:bg-white/10 hover:border-warm-sepia hover:text-warm-sepia transition-all duration-300 group"
                    >
                        <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
                        {t('not_found.back')}
                    </Link>
                </motion.div>
            </div>
        </>
    );
};

export default NotFound;
