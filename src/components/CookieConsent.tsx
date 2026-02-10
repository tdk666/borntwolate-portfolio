import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
// import { useTranslation } from 'react-i18next'; // Unused


export const CookieConsent = () => {
    // const { t } = useTranslation(); // Unused for now

    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const consent = localStorage.getItem('cookie-consent');
        if (!consent) {
            // Delay for better UX
            const timer = setTimeout(() => setIsVisible(true), 1000);
            return () => clearTimeout(timer);
        }
    }, []);

    const handleAccept = () => {
        localStorage.setItem('cookie-consent', 'accepted');
        setIsVisible(false);
        // Here you would trigger GA initialization if configured
    };

    const handleDecline = () => {
        localStorage.setItem('cookie-consent', 'declined');
        setIsVisible(false);
    };

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ y: 100, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: 100, opacity: 0 }}
                    className="fixed bottom-4 left-4 right-4 md:left-auto md:right-8 md:w-96 bg-[#1a1a1a] border border-white/10 p-6 shadow-2xl z-[100] flex flex-col gap-4"
                >
                    <div className="space-y-2">
                        <p className="font-space-mono text-xs text-darkroom-red uppercase tracking-widest">
                            Cookies & Vie Privée
                        </p>
                        <p className="font-inter text-xs text-silver leading-relaxed">
                            Ce site utilise des cookies pour analyser le trafic et améliorer votre expérience.
                        </p>
                    </div>
                    <div className="flex gap-4">
                        <button
                            onClick={handleAccept}
                            className="flex-1 bg-off-white text-black font-space-mono text-xs uppercase tracking-widest py-3 hover:bg-white transition-colors"
                        >
                            Accepter
                        </button>
                        <button
                            onClick={handleDecline}
                            className="flex-1 bg-transparent border border-white/20 text-silver font-space-mono text-xs uppercase tracking-widest py-3 hover:text-white hover:border-white transition-colors"
                        >
                            Refuser
                        </button>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};
