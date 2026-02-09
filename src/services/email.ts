import emailjs from '@emailjs/browser';

// --- CHAMELEON STRATEGY INTERFACE ---
// All React components must conform to this strict structure.
// WE generate the strings here, EmailJS just passes them through.
export interface ChameleonEmailParams {
    // 1. Who & Context
    user_name: string;
    user_email: string;
    contact_type: "MESSAGE" | "COMMANDE" | "LABO_IA"; // Tag for filtering

    // 2. Admin Notification (The email YOU receive)
    admin_subject: string; // e.g., "Nouveau Lead : [Name]"
    message_content: string; // The FULL body (Transcript, Order Summary, Question)

    // 3. Client Auto-Reply (The email THEY receive)
    reply_subject: string; // e.g., "Bien reçu - Born Too Late"
    reply_message: string; // e.g., "Merci pour votre message..."
    reply_details?: string; // Optional: Order specs, Chat recap, etc.
}

export const sendEmail = async (data: ChameleonEmailParams) => {
    try {
        const serviceID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
        const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;
        const adminTemplateID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID; // Generic Admin Template
        const clientTemplateID = import.meta.env.VITE_EMAILJS_TEMPLATE_CLIENT_ID || 'template_l8azy4r'; // Generic Client Template

        // MAPPING TO EMAILJS TEMPLATE VARIABLES
        // Ensure your EmailJS template uses these exact variable names:
        // {{contact_type}}, {{admin_subject}}, {{message_content}}, 
        // {{reply_subject}}, {{reply_message}}, {{reply_details}},
        // {{user_name}}, {{user_email}}
        const templateParams = {
            // Context
            contact_type: data.contact_type,

            // Admin Content
            admin_subject: data.admin_subject,
            message_content: data.message_content,

            // Client Content
            reply_subject: data.reply_subject,
            reply_message: data.reply_message,
            reply_details: data.reply_details || "", // Empty string if undefined to avoid "undefined" in email

            // Standard Identity
            user_name: data.user_name,
            user_email: data.user_email,
            from_name: data.user_name, // Alias
            reply_to: data.user_email, // Critical for direct reply

            // Meta
            date: new Date().toLocaleString('fr-FR'),
        };

        console.log(`🦎 [Chameleon Email] Sending [${data.contact_type}]...`, templateParams);

        // 1. Admin Notification
        const adminResponse = await emailjs.send(
            serviceID,
            adminTemplateID,
            templateParams,
            publicKey
        );

        // 2. Client Auto-Reply (Fire & Forget for speed, but await for safety)
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
        console.error("🦎 [Chameleon Email] Critical Error:", error);
        return { success: false, error };
    }
};
