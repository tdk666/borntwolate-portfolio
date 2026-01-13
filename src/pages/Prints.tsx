import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { SEO } from '../components/SEO';
import { ArrowRight, ShieldCheck, Frame, PenTool } from 'lucide-react';

const Prints = () => {
    return (
        <div className="min-h-screen bg-darkroom-black pt-32 pb-20 px-6 md:px-12">
            <SEO
                title="Atelier & Collection"
                description="Acquérir un tirage original Born Too Late. Éditions limitées."
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
                        L'Atelier
                    </h1>
                    <p className="font-inter text-silver/60 max-w-xl text-sm md:text-base leading-relaxed">
                        Espace dédié à l'acquisition de tirages d'art. Chaque pièce est produite à la demande, garantissant une attention particulière à chaque détail.
                    </p>
                </header>

                <div className="grid md:grid-cols-3 gap-8 mb-20">
                    <div className="bg-white/5 p-8 border border-white/5 hover:border-darkroom-red/30 transition-colors group">
                        <PenTool className="text-darkroom-red mb-4" size={32} strokeWidth={1} />
                        <h3 className="text-xl font-space-mono text-off-white uppercase mb-4">Signature</h3>
                        <p className="text-sm text-silver/70 font-inter leading-relaxed text-justify">
                            Tirages <strong>signés et numérotés</strong> (Limité à 30 ex). Certificat d'authenticité inclus.
                        </p>
                    </div>

                    <div className="bg-white/5 p-8 border border-white/5 hover:border-darkroom-red/30 transition-colors group">
                        <ShieldCheck className="text-darkroom-red mb-4" size={32} strokeWidth={1} />
                        <h3 className="text-xl font-space-mono text-off-white uppercase mb-4">Fine Art</h3>
                        <p className="text-sm text-silver/70 font-inter leading-relaxed text-justify">
                            Impressions réalisées sur papier <strong>Fine Art Hahnemühle</strong> (Baryta ou Photo Rag). Ces papiers d'archive garantissent une profondeur des noirs exceptionnelle, une fidélité chromatique absolue et une conservation &gt; 100 ans.
                        </p>
                    </div>

                    <div className="bg-white/5 p-8 border border-white/5 hover:border-darkroom-red/30 transition-colors group">
                        <Frame className="text-darkroom-red mb-4" size={32} strokeWidth={1} />
                        <h3 className="text-xl font-space-mono text-off-white uppercase mb-4">Finitions</h3>
                        <p className="text-sm text-silver/70 font-inter leading-relaxed text-justify">
                            Tirage seul, Contre-collage Dibond ou Caisse Américaine. Du format A4 au 90x60cm.
                        </p>
                    </div>
                </div>

                <div className="bg-gradient-to-r from-white/5 to-transparent p-8 md:p-12 border-l-4 border-darkroom-red flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                    <div>
                        <h2 className="text-2xl font-space-mono text-off-white mb-2 uppercase">Faire une acquisition</h2>
                        <p className="text-silver/80 font-inter text-sm max-w-lg mb-2">
                            Collection accessible <strong>à partir de 90€</strong> (Tirage papier seul).
                        </p>
                        <p className="text-silver/50 font-inter text-xs italic">
                            Chaque projet étant unique, la vente s'effectue sur devis personnalisé.
                        </p>
                    </div>

                    <Link
                        to="/contact?subject=acquisition"
                        className="inline-flex items-center gap-3 bg-off-white text-darkroom-black px-8 py-4 font-space-mono uppercase tracking-widest text-sm hover:bg-darkroom-red hover:text-white transition-all duration-300 group whitespace-nowrap"
                    >
                        Finaliser ma commande
                        <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                    </Link>
                </div>
            </motion.div>
        </div>
    );
};
export default Prints;
