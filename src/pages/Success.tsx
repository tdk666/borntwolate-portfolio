import { Link, useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';

import { useEffect } from 'react';
import { SEO } from '../components/SEO';
import { PRICING_CATALOG } from '../data/pricing';

const ALL_VARIANTS = Object.values(PRICING_CATALOG).flatMap(r => r.variants);

const Success = () => {
    const [searchParams] = useSearchParams();

    useEffect(() => {
        if (typeof window.gtag === 'undefined') return;

        const ref = searchParams.get('client_reference_id') || searchParams.get('ref') || 'unknown';
        const variantId = searchParams.get('variant') || searchParams.get('size');
        const variant = variantId ? ALL_VARIANTS.find(v => v.id === variantId) : null;
        const price = variant?.price ?? 0;

        // Deduplicate: only fire once per session using sessionStorage
        const dedupKey = `purchase_fired_${ref}`;
        if (sessionStorage.getItem(dedupKey)) return;
        sessionStorage.setItem(dedupKey, '1');

        window.gtag('event', 'purchase', {
            transaction_id: `btl_${ref}_${Date.now()}`,
            value: price,
            currency: 'EUR',
            items: [{
                item_id: ref,
                item_name: variant ? `Tirage ${variant.label}` : 'Art Print',
                item_category: 'Tirage argentique',
                item_category2: variant?.label,
                price: price,
                quantity: 1,
            }]
        });
    }, [searchParams]);

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#0a0a0a] relative overflow-hidden">
            <SEO 
                title="Merci pour votre commande | Born Too Late" 
                description="Nous avons bien reçu votre commande. Votre tirage d'art entre en production."
            />
            {/* Background Texture */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none mix-blend-overlay"
                style={{ backgroundImage: 'url("/assets/noise.svg")' }} />

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="max-w-xl w-full p-8 text-center z-10"
            >
                <motion.h1
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.2, duration: 1 }}
                    className="text-6xl md:text-8xl font-serif text-white mb-8 tracking-tight"
                >
                    Merci.
                </motion.h1>

                <div className="space-y-6">
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.6 }}
                        className="text-lg md:text-xl text-white/80 font-light font-inter leading-relaxed"
                    >
                        Votre tirage est désormais commandé.<br />
                        Il va entrer en phase de production au laboratoire.
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.9 }}
                        className="py-6 border-t border-b border-white/10 my-8"
                    >
                        <p className="text-sm text-silver/60 font-space-mono uppercase tracking-widest">
                            Un email de confirmation et de suivi vous parviendra sous 24h.
                        </p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 1.2 }}
                    >
                        <Link
                            to="/portfolio"
                            className="inline-flex items-center gap-2 text-white/60 hover:text-white transition-colors uppercase tracking-widest text-xs font-space-mono group px-6 py-3 border border-white/10 rounded-full hover:bg-white/5"
                        >
                            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                            Retour à la collection
                        </Link>
                    </motion.div>
                </div>
            </motion.div>
        </div>
    );
};

export default Success;
