import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { SEO } from '../components/SEO';
import { Helmet } from 'react-helmet-async';
import { BadgeCheck, Landmark, FileSignature, ArrowRight, Package } from 'lucide-react';
import { PRICING_CATALOG } from '../data/pricing';

const Prints = () => {
    // Schema Product (AggregateOffer)
    const allPrices = Object.values(PRICING_CATALOG).flatMap(range => Object.values(range.prices));
    const minPrice = Math.min(...allPrices);
    const maxPrice = Math.max(...allPrices);

    const productSchema = {
        "@context": "https://schema.org/",
        "@type": "Product",
        "name": "Tirages d'Art Argentiques - Born Too Late",
        "image": "https://borntwolate.com/social-card.jpg",
        "description": "Gamme complète de tirages d'art limités (Collection, Élégance, Galerie). Qualité Musée, production Picto Paris.",
        "brand": {
            "@type": "Brand",
            "name": "Born Too Late"
        },
        "offers": {
            "@type": "AggregateOffer",
            "lowPrice": minPrice,
            "highPrice": maxPrice,
            "priceCurrency": "EUR",
            "offerCount": allPrices.length
        }
    };

    // Animation staggers
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.8 } }
    };

    return (
        <div className="min-h-screen bg-[#0a0a0a] text-[#f0f0f0] pt-32 pb-24 px-6 md:px-12 selection:bg-darkroom-red selection:text-white">
            <SEO
                title="L'Art du Tirage | Atelier & Tarifs"
                description="Tirages d'art signés et numérotés, réalisés par le laboratoire Picto Paris. Collection, Élégance, Galerie."
                url="/prints"
                schema={productSchema}
            />
            {/* FORCE PRODUCT METADATA */}
            <Helmet>
                <meta property="product:price:amount" content={`${minPrice}`} />
                <meta property="product:price:currency" content="EUR" />
            </Helmet>

            <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="max-w-6xl mx-auto"
            >
                {/* 1. HERO HEADER */}
                <motion.header variants={itemVariants} className="text-center mb-24 md:mb-32">
                    <h1 className="text-4xl md:text-7xl font-serif italic text-white mb-6 tracking-tight font-playfair">
                        L'Art du Tirage
                    </h1>
                    <div className="h-px w-24 bg-darkroom-red mx-auto mb-8 opacity-60"></div>
                    <p className="font-space-mono text-silver text-sm md:text-base tracking-widest uppercase max-w-2xl mx-auto leading-relaxed opacity-80">
                        Chaque photographie est une pièce de collection, réalisée sur mesure par le laboratoire Picto à Paris.
                    </p>
                </motion.header>

                {/* 2. SAVOIR-FAIRE (3 COLUMNS) */}
                <motion.section variants={itemVariants} className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-16 mb-32 border-b border-white/10 pb-20">
                    <div className="flex flex-col items-center text-center space-y-4 group">
                        <div className="p-4 rounded-full bg-white/5 border border-white/10 group-hover:border-darkroom-red/50 transition-colors duration-500">
                            <BadgeCheck className="text-silver group-hover:text-darkroom-red transition-colors" size={32} strokeWidth={1.5} />
                        </div>
                        <h3 className="text-lg font-space-mono uppercase tracking-widest text-white">Qualité Musée</h3>
                        <p className="text-sm text-silver/60 font-inter leading-loose max-w-xs">
                            Tirages jet d'encre pigmentaire sur papier Canson Infinity Baryta. Garantie conservation 100 ans.
                        </p>
                    </div>

                    <div className="flex flex-col items-center text-center space-y-4 group">
                        <div className="p-4 rounded-full bg-white/5 border border-white/10 group-hover:border-darkroom-red/50 transition-colors duration-500">
                            <Landmark className="text-silver group-hover:text-darkroom-red transition-colors" size={32} strokeWidth={1.5} />
                        </div>
                        <h3 className="text-lg font-space-mono uppercase tracking-widest text-white">L'Excellence Parisienne</h3>
                        <p className="text-sm text-silver/60 font-inter leading-loose max-w-xs">
                            Production confiée au laboratoire Picto, référence historique des plus grands photographes depuis 1950.
                        </p>
                    </div>

                    <div className="flex flex-col items-center text-center space-y-4 group">
                        <div className="p-4 rounded-full bg-white/5 border border-white/10 group-hover:border-darkroom-red/50 transition-colors duration-500">
                            <FileSignature className="text-silver group-hover:text-darkroom-red transition-colors" size={32} strokeWidth={1.5} />
                        </div>
                        <h3 className="text-lg font-space-mono uppercase tracking-widest text-white">Authenticité</h3>
                        <p className="text-sm text-silver/60 font-inter leading-loose max-w-xs">
                            Chaque œuvre est numérotée, signée et livrée avec son certificat d'authenticité.
                        </p>
                    </div>
                </motion.section>

                {/* 3. LES FINITIONS (DYNAMIC CARDS) */}
                <motion.section variants={itemVariants} className="mb-32">
                    <h2 className="text-3xl md:text-4xl font-serif text-center mb-16 text-white font-playfair">Les Finitions</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
                        {Object.entries(PRICING_CATALOG).map(([key, range], index) => {
                            const minRangePrice = Math.min(...Object.values(range.prices));
                            return (
                                <div key={key} className="bg-[#0f0f0f] border border-white/5 p-8 flex flex-col hover:border-white/20 transition-all duration-500 relative overflow-hidden group">
                                    <div className="absolute top-0 right-0 p-4 opacity-10 font-space-mono text-6xl font-bold group-hover:opacity-20 transition-opacity">0{index + 1}</div>
                                    <h3 className="text-2xl font-space-mono uppercase text-white mb-2">{range.label}</h3>
                                    <p className="text-xs font-space-mono text-darkroom-red uppercase tracking-widest mb-6">
                                        {key === 'collection' ? 'L\'Essentiel' : key === 'elegance' ? 'Prêt à accrocher' : 'L\'Exception'}
                                    </p>

                                    <p className="text-silver/70 font-inter text-sm leading-relaxed mb-6">
                                        {range.description}
                                    </p>

                                    <ul className="mb-8 space-y-2">
                                        {range.features.map((feature, i) => (
                                            <li key={i} className="text-xs text-silver/50 font-mono flex items-center gap-2">
                                                <span className="w-1 h-1 bg-darkroom-red rounded-full"></span> {feature}
                                            </li>
                                        ))}
                                    </ul>

                                    <div className="mt-auto space-y-4 pt-6 border-t border-white/10">
                                        <div className="text-right">
                                            <span className="text-xs text-silver/40 uppercase block mb-1">À partir de</span>
                                            <span className="text-2xl font-space-mono text-white">{minRangePrice} €</span>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </motion.section>

                {/* 4. GRILLE TARIFAIRE DETAILLEE */}
                <motion.section variants={itemVariants} className="max-w-4xl mx-auto mb-32">
                    <h2 className="text-2xl md:text-3xl font-serif text-center mb-12 text-white font-playfair">Grille Tarifaire Complète</h2>

                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="border-b border-white/20">
                                    <th className="py-4 px-4 font-space-mono text-xs uppercase tracking-widest text-silver">Format</th>
                                    <th className="py-4 px-4 font-space-mono text-xs uppercase tracking-widest text-silver text-center">Collection</th>
                                    <th className="py-4 px-4 font-space-mono text-xs uppercase tracking-widest text-silver text-center">Élégance</th>
                                    <th className="py-4 px-4 font-space-mono text-xs uppercase tracking-widest text-darkroom-red text-right">Galerie</th>
                                </tr>
                            </thead>
                            <tbody className="text-sm font-inter text-off-white">
                                {["20x30", "30x45", "40x60", "60x90", "70x100"].map((size) => (
                                    <tr key={size} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                                        <td className="py-4 px-4 font-bold">{size} cm</td>
                                        <td className="py-4 px-4 text-center text-silver/80">
                                            {PRICING_CATALOG.collection.prices[size] ? `${PRICING_CATALOG.collection.prices[size]} €` : '-'}
                                        </td>
                                        <td className="py-4 px-4 text-center text-silver/80">
                                            {PRICING_CATALOG.elegance.prices[size] ? `${PRICING_CATALOG.elegance.prices[size]} €` : '-'}
                                        </td>
                                        <td className="py-4 px-4 text-right font-bold text-white">
                                            {PRICING_CATALOG.galerie.prices[size] ? `${PRICING_CATALOG.galerie.prices[size]} €` : '-'}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* DYNAMIC SHIPPING FOOTER */}
                    <div className="mt-8 flex justify-center gap-8 text-xs text-silver/40 font-space-mono uppercase tracking-widest flex-wrap">
                        <span className="flex items-center gap-2">
                            <Package size={14} />
                            {(() => {
                                const ranges = Object.values(PRICING_CATALOG);
                                const getRange = (zone: 'france' | 'europe') => {
                                    const prices = ranges.map(r => r.shipping[zone]).filter((p): p is number => p !== null);
                                    if (prices.length === 0) return 'N/A';
                                    const min = Math.min(...prices);
                                    const max = Math.max(...prices);
                                    return min === max ? `${min}€` : `${min}€ - ${max}€`;
                                };

                                const hasWorldUnavailable = ranges.some(r => r.shipping.world === null);

                                return (
                                    <>
                                        France : {getRange('france')} • Europe : {getRange('europe')} • Monde : {hasWorldUnavailable ? 'Sur devis (Grands Formats)' : '35€+'}
                                    </>
                                );
                            })()}
                        </span>
                    </div>
                </motion.section>

                {/* 5. LEGAL MENTIONS (CRUCIAL) */}
                <motion.p variants={itemVariants} className="text-center text-xs text-silver/50 max-w-2xl mx-auto mb-20 font-inter leading-relaxed">
                    <strong className="font-bold text-silver">Engagement Légal :</strong> Toutes les œuvres sont signées, numérotées et <strong className="font-bold text-white">limitées à 30 exemplaires</strong> tous formats confondus, accompagnées de leur certificat d'authenticité.
                </motion.p>

                {/* 6. CALL TO ACTION */}
                <motion.div variants={itemVariants} className="text-center">
                    <Link
                        to="/contact?subject=acquisition"
                        className="inline-flex items-center gap-4 bg-off-white text-black px-12 py-5 font-space-mono text-sm uppercase tracking-[0.2em] hover:bg-darkroom-red hover:text-white transition-all duration-300 group shadow-xl hover:shadow-2xl hover:shadow-darkroom-red/20 transform hover:-translate-y-1"
                    >
                        Demander une acquisition
                        <ArrowRight className="group-hover:translate-x-2 transition-transform duration-300" size={18} />
                    </Link>
                </motion.div>

            </motion.div>
        </div>
    );
};

export default Prints;
