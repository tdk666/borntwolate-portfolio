import { useState } from 'react';
import { X, ShieldCheck, ArrowRight, Eye } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { PRICING_CATALOG } from '../data/pricing';
import { FadeIn } from './animations/FadeIn';
import WallPreview from './WallPreview';

interface AcquisitionModalProps {
  isOpen: boolean;
  onClose: () => void;
  photoTitle: string;
  imageSrc?: string;
}

export default function AcquisitionModal({ isOpen, onClose, photoTitle, imageSrc }: AcquisitionModalProps) {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState<keyof typeof PRICING_CATALOG>('collection');
  const [selectedVariantId, setSelectedVariantId] = useState<string>(PRICING_CATALOG['collection'].variants[0].id);
  const [isWallPreviewOpen, setIsWallPreviewOpen] = useState(false);
  const [currency, setCurrency] = useState<'EUR' | 'USD' | 'GBP'>('EUR');
  const [isLoading, setIsLoading] = useState(false);

  if (!isOpen) return null;

  const currentRange = PRICING_CATALOG[activeTab];
  // Protection pour s'assurer que la variante existe dans la gamme sélectionnée
  const currentVariant = currentRange.variants.find(v => v.id === selectedVariantId) || currentRange.variants[0];

  const cleanTitle = encodeURIComponent(photoTitle.trim());
  const finalStripeUrl = `${currentVariant.stripeUrl}?client_reference_id=${cleanTitle}`;

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

  return (
    <>
      <div className="fixed inset-0 z-[60] flex items-center justify-center p-0 md:p-4">
        <div className="absolute inset-0 bg-black/90 backdrop-blur-sm" onClick={onClose} />

        <FadeIn
          className="relative w-full md:max-w-4xl bg-[#0a0a0a] md:border border-white/10 md:rounded-2xl shadow-2xl flex flex-col md:flex-row h-[100dvh] md:h-auto md:max-h-[85vh] overflow-hidden"
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
          <div className="w-full md:w-1/3 bg-white/5 relative flex-shrink-0 min-h-[160px] md:min-h-0 md:h-auto">
            {imageSrc && (
              <div className="absolute inset-0">
                <img
                  src={imageSrc}
                  alt={photoTitle}
                  className="w-full h-full object-cover md:object-contain opacity-60 md:opacity-80"
                />
                {/* Gradient overlay on mobile for text readability if needed */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] to-transparent md:hidden" />
              </div>
            )}

            <div className="absolute bottom-0 left-0 p-6 md:p-8 md:relative md:h-full md:flex md:flex-col md:justify-between z-10">
              <div>
                <div className="text-[10px] uppercase tracking-widest text-white/60 mb-1 md:mb-2">{t('acquisition.selected_work')}</div>
                <h2 className="font-serif text-2xl md:text-3xl text-white leading-tight shadow-black drop-shadow-md md:drop-shadow-none">{photoTitle}</h2>
                <p className="text-xs md:text-sm text-white/80 md:text-white/60 mt-1">
                  {t('acquisition.limited_edition')}
                </p>
              </div>
            </div>
          </div>

          {/* DROITE : Configurateur */}
          <div className="w-full md:w-2/3 flex flex-col h-full bg-[#0a0a0a] relative">

            {/* Scrollable Content Area */}
            <div className="flex-1 overflow-y-auto p-6 md:p-8 overscroll-contain">

              {/* Tabs Finitions */}
              <div className="flex gap-2 mb-6 border-b border-white/10 pb-4 overflow-x-auto no-scrollbar mask-gradient-right">
                {Object.entries(PRICING_CATALOG).map(([key, range]) => {
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
            <div className="border-t border-white/10 p-4 md:p-8 bg-[#0a0a0a]/95 backdrop-blur-sm z-20 pb-safe md:pb-8">

              <div className="flex justify-between items-center mb-4">
                <span className="text-white/50 text-xs hidden md:inline">{translatedCurrentRange.shipping || currentRange.shipping_text}</span>

                <div className="flex items-center gap-4 w-full md:w-auto justify-between md:justify-end">
                  {/* Mobile Shipping Info (Compact) */}
                  <div className="flex gap-2 items-center flex-1 md:hidden">
                    <ShieldCheck className="w-4 h-4 text-white/40" />
                    <span className="text-[10px] text-white/40 truncate">{t('acquisition.secure_payment')}</span>
                  </div>

                  {/* Currency Toggles */}
                  <div className="flex gap-1 bg-white/5 rounded-lg p-1 h-fit">
                    {(['EUR', 'USD', 'GBP'] as const).map((curr) => (
                      <button
                        key={curr}
                        onClick={() => setCurrency(curr)}
                        className={`px-2 py-1 rounded text-[10px] font-medium transition-colors ${currency === curr
                          ? 'bg-white text-black'
                          : 'text-white/40 hover:text-white'
                          }`}
                      >
                        {curr === 'EUR' ? '€' : curr === 'USD' ? '$' : '£'}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <a
                href={finalStripeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={`w-full bg-white text-black py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-2 hover:bg-gray-200 transition-colors shadow-lg shadow-white/5 active:scale-[0.98] ${isLoading ? 'opacity-70 cursor-wait' : ''}`}
                onClick={(e) => {
                  if (isLoading) e.preventDefault();
                  else {
                    // Track Initiate Checkout
                    console.log('InitiateCheckout', {
                      variant: currentVariant.id,
                      price: currentVariant.price,
                      currency: 'EUR'
                    });
                    setIsLoading(true);
                    setTimeout(() => setIsLoading(false), 2000);
                  }
                }}
              >
                <span>{isLoading ? t('acquisition.redirecting') : t('acquisition.proceed_payment')}</span>
                {!isLoading && <span className="text-base font-normal opacity-80 ml-1"> | {formatPrice(currentVariant.price)}</span>}
                {!isLoading && <ArrowRight className="w-5 h-5 ml-1" />}
              </a>
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
