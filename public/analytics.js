// 1. Initialiser le dataLayer en tout premier
window.dataLayer = window.dataLayer || [];
function gtag() { dataLayer.push(arguments); }

// 2. Google Consent Mode v2 (Default Denied)
gtag('consent', 'default', {
    'ad_storage': 'denied',
    'ad_user_data': 'denied',
    'ad_personalization': 'denied',
    'analytics_storage': 'denied',
    'wait_for_update': 500
});

// 3. Initialiser gtag (sans déclencher de vue de page ici)
gtag('js', new Date());
// ⚠️ On ne met pas gtag('config', 'G-Q3VNSP006H') ici pour éviter les doublons avec React

// 4. Charger le script global Google Analytics 4
const gaScript = document.createElement('script');
gaScript.async = true;
gaScript.src = 'https://www.googletagmanager.com/gtag/js?id=G-Q3VNSP006H';
document.head.appendChild(gaScript);

// 5. Charger Google Tag Manager
(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-KGB4WP3K');