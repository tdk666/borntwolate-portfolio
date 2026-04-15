import { useEffect } from "react";
import { useLocation } from "react-router-dom";

// Déclaration globale pour gtag
declare global {
    interface Window {
        gtag: (
            command: "config" | "event" | "js" | "consent",
            targetId: string,
            config?: Record<string, any>
        ) => void;
    }
}

export const GoogleAnalytics = () => {
    const location = useLocation();

    useEffect(() => {
        if (!import.meta.env.PROD) {
            return;
        }

        const trackingId = "G-Q3VNSP006H";
        const injectScript = () => {
            if (document.getElementById('ga-script')) return;

            const script = document.createElement('script');
            script.id = 'ga-script';
            script.async = true;
            script.src = `https://www.googletagmanager.com/gtag/js?id=${trackingId}`;
            document.head.appendChild(script);
        };

        const executeTracking = () => {
            if (typeof window.gtag === "undefined") {
                console.warn("Google Analytics script not loaded yet.");
                return;
            }
            window.gtag("config", trackingId, {
                page_path: location.pathname + location.search,
            });
        };


        // INJECTION INCONDITIONNELLE POUR CONSENT MODE V2
        // Le script est bloqué par défaut en 'denied' dans index.html, mais DOIT se 
        // charger pour envoyer les pings anonymisés de modélisation.
        injectScript();
        setTimeout(executeTracking, 500);

        const handleStorageChange = () => {
            // Le changement d'état est géré directement via gtag('consent', 'update') 
            // dans CookieConsent.tsx. Pas besoin de re-injecter ici.
        };

        window.addEventListener('storage', handleStorageChange);
        window.addEventListener('cookie-consent-updated', handleStorageChange);

        return () => {
            // PREVENTION DE FUITE MEMOIRE 
            window.removeEventListener('storage', handleStorageChange);
            window.removeEventListener('cookie-consent-updated', handleStorageChange);
        };
    }, [location]);

    return null;
};

// Exported helper for manual event tracking
export const trackEvent = (
    action: string,
    category: string,
    label: string,
    value?: number
) => {
    if (typeof window.gtag !== "undefined") {
        window.gtag("event", action, {
            event_category: category,
            event_label: label,
            value: value,
        });
    } else {
        console.warn("Google Analytics (gtag) not loaded. Event not tracked:", { action, category, label, value });
    }
};
