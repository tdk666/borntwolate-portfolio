import { useState, useRef, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { GrainedImage } from './GrainedImage';

interface VisualSelectorOption {
    id: number | string;
    url: string;
    title: string;
    seriesTitle: string;
    value: string;
    orientation?: 'landscape' | 'portrait' | 'square';
}

interface VisualSelectorProps {
    options: VisualSelectorOption[];
    onSelect: (option: VisualSelectorOption) => void;
    label?: string;
    placeholder?: string;
}

const VisualSelector = ({ options, onSelect, label = "Sélectionner une œuvre", placeholder = "Ajouter une œuvre..." }: VisualSelectorProps) => {
    const [isOpen, setIsOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const containerRef = useRef<HTMLDivElement>(null);

    // Close on click outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const filteredOptions = options.filter(opt =>
        opt.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        opt.seriesTitle.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="relative group" ref={containerRef}>
            {label && (
                <label className="block text-xs font-space-mono text-darkroom-red uppercase tracking-widest mb-2">
                    {label}
                </label>
            )}

            <button
                type="button"
                onClick={() => setIsOpen(!isOpen)}
                aria-expanded={isOpen}
                aria-haspopup="listbox"
                aria-controls="visual-selector-list"
                aria-label={isOpen ? "Fermer le menu de sélection" : "Ouvrir le menu de sélection"}
                className="w-full bg-white/5 border border-white/20 py-3 px-4 text-off-white font-inter flex justify-between items-center hover:bg-white/10 transition-colors focus:outline-none focus:border-darkroom-red focus:ring-1 focus:ring-darkroom-red"
            >
                <span className="text-silver/80">{placeholder}</span>
                <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
            </button>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.2 }}
                        className="absolute z-50 w-full mt-1 bg-[#1a1a1a] border border-white/20 max-h-80 overflow-y-auto shadow-2xl custom-scrollbar"
                        role="listbox"
                        id="visual-selector-list"
                    >
                        {/* Internal Search (optional but good for UX) */}
                        <div className="sticky top-0 bg-[#1a1a1a] p-2 border-b border-white/10">
                            <input
                                type="text"
                                placeholder="Rechercher..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full bg-black/50 border border-white/10 px-3 py-2 text-sm text-off-white focus:outline-none focus:border-darkroom-red transition-colors font-space-mono"
                                autoFocus
                                aria-label="Filtrer les œuvres"
                            />
                        </div>

                        <div className="py-2">
                            {filteredOptions.length > 0 ? (
                                filteredOptions.map((option) => (
                                    <button
                                        key={option.id}
                                        type="button"
                                        role="option"
                                        aria-selected="false"
                                        onClick={() => {
                                            onSelect(option);
                                            setIsOpen(false);
                                            setSearchTerm('');
                                        }}
                                        onKeyDown={(e) => {
                                            if (e.key === 'Enter') {
                                                onSelect(option);
                                                setIsOpen(false);
                                            }
                                        }}
                                        className="w-full flex items-center gap-4 p-3 hover:bg-white/5 transition-colors text-left group/item focus:bg-white/10 focus:outline-none"
                                    >
                                        <div className="w-12 h-12 shrink-0 border border-white/10 group-hover/item:border-white/30 transition-colors">
                                            <GrainedImage
                                                src={option.url}
                                                alt={option.title}
                                                orientation={option.orientation || 'square'}
                                                className="w-full h-full"
                                                aspectRatio="1/1"
                                            />
                                        </div>
                                        <div>
                                            <div className="text-off-white font-bold font-inter text-sm group-hover/item:text-darkroom-red transition-colors">{option.title}</div>
                                            <div className="text-silver/50 text-xs font-space-mono uppercase">{option.seriesTitle}</div>
                                        </div>
                                    </button>
                                ))
                            ) : (
                                <div className="p-4 text-center text-silver/40 text-xs font-space-mono">
                                    Aucun résultat
                                </div>
                            )}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default VisualSelector;
