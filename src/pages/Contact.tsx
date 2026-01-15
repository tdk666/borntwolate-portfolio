import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useState, useEffect, useRef } from 'react';
import { SEO } from '../components/SEO';
import { useLocation } from 'react-router-dom';
import { seriesData } from '../data/photos';
import VisualSelector from '../components/VisualSelector';
import { X, ArrowLeft } from 'lucide-react';
import emailjs from '@emailjs/browser';

const Contact = () => {
    const { t } = useTranslation();
    const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [message, setMessage] = useState('');
    const location = useLocation();
    const [subject, setSubject] = useState('');

    // Store selected photos as full objects including necessary details
    interface SelectedPhoto {
        id: number | string;
        title: string;
        seriesTitle: string;
        url: string;
    }
    const [selectedPhotos, setSelectedPhotos] = useState<SelectedPhoto[]>([]);
    const initialParamsProcessed = useRef(false);

    // Helper to get all photos for the selector
    const allPhotosOptions = seriesData.flatMap(series =>
        series.photos.map(photo => ({
            id: photo.id,
            url: photo.url,
            title: photo.title,
            seriesTitle: series.title,
            value: photo.title // keeping value if needed compatibility
        }))
    );

    useEffect(() => {
        if (initialParamsProcessed.current) return;

        const params = new URLSearchParams(location.search);
        const subj = params.get('subject');

        if (subj === 'acquisition') {
            setSubject('acquisition');
            const photoTitleParam = params.get('photo');

            if (photoTitleParam) {
                // Find the photo in our flattened list
                const foundPhoto = allPhotosOptions.find(p => p.title === photoTitleParam);
                if (foundPhoto) {
                    // Initial set
                    setSelectedPhotos([foundPhoto]);
                }
                setMessage(t('contact.acquisition_body_selection'));
            } else {
                setMessage(t('contact.acquisition_body_single'));
            }
        }
        initialParamsProcessed.current = true;
    }, [location, t]);

    const handleSelectPhoto = (option: any) => {
        if (!selectedPhotos.some(p => p.id === option.id)) {
            setSelectedPhotos([...selectedPhotos, option]);
        }
    };

    const handleRemovePhoto = (id: number | string) => {
        setSelectedPhotos(selectedPhotos.filter(p => p.id !== id));
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setStatus('submitting');

        const form = e.currentTarget;
        const formData = new FormData(form);

        // Concatenate selected photos into the message
        let artworkTitle = "";
        let seriesTitle = "";
        let format = "";
        let artworkList = "";

        if (subject === 'acquisition' && selectedPhotos.length > 0) {
            const photoListString = selectedPhotos.map(p => `- ${p.title} (${p.seriesTitle})`).join('\n');
            artworkList = photoListString;
            const currentMsg = formData.get('message') as string;
            // Inject the list at the TOP of the message for clarity
            const fullMessage = `[DEMANDE D'ACQUISITION POUR ${selectedPhotos.length} ŒUVRES] :\n${photoListString}\n\n--------------------------------\n\n${currentMsg}`;
            formData.set('message', fullMessage);
            // Update the form's message field value for EmailJS which reads directly from the form element
            if (form.elements.namedItem('message')) {
                (form.elements.namedItem('message') as HTMLTextAreaElement).value = fullMessage;
            }

            // Populate Artwork Details for Admin Template
            if (selectedPhotos.length === 1) {
                artworkTitle = selectedPhotos[0].title;
                seriesTitle = selectedPhotos[0].seriesTitle;
                format = "À définir avec le client";
            } else {
                artworkTitle = "Sélection Multiple (Voir Message)";
                seriesTitle = "Diverses Séries";
                format = "À définir avec le client";
            }
        }

        try {
            const serviceID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
            const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;
            const templateID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
            const clientTemplateID = import.meta.env.VITE_EMAILJS_TEMPLATE_CLIENT_ID || 'template_l8azy4r';

            // Extract values for template mapping
            const userName = formData.get('user_name') as string;
            const userEmail = formData.get('user_email') as string;
            const message = formData.get('message') as string;
            const subj = formData.get('subject') as string;
            const sel = formData.get('selection') as string;

            // SUPERSET PARAMS for Contact Form
            const templateParams = {
                // Core
                user_name: userName,
                user_email: userEmail,
                message: message,
                subject: subj,
                selection: sel,

                // Artwork Specifics (Admin Template)
                artwork_title: artworkTitle,
                series_title: seriesTitle,
                format: format,
                artwork_list: artworkList,

                // Provenance
                source: (subj === 'acquisition' || sel) ? "Page Prints via Formulaire" : "Formulaire Contact",

                // Name aliases
                from_name: userName,
                client_name: userName,
                name: userName,

                // Email aliases
                client_email: userEmail,
                reply_to: userEmail,
                email: userEmail,
            };

            console.log("📨 Sending Form via EmailJS with params:", templateParams);


            // 1. Prepare Promises
            // Netlify (CRM Storage)
            const netlifyPromise = fetch("/", {
                method: "POST",
                headers: { "Content-Type": "application/x-www-form-urlencoded" },
                body: new URLSearchParams(formData as any).toString(),
            });

            // EmailJS (Admin Notification)
            const adminEmailPromise = emailjs.send(
                serviceID,
                templateID,
                templateParams,
                publicKey
            );

            // EmailJS (Client Acknowledgement)
            const clientEmailPromise = emailjs.send(
                serviceID,
                clientTemplateID,
                templateParams,
                publicKey
            );

            // 2. Wait for ALL (Netlify + Admin Email + Client Email)
            await Promise.all([netlifyPromise, adminEmailPromise, clientEmailPromise]);

            // 3. Success
            setStatus('success');
            setIsSubmitted(true);

            // Clean up
            setMessage('');
            setSelectedPhotos([]);
            setSubject('');
            form.reset();
            window.scrollTo({ top: 0, behavior: 'smooth' });

        } catch (error) {
            console.error("Submission Error:", error);
            setStatus('error');
            alert("Une erreur est survenue lors de l'envoi. Merci de me contacter directement par email.");
        }
    };

    if (isSubmitted) {
        return (
            <div className="min-h-screen pt-32 px-4 md:px-8 pb-12 flex flex-col items-center justify-center max-w-2xl mx-auto text-center">
                <SEO
                    title={t('contact.title')}
                    description="Merci pour votre message."
                />
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6 }}
                    className="space-y-8"
                >
                    <h1 className="text-4xl md:text-5xl font-space-mono text-off-white uppercase tracking-tighter">
                        Merci !
                    </h1>
                    <div className="w-16 h-px bg-darkroom-red mx-auto" />
                    <p className="text-silver font-inter text-lg leading-relaxed max-w-lg mx-auto">
                        Votre demande a bien été transmise à l'atelier.<br />
                        Je reviens vers vous par email sous 24h pour finaliser les détails.
                    </p>
                    <a
                        href="/"
                        className="inline-flex items-center gap-2 text-xs font-space-mono text-off-white border border-white/20 px-8 py-4 hover:bg-white/5 hover:border-off-white transition-all duration-300 uppercase tracking-widest mt-8"
                    >
                        <ArrowLeft size={16} />
                        {t('contact.back_gallery')}
                    </a>
                </motion.div>
            </div>
        );
    }

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
                    {t('contact.available_prints', { defaultValue: "Tirages d'art disponibles sur demande. Éditions limitées." })}
                </p>

                <form
                    className="space-y-12"
                    name="contact"
                    method="post"
                    data-netlify="true"
                    onSubmit={handleSubmit}
                >
                    <input type="hidden" name="form-name" value="contact" />
                    <p hidden><label>Don’t fill this out if you’re human: <input name="bot-field" /></label></p>
                    <input type="hidden" name="subject" value={subject} />
                    <input type="hidden" name="selection" value={selectedPhotos.map(p => p.title).join(', ')} />

                    <div className="group">
                        <label htmlFor="name" className="block text-xs font-space-mono text-silver uppercase tracking-widest mb-2 group-focus-within:text-darkroom-red transition-colors">
                            {t('contact.name')}
                        </label>
                        <input
                            type="text"
                            id="name"
                            name="user_name" // Matched to your template {user_name}
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
                            name="user_email" // Matched to your template {user_email}
                            required
                            className="w-full bg-transparent border-b border-white/20 py-2 text-off-white font-inter focus:outline-none focus:border-darkroom-red transition-colors"
                            placeholder={t('contact.placeholderEmail')}
                        />
                    </div>

                    {/* Acquisition Logic */}
                    {(subject === 'acquisition' || selectedPhotos.length > 0) && (
                        <div className="space-y-6 bg-white/5 p-4 md:p-6 border border-white/10 rounded-sm">

                            {/* Visual Selector */}
                            <VisualSelector
                                options={allPhotosOptions}
                                onSelect={handleSelectPhoto}
                                label={t('contact.add_selection')}
                                placeholder={selectedPhotos.length === 0 ? t('contact.select_work') : t('contact.add_another')}
                            />

                            {/* "Cart" / Selected Items */}
                            <div className="space-y-3">
                                <label className="block text-xs font-space-mono text-silver uppercase tracking-widest">
                                    {t('contact.your_selection')} ({selectedPhotos.length})
                                </label>

                                {selectedPhotos.length === 0 ? (
                                    <p className="text-silver/40 text-sm italic font-inter px-2">{t('contact.no_selection')}</p>
                                ) : (
                                    <div className="grid gap-3">
                                        <AnimatePresence>
                                            {selectedPhotos.map(photo => (
                                                <motion.div
                                                    key={photo.id}
                                                    initial={{ opacity: 0, height: 0 }}
                                                    animate={{ opacity: 1, height: 'auto' }}
                                                    exit={{ opacity: 0, height: 0 }}
                                                    className="flex flex-col sm:flex-row items-start sm:items-center justify-between bg-black/40 border border-white/10 p-2 pr-2 sm:pr-4 group/item gap-3 sm:gap-0"
                                                >
                                                    <div className="flex items-center gap-4 w-full sm:w-auto">
                                                        <img src={photo.url} alt={photo.title} className="w-12 h-12 object-cover shrink-0" />
                                                        <div className="min-w-0">
                                                            <p className="text-off-white font-bold text-sm truncate">{photo.title}</p>
                                                            <p className="text-silver/50 text-[10px] font-space-mono uppercase">{photo.seriesTitle}</p>
                                                        </div>
                                                    </div>
                                                    <button
                                                        type="button"
                                                        onClick={() => handleRemovePhoto(photo.id)}
                                                        className="text-silver/40 hover:text-darkroom-red transition-colors p-2 self-end sm:self-auto"
                                                        title={t('contact.remove_selection')}
                                                        aria-label={t('contact.remove_selection')}
                                                    >
                                                        <X className="w-4 h-4" />
                                                    </button>
                                                </motion.div>
                                            ))}
                                        </AnimatePresence>
                                    </div>
                                )}
                            </div>
                        </div>
                    )}


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
                            {t('contact.consent_text')} <a href="/legals" className="underline hover:text-darkroom-red text-silver">{t('contact.consent_link')}</a>.
                        </label>
                    </div>

                    <div className="text-center pt-8">
                        <button
                            type="submit"
                            disabled={status === 'submitting'}
                            className="text-off-white font-space-mono uppercase tracking-widest text-sm border border-white/20 px-8 py-3 hover:bg-white/5 hover:border-off-white transition-all duration-300 disabled:opacity-50 w-full md:w-auto"
                        >
                            {status === 'submitting' ? t('contact.developing') :
                                (subject === 'acquisition' && selectedPhotos.length > 0) ? t('contact.validate_request') : t('contact.send')}
                        </button>

                        {(subject === 'acquisition' && selectedPhotos.length > 0) && (
                            <p className="text-[10px] text-silver/50 font-inter mt-3">
                                {t('contact.payment_info')}
                            </p>
                        )}
                    </div>

                    {/* Back to Gallery Link - "Cerise sur le gâteau" */}
                    <div className="text-center mt-12">
                        <a href="/" className="text-xs font-space-mono text-silver/40 hover:text-off-white transition-colors uppercase tracking-widest">
                            {t('contact.back_gallery')}
                        </a>
                    </div>
                </form>
            </motion.div>
        </div>
    );
};

export default Contact;
