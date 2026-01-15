import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { SEO } from '../components/SEO';
import { BadgeCheck, Landmark, FileSignature, ArrowRight } from 'lucide-react';

const Prints = () => {
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
        <div className="min-h-screen bg-black text-off-white pt-32 pb-24 px-6 md:px-12 selection:bg-darkroom-red selection:text-white">
            <SEO
                title="L'Art du Tirage | Atelier & Tarifs"
                description="Tirages d'art signés et numérotés, réalisés par le laboratoire Picto Paris. Découvrez nos finitions : Papier Fine Art, Caisse Américaine et Encadrement Nielsen."
                url="/prints"
            />

            <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="max-w-6xl mx-auto"
            >
                {/* 1. HERO HEADER */}
                <motion.header variants={itemVariants} className="text-center mb-24 md:mb-32">
                    <h1 className="text-4xl md:text-7xl font-serif italic text-white mb-6 tracking-tight">
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
                            Tirages jet d'encre pigmentaire sur papier Canson Infinity Baryta (N&B) ou Satiné (Couleur). Garantie conservation 100 ans.
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

                {/* 3. LES FINITIONS (CARDS) */}
                <motion.section variants={itemVariants} className="mb-32">
                    <h2 className="text-3xl md:text-4xl font-serif text-center mb-16 text-white">Les Finitions</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
                        {/* CARD 1: COLLECTION */}
                        <div className="bg-[#0f0f0f] border border-white/5 p-8 flex flex-col hover:border-white/20 transition-all duration-500 relative overflow-hidden group">
                            <div className="absolute top-0 right-0 p-4 opacity-10 font-space-mono text-6xl font-bold group-hover:opacity-20 transition-opacity">01</div>
                            <h3 className="text-2xl font-space-mono uppercase text-white mb-2">La Collection</h3>
                            <p className="text-xs font-space-mono text-darkroom-red uppercase tracking-widest mb-6">Le Standard</p>

                            <p className="text-silver/70 font-inter text-sm leading-relaxed mb-8 flex-grow">
                                Le tirage d'art pur. Livré roulé ou à plat, prêt à être encadré par vos soins.
                            </p>

                            <div className="space-y-4 pt-6 border-t border-white/10">
                                <div className="text-right">
                                    <span className="text-xs text-silver/40 uppercase block mb-1">À partir de</span>
                                    <span className="text-2xl font-space-mono text-white">90 €</span>
                                </div>
                            </div>
                        </div>

                        {/* CARD 2: ELEGANCE */}
                        <div className="bg-[#151515] border border-white/10 p-8 flex flex-col hover:border-darkroom-red/40 transition-all duration-500 relative overflow-hidden group transform md:-translate-y-4 shadow-2xl">
                            <div className="absolute top-0 right-0 p-4 opacity-10 font-space-mono text-6xl font-bold group-hover:opacity-20 transition-opacity">02</div>
                            <h3 className="text-2xl font-space-mono uppercase text-white mb-2">L'Élégance</h3>
                            <p className="text-xs font-space-mono text-darkroom-red uppercase tracking-widest mb-6">Le Classique</p>

                            <p className="text-silver/70 font-inter text-sm leading-relaxed mb-8 flex-grow">
                                Encadrement Nielsen Alpha en aluminium noir mat. La protection et la sobriété intemporelle.
                            </p>

                            <div className="space-y-4 pt-6 border-t border-white/10">
                                <div className="text-right">
                                    <span className="text-xs text-silver/40 uppercase block mb-1">À partir de</span>
                                    <span className="text-2xl font-space-mono text-white">290 €</span>
                                </div>
                            </div>
                        </div>

                        {/* CARD 3: GALERIE */}
                        <div className="bg-[#0f0f0f] border border-white/5 p-8 flex flex-col hover:border-white/20 transition-all duration-500 relative overflow-hidden group">
                            <div className="absolute top-0 right-0 p-4 opacity-10 font-space-mono text-6xl font-bold group-hover:opacity-20 transition-opacity">03</div>
                            <h3 className="text-2xl font-space-mono uppercase text-white mb-2">La Galerie</h3>
                            <p className="text-xs font-space-mono text-darkroom-red uppercase tracking-widest mb-6">Le Luxe</p>

                            <p className="text-silver/70 font-inter text-sm leading-relaxed mb-8 flex-grow">
                                Tirage contrecollé flottant dans une Caisse Américaine en bois noir. Sans vitre, pour une immersion totale.
                            </p>

                            <div className="space-y-4 pt-6 border-t border-white/10">
                                <div className="text-right">
                                    <span className="text-xs text-silver/40 uppercase block mb-1">À partir de</span>
                                    <span className="text-2xl font-space-mono text-white">450 €</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.section>

                {/* 4. GRILLE TARIFAIRE SIMPLIFIÉE */}
                <motion.section variants={itemVariants} className="max-w-4xl mx-auto mb-32">
                    <h2 className="text-2xl md:text-3xl font-serif text-center mb-12 text-white">Grille Tarifaire</h2>

                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="border-b border-white/20">
                                    <th className="py-4 px-4 font-space-mono text-xs uppercase tracking-widest text-silver">Format</th>
                                    <th className="py-4 px-4 font-space-mono text-xs uppercase tracking-widest text-silver text-center">Tirage Seul</th>
                                    <th className="py-4 px-4 font-space-mono text-xs uppercase tracking-widest text-darkroom-red text-right">Caisse Américaine</th>
                                </tr>
                            </thead>
                            <tbody className="text-sm font-inter text-off-white">
                                <tr className="border-b border-white/5 hover:bg-white/5 transition-colors">
                                    <td className="py-4 px-4 font-bold">20 x 30 cm <span className="text-silver/40 font-normal ml-2">(A4)</span></td>
                                    <td className="py-4 px-4 text-center">90 €</td>
                                    <td className="py-4 px-4 text-right">-</td>
                                </tr>
                                <tr className="border-b border-white/5 hover:bg-white/5 transition-colors">
                                    <td className="py-4 px-4 font-bold">30 x 45 cm <span className="text-silver/40 font-normal ml-2">(A3+)</span></td>
                                    <td className="py-4 px-4 text-center">140 €</td>
                                    <td className="py-4 px-4 text-right font-bold text-white">450 €</td>
                                </tr>
                                <tr className="border-b border-white/5 hover:bg-white/5 transition-colors">
                                    <td className="py-4 px-4 font-bold">40 x 60 cm</td>
                                    <td className="py-4 px-4 text-center">220 €</td>
                                    <td className="py-4 px-4 text-right font-bold text-white">650 €</td>
                                </tr>
                                <tr className="border-b border-white/5 hover:bg-white/5 transition-colors">
                                    <td className="py-4 px-4 font-bold">60 x 90 cm</td>
                                    <td className="py-4 px-4 text-center">390 €</td>
                                    <td className="py-4 px-4 text-right font-bold text-white">950 €</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <p className="mt-8 text-center text-xs text-silver/40 font-space-mono uppercase tracking-widest">
                        Livraison offerte en Europe.
                    </p>
                </motion.section>

                {/* 5. CALL TO ACTION */}
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
