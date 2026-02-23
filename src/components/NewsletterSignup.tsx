import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Mail, ArrowRight, CheckCircle2 } from 'lucide-react';
import { sendEmail } from '../services/email';

export const NewsletterSignup = () => {
    const { t } = useTranslation();
    const [email, setEmail] = useState('');
    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!email) return;

        setStatus('loading');

        try {
            // Send to Admin via EmailJS
            await sendEmail({
                contact_type: "MESSAGE", // Generic route
                user_name: "Abonné Newsletter",
                user_email: email,
                admin_subject: "✨ NOUVEL ABONNÉ PRIVATE DROPS",
                message_content: `Nouvelle inscription à la newsletter Private Drops.\n\nEmail : ${email}`,
                reply_subject: "Bienvenue dans les Private Drops - Born Too Late",
                reply_message: "Merci pour votre inscription. Vous serez notifié 48h avant la sortie de nos prochains tirages limités."
            });

            // If Supabase is connected, we would ideally do:
            // await supabase.from('subscribers').insert([{ email }]);
            // But EmailJS acts as a reliable fallback notification system here.

            setStatus('success');
            setEmail('');
        } catch (error) {
            console.error("Newsletter Error:", error);
            setStatus('error');
        }
    };

    return (
        <div className="w-full max-w-md mx-auto md:mx-0 py-6 border-t border-white/5 md:border-none">
            <h3 className="text-white font-serif text-lg mb-2 flex items-center gap-2">
                <Mail className="w-4 h-4 text-darkroom-red" />
                Private Drops
            </h3>
            <p className="text-xs text-silver mb-4 lowercase normal-case">
                {t('footer.newsletter_desc', "Inscrivez-vous pour être notifié en avant-première de la sortie de nos nouveaux tirages d'art limités.")}
            </p>

            <form onSubmit={handleSubmit} className="relative flex items-center">
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder={t('footer.newsletter_placeholder', "votre@email.com")}
                    disabled={status === 'loading' || status === 'success'}
                    required
                    className="w-full bg-white/5 border border-white/10 rounded-lg py-2.5 pl-4 pr-12 text-sm text-white placeholder-white/30 focus:outline-none focus:border-darkroom-red transition-colors disabled:opacity-50"
                />
                <button
                    type="submit"
                    disabled={status === 'loading' || status === 'success'}
                    className="absolute right-2 p-1.5 text-white/50 hover:text-white transition-colors disabled:opacity-50"
                >
                    {status === 'success' ? (
                        <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    ) : (
                        <ArrowRight className={`w-4 h-4 ${status === 'loading' ? 'animate-pulse' : ''}`} />
                    )}
                </button>
            </form>
            {status === 'success' && (
                <p className="text-[10px] text-emerald-400/80 mt-2 text-center md:text-left">
                    {t('footer.newsletter_success', "Inscription confirmée.")}
                </p>
            )}
            {status === 'error' && (
                <p className="text-[10px] text-red-400 mt-2 text-center md:text-left">
                    Une erreur est survenue.
                </p>
            )}
        </div>
    );
};
