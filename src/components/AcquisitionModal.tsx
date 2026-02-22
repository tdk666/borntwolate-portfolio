import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { X, ShieldCheck, ArrowRight, Eye, Globe, Info } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { sendEmail } from '../services/email';
import { trackEvent } from './GoogleAnalytics';
import { PRICING_CATALOG, usePricing } from '../data/pricing';
import { FadeIn } from './animations/FadeIn';
import WallPreview from './WallPreview';


interface AcquisitionModalProps {
  isOpen: boolean;
  onClose: () => void;
  photoTitle: string;
  photoSlug: string;
  imageSrc?: string;
}

export default function AcquisitionModal({ isOpen, onClose, photoTitle, photoSlug, imageSrc }: AcquisitionModalProps) {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<keyof typeof PRICING_CATALOG>('collection');
  const [selectedVariantId, setSelectedVariantId] = useState<string>(PRICING_CATALOG['collection'].variants[0].id);
  const [isWallPreviewOpen, setIsWallPreviewOpen] = useState(false);
  const [currency, setCurrency] = useState<'EUR' | 'USD' | 'GBP'>('EUR');
  const [cgvAccepted, setCgvAccepted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [stockData, setStockData] = useState<{ remaining: number; total: number } | null>(null);
  const pricingCatalog = usePricing();

  // Stock Fetching
  useEffect(() => {
    if (isOpen && photoSlug) {
      const fetchStock = async () => {
        // Dynamic import to avoid cycles or load issues if service is broken? No, standard import is fine.
        // We assume stockService handles errors now.
        const { stockService } = await import('../services/stock');
        const { remaining, total } = await stockService.getStock(photoSlug);
        setStockData({ remaining, total });
      };
      fetchStock();
    }
  }, [isOpen, photoSlug]);

  if (!isOpen) return null;

  const currentRange = pricingCatalog[activeTab];
  // Protection pour s'assurer que la variante existe dans la gamme sélectionnée
  const currentVariant = currentRange.variants.find(v => v.id === selectedVariantId) || currentRange.variants[0];

  const finalStripeUrl = `${currentVariant.stripeUrl}?client_reference_id=${photoSlug}`;

  // Helper to translate dynamic keys
  const getTranslatedRange = (key: string) => {
    switch (key) {
      case 'collection': return t('pricing.collection', { returnObjects: true }) as any;
      case 'elegance': return t('pricing.elegance', { returnObjects: true }) as any;
      case 'exception': return t('pricing.exception', { returnObjects: true }) as any;
      default: return {};
    }
  };

  const translatedCurrentRange = getTranslatedRange(activeTab);

  const EXCHANGE_RATES = {
    EUR: 1,
    USD: 1.05,
    GBP: 0.85
  };

  const formatPrice = (priceEur: number) => {
    const price = Math.round(priceEur * EXCHANGE_RATES[currency]);
    switch (currency) {
      case 'USD': return `$${price}`;
      case 'GBP': return `£${price}`;
      default: return `${price} €`;
    }
  };

  const isSoldOut = stockData && stockData.remaining === 0;

  return (
    <>
      <div className="fixed inset-0 z-[60] flex flex-col items-center justify-end md:justify-center p-0 md:p-4">
        <div className="absolute inset-0 bg-black/90 backdrop-blur-sm" onClick={onClose} />

        <FadeIn
          className="relative w-full md:max-w-4xl bg-[#0a0a0a] md:border border-white/10 md:rounded-2xl shadow-2xl flex flex-col md:flex-row h-full md:h-auto md:max-h-[85vh] overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >

          {/* CLOSE BUTTON - Sticky/Absolute Top Right */}
          <div className="absolute top-0 right-0 p-4 z-50">
            <button
              onClick={onClose}
              className="bg-black/50 backdrop-blur-md rounded-full p-2 text-white hover:bg-white hover:text-black transition-colors"
              aria-label={t('common.close')}
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* GAUCHE : Info Photo & Image */}
          <div className="w-full md:w-1/3 bg-white/5 relative flex-shrink-0 min-h-[120px] md:min-h-0 md:h-auto">
            {imageSrc && (
              <div className="absolute inset-0 md:pb-32 transition-all duration-500">
                <img
                  src={imageSrc}
                  alt={photoTitle}
                  className="w-full h-full object-cover md:object-contain opacity-60 md:opacity-80"
                />
                {/* Gradient overlay on mobile and desktop for text readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent opacity-90" />
              </div>
            )}

            <div className="absolute bottom-0 left-0 p-6 md:p-8 w-full md:relative md:h-full md:flex md:flex-col md:justify-end z-10 pointer-events-none">
              <div className="pointer-events-auto">
                <div className="text-[10px] uppercase tracking-widest text-white/60 mb-1 md:mb-2">{t('acquisition.selected_work')}</div>
                <h2 className="font-serif text-2xl md:text-3xl text-white leading-tight shadow-black drop-shadow-md md:drop-shadow-none">{photoTitle}</h2>
                <p className="text-xs md:text-sm text-white/80 md:text-white/60 mt-1">
                  {t('acquisition.limited_edition')} {stockData ? `(${stockData.remaining}/${stockData.total})` : ''}
                </p>
              </div>
            </div>
          </div>

          {/* DROITE : Configurateur */}
          <div className="w-full md:w-2/3 flex flex-col flex-1 md:h-full bg-[#0a0a0a] relative min-h-0">

            {/* Scrollable Content Area */}
            <div className="flex-1 overflow-y-auto p-6 md:p-8 overscroll-contain">

              {/* Stock Status Indicator */}
              {stockData && (
                <div className={`mb-6 p-3 rounded-lg flex items-center gap-3 ${stockData.remaining === 0 ? 'bg-red-500/10 border border-red-500/20' : 'bg-white/5'
                  }`}>
                  <div className={`w-2 h-2 rounded-full ${stockData.remaining <= 5 ? 'bg-red-500 animate-pulse' : 'bg-emerald-500'
                    }`} />
                  <span className={`text-xs uppercase tracking-widest font-space-mono ${stockData.remaining <= 5 ? 'text-red-400' : 'text-white/60'
                    }`}>
                    {stockData.remaining === 0
                      ? (t('acquisition.sold_out') || 'ŒUVRE ÉPUISÉE')
                      : stockData.remaining <= 5
                        ? t('acquisition.stock_remaining', { count: stockData.remaining })
                        : `${stockData.remaining} Exemplaires Restants`
                    }
                  </span>
                </div>
              )}

              {/* Tabs Finitions */}
              <div className="flex gap-2 mb-6 border-b border-white/10 pb-4 overflow-x-auto no-scrollbar mask-gradient-right">
                {Object.entries(pricingCatalog).map(([key, range]) => {
                  const trKey = key === 'galerie' ? 'exception' : key;
                  const trRange = getTranslatedRange(trKey);
                  return (
                    <button
                      key={key}
                      role="tab"
                      aria-selected={activeTab === key}
                      onClick={() => { setActiveTab(key as any); setSelectedVariantId(range.variants[0].id); }}
                      className={`px-4 py-3 rounded-lg text-sm font-medium transition-all whitespace-nowrap touch-manipulation ${activeTab === key
                        ? 'bg-white text-black'
                        : 'text-white/50 hover:text-white hover:bg-white/5'
                        }`}
                    >
                      {trRange.label || range.label}
                    </button>
                  )
                })}
              </div>

              <div className="mb-6">
                <h3 className="text-white font-serif text-xl mb-2">{translatedCurrentRange.label}</h3>
                <p className="text-sm text-white/60 mb-3 leading-relaxed">{translatedCurrentRange.description}</p>
                <div className="flex flex-wrap gap-2">
                  {translatedCurrentRange.features && Object.values(translatedCurrentRange.features).map((f: any, i: number) => (
                    <span key={i} className="text-[10px] uppercase tracking-wider bg-white/5 px-2 py-1 rounded text-white/70">
                      {f}
                    </span>
                  ))}
                </div>
              </div>

              {/* Grille des Tailles */}
              <div className="flex justify-between items-end mb-4">
                <label className="text-xs uppercase tracking-widest text-white/40">{t('acquisition.choose_format')}</label>
                <button
                  onClick={() => setIsWallPreviewOpen(true)}
                  className="text-xs text-white/60 hover:text-white underline decoration-white/30 underline-offset-4 flex items-center gap-1 py-1 px-2 -mr-2"
                >
                  <Eye className="w-3 h-3" /> {t('acquisition.view_wall')}
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
                {currentRange.variants.map((variant) => (
                  <button
                    key={variant.id}
                    onClick={() => setSelectedVariantId(variant.id)}
                    className={`p-4 rounded-xl border text-left transition-all touch-manipulation ${selectedVariantId === variant.id
                      ? 'border-white bg-white/5 ring-1 ring-white'
                      : 'border-white/10 text-white/40 hover:border-white/30'
                      }`}
                  >
                    <div className="flex justify-between items-baseline mb-1">
                      <span className="text-sm font-medium text-white">{variant.label}</span>
                      <span className="text-lg font-serif text-white">{formatPrice(variant.price)}</span>
                    </div>
                    {variant.details && <div className="text-xs text-white/50">{variant.details}</div>}
                  </button>
                ))}
              </div>
            </div>

            {/* STICKY FOOTER ACTION */}
            <div className="border-t border-white/10 p-4 md:p-8 bg-[#0a0a0a] z-50 pb-[calc(1rem+env(safe-area-inset-bottom,20px))] md:pb-8 flex-shrink-0">

              <div className="flex flex-col gap-3 mb-4">

                {/* Top Row: Smart Shipping Info */}
                <div className="flex flex-col gap-2 w-full mb-2">
                  {/* Logic: Collection = Print (Worldwide), Others = Frame (Europe Only) */}
                  {activeTab === 'collection' ? (
                    <div className="flex items-start gap-2 text-emerald-400/80 text-xs">
                      <Globe className="w-4 h-4 shrink-0 mt-0.5" />
                      <span>{t('acquisition.shipping_worldwide')}</span>
                    </div>
                  ) : (
                    <div className="flex items-start gap-2 text-amber-400/80 text-xs">
                      <Info className="w-4 h-4 shrink-0 mt-0.5" />
                      <span>{t('acquisition.shipping_europe')}</span>
                    </div>
                  )}

                  <div className="flex items-center gap-2 text-white/50 text-[10px] md:text-xs">
                    <ShieldCheck className="w-3 h-3 md:w-4 md:h-4" />
                    <span className="truncate">{t('acquisition.shipping_secure')}</span>
                  </div>
                </div>

                {/* Second Row: Currency & Price */}
                <div className="flex justify-between items-end w-full">
                  {/* Currency Toggles */}
                  <div className="flex gap-1 bg-white/10 rounded-lg p-1 h-fit">
                    {(['EUR', 'USD', 'GBP'] as const).map((curr) => (
                      <button
                        key={curr}
                        onClick={() => setCurrency(curr)}
                        className={`px-3 py-1.5 rounded text-xs font-medium transition-colors ${currency === curr
                          ? 'bg-white text-black'
                          : 'text-white/40 hover:text-white'
                          }`}
                      >
                        {curr === 'EUR' ? '€' : curr === 'USD' ? '$' : '£'}
                      </button>
                    ))}
                  </div>

                  <div className="text-right">
                    <span className="text-3xl font-serif text-white block leading-none">{formatPrice(currentVariant.price)}</span>
                    {currency !== 'EUR' && (
                      <span className="text-[10px] text-white/40 block mt-1">
                        ≈ {currentVariant.price} €
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* CGV CHECKBOX MANDATORY FOR GOOGLE MERCHANT CENTER */}
              <div className="mb-4 text-xs text-white/70 bg-white/5 p-3 rounded-lg border border-white/10">
                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    className="mt-0.5 accent-darkroom-red w-4 h-4 rounded-sm border-white/20 bg-black"
                    checked={cgvAccepted}
                    onChange={(e) => setCgvAccepted(e.target.checked)}
                    required
                  />
                  <span className="leading-snug">
                    J'accepte les <a href="/legals" target="_blank" rel="noopener noreferrer" className="underline hover:text-white transition-colors">Conditions Générales de Vente</a> et la Politique de Confidentialité. Je reconnais que cette œuvre d'art est produite sur commande.
                  </span>
                </label>
              </div>

              <a
                href={isSoldOut || !cgvAccepted ? '#' : finalStripeUrl}
                target={isSoldOut || !cgvAccepted ? undefined : "_blank"}
                rel={isSoldOut || !cgvAccepted ? undefined : "noopener noreferrer"}
                className={`w-full py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-2 transition-colors shadow-lg shadow-white/5 active:scale-[0.98] 
                  ${isSoldOut || !cgvAccepted
                    ? 'bg-neutral-800 text-neutral-500 cursor-not-allowed opacity-50'
                    : 'bg-white text-black hover:bg-gray-200'
                  } 
                  ${isLoading ? 'opacity-70 cursor-wait' : ''}`}
                onClick={async (e) => {
                  e.preventDefault();
                  if (isLoading || isSoldOut || !cgvAccepted) return;

                  setIsLoading(true);
                  try {
                    // 0. Track Event in GA4
                    trackEvent(
                      'begin_checkout',
                      'Ecommerce',
                      `Artwork: ${photoTitle} - ${currentVariant.label} (${activeTab})`,
                      currentVariant.price
                    );

                    // 1. Send Email Notification (Chameleon Strategy)
                    await sendEmail({
                      contact_type: "COMMANDE",
                      user_name: "Client Stripe (Pre-Checkout)",
                      user_email: "attente_paiement@borntoolate.com",
                      admin_subject: `NOUVELLE TENTATIVE D'ACHAT : ${photoTitle}`,
                      message_content: `[TENTATIVE ACHAT STRIPE]\n\nŒuvre : ${photoTitle}\nFormat : ${currentVariant.label}\nFinition : ${activeTab}\nPrix : ${currentVariant.price}€`,
                      reply_subject: "Votre sélection - Born Too Late",
                      reply_message: "Vous avez initié un paiement pour une œuvre. Si vous n'avez pas finalisé la commande, n'hésitez pas à nous contacter.",
                      reply_details: `Œuvre : ${photoTitle}\nFormat : ${currentVariant.label}`
                    });

                  } catch (error) {
                    console.error("Error during checkout notification (non-blocking):", error);
                  } finally {
                    // 2. Redirect to Stripe Payment Link (Always)
                    window.location.href = finalStripeUrl;
                  }
                }}
              >
                <span>
                  {isSoldOut
                    ? (t('acquisition.sold_out') || 'ŒUVRE ÉPUISÉE')
                    : !cgvAccepted
                      ? "ACCEPTEZ LES CGV"
                      : isLoading
                        ? t('acquisition.redirecting')
                        : t('acquisition.proceed_payment')
                  }
                </span>
                {!isLoading && <ArrowRight className="w-5 h-5 ml-1" />}
              </a>

              {/* Manual Transfer Option */}
              <button
                onClick={() => {
                  const finitionMapping: Record<string, string> = {
                    collection: "Tirage Seul",
                    elegance: "Encadré Nielsen",
                    exception: "Caisse Américaine",
                    galerie: "Caisse Américaine"
                  };

                  const params = new URLSearchParams({
                    subject: 'acquisition',
                    photo: photoTitle,
                    format: currentVariant.label,
                    finition: finitionMapping[activeTab] || "Non définie"
                  });

                  navigate(`/contact?${params.toString()}`);
                  onClose();
                }}
                className="w-full mt-3 py-3 text-xs text-white/40 hover:text-white underline decoration-white/20 underline-offset-4 transition-colors uppercase tracking-widest"
              >
                {t('acquisition.bank_transfer')}
              </button>
            </div>

          </div>
        </FadeIn>
      </div>

      <WallPreview
        isOpen={isWallPreviewOpen}
        onClose={() => setIsWallPreviewOpen(false)}
        imageSrc={imageSrc}
        initialSize={currentVariant.label.split(' ')[0]}
        finish={activeTab as any}
      />
    </>
  );
}
