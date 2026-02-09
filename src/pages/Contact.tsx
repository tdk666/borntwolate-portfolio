import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useState, useEffect, useRef, useMemo } from 'react';
import { SEO } from '../components/SEO';
import { useLocation } from 'react-router-dom';
import { seriesData } from '../data/photos';
import VisualSelector from '../components/VisualSelector';
import { X, ArrowLeft } from 'lucide-react';
import emailjs from '@emailjs/browser';
import { FadeIn } from '../components/animations/FadeIn';

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
    const [initialFormat, setInitialFormat] = useState("Non défini");
    const [initialFinition, setInitialFinition] = useState("Non définie");
    const initialParamsProcessed = useRef(false);

    // Helper to get all photos for the selector
    const allPhotosOptions = useMemo(() => seriesData.flatMap(series =>
        series.photos.map(photo => ({
            id: photo.id,
            url: photo.url,
            title: photo.title,
            seriesTitle: series.title,
            value: photo.title // keeping value if needed compatibility
        }))
    ), []);

    useEffect(() => {
        if (initialParamsProcessed.current) return;

        const params = new URLSearchParams(location.search);
        const subj = params.get('subject');

        if (subj === 'acquisition') {
            setSubject('acquisition');
            const photoTitleParam = params.get('photo');
            const formatParam = params.get('format');
            const finitionParam = params.get('finition');

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

            if (formatParam) setInitialFormat(formatParam);
            if (finitionParam) setInitialFinition(finitionParam);
        }
        initialParamsProcessed.current = true;
    }, [location, t, allPhotosOptions]);

    interface SelectorOption {
        id: number | string;
        url: string;
        title: string;
        seriesTitle: string;
        value: string;
    }

    const handleSelectPhoto = (option: SelectorOption) => {
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
        let artworkList = "";

        // Standard Acquisition Logic (Pre-selection)
        if (subject === 'acquisition' && selectedPhotos.length > 0) {
            const photoListString = selectedPhotos.map(p => `- ${p.title} (${p.seriesTitle})`).join('\n');
            artworkList = photoListString;

            // Populate Artwork Details for Admin Template defaults
            if (selectedPhotos.length === 1) {
                artworkTitle = selectedPhotos[0].title;
                seriesTitle = selectedPhotos[0].seriesTitle;
            } else {
                artworkTitle = "Sélection Multiple (Voir Message)";
                seriesTitle = "Diverses Séries";
            }
        }

        // Get Explicit User Choices from Form
        const formatSelected = formData.get('format') as string || "Non défini";
        const finitionSelected = formData.get('finition') as string || "Non définie";


        // Construct Message Body
        const currentMsg = formData.get('message') as string;
        let finalMessage = currentMsg;

        if (subject === 'acquisition') {
            // Append Specs
            const specs = `\n\n[SPECIFICATIONS]\nFormat : ${formatSelected}\nFinition : ${finitionSelected}`;

            // Prepend Selection if exists
            if (selectedPhotos.length > 0) {
                const photoListString = selectedPhotos.map(p => `- ${p.title} (${p.seriesTitle})`).join('\n');
                finalMessage = `[DEMANDE D'ACQUISITION POUR ${selectedPhotos.length} ŒUVRES] :\n${photoListString}\n\n${specs}\n\n--------------------------------\n\n${currentMsg}`;
            } else {
                finalMessage = `[DEMANDE D'ACQUISITION SPONTANÉE]\n${specs}\n\n--------------------------------\n\n${currentMsg}`;
            }

            // Update FormData for Netlify
            formData.set('message', finalMessage);
        }

        try {
            const serviceID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
            const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;
            const templateID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
            const clientTemplateID = import.meta.env.VITE_EMAILJS_TEMPLATE_CLIENT_ID || 'template_l8azy4r';

            // Robustness Check: Ensure Env Vars are present
            if (!serviceID || !publicKey || !templateID) {
                console.error("Critical Error: Missing EmailJS Environment Variables.");
                alert("Erreur de configuration du formulaire. Veuillez me contacter directement par email.");
                setStatus('error');
                return;
            }

            // Extract values for template mapping
            const userName = formData.get('user_name') as string;
            const userEmail = formData.get('user_email') as string;
            const subj = formData.get('subject') as string;
            const sel = formData.get('selection') as string;

            // SUPERSET PARAMS for Contact Form
            const templateParams = {
                // Core
                user_name: userName,
                user_email: userEmail,
                message: finalMessage,
                subject: (subj === 'acquisition' || selectedPhotos.length > 0) ? "NOUVELLE ACQUISITION" : (subj || "Nouveau Message Contact"),
                selection: sel,

                // Artwork Specifics (Admin Template) - EXPLICIT PLACEHOLDERS FOR GENERAL CONTACT
                artwork_title: artworkTitle || "Demande de Contact / Collaboration",
                series_title: seriesTitle || "Aucune (Message Général)",
                format: (formatSelected && formatSelected !== "Non défini") ? formatSelected : "N/A",
                finition: (finitionSelected && finitionSelected !== "Non définie") ? finitionSelected : "-",
                price: "-", // General contact doesn't have a price
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
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
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

            // 2. Wait for ALL (Netlify + Admin Email + Client Email) using allSettled for robustness
            const results = await Promise.allSettled([netlifyPromise, adminEmailPromise, clientEmailPromise]);

            // Check results
            const netlifyResult = results[0];
            const adminResult = results[1];
            // clientResult is results[2] (optional, less critical)

            // Critical failure: If Netlify AND Admin Email fail, then it's a real error.
            // If at least one works, we consider it a success for the user (we don't want to block them).
            const isNetlifySuccess = netlifyResult.status === 'fulfilled';
            const isAdminSuccess = adminResult.status === 'fulfilled';

            if (!isNetlifySuccess && !isAdminSuccess) {
                throw new Error("Both storage services failed.");
            }

            if (!isNetlifySuccess) console.error("Netlify Save Failed:", (netlifyResult as PromiseRejectedResult).reason);
            if (!isAdminSuccess) console.error("Element Admin Email Failed:", (adminResult as PromiseRejectedResult).reason);

            // 3. Success (Partial or Full)
            setStatus('success');
            setIsSubmitted(true);

            // Clean up
            setMessage('');
            setSelectedPhotos([]);
            setSubject('');
            form.reset();
            window.scrollTo({ top: 0, behavior: 'smooth' });

        } catch (error) {
            console.error("Critical Submission Error:", error);
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
                <FadeIn className="space-y-8">
                    <h1 className="text-4xl md:text-5xl font-space-mono text-off-white uppercase tracking-tighter">
                        Message envoyé
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
                </FadeIn>
            </div>
        );
    }

    return (
        <div className="min-h-screen pt-32 px-4 md:px-8 pb-12 flex flex-col items-center justify-center max-w-2xl mx-auto">
            <SEO
                title={t('contact.title')}
                description="Contactez Théophile Dequecker pour des tirages d'art, des collaborations ou simplement pour échanger sur la photographie argentique."
            />
            <FadeIn className="w-full">
                <h1 className="text-4xl md:text-5xl font-space-mono text-off-white uppercase tracking-tighter text-center mb-2">
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

                    {/* ACQUISITION SPECIFICS: Format & Finition */}
                    {(subject === 'acquisition') && (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-white/10 mb-6">
                            <div className="group">
                                <label htmlFor="format" className="block text-xs font-space-mono text-silver uppercase tracking-widest mb-2 group-focus-within:text-darkroom-red transition-colors">
                                    {t('contact.format_label')}
                                </label>
                                <select
                                    id="format"
                                    name="format"
                                    defaultValue={initialFormat}
                                    key={`format-${initialFormat}`} // Force re-render if initial changes
                                    className="w-full bg-black/50 border-b border-white/20 py-2 text-off-white font-inter focus:outline-none focus:border-darkroom-red transition-colors appearance-none"
                                >
                                    <option value="Non défini" className="bg-black text-silver">{t('contact.options.unknown')}</option>
                                    <option value="20x30 cm (A4)" className="bg-black text-off-white">{t('contact.options.a4')}</option>
                                    <option value="30x45 cm (A3+)" className="bg-black text-off-white">{t('contact.options.a3')}</option>
                                    <option value="40x60 cm" className="bg-black text-off-white">{t('contact.options.large')}</option>
                                    <option value="60x90 cm" className="bg-black text-off-white">{t('contact.options.giant')}</option>
                                    <option value="Sur Mesure" className="bg-black text-off-white">{t('contact.options.custom')}</option>
                                </select>
                            </div>

                            <div className="group">
                                <label htmlFor="finition" className="block text-xs font-space-mono text-silver uppercase tracking-widest mb-2 group-focus-within:text-darkroom-red transition-colors">
                                    {t('contact.finish_label')}
                                </label>
                                <select
                                    id="finition"
                                    name="finition"
                                    defaultValue={initialFinition}
                                    key={`finition-${initialFinition}`} // Force re-render
                                    className="w-full bg-black/50 border-b border-white/20 py-2 text-off-white font-inter focus:outline-none focus:border-darkroom-red transition-colors appearance-none"
                                >
                                    <option value="Non définie" className="bg-black text-silver">{t('contact.options.unknown')}</option>
                                    <option value="Tirage Seul" className="bg-black text-off-white">{t('contact.options.print_only')}</option>
                                    <option value="Encadré Nielsen" className="bg-black text-off-white">{t('contact.options.framed')}</option>
                                    <option value="Caisse Américaine" className="bg-black text-off-white">{t('contact.options.shadow_box')}</option>
                                </select>
                            </div>
                        </div>
                    )}

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
                                (subject === 'acquisition') ? t('contact.validate_request') : t('contact.send')}
                        </button>
                    </div>

                    {/* Back to Gallery Link - "Cerise sur le gâteau" */}
                    <div className="text-center mt-12">
                        <a href="/" className="text-xs font-space-mono text-silver/40 hover:text-off-white transition-colors uppercase tracking-widest">
                            {t('contact.back_gallery')}
                        </a>
                    </div>
                </form>
            </FadeIn>
        </div>
    );
};

export default Contact;
