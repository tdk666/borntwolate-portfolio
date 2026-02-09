import emailjs from '@emailjs/browser';

// Interface loose enough to accept data, but strict on core needs
interface OrderData {
    user_name: string;
    user_email: string;

    // Artwork Details (Optional/Overridable)
    artwork_title?: string;
    series_title?: string;
    format?: string;
    finition?: string; // Added missing field
    price?: string | number; // Allow number

    // Contact / Order Details
    address?: string;
    ai_summary?: string;
    message?: string;
    subject?: string;
    selection?: string;
    artwork_list?: string;
    source?: string;
}

export const sendOrderToArtist = async (data: OrderData) => {
    try {
        const serviceID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
        const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;
        const adminTemplateID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
        const clientTemplateID = import.meta.env.VITE_EMAILJS_TEMPLATE_CLIENT_ID;

        // Fallback Defaults to prevent "undefined" in emails
        const defaults = {
            artwork_title: "Non spécifié",
            series_title: "-",
            format: "Non défini",
            finition: "Non définie",
            price: "-",
            subject: "Nouvelle Demande Borntwolate",
            source: "Site Web Inconnu"
        };

        // SUPERSET OF PARAMS: Send everything possible to cover all template variable names
        const templateParams = {
            // Merge defaults with provided data
            ...defaults,
            ...data,

            // Explicit overrides if needed (e.g. if data.price is a number, convert to string here if needed)
            price: data.price?.toString() || defaults.price,

            // Provenance
            source: data.source || defaults.source,

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
