import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation, Trans } from 'react-i18next';
import { useState, useEffect } from 'react';
import { SEO } from '../components/SEO';
import { useLocation } from 'react-router-dom';
import { seriesData } from '../data/photos';
import VisualSelector from '../components/VisualSelector';
import { X } from 'lucide-react';


const Contact = () => {
    const { t } = useTranslation();
    const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
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
        const params = new URLSearchParams(location.search);
        const subj = params.get('subject');

        if (subj === 'acquisition') {
            setSubject('acquisition');
            const photoTitleParam = params.get('photo');

            if (photoTitleParam) {
                // Find the photo in our flattened list
                const foundPhoto = allPhotosOptions.find(p => p.title === photoTitleParam);
                if (foundPhoto) {
                    // Check if not already added to avoid duplicates on strict mode re-renders
                    setSelectedPhotos(prev => {
                        if (prev.some(p => p.id === foundPhoto.id)) return prev;
                        return [...prev, foundPhoto];
                    });
                }
                setMessage(t('contact.acquisition_body_selection'));
            } else {
                setMessage(t('contact.acquisition_body_single'));
            }
        }
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

        const formData = new FormData(e.currentTarget);

        // Concatenate selected photos into the message
        if (subject === 'acquisition' && selectedPhotos.length > 0) {
            const photoListString = selectedPhotos.map(p => `- ${p.title} (${p.seriesTitle})`).join('\n');
            const currentMsg = formData.get('message') as string;
            // Inject the list at the TOP of the message for clarity
            formData.set('message', `[DEMANDE D'ACQUISITION POUR ${selectedPhotos.length} ŒUVRES] :\n${photoListString}\n\n--------------------------------\n\n${currentMsg}`);
        }

        try {
            await fetch('/', {
                method: 'POST',
                headers: { "Content-Type": "application/x-www-form-urlencoded" },
                body: new URLSearchParams(formData as unknown as Record<string, string>).toString()
            });
            setStatus('success');
            (e.target as HTMLFormElement).reset();
            setMessage('');
            setSubject('');
            setSelectedPhotos([]);
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
                    {t('contact.available_prints', { defaultValue: "Tirages d'art disponibles sur demande. Éditions limitées." })}
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
                                status === 'success' ?
                                    (subject === 'acquisition' ? t('contact.sent_workshop') : t('contact.fixed_bath')) :
                                    (subject === 'acquisition' && selectedPhotos.length > 0) ? t('contact.validate_request') : t('contact.send')}
                        </button>

                        {(status === 'success' && subject === 'acquisition') && (
                            <motion.p
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="text-sm text-off-white font-inter mt-4 max-w-md mx-auto"
                            >
                                <Trans i18nKey="contact.success_message" values={{ titles: selectedPhotos.map(p => p.title).join(', ') }}>
                                    Merci ! Votre sélection pour <span className="text-darkroom-red">TITRES</span> a été transmise. Je reviens vers vous sous 24h pour finaliser les détails.
                                </Trans>
                            </motion.p>
                        )}

                        {status !== 'success' && (subject === 'acquisition' && selectedPhotos.length > 0) && (
                            <p className="text-[10px] text-silver/50 font-inter mt-3">
                                {t('contact.payment_info')}
                            </p>
                        )}

                        {status === 'error' && <p className="text-red-500 font-space-mono text-xs mt-4">{t('contact.error_message')}</p>}
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
