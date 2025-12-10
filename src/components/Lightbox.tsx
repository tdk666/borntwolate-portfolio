import { useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
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

    const handleKeyDown = useCallback((e: KeyboardEvent) => {
        if (e.key === 'Escape') onClose();
        if (e.key === 'ArrowRight') onNext();
        if (e.key === 'ArrowLeft') onPrev();
    }, [onClose, onNext, onPrev]);

    useEffect(() => {
        document.addEventListener('keydown', handleKeyDown);
        return () => document.removeEventListener('keydown', handleKeyDown);
    }, [handleKeyDown]);

    return (
        <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/98 backdrop-blur-xl flex flex-col md:flex-row"
            onClick={onClose}
        >
            <button onClick={onClose} className="absolute top-4 right-4 text-white/50 hover:text-white transition-colors p-2 z-50 md:hidden"><X size={32} strokeWidth={1} /></button>
            <button onClick={(e) => { e.stopPropagation(); onClose(); }} className="absolute top-6 right-6 text-white/50 hover:text-red-500 transition-colors p-2 z-[60] hidden md:block"><X size={24} strokeWidth={1} /></button>

            {/* Zone Image (Gauche/Centre) */}
            <div className="relative flex-1 h-full flex items-center justify-center p-4 md:p-8 overflow-hidden" onClick={(e) => e.stopPropagation()}>
                <button onClick={(e) => { e.stopPropagation(); onPrev(); }} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30 hover:text-white transition-colors z-40 hidden md:block p-4"><ChevronLeft size={48} strokeWidth={0.5} /></button>
                <button onClick={(e) => { e.stopPropagation(); onNext(); }} className="absolute right-4 top-1/2 -translate-y-1/2 text-white/30 hover:text-white transition-colors z-40 hidden md:block p-4"><ChevronRight size={48} strokeWidth={0.5} /></button>

                <motion.img
                    key={photo.url} src={photo.url} alt={photo.title}
                    initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    className="w-full h-full object-contain shadow-2xl select-none"
                    onContextMenu={(e) => e.preventDefault()}
                    draggable="false"
                />
            </div>

            {/* Zone Métadonnées (Droite) */}
            <div
                className="w-full md:w-[400px] bg-deep-black/90 md:border-l border-white/10 p-8 flex flex-col justify-center relative z-50 overflow-y-auto"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="space-y-8 text-center px-4">
                    <div>
                        <h3 className="text-xl md:text-2xl font-mono text-off-white mb-4 uppercase tracking-widest leading-relaxed font-medium">{photo.title}</h3>
                        <div className="w-16 h-px bg-darkroom-red/60 mx-auto mb-6" />
                        {photo.technical_info && <p className="font-mono text-xs text-silver/60 uppercase tracking-widest">{photo.technical_info}</p>}
                    </div>

                    {photo.caption_artistic && photo.caption_artistic[currentLang] && (
                        <div className="prose prose-invert mx-auto w-full">
                            <p className="font-inter font-light text-base md:text-lg text-silver leading-relaxed text-left whitespace-pre-line opacity-90">
                                {photo.caption_artistic[currentLang].replace(/([.!?])\s+(?=[A-Z])/g, "$1\n")}
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </motion.div>
    );
};
export default Lightbox;
