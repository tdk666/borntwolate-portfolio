import { useTranslation } from 'react-i18next';
import { aboutData } from '../data/about';
import { SEO } from '../components/SEO';
import { FadeIn } from '../components/animations/FadeIn';

const About = () => {
    const { t, i18n } = useTranslation();
    const currentLang = (i18n.language && i18n.language.startsWith('en')) ? 'en' : 'fr';
    const content = aboutData[currentLang];

    return (
        <div className="min-h-screen pt-24 px-4 md:pt-32 md:px-12 pb-20 flex flex-col md:flex-row gap-8 md:gap-16 max-w-7xl mx-auto items-start">
            <SEO
                title={content.title}
                description={content.text[0]}
                image={aboutData.image}
            />

            {/* Colonne Gauche : Image Portrait */}
            <FadeIn delay={0.2} className="w-full md:w-5/12 md:sticky md:top-32">
                <div className="relative overflow-hidden group border border-white/5 p-2 bg-[#F9F8F4]/5">
                    <div className="overflow-hidden">
                        <img
                            src={aboutData.image}
                            alt="Portrait noir et blanc de Théophile Dequecker, photographe argentique, avec un appareil"
                            className="w-full h-auto grayscale contrast-110 filter sepia-[0.1] transition-all duration-700 group-hover:scale-105 block"
                            width="600"
                            height="400"
                            loading="eager"
                            fetchPriority="high"
                        />
                    </div>
                </div>
            </FadeIn>

            {/* Colonne Droite : Contenu & Manifeste */}
            <FadeIn delay={0.4} className="w-full md:w-6/12 space-y-12 flex flex-col justify-center py-8">
                {/* En-tête */}
                <header>
                    <h1 className="text-6xl md:text-7xl font-serif font-light text-off-white mb-4 italic tracking-tight">
                        {content.title}
                    </h1>
                    <h2 className="text-xl md:text-2xl font-space-mono text-darkroom-red mb-8 tracking-widest uppercase">
                        {content.subtitle}
                    </h2>
                    <div className="h-px w-24 bg-darkroom-red/60 mb-10" />

                    <div className="space-y-6 text-silver font-sans font-light leading-relaxed text-lg text-justify">
                        {content.text.map((paragraph, index) => (
                            <p key={index} className={index === 0 ? "drop-cap text-xl md:text-2xl" : ""}>
                                {paragraph}
                            </p>
                        ))}
                    </div>
                </header>

                {/* Manifeste Technique */}
                <section className="pt-8 border-t border-white/10">
                    <h2 className="text-2xl font-serif italic text-off-white mb-8">
                        {t('about.tech')}
                    </h2>
                    <ul className="space-y-4 font-space-mono text-sm text-silver">
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
            </FadeIn>
        </div>
    );
};

export default About;