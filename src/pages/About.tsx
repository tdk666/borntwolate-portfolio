import { motion } from 'framer-motion';

const About = () => {
    return (
        <div className="min-h-screen pt-32 px-4 md:px-8 pb-12 flex flex-col md:flex-row gap-16 max-w-7xl mx-auto items-start">
            {/* Left Column: Image */}
            <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                className="w-full md:w-5/12 sticky top-32"
            >
                <div className="relative overflow-hidden group">
                    {/* Image Frame */}
                    <div className="border border-white/10 p-2">
                        <img
                            src="/images/canadian-evasion/autoportrait.JPG"
                            alt="Théophile Dequecker - Face au Large"
                            className="w-full h-auto grayscale contrast-110 filter sepia-[0.2] transition-all duration-700"
                        />
                    </div>
                    {/* Caption */}
                    <div className="flex justify-between items-baseline mt-3">
                        <p className="text-xs font-space-mono text-darkroom-red uppercase tracking-widest">
                            Fig. 01
                        </p>
                        <p className="text-xs font-space-mono text-silver uppercase tracking-widest text-right opacity-60">
                            Face au Large, 2023
                        </p>
                    </div>
                </div>
            </motion.div>

            {/* Right Column: Content */}
            <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="w-full md:w-6/12 space-y-20 flex flex-col justify-center py-8"
            >
                {/* Header */}
                <header>
                    <h1 className="text-6xl md:text-7xl font-serif font-light text-off-white mb-6 italic tracking-tight">
                        Théophile Dequecker
                    </h1>
                    <div className="h-px w-24 bg-darkroom-red/60 mb-8" />
                    <div className="space-y-6 text-silver font-sans font-light leading-relaxed text-lg text-justify">
                        <p>
                            <span className="text-off-white font-normal">Born Two Late</span> is not just a moniker; it is a declaration of intent. In an era of digital immediacy, Théophile Dequecker chooses the resistance of film. His work is a study in texture and temporality, where the grain is not an artifact, but the very substance of the memory.
                        </p>
                        <p>
                            Navigating between the raw, mineral architecture of the Alps and the cinematic, sun-drenched nostalgia of Italian summers, his gaze is singularly focused on <span className="italic font-serif text-xl border-b border-white/20">"L'épaisseur du temps"</span>—the thickness of time. Whether capturing the stark geometry of a winter pine or the fleeting glance of a stranger in Puglia, he seeks the silent narrative hidden within the noise.
                        </p>
                        <p>
                            His photography is tactile. It smells of chemicals and old paper. It is an act of preservation against the digital drift, anchoring fleeting moments onto the physical permanency of silver halides.
                        </p>
                    </div>
                </header>

                {/* Timeline */}
                <section>
                    <h2 className="text-2xl font-serif italic text-off-white mb-8 border-b border-white/10 pb-4">
                        Timeline
                    </h2>
                    <div className="relative border-l border-white/10 ml-3 space-y-12 pb-4">
                        {/* 2020 */}
                        <div className="relative pl-8 group">
                            <div className="absolute -left-[5px] top-2 w-2.5 h-2.5 bg-darkroom-red rounded-full transition-transform group-hover:scale-125" />
                            <span className="text-xs font-space-mono text-darkroom-red uppercase tracking-widest mb-1 block">
                                2020
                            </span>
                            <h3 className="text-off-white font-serif text-2xl mb-2 italic">L'Initiation</h3>
                            <p className="text-silver font-sans text-sm font-light">
                                The discovery of the mechanical shutter. Moving away from the pixel to embrace the unpredictability of the chemical process. The first rolls are a lesson in patience.
                            </p>
                        </div>

                        {/* 2023 */}
                        <div className="relative pl-8 group">
                            <div className="absolute -left-[5px] top-2 w-2.5 h-2.5 bg-silver rounded-full transition-transform group-hover:scale-125" />
                            <span className="text-xs font-space-mono text-silver uppercase tracking-widest mb-1 block">
                                2023
                            </span>
                            <h3 className="text-off-white font-serif text-2xl mb-2 italic">L'Errance</h3>
                            <p className="text-silver font-sans text-sm font-light">
                                From the "Canadian Evasion" to the streets of Montreal. A year of road and motion. Experimenting with color stocks (Portra, LomoChrome) to translate the vastness of the North American landscape.
                            </p>
                        </div>

                        {/* 2025 */}
                        <div className="relative pl-8 group">
                            <div className="absolute -left-[5px] top-2 w-2.5 h-2.5 bg-off-white rounded-full transition-transform group-hover:scale-125" />
                            <span className="text-xs font-space-mono text-off-white uppercase tracking-widest mb-1 block">
                                2024-2025
                            </span>
                            <h3 className="text-off-white font-serif text-2xl mb-2 italic">Le Grain & La Matière</h3>
                            <p className="text-silver font-sans text-sm font-light">
                                Defining a signature aesthetic. The "Retro Mountain" series marks a shift towards deeper contrasts and structural compositions. The use of Rollei Retro 400S brings a charcoal-like quality to the work.
                            </p>
                        </div>
                    </div>
                </section>

                {/* Technical Manifest */}
                <section>
                    <h2 className="text-2xl font-serif italic text-off-white mb-8 border-b border-white/10 pb-4">
                        Technical Manifest
                    </h2>
                    <ul className="space-y-4 font-space-mono text-sm text-silver">
                        <li className="flex justify-between items-center group">
                            <span className="group-hover:text-darkroom-red transition-colors">Cameras</span>
                            <span className="text-off-white">Rollei 35, Nikon F-301</span>
                        </li>
                        <li className="flex justify-between items-center group">
                            <span className="group-hover:text-darkroom-red transition-colors">Lenses</span>
                            <span className="text-off-white">Tessar 40mm f/3.5, Nikkor 50mm f/1.8</span>
                        </li>
                        <li className="flex justify-between items-center group">
                            <span className="group-hover:text-darkroom-red transition-colors">Color Films</span>
                            <span className="text-off-white">CineStill 400D, Portra 400</span>
                        </li>
                        <li className="flex justify-between items-center group">
                            <span className="group-hover:text-darkroom-red transition-colors">B&W Films</span>
                            <span className="text-off-white">Rollei Retro 400S</span>
                        </li>
                        <li className="flex justify-between items-center group">
                            <span className="group-hover:text-darkroom-red transition-colors">Studio</span>
                            <a
                                href="https://reportage-image.com/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-off-white hover:text-darkroom-red transition-colors border-b border-transparent hover:border-darkroom-red"
                            >
                                Reportage Image ↗
                            </a>
                        </li>
                    </ul>
                </section>
            </motion.div>
        </div>
    );
};

export default About;
