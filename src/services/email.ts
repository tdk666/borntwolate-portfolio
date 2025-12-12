import emailjs from '@emailjs/browser';

interface OrderDetails extends Record<string, unknown> {
    artwork_title: string;
    series_title: string;
    format: string;
    address: string;
    client_email: string;
    client_name: string;
    ai_summary: string;
}

export const sendOrderToArtist = async (details: OrderDetails) => {
    try {
        const response = await emailjs.send(
            "service_xxx",          // <--- ÉCRIVEZ VOTRE ID EN DUR ICI
            "template_xxx",         // <--- ÉCRIVEZ VOTRE ID EN DUR ICI
            details,
            "f_7R6Lzf9d8tbFTP3"     // <--- VOTRE CLÉ PUBLIQUE EN DUR ICI
        );
        return { success: true, status: response.status };
    } catch (error) {
        console.error("EmailJS Error:", error);
        return { success: false, error };
    }
};
