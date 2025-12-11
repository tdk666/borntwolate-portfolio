import emailjs from '@emailjs/browser';

interface OrderDetails extends Record<string, unknown> {
    artwork_title: string;
    series_title: string;
    format: string;
    address: string;
    client_email: string;
    ai_summary: string;
}

export const sendOrderToArtist = async (details: OrderDetails) => {
    try {
        const response = await emailjs.send(
            import.meta.env.VITE_EMAILJS_SERVICE_ID,
            import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
            details,
            import.meta.env.VITE_EMAILJS_PUBLIC_KEY
        );
        return { success: true, status: response.status };
    } catch (error) {
        console.error("EmailJS Error:", error);
        return { success: false, error };
    }
};
