import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { aboutData } from '../data/about';
import { SEO } from '../components/SEO'; // <--- 1. AJOUT DE L'IMPORT MANQUANT

const About = () => {
    const { t, i18n } = useTranslation();
    const currentLang = i18n.language.split('-')[0] as 'fr' | 'en';
    const content = aboutData.manifesto;

    return (
        <div className="min-h-screen pt-24 px-4 md:pt-32 md:px-12 pb-20 flex flex-col md:flex-row gap-8 md:gap-16 max-w-7xl mx-auto items-start">
            {/* 2. AJOUT DU COMPOSANT SEO */}
            <SEO
                title={t('nav.about')}
                description="Biographie et manifeste artistique de Théophile Dequecker. Une approche 'Born Too Late' de la photographie : argentique, lenteur et chimie."
                image="https://borntwolate.com/images/canadian-evasion/autoportrait.JPG"
            />

            {/* Colonne Gauche : Image Portrait */}
            <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                className="w-full md:w-5/12 md:sticky md:top-32"
            >
                <div className="relative overflow-hidden group border border-white/5 p-2 bg-[#F9F8F4]/5">
                    <div className="overflow-hidden">
                        <img
                            src="/images/canadian-evasion/autoportrait.JPG"
                            alt="Théophile Dequecker - Autoportrait face à la mer" // 3. ALT TEXT PLUS PRÉCIS
                            className="w-full h-auto grayscale contrast-110 filter sepia-[0.1] transition-all duration-700 group-hover:scale-105 block"
                            width="600" // 4. TAILLES EXPLICITES POUR ÉVITER LE CLS
                            height="400"
                            loading="eager" // 5. PRIORITÉ HAUTE (Au-dessus de la ligne de flottaison)
                            fetchPriority="high"
                        />
                    </div>
                    <div className="flex justify-between items-baseline mt-4 px-1">
                        <p className="text-xs font-space-mono text-darkroom-red uppercase tracking-widest">
                            Fig. 01
                        </p>
                        <p className="text-xs font-space-mono text-silver/60 uppercase tracking-widest text-right">
                            Face au Large, 2023
                        </p>
                    </div>
                </div>
            </motion.div>

            {/* Colonne Droite : Contenu & Manifeste */}
            <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="w-full md:w-6/12 space-y-20 flex flex-col justify-center py-8"
            >
                {/* En-tête Manifeste */}
                <header>
                    <h1 className="text-6xl md:text-7xl font-serif font-light text-off-white mb-8 italic tracking-tight">
                        Théophile Dequecker
                    </h1>
                    <div className="h-px w-24 bg-darkroom-red/60 mb-10" />

                    <div className="space-y-8 text-silver font-sans font-light leading-relaxed text-lg text-justify">
                        <p className="text-xl font-serif text-off-white/90 italic border-l-2 border-darkroom-red pl-6 py-2">
                            {content.intro[currentLang]}
                        </p>
                        <p>
                            <span className="text-off-white font-medium uppercase tracking-wider text-sm mr-2 font-space-mono">Born Too Late</span>
                            {content.bornTooLate[currentLang]}
                        </p>
                        <p>
                            {content.exploration[currentLang]}
                        </p>
                        <p>
                            {content.archive[currentLang]}
                        </p>
                    </div>
                </header>

                {/* Timeline */}
                <section>
                    <h2 className="text-2xl font-serif italic text-off-white mb-8 border-b border-white/10 pb-4">
                        {t('about.title')}
                    </h2>
                    <div className="relative border-l border-white/10 ml-3 space-y-12 pb-4">
                        {content.timeline.map((item, index) => (
                            <div key={index} className="relative pl-8 group">
                                <div className={`absolute -left-[5px] top-2 w-2.5 h-2.5 rounded-full transition-transform group-hover:scale-125 ${index === 0 ? 'bg-darkroom-red' : index === 1 ? 'bg-silver' : 'bg-off-white'}`} />
                                <span className={`text-xs font-space-mono uppercase tracking-widest mb-1 block ${index === 0 ? 'text-darkroom-red' : index === 1 ? 'text-silver' : 'text-off-white'}`}>
                                    {item.year}
                                </span>
                                <h3 className="text-off-white font-serif text-2xl mb-2 italic">
                                    {item.title[currentLang]}
                                </h3>
                                <p className="text-silver/80 font-sans text-base md:text-sm font-light leading-relaxed"> {/* Augmenté opacité de 100 à 80 pour contraste */}
                                    {item.desc[currentLang]}
                                </p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Manifeste Technique */}
                <section>
                    <h2 className="text-2xl font-serif italic text-off-white mb-8 border-b border-white/10 pb-4">
                        {t('about.tech')}
                    </h2>
                    <ul className="space-y-4 font-space-mono text-sm text-silver/80">
                        <li className="flex justify-between items-center group border-b border-white/5 pb-2">
                            <span className="group-hover:text-darkroom-red transition-colors">{t('about.cameras')}</span>
                            <span className="text-off-white">Rollei 35, Nikon F-301</span>
                        </li>
                        <li className="flex justify-between items-center group border-b border-white/5 pb-2">
                            <span className="group-hover:text-darkroom-red transition-colors">{t('about.lenses')}</span>
                            <span className="text-off-white">Tessar 40mm f/3.5, Nikkor 50mm f/1.8</span>
                        </li>
                        <li className="flex justify-between items-center group border-b border-white/5 pb-2">
                            <span className="group-hover:text-darkroom-red transition-colors">{t('about.color')}</span>
                            <span className="text-off-white">CineStill 400D, Portra 400</span>
                        </li>
                        <li className="flex justify-between items-center group border-b border-white/5 pb-2">
                            <span className="group-hover:text-darkroom-red transition-colors">{t('about.bw')}</span>
                            <span className="text-off-white">Rollei Retro 400S</span>
                        </li>
                        <li className="flex justify-between items-center group border-b border-white/5 pb-2">
                            <span className="group-hover:text-darkroom-red transition-colors">{t('about.lab')}</span>
                            {/* 6. LIEN ACCESSIBLE ET SÉCURISÉ */}
                            <a
                                href="https://reportage-image.com/"
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label="Visiter le site du laboratoire Reportage Image"
                                className="text-off-white hover:text-darkroom-red transition-colors border-b border-transparent hover:border-darkroom-red"
                            >
                                Reportage Image ↗
                            </a>
                        </li>
                    </ul>
                </section>
            </motion.div>
        </div>
    );
};

export default About;