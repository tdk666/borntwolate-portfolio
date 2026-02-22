import React, { useState, useMemo } from 'react';
import { ShieldCheck, Printer, AlertCircle, Lock, CloudDownload } from 'lucide-react';
import { SEO } from '../../components/SEO';
import { stockService } from '../../services/stock';
import toast, { Toaster } from 'react-hot-toast';
import { supabase } from '../../services/supabase';

import { photos, seriesData } from '../../data/photos';
import { PRICING_CATALOG } from '../../data/pricing';



const CertificateGenerator = () => {
    // --- ÉTATS ---
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [passwordInput, setPasswordInput] = useState("");
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);

    // Selectors
    const [selectedPhotoId, setSelectedPhotoId] = useState<number | string>("");
    const [selectedFinishId, setSelectedFinishId] = useState<string>("");
    const [selectedFormatId, setSelectedFormatId] = useState<string>("");

    const [data, setData] = useState({
        title: '',
        series: '',
        format: '', // Auto-filled
        paper: '', // Auto-filled
        number: '',
        total: '30',
        date: new Date().toLocaleDateString('fr-FR'),
        useSignature: true, // Default to true
    });

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(false);

        try {
            // Server-side verification via Netlify Function
            const response = await fetch('/.netlify/functions/verify-admin', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ password: passwordInput })
            });

            const data = await response.json();

            if (response.ok && data.success) {
                // Token is returned but not used in front-end as we rely on Supabase Service Role for critical ops or IP restrictions
                setIsAuthenticated(true);
            } else {
                setError(true);
                setPasswordInput("");
            }
        } catch (err) {
            console.error("Auth connection error:", err);
            setError(true);
        } finally {
            setLoading(false);
        }
    };

    const handlePrint = () => {
        window.print();
    };

    // Helper to get series title from ID
    const getSeriesTitle = (seriesId?: string) => {
        if (!seriesId) return "Série Inconnue";
        const series = seriesData.find(s => s.id === seriesId);
        return series ? series.title : "Série Inconnue";
    };



    const handlePhotoSelect = async (e: React.ChangeEvent<HTMLSelectElement>) => {
        const id = e.target.value;
        setSelectedPhotoId(id);

        const photo = photos.find(p => p.id === Number(id)) || photos.find(p => p.title === id);
        if (photo) {
            const slug = photo.slug;
            const { remaining, total } = await stockService.getStock(slug);
            const soldCount = total - remaining;
            const nextEdition = soldCount + 1;

            setData(prev => ({
                ...prev,
                title: photo.title,
                series: getSeriesTitle(photo.seriesId),
                number: String(nextEdition).padStart(2, '0'),
                total: String(total)
            }));

            toast.success(`Chargé : ${photo.title}\nStock vendu : ${soldCount} → Édition suggérée : ${nextEdition}/${total}`);
        }
    };

    const handleFinishSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const finishId = e.target.value;
        setSelectedFinishId(finishId);
        setSelectedFormatId(""); // Reset format when finish changes

        if (!finishId) return;

        // const range = PRICING_CATALOG[finishId]; // Unused variable removed
        let paperDetails = "";

        // Auto-Fill Logic based on Pricing Catalog
        if (finishId === 'collection') {
            paperDetails = "Canson Infinity Platine Fibre Rag 310g"; // Standard Fine Art
        } else if (finishId === 'elegance') {
            // Updated per user feedback: Always Canson Infinity Platine 310g
            paperDetails = "Canson Infinity Platine Fibre Rag 310g + Cadre Nielsen Alpha";
        } else if (finishId === 'exception' || finishId === 'galerie') {
            // Updated per user feedback: Always Canson Infinity Platine 310g
            paperDetails = "Canson Infinity Platine Fibre Rag 310g + Caisse Américaine";
        }

        setData(prev => ({ ...prev, paper: paperDetails }));
    };

    const handleFormatSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const formatId = e.target.value;
        setSelectedFormatId(formatId);

        if (selectedFinishId && formatId) {
            const variant = PRICING_CATALOG[selectedFinishId].variants.find(v => v.id === formatId);
            if (variant) {
                setData(prev => ({ ...prev, format: variant.label }));
            }
        }
    };

    const [orderId, setOrderId] = useState("");
    const [isFetchingOrder, setIsFetchingOrder] = useState(false);
    const [legacyCode, setLegacyCode] = useState<string | null>(null);

    const handleFetchOrder = async () => {
        if (!orderId) return;
        setIsFetchingOrder(true);
        setLegacyCode(null);

        try {
            // REFACTOR: Query Supabase 'orders' table directly instead of Google Sheets Proxy
            const { data, error } = await supabase
                .from('orders')
                .select('*')
                .ilike('stripe_session_id', `%${orderId}%`)
                .single();

            if (error) throw error;

            // --- NEW: Fetch Legacy Code ---
            const { data: legacyData } = await supabase
                .from('owners_legacy')
                .select('code_secret')
                .eq('stripe_session_id', data.stripe_session_id)
                .single();

            if (legacyData) {
                setLegacyCode(legacyData.code_secret);
            }
            // ------------------------------

            if (!data) {
                toast.error("Commande introuvable.");
                return;
            }

            // Map Supabase metadata to state
            // Map Supabase metadata to state
            // Priority: metadata.product_label -> metadata.artwork_title -> Infer from Slug
            let title = data.metadata?.product_label || data.metadata?.artwork_title || "";
            // Date from created_at
            const date = new Date(data.created_at).toLocaleDateString('fr-FR');

            // Try to resolve stock info from metadata.client_reference_id (slug)
            // fallback to product_id for backward compatibility
            const slug = data.metadata?.client_reference_id || data.metadata?.product_id;

            if (slug) {
                // Try to find matching Photo from Slug
                const match = photos.find(p => p.slug === slug);

                if (match) {
                    // If title was missing in metadata, use the one from our DB
                    if (!title) {
                        title = match.title;
                    }

                    setSelectedPhotoId(match.id);

                    // Fetch Stock Status
                    const { remaining, total } = await stockService.getStock(slug);

                    setData(prev => ({
                        ...prev,
                        title: title, // Ensure exact title
                        series: getSeriesTitle(match.seriesId),
                        number: String(total - remaining).padStart(2, '0'), // Sold Count is total - remaining. If remaining is 29/30, sold is 1. Edition is 1.
                        total: String(total)
                    }));
                }
            }

            // Update Basic Data (if we didn't enter the if(match) block, or to set date)
            setData(prev => ({
                ...prev,
                title: title || prev.title,
                date: date || prev.date
            }));

            toast.success(`Commande trouvée :\n${title}`);

        } catch (err) {
            console.error("Supabase Error:", err);
            toast.error("Erreur lors de la récupération (Supabase)");
        } finally {
            setIsFetchingOrder(false);
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
                        <span className="font-serif text-3xl font-bold italic text-black">{data.title || "..."}</span>
                        <span className="font-space-mono text-xs uppercase tracking-widest text-black/40 pt-2 text-right">Série</span>
                        <span className="font-serif text-2xl text-black">{data.series || "..."}</span>
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
                        {data.useSignature ? (
                            <img src="/signature.png" alt="Signature" className="h-32 ml-auto -mt-16 mb-2 mix-blend-multiply opacity-90" />
                        ) : (
                            <div className="h-px bg-black/20 w-3/4 ml-auto"></div>
                        )}
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
                            autoComplete="current-password"
                        />
                        {error && <p className="text-darkroom-red text-xs text-center font-mono">Code incorrect. Réessayez.</p>}

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-off-white text-darkroom-black py-4 font-space-mono uppercase font-bold hover:bg-darkroom-red hover:text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {loading ? "Vérification..." : "Entrer"}
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
                        {/* LEGACY CODE BADGE */}
                        {legacyCode && (
                            <div className="bg-darkroom-red/10 border border-darkroom-red/50 p-4 rounded mb-2 flex flex-col items-center">
                                <span className="text-[10px] uppercase tracking-widest text-darkroom-red mb-1">Legacy Code</span>
                                <span className="font-space-mono text-2xl font-bold text-white tracking-widest">{legacyCode}</span>
                                <span className="text-[10px] text-silver/50 mt-1">À inscrire sur le certificat</span>
                            </div>
                        )}

                        {/* ORDER ID FETCH */}
                        <div className="bg-white/5 p-4 rounded border border-white/10 mb-2">
                            <label className="block text-[10px] uppercase tracking-widest text-silver mb-2">Import Commande (Supabase)</label>
                            <div className="flex gap-2">
                                <input
                                    type="text"
                                    placeholder="# ID"
                                    value={orderId}
                                    onChange={(e) => setOrderId(e.target.value)}
                                    className="w-full bg-black/50 border border-white/20 p-2 text-sm text-white focus:border-darkroom-red outline-none"
                                />
                                <button
                                    onClick={handleFetchOrder}
                                    disabled={isFetchingOrder || !orderId}
                                    className="px-4 bg-darkroom-red/20 text-darkroom-red border border-darkroom-red/50 hover:bg-darkroom-red hover:text-white transition-colors uppercase text-xs font-bold disabled:opacity-50 flex items-center gap-2"
                                >
                                    {isFetchingOrder ? "..." : <><CloudDownload size={14} /> Go</>}
                                </button>
                            </div>
                        </div>

                        {/* PHOTO SELECTOR */}
                        <div>
                            <label className="block text-[10px] uppercase tracking-widest text-silver mb-1">Oeuvre</label>
                            <select
                                value={selectedPhotoId}
                                onChange={handlePhotoSelect}
                                className="w-full bg-black/50 border border-white/20 p-2 text-sm focus:border-darkroom-red outline-none text-white [&>option]:bg-neutral-900"
                            >
                                <option value="">-- Sélectionner --</option>
                                {photos.map(p => (
                                    <option key={p.id} value={p.id}>{p.title}</option>
                                ))}
                            </select>
                        </div>

                        {/* FINISH SELECTOR */}
                        <div>
                            <label className="block text-[10px] uppercase tracking-widest text-silver mb-1">Finition (Gamme)</label>
                            <select
                                value={selectedFinishId}
                                onChange={handleFinishSelect}
                                className="w-full bg-black/50 border border-white/20 p-2 text-sm focus:border-darkroom-red outline-none text-white [&>option]:bg-neutral-900"
                            >
                                <option value="">-- Choisir une finition --</option>
                                {Object.entries(PRICING_CATALOG).map(([key, range]) => (
                                    <option key={key} value={key}>{range.label}</option>
                                ))}
                            </select>
                        </div>

                        {/* FORMAT SELECTOR */}
                        <div>
                            <label className="block text-[10px] uppercase tracking-widest text-silver mb-1">Format (Taille)</label>
                            <select
                                value={selectedFormatId}
                                onChange={handleFormatSelect}
                                disabled={!selectedFinishId}
                                className="w-full bg-black/50 border border-white/20 p-2 text-sm focus:border-darkroom-red outline-none text-white [&>option]:bg-neutral-900 disabled:opacity-50"
                            >
                                <option value="">-- Choisir un format --</option>
                                {selectedFinishId && PRICING_CATALOG[selectedFinishId].variants.map(v => (
                                    <option key={v.id} value={v.id}>{v.label}</option>
                                ))}
                            </select>
                        </div>

                        {/* MANUAL OVERRIDES */}
                        <div className="grid grid-cols-2 gap-4">
                            <div><label className="block text-[10px] uppercase tracking-widest text-silver mb-1">Titre (Manuel)</label><input type="text" value={data.title} onChange={e => setData({ ...data, title: e.target.value })} className="w-full bg-black/50 border border-white/20 p-2 text-sm focus:border-darkroom-red outline-none text-white" /></div>
                            <div><label className="block text-[10px] uppercase tracking-widest text-silver mb-1">Série (Manuel)</label><input type="text" value={data.series} onChange={e => setData({ ...data, series: e.target.value })} className="w-full bg-black/50 border border-white/20 p-2 text-sm focus:border-darkroom-red outline-none text-white" /></div>
                        </div>

                        <div><label className="block text-[10px] uppercase tracking-widest text-silver mb-1">Support (Auto)</label><input type="text" value={data.paper} onChange={e => setData({ ...data, paper: e.target.value })} className="w-full bg-black/50 border border-white/20 p-2 text-sm focus:border-darkroom-red outline-none text-white" /></div>

                        <div className="grid grid-cols-2 gap-4">
                            <div><label className="block text-[10px] uppercase tracking-widest text-silver mb-1">Format (Manuel)</label><input type="text" value={data.format} onChange={e => setData({ ...data, format: e.target.value })} className="w-full bg-black/50 border border-white/20 p-2 text-sm focus:border-darkroom-red outline-none text-white" /></div>
                            <div><label className="block text-[10px] text-silver mb-1">Date</label><input type="text" value={data.date} onChange={e => setData({ ...data, date: e.target.value })} className="w-full bg-black/50 border border-white/20 p-2 text-white" /></div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div><label className="block text-[10px] text-silver mb-1">N°</label><input type="text" value={data.number} onChange={e => setData({ ...data, number: e.target.value })} className="w-full bg-black/50 border border-white/20 p-2 text-center text-white" /></div>
                            <div><label className="block text-[10px] text-silver mb-1">Total</label><input type="text" value={data.total} onChange={e => setData({ ...data, total: e.target.value })} className="w-full bg-black/50 border border-white/20 p-2 text-center text-white" /></div>
                        </div>

                        {/* SIGNATURE TOGGLE */}
                        <div className="flex items-center gap-2 mt-2">
                            <input
                                type="checkbox"
                                id="useSignature"
                                checked={data.useSignature}
                                onChange={e => setData({ ...data, useSignature: e.target.checked })}
                                className="accent-darkroom-red w-4 h-4"
                            />
                            <label htmlFor="useSignature" className="text-xs text-silver select-none cursor-pointer">Inclure Signature Numérique</label>
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
                            <div className="pt-4 border-t border-white/10 mt-4">
                                <h3 className="text-xs uppercase tracking-widest text-silver mb-3">Zone de Danger (Lecture Seule)</h3>
                                <p className="text-[10px] text-silver/60">
                                    La gestion des stocks est désormais automatisée via Stripe.
                                    Ce générateur ne modifie plus la base de données.
                                </p>
                            </div>
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
