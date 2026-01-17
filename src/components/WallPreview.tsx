import { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Ruler } from 'lucide-react';
import { useTranslation } from 'react-i18next';

interface WallPreviewProps {
    isOpen: boolean;
    onClose: () => void;
    imageSrc: string;
}

const WALL_WIDTH_CM = 300; // Largeur du mur visible en cm (3 mètres)
const SIZES = [
    { label: "20x30 cm", width: 20, height: 30 }, // A4 approx
    { label: "30x45 cm", width: 30, height: 45 }, // A3+ approx
    { label: "40x60 cm", width: 40, height: 60 },
    { label: "60x90 cm", width: 60, height: 90 },
    { label: "70x100 cm", width: 70, height: 100 }, // Giant
];

const WallPreview = ({ isOpen, onClose, imageSrc }: WallPreviewProps) => {
    const { t } = useTranslation();
    const [selectedSize, setSelectedSize] = useState(SIZES[1]); // Default 30x45
    // State Derived
    const isLargeFormat = selectedSize.width >= 60; // 60x90 and 70x100 are "Large"
    const [containerWidth, setContainerWidth] = useState(0);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            const width = window.innerWidth;
            setContainerWidth(width);
            setIsMobile(width < 768);
        };
        handleResize(); // Init
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // Image de fond dynamique (Avec Version Mobile Optimisée)
    const getBgUrl = () => {
        if (isLargeFormat) {
            return isMobile ? "/assets/living-room-bg-wide-mobile.png" : "/assets/living-room-bg-wide.png";
        }
        return isMobile ? "/assets/living-room-bg-mobile.png" : "/assets/living-room-bg.png";
    };

    const bgUrl = getBgUrl();

    // LOGIQUE DE DIMENSIONNEMENT PRECISE (REALISTIC SCALE)
    const pixelsPerCm = useMemo(() => {
        // Le mur fait 300cm de large. Sur l'écran, il occupe 100vw (ou containerWidth).
        // Ajustement Mobile : On "zoome" pour que le mur ne fasse que 180cm virtuels, rendant l'oeuvre plus grande/visible.
        const virtualWallWidthCm = isMobile ? 180 : WALL_WIDTH_CM;
        return containerWidth / virtualWallWidthCm;
    }, [containerWidth, isMobile]);

    // Dimensions Réelles (en cm)
    // Cadre : 1.5cm
    // Passe-partout (Mat) : REDUIT DE 80% (Demande user)
    // Esthétique fine : 3% de la petite dimension, min 1.5cm, max 3cm.
    const matSizeCm = Math.min(Math.max(Math.min(selectedSize.width, selectedSize.height) * 0.03, 1.5), 3);
    const frameSizeCm = 1.2; // 1.2cm frame width

    // Dimensions en Pixels pour le rendu
    const imageWidthPx = selectedSize.width * pixelsPerCm;
    const imageHeightPx = selectedSize.height * pixelsPerCm;

    // Le conteneur (Cadre + Mat + Image)
    const totalWidthPx = imageWidthPx + (matSizeCm * 2 * pixelsPerCm) + (frameSizeCm * 2 * pixelsPerCm);
    const totalHeightPx = imageHeightPx + (matSizeCm * 2 * pixelsPerCm) + (frameSizeCm * 2 * pixelsPerCm);

    const matPaddingPx = matSizeCm * pixelsPerCm;
    const frameBorderPx = frameSizeCm * pixelsPerCm;

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-[110] bg-black flex items-center justify-center overflow-hidden"
                >
                    {/* Background Wall - SANS TRANSITION (Demande user) */}
                    <div
                        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                        style={{ backgroundImage: `url(${bgUrl})` }}
                    />

                    {/* Overlay sombre pour focus */}
                    <div className="absolute inset-0 bg-black/30 pointer-events-none" />

                    {/* Close Button - Desktop & Mobile Friendly */}
                    <button
                        onClick={onClose}
                        className="absolute top-4 right-4 md:top-6 md:right-6 z-[120] text-white/80 hover:text-white transition-colors bg-black/40 hover:bg-black/60 p-3 md:p-2 rounded-full backdrop-blur-md shadow-lg"
                        aria-label="Close Wall Preview"
                    >
                        <X size={28} strokeWidth={1.5} />
                    </button>

                    {/* The Print on the Wall - POSITIONNEMENT DYNAMIQUE */}
                    <div
                        className={`
                            relative z-[115] w-full h-full flex items-center pointer-events-none transition-all duration-700
                            ${isLargeFormat
                                ? 'justify-end pr-[5%] md:pr-[12%] pb-20 md:pb-0' // Grand format : Ajusté mobile
                                : 'justify-center pb-24 md:pb-48'       // Petit format : Ajusté mobile
                            }
                        `}
                    >
                        {/* Cadre Global (Frame Extérieur) */}
                        <motion.div
                            layout={false} // Pas d'animation de layout lors du switch de fond
                            initial={false}
                            animate={{
                                width: totalWidthPx,
                                height: totalHeightPx,
                                padding: frameBorderPx
                            }}
                            transition={{ type: "spring", stiffness: 200, damping: 25 }}
                            className="relative bg-[#1a1a1a] shadow-2xl overflow-hidden flex items-center justify-center"
                            style={{
                                boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.7)",
                            }}
                        >
                            {/* Texture Cadre Bois (Optionnel) */}
                            <div className="absolute inset-0 bg-[#252525] opacity-20 pointer-events-none" />

                            {/* Le Contenu Interne (Mat + Image) */}
                            <div
                                className="w-full h-full bg-white flex items-center justify-center relative shadow-[inset_0_0_15px_rgba(0,0,0,0.5)]"
                                style={{
                                    padding: matPaddingPx
                                }}
                            >
                                {/* L'Image */}
                                <div className="relative w-full h-full shadow-sm">
                                    <img
                                        src={imageSrc}
                                        alt="Simulation"
                                        className="w-full h-full object-cover block"
                                        loading="lazy" /* Performance optimization */
                                    />
                                    {/* Reflet Vitre par-dessus l'image uniquement */}
                                    <div className="absolute inset-0 bg-gradient-to-tr from-white/10 via-transparent to-transparent opacity-50 mix-blend-overlay pointer-events-none" />
                                </div>

                                {/* Ombre portée interne du Mat sur l'image (Biseau) */}
                                <div className="absolute inset-0 pointer-events-none shadow-[inset_2px_2px_6px_rgba(0,0,0,0.15)]"
                                    style={{ margin: matPaddingPx }}
                                />
                            </div>

                            {/* Reflet global vitre */}
                            <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent opacity-20 pointer-events-none mix-blend-overlay z-50" />
                        </motion.div>
                    </div>

                    {/* Controls Bar */}
                    <motion.div
                        initial={{ y: 100, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="absolute bottom-10 left-0 right-0 z-[120] flex flex-col items-center gap-4 px-4 pointer-events-auto"
                    >
                        <div className="bg-black/60 backdrop-blur-xl border border-white/10 rounded-full px-6 py-4 flex flex-wrap justify-center gap-4 shadow-2xl max-w-3xl">
                            <div className="flex items-center gap-2 text-white/50 border-r border-white/10 pr-4 mr-2 hidden sm:flex">
                                <Ruler size={16} />
                                <span className="font-space-mono text-xs uppercase tracking-widest">{t('wall.simulated_size') || "Simulation"}</span>
                            </div>

                            {SIZES.map((size) => (
                                <button
                                    key={size.label}
                                    onClick={() => setSelectedSize(size)}
                                    className={`
                                        text-xs font-space-mono uppercase tracking-widest py-1 px-3 rounded-full transition-all duration-300
                                        ${selectedSize.label === size.label
                                            ? 'bg-white text-black font-bold'
                                            : 'text-silver hover:text-white hover:bg-white/10'}
                                    `}
                                >
                                    {size.label}
                                </button>
                            ))}
                        </div>
                    </motion.div>

                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default WallPreview;
