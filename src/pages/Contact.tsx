import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useState, useEffect } from 'react';
import { SEO } from '../components/SEO';
import { useLocation } from 'react-router-dom';


const Contact = () => {
    const { t } = useTranslation();
    const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
    const [message, setMessage] = useState('');
    const location = useLocation();

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        if (params.get('subject') === 'acquisition') {
            setMessage("Bonjour Théophile,\n\nJe souhaite acquérir un tirage de la photo : [Insérer le nom ou décrire la photo].\n\nJ'aimerais en savoir plus sur les formats et les tarifs.\n\nCordialement,");
        }
    }, [location]);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setStatus('submitting');

        const formData = new FormData(e.currentTarget);

        try {
            await fetch('/', {
                method: 'POST',
                headers: { "Content-Type": "application/x-www-form-urlencoded" },
                body: new URLSearchParams(formData as unknown as Record<string, string>).toString()
            });
            setStatus('success');
            (e.target as HTMLFormElement).reset();
            setMessage('');
        } catch {
            setStatus('error');
        }
    };

    return (
        <div className="min-h-screen pt-32 px-4 md:px-8 pb-12 flex flex-col items-center justify-center max-w-2xl mx-auto">
            <SEO
                title={t('contact.title')}
                description="Contactez Théophile Dequecker pour des tirages d'art, des collaborations ou simplement pour échanger sur la photographie argentique."
            />
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="w-full"
            >
                <h1 className="text-4xl md:text-5xl font-space-mono text-off-white mb-2 uppercase tracking-tighter text-center">
                    {t('contact.title')}
                </h1>
                <p className="text-silver font-inter text-center mb-2">
                    {t('contact.subtitle')}
                </p>
                <p className="font-space-mono text-xs text-darkroom-red uppercase tracking-widest text-center mb-12">
                    Tirages d'art disponibles sur demande. Éditions limitées.
                </p>

                <form
                    className="space-y-12"
                    name="contact"
                    method="POST"
                    data-netlify="true"
                    onSubmit={handleSubmit}
                >
                    <input type="hidden" name="form-name" value="contact" />

                    <div className="group">
                        <label htmlFor="name" className="block text-xs font-space-mono text-silver uppercase tracking-widest mb-2 group-focus-within:text-darkroom-red transition-colors">
                            {t('contact.name')}
                        </label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            required
                            className="w-full bg-transparent border-b border-white/20 py-2 text-off-white font-inter focus:outline-none focus:border-darkroom-red transition-colors"
                            placeholder={t('contact.placeholderName')}
                        />
                    </div>

                    <div className="group">
                        <label htmlFor="email" className="block text-xs font-space-mono text-silver uppercase tracking-widest mb-2 group-focus-within:text-darkroom-red transition-colors">
                            {t('contact.email')}
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            required
                            className="w-full bg-transparent border-b border-white/20 py-2 text-off-white font-inter focus:outline-none focus:border-darkroom-red transition-colors"
                            placeholder={t('contact.placeholderEmail')}
                        />
                    </div>

                    <div className="group">
                        <label htmlFor="message" className="block text-xs font-space-mono text-silver uppercase tracking-widest mb-2 group-focus-within:text-darkroom-red transition-colors">
                            {t('contact.message')}
                        </label>
                        <textarea
                            id="message"
                            name="message"
                            required
                            rows={4}
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            className="w-full bg-transparent border-b border-white/20 py-2 text-off-white font-inter focus:outline-none focus:border-darkroom-red transition-colors resize-none"
                            placeholder={t('contact.placeholderMessage')}
                        />
                    </div>


                    <div className="flex items-start gap-3 pt-2 group mb-6">
                        <input
                            type="checkbox"
                            id="consent"
                            required
                            className="mt-1 appearance-none min-w-[16px] w-4 h-4 border border-white/20 rounded-sm bg-transparent checked:bg-darkroom-red checked:border-darkroom-red cursor-pointer transition-colors relative after:content-['✓'] after:absolute after:text-white after:text-xs after:top-[-2px] after:left-[2px] after:opacity-0 checked:after:opacity-100"
                        />
                        <label htmlFor="consent" className="text-xs font-inter text-silver/60 cursor-pointer hover:text-silver transition-colors leading-tight text-left">
                            En soumettant ce formulaire, j'accepte que mes informations soient utilisées pour traiter ma demande. <a href="/legals" className="underline hover:text-darkroom-red text-silver">Voir Politique de Confidentialité</a>.
                        </label>
                    </div>

                    <div className="text-center pt-8">
                        <button
                            type="submit"
                            disabled={status === 'submitting'}
                            className="text-off-white font-space-mono uppercase tracking-widest text-sm border border-white/20 px-8 py-3 hover:bg-white/5 hover:border-off-white transition-all duration-300 disabled:opacity-50"
                        >
                            {status === 'submitting' ? 'Développement en cours...' : status === 'success' ? 'Fixé dans le bain.' : t('contact.send')}
                        </button>
                        {status === 'error' && <p className="text-red-500 font-space-mono text-xs mt-4">Erreur de chimie. Réessayez.</p>}
                    </div>
                </form>


            </motion.div>
        </div>
    );
};

export default Contact;
