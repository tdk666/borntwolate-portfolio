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
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black flex items-center justify-center"
        >
            {/* Close Button */}
            <button
                onClick={onClose}
                className="absolute top-6 right-6 text-off-white hover:text-darkroom-red transition-colors z-50"
            >
                <X size={32} />
            </button>

            {/* Navigation Buttons */}
            <button
                onClick={onPrev}
                className="absolute left-6 text-off-white hover:text-warm-sepia transition-colors z-50 hidden md:block"
            >
                <ChevronLeft size={48} />
            </button>
            <button
                onClick={onNext}
                className="absolute right-6 text-off-white hover:text-warm-sepia transition-colors z-50 hidden md:block"
            >
                <ChevronRight size={48} />
            </button>

            {/* Image Container */}
            <div className="relative w-full h-full p-0 flex items-center justify-center">
                <motion.img
                    key={photo.url}
                    src={photo.url}
                    alt={photo.title}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ type: "spring", damping: 25, stiffness: 300 }}
                    className="max-h-[100vh] max-w-[100vw] object-contain shadow-none"
                />
            </div>

            {/* Metadata Footer */}
            <div className="absolute bottom-0 left-0 w-full p-6 bg-gradient-to-t from-black to-transparent text-center">
                <h3 className="text-xl font-space-mono text-off-white mb-1">{photo.title}</h3>
                <p className="text-sm font-inter text-silver opacity-70 uppercase tracking-widest">
                    {photo.technical_info}
                </p>
            </div>
        </motion.div>
    );
};

export default Lightbox;
