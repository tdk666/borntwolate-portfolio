import { Link } from 'react-router-dom';
import { SEO } from '../components/SEO';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { photographeArgentiqueData } from '../data/photographe-argentique';
import { ChevronDown } from 'lucide-react';

const PhotographeArgentique = () => {
    const { i18n } = useTranslation();
    const currentLang = (i18n.language && i18n.language.startsWith('en')) ? 'en' : 'fr';
    const content = photographeArgentiqueData[currentLang];

    // FAQ Accordion State
    const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

    const toggleFaq = (index: number) => {
        setOpenFaqIndex(openFaqIndex === index ? null : index);
    };

    // JSON-LD Construction (Dynamic based on data)
    const jsonLdSchema = {
        "@context": "https://schema.org",
        "@graph": [
            {
                "@type": "FAQPage",
                "mainEntity": content.faq.items.map(item => ({
                    "@type": "Question",
                    "name": item.q,
                    "acceptedAnswer": { "@type": "Answer", "text": item.a }
                }))
            },
            {
                "@type": "Product",
                "name": "Tirage d'Art Argentique Borntwolate",
                "brand": { "@type": "Brand", "name": "Borntwolate" },
                "description": "Tirage d'art issu de négatif argentique sur papier Canson Infinity Baryta. Édition limitée.",
                "image": "https://borntwolate.com/images/puglia/vespa.jpg",
                "material": "Canson Infinity Baryta 310g",
                "offers": {
                    "@type": "Offer",
                    "availability": "https://schema.org/InStock",
                    "price": "90.00",
                    "priceCurrency": "EUR"
                }
            }
        ]
    };

    return (
        <div className="min-h-screen pt-24 pb-20 px-6 md:px-12 font-sans bg-deep-black text-off-white selection:bg-darkroom-red selection:text-white">
            <SEO
                title={content.seo.title}
                description={content.seo.description}
                schema={jsonLdSchema}
                url="/photographe-argentique"
            />

            <article className="max-w-4xl mx-auto leading-relaxed">

                {/* HERO SECTION */}
                <header className="mb-20 text-center">
                    <h1 className="text-4xl md:text-6xl font-serif font-light mb-10 tracking-tight italic">
                        <span className="block mb-2 text-off-white">Photographe argentique</span>
                        <span className="block text-2xl md:text-3xl text-darkroom-red font-space-mono normal-case tracking-normal opacity-90">
                            {content.hero.title.split(':')[1]?.trim() || "L'art de capturer ce qui va disparaître"}
                        </span>
                    </h1>
                    <div className="space-y-6 text-lg md:text-xl font-light text-silver/80 text-justify md:text-center max-w-3xl mx-auto">
                        {content.hero.text.map((paragraph, idx) => (
                            <p key={idx}>{paragraph}</p>
                        ))}
                    </div>
                </header>

                {/* IMAGE BREAK 1: Libertà Bianca (Vespa) */}
                <figure className="mb-24 -mx-6 md:-mx-24 relative group">
                    <div className="aspect-[16/9] overflow-hidden">
                        <img
                            src="/images/puglia/vespa.jpg"
                            alt="Tirage argentique couleur Vespa blanc, série Puglia Famiglia, esthétique Dolce Vita et grain cinéma CineStill"
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-90 group-hover:opacity-100"
                        />
                    </div>
                    <figcaption className="mt-4 text-xs text-center text-darkroom-red font-space-mono tracking-widest uppercase opacity-80">
                        Puglia Famiglia — "Libertà Bianca"
                    </figcaption>
                </figure>

                {/* SECTION 1: Why Analog */}
                <section className="mb-24">
                    <div className="flex flex-col md:flex-row gap-4 mb-12 items-baseline">
                        <span className="text-darkroom-red font-space-mono text-sm tracking-widest uppercase">01.</span>
                        <h2 className="text-3xl md:text-4xl font-serif italic border-b border-white/10 pb-6 w-full">
                            {content.sections[0].title}
                        </h2>
                    </div>

                    <div className="grid md:grid-cols-2 gap-12 text-silver/80">
                        {content.sections[0].content.map((block, idx) => (
                            <div key={idx}>
                                {('subtitle' in block) && (
                                    <h3 className="text-xl font-medium text-off-white mb-4 font-serif">
                                        {(block as any).subtitle}
                                    </h3>
                                )}
                                <div className="space-y-4">
                                    {block.text.map((p, i) => <p key={i}>{p}</p>)}
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* IMAGE BREAK 2: Le Gardien des Cimes (Vertical Full) */}
                <figure className="mb-24">
                    <div className="w-full max-w-lg mx-auto">
                        <img
                            src="/images/retro-mountain/mountain-retro.jpg"
                            alt="Tirage argentique noir et blanc Le Gardien des Cimes, skieur minimaliste, série Retro Mountain, papier Canson Baryta"
                            className="w-full h-auto object-cover transition-transform duration-700 hover:scale-105 opacity-90 hover:opacity-100 shadow-2xl"
                        />
                    </div>
                    <figcaption className="mt-4 text-xs text-center text-darkroom-red font-space-mono tracking-widest uppercase opacity-80">
                        Retro Mountain — "Le Gardien des Cimes"
                    </figcaption>
                </figure>


                {/* SECTION 2: Author Vision */}
                <section className="mb-24">
                    <div className="flex flex-col md:flex-row gap-4 mb-8 items-baseline">
                        <span className="text-darkroom-red font-space-mono text-sm tracking-widest uppercase">02.</span>
                        <h2 className="text-3xl md:text-4xl font-serif italic border-b border-white/10 pb-6 w-full">
                            {content.sections[1].title}
                        </h2>
                    </div>
                    <div className="space-y-6 text-lg text-silver/80">
                        {content.sections[1].content[0].text.map((p, idx) => (
                            <p key={idx}>{idx === 0 ? (
                                <>
                                    {p.split('(')[0]}
                                    (
                                    <Link to="/series/winter-in-the-fruit" className="text-off-white hover:text-darkroom-red transition-colors italic">Winter in the Fruit</Link>, <Link to="/series/mauvais-garcons" className="text-off-white hover:text-darkroom-red transition-colors italic">Mauvais Garçons</Link>, <Link to="/series/canadian-evasion" className="text-off-white hover:text-darkroom-red transition-colors italic">Canadian Evasion</Link>
                                    )
                                    {p.split(')')[1]}
                                </>
                            ) : p}</p>
                        ))}
                    </div>
                </section>

                {/* TECH SECTION (Moved) */}
                <section className="mb-24">
                    <div className="flex flex-col md:flex-row gap-4 mb-10 items-baseline">
                        <span className="text-darkroom-red font-space-mono text-sm tracking-widest uppercase">03.</span>
                        <h2 className="text-3xl md:text-3xl font-serif italic border-b border-white/10 pb-6 w-full">
                            {content.technical_section.title}
                        </h2>
                    </div>

                    <div className="space-y-8 text-silver/80">
                        {content.technical_section.items.map((item, idx) => (
                            <div key={idx}>
                                <h3 className="text-xl font-medium mb-2 text-off-white font-serif">{item.title}</h3>
                                <p>{item.text}</p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* SERIES CTA */}
                <div className="mb-24 text-center">
                    <Link
                        to="/series"
                        className="inline-block px-10 py-4 bg-off-white text-deep-black font-space-mono uppercase text-xs tracking-[0.2em] hover:bg-darkroom-red hover:text-white transition-colors duration-300"
                    >
                        {content.opening.cta_portfolio}
                    </Link>
                </div>

                {/* IMAGE BREAK 3: Bivouac (Moved here) */}
                <figure className="mb-24">
                    <img
                        src="/images/canadian-evasion/intrus.JPG"
                        alt="Tirage argentique couleur Bivouac, tente solitaire, série Canadian Evasion, ambiance Into The Wild"
                        className="w-full h-auto object-cover max-h-[80vh] opacity-90"
                    />
                    <figcaption className="mt-4 text-xs text-center text-darkroom-red font-space-mono tracking-widest uppercase opacity-80">
                        Canadian Evasion — "Bivouac"
                    </figcaption>
                </figure>

                {/* SHOP SECTION */}
                <section className="mb-24 bg-[#111111] border border-white/5 p-8 md:p-12 relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-4 opacity-10 font-serif italic text-6xl text-off-white select-none">
                        Picto
                    </div>

                    <h3 className="text-2xl font-serif mb-6 text-off-white">{content.shop_section.title}</h3>
                    <p className="mb-8 text-silver/80">{content.shop_section.intro}</p>

                    <div className="grid md:grid-cols-3 gap-6 mb-12">
                        {content.shop_section.items.map((item, idx) => (
                            <div key={idx} className="bg-black/40 p-6 border border-white/5 hover:border-darkroom-red/30 transition-colors">
                                <h4 className="font-space-mono text-darkroom-red uppercase text-sm mb-3 tracking-widest">{item.label}</h4>
                                <p className="text-sm opacity-70">{item.desc}</p>
                            </div>
                        ))}
                    </div>

                    <div className="grid md:grid-cols-2 gap-12">
                        {content.shop_section.details.map((detail, idx) => (
                            <div key={idx}>
                                <h4 className="font-serif text-lg mb-3 text-off-white">{detail.title}</h4>
                                <p className="text-sm leading-relaxed text-silver/60 text-justify">
                                    {detail.text}
                                </p>
                            </div>
                        ))}
                    </div>


                </section>

                {/* SHOP CTA (Restored outside) */}
                <div className="mb-24 text-center">
                    <p className="text-2xl md:text-3xl font-serif italic font-light mb-8 text-off-white">
                        {content.opening.quote}
                    </p>
                    <div className="h-px w-24 bg-darkroom-red/50 mx-auto mb-8" />

                    <Link
                        to="/prints"
                        className="inline-block px-10 py-4 border border-white/20 text-off-white font-space-mono uppercase text-xs tracking-[0.2em] hover:bg-white hover:text-deep-black transition-colors duration-300"
                    >
                        {content.opening.cta_shop}
                    </Link>
                </div>

                {/* IMAGE BREAK 3: Bivouac */}




                {/* FAQ SECTION (ACCORDION) */}
                <section className="mb-32">
                    <div className="flex flex-col md:flex-row gap-4 mb-10 items-baseline">
                        <span className="text-darkroom-red font-space-mono text-sm tracking-widest uppercase">FAQ.</span>
                        <h2 className="text-3xl md:text-3xl font-serif italic border-b border-white/10 pb-6 w-full">
                            {content.faq.title}
                        </h2>
                    </div>

                    <div className="space-y-4">
                        {content.faq.items.map((item, index) => (
                            <div key={index} className="border border-white/5 bg-white/[0.02] rounded-sm overflow-hidden">
                                <button
                                    onClick={() => toggleFaq(index)}
                                    className="w-full flex justify-between items-center p-6 text-left hover:bg-white/5 transition-colors focus:outline-none"
                                >
                                    <span className="font-serif text-lg text-off-white pr-8">{item.q}</span>
                                    <motion.div
                                        animate={{ rotate: openFaqIndex === index ? 180 : 0 }}
                                        transition={{ duration: 0.3 }}
                                    >
                                        <ChevronDown className="w-5 h-5 text-darkroom-red" />
                                    </motion.div>
                                </button>
                                <AnimatePresence>
                                    {openFaqIndex === index && (
                                        <motion.div
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: "auto", opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            transition={{ duration: 0.3, ease: "easeInOut" }}
                                        >
                                            <div className="p-6 pt-0 text-silver/70 border-t border-white/5">
                                                <p>{item.a}</p>
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        ))}
                    </div>
                </section>



            </article>
        </div>
    );
};

export default PhotographeArgentique;
