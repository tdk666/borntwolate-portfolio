import { useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import type { Photo } from '../data/photos';

interface LightboxProps {
    photo: Photo;
    onClose: () => void;
    onNext: () => void;
    onPrev: () => void;
}

const Lightbox = ({ photo, onClose, onNext, onPrev }: LightboxProps) => {
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
            className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-sm flex items-center justify-center"
            onClick={onClose}
        >
            <button onClick={onClose} className="absolute top-6 right-6 text-white/70 hover:text-white transition-colors z-50 p-2"><X size={40} strokeWidth={1.5} /></button>
            <button onClick={(e) => { e.stopPropagation(); onPrev(); }} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/50 hover:text-white transition-colors z-50 hidden md:block p-4"><ChevronLeft size={48} strokeWidth={1} /></button>
            <button onClick={(e) => { e.stopPropagation(); onNext(); }} className="absolute right-4 top-1/2 -translate-y-1/2 text-white/50 hover:text-white transition-colors z-50 hidden md:block p-4"><ChevronRight size={48} strokeWidth={1} /></button>

            <div className="relative w-full h-full flex flex-col items-center justify-center p-4" onClick={(e) => e.stopPropagation()}>
                <motion.img
                    key={photo.url} src={photo.url} alt={photo.title}
                    initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
                    className="max-h-[80vh] max-w-full object-contain shadow-2xl"
                />
                <div className="mt-6 text-center max-w-2xl px-4">
                    <h3 className="text-xl font-space-mono text-white mb-2 tracking-wide">{photo.title}</h3>
                    {photo.technical_info && <p className="text-xs font-mono text-white/50 uppercase tracking-widest mb-4">{photo.technical_info}</p>}
                    {photo.caption_artistic && <p className="museum-text text-white/80 text-sm italic border-t border-white/10 pt-4 mt-2">{photo.caption_artistic}</p>}
                </div>
            </div>
        </motion.div>
    );
};
export default Lightbox;
