import { useState, useRef } from 'react';
// import { useReactToPrint } from 'react-to-print'; // Native print used instead for simplicity
import { ShieldCheck, Printer } from 'lucide-react';
import { SEO } from '../../components/SEO';

const CertificateGenerator = () => {
    const [data, setData] = useState({
        title: 'Titre de l\'œuvre',
        series: 'Nom de la série',
        format: '40 x 60 cm',
        paper: 'Hahnemühle Photo Rag 308g',
        number: '01',
        total: '30',
        date: new Date().toLocaleDateString('fr-FR'),
        owner: ''
    });

    const componentRef = useRef<HTMLDivElement>(null);

    const handlePrint = () => {
        window.print();
    };

    return (
        <div className="min-h-screen bg-neutral-900 text-white p-8 print:bg-white print:p-0">
            <SEO title="Générateur Certificat" description="Admin only" robots="noindex" />

            {/* Interface Admin (Masquée à l'impression) */}
            <div className="max-w-6xl mx-auto mb-12 print:hidden grid md:grid-cols-2 gap-8">
                <div className="bg-white/5 p-6 rounded-lg border border-white/10">
                    <h2 className="text-xl font-space-mono mb-6 flex items-center gap-2">
                        <ShieldCheck className="text-darkroom-red" /> Configuration
                    </h2>
                    <div className="grid gap-4">
                        <div>
                            <label className="block text-xs uppercase tracking-widest text-silver mb-1">Titre de l'œuvre</label>
                            <input type="text" value={data.title} onChange={e => setData({ ...data, title: e.target.value })} className="w-full bg-black/50 border border-white/20 p-2 text-sm focus:border-darkroom-red outline-none" />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-xs uppercase tracking-widest text-silver mb-1">Série</label>
                                <input type="text" value={data.series} onChange={e => setData({ ...data, series: e.target.value })} className="w-full bg-black/50 border border-white/20 p-2 text-sm focus:border-darkroom-red outline-none" />
                            </div>
                            <div>
                                <label className="block text-xs uppercase tracking-widest text-silver mb-1">Format</label>
                                <input type="text" value={data.format} onChange={e => setData({ ...data, format: e.target.value })} className="w-full bg-black/50 border border-white/20 p-2 text-sm focus:border-darkroom-red outline-none" />
                            </div>
                        </div>
                        <div>
                            <label className="block text-xs uppercase tracking-widest text-silver mb-1">Papier / Support</label>
                            <input type="text" value={data.paper} onChange={e => setData({ ...data, paper: e.target.value })} className="w-full bg-black/50 border border-white/20 p-2 text-sm focus:border-darkroom-red outline-none" />
                        </div>
                        <div className="grid grid-cols-3 gap-4">
                            <div>
                                <label className="block text-xs uppercase tracking-widest text-silver mb-1">Numéro</label>
                                <input type="text" value={data.number} onChange={e => setData({ ...data, number: e.target.value })} className="w-full bg-black/50 border border-white/20 p-2 text-sm focus:border-darkroom-red outline-none" />
                            </div>
                            <div>
                                <label className="block text-xs uppercase tracking-widest text-silver mb-1">Sur (Total)</label>
                                <input type="text" value={data.total} onChange={e => setData({ ...data, total: e.target.value })} className="w-full bg-black/50 border border-white/20 p-2 text-sm focus:border-darkroom-red outline-none" />
                            </div>
                            <div>
                                <label className="block text-xs uppercase tracking-widest text-silver mb-1">Date</label>
                                <input type="text" value={data.date} onChange={e => setData({ ...data, date: e.target.value })} className="w-full bg-black/50 border border-white/20 p-2 text-sm focus:border-darkroom-red outline-none" />
                            </div>
                        </div>
                    </div>

                    <button
                        onClick={handlePrint}
                        className="mt-8 w-full bg-off-white text-darkroom-black py-3 font-space-mono uppercase tracking-widest hover:bg-darkroom-red hover:text-white transition-colors flex items-center justify-center gap-2"
                    >
                        <Printer size={18} /> Imprimer en PDF
                    </button>
                </div>

                <div className="flex items-center justify-center text-silver/30 text-sm font-space-mono">
                    <p>Aperçu en temps réel →</p>
                </div>
            </div>

            {/* LE CERTIFICAT (Design Print) */}
            <div ref={componentRef} className="bg-white text-black w-[210mm] h-[297mm] mx-auto p-[20mm] relative shadow-2xl print:shadow-none print:w-full print:h-full print:absolute print:top-0 print:left-0">

                {/* Bordure de sécurité */}
                <div className="h-full w-full border border-black/10 p-12 flex flex-col justify-between relative">

                    {/* Filigrane discret */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-[0.03] text-9xl font-bold uppercase pointer-events-none select-none rotate-45">
                        Original
                    </div>

                    {/* Header */}
                    <div className="text-center space-y-2">
                        <h1 className="font-space-mono text-4xl uppercase tracking-[0.2em] font-bold">Certificat d'Authenticité</h1>
                        <p className="font-serif italic text-black/60">Born Too Late Photography</p>
                    </div>

                    {/* Corps */}
                    <div className="space-y-12 my-auto">
                        <p className="text-center font-serif text-lg leading-relaxed px-12">
                            Je soussigné, <strong>Théophile Dequecker</strong>, certifie que l'œuvre décrite ci-dessous est un tirage original, réalisé sous mon contrôle, signé et numéroté de ma main.
                        </p>

                        <div className="grid grid-cols-[150px_1fr] gap-y-6 gap-x-8 px-8 border-l-2 border-black">
                            <span className="font-space-mono text-xs uppercase tracking-widest text-black/50 pt-1">Titre</span>
                            <span className="font-serif text-2xl font-bold italic">{data.title}</span>

                            <span className="font-space-mono text-xs uppercase tracking-widest text-black/50 pt-1">Série</span>
                            <span className="font-serif text-xl">{data.series}</span>

                            <span className="font-space-mono text-xs uppercase tracking-widest text-black/50 pt-1">Format</span>
                            <span className="font-space-mono text-sm">{data.format}</span>

                            <span className="font-space-mono text-xs uppercase tracking-widest text-black/50 pt-1">Support</span>
                            <span className="font-space-mono text-sm">{data.paper}</span>

                            <span className="font-space-mono text-xs uppercase tracking-widest text-black/50 pt-1">Édition</span>
                            <span className="font-space-mono text-lg font-bold">N° {data.number} / {data.total}</span>
                        </div>
                    </div>

                    {/* Footer / Signature */}
                    <div className="grid grid-cols-2 mt-12 pt-8 border-t border-black/10">
                        <div>
                            <p className="font-space-mono text-xs uppercase tracking-widest text-black/50 mb-2">Fait à Paris, le</p>
                            <p className="font-serif text-lg">{data.date}</p>
                        </div>
                        <div className="text-right">
                            <p className="font-space-mono text-xs uppercase tracking-widest text-black/50 mb-8">Signature de l'Artiste</p>
                            {/* Espace pour signer à la main */}
                            <div className="h-16 border-b border-black/20 w-3/4 ml-auto"></div>
                        </div>
                    </div>

                    {/* ID Unique bas de page */}
                    <div className="absolute bottom-4 right-12 text-[8px] font-mono text-black/30">
                        ID: {Math.random().toString(36).substr(2, 9).toUpperCase()}
                    </div>
                </div>
            </div>
        </div>
    );
};
export default CertificateGenerator;
