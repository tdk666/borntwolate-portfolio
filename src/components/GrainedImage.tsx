import { useState } from 'react';
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
    const [isLoaded, setIsLoaded] = useState(false);

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
            className={`relative overflow-hidden element-grain ${className}`}
            style={ratioStyle}
            onClick={onClick}
        >
            <motion.img
                src={src}
                alt={alt}
                loading={loading}
                decoding="async"
                fetchPriority={fetchPriority}
                className={`w-full h-full object-cover transition-opacity duration-700 ease-in-out ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
                onLoad={() => setIsLoaded(true)}
                draggable="false"
                onContextMenu={(e) => e.preventDefault()}
            />
            {/* BRAND PROTECTION: Subtle Overlay */}
            <div className="absolute inset-0 flex items-center justify-center opacity-[0.03] pointer-events-none select-none mix-blend-difference overflow-hidden">
                <span className="text-[10vw] font-serif font-bold text-white -rotate-12 whitespace-nowrap">
                    © BORNTWOLATE
                </span>
            </div>
        </div>
    );
};
