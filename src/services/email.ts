import emailjs from '@emailjs/browser';

interface OrderDetails {
    client_name: string;
    artwork_title: string;
    series_title: string;
    format: string;
    price: string; // <--- NOUVEAU CHAMP AJOUTÉ
    address: string;
    client_email: string;
    ai_summary: string;
}

export const sendOrderToArtist = async (details: OrderDetails) => {
    try {
        const response = await emailjs.send(
            import.meta.env.VITE_EMAILJS_SERVICE_ID,
            import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
            details as unknown as Record<string, unknown>,
            import.meta.env.VITE_EMAILJS_PUBLIC_KEY
        );
        return { success: true, status: response.status };
    } catch (error) {
        console.error("EmailJS Error:", error);
        return { success: false, error };
    }
};
