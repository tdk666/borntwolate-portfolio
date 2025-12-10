import { motion } from 'framer-motion';

const Contact = () => {
    return (
        <div className="min-h-screen pt-32 px-4 md:px-8 pb-12 flex flex-col items-center justify-center max-w-2xl mx-auto">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="w-full"
            >
                <h1 className="text-4xl md:text-5xl font-space-mono text-off-white mb-2 uppercase tracking-tighter text-center">
                    Contact
                </h1>
                <p className="text-silver font-inter text-center mb-12">
                    Available for commissions and collaborations.
                </p>

                <form className="space-y-12">
                    <div className="group">
                        <label htmlFor="name" className="block text-xs font-space-mono text-silver uppercase tracking-widest mb-2 group-focus-within:text-darkroom-red transition-colors">
                            Name
                        </label>
                        <input
                            type="text"
                            id="name"
                            className="w-full bg-transparent border-b border-white/20 py-2 text-off-white font-inter focus:outline-none focus:border-darkroom-red transition-colors"
                            placeholder="Your Name"
                        />
                    </div>

                    <div className="group">
                        <label htmlFor="email" className="block text-xs font-space-mono text-silver uppercase tracking-widest mb-2 group-focus-within:text-darkroom-red transition-colors">
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            className="w-full bg-transparent border-b border-white/20 py-2 text-off-white font-inter focus:outline-none focus:border-darkroom-red transition-colors"
                            placeholder="your@email.com"
                        />
                    </div>

                    <div className="group">
                        <label htmlFor="message" className="block text-xs font-space-mono text-silver uppercase tracking-widest mb-2 group-focus-within:text-darkroom-red transition-colors">
                            Message
                        </label>
                        <textarea
                            id="message"
                            rows={4}
                            className="w-full bg-transparent border-b border-white/20 py-2 text-off-white font-inter focus:outline-none focus:border-darkroom-red transition-colors resize-none"
                            placeholder="Tell me about your project..."
                        />
                    </div>

                    <div className="text-center pt-8">
                        <button
                            type="submit"
                            className="text-off-white font-space-mono uppercase tracking-widest text-sm border border-white/20 px-8 py-3 hover:bg-white/5 hover:border-off-white transition-all duration-300"
                        >
                            Send Message
                        </button>
                    </div>
                </form>

                <div className="mt-24 text-center space-y-4">
                    <a href="mailto:theophile.dequecker@gmail.com" className="block text-silver hover:text-off-white transition-colors font-space-mono text-sm">
                        theophile.dequecker@gmail.com
                    </a>
                    <a href="https://instagram.com/borntwolate" target="_blank" rel="noopener noreferrer" className="block text-silver hover:text-off-white transition-colors font-space-mono text-sm">
                        @borntwolate
                    </a>
                </div>
            </motion.div>
        </div>
    );
};

export default Contact;
