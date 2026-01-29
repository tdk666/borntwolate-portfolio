import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { PRICING_CATALOG } from '../data/pricing';

const WALL_WIDTH_DESKTOP = 300; // Mur de 3 mètres
const WALL_WIDTH_MOBILE = 150; // Mur de 1.5 mètres (zoom)

// Marges spécifiques pour la Collection (en cm)
const COLLECTION_MARGINS: Record<string, number> = {
    '20x30': 2,
    '30x45': 3,
    '40x60': 4,
    '60x90': 5,
    '70x105': 6
};

interface WallPreviewProps {
    isOpen: boolean;
    onClose: () => void;
    imageSrc?: string;
    initialSize?: string;
    finish: 'collection' | 'elegance' | 'exception';
}

export default function WallPreview({ isOpen, onClose, imageSrc, initialSize = '30x45', finish }: WallPreviewProps) {
    const { t } = useTranslation();
    const [currentFinish, setCurrentFinish] = useState<keyof typeof PRICING_CATALOG>(finish);
    const [currentSize, setCurrentSize] = useState(initialSize);
    const [isPortrait, setIsPortrait] = useState(false);
    const [mounted, setMounted] = useState(false);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        setMounted(true);
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        }

        const checkMobile = () => setIsMobile(window.innerWidth < 768);
        checkMobile();
        window.addEventListener('resize', checkMobile);

        return () => {
            setMounted(false);
            document.body.style.overflow = '';
            window.removeEventListener('resize', checkMobile);
        };
    }, [isOpen]); // Added isOpen dependency to correctly manage overflow

    // Détection automatique de l'orientation de l'image
    useEffect(() => {
        if (isOpen && imageSrc) {
            const img = new Image();
            img.src = imageSrc;
            img.onload = () => {
                if (img.naturalHeight > img.naturalWidth) {
                    setIsPortrait(true);
                } else {
                    setIsPortrait(false);
                }
            };
        }

        if (isOpen) {
            setCurrentFinish(finish);
            setCurrentSize(initialSize);
        }
    }, [isOpen, imageSrc, finish, initialSize]);

    const activeRange = PRICING_CATALOG[currentFinish];

    // Extraire les dimensions et gérer l'orientation
    const availableSizes = activeRange.variants.map(v => {
        let w = 30, h = 45;
        const match = v.id.match(/(\d+)x(\d+)/);
        if (match) {
            w = parseInt(match[1]);
            h = parseInt(match[2]);
        }

        const min = Math.min(w, h);
        const max = Math.max(w, h);
        return {
            id: v.id,
            label: v.label,
            small: min,
            large: max
        };
    });

    const currentVariantDims = availableSizes.find(s => s.id === currentSize) || availableSizes[0];

    // Calcul des dimensions affichées selon l'orientation AUTOMATIQUE
    const displayW = isPortrait ? currentVariantDims.small : currentVariantDims.large;
    const displayH = isPortrait ? currentVariantDims.large : currentVariantDims.small;

    useEffect(() => {
        const exists = availableSizes.find(s => s.id === currentSize);
        if (!exists && availableSizes.length > 0) {
            setCurrentSize(availableSizes[0].id);
        }
    }, [currentFinish]);

    const getWidthPercentage = () => {
        const wallWidth = isMobile ? WALL_WIDTH_MOBILE : WALL_WIDTH_DESKTOP;
        return (displayW / wallWidth) * 100;
    };

    const getAspectRatio = () => {
        return `${displayW}/${displayH}`;
    };

    const getPaddingStyle = () => {
        if (currentFinish === 'collection') {
            const marginCm = COLLECTION_MARGINS[currentSize] || 3;
            const p = (marginCm / displayW) * 100;
            return { padding: `${p}%` };
        }
        if (currentFinish === 'elegance') {
            return { padding: '4%' };
        }
        // Exception: No padding here, handled by gap logic
        if (currentFinish === 'exception') {
            return { padding: '3%' }; // Simulating the gap
        }
        return {};
    };

    const getFrameClasses = () => {
        switch (currentFinish) {
            case 'collection':
                return "bg-[#FAFAFA] shadow-[0_1px_3px_rgba(0,0,0,0.12),0_1px_2px_rgba(0,0,0,0.24)]";
            case 'elegance':
                // Cadre Alu Noir Mat + Reflet Blanc Inset + Ombre Murale Diffuse
                return "bg-white ring-1 ring-[#1A1A1A] shadow-[0_20px_50px_-12px_rgba(0,0,0,0.5)] border-[4px] border-[#1A1A1A]";
            case 'exception':
                // Caisse Américaine: Cadre Bois Noir Mat + Ombre Massive
                // FIX: Use outline for frame and transparent border for gap
                return "bg-[#1A1A1A] shadow-[0_30px_60px_-15px_rgba(0,0,0,0.6)] border-[4px] border-transparent outline outline-[12px] outline-[#1A1A1A]";
            default: return "bg-white shadow-lg";
        }
    };

    const getImageContainerClasses = () => {
        switch (currentFinish) {
            case 'collection':
                return "bg-[#FAFAFA]"; // Seamless with margin
            case 'elegance':
                // Ombre interne pour le biseau du passe-partout blanc
                return "bg-white shadow-[inset_0_0_4px_rgba(0,0,0,0.15)]";
            case 'exception':
                // Effet Flottant: L'image projette une ombre dans la caisse
                return "shadow-[0_10px_20px_rgba(0,0,0,0.5)] ring-1 ring-white/5";
            default: return "bg-white";
        }
    };

    if (!mounted) return null;

    return createPortal(
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                    className="fixed inset-0 z-[9999] flex items-center justify-center bg-black"
                    style={{
                        position: 'fixed',
                        top: 0,
                        left: 0,
                        width: '100vw',
                        height: '100vh',
                        margin: 0,
                        padding: 0,
                        maxWidth: '100vw',
                        maxHeight: '100vh',
                        overflow: 'hidden'
                    }}
                    onClick={onClose}
                >
                    <button onClick={onClose} className="absolute top-6 right-6 text-white/50 hover:text-white z-[10000] p-2">
                        <X className="w-8 h-8" />
                    </button>

                    {/* Container Plein Écran Force */}
                    <div className="absolute inset-0 w-full h-full flex items-center justify-center overflow-hidden" onClick={(e) => e.stopPropagation()}>
                        {/* Minimalist Scale Wall (Generated) */}
                        <img
                            src="/assets/minimalist_scale_wall.png"
                            alt="Mur Salon Minimaliste"
                            className="absolute inset-0 w-full h-full object-cover"
                            style={{
                                position: 'absolute',
                                top: 0,
                                left: 0,
                                width: '100%',
                                height: '100%',
                                objectFit: 'cover',
                                objectPosition: 'center',
                                opacity: 1,
                                zIndex: 0
                            }}
                        />

                        {/* Le Cadre */}
                        <motion.div
                            layout
                            transition={{ type: "spring", stiffness: 300, damping: 30 }}
                            className={`relative transition-all duration-500 ease-out flex items-center justify-center ${getFrameClasses()}`}
                            style={{
                                width: `${getWidthPercentage()}%`,
                                aspectRatio: getAspectRatio(),
                                // Padding removed from here to avoid "Percent of Parent (Wall)" calculation bug
                                transform: 'translateY(-5%)',
                                zIndex: 50 // Force frame to front
                            }}
                            onClick={(e) => e.stopPropagation()}
                        >
                            {/* Specific styling for Elegance reflection if needed, handled by border/shadow above */}
                            {currentFinish === 'elegance' && (
                                <div className="absolute inset-0 border-t border-white/20 pointer-events-none z-20" />
                            )}

                            {/* Inner Image Container (Matte/Gap) - Applies Padding relative to Frame Size */}
                            <div
                                className={`relative w-full h-full overflow-hidden ${getImageContainerClasses()}`}
                                style={{ ...getPaddingStyle() }} // Padding applied here is relative to THIS container's width (which is 100% of Frame)
                            >
                                <img
                                    src={imageSrc || "/social-card.jpg"}
                                    alt="Preview"
                                    className="w-full h-full object-contain block z-10"
                                    style={{ zIndex: 10 }}
                                // Removed shadow-inner which was acting as a darkening filter
                                />
                            </div>
                        </motion.div>
                    </div>

                    {/* CONTROLS BAR - Glassmorphism Updated */}
                    <div
                        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 p-6 bg-black/80 backdrop-blur-md rounded-2xl border border-white/10 w-[90%] max-w-2xl z-[10000] shadow-2xl"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Ranges */}
                        <div className="flex gap-2 flex-wrap justify-center border-b border-white/10 pb-4 w-full">
                            {Object.entries(PRICING_CATALOG).map(([key]) => (
                                <button
                                    key={key}
                                    onClick={() => setCurrentFinish(key as any)}
                                    className={`px-4 py-2 rounded-lg text-xs font-medium transition-all uppercase tracking-wider ${currentFinish === key
                                        ? 'bg-white text-black shadow-lg shadow-white/10'
                                        : 'bg-white/5 text-white/50 hover:bg-white/10 hover:text-white'
                                        }`}
                                >
                                    {/* Using standard keys for translation based on range ID */}
                                    {key === 'collection' ? t('pricing.collection.label') :
                                        key === 'elegance' ? t('pricing.elegance.label') :
                                            t('pricing.exception.label')}
                                </button>
                            ))}
                        </div>

                        {/* Sizes */}
                        <div className="flex flex-wrap items-center justify-center gap-4 w-full">
                            <div className="flex gap-2 flex-wrap justify-center">
                                {availableSizes.map((size) => (
                                    <button
                                        key={size.id}
                                        onClick={() => setCurrentSize(size.id)}
                                        className={`px-3 py-1.5 rounded-md text-xs transition-all font-mono ${currentSize === size.id
                                            ? 'bg-white text-black font-bold ring-2 ring-white/50'
                                            : 'text-white/60 hover:text-white bg-white/5 border border-white/5 hover:border-white/20'
                                            }`}
                                    >
                                        {size.small}x{size.large}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>,
        document.body
    );
}