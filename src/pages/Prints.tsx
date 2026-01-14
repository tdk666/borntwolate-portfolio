import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { SEO } from '../components/SEO';
import { ArrowRight, ShieldCheck, Frame, PenTool } from 'lucide-react';
import { useTranslation, Trans } from 'react-i18next';

const Prints = () => {
    const { t } = useTranslation();
    return (
        <div className="min-h-screen bg-darkroom-black pt-32 pb-20 px-6 md:px-12">
            <SEO
                title={t('prints.seo_title')}
                description={t('prints.seo_desc')}
                url="/prints"
            />

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="max-w-4xl mx-auto"
            >
                <header className="mb-16 border-b border-white/10 pb-8">
                    <h1 className="text-3xl md:text-5xl font-space-mono font-bold text-off-white uppercase tracking-tighter mb-4">
                        {t('prints.title')}
                    </h1>
                    <p className="font-inter text-silver/60 max-w-xl text-sm md:text-base leading-relaxed">
                        {t('prints.subtitle')}
                    </p>
                </header>

                <div className="grid md:grid-cols-3 gap-8 mb-20">
                    <div className="bg-white/5 p-8 border border-white/5 hover:border-darkroom-red/30 transition-colors group">
                        <PenTool className="text-darkroom-red mb-4" size={32} strokeWidth={1} />
                        <h3 className="text-xl font-space-mono text-off-white uppercase mb-4">{t('prints.signature_title')}</h3>
                        <p className="text-sm text-silver/70 font-inter leading-relaxed text-justify">
                            <Trans i18nKey="prints.signature_text">
                                Tirages <strong>signés et numérotés</strong> (Limité à 30 ex). Certificat d'authenticité inclus.
                            </Trans>
                        </p>
                    </div>

                    <div className="bg-white/5 p-8 border border-white/5 hover:border-darkroom-red/30 transition-colors group">
                        <ShieldCheck className="text-darkroom-red mb-4" size={32} strokeWidth={1} />
                        <h3 className="text-xl font-space-mono text-off-white uppercase mb-4">{t('prints.fine_art_title')}</h3>
                        <p className="text-sm text-silver/70 font-inter leading-relaxed text-justify">
                            <Trans i18nKey="prints.fine_art_text">
                                Impressions réalisées sur papier <strong>Fine Art Hahnemühle</strong> (Baryta ou Photo Rag). Ces papiers d'archive garantissent une profondeur des noirs exceptionnelle, une fidélité chromatique absolue et une conservation &gt; 100 ans.
                            </Trans>
                        </p>
                    </div>

                    <div className="bg-white/5 p-8 border border-white/5 hover:border-darkroom-red/30 transition-colors group">
                        <Frame className="text-darkroom-red mb-4" size={32} strokeWidth={1} />
                        <h3 className="text-xl font-space-mono text-off-white uppercase mb-4">{t('prints.finish_title')}</h3>
                        <p className="text-sm text-silver/70 font-inter leading-relaxed text-justify">
                            {t('prints.finish_text')}
                        </p>
                    </div>
                </div>

                <div className="bg-gradient-to-r from-white/5 to-transparent p-8 md:p-12 border-l-4 border-darkroom-red flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                    <div>
                        <h2 className="text-2xl font-space-mono text-off-white mb-2 uppercase">{t('prints.cta_title')}</h2>
                        <p className="text-silver/80 font-inter text-sm max-w-lg mb-2">
                            <Trans i18nKey="prints.cta_text_price">
                                Collection accessible <strong>à partir de 90€</strong> (Tirage papier seul).
                            </Trans>
                        </p>
                        <p className="text-silver/50 font-inter text-xs italic">
                            {t('prints.cta_text_custom')}
                        </p>
                    </div>

                    <Link
                        to="/contact?subject=acquisition"
                        className="inline-flex items-center gap-3 bg-off-white text-darkroom-black px-8 py-4 font-space-mono uppercase tracking-widest text-sm hover:bg-darkroom-red hover:text-white transition-all duration-300 group whitespace-nowrap"
                    >
                        {t('prints.cta_button')}
                        <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                    </Link>
                </div>
            </motion.div>
        </div>
    );
};
export default Prints;
