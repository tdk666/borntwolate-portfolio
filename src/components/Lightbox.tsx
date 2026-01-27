import { useEffect, useCallback, useState, useRef } from 'react';
import { motion, useAnimation, type PanInfo } from 'framer-motion';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import type { Photo } from '../data/photos';
import { useTranslation } from 'react-i18next';
import AcquisitionModal from './AcquisitionModal';

interface LightboxProps {
    photo: Photo;
    onClose: () => void;
    onNext: () => void;
    onPrev: () => void;
}

const Lightbox = ({ photo, onClose, onNext, onPrev }: LightboxProps) => {
    const { t, i18n } = useTranslation();
    const currentLang = i18n.language.split('-')[0] as 'fr' | 'en';
    const controls = useAnimation();

    // --- FIX 1: UseRef pour un verrouillage immédiat (Synchrone) ---
    const isNavigatingRef = useRef(false);
    const [showInfo, setShowInfo] = useState(false);
    const [isAcquisitionOpen, setIsAcquisitionOpen] = useState(false);

    const handleNavigate = useCallback((direction: 'next' | 'prev') => {
        // Si déjà en cours de navigation, on bloque immédiatement
        if (isNavigatingRef.current) return;

        isNavigatingRef.current = true;

        if (direction === 'next') onNext();
        else onPrev();

        // Cooldown de 500ms
        setTimeout(() => {
            isNavigatingRef.current = false;
        }, 500);
    }, [onNext, onPrev]);

    const handleKeyDown = useCallback((e: KeyboardEvent) => {
        if (e.key === 'Escape') onClose();
        if (e.key === 'ArrowRight') handleNavigate('next');
        if (e.key === 'ArrowLeft') handleNavigate('prev');
    }, [onClose, handleNavigate]);

    useEffect(() => {
        document.addEventListener('keydown', handleKeyDown);
        return () => document.removeEventListener('keydown', handleKeyDown);
    }, [handleKeyDown]);


    const [touchStart, setTouchStart] = useState<{ x: number, y: number } | null>(null);
    const [touchEnd, setTouchEnd] = useState<{ x: number, y: number } | null>(null);

    const onTouchStart = (e: React.TouchEvent) => {
        if ((e.target as HTMLElement).tagName === 'IMG') {
            setTouchStart(null);
            return;
        }
        setTouchEnd(null);
        setTouchStart({ x: e.targetTouches[0].clientX, y: e.targetTouches[0].clientY });
    };

    const onTouchMove = (e: React.TouchEvent) => {
        if (touchStart === null) return;
        setTouchEnd({ x: e.targetTouches[0].clientX, y: e.targetTouches[0].clientY });
    };

    const onTouchEnd = () => {
        if (!touchStart || !touchEnd) return;

        const distanceX = touchStart.x - touchEnd.x;
        const distanceY = touchStart.y - touchEnd.y;

        // If vertical movement is dominant, it's a scroll, ignore swipe
        if (Math.abs(distanceY) > Math.abs(distanceX)) {
            // Reset
            setTouchStart(null);
            setTouchEnd(null);
            return;
        }

        const isLeftSwipe = distanceX > 50;
        const isRightSwipe = distanceX < -50;

        if (isLeftSwipe) handleNavigate('next');
        if (isRightSwipe) handleNavigate('prev');

        // Reset
        setTouchStart(null);
        setTouchEnd(null);
    };

    const handleDragEnd = (_: unknown, info: PanInfo) => {
        const threshold = 50;
        if (info.offset.x > threshold) handleNavigate('prev');
        else if (info.offset.x < -threshold) handleNavigate('next');
        else controls.start({ x: 0 });
    };

    const getLocalizedText = (content: { fr: string, en: string } | string) => {
        if (!content) return "";
        return typeof content === 'string' ? content : (content[currentLang] || content['fr']);
    };

    return (
        <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/98 backdrop-blur-xl flex items-center justify-center"
            onClick={onClose}
            // Handlers manuels pour le fond noir uniquement
            onTouchStart={onTouchStart}
            onTouchMove={onTouchMove}
            onTouchEnd={onTouchEnd}
        >
            <button onClick={onClose} aria-label="Fermer la vue plein écran" className="absolute top-4 right-4 text-white/50 hover:text-white transition-colors p-2 z-50"><X size={32} strokeWidth={1} /></button>

            <div className="relative w-full h-full flex flex-col md:flex-row items-center justify-center p-0 md:p-4 overflow-hidden" onClick={(e) => e.stopPropagation()}>

                {/* Zone Image */}
                <div className="relative flex-1 h-full w-full flex items-center justify-center p-0 md:p-2 bg-black/90 group">
                    <button onClick={(e) => { e.stopPropagation(); onPrev(); }} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/50 hover:text-white transition-all z-50 hidden md:block p-2 hover:bg-white/10 rounded-full"><ChevronLeft size={48} strokeWidth={0.5} /></button>
                    <button onClick={(e) => { e.stopPropagation(); onNext(); }} className="absolute right-4 top-1/2 -translate-y-1/2 text-white/50 hover:text-white transition-all z-50 hidden md:block p-2 hover:bg-white/10 rounded-full"><ChevronRight size={48} strokeWidth={0.5} /></button>

                    <motion.img
                        layoutId={`photo-${photo.id}`}
                        key={photo.url}
                        src={photo.url}
                        alt={photo.title}
                        // Framer Motion Drag (Gère le swipe sur l'image)
                        drag="x"
                        dragConstraints={{ left: 0, right: 0 }}
                        dragElastic={0.2}
                        onDragEnd={handleDragEnd}
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                        onContextMenu={(e) => e.preventDefault()}
                        draggable={false}
                        className={`w-auto max-w-full object-contain shadow-2xl touch-pan-y transition-all duration-500 select-none
                            ${showInfo ? 'max-h-[50vh] md:max-h-[96vh]' : 'max-h-[85vh] md:max-h-[96vh]'} 
                        `}
                    />
                </div>

                {/* Sidebar / Bottom Sheet (Code existant inchangé pour l'affichage) */}
                <div className="hidden md:flex w-[400px] h-full flex-col items-center justify-center p-12 border-l border-white/10 z-20">
                    <h3 className="text-2xl font-mono text-off-white mb-4 uppercase tracking-widest leading-relaxed font-medium text-center">{photo.title}</h3>
                    <div className="w-16 h-px bg-darkroom-red/60 mx-auto mb-4" />
                    {photo.technical_info && <p className="font-mono text-xs text-silver/60 uppercase tracking-widest mb-6 text-center">{photo.technical_info}</p>}
                    {photo.caption_artistic && (
                        <div className="prose prose-invert mx-auto w-full">
                            <p className="font-inter font-light text-sm md:text-base text-silver leading-relaxed text-left whitespace-pre-line opacity-90">
                                {getLocalizedText(photo.caption_artistic).split('.').filter((s: string) => s.trim().length > 0).join('.\n')}
                            </p>
                        </div>
                    )}

                    {/* Acquisition Link */}
                    {/* Acquisition Link */}
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            setIsAcquisitionOpen(true);
                        }}
                        className="mt-8 text-xs font-space-mono text-silver/50 hover:text-darkroom-red transition-colors uppercase tracking-widest underline decoration-1 underline-offset-4 py-2"
                    >
                        {t('lightbox.collect_button')}
                    </button>
                </div>

                <div className="md:hidden absolute bottom-0 left-0 w-full z-[80] pointer-events-none">
                    <motion.div
                        drag="y"
                        dragConstraints={{ top: -300, bottom: 0 }}
                        dragElastic={0.2}
                        onDragEnd={(_, info) => {
                            if (info.offset.y < -50) setShowInfo(true);
                            else if (info.offset.y > 50) setShowInfo(false);
                        }}
                        animate={{ y: showInfo ? -20 : 0 }}
                        className="pointer-events-auto"
                    >
                        <div
                            className="bg-gradient-to-t from-black via-black/80 to-transparent pt-16 pb-6 px-6 cursor-pointer flex flex-col items-center"
                            onClick={() => setShowInfo(!showInfo)}
                        >
                            {!showInfo && (
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                                    className="flex flex-col items-center gap-2 mb-2"
                                >
                                    <div className="w-12 h-1 bg-white/30 rounded-full" />
                                    <span className="text-[10px] text-white/50 uppercase tracking-widest font-space-mono">{t('lightbox.scan')}</span>
                                </motion.div>
                            )}
                            <div className="w-full flex justify-between items-end">
                                <h3 className="text-xl font-mono text-off-white uppercase tracking-widest leading-none drop-shadow-md">{photo.title}</h3>
                            </div>
                        </div>

                        <motion.div
                            initial={false}
                            animate={{ height: showInfo ? 'auto' : 0, opacity: showInfo ? 1 : 0 }}
                            transition={{ type: "spring", stiffness: 300, damping: 30 }}
                            className="bg-black/95 backdrop-blur-xl px-6 overflow-hidden border-t border-white/10 pb-12"
                        >
                            <div className="py-8 space-y-6">
                                {photo.technical_info && <p className="font-mono text-xs text-darkroom-red uppercase tracking-widest">{photo.technical_info}</p>}
                                {photo.caption_artistic && <p className="font-inter font-light text-sm text-silver leading-relaxed text-justify whitespace-pre-line">{getLocalizedText(photo.caption_artistic)}</p>}
                                <div className="pt-4 flex flex-col items-center gap-4">
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            setIsAcquisitionOpen(true);
                                        }}
                                        className="bg-white text-black px-8 py-3 rounded-full font-medium hover:bg-gray-200 transition-colors uppercase tracking-widest text-xs"
                                    >
                                        {t('lightbox.collect_button')}
                                    </button>
                                    <button onClick={() => setShowInfo(false)} className="text-xs text-white/30 uppercase tracking-widest hover:text-white py-2 px-4">{t('lightbox.close')}</button>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                </div>

            </div>

            <AcquisitionModal
                isOpen={isAcquisitionOpen}
                onClose={() => setIsAcquisitionOpen(false)}
                photoTitle={photo.title || "Tirage d'Art"}
                imageSrc={photo.url}
            />
        </motion.div>
    );
};
export default Lightbox;
