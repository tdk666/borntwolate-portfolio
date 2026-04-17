import { Link } from 'react-router-dom';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { SEO } from '../components/SEO';
import { FadeIn } from '../components/animations/FadeIn';

const seriesSpotlight = [
    {
        id: 'mauvais-garcons',
        title: 'Mauvais Garçons',
        subtitle: 'Rue des Mauvais Garçons, Paris 4e',
        film: 'Kodak Gold 200',
        cover: '/images/mauvais-garcons/le-rendez-vous.jpg',
        alt: "Moto classique garée dans une ruelle pavée du Marais, Paris, photographie argentique Kodak Gold 200",
        text: "Une impasse pavée du Marais, une moto qui dort, des lumières de bistrot qui débordent sur le trottoir. Kodak Gold 200 pour la chaleur dorée des façades haussmanniennes sous la pluie. Paris comme elle s'invente encore, à l'angle des rues qu'on ne cherche pas.",
    },
    {
        id: 'psychadelic-mtl',
        title: 'Psychadelic MTL',
        subtitle: 'Montréal',
        film: 'LomoChrome Turquoise',
        cover: '/images/psychadelic-mtl/kapital-circle.avif',
        alt: "Sculpture urbaine de Montréal en contre-plongée, teintes cyan LomoChrome Turquoise, photographie argentique expérimentale",
        text: "Montréal en automne au LomoChrome Turquoise. Cette émulsion expérimentale inverse les couleurs selon sa propre logique : les verts deviennent bleus, les bleus tournent au cyan, les rouges tendent vers le mauve. Une ville ordinaire filmée avec un film qui pose une autre question sur ce qu'on regarde.",
    },
];

const faq = [
    {
        q: "Qu'est-ce qu'un tirage argentique d'art ?",
        a: "Un tirage argentique d'art naît d'une photographie prise sur film chimique. Contrairement au numérique, chaque image résulte d'une réaction unique entre la lumière et l'émulsion de la pellicule. Les tirages Borntwolate sont produits à Paris par le laboratoire Picto sur papier Canson Infinity Platine Fibre Rag 310g, avec une conservation supérieure à 100 ans (norme ISO 9706).",
    },
    {
        q: "Les tirages sont-ils produits à Paris ?",
        a: "Oui. Chaque tirage est réalisé par le laboratoire Picto Paris, référence française depuis 1950. Le négatif argentique est scanné en haute définition, puis le tirage est produit en jet d'encre pigmentaire (Giclée). Ce processus garantit une fidélité maximale aux tonalités originales du film.",
    },
    {
        q: "Pourquoi les tirages sont-ils limités à 30 exemplaires ?",
        a: "La limite de 30 exemplaires correspond au seuil légal français pour le statut d'œuvre d'art originale (art. 71 de l'annexe III du CGI). Au-delà, une photographie perd ce statut juridique. Cette contrainte garantit à chaque acquéreur la rareté et l'authenticité de son tirage, accompagné d'un certificat signé et numéroté.",
    },
    {
        q: "Quelle est la différence entre les gammes Collection, Élégance et Exception ?",
        a: "La gamme Collection (à partir de 45 €) propose le tirage roulé, prêt à encadrer selon vos goûts. La gamme Élégance (à partir de 120 €) inclut un encadrement aluminium Nielsen avec verre anti-reflets. La gamme Exception (à partir de 290 €) est une Caisse Américaine avec passepartout, prête à accrocher. Les trois gammes partagent le même papier Canson Infinity et la même limitation à 30 exemplaires.",
    },
    {
        q: "Comment commander un tirage argentique en ligne ?",
        a: "Chaque tirage est disponible depuis la page Atelier du site. Sélectionnez l'œuvre, choisissez la gamme et le format, puis procédez au paiement sécurisé via Stripe. Le tirage est produit à la commande par Picto Paris et expédié en France métropolitaine sous 10 à 15 jours avec certificat d'authenticité.",
    },
];

const PhotographieArgentiqueParis = () => {
    const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

    const localBusinessSchema = {
        '@context': 'https://schema.org',
        '@graph': [
            {
                '@type': 'FAQPage',
                mainEntity: faq.map(item => ({
                    '@type': 'Question',
                    name: item.q,
                    acceptedAnswer: { '@type': 'Answer', text: item.a },
                })),
            },
            {
                '@type': 'LocalBusiness',
                name: 'Borntwolate — Photographe Argentique Paris',
                description: "Photographe argentique indépendant basé à Paris. Tirages d'art limités (30 ex.) sur papier Canson Infinity, produits avec le laboratoire Picto Paris.",
                image: 'https://borntwolate.com/images/mauvais-garcons/le-rendez-vous.jpg',
                url: 'https://borntwolate.com',
                priceRange: '€€',
                address: {
                    '@type': 'PostalAddress',
                    addressLocality: 'Paris',
                    addressCountry: 'FR',
                },
                areaServed: { '@type': 'City', name: 'Paris' },
                sameAs: ['https://www.instagram.com/borntwolate_/'],
            },
            {
                '@type': 'Article',
                headline: 'Photographie argentique à Paris : huit séries, une pellicule',
                author: { '@type': 'Person', name: 'Théophile Dequecker' },
                image: 'https://borntwolate.com/images/mauvais-garcons/le-rendez-vous.jpg',
                inLanguage: 'fr-FR',
            },
        ],
    };

    return (
        <div className="min-h-screen pt-32 pb-32 px-6 md:px-12 bg-deep-black text-off-white font-sans">
            <SEO
                title="Photographie argentique à Paris — Séries et tirages d'art | Borntwolate"
                description="Photographe argentique basé à Paris. Huit séries tournées au Kodak Gold, Portra 400, CineStill et Rollei Retro. Tirages d'art limités à 30 exemplaires, produits chez Picto Paris."
                url="/photographie-argentique-paris"
                type="article"
                structuredData={localBusinessSchema}
            />

            <article className="max-w-3xl mx-auto">

                <FadeIn delay={0.1}>
                    <header className="mb-20">
                        <p className="font-space-mono text-[10px] tracking-[0.4em] uppercase text-darkroom-red mb-6">
                            Paris — Île-de-France
                        </p>
                        <h1 className="font-serif text-4xl md:text-5xl italic font-light text-off-white mb-8 leading-tight">
                            Photographie argentique à Paris : huit séries, une pellicule
                        </h1>
                        <p className="text-silver/70 text-lg font-light leading-relaxed">
                            Paris vue au travers d'un Rollei 35, d'une Rollei 35 chargée de Kodak Gold. Pas de filtre, pas de retouche numérique : juste la chimie du film et la lumière de la capitale telle qu'elle est, avec ses pavés mouillés et ses ciels de novembre.
                        </p>
                    </header>
                </FadeIn>

                <div className="space-y-24">

                    <FadeIn>
                        <section>
                            <h2 className="font-serif text-2xl md:text-3xl italic text-off-white mb-6 border-l-2 border-darkroom-red pl-5">
                                Paris comme sujet, pas comme décor
                            </h2>
                            <div className="space-y-5 text-silver/75 text-lg font-light leading-relaxed">
                                <p>
                                    La photographie de rue à Paris ne manque pas de photographes. Ce qui est plus rare : un regard qui ne cherche pas le monument, mais ce qui se passe à côté. La série <Link to="/series/mauvais-garcons" className="text-off-white hover:text-darkroom-red transition-colors italic">Mauvais Garçons</Link> est née d'une impasse du Marais, la nuit, avec un Rollei 35 chargé de Kodak Gold 200. Pas de plan, pas de mise en scène. Juste la décision de rester là jusqu'à ce que quelque chose se passe.
                                </p>
                                <p>
                                    L'argentique impose cette lenteur. Trente-six poses par pellicule, pas une de plus. Chaque déclenchement est une décision qui coûte quelque chose : du film, du temps de développement, de l'attention. Cette contrainte produit une façon différente de regarder.
                                </p>
                            </div>
                        </section>
                    </FadeIn>

                    {/* SERIES SPOTLIGHT */}
                    <FadeIn>
                        <section className="space-y-12">
                            <h2 className="font-serif text-2xl md:text-3xl italic text-off-white mb-2 border-l-2 border-darkroom-red pl-5">
                                Deux séries, deux villes, deux émulsions
                            </h2>
                            {seriesSpotlight.map(s => (
                                <Link
                                    key={s.id}
                                    to={`/series/${s.id}`}
                                    className="group grid md:grid-cols-2 gap-8 items-center"
                                >
                                    <div className="overflow-hidden aspect-[4/3]">
                                        <img
                                            src={s.cover}
                                            alt={s.alt}
                                            className="w-full h-full object-cover opacity-75 group-hover:opacity-100 group-hover:scale-[1.03] transition-all duration-700"
                                            loading="lazy"
                                        />
                                    </div>
                                    <div>
                                        <p className="font-space-mono text-[9px] tracking-widest uppercase text-darkroom-red mb-3">{s.film}</p>
                                        <h3 className="font-serif text-2xl italic text-off-white mb-1 group-hover:text-warm-sepia transition-colors">{s.title}</h3>
                                        <p className="font-space-mono text-xs text-silver/40 uppercase tracking-widest mb-4">{s.subtitle}</p>
                                        <p className="text-silver/60 text-base font-light leading-relaxed">{s.text}</p>
                                    </div>
                                </Link>
                            ))}
                        </section>
                    </FadeIn>

                    <FadeIn>
                        <section>
                            <h2 className="font-serif text-2xl md:text-3xl italic text-off-white mb-6 border-l-2 border-darkroom-red pl-5">
                                La chaîne de production, de Paris à votre mur
                            </h2>
                            <div className="space-y-5 text-silver/75 text-lg font-light leading-relaxed">
                                <p>
                                    Les tirages sont produits en collaboration avec <strong className="text-off-white font-medium">Picto Paris</strong>, laboratoire de référence depuis 1950, partenaire historique des plus grands photographes français. Une fois le négatif scanné en haute définition, le tirage est réalisé en jet d'encre pigmentaire (Giclée) sur papier Canson Infinity Platine Fibre Rag 310g, conservation garantie supérieure à 100 ans (norme ISO 9706).
                                </p>
                                <p>
                                    Chaque œuvre est limitée à 30 exemplaires, tous formats et finitions confondus. C'est la limite légale française pour le statut d'œuvre d'art originale. Livraison en France métropolitaine, certificat d'authenticité signé et numéroté inclus.
                                </p>
                            </div>
                        </section>
                    </FadeIn>

                    <FadeIn>
                        <section>
                            <h2 className="font-serif text-2xl md:text-3xl italic text-off-white mb-10 border-l-2 border-darkroom-red pl-5">
                                Questions fréquentes
                            </h2>
                            <div className="space-y-2">
                                {faq.map((item, i) => (
                                    <div key={i} className="border-b border-white/5">
                                        <button
                                            onClick={() => setOpenFaqIndex(openFaqIndex === i ? null : i)}
                                            className="w-full flex justify-between items-center py-5 text-left gap-4"
                                            aria-expanded={openFaqIndex === i}
                                        >
                                            <span className="font-serif italic text-lg text-off-white">{item.q}</span>
                                            <motion.div
                                                animate={{ rotate: openFaqIndex === i ? 180 : 0 }}
                                                transition={{ duration: 0.2 }}
                                                className="flex-shrink-0"
                                            >
                                                <ChevronDown size={16} className="text-darkroom-red" />
                                            </motion.div>
                                        </button>
                                        <AnimatePresence initial={false}>
                                            {openFaqIndex === i && (
                                                <motion.div
                                                    initial={{ height: 0, opacity: 0 }}
                                                    animate={{ height: 'auto', opacity: 1 }}
                                                    exit={{ height: 0, opacity: 0 }}
                                                    transition={{ duration: 0.25 }}
                                                    className="overflow-hidden"
                                                >
                                                    <p className="pb-6 text-silver/70 font-light leading-relaxed">{item.a}</p>
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </div>
                                ))}
                            </div>
                        </section>
                    </FadeIn>

                    <FadeIn>
                        <section>
                            <h2 className="font-serif text-2xl md:text-3xl italic text-off-white mb-6 border-l-2 border-darkroom-red pl-5">
                                Huit séries photographiques disponibles
                            </h2>
                            <p className="text-silver/75 text-lg font-light leading-relaxed mb-10">
                                De Paris à New York, des Alpes à la Pologne : huit séries documentent une façon de traverser le monde avec un Rollei 35 en poche. Chaque série a son film, sa lumière, sa géographie intérieure.
                            </p>
                            <div className="flex flex-col sm:flex-row items-center gap-4">
                                <Link to="/series" className="btn-ghost">
                                    <span>Voir toutes les séries</span>
                                </Link>
                                <Link to="/prints" className="btn-primary">
                                    <span>Acquérir un tirage</span>
                                </Link>
                            </div>
                        </section>
                    </FadeIn>

                </div>
            </article>
        </div>
    );
};

export default PhotographieArgentiqueParis;
