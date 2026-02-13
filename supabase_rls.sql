-- ==============================================================================
-- 1. INITIALISATION SÉCURISÉE (Pas de suppression destructive)
-- ==============================================================================
-- ⚠️ ATTENTION : La table actuelle n'a pas la bonne structure (pas de colonne 'slug').
-- On la supprime pour repartir propre. C'est nécessaire ici.
-- SAFETY: Commented out after successful migration.
-- DROP TABLE IF EXISTS public.art_stocks CASCADE;

-- ==============================================================================
-- 2. TABLE DES STOCKS (Structure optimisée)
-- ==============================================================================
CREATE TABLE IF NOT EXISTS public.art_stocks (
  slug text PRIMARY KEY,          -- ex: "crete-verte"
  title text NOT NULL,            -- ex: "Crête Verte"
  series text NOT NULL,           -- ex: "Polish Hike"
  release_date date,              -- Pour le tri chronologique
  sold_count integer DEFAULT 0,   -- Ventes
  max_limit integer DEFAULT 30    -- Limite (30 exemplaires)
);

-- ==============================================================================
-- 3. SÉCURITÉ (RLS) - INDISPENSABLE
-- ==============================================================================
ALTER TABLE public.art_stocks ENABLE ROW LEVEL SECURITY;

-- Politiques (On supprime d'abord pour éviter les erreurs "already exists")
DROP POLICY IF EXISTS "Public Read Stocks" ON public.art_stocks;
CREATE POLICY "Public Read Stocks"
ON public.art_stocks FOR SELECT
TO anon, authenticated
USING (true);

DROP POLICY IF EXISTS "Service Role Manage Stocks" ON public.art_stocks;
CREATE POLICY "Service Role Manage Stocks"
ON public.art_stocks FOR ALL
TO service_role
USING (true)
WITH CHECK (true);

-- ==============================================================================
-- 4. INSERTION DU CATALOGUE (Préserve les données existantes)
-- ==============================================================================
-- ON CONFLICT (slug) DO NOTHING: Ne touche pas si la photo existe déjà (et garde ses ventes !)
INSERT INTO public.art_stocks (slug, title, series, release_date, sold_count) VALUES

-- 1. RUE DES MAUVAIS GARÇONS (Avril 2023)
('l-attente', 'L''Attente', 'Rue des Mauvais Garçons', '2023-04-01', 0),
('lecture-urbaine', 'Lecture Urbaine', 'Rue des Mauvais Garçons', '2023-04-01', 0),
('l-heure-bleue', 'L''Heure Bleue', 'Rue des Mauvais Garçons', '2023-04-01', 0),
('astor-sur-seine', 'Astor sur Seine', 'Rue des Mauvais Garçons', '2023-04-01', 0),
('regard-rive-droite', 'Regard Rive Droite', 'Rue des Mauvais Garçons', '2023-04-01', 0),
('le-rendez-vous', 'Le Rendez-vous', 'Rue des Mauvais Garçons', '2023-04-01', 0),

-- 2. CANADIAN EVASION (Août 2023)
('bivouac', 'Bivouac', 'Canadian Evasion', '2023-08-01', 0),
('route-infinie', 'Route Infinie', 'Canadian Evasion', '2023-08-01', 0),
('miroir-boreal', 'Miroir Boréal', 'Canadian Evasion', '2023-08-01', 0),
('contemplation', 'Contemplation', 'Canadian Evasion', '2023-08-01', 0),
('le-saint-laurent', 'Le Saint-Laurent', 'Canadian Evasion', '2023-08-01', 0),
('face-au-large', 'Face au Large', 'Canadian Evasion', '2023-08-01', 0),

-- 3. PSYCHADELIC MTL (Octobre 2023)
('monde-inverse', 'Monde Inversé', 'Psychadelic MTL', '2023-10-01', 0),
('oeil-urbain', 'Oeil Urbain', 'Psychadelic MTL', '2023-10-01', 0),
('mutation-signaletique', 'Mutation Signalétique', 'Psychadelic MTL', '2023-10-01', 0),
('sharp-contrast', 'Sharp Contrast', 'Psychadelic MTL', '2023-10-01', 0),
('forever-in-the-air', 'Forever in the Air', 'Psychadelic MTL', '2023-10-01', 0),
('duo-on-cliff', 'Duo on Cliff', 'Psychadelic MTL', '2023-10-01', 0),

-- 4. A WINTER IN THE FRUIT (Décembre 2023)
('king-of-midtown', 'King of Midtown', 'A Winter in the Fruit', '2023-12-01', 0),
('quiet-central', 'Quiet Central', 'A Winter in the Fruit', '2023-12-01', 0),
('midnight-city', 'Midnight City', 'A Winter in the Fruit', '2023-12-01', 0),
('colors-of-december', 'Colors of December', 'A Winter in the Fruit', '2023-12-01', 0),
('fawn-in-town', 'Fawn in Town', 'A Winter in the Fruit', '2023-12-01', 0),
('high-line-view', 'High Line View', 'A Winter in the Fruit', '2023-12-01', 0),
('underground', 'Underground', 'A Winter in the Fruit', '2023-12-01', 0),

-- 5. RETRO MOUNTAIN (Janvier 2024)
('geometrie-naturelle', 'Géométrie Naturelle', 'Retro Mountain', '2024-01-01', 0),
('lawrence-d-hiver', 'Lawrence d''Hiver', 'Retro Mountain', '2024-01-01', 0),
('l-observatoire', 'L''Observatoire', 'Retro Mountain', '2024-01-01', 0),
('le-rituel', 'Le Rituel', 'Retro Mountain', '2024-01-01', 0),
('mise-en-abyme', 'Mise en Abyme', 'Retro Mountain', '2024-01-01', 0),
('le-gardien-des-cimes', 'Le Gardien des Cimes', 'Retro Mountain', '2024-01-01', 0),

-- 6. PUGLIA FAMIGLIA (Août 2024)
('liberta-bianca', 'Libertà Bianca', 'Puglia Famiglia', '2024-08-01', 0),
('l-ombrello', 'L''Ombrello', 'Puglia Famiglia', '2024-08-01', 0),
('le-due-sorelle', 'Le Due Sorelle', 'Puglia Famiglia', '2024-08-01', 0),
('l-attesa', 'L''Attesa', 'Puglia Famiglia', '2024-08-01', 0),
('il-salto', 'Il Salto', 'Puglia Famiglia', '2024-08-01', 0),
('problema-della-benzina', 'Problema della Benzina', 'Puglia Famiglia', '2024-08-01', 0),

-- 7. WHITE MOUNTS (Janvier 2025)
('sucre-glace', 'Sucre Glace', 'White Mounts', '2025-01-01', 0),
('l-insolence', 'L''Insolence', 'White Mounts', '2025-01-01', 0),
('l-ascension', 'L''Ascension', 'White Mounts', '2025-01-01', 0),
('mont-caramel', 'Mont Caramel', 'White Mounts', '2025-01-01', 0),
('cimes-et-brume', 'Cimes et Brume', 'White Mounts', '2025-01-01', 0),
('la-muraille', 'La Muraille', 'White Mounts', '2025-01-01', 0),
('l-apparition', 'L''Apparition', 'White Mounts', '2025-01-01', 0),

-- 8. POLISH HIKE (Août 2025)
('crete-verte', 'Crête Verte', 'Polish Hike', '2025-08-01', 0),
('equilibre-mineral', 'Équilibre Minéral', 'Polish Hike', '2025-08-01', 0),
('miroir-jumeau', 'Miroir Jumeau', 'Polish Hike', '2025-08-01', 0),
('la-vallee', 'La Vallée', 'Polish Hike', '2025-08-01', 0),
('cathedrale-verte', 'Cathédrale Verte', 'Polish Hike', '2025-08-01', 0),
('l-emeraude', 'L''Émeraude', 'Polish Hike', '2025-08-01', 0)

ON CONFLICT (slug) DO NOTHING;

-- ==============================================================================
-- 4b. TABLE DES COMMANDES (Pour le Générateur de Certificats et Webhook)
-- ==============================================================================
CREATE TABLE IF NOT EXISTS public.orders (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at timestamptz DEFAULT now(),
  stripe_session_id text UNIQUE NOT NULL,
  customer_email text,
  amount_total integer,
  currency text default 'eur',
  status text,
  metadata jsonb
);

-- RLS: Orders
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;

-- ADMIN ONLY: Lecture seule pour l'admin authentifié
DROP POLICY IF EXISTS "Admin Read Orders" ON public.orders;
CREATE POLICY "Admin Read Orders"
ON public.orders FOR SELECT
TO authenticated
USING (true);

-- SERVICE ROLE ONLY: Insertion par le Webhook (Stripe)
DROP POLICY IF EXISTS "Service Role Insert Orders" ON public.orders;
CREATE POLICY "Service Role Insert Orders"
ON public.orders FOR INSERT
TO service_role
WITH CHECK (true);

-- SERVICE ROLE ONLY: Update par le Webhook (si besoin)
DROP POLICY IF EXISTS "Service Role Update Orders" ON public.orders;
CREATE POLICY "Service Role Update Orders"
ON public.orders FOR UPDATE
TO service_role
USING (true)
WITH CHECK (true);


-- ==============================================================================
-- 5. FONCTION DE STOCK (Critique pour Stripe)
-- ==============================================================================
CREATE OR REPLACE FUNCTION public.increment_stock(stock_slug text)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public, pg_catalog
AS $$
BEGIN
  UPDATE public.art_stocks
  SET sold_count = sold_count + 1
  WHERE slug = stock_slug;
END;
$$;