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
        // Vérifie si on est en PROD
        if (!import.meta.env.PROD) {
            return;
        }

        // Vérifie si gtag est chargé
        if (typeof window.gtag === "undefined") {
            console.warn("Google Analytics script not loaded");
            return;
        }

        const trackingId = "G-Q3VNSP006H";
        const consent = localStorage.getItem('cookie-consent');

        // Initial Page View check - Only if consent is already accepted
        if (consent === 'accepted') {
            window.gtag("config", trackingId, {
                page_path: location.pathname + location.search,
            });
        }
    }, [location]);

    // Listener for consent updates (same session)
    useEffect(() => {
        const handleStorageChange = () => {
            if (localStorage.getItem('cookie-consent') === 'accepted') {
                const trackingId = "G-Q3VNSP006H";
                if (typeof window.gtag !== "undefined") {
                    window.gtag("config", trackingId, {
                        page_path: location.pathname + location.search,
                    });
                }
            }
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
