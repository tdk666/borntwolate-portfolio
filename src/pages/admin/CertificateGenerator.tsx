import { useState, useRef } from 'react';
import { ShieldCheck, Printer, AlertCircle } from 'lucide-react';
import { SEO } from '../../components/SEO';

const CertificateGenerator = () => {
    const [data, setData] = useState({
        title: 'King of Midtown',
        series: 'A Winter in the Fruit',
        format: '40 x 60 cm',
        paper: 'Hahnemühle Photo Rag 308g',
        number: '01',
        total: '30',
        date: new Date().toLocaleDateString('fr-FR'),
    });

    const componentRef = useRef<HTMLDivElement>(null);

    const handlePrint = () => {
        window.print();
    };

    return (
        <div className="min-h-screen bg-neutral-900 text-white p-4 md:p-8 print:bg-white print:p-0">
            <SEO title="Générateur Certificat" description="Admin only" robots="noindex" />

            {/* STYLE SPÉCIFIQUE POUR L'IMPRESSION */}
            <style>{`
        @media print {
            @page { margin: 0; size: auto; }
            body { 
                margin: 0; 
                -webkit-print-color-adjust: exact; 
                background-color: white;
            }
            
            /* Cacher tout le contenu par défaut via visibility */
            body * {
                visibility: hidden;
            }

            /* Rendre visible UNIQUEMENT le certificat et ses enfants */
            #certificate-root, #certificate-root * {
                visibility: visible;
            }

            /* Positionner le certificat en haut à gauche de la page */
            #certificate-root {
                position: absolute !important;
                left: 0 !important;
                top: 0 !important;
                width: 100% !important;
                height: 100% !important;
                margin: 0 !important;
                padding: 0 !important;
                background: white;
                z-index: 9999;
            }
        }
      `}</style>

            {/* Interface Admin (Masquée à l'impression) */}
            <div className="max-w-[1600px] mx-auto mb-12 print:hidden grid lg:grid-cols-[400px_1fr] gap-8 items-start">

                {/* COLONNE GAUCHE : FORMULAIRE */}
                <div className="bg-white/5 p-6 rounded-lg border border-white/10 sticky top-8">
                    <h2 className="text-xl font-space-mono mb-6 flex items-center gap-2 text-off-white">
                        <ShieldCheck className="text-darkroom-red" /> Configuration
                    </h2>

                    <div className="grid gap-4">
                        <div>
                            <label className="block text-[10px] uppercase tracking-widest text-silver mb-1">Titre de l'œuvre</label>
                            <input type="text" value={data.title} onChange={e => setData({ ...data, title: e.target.value })} className="w-full bg-black/50 border border-white/20 p-2 text-sm focus:border-darkroom-red outline-none text-white placeholder-white/20" />
                        </div>

                        <div>
                            <label className="block text-[10px] uppercase tracking-widest text-silver mb-1">Série</label>
                            <input type="text" value={data.series} onChange={e => setData({ ...data, series: e.target.value })} className="w-full bg-black/50 border border-white/20 p-2 text-sm focus:border-darkroom-red outline-none text-white" />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-[10px] uppercase tracking-widest text-silver mb-1">Format</label>
                                <input type="text" value={data.format} onChange={e => setData({ ...data, format: e.target.value })} className="w-full bg-black/50 border border-white/20 p-2 text-sm focus:border-darkroom-red outline-none text-white" />
                            </div>
                            <div>
                                <label className="block text-[10px] uppercase tracking-widest text-silver mb-1">Support</label>
                                <input type="text" value={data.paper} onChange={e => setData({ ...data, paper: e.target.value })} className="w-full bg-black/50 border border-white/20 p-2 text-sm focus:border-darkroom-red outline-none text-white" />
                            </div>
                        </div>

                        <div className="grid grid-cols-3 gap-4">
                            <div>
                                <label className="block text-[10px] uppercase tracking-widest text-silver mb-1">N°</label>
                                <input type="text" value={data.number} onChange={e => setData({ ...data, number: e.target.value })} className="w-full bg-black/50 border border-white/20 p-2 text-sm focus:border-darkroom-red outline-none text-center text-white" />
                            </div>
                            <div>
                                <label className="block text-[10px] uppercase tracking-widest text-silver mb-1">Total</label>
                                <input type="text" value={data.total} onChange={e => setData({ ...data, total: e.target.value })} className="w-full bg-black/50 border border-white/20 p-2 text-sm focus:border-darkroom-red outline-none text-center text-white" />
                            </div>
                            <div>
                                <label className="block text-[10px] uppercase tracking-widest text-silver mb-1">Date</label>
                                <input type="text" value={data.date} onChange={e => setData({ ...data, date: e.target.value })} className="w-full bg-black/50 border border-white/20 p-2 text-sm focus:border-darkroom-red outline-none text-white" />
                            </div>
                        </div>
                    </div>

                    <div className="mt-8 pt-6 border-t border-white/10 space-y-4">
                        <div className="flex items-start gap-2 text-xs text-silver/60 bg-darkroom-red/10 p-3 rounded">
                            <AlertCircle size={14} className="mt-0.5 shrink-0 text-darkroom-red" />
                            <p>À l'impression, décochez "En-têtes et pieds de page" si le navigateur les ajoute encore.</p>
                        </div>

                        <button
                            onClick={handlePrint}
                            className="w-full bg-off-white text-darkroom-black py-4 font-space-mono uppercase tracking-widest hover:bg-darkroom-red hover:text-white transition-colors flex items-center justify-center gap-2 font-bold"
                        >
                            <Printer size={18} /> Imprimer PDF
                        </button>
                    </div>
                </div>

                {/* COLONNE DROITE : APERÇU (Avec Zoom Out pour le confort visuel) */}
                <div className="flex flex-col items-center justify-start min-h-[600px] bg-black/20 rounded-xl border border-white/5 p-8 overflow-hidden relative">
                    <p className="absolute top-4 text-silver/30 text-xs font-space-mono uppercase tracking-widest mb-4">Aperçu A4 (Échelle réduite)</p>

                    {/* Conteneur de mise à l'échelle CSS */}
                    <div className="transform scale-[0.6] lg:scale-[0.75] origin-top mt-8 shadow-2xl">

                        {/* ID Cible pour l'impression */}
                        <div id="certificate-root" ref={componentRef} className="bg-white text-black w-[210mm] h-[297mm] p-[20mm] relative">

                            {/* Bordure de sécurité */}
                            <div className="h-full w-full border border-black/10 p-12 flex flex-col justify-between relative">

                                {/* Filigrane */}
                                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-[0.02] text-9xl font-bold uppercase pointer-events-none select-none rotate-45 whitespace-nowrap">
                                    Born Too Late
                                </div>

                                {/* Header */}
                                <div className="text-center space-y-2 mt-8">
                                    <h1 className="font-space-mono text-4xl uppercase tracking-[0.2em] font-bold text-black">Certificat d'Authenticité</h1>
                                    <p className="font-serif italic text-black/60 text-lg">Born Too Late Photography</p>
                                </div>

                                {/* Corps */}
                                <div className="space-y-16 my-auto">
                                    <p className="text-center font-serif text-xl leading-relaxed px-16 text-black/80">
                                        Je soussigné, <strong>Théophile Dequecker</strong>, certifie que l'œuvre décrite ci-dessous est un tirage original, réalisé sous mon contrôle, signé et numéroté de ma main.
                                    </p>

                                    <div className="grid grid-cols-[120px_1fr] gap-y-8 gap-x-8 px-12 border-l-4 border-black/80 py-4">
                                        <span className="font-space-mono text-xs uppercase tracking-widest text-black/40 pt-2 text-right">Titre</span>
                                        <span className="font-serif text-3xl font-bold italic text-black">{data.title}</span>

                                        <span className="font-space-mono text-xs uppercase tracking-widest text-black/40 pt-2 text-right">Série</span>
                                        <span className="font-serif text-2xl text-black">{data.series}</span>

                                        <span className="font-space-mono text-xs uppercase tracking-widest text-black/40 pt-1 text-right">Format</span>
                                        <span className="font-space-mono text-lg text-black">{data.format}</span>

                                        <span className="font-space-mono text-xs uppercase tracking-widest text-black/40 pt-1 text-right">Support</span>
                                        <span className="font-space-mono text-lg text-black">{data.paper}</span>

                                        <span className="font-space-mono text-xs uppercase tracking-widest text-black/40 pt-1 text-right">Édition</span>
                                        <span className="font-space-mono text-2xl font-bold text-black">N° {data.number} / {data.total}</span>
                                    </div>
                                </div>

                                {/* Footer / Signature */}
                                <div className="grid grid-cols-2 mt-12 pt-12 border-t border-black/10 pb-8">
                                    <div>
                                        <p className="font-space-mono text-[10px] uppercase tracking-widest text-black/40 mb-3">Fait à Paris, le</p>
                                        <p className="font-serif text-xl text-black">{data.date}</p>
                                    </div>
                                    <div className="text-right">
                                        <p className="font-space-mono text-[10px] uppercase tracking-widest text-black/40 mb-12">Signature de l'Artiste</p>
                                        {/* Ligne de signature */}
                                        <div className="h-px bg-black/20 w-3/4 ml-auto"></div>
                                    </div>
                                </div>

                                {/* ID Unique bas de page */}
                                <div className="absolute bottom-4 right-12 text-[8px] font-mono text-black/20">
                                    ID: {Math.random().toString(36).substr(2, 9).toUpperCase()}
                                </div>
                            </div>
                        </div>
                        {/* Fin du Certificat */}

                    </div>
                </div>
            </div>
        </div>
    );
};

export default CertificateGenerator;
