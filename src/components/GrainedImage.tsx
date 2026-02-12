import { motion } from 'framer-motion';

interface GrainedImageProps {
    src: string;
    alt: string;
    className?: string; // Should include width
    orientation?: 'landscape' | 'portrait' | 'square';
    loading?: 'lazy' | 'eager'; // Explicitly typed
    fetchPriority?: 'high' | 'low' | 'auto';
    onClick?: () => void;
    aspectRatio?: string; // Optional manual override
}

export const GrainedImage = ({
    src,
    alt,
    className = "",
    orientation = 'landscape',
    loading = 'lazy', // Default value
    fetchPriority = 'auto',
    onClick,
    aspectRatio
}: GrainedImageProps) => {


    // Determine aspect ratio class or style
    let ratioStyle = {};
    if (aspectRatio) {
        ratioStyle = { aspectRatio };
    } else {
        // Default ratios based on typical photo dimensions
        switch (orientation) {
            case 'landscape':
                ratioStyle = { aspectRatio: '3/2' };
                break;
            case 'portrait':
                ratioStyle = { aspectRatio: '2/3' };
                break;
            case 'square':
                ratioStyle = { aspectRatio: '1/1' };
                break;
        }
    }

    return (
        <div
            className={`relative overflow-hidden bg-[#1a1a1a] ${className}`}
            style={ratioStyle}
            onClick={onClick}
        >
            {/* STATIC OPTIMIZED FILM GRAIN (CSS-only via pseudo-element equivalent) */}
            <div
                className="absolute inset-0 pointer-events-none z-10 opacity-20 mix-blend-overlay"
                style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`
                }}
            />

            <picture>
                <source srcSet={src.replace(/\.(jpg|jpeg|png)$/i, '.webp')} type="image/webp" />
                <motion.img
                    src={src}
                    alt={alt}
                    loading={loading}
                    decoding="async"
                    fetchPriority={fetchPriority}
                    draggable="false"
                    onContextMenu={(e) => e.preventDefault()}
                />
            </picture>
            {/* BRAND PROTECTION: Subtle Overlay */}
            <div className="absolute inset-0 flex items-center justify-center opacity-[0.03] pointer-events-none select-none mix-blend-difference overflow-hidden">
                <span className="text-[10vw] font-serif font-bold text-white -rotate-12 whitespace-nowrap">
                    © BORNTWOLATE
                </span>
            </div>
        </div>
    );
};
