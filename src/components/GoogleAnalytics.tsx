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
                // analytics.js might be delayed by 2s (LCP optimization)
                // The head proxy should still catch the call
                return;
            }
            // Envoie la page vue au changement de route
            window.gtag("config", trackingId, {
                page_path: location.pathname + location.search,
            });
        };

        executeTracking();

        // No need for injection here as it is handled by public/analytics.js
        // No need to listen for cookie-consent-updated here as gtag('consent', 'update')
        // automatically triggers the release of queued hits in the Google infrastructure.
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