import { motion } from 'framer-motion';
import { SEO } from '../components/SEO';
import { useTranslation } from 'react-i18next';

const Legals = () => {
    const { t } = useTranslation();

    return (
        <div className="min-h-screen pt-32 px-6 md:px-12 pb-20 max-w-4xl mx-auto">
            <SEO
                title={t('legals.title')}
                description="Mentions légales, Politique de Confidentialité et Conditions Générales de Vente du site Born Too Late."
            />

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="space-y-12 text-silver font-inter font-light text-sm md:text-base"
            >
                <header className="mb-16 border-b border-white/10 pb-8">
                    <h1 className="text-3xl md:text-5xl font-space-mono font-bold text-off-white uppercase tracking-tighter mb-4">
                        {t('legals.title')}
                    </h1>
                    <p className="text-xs font-space-mono text-darkroom-red uppercase">{t('legals.update')}</p>
                </header>

                {/* --- 1. MENTIONS LÉGALES (LCEN) --- */}
                <section className="space-y-4">
                    <h2 className="text-xl font-space-mono text-off-white uppercase tracking-widest border-l-2 border-darkroom-red pl-4">{t('legals.section1.title')}</h2>

                    <div className="grid md:grid-cols-2 gap-8">
                        <div>
                            <h3 className="font-bold text-off-white mb-2">{t('legals.section1.editor')}</h3>
                            <p>
                                <strong>Théophile Dequecker</strong> (Born Two Late)<br />
                                Paris 14e, France<br />
                                <strong>Directeur de la publication</strong><br />
                                Email : <a href="mailto:theophile.dequecker@gmail.com" className="hover:text-darkroom-red transition-colors underline">theophile.dequecker@gmail.com</a><br />
                                <span className="text-xs opacity-50 italic">SIRET : 940 379 816 00010</span>
                            </p>
                        </div>
                        <div>
                            <h3 className="font-bold text-off-white mb-2">{t('legals.section1.host')}</h3>
                            <p>
                                <strong>Netlify, Inc.</strong><br />
                                44 Montgomery Street, Suite 300<br />
                                San Francisco, California 94104, USA<br />
                                <a href="https://netlify.com" target="_blank" rel="noopener noreferrer" className="hover:text-darkroom-red transition-colors underline">www.netlify.com</a>
                            </p>
                        </div>
                    </div>
                </section>

                {/* --- 2. PROPRIÉTÉ INTELLECTUELLE --- */}
                <section className="space-y-4">
                    <h2 className="text-xl font-space-mono text-off-white uppercase tracking-widest border-l-2 border-darkroom-red pl-4">{t('legals.section2.title')}</h2>
                    <p className="text-justify leading-relaxed" dangerouslySetInnerHTML={{ __html: t('legals.section2.text') }}></p>
                </section>

                {/* --- 3. POLITIQUE DE CONFIDENTIALITÉ (RGPD) --- */}
                <section className="space-y-4">
                    <h2 className="text-xl font-space-mono text-off-white uppercase tracking-widest border-l-2 border-darkroom-red pl-4">{t('legals.section3.title')}</h2>
                    <p className="text-justify leading-relaxed">
                        {t('legals.section3.intro')}
                    </p>
                    <ul className="list-disc pl-5 space-y-2">
                        <li dangerouslySetInnerHTML={{ __html: t('legals.section3.responsible') }}></li>
                        <li dangerouslySetInnerHTML={{ __html: t('legals.section3.data') }}></li>
                        <li dangerouslySetInnerHTML={{ __html: t('legals.section3.purpose') }}></li>
                        <li>
                            <span dangerouslySetInnerHTML={{ __html: t('legals.section3.subcontractors.title') }}></span>
                            <ul className="list-circle pl-5 mt-1 text-silver/80 text-xs">
                                <li dangerouslySetInnerHTML={{ __html: t('legals.section3.subcontractors.netlify') }}></li>
                                <li dangerouslySetInnerHTML={{ __html: t('legals.section3.subcontractors.emailjs') }}></li>
                                <li dangerouslySetInnerHTML={{ __html: t('legals.section3.subcontractors.gemini') }}></li>
                            </ul>
                        </li>
                        <li dangerouslySetInnerHTML={{ __html: t('legals.section3.rights') }}></li>
                    </ul>
                </section>

                {/* --- 4. CGV --- */}
                <section className="space-y-4">
                    <h2 className="text-xl font-space-mono text-off-white uppercase tracking-widest border-l-2 border-darkroom-red pl-4">{t('legals.section4.title')}</h2>
                    <p className="italic text-xs text-silver/60">{t('legals.section4.subtitle')}</p>

                    <div className="space-y-6">
                        <article>
                            <h3 className="font-bold text-off-white">{t('legals.section4.article1.title')}</h3>
                            <p dangerouslySetInnerHTML={{ __html: t('legals.section4.article1.text') }}></p>
                        </article>
                        <article>
                            <h3 className="font-bold text-off-white">{t('legals.section4.article2.title')}</h3>
                            <p dangerouslySetInnerHTML={{ __html: t('legals.section4.article2.text') }}></p>
                        </article>
                        <article>
                            <h3 className="font-bold text-off-white">{t('legals.section4.article3.title')}</h3>
                            <p dangerouslySetInnerHTML={{ __html: t('legals.section4.article3.text') }}></p>
                        </article>
                        <article>
                            <h3 className="font-bold text-off-white">{t('legals.section4.article4.title')}</h3>
                            <p dangerouslySetInnerHTML={{ __html: t('legals.section4.article4.text') }}></p>
                        </article>
                    </div>
                </section>

                {/* --- 5. LIVRAISON ET RETOURS (GMC) --- */}
                <section className="space-y-4">
                    <h2 id="shipping-returns" className="text-xl font-space-mono text-off-white uppercase tracking-widest border-l-2 border-darkroom-red pl-4">{t('legals.section5.title')}</h2>
                    <div className="space-y-4 text-justify">
                        <p dangerouslySetInnerHTML={{ __html: t('legals.section5.shipping') }}></p>
                        <p dangerouslySetInnerHTML={{ __html: t('legals.section5.returns') }}></p>
                        <p className="font-bold border-t border-white/5 pt-4">
                            Contact Support : <a href="mailto:theophile.dequecker@gmail.com" className="hover:text-darkroom-red underline">theophile.dequecker@gmail.com</a>
                        </p>
                        <div className="text-xs opacity-70 mt-6 space-y-2">
                             <h3 className="font-bold text-off-white uppercase tracking-widest text-[10px] mb-2">Médiation de la consommation</h3>
                             <p>Conformément aux dispositions du Code de la consommation, le client a le droit de recourir gratuitement à un médiateur de la consommation en vue de la résolution amiable du litige qui l'opposerait à Born Too Late.</p>
                             <p>Médiateur : <strong>CNPM - MÉDIATION CONSOMMATION</strong><br />
                             Site web : <a href="https://www.cnpm-mediation-consommation.eu" target="_blank" rel="noopener noreferrer" className="underline hover:text-darkroom-red">www.cnpm-mediation-consommation.eu</a></p>
                        </div>
                    </div>
                </section>
            </motion.div>
        </div>
    );
};
export default Legals;
