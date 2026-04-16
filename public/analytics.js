// --- GOOGLE TRACKING INFRASTRUCTURE ---
// Source: setup in analytics.js to prioritize LCP (deferred loading)

window.dataLayer = window.dataLayer || [];
function gtag() { dataLayer.push(arguments); }

// NOTE: Consent Mode v2 default is already set in index.html (inline, executes first).
// DO NOT redeclare gtag('consent', 'default') here — it would overwrite any consent
// already restored by CookieConsent.tsx for returning users who accepted cookies.

// 1. Initialize gtag
gtag('js', new Date());

// NOTE: GA4 is loaded by GTM (tag "Balise Google GA4" in container GTM-KGB4WP3K).
// Do NOT load gtag.js directly here — it would create double tracking.
// Route-change page_views are handled by src/components/GoogleAnalytics.tsx
// via gtag('config', ...) which pushes to the dataLayer that GTM reads.

// Load Google Tag Manager
(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-KGB4WP3K');