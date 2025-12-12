import emailjs from '@emailjs/browser';

interface OrderDetails {
    client_name: string;
    artwork_title: string;
    series_title: string;
    format: string;
    price: string;
    address: string;
    client_email: string;
    ai_summary: string;
}

export const sendOrderToArtist = async (details: OrderDetails) => {
    try {
        const serviceID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
        const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;
        const adminTemplateID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
        const clientTemplateID = import.meta.env.VITE_EMAILJS_TEMPLATE_CLIENT_ID;

        // 1. Envoi du mail à l'Artiste (Vous)
        const adminResponse = await emailjs.send(
            serviceID,
            adminTemplateID,
            details as unknown as Record<string, unknown>,
            publicKey
        );

        // 2. Envoi de l'accusé de réception au Client (Si configuré)
        if (clientTemplateID) {
            await emailjs.send(
                serviceID,
                clientTemplateID,
                details as unknown as Record<string, unknown>,
                publicKey
            );
        }

        return { success: true, status: adminResponse.status };
    } catch (error) {
        console.error("EmailJS Error:", error);
        return { success: false, error };
    }
};
