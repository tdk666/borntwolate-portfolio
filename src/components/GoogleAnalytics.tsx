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

        const executeTracking = () => {
            if (typeof window.gtag === "undefined") {
                console.warn("Google Analytics (gtag) n'est pas encore chargé.");
                return;
            }
            // Envoie la page vue au changement de route
            window.gtag("config", trackingId, {
                page_path: location.pathname + location.search,
            });
        };

        // Léger délai pour s'assurer que analytics.js a initialisé la structure
        setTimeout(executeTracking, 100);

        const handleStorageChange = () => {
            // Géré dans CookieConsent.tsx
        };

        window.addEventListener('storage', handleStorageChange);
        window.addEventListener('cookie-consent-updated', handleStorageChange);

        return () => {
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
        console.warn("Google Analytics non chargé. Event ignoré:", { action, category, label, value });
    }
};