import { Link } from 'react-router-dom';
import { SEO } from '../components/SEO';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';

const NotFound = () => {
    return (
        <>
            <SEO
                title="404 - Lost"
                description="Page introuvable. Lost in the grain."
            />
            <div className="min-h-screen w-full flex flex-col items-center justify-center bg-deep-black text-off-white relative overflow-hidden">
                {/* Noise Background Overlay */}
                <div className="absolute inset-0 opacity-[0.15] bg-[url('https://grainy-gradients.vercel.app/noise.svg')] mix-blend-overlay pointer-events-none"></div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="z-10 text-center px-4"
                >
                    <h1 className="font-space-mono text-6xl md:text-9xl font-bold mb-4 text-darkroom-red/90 mix-blend-difference tracking-tighter">
                        404
                    </h1>

                    <div className="w-24 h-px bg-silver/20 mx-auto my-8"></div>

                    <h2 className="font-serif italic text-2xl md:text-4xl mb-8 text-silver/80">
                        Lost in the Grain
                    </h2>

                    <Link
                        to="/"
                        className="inline-flex items-center gap-2 px-8 py-3 border border-white/20 rounded-full font-space-mono text-xs uppercase tracking-widest hover:bg-off-white hover:text-deep-black transition-all duration-300 group"
                    >
                        <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
                        Retour à la Lumière
                    </Link>
                </motion.div>
            </div>
        </>
    );
};

export default NotFound;
