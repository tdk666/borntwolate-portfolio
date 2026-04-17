import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
// import { useTranslation } from 'react-i18next'; // Unused


// Google Tag Manager is globally declared in GoogleAnalytics.tsx


export const CookieConsent = () => {
    // const { t } = useTranslation(); // Unused for now

    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const consent = localStorage.getItem('cookie-consent');
        if (consent === 'accepted') {
            // Returning user who already accepted: restore consent immediately.
            // gtag is a dataLayer proxy defined in index.html — safe to call before analytics.js loads.
            if (typeof window.gtag === 'function') {
                window.gtag('consent', 'update', {
                    'analytics_storage': 'granted',
                    'ad_storage': 'granted',
                    'ad_user_data': 'granted',
                    'ad_personalization': 'granted'
                });
            }
        } else if (!consent) {
            // New visitor: show banner after a short delay for UX
            const timer = setTimeout(() => setIsVisible(true), 1000);
            return () => clearTimeout(timer);
        }
        // consent === 'declined': do nothing, keep defaults denied
    }, []);

    const handleAccept = () => {
        localStorage.setItem('cookie-consent', 'accepted');
        setIsVisible(false);

        // Google Consent Mode v2 Update
        if (typeof window.gtag === 'function') {
            window.gtag('consent', 'update', {
                'analytics_storage': 'granted',
                'ad_storage': 'granted',
                'ad_user_data': 'granted',
                'ad_personalization': 'granted'
            });
        }

        window.dispatchEvent(new Event('cookie-consent-updated'));
    };

    const handleDecline = () => {
        localStorage.setItem('cookie-consent', 'declined');
        setIsVisible(false);
    };

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ y: 200, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: 200, opacity: 0 }}
                    transition={{ type: "spring", stiffness: 200, damping: 25 }}
                    className="fixed bottom-4 left-4 right-4 md:left-auto md:right-8 md:w-[420px] bg-[#121212] border border-white/5 rounded-2xl shadow-2xl z-[100] flex flex-col overflow-hidden"
                >
                    <div className="p-6 md:p-8 space-y-4">
                        <div className="space-y-3">
                            <h3 className="font-serif text-xl text-white">
                                Soutenez mon travail.
                            </h3>
                            <p className="font-inter text-sm text-silver/80 leading-relaxed">
                                Les analyses de trafic (cookies analytiques) m'aident énormément à comprendre ce qui vous plaît et à faire grandir ce projet artistique indépendant. Acceptez-vous de partager ces données anonymes ?{' '}
                                <Link to="/legals" className="underline underline-offset-2 decoration-white/20 hover:text-white transition-colors">
                                    Politique de confidentialité
                                </Link>
                            </p>
                        </div>

                        <div className="flex flex-col gap-3 pt-2">
                            <button
                                onClick={handleAccept}
                                className="w-full bg-white text-black font-space-mono text-sm uppercase tracking-widest py-4 rounded-xl hover:bg-gray-200 transition-colors shadow-lg shadow-white/5 font-bold"
                            >
                                Accepter & Soutenir
                            </button>

                            <button
                                onClick={handleDecline}
                                className="w-full bg-transparent text-silver/90 font-space-mono text-[10px] uppercase tracking-widest py-2 hover:text-white transition-colors underline decoration-white/20 underline-offset-4"
                            >
                                Continuer avec l'essentiel uniquement
                            </button>
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};
