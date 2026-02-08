import { useEffect } from "react";
import { useLocation } from "react-router-dom";

// Déclaration globale pour gtag
declare global {
    interface Window {
        gtag: (
            command: "config" | "event" | "js",
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

        // Envoi de l'événement de page view
        // Remplace G-XXXXXXXXXX par ton ID réel si tu veux le hardcoder ici,
        // ou mieux, le passer via une variable d'environnement VITE_GA_ID.
        const trackingId = "G-Q3VNSP006H";

        window.gtag("config", trackingId, {
            page_path: location.pathname + location.search,
        });
    }, [location]);

    return null;
};
