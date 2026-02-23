import { useState } from 'react';
import { Eye } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Trans } from 'react-i18next';
import { usePricing } from '../data/pricing';
import { FadeIn } from '../components/animations/FadeIn';
import WallPreview from '../components/WallPreview';
import { SEO } from '../components/SEO';

export default function Prints() {
    const { t } = useTranslation();
    const [isWallPreviewOpen, setIsWallPreviewOpen] = useState(false);
    const pricingCatalog = usePricing();

    // Helper to translate dynamic keys
    const getTranslatedRange = (key: string) => {
        switch (key) {
            case 'collection': return t('pricing.collection', { returnObjects: true }) as any;
            case 'elegance': return t('pricing.elegance', { returnObjects: true }) as any;
            case 'exception': return t('pricing.exception', { returnObjects: true }) as any;
            default: return {};
        }
    };

    return (
        <div className="pt-24 pb-20 px-6 max-w-7xl mx-auto">
            <SEO
                title={t('prints.title')}
                description={t('prints.subtitle')}
                url="/prints"
                type="website"
            />
            <FadeIn>
                {/* HERO SECTION */}
                <header className="text-center mb-20">
                    <h1 className="font-serif text-5xl md:text-7xl mb-8">{t('prints.title')}</h1>
                    <p className="text-white/60 max-w-2xl mx-auto text-lg leading-relaxed">
                        {t('prints.subtitle')}
                    </p>
                </header>

                {/* SECTION SAVOIR-FAIRE & SIMULATION */}
                <div className="grid md:grid-cols-2 gap-16 mb-24 items-center">
                    <div className="space-y-6">
                        <h2 className="font-serif text-3xl">{t('prints.craft_title')}</h2>
                        <p className="text-white/70 leading-relaxed">
                            <Trans i18nKey="prints.craft_text">
                                Chaque tirage est réalisé à la commande par notre laboratoire partenaire Picto Paris.
                                Nous utilisons exclusivement le papier <strong>Canson Infinity Platine Fibre Rag 310g</strong>.
                            </Trans>
                        </p>
                        <div className="pt-4">
                            <Link to="/series" className="text-white underline underline-offset-4 hover:text-white/70 transition-colors">
                                {t('prints.explore_series')}
                                <span className="sr-only">Découvrir l'ensemble des séries photographiques et tirages d'art limités</span>
                            </Link>
                        </div>
                    </div>

                    {/* BOUTON SIMULATION MUR */}
                    <button
                        onClick={() => setIsWallPreviewOpen(true)}
                        className="group relative aspect-square rounded-2xl overflow-hidden border border-white/10"
                        aria-label="Ouvrir le simulateur d'accrochage mural"
                    >
                        <picture aria-hidden="true">
                            <source srcSet="/assets/living-room-bg-wide.avif" type="image/avif" />
                            <source srcSet="/assets/living-room-bg-wide.webp" type="image/webp" />
                            <img
                                src="/assets/living-room-bg-wide.png"
                                alt=""
                                loading="lazy"
                                width="800"
                                height="800"
                                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-50 group-hover:opacity-70"
                            />
                        </picture>
                        <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center" aria-hidden="true">
                            <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mb-6 text-black group-hover:scale-110 transition-transform">
                                <Eye className="w-8 h-8" />
                            </div>
                            <h3 className="font-serif text-2xl text-white mb-2">{t('prints.visualize')}</h3>
                            <p className="text-sm text-white/60 max-w-xs">
                                {t('prints.compare_finish')}
                            </p>
                            <span className="sr-only">Lancer le simulateur de mur interactif pour comparer les cadres et les formats de tirages</span>
                        </div>
                    </button>
                </div>

                {/* CATALOGUE DES PRIX (Informatif) */}
                <div className="border-t border-white/10 pt-16">
                    <h2 className="font-serif text-3xl text-center mb-12">{t('prints.pricing_grid')}</h2>
                    <div className="grid md:grid-cols-3 gap-8">
                        {Object.values(pricingCatalog).map((range) => {
                            const isElegance = range.id === 'elegance';
                            const trKey = range.id === 'galerie' ? 'exception' : range.id; // Mapping compatibility
                            const trRange = getTranslatedRange(trKey);

                            return (
                                <div
                                    key={range.id}
                                    className={`relative p-8 rounded-2xl border transition-all duration-300 group bg-white/5 border-white/10
                                        ${isElegance
                                            ? 'hover:border-darkroom-red hover:shadow-[0_0_40px_rgba(255,0,0,0.2)]'
                                            : 'hover:border-white/30'
                                        }`}
                                >
                                    <h3 className="font-serif text-2xl mb-2 text-white group-hover:text-white transition-colors">{trRange.label || range.label}</h3>
                                    <p className="text-sm text-white/50 mb-6 min-h-[3rem]">{trRange.description}</p>
                                    <div className="space-y-3 mb-8">
                                        {range.variants.map((v) => (
                                            <div key={v.id} className="flex justify-between text-sm border-b border-white/5 pb-2">
                                                <div className="flex flex-col">
                                                    <span className="text-white/80">{v.label}</span>
                                                    {v.details && <span className="text-[10px] text-white/40">{v.details}</span>}
                                                </div>
                                                <span className={`font-medium text-white ${isElegance ? 'group-hover:text-darkroom-red transition-colors' : ''}`}>{v.price} €</span>
                                            </div>
                                        ))}
                                    </div>
                                    <div className="text-xs text-white/40 text-center border-t border-white/5 pt-4">
                                        {trRange.shipping || range.shipping_text}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </FadeIn>

            {isWallPreviewOpen && (
                <WallPreview
                    isOpen={isWallPreviewOpen}
                    onClose={() => setIsWallPreviewOpen(false)}
                    finish="elegance"
                    imageSrc="/images/puglia/vespa.jpg" // Liberta Bianca par défaut
                />
            )}
        </div>
    );
}
