import { useState, useMemo } from 'react';
import { ShieldCheck, Printer, AlertCircle, Lock, TrendingUp } from 'lucide-react';
import { SEO } from '../../components/SEO';
import { stockService } from '../../services/stock';
import toast, { Toaster } from 'react-hot-toast';

const CertificateGenerator = () => {
    // --- ÉTATS ---
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [passwordInput, setPasswordInput] = useState("");
    const [error, setError] = useState(false);

    const [data, setData] = useState({
        title: 'King of Midtown',
        series: 'A Winter in the Fruit',
        format: '40 x 60 cm',
        paper: 'Hahnemühle Photo Rag 308g',
        number: '01',
        total: '30',
        date: new Date().toLocaleDateString('fr-FR'),
    });

    // MOT DE PASSE (À changer ici si besoin)
    const SECRET_PASS = "THEOrugby2001!!";

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        if (passwordInput === SECRET_PASS) {
            setIsAuthenticated(true);
        } else {
            setError(true);
            setPasswordInput("");
        }
    };

    const handlePrint = () => {
        window.print();
    };

    const handleStockIncrement = async () => {
        const slug = stockService.getSlug(data.title);
        const confirm = window.confirm(`Valider une vente pour "${data.title}" (slug: ${slug}) ?\nCela ajoutera +1 au stock vendu.`);

        if (confirm) {
            const result = await stockService.incrementStock(slug);
            if (result.success) {
                toast.success(`Stock mis à jour !\nNouveau total vendu : ${result.newCount}`);
                // Update local number if user wants sync? 
                // data.number is "Edition N°", so if sold_count is X, maybe edition is X?
                // But edition numbering might be manual. We just notify for now.
                if (result.newCount) {
                    setData(prev => ({ ...prev, number: String(result.newCount).padStart(2, '0') }));
                }
            } else {
                toast.error("Erreur mise à jour stock.");
                console.error(result.error);
            }
        }
    };

    // --- COMPOSANT CERTIFICAT (Template) ---
    const CertificateContent = () => (
        <div className="w-[210mm] h-[297mm] bg-white text-black p-[20mm] relative box-border mx-auto shadow-none">
            <div className="h-full w-full border border-black/10 p-12 flex flex-col justify-between relative box-border">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-[0.03] text-9xl font-bold uppercase pointer-events-none select-none rotate-45 whitespace-nowrap">
                    Original
                </div>
                <div className="text-center space-y-2 mt-8">
                    <h1 className="font-space-mono text-4xl uppercase tracking-[0.2em] font-bold text-black">Certificat d'Authenticité</h1>
                    <p className="font-serif italic text-black/60 text-lg">Born Too Late Photography</p>
                </div>
                <div className="space-y-16 my-auto">
                    {/* CORRECTION TYPO VEUVE ICI (px-8 + &nbsp;) */}
                    <p className="text-center font-serif text-xl leading-relaxed px-8 text-black/80">
                        Je soussigné, <strong>Théophile Dequecker</strong>, certifie que l'œuvre décrite ci-dessous est un tirage original, réalisé sous mon contrôle, signé et numéroté de ma&nbsp;main.
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
                <div className="grid grid-cols-2 mt-12 pt-12 border-t border-black/10 pb-8">
                    <div>
                        <p className="font-space-mono text-[10px] uppercase tracking-widest text-black/40 mb-3">Fait à Paris, le</p>
                        <p className="font-serif text-xl text-black">{data.date}</p>
                    </div>
                    <div className="text-right">
                        <p className="font-space-mono text-[10px] uppercase tracking-widest text-black/40 mb-12">Signature de l'Artiste</p>
                        <div className="h-px bg-black/20 w-3/4 ml-auto"></div>
                    </div>
                </div>
                <div className="absolute bottom-4 right-12 text-[8px] font-mono text-black/20">
                    ID: {useMemo(() => Math.random().toString(36).substr(2, 9).toUpperCase(), [])}
                </div>
            </div>
        </div>
    );

    // --- RENDU LOGIN (Si pas connecté) ---
    if (!isAuthenticated) {
        return (
            <div className="min-h-screen bg-neutral-900 flex items-center justify-center p-4">
                <SEO title="Admin Login" description="Restricted access" robots="noindex" />
                <form onSubmit={handleLogin} className="bg-white/5 p-8 rounded-lg border border-white/10 w-full max-w-md backdrop-blur-sm">
                    <div className="flex justify-center mb-6 text-darkroom-red">
                        <Lock size={48} strokeWidth={1} />
                    </div>
                    <h2 className="text-center text-xl font-space-mono text-off-white uppercase mb-8">Accès Atelier</h2>

                    <div className="space-y-4">
                        <input
                            type="password"
                            placeholder="Code d'accès..."
                            value={passwordInput}
                            onChange={(e) => setPasswordInput(e.target.value)}
                            className="w-full bg-black/50 border border-white/20 p-4 text-center text-white focus:border-darkroom-red outline-none rounded-sm font-space-mono tracking-widest"
                            autoFocus
                        />
                        {error && <p className="text-darkroom-red text-xs text-center font-mono">Code incorrect. Réessayez.</p>}

                        <button type="submit" className="w-full bg-off-white text-darkroom-black py-4 font-space-mono uppercase font-bold hover:bg-darkroom-red hover:text-white transition-colors">
                            Entrer
                        </button>
                    </div>
                </form>
            </div>
        );
    }

    // --- RENDU GÉNÉRATEUR (Si connecté) ---
    return (
        <div className="min-h-screen bg-neutral-900 text-white p-4 md:p-8">
            <SEO title="Générateur Certificat" description="Admin only" robots="noindex" />
            <Toaster position="top-right" />

            {/* STYLE PRINT */}
            <style>{`
        @media print {
            nav, footer, .no-print-ui { display: none !important; }
            .print-only-zone { 
                display: block !important; 
                position: absolute; top: 0; left: 0; width: 100%; margin: 0; padding: 0; 
            }
            @page { margin: 0; size: A4; }
            body { background: white; margin: 0; }
        }
      `}</style>

            {/* ZONE IMPRESSION */}
            <div className="print-only-zone hidden">
                <CertificateContent />
            </div>

            {/* INTERFACE ADMIN */}
            <div className="no-print-ui max-w-[1600px] mx-auto mb-12 grid lg:grid-cols-[400px_1fr] gap-8 items-start">

                {/* Formulaire */}
                <div className="bg-white/5 p-6 rounded-lg border border-white/10 sticky top-8">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-xl font-space-mono flex items-center gap-2 text-off-white">
                            <ShieldCheck className="text-darkroom-red" /> Configuration
                        </h2>
                        <button onClick={() => setIsAuthenticated(false)} className="text-xs text-silver/50 hover:text-white uppercase">Sortir</button>
                    </div>

                    <div className="grid gap-4">
                        <div><label className="block text-[10px] uppercase tracking-widest text-silver mb-1">Titre</label><input type="text" value={data.title} onChange={e => setData({ ...data, title: e.target.value })} className="w-full bg-black/50 border border-white/20 p-2 text-sm focus:border-darkroom-red outline-none text-white" /></div>
                        <div><label className="block text-[10px] uppercase tracking-widest text-silver mb-1">Série</label><input type="text" value={data.series} onChange={e => setData({ ...data, series: e.target.value })} className="w-full bg-black/50 border border-white/20 p-2 text-sm focus:border-darkroom-red outline-none text-white" /></div>
                        <div className="grid grid-cols-2 gap-4">
                            <div><label className="block text-[10px] uppercase tracking-widest text-silver mb-1">Format</label><input type="text" value={data.format} onChange={e => setData({ ...data, format: e.target.value })} className="w-full bg-black/50 border border-white/20 p-2 text-sm focus:border-darkroom-red outline-none text-white" /></div>
                            <div><label className="block text-[10px] uppercase tracking-widest text-silver mb-1">Support</label><input type="text" value={data.paper} onChange={e => setData({ ...data, paper: e.target.value })} className="w-full bg-black/50 border border-white/20 p-2 text-sm focus:border-darkroom-red outline-none text-white" /></div>
                        </div>
                        <div className="grid grid-cols-3 gap-4">
                            <div><label className="block text-[10px] text-silver mb-1">N°</label><input type="text" value={data.number} onChange={e => setData({ ...data, number: e.target.value })} className="w-full bg-black/50 border border-white/20 p-2 text-center text-white" /></div>
                            <div><label className="block text-[10px] text-silver mb-1">Total</label><input type="text" value={data.total} onChange={e => setData({ ...data, total: e.target.value })} className="w-full bg-black/50 border border-white/20 p-2 text-center text-white" /></div>
                            <div><label className="block text-[10px] text-silver mb-1">Date</label><input type="text" value={data.date} onChange={e => setData({ ...data, date: e.target.value })} className="w-full bg-black/50 border border-white/20 p-2 text-white" /></div>
                        </div>
                    </div>

                    <div className="mt-8 pt-6 border-t border-white/10 space-y-4">
                        <div className="flex items-start gap-2 text-xs text-silver/60 bg-darkroom-red/10 p-3 rounded">
                            <AlertCircle size={14} className="mt-0.5 shrink-0 text-darkroom-red" />
                            <p>Décochez "En-têtes et pieds de page" à l'impression.</p>
                        </div>
                        <button onClick={handlePrint} className="w-full bg-off-white text-darkroom-black py-4 font-space-mono uppercase font-bold hover:bg-darkroom-red hover:text-white transition-colors flex items-center justify-center gap-2">
                            <Printer size={18} /> Imprimer PDF
                        </button>

                        <div className="pt-4 border-t border-white/10 mt-4">
                            <h3 className="text-xs uppercase tracking-widest text-silver mb-3">Gestion Stock</h3>
                            <button onClick={handleStockIncrement} className="w-full bg-red-900/50 border border-red-500/30 text-red-200 py-3 font-space-mono uppercase text-xs font-bold hover:bg-red-900 hover:text-white transition-colors flex items-center justify-center gap-2">
                                <TrendingUp size={16} /> Valider une Vente (+1)
                            </button>
                        </div>
                    </div>
                </div>

                {/* Aperçu Écran */}
                <div className="flex flex-col items-center min-h-[600px] bg-black/20 rounded-xl border border-white/5 p-4 overflow-hidden relative">
                    <p className="absolute top-4 text-silver/30 text-xs font-space-mono uppercase tracking-widest">Aperçu</p>
                    <div className="origin-top mt-12 shadow-2xl scale-[0.55] lg:scale-[0.7]">
                        <CertificateContent />
                    </div>
                </div>
            </div>
        </div>
    );
};
export default CertificateGenerator;
