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

        const trackingId = "G-Q3VNSP006H";
        const injectScript = () => {
            // Only inject once
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

        const consent = localStorage.getItem('cookie-consent');

        // Initial Page View check
        if (consent === 'accepted') {
            injectScript();
            // Allow script to load before firing config
            setTimeout(executeTracking, 500);
        }

        const handleStorageChange = () => {
            if (localStorage.getItem('cookie-consent') === 'accepted') {
                injectScript();
                setTimeout(executeTracking, 500);
            }
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
