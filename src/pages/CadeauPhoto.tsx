import { Link } from 'react-router-dom';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { SEO } from '../components/SEO';
import { FadeIn } from '../components/animations/FadeIn';

const faq = [
    {
        q: "Quel est le prix d'un tirage argentique numéroté ?",
        a: "Les tirages débutent à 45 € pour un format 20x30 cm sur papier d'art (gamme Collection), jusqu'à 890 € pour un 60x80 cm encadré aluminium Nielsen (gamme Élégance). La gamme Exception en Caisse Américaine commence à 290 €. Chaque prix inclut le certificat d'authenticité signé et numéroté.",
    },
    {
        q: "Le tirage est-il livré dans un emballage adapté pour l'offrir ?",
        a: "Oui. Chaque commande est expédiée dans un emballage renforcé conçu pour la protection des œuvres : tube rigide pour les tirages roulés, carton double-cannelure pour les encadrés. Une note personnalisée peut être jointe sur demande via le formulaire de contact.",
    },
    {
        q: "Peut-on offrir un bon cadeau plutôt qu'un tirage précis ?",
        a: "Ce n'est pas encore disponible en ligne, mais c'est possible sur demande via le formulaire de contact. Indiquer le montant souhaité et la personne concernée. Un bon numérique personnalisé sera envoyé sous 24h.",
    },
    {
        q: "Quels sont les délais de livraison ?",
        a: "Chaque tirage est produit à la commande par le laboratoire Picto à Paris. Prévoir 10 à 15 jours pour la production, le contrôle qualité et l'expédition sécurisée en France métropolitaine.",
    },
    {
        q: "Comment être sûr que l'œuvre correspondra à l'espace du destinataire ?",
        a: "La gamme Collection (tirage roulé) permet de faire encadrer le tirage localement selon ses goûts. Pour les encadrés ou les Caisses Américaines, les dimensions exactes sont indiquées sur la page Atelier. En cas de doute, le formulaire de contact permet d'échanger sur le choix du format.",
    },
];

const CadeauPhoto = () => {
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    const faqSchema = {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: faq.map(item => ({
            '@type': 'Question',
            name: item.q,
            acceptedAnswer: { '@type': 'Answer', text: item.a },
        })),
    };

    return (
        <div className="min-h-screen pt-32 pb-32 px-6 md:px-12 bg-deep-black text-off-white font-sans">
            <SEO
                title="Offrir une photographie argentique numérotée — guide 2026 | Borntwolate"
                description="Comment choisir un tirage d'art argentique à offrir ? Guide complet : formats, finitions, budgets. Livraison France, certificat d'authenticité signé, 30 exemplaires maximum."
                url="/cadeau-photo-argentique"
                type="article"
                structuredData={faqSchema}
            />

            <article className="max-w-3xl mx-auto">

                <FadeIn delay={0.1}>
                    <header className="mb-20">
                        <p className="font-space-mono text-[10px] tracking-[0.4em] uppercase text-darkroom-red mb-6">
                            Guide d'acquisition
                        </p>
                        <h1 className="font-serif text-4xl md:text-5xl italic font-light text-off-white mb-8 leading-tight">
                            Offrir une photographie argentique : le guide pour choisir juste
                        </h1>
                        <p className="text-silver/70 text-lg font-light leading-relaxed">
                            Un tirage d'art numéroté n'est pas un poster. C'est un objet qui a une histoire, une limite d'existence, une matière. Ce guide vous aide à trouver le bon format, la bonne finition, et à comprendre ce que vous offrez vraiment.
                        </p>
                    </header>
                </FadeIn>

                <FadeIn delay={0.2}>
                    <figure className="mb-20 -mx-6 md:-mx-20 group overflow-hidden">
                        <img
                            src="/images/retro-mountain/la-raclette.jpg"
                            alt="Tirage argentique encadré posé contre un mur, photographie d'intérieur, grain Rollei Retro 400S"
                            className="w-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-[1.02] transition-all duration-700"
                            loading="lazy"
                        />
                        <figcaption className="mt-4 text-center font-space-mono text-[10px] tracking-widest uppercase text-darkroom-red opacity-60">
                            Le Rituel — Retro Mountain — Rollei Retro 400S
                        </figcaption>
                    </figure>
                </FadeIn>

                <div className="space-y-20">

                    <FadeIn>
                        <section>
                            <h2 className="font-serif text-2xl md:text-3xl italic text-off-white mb-6 border-l-2 border-darkroom-red pl-5">
                                Pourquoi un tirage argentique fait un cadeau à part
                            </h2>
                            <div className="space-y-5 text-silver/75 text-lg font-light leading-relaxed">
                                <p>
                                    La photographie argentique commence avant l'image. Il y a le choix du film, la décision de déclencher, le développement chimique dans le noir. Quand le tirage arrive entre vos mains, il porte la trace de tout ça : une légère imperfection de grain, une profondeur de noir que le numérique n'atteint pas, la preuve physique qu'un instant a existé.
                                </p>
                                <p>
                                    Chaque œuvre est limitée à 30 exemplaires : c'est la limite légale française pour le statut d'œuvre d'art originale (Article 98A du Code Général des Impôts). Passé ce seuil, c'est une reproduction. En deçà, c'est une collection. Offrir un tirage numéroté, c'est offrir un objet rare par définition, pas par marketing.
                                </p>
                            </div>
                        </section>
                    </FadeIn>

                    <FadeIn>
                        <section>
                            <h2 className="font-serif text-2xl md:text-3xl italic text-off-white mb-6 border-l-2 border-darkroom-red pl-5">
                                Quel format selon l'espace et la personne
                            </h2>
                            <div className="space-y-5 text-silver/75 text-lg font-light leading-relaxed">
                                <p>
                                    Le format change tout. Un 20x30 cm s'intègre dans un bureau, une entrée, une bibliothèque, discret mais présent. Un 60x90 cm parle à un mur entier, impose une atmosphère, devient le sujet d'une pièce. Si vous ne connaissez pas l'espace du destinataire, le 30x45 cm est le format universel : assez grand pour avoir de l'impact, assez petit pour ne pas dominer.
                                </p>
                                <p>
                                    Pour une première acquisition ou un cadeau dont vous n'êtes pas sûr, la gamme <strong className="text-off-white font-medium">Collection</strong> (tirage roulé, livré en tube) laisse la liberté de faire encadrer localement, selon ses goûts et son intérieur. C'est aussi l'entrée de gamme la plus accessible.
                                </p>
                            </div>
                        </section>
                    </FadeIn>

                    <FadeIn>
                        <section>
                            <h2 className="font-serif text-2xl md:text-3xl italic text-off-white mb-6 border-l-2 border-darkroom-red pl-5">
                                Collection, Élégance, Exception : trois profils, trois budgets
                            </h2>
                            <div className="grid md:grid-cols-3 gap-6 mt-8">
                                {[
                                    { label: 'Collection', price: 'À partir de 45 €', desc: "Tirage sur papier Canson Infinity 310g, livré roulé en tube protecteur. L'œuvre pure, sans cadre imposé.", link: '/prints' },
                                    { label: 'Élégance', price: 'À partir de 290 €', desc: "Encadrement aluminium Nielsen Alpha, sobre et contemporain. Prêt à accrocher.", link: '/prints' },
                                    { label: 'Exception', price: 'À partir de 290 €', desc: "Caisse Américaine en bois. Le tirage semble flotter, sans vitre. La finition des musées.", link: '/prints' },
                                ].map(item => (
                                    <Link
                                        key={item.label}
                                        to={item.link}
                                        className="group border border-white/8 hover:border-white/20 p-6 transition-colors duration-300"
                                    >
                                        <p className="font-space-mono text-[10px] tracking-widest uppercase text-darkroom-red mb-3">{item.price}</p>
                                        <p className="font-serif text-xl italic text-off-white mb-3 group-hover:text-warm-sepia transition-colors">{item.label}</p>
                                        <p className="text-silver/60 text-sm font-light leading-relaxed">{item.desc}</p>
                                    </Link>
                                ))}
                            </div>
                        </section>
                    </FadeIn>

                    <FadeIn>
                        <section>
                            <h2 className="font-serif text-2xl md:text-3xl italic text-off-white mb-6 border-l-2 border-darkroom-red pl-5">
                                Ce qui différencie ce tirage d'un poster
                            </h2>
                            <div className="space-y-5 text-silver/75 text-lg font-light leading-relaxed">
                                <p>
                                    Un poster est imprimé en série illimitée sur papier standard. Un tirage argentique numéroté naît d'un négatif physique, est scanné en haute définition pour préserver son grain originel, puis imprimé en jet d'encre pigmentaire (Giclée) sur papier Canson Infinity Platine Fibre Rag 310g, un support dont la conservation dépasse 100 ans (norme ISO 9706). Chaque exemplaire est numéroté et signé à la main.
                                </p>
                                <p>
                                    La différence se voit. Le grain est présent, vivant. Les noirs ont une profondeur que la reprographie industrielle ne restitue pas. C'est l'objet en lui-même qui est l'œuvre, pas uniquement l'image qu'il représente.
                                </p>
                            </div>
                        </section>
                    </FadeIn>

                    <FadeIn>
                        <section>
                            <h2 className="font-serif text-2xl md:text-3xl italic text-off-white mb-8 border-l-2 border-darkroom-red pl-5">
                                Questions fréquentes
                            </h2>
                            <div className="space-y-2">
                                {faq.map((item, i) => (
                                    <div key={i} className="border-b border-white/5">
                                        <button
                                            onClick={() => setOpenIndex(openIndex === i ? null : i)}
                                            className="w-full flex justify-between items-start gap-4 py-5 text-left"
                                            aria-expanded={openIndex === i}
                                        >
                                            <span className="font-medium text-off-white text-base">{item.q}</span>
                                            <ChevronDown
                                                size={16}
                                                className={`flex-shrink-0 mt-1 text-silver/40 transition-transform duration-300 ${openIndex === i ? 'rotate-180' : ''}`}
                                            />
                                        </button>
                                        <AnimatePresence initial={false}>
                                            {openIndex === i && (
                                                <motion.div
                                                    initial={{ height: 0, opacity: 0 }}
                                                    animate={{ height: 'auto', opacity: 1 }}
                                                    exit={{ height: 0, opacity: 0 }}
                                                    transition={{ duration: 0.3 }}
                                                    className="overflow-hidden"
                                                >
                                                    <p className="pb-5 text-silver/60 text-base font-light leading-relaxed">{item.a}</p>
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </div>
                                ))}
                            </div>
                        </section>
                    </FadeIn>

                    <FadeIn>
                        <div className="border-t border-white/5 pt-16 flex flex-col sm:flex-row items-center gap-6 justify-between">
                            <p className="text-silver/40 font-space-mono text-xs uppercase tracking-widest">
                                Livraison France métropolitaine · Certificat signé inclus
                            </p>
                            <Link to="/prints" className="btn-primary">
                                <span>Voir les tirages disponibles</span>
                            </Link>
                        </div>
                    </FadeIn>

                </div>
            </article>
        </div>
    );
};

export default CadeauPhoto;
