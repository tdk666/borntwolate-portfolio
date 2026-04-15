// --- GOOGLE TRACKING INFRASTRUCTURE ---
// Source: setup in analytics.js to prioritize LCP (deferred loading)

window.dataLayer = window.dataLayer || [];
function gtag() { dataLayer.push(arguments); }

// 1. Google Consent Mode v2 (Default Denied)
gtag('consent', 'default', {
    'ad_storage': 'denied',
    'ad_user_data': 'denied',
    'ad_personalization': 'denied',
    'analytics_storage': 'denied',
    'wait_for_update': 500
});

// 2. Initialize gtag
gtag('js', new Date());

// NOTE: We do NOT call gtag('config', 'G-Q3VNSP006H') here.
// In a React SPA, the config (which triggers a page_view) is handled 
// by src/components/GoogleAnalytics.tsx to capture correct route paths.

// 3. Load GA4 (gtag.js)
const gaScript = document.createElement('script');
gaScript.async = true;
gaScript.src = 'https://www.googletagmanager.com/gtag/js?id=G-Q3VNSP006H';
document.head.appendChild(gaScript);

// 4. Load Google Tag Manager
(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-KGB4WP3K');