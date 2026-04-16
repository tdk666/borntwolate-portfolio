# borntwolate.com — Contexte Projet Claude Code

Portfolio photo argentique de Théophile Dequecker + boutique Fine Art tirages numérotés.
URL : https://borntwolate.com

## Identifiants techniques

- **GA4** : `G-Q3VNSP006H`
- **GTM** : `GTM-KGB4WP3K` — GA4 chargé VIA GTM uniquement (pas de `gtag.js` direct)
- **Supabase** : table `art_stocks` (colonnes : `slug`, `sold_count`, `max_limit=30`)
- **Gemini** : `gemini-2.5-flash` — UNIQUEMENT via `/.netlify/functions/api-chat` (jamais côté client)
- **Stripe** : 3 gammes (collection / elegance / exception), liens `buy.stripe.com`

## Image LCP hero

`/images/winter-in-the-fruit/empire-state.avif` — préchargée dans `index.html`.
Ne pas modifier ce chemin sans mettre à jour `index.html` en même temps.

## Architecture analytics (3 couches — ne pas modifier l'ordre)

1. `index.html` (inline) → `consent.default` denied + proxy dataLayer
2. `public/analytics.js` (différé 2s) → charge GTM uniquement (pas GA4 direct)
3. `src/components/CookieConsent.tsx` → `consent.update` pour nouveaux ET visiteurs de retour

## Séries photos actives

polish-hike, white-mounts, canadian-evasion, mauvais-garcons,
winter-in-the-fruit, psychadelic-mtl, puglia, retro-mountain

## Tables Supabase

- `art_stocks` — stock par photo (30 ex. max partagés toutes finitions)
- `orders` — commandes Stripe (idempotence sur `stripe_session_id`)
- `owners_legacy` — codes secrets acheteurs pour Legacy Map
- `subscribers` — newsletter / Private Drops

## Fonctionnalités critiques à ne pas casser

- Chatbot "Le Curator" (`netlify/functions/api-chat.ts`)
- Webhook Stripe (`netlify/functions/stripe-webhook.ts`) — idempotent
- Legacy Map (`/legacy`) + générateur de certificats (`/admin/certificate`)
- Stock temps réel (cache localStorage 5min)

## Contraintes techniques détaillées

Voir `AGENCE_ZERO/_docs/DEVELOPER_NOTES.md`
