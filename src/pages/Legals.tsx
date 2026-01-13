import { motion } from 'framer-motion';
import { SEO } from '../components/SEO';

const Legals = () => {
    return (
        <div className="min-h-screen pt-32 px-6 md:px-12 pb-20 max-w-4xl mx-auto">
            <SEO
                title="Mentions Légales & CGV"
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
                        Mentions Légales & CGV
                    </h1>
                    <p className="text-xs font-space-mono text-darkroom-red uppercase">Dernière mise à jour : Janvier 2026</p>
                </header>

                {/* --- 1. MENTIONS LÉGALES (LCEN) --- */}
                <section className="space-y-4">
                    <h2 className="text-xl font-space-mono text-off-white uppercase tracking-widest border-l-2 border-darkroom-red pl-4">1. Mentions Légales</h2>

                    <div className="grid md:grid-cols-2 gap-8">
                        <div>
                            <h3 className="font-bold text-off-white mb-2">Éditeur du Site</h3>
                            <p>
                                <strong>Théophile Dequecker</strong> (Born Two Late)<br />
                                16 rue de la Grande Chaumière<br />
                                75006 Paris, France<br />
                                Email : <a href="mailto:theophile.dequecker@gmail.com" className="hover:text-darkroom-red transition-colors underline">theophile.dequecker@gmail.com</a><br />
                                <span className="text-xs opacity-50 italic">Statut : Artiste-Auteur / Particulier (SIRET en cours d'attribution)</span>
                            </p>
                        </div>
                        <div>
                            <h3 className="font-bold text-off-white mb-2">Hébergeur</h3>
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
                    <h2 className="text-xl font-space-mono text-off-white uppercase tracking-widest border-l-2 border-darkroom-red pl-4">2. Propriété Intellectuelle</h2>
                    <p className="text-justify leading-relaxed">
                        L'ensemble des contenus de ce site (structure, design, textes, et particulièrement les <strong>photographies</strong>) est protégé par le Code de la Propriété Intellectuelle.
                        Les œuvres photographiques présentées sont la propriété exclusive de Théophile Dequecker.
                        <br /><br />
                        Toute reproduction, représentation, modification, publication, adaptation de tout ou partie des éléments du site, quel que soit le moyen ou le procédé utilisé, est <strong>strictement interdite</strong> sans l'autorisation écrite préalable de l'auteur.
                    </p>
                </section>

                {/* --- 3. POLITIQUE DE CONFIDENTIALITÉ (RGPD) --- */}
                <section className="space-y-4">
                    <h2 className="text-xl font-space-mono text-off-white uppercase tracking-widest border-l-2 border-darkroom-red pl-4">3. Politique de Confidentialité (RGPD)</h2>
                    <p className="text-justify leading-relaxed">
                        Conformément au Règlement Général sur la Protection des Données (RGPD), nous vous informons sur l'usage de vos données :
                    </p>
                    <ul className="list-disc pl-5 space-y-2">
                        <li><strong>Responsable du traitement :</strong> Théophile Dequecker.</li>
                        <li><strong>Données collectées :</strong> Nom, email, adresse (si commande), contenu des messages.</li>
                        <li><strong>Finalité :</strong> Gestion des demandes de contact, expédition des commandes, discussion via le Chatbot.</li>
                        <li><strong>Sous-traitants :</strong>
                            <ul className="list-circle pl-5 mt-1 text-silver/80 text-xs">
                                <li><em>Netlify</em> (Hébergement)</li>
                                <li><em>EmailJS</em> (Envoi d'emails transactionnels)</li>
                                <li><em>Google Gemini AI</em> (Traitement du Chatbot). <strong>Attention :</strong> Les échanges avec le "Labo AI" sont traités par Google. Ne partagez pas de données sensibles.</li>
                            </ul>
                        </li>
                        <li><strong>Vos droits :</strong> Droit d'accès, rectification, effacement. Contact : via l'email de l'éditeur.</li>
                    </ul>
                </section>

                {/* --- 4. CGV --- */}
                <section className="space-y-4">
                    <h2 className="text-xl font-space-mono text-off-white uppercase tracking-widest border-l-2 border-darkroom-red pl-4">4. Conditions Générales de Vente (CGV)</h2>
                    <p className="italic text-xs text-silver/60">Applicables aux ventes de tirages d'art.</p>

                    <div className="space-y-6">
                        <article>
                            <h3 className="font-bold text-off-white">4.1 Commande</h3>
                            <p>Les produits sont des œuvres photographiques originales. La vente se fait "sur devis". Le contrat est conclu à l'acceptation du devis et réception du paiement.</p>
                        </article>
                        <article>
                            <h3 className="font-bold text-off-white">4.2 Droit de Rétractation</h3>
                            <p>Conformément à l'article L221-18 du Code de la consommation, vous disposez de <strong>14 jours</strong> à réception pour exercer votre droit de rétractation (frais de retour à votre charge), sauf pour les œuvres nettement personnalisées.</p>
                        </article>
                    </div>
                </section>
            </motion.div>
        </div>
    );
};
export default Legals;
