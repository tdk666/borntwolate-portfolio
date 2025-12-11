import { useEffect, useCallback, useState } from 'react';
import { motion, useAnimation, type PanInfo, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, Info } from 'lucide-react';
import type { Photo } from '../data/photos';
import { useTranslation } from 'react-i18next';

interface LightboxProps {
    photo: Photo;
    onClose: () => void;
    onNext: () => void;
    onPrev: () => void;
}

const Lightbox = ({ photo, onClose, onNext, onPrev }: LightboxProps) => {
    const { i18n } = useTranslation();
    const currentLang = i18n.language.split('-')[0] as 'fr' | 'en';
    const controls = useAnimation();
    const [showInfo, setShowInfo] = useState(false); // État pour le panneau mobile

    const handleKeyDown = useCallback((e: KeyboardEvent) => {
        if (e.key === 'Escape') onClose();
        if (e.key === 'ArrowRight') onNext();
        if (e.key === 'ArrowLeft') onPrev();
    }, [onClose, onNext, onPrev]);

    useEffect(() => {
        document.addEventListener('keydown', handleKeyDown);
        return () => document.removeEventListener('keydown', handleKeyDown);
    }, [handleKeyDown]);

    const handleDragEnd = (_: any, info: PanInfo) => {
        const threshold = 50;
        if (info.offset.x > threshold) onPrev();
        else if (info.offset.x < -threshold) onNext();
        else controls.start({ x: 0 });
    };

    const getLocalizedText = (content: any) => {
        if (!content) return "";
        return typeof content === 'string' ? content : (content[currentLang] || content['fr']);
    };

    return (
        <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/98 backdrop-blur-xl flex items-center justify-center"
            onClick={onClose}
        >
            <button onClick={onClose} className="absolute top-4 right-4 text-white/50 hover:text-white transition-colors p-2 z-50"><X size={32} strokeWidth={1} /></button>



            <div className="relative w-full h-full flex flex-col md:flex-row items-center justify-center p-0 md:p-4 overflow-hidden" onClick={(e) => e.stopPropagation()}>

                {/* Image Area - Contains Image AND Buttons now */}
                <div className="relative flex-1 h-full w-full flex items-center justify-center p-0 md:p-2 bg-black/90 group">
                    <button onClick={(e) => { e.stopPropagation(); onPrev(); }} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/50 hover:text-white transition-all z-50 hidden md:block p-2 hover:bg-white/10 rounded-full"><ChevronLeft size={48} strokeWidth={0.5} /></button>
                    <button onClick={(e) => { e.stopPropagation(); onNext(); }} className="absolute right-4 top-1/2 -translate-y-1/2 text-white/50 hover:text-white transition-all z-50 hidden md:block p-2 hover:bg-white/10 rounded-full"><ChevronRight size={48} strokeWidth={0.5} /></button>

                    <motion.img
                        key={photo.url}
                        src={photo.url}
                        alt={photo.title}
                        drag="x"
                        dragConstraints={{ left: 0, right: 0 }}
                        dragElastic={0.2}
                        onDragEnd={handleDragEnd}
                        animate={controls}
                        initial={{ opacity: 0, scale: 0.96 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                        onContextMenu={(e) => e.preventDefault()}
                        draggable={false}
                        className={`w-auto max-w-full object-contain shadow-2xl touch-pan-y transition-all duration-500 select-none
                            ${showInfo ? 'max-h-[50vh] md:max-h-[96vh]' : 'max-h-[85vh] md:max-h-[96vh]'} 
                        `}
                    />
                </div>

                {/* --- CONTAINER INFO (Desktop: Sidebar Right / Mobile: Bottom Sheet) --- */}

                {/* VERSION DESKTOP (MD+) : Sidebar Droite */}
                <div className="
                    hidden md:flex
                    w-[400px] h-full
                    flex-col items-center justify-center
                    p-12
                    border-l border-white/10
                    z-20
                ">
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
                </div>

                {/* VERSION MOBILE (SM) : Bottom Sheet Intelligente */}
                <div className="md:hidden absolute bottom-0 left-0 w-full z-40">
                    <AnimatePresence>
                        {/* Barre Titre (Toujours visible) */}
                        <div
                            className="bg-gradient-to-t from-black via-black/80 to-transparent pt-12 pb-8 px-6 flex justify-between items-end cursor-pointer"
                            onClick={() => setShowInfo(!showInfo)}
                        >
                            <div>
                                <h3 className="text-xl font-mono text-off-white uppercase tracking-widest leading-none">{photo.title}</h3>
                                {!showInfo && <p className="text-[10px] text-silver/50 uppercase tracking-widest mt-2 font-space-mono">Plus d'infos</p>}
                            </div>
                            <button className="text-white/80 p-2 bg-white/10 rounded-full backdrop-blur-sm">
                                <Info size={20} />
                            </button>
                        </div>

                        {/* Contenu Dépliable */}
                        {showInfo && (
                            <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: 'auto', opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                className="bg-black/90 backdrop-blur-xl px-6 pb-12 border-t border-white/10"
                            >
                                <div className="w-12 h-1 bg-white/20 rounded-full mx-auto my-4" />

                                {photo.technical_info && (
                                    <p className="font-mono text-xs text-darkroom-red uppercase tracking-widest mb-4">
                                        {photo.technical_info}
                                    </p>
                                )}

                                {photo.caption_artistic && (
                                    <p className="font-inter font-light text-sm text-silver leading-relaxed text-justify whitespace-pre-line">
                                        {getLocalizedText(photo.caption_artistic)}
                                    </p>
                                )}
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

            </div>
        </motion.div>
    );
};
export default Lightbox;
