import emailjs from '@emailjs/browser';

// Interface loose enough to accept data, but strict on core needs
interface OrderData {
    user_name: string;
    user_email: string;
    artwork_title?: string;
    series_title?: string;
    format?: string;
    price?: string;
    address?: string;
    ai_summary?: string;
    message?: string;
    subject?: string;
    selection?: string;
    source?: string; // NEW: Provenance (e.g. "Chatbot", "Formulaire Contact")
}

export const sendOrderToArtist = async (data: OrderData) => {
    try {
        const serviceID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
        const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;
        const adminTemplateID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
        const clientTemplateID = import.meta.env.VITE_EMAILJS_TEMPLATE_CLIENT_ID;

        // SUPERSET OF PARAMS: Send everything possible to cover all template variable names
        const templateParams = {
            // Core Data
            ...data,

            // Provenance
            source: data.source || "Inconnue",

            // Name aliases
            user_name: data.user_name,
            from_name: data.user_name,
            client_name: data.user_name,
            name: data.user_name,

            // Email aliases (VERY IMPORTANT for auto-reply and "To" fields)
            user_email: data.user_email,
            client_email: data.user_email,
            reply_to: data.user_email,
            email: data.user_email,

            // Helpers
            date: new Date().toLocaleString('fr-FR'),
        };

        console.log("📨 Sending EmailJS with params:", templateParams);

        // 1. Envoi du mail à l'Artiste
        const adminResponse = await emailjs.send(
            serviceID,
            adminTemplateID,
            templateParams,
            publicKey
        );

        // 2. Envoi de l'accusé de réception au Client
        if (clientTemplateID) {
            await emailjs.send(
                serviceID,
                clientTemplateID,
                templateParams,
                publicKey
            );
        }

        return { success: true, status: adminResponse.status };
    } catch (error) {
        console.error("EmailJS Error:", error);
        return { success: false, error };
    }
};
