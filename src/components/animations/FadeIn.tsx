import { motion } from 'framer-motion';
import type { ReactNode } from 'react';

interface FadeInProps {
    children: ReactNode;
    delay?: number;
    className?: string;
    /**
     * If true, the element will only fade in (opacity), without the Y-axis movement.
     * Useful for large layout blocks where movement might be distracting.
     */
    noVertical?: boolean;
    /**
     * Custom duration for specific needs. Default is 0.6s.
     */
    duration?: number;
}

export const FadeIn = ({ children, delay = 0, className = "", noVertical = false, duration = 0.6 }: FadeInProps) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: noVertical ? 0 : 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "0px 0px -50px 0px" }}
            transition={{ duration: duration, delay: delay, ease: "easeOut" }}
            className={className}
        >
            {children}
        </motion.div>
    );
};
