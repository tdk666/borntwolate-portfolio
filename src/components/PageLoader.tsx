import { motion } from 'framer-motion';

export const PageLoader = () => {
    return (
        <div className="fixed inset-0 z-[99999] bg-black flex items-center justify-center">
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, repeat: Infinity, repeatType: "reverse" }}
                className="flex flex-col items-center gap-4"
            >
                {/* Logo Minimaliste "Grain" ou Texte */}
                <h1 className="font-space-mono text-off-white text-2xl tracking-[0.5em] uppercase">
                    Born Too Late
                </h1>
                <div className="w-12 h-0.5 bg-darkroom-red/50" />
            </motion.div>
        </div>
    );
};
