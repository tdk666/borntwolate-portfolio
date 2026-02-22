import React, { useState, useEffect, useRef } from 'react';
import { ComposableMap, Geographies, Geography, Marker, ZoomableGroup } from 'react-simple-maps';
import { SEO } from '../components/SEO';
import { motion, AnimatePresence } from 'framer-motion';
import { Lock, MapPin, Send, Trash2, ArrowLeft, Globe, Maximize2 } from 'lucide-react';
import toast from 'react-hot-toast';
import { seriesData, type Photo } from '../data/photos';
import { Link } from 'react-router-dom';
import Lightbox from '../components/Lightbox';

const geoUrl = "/world-110m.json";

interface LegacyOwner {
    id?: string;
    owner_name: string;
    owner_city: string;
    message: string;
    lat: number;
    lng: number;
    art_slug: string;
    created_at?: string;
}

const Legacy = () => {
    // STATES
    const [step, setStep] = useState<'AUTH' | 'CLAIM' | 'MAP'>('AUTH');
    const [code, setCode] = useState("");
    const [loading, setLoading] = useState(false);
    const [isClaimedMode, setIsClaimedMode] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);

    // CLAIM FORM
    const [formData, setFormData] = useState({ name: "", city: "", message: "", gdprAccepted: false });

    // MAP DATA
    const [owners, setOwners] = useState<LegacyOwner[]>([]);
    // Main map interaction state
    const [selectedOwner, setSelectedOwner] = useState<LegacyOwner | null>(null);
    const mapContainerRef = useRef<HTMLDivElement>(null);

    // Lightbox integration state
    const [isLightboxOpen, setIsLightboxOpen] = useState(false);
    const [currentPhoto, setCurrentPhoto] = useState<Photo | null>(null);

    // Admin state
    const [showAdminList, setShowAdminList] = useState(false);
    const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);

    // --- TRANSLATION LOGIC ---
    // Simple heuristic: if the URL contains '/en' or we want a manual toggle
    const [lang, setLang] = useState<'FR' | 'EN'>('FR');

    const t = {
        FR: {
            title: "Authentification",
            subtitle: "Entrez le code secret de votre certificat",
            accessBtn: "Accéder à l'Héritage",
            loading: "Vérification...",
            invalid: "Code invalide",
            welcomeBack: "Ravi de vous revoir",
            claimTitle: "Marquez l'Histoire",
            claimSub: "Chaque acquisition grave une étoile éternelle. Cette identité sera publique sur la carte.",
            aliasLabel: "Alias / Pseudonyme",
            cityLabel: "Localisation (Ville, Pays)",
            msgLabel: "Note Personnelle",
            btnClaim: "GRAVER MA TRACE",
            btnClaiming: "GRAVURE...",
            success: "Votre trace est gravée. Bienvenue.",
            errorConnect: "Erreur de connexion",
            mapCount: "Collectors sur la carte",
            lockedMsg: "Position Verrouillée • Accès Propriétaire",
            adminMsg: "Vision Administrateur Active",
            returnSite: "Retour au site",
            adminDelete: "Supprimer la gravure",
            confirmDelete: "Voulez-vous vraiment effacer cette gravure ? Le code redeviendra vierge."
        },
        EN: {
            title: "Authentication",
            subtitle: "Enter your certificate secret code",
            accessBtn: "Access the Legacy",
            loading: "Verifying...",
            invalid: "Invalid code",
            welcomeBack: "Welcome back",
            claimTitle: "Mark History",
            claimSub: "Every acquisition engraves an eternal star. This identity will be public on the map.",
            aliasLabel: "Alias / Pseudonym",
            cityLabel: "Location (City, Country)",
            msgLabel: "Personal Note",
            btnClaim: "ENGRAVE MY TRACE",
            btnClaiming: "ENGRAVING...",
            success: "Your trace is engraved. Welcome.",
            errorConnect: "Connection error",
            mapCount: "Collectors on the map",
            lockedMsg: "Position Locked • Owner Access",
            adminMsg: "Administrator Vision Active",
            returnSite: "Return to gallery",
            adminDelete: "Delete record",
            confirmDelete: "Do you really want to erase this record? The code will become blank again."
        }
    };

    // Prevent browser from zooming the whole page when pinching on trackpad
    useEffect(() => {
        const container = mapContainerRef.current;
        const handleWheel = (e: WheelEvent) => {
            if (e.ctrlKey) {
                e.preventDefault();
            }
        };
        if (container) {
            container.addEventListener('wheel', handleWheel, { passive: false });
        }
        return () => {
            if (container) {
                container.removeEventListener('wheel', handleWheel);
            }
        };
    }, [step]);

    // --- Keyboard Accessibility ---
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                setSelectedOwner(null);
                setShowAdminList(false);
                setIsLightboxOpen(false);
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, []);

    // --- Helper: Find Artwork Full Object ---
    const getArtPhoto = (slug: string): Photo | null => {
        for (const series of seriesData) {
            const photo = series.photos.find(p => p.slug === slug);
            if (photo) return photo;
        }
        return null;
    };

    // --- Helper: Spatial Distribution (Spiral Offset) ---
    // Calculates a small offset for markers sharing the exact same coordinates
    const getOffsetCoordinates = (owner: LegacyOwner, allOwners: LegacyOwner[]) => {
        // Find how many owners share this exact location and what index this owner is among them
        const sameLocationOwners = allOwners.filter(o => o.lat === owner.lat && o.lng === owner.lng);
        if (sameLocationOwners.length <= 1) return [owner.lng, owner.lat];

        const localIndex = sameLocationOwners.findIndex(o => o === owner);
        if (localIndex === 0) return [owner.lng, owner.lat]; // Center point

        // Spiral parameters (tuned for visual balance on the map)
        const angleStep = Math.PI * 0.5; // 90 degrees progression
        const radiusStep = 0.5; // Tweak this based on map scale

        // Calculate spiral position
        // The radius increases slightly with each point, and angle rotates
        const radius = radiusStep * Math.sqrt(localIndex);
        const angle = localIndex * angleStep;

        const lngOffset = radius * Math.cos(angle);
        const latOffset = radius * Math.sin(angle);

        return [owner.lng + lngOffset, owner.lat + latOffset];
    };

    useEffect(() => {
        fetchMapData();
    }, []);

    const fetchMapData = async () => {
        try {
            const res = await fetch('/.netlify/functions/legacy-api');
            if (res.ok) {
                const data = await res.json();
                setOwners(data);
            }
        } catch (e) {
            console.error("Map fetch error", e);
        }
    };

    // --- 1. VERIFY CODE ---
    const handleCodeSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const cleanCode = code.trim().toUpperCase();
        if (cleanCode.length < 5) {
            toast.error(t[lang].invalid);
            return;
        }

        setLoading(true);

        try {
            // --- 1. CHECK IF ADMIN ---
            const adminRes = await fetch('/.netlify/functions/legacy-api/verify-admin', {
                method: 'POST',
                body: JSON.stringify({ code: cleanCode })
            });

            if (adminRes.ok) {
                const adminData = await adminRes.json();
                if (adminData.role === 'admin') {
                    toast("Bienvenue dans votre héritage, Théophile.", {
                        icon: '👑',
                        style: { background: '#000', color: '#fff', border: '1px solid #ff3333', fontFamily: 'monospace' },
                        duration: 4000
                    });
                    setIsAdmin(true);
                    setStep('MAP');
                    return;
                }
            }

            // --- 2. CHECK NORMAL COLLECTOR ---
            const res = await fetch('/.netlify/functions/legacy-api', {
                method: 'POST',
                body: JSON.stringify({ code: cleanCode, check_only: true })
            });
            const data = await res.json();

            if (!res.ok) {
                toast.error(data.error || t[lang].invalid);
                return;
            }

            if (data.alreadyClaimed) {
                toast(`${t[lang].welcomeBack}, ${data.owner_name}.`, {
                    icon: '👤',
                    style: { background: '#000', color: '#fff', border: '1px solid #555' }
                });
                setIsClaimedMode(true);
                setStep('MAP');
            } else {
                setStep('CLAIM');
            }
        } catch (e) {
            toast.error("Erreur de connexion");
        } finally {
            setLoading(false);
        }
    };

    // --- 2. CLAIM SPOT ---
    const handleClaimSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (isClaimedMode) return;
        setLoading(true);

        try {
            const res = await fetch('/.netlify/functions/legacy-api', {
                method: 'POST',
                body: JSON.stringify({
                    code,
                    name: formData.name,
                    city: formData.city,
                    message: formData.message
                })
            });

            const data = await res.json();

            if (!res.ok) {
                toast.error(data.error || "Erreur lors de l'enregistrement");
            } else {
                toast.success("Votre trace est gravée. Bienvenue.");
                await fetchMapData();
                setIsClaimedMode(true);
                setStep('MAP');
            }
        } catch (err) {
            toast.error("Erreur de connexion");
        } finally {
            setLoading(false);
        }
    };

    // --- 3. DELETE SPOT (Admin) ---
    const handleDeleteRecord = async (id: string) => {
        if (!confirm("Voulez-vous vraiment effacer cette gravure ? Le code redeviendra vierge.")) return;

        try {
            const res = await fetch('/.netlify/functions/legacy-api', {
                method: 'DELETE',
                body: JSON.stringify({ admin_code: code.trim().toUpperCase(), id: id })
            });
            const data = await res.json();

            if (!res.ok) {
                toast.error(data.error || "Erreur lors de la suppression");
            } else {
                toast.success("Gravure effacée. Code réutilisable.");
                setSelectedOwner(null);
                await fetchMapData(); // Refresh map
            }
        } catch (err) {
            toast.error("Erreur de connexion API");
        }
    };

    return (
        <div className="min-h-screen bg-[#020202] text-white font-space-mono overflow-hidden relative selection:bg-darkroom-red selection:text-white">
            <SEO title="Legacy Map | BornTooLate" description="L'héritage des collectionneurs BornTooLate. Une carte mondiale des œuvres argentiques acquises." />

            <script type="application/ld+json">
                {JSON.stringify({
                    "@context": "https://schema.org",
                    "@type": "CollectionPage",
                    "name": "BornTooLate Legacy Map",
                    "description": "Une carte interactive mondiale recensant les collectionneurs et gardiens des œuvres photographiques argentiques de BornTooLate.",
                    "url": "https://www.borntwolate.com/legacy",
                    "provider": {
                        "@type": "PhotographyBusiness",
                        "name": "BornTooLate",
                        "url": "https://www.borntwolate.com"
                    }
                })}
            </script>

            {/* HEADER */}
            <div className="absolute top-0 left-0 w-full p-8 flex justify-between items-start z-50 pointer-events-none">
                <div className="pointer-events-auto">
                    <h1 className="text-lg md:text-xl uppercase tracking-[0.3em] font-bold">
                        BornTooLate <span className="text-darkroom-red opacity-80">Legacy</span>
                    </h1>
                    <div className="h-px w-12 bg-darkroom-red mt-2 transition-all duration-1000 group-hover:w-24"></div>
                </div>

                <div className="flex flex-col items-end gap-3 pointer-events-auto">
                    {/* TOP RIGHT CONTROLS: Return to site & Language */}
                    <div className="flex items-center gap-4">
                        <button
                            onClick={() => setLang(lang === 'FR' ? 'EN' : 'FR')}
                            className="bg-white/5 hover:bg-white/10 border border-white/10 px-3 py-1.5 rounded-full text-[10px] uppercase tracking-widest text-silver hover:text-white transition-all duration-300 flex items-center gap-2"
                        >
                            <Globe size={12} />
                            {lang}
                        </button>
                        <Link
                            to="/"
                            className="flex items-center gap-2 text-[10px] uppercase tracking-widest text-silver hover:text-white bg-darkroom-red/20 border border-darkroom-red/50 hover:bg-darkroom-red px-4 py-2 rounded-sm transition-all duration-500"
                        >
                            <ArrowLeft size={12} />
                            {t[lang].returnSite}
                        </Link>
                    </div>

                    <div className="flex flex-col gap-2 mt-4 items-end relative z-40">
                        {isAdmin ? (
                            <div className="relative">
                                <button
                                    onClick={() => setShowAdminList(!showAdminList)}
                                    className="bg-black/90 backdrop-blur-md border border-white/20 hover:border-darkroom-red transition-colors px-4 py-2 rounded-sm text-[10px] uppercase tracking-widest text-silver hover:text-white flex items-center gap-2"
                                >
                                    <span className="text-white font-bold">{owners.length}</span> {t[lang].mapCount}
                                    <ArrowLeft size={10} className={`transform transition-transform ${showAdminList ? 'rotate-90' : '-rotate-90'}`} />
                                </button>

                                {showAdminList && (
                                    <div className="absolute top-full right-0 mt-2 w-64 bg-black/95 backdrop-blur-xl border border-white/10 rounded-sm shadow-2xl max-h-[60vh] overflow-y-auto z-50">
                                        {owners.map((o, idx) => (
                                            <button
                                                key={o.id || idx}
                                                onClick={() => {
                                                    setSelectedOwner(o);
                                                    setShowAdminList(false);
                                                }}
                                                className="w-full text-left px-4 py-3 hover:bg-white/5 border-b border-white/5 flex items-center justify-between group transition-colors"
                                            >
                                                <div className="overflow-hidden">
                                                    <div className="text-[10px] text-white uppercase tracking-widest truncate text-left">{o.owner_name}</div>
                                                    <div className="text-[8px] text-silver/50 uppercase tracking-widest truncate text-left">{o.owner_city}</div>
                                                </div>
                                                <span className="text-[8px] text-darkroom-red opacity-0 group-hover:opacity-100 uppercase tracking-widest">Voir</span>
                                            </button>
                                        ))}
                                    </div>
                                )}
                            </div>
                        ) : (
                            <div className="flex items-center gap-4">
                                {step === 'MAP' && !isClaimedMode && (
                                    <button
                                        onClick={() => setStep('AUTH')}
                                        className="bg-darkroom-red/90 text-white hover:bg-white hover:text-black border border-transparent transition-all px-4 py-2 rounded-sm text-[10px] uppercase font-bold tracking-[0.2em] shadow-lg flex items-center gap-2"
                                    >
                                        <Lock size={10} /> Secure Legacy
                                    </button>
                                )}
                                <div className="bg-black/80 backdrop-blur-md border border-white/10 px-4 py-2 rounded-sm text-[10px] uppercase tracking-widest text-silver/80">
                                    <span className="text-white font-bold">{owners.length}</span> {t[lang].mapCount}
                                </div>
                            </div>
                        )}

                        {isClaimedMode && (
                            <div className="text-[9px] uppercase tracking-tighter text-darkroom-red animate-pulse bg-black/50 px-2 py-1">
                                {t[lang].lockedMsg}
                            </div>
                        )}
                        {isAdmin && (
                            <div className="text-[9px] uppercase tracking-tighter text-blue-400 font-bold bg-black/50 px-2 py-1">
                                {t[lang].adminMsg}
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* CONTENT */}
            <AnimatePresence mode="wait">
                {step === 'AUTH' && (
                    <motion.div
                        key="auth"
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, scale: 1.05 }}
                        className="absolute inset-0 z-40 bg-black/80 backdrop-blur-md flex flex-col items-center justify-center p-4"
                    >
                        {/* Close Overlay Button */}
                        <button onClick={() => setStep('MAP')} className="absolute top-8 right-8 text-white/50 hover:text-white transition-colors" aria-label="Fermer overlay">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="square"><path d="M18 6L6 18M6 6l12 12" /></svg>
                        </button>

                        <div className="relative mb-12">
                            <Lock className="text-darkroom-red w-16 h-16 opacity-40" strokeWidth={0.5} />
                            <div className="absolute inset-0 blur-2xl bg-darkroom-red/10 rounded-full"></div>
                        </div>

                        <h2 className="text-xl md:text-3xl uppercase tracking-[0.4em] mb-12 text-center max-w-2xl leading-relaxed font-light">
                            {t[lang].title} <br />
                            <span className="text-white/20 text-sm tracking-widest mt-4 block font-sans">{t[lang].subtitle}</span>
                        </h2>

                        <form onSubmit={handleCodeSubmit} className="flex flex-col gap-8 w-full max-w-sm">
                            <input
                                type="text"
                                placeholder="_ _ _ _ - _ _ _ _"
                                value={code}
                                onChange={e => setCode(e.target.value.toUpperCase())}
                                className="bg-transparent border-b border-white/10 py-6 text-center text-3xl tracking-[0.5em] outline-none focus:border-darkroom-red transition-all duration-500 placeholder:text-white/5 font-light"
                            />
                            <button
                                type="submit"
                                disabled={loading}
                                className="border border-white/20 bg-transparent text-white py-5 uppercase tracking-[0.3em] text-xs hover:bg-white hover:text-black hover:border-white transition-all duration-500 disabled:opacity-20"
                            >
                                {loading ? t[lang].loading : t[lang].accessBtn}
                            </button>
                        </form>
                    </motion.div>
                )}

                {step === 'CLAIM' && (
                    <motion.div
                        key="claim"
                        initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95 }}
                        className="absolute inset-0 z-40 bg-black/80 backdrop-blur-md flex flex-col items-center justify-center p-4 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-darkroom-red/10 via-transparent to-transparent font-sans"
                    >
                        {/* Close Overlay Button */}
                        <button onClick={() => setStep('MAP')} className="absolute top-8 right-8 text-white/50 hover:text-white transition-colors" aria-label="Fermer overlay">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="square"><path d="M18 6L6 18M6 6l12 12" /></svg>
                        </button>

                        <MapPin className="text-darkroom-red mb-8 w-12 h-12" strokeWidth={1} />
                        <h2 className="text-2xl uppercase tracking-[0.3em] mb-4 font-space-mono font-light">{t[lang].claimTitle}</h2>
                        <p className="text-white/30 text-[10px] uppercase tracking-[0.2em] mb-12 text-center max-w-md leading-loose font-space-mono">
                            {t[lang].claimSub}
                        </p>

                        <form onSubmit={handleClaimSubmit} className="bg-black/40 backdrop-blur-2xl border border-white/5 p-10 rounded-sm w-full max-w-md space-y-8 shadow-2xl">
                            <div className="space-y-2">
                                <div className="flex justify-between items-center">
                                    <label className="block text-[9px] uppercase tracking-[0.3em] text-silver/60 font-space-mono">{t[lang].aliasLabel}</label>
                                    <span className="text-[8px] text-darkroom-red/60 font-space-mono uppercase">Web3 Privacy Priority</span>
                                </div>
                                <input required type="text" value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} className="w-full bg-white/5 border border-white/10 p-4 text-white focus:border-darkroom-red outline-none transition-colors text-sm rounded-sm" placeholder="NOM D'ARTISTE OU PSEUDO" />
                            </div>
                            <div className="space-y-2">
                                <label className="block text-[9px] uppercase tracking-[0.3em] text-silver/60 font-space-mono">{t[lang].cityLabel}</label>
                                <input required type="text" value={formData.city} onChange={e => setFormData({ ...formData, city: e.target.value })} className="w-full bg-white/5 border border-white/10 p-4 text-white focus:border-darkroom-red outline-none transition-colors text-sm rounded-sm" placeholder="EX: PARIS, FRANCE" />
                            </div>
                            <div className="space-y-2">
                                <label className="block text-[9px] uppercase tracking-[0.3em] text-silver/60 font-space-mono">{t[lang].msgLabel}</label>
                                <textarea maxLength={140} value={formData.message} onChange={e => setFormData({ ...formData, message: e.target.value })} className="w-full bg-white/5 border border-white/10 p-4 text-white focus:border-darkroom-red outline-none h-28 resize-none transition-colors text-sm rounded-sm" placeholder="UN MOT SUR VOTRE ACQUISITION..." />
                            </div>
                            <div className="space-y-4 pt-4 border-t border-white/10">
                                <label className="flex items-start gap-3 cursor-pointer group">
                                    <div className="relative flex items-center justify-center mt-0.5">
                                        <input
                                            type="checkbox"
                                            required
                                            checked={formData.gdprAccepted}
                                            onChange={e => setFormData({ ...formData, gdprAccepted: e.target.checked })}
                                            className="appearance-none w-4 h-4 border border-white/30 rounded-sm bg-black/50 checked:bg-darkroom-red checked:border-darkroom-red transition-all cursor-pointer"
                                        />
                                        {formData.gdprAccepted && <svg className="w-2.5 h-2.5 absolute text-white pointer-events-none" viewBox="0 0 14 10" fill="none"><path d="M1 5L5 9L13 1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>}
                                    </div>
                                    <span className="text-[9px] text-white/50 leading-relaxed font-sans mt-0.5 group-hover:text-white/80 transition-colors">
                                        J'accepte que mon Alias, ma localisation, ainsi que ma note personnelle soient enregistrés et affichés publiquement de façon permanente sur la Legacy Map.
                                    </span>
                                </label>
                                <button disabled={loading || !formData.gdprAccepted} type="submit" className="w-full bg-darkroom-red text-white py-5 uppercase font-bold tracking-[0.2em] text-[10px] hover:bg-white hover:text-black transition-all duration-500 disabled:bg-white/10 disabled:text-white/30 flex justify-center items-center gap-3 font-space-mono rounded-sm">
                                    {loading ? t[lang].btnClaiming : <><Send size={14} /> {t[lang].btnClaim}</>}
                                </button>
                            </div>
                        </form>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* MAP CONTENT - Always rendered in background */}
            <motion.div
                ref={mapContainerRef}
                key="map"
                initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                className="absolute inset-0 z-0 bg-[#020202]"
            >
                <div className="absolute inset-0 touch-none">
                    <ComposableMap
                        projection="geoMercator"
                        projectionConfig={{ scale: 220 }}
                        className="w-full h-full outline-none"
                    >
                        <ZoomableGroup center={[0, 20]} zoom={1} minZoom={1} maxZoom={50}>
                            <Geographies geography={geoUrl}>
                                {({ geographies }) =>
                                    geographies.map((geo) => (
                                        <Geography
                                            key={geo.rsmKey}
                                            geography={geo}
                                            style={{
                                                default: { fill: "#151515", stroke: "#2a2a2a", strokeWidth: 0.3, outline: "none" },
                                                hover: { fill: "#1c1c1c", stroke: "#444", strokeWidth: 0.4, outline: "none" },
                                                pressed: { fill: "#111111", outline: "none" },
                                            }}
                                        />
                                    ))
                                }
                            </Geographies>
                            {owners.map((owner, i) => (
                                <Marker key={i} coordinates={getOffsetCoordinates(owner, owners) as [number, number]}>
                                    <g
                                        onClick={() => setSelectedOwner(owner)}
                                        onKeyDown={(e) => {
                                            if (e.key === 'Enter' || e.key === ' ') {
                                                e.preventDefault();
                                                setSelectedOwner(owner);
                                            }
                                        }}
                                        className="cursor-pointer group outline-none"
                                        role="button"
                                        tabIndex={0}
                                        aria-label={`Voir le collectionneur ${owner.owner_name} à ${owner.owner_city}`}
                                    >
                                        <circle r={2} fill="#ff3333" className="filter drop-shadow-[0_0_8px_rgba(255,51,51,0.8)]" />
                                        <circle r={5} fill="transparent" stroke="#ff3333" strokeOpacity={0.4} strokeWidth={1} className="animate-ping" />
                                        {/* Minimalist marker highlight */}
                                        <circle r={8} fill="white" fillOpacity={0} className="hover:fill-opacity-5 transition-all" />
                                    </g>
                                </Marker>
                            ))}
                        </ZoomableGroup>
                    </ComposableMap>
                </div>
            </motion.div>

            {/* INFO PANEL */}
            <AnimatePresence>
                {selectedOwner && (
                    <motion.div
                        initial={{ opacity: 0, x: 50, filter: 'blur(10px)' }}
                        animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
                        exit={{ opacity: 0, x: 50, filter: 'blur(10px)' }}
                        className="absolute right-4 bottom-4 md:right-8 md:bottom-auto md:top-36 bg-black/90 backdrop-blur-3xl border border-white/10 p-0 rounded-sm max-w-[340px] w-[calc(100%-2rem)] md:w-full shadow-[0_40px_100px_-20px_rgba(0,0,0,0.8)] border-l-darkroom-red border-l-2 z-50 pointer-events-auto flex flex-col max-h-[85vh]"
                    >

                        {/* ARTWORK PREVIEW */}
                        <div
                            className={`relative h-48 bg-white/5 group overflow-hidden shrink-0 ${getArtPhoto(selectedOwner.art_slug) ? 'cursor-zoom-in' : ''}`}
                            onClick={() => {
                                const photo = getArtPhoto(selectedOwner.art_slug);
                                if (photo) {
                                    setCurrentPhoto(photo);
                                    setIsLightboxOpen(true);
                                }
                            }}
                        >
                            {getArtPhoto(selectedOwner.art_slug) ? (
                                <>
                                    <img
                                        src={getArtPhoto(selectedOwner.art_slug)!.url}
                                        alt={selectedOwner.art_slug}
                                        className="w-full h-full object-cover opacity-60 group-hover:scale-110 transition-transform duration-1000 grayscale group-hover:grayscale-0"
                                    />
                                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                                        <div className="flex items-center gap-2 bg-black/60 backdrop-blur-md px-4 py-2 rounded-full text-white text-[10px] uppercase tracking-widest border border-white/20">
                                            <Maximize2 size={12} />
                                            Découvrir l'Œuvre
                                        </div>
                                    </div>
                                </>
                            ) : (
                                <div className="w-full h-full flex items-center justify-center text-white/10 text-[10px] uppercase tracking-widest">
                                    Visual loading...
                                </div>
                            )}
                            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent pointer-events-none"></div>
                            <button
                                onClick={(e) => { e.stopPropagation(); setSelectedOwner(null); }}
                                className="absolute top-4 right-4 text-white/30 hover:text-white transition-colors z-10 bg-black/50 p-2 rounded-full backdrop-blur-md"
                                aria-label="Fermer le panneau d'information"
                            >
                                <span className="sr-only">Close</span>
                                <svg width="12" height="12" viewBox="0 0 12 12" aria-hidden="true"><path d="M1 1L11 11M11 1L1 11" stroke="currentColor" strokeWidth="1.5" /></svg>
                            </button>
                        </div>

                        <div className="p-8 overflow-y-auto custom-scrollbar flex-1 relative z-10 pointer-events-auto min-h-0" style={{ touchAction: 'pan-y' }}>
                            <div className="mb-8">
                                <div className="flex justify-between items-start mb-2">
                                    <p className="text-[9px] uppercase tracking-[0.3em] text-darkroom-red font-bold">Collector #{owners.indexOf(selectedOwner) + 1}</p>
                                    {isAdmin && <span className="text-[8px] text-blue-400 bg-blue-400/10 px-1 py-0.5 rounded tracking-tighter uppercase font-bold">Admin ID: {selectedOwner.id?.slice(0, 8)}</span>}
                                </div>
                                <h3 className="font-light text-2xl uppercase tracking-widest break-words leading-tight">{selectedOwner.owner_name}</h3>
                                <div className="flex items-center gap-2 mt-2">
                                    <MapPin size={10} className="text-silver/40" />
                                    <p className="text-[10px] text-silver/60 uppercase tracking-widest font-light">{selectedOwner.owner_city}</p>
                                </div>
                            </div>

                            <div className="bg-white/5 p-4 italic text-sm text-white/70 font-light leading-relaxed border border-white/5 relative font-sans">
                                <span className="absolute -top-3 left-4 bg-black px-2 text-[8px] uppercase tracking-widest font-space-mono text-silver/40 border border-white/5">Trace Digitale</span>
                                "{selectedOwner.message}"
                            </div>

                            <div className="mt-8 pt-6 border-t border-white/5 flex justify-between items-center">
                                <div>
                                    <div className="text-[8px] uppercase tracking-widest text-white/20 mb-1">Reference</div>
                                    <div className="text-[9px] uppercase tracking-widest text-silver/60 underline decoration-darkroom-red/40 font-bold">{selectedOwner.art_slug || "BT-NOIR-84"}</div>
                                </div>

                                {isAdmin && selectedOwner.created_at && (
                                    <div className="text-right">
                                        <div className="text-[8px] uppercase tracking-widest text-white/20 mb-1">Established</div>
                                        <div className="text-[9px] uppercase tracking-widest text-silver/40">{new Date(selectedOwner.created_at).toLocaleDateString()}</div>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* STICKY FOOTER DELETE BUTTON */}
                        {isAdmin && selectedOwner.id && (
                            <div className="shrink-0 border-t border-darkroom-red/30 bg-black/80 backdrop-blur-md p-4 mt-auto rounded-b-sm">
                                <button
                                    onClick={() => {
                                        if (confirmDeleteId === selectedOwner.id) {
                                            handleDeleteRecord(selectedOwner.id!);
                                            setConfirmDeleteId(null);
                                        } else {
                                            setConfirmDeleteId(selectedOwner.id!);
                                            setTimeout(() => setConfirmDeleteId(null), 3000); // Reset after 3s
                                        }
                                    }}
                                    className={`w-full flex items-center justify-center gap-3 py-4 text-[10px] uppercase font-bold tracking-[0.2em] rounded-sm transition-all duration-300 shadow-lg ${confirmDeleteId === selectedOwner.id ? 'bg-red-600 text-white animate-pulse' : 'bg-darkroom-red/20 text-darkroom-red hover:bg-darkroom-red hover:text-white border border-darkroom-red/50'}`}
                                >
                                    <Trash2 size={16} />
                                    {confirmDeleteId === selectedOwner.id ? "Confirmer la suppression" : "Supprimer le collectionneur"}
                                </button>
                            </div>
                        )}
                    </motion.div>
                )}
            </AnimatePresence>

            {/* FOOTER CONTROLS */}
            <div className="absolute bottom-8 left-8 flex items-end gap-12 pointer-events-none z-10">
                <div className="flex flex-col gap-1 pointer-events-auto">
                    <div className="text-[8px] uppercase tracking-[0.4em] text-white/10 mb-2">Interface Map v2.1</div>
                    <div className="flex items-center gap-4">
                        <div className="p-3 bg-black/60 border border-white/10 text-[9px] text-silver uppercase tracking-widest backdrop-blur-xl flex items-center gap-3">
                            <div className="w-1.5 h-1.5 bg-darkroom-red rounded-full animate-pulse"></div>
                            Ultra-Fluid Navigation Active
                        </div>
                        <div className="text-[9px] text-white/20 uppercase tracking-widest hidden md:block">
                            Utilisez la molette pour plonger dans l'histoire
                        </div>
                    </div>
                </div>
            </div>

            {/* MOBILE HINT */}
            <div className="absolute bottom-8 right-8 md:hidden pointer-events-none">
                <div className="text-[8px] uppercase tracking-widest text-white/20">Pinch to zoom</div>
            </div>

            {/* LIGHTBOX OVERLAY */}
            {isLightboxOpen && currentPhoto && (
                <div className="absolute inset-0 z-[100]">
                    <Lightbox
                        photo={currentPhoto}
                        onClose={() => setIsLightboxOpen(false)}
                        onNext={() => { }} // Single photo view, disable nav
                        onPrev={() => { }}
                    />
                </div>
            )}
        </div>
    );
};

export default Legacy;
