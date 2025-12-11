import { motion } from 'framer-motion';
import { SEO } from '../components/SEO';

const Legals = () => {
    return (
        <div className="min-h-screen pt-32 px-6 md:px-12 pb-20 max-w-4xl mx-auto">
            <SEO
                title="Mentions Légales"
                description="Mentions légales et politique de confidentialité du site Born Too Late."
            />

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="space-y-12 text-silver font-inter font-light"
            >
                <header className="mb-16 border-b border-white/10 pb-8">
                    <h1 className="text-4xl md:text-5xl font-space-mono font-bold text-off-white uppercase tracking-tighter mb-4">
                        Mentions Légales
                    </h1>
                </header>

                <section className="space-y-4">
                    <h2 className="text-xl font-space-mono text-off-white uppercase tracking-widest">1. Éditeur du Site</h2>
                    <p>
                        Le site <strong>borntwolate.com</strong> est édité par :<br />
                        <strong>Théophile Dequecker</strong><br />
                        16 rue de la Grande Chaumière<br />
                        75006 Paris, France<br />
                        Email : <a href="mailto:theophile.dequecker@gmail.com" className="hover:text-darkroom-red transition-colors">theophile.dequecker@gmail.com</a>
                    </p>
                </section>

                <section className="space-y-4">
                    <h2 className="text-xl font-space-mono text-off-white uppercase tracking-widest">2. Hébergement</h2>
                    <p>
                        Le site est hébergé par :<br />
                        <strong>Netlify, Inc.</strong><br />
                        44 Montgomery Street, Suite 300<br />
                        San Francisco, California 94104, USA<br />
                        Site web : <a href="https://netlify.com" target="_blank" rel="noopener noreferrer" className="hover:text-darkroom-red transition-colors">netlify.com</a>
                    </p>
                </section>

                <section className="space-y-4">
                    <h2 className="text-xl font-space-mono text-off-white uppercase tracking-widest">3. Propriété Intellectuelle</h2>
                    <p className="text-justify leading-relaxed">
                        L'ensemble de ce site (structure, textes, photographies, logo) relève de la législation française et internationale sur le droit d'auteur et la propriété intellectuelle.
                        <strong>Toutes les images présentes sur ce site sont la propriété exclusive de Théophile Dequecker.</strong>
                        <br /><br />
                        Toute reproduction, représentation, modification, publication, adaptation de tout ou partie des éléments du site, quel que soit le moyen ou le procédé utilisé, est interdite, sauf autorisation écrite préalable de l'auteur.
                    </p>
                </section>

                <section className="space-y-4">
                    <h2 className="text-xl font-space-mono text-off-white uppercase tracking-widest">4. Données Personnelles</h2>
                    <p className="text-justify leading-relaxed">
                        Ce site ne collecte aucune donnée personnelle à votre insu. Les informations recueillies via le formulaire de contact ou le chatbot (email, adresse) ne sont utilisées que pour le traitement de votre demande (commande de tirage, renseignement). Elles ne sont jamais vendues à des tiers.
                    </p>
                </section>
            </motion.div>
        </div>
    );
};

export default Legals;
