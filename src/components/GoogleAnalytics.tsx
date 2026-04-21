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

// GA4-native event helper (format GA4, pas Universal Analytics)
export const trackEvent = (
    action: string,
    category: string,
    label: string,
    value?: number,
    extraParams?: Record<string, string | number>
) => {
    if (typeof window.gtag !== "undefined") {
        window.gtag("event", action, {
            content_type: category,
            content_id: label,
            ...(value !== undefined && { value, currency: 'EUR' }),
            ...extraParams,
        });
    }
};

// Helpers typés pour le funnel e-commerce
export const trackViewItem = (itemId: string, itemName: string, price?: number) =>
    trackEvent('view_item', 'Tirage argentique', itemName, price, { item_id: itemId });

export const trackBeginCheckout = (itemName: string, price: number, variantId?: string) =>
    trackEvent('begin_checkout', 'Tirage argentique', itemName, price, {
        ...(variantId && { item_variant: variantId }),
    });