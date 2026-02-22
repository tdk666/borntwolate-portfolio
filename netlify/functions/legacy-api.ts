import { Handler } from '@netlify/functions';
import { createClient } from '@supabase/supabase-js';

// Initialize Supabase (Admin Context for writing/updating)
const supabaseUrl = process.env.VITE_SUPABASE_URL || '';
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || '';
let supabase: any = null;

if (supabaseUrl && supabaseServiceKey) {
    supabase = createClient(supabaseUrl, supabaseServiceKey);
}

export const handler: Handler = async (event) => {
    const headers = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS'
    };

    if (event.httpMethod === 'OPTIONS') {
        return { statusCode: 200, headers, body: '' };
    }

    try {
        if (!supabase) {
            return {
                statusCode: 500,
                headers,
                body: JSON.stringify({ error: "Serveur local non configuré. La variable SUPABASE_SERVICE_ROLE_KEY est manquante." })
            };
        }

        // --- GET /map : Public Data ---
        if (event.httpMethod === 'GET') {
            const { data, error } = await supabase
                .from('owners_legacy')
                .select('id, owner_name, owner_city, message, lat, lng, art_slug, created_at')
                .eq('is_claimed', true);

            if (error) throw error;

            return {
                statusCode: 200,
                headers,
                body: JSON.stringify(data),
            };
        }

        // --- POST /verify-admin : Check master code ---
        if (event.httpMethod === 'POST' && event.path.endsWith('/verify-admin')) {
            const body = JSON.parse(event.body || '{}');
            const { code } = body;
            const adminCode = process.env.ADMIN_LEGACY_CODE || 'THEOPHILE-LEGACY'; // fallback for local dev if forgotten

            if (code === adminCode) {
                return { statusCode: 200, headers, body: JSON.stringify({ role: 'admin' }) };
            }
            return { statusCode: 403, headers, body: JSON.stringify({ error: 'Code invalide.' }) };
        }

        // --- POST /claim : Claim a spot ---
        if (event.httpMethod === 'POST') {
            const body = JSON.parse(event.body || '{}');
            const { code, name, city, message, check_only } = body;

            if (!code) {
                return { statusCode: 400, headers, body: JSON.stringify({ error: 'Code manquant' }) };
            }

            // 1. Verify Code
            const { data: record, error: fetchError } = await supabase
                .from('owners_legacy')
                .select('*')
                .eq('code_secret', code)
                .single();

            if (fetchError || !record) {
                return {
                    statusCode: 404, // Not Found implies Invalid Code
                    headers,
                    body: JSON.stringify({ error: 'Code invalide.' }),
                };
            }

            // 1b. Check Only Mode (For Auth Step)
            if (check_only) {
                if (record.is_claimed) {
                    return {
                        statusCode: 200,
                        headers,
                        body: JSON.stringify({
                            alreadyClaimed: true,
                            owner_name: record.owner_name,
                            owner_city: record.owner_city
                        }),
                    };
                } else {
                    return { statusCode: 200, headers, body: JSON.stringify({ valid: true, alreadyClaimed: false }) };
                }
            }

            // 1c. Claim Validation
            if (!name || !city || !message) {
                return { statusCode: 400, headers, body: JSON.stringify({ error: 'Champs manquants' }) };
            }

            if (record.is_claimed) {
                return {
                    statusCode: 200, // OK
                    headers,
                    body: JSON.stringify({
                        alreadyClaimed: true,
                        owner_name: record.owner_name,
                        owner_city: record.owner_city,
                        message: record.message,
                        lat: record.lat,
                        lng: record.lng,
                        art_slug: record.art_slug
                    }),
                };
            }

            // 2. Geocoding (Simple Nominatim Fetch)
            let lat = 0;
            let lng = 0;
            try {
                const geoUrl = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(city)}&format=json&limit=1`;
                const geoRes = await fetch(geoUrl, {
                    headers: { 'User-Agent': 'BornTwoLate-LegacyMap/1.0 (contact@borntwolate.com)' }
                });
                const geoData = await geoRes.json() as any[];

                if (geoData && geoData.length > 0) {
                    lat = parseFloat(geoData[0].lat);
                    lng = parseFloat(geoData[0].lon);
                } else {
                    return {
                        statusCode: 400,
                        headers,
                        body: JSON.stringify({ error: 'Ville introuvable, veuillez préciser (ex: Paris, France).' })
                    };
                }
            } catch (e) {
                console.error('Geocoding error:', e);
                return {
                    statusCode: 500,
                    headers,
                    body: JSON.stringify({ error: 'Service de géolocalisation temporairement indisponible.' })
                };
            }

            // 3. Update Record
            const { error: updateError } = await supabase
                .from('owners_legacy')
                .update({
                    owner_name: name,
                    owner_city: city,
                    message: message,
                    is_claimed: true,
                    lat: lat,
                    lng: lng
                })
                .eq('id', record.id);

            if (updateError) throw updateError;

            return {
                statusCode: 200,
                headers,
                body: JSON.stringify({ success: true, lat, lng }),
            };
        }

        // --- DELETE /claim : Reset a spot (Admin Only) ---
        if (event.httpMethod === 'DELETE') {
            const body = JSON.parse(event.body || '{}');
            const { admin_code, id } = body;

            // Admin verification
            const adminCodeEnv = process.env.ADMIN_LEGACY_CODE || 'THEOPHILE-LEGACY';
            if (admin_code !== adminCodeEnv) {
                return { statusCode: 403, headers, body: JSON.stringify({ error: 'Accès non autorisé' }) };
            }

            if (!id) {
                return { statusCode: 400, headers, body: JSON.stringify({ error: 'ID manquant' }) };
            }

            // Delete the record completely so the secret code can no longer be used.
            const { error: deleteError } = await supabase
                .from('owners_legacy')
                .delete()
                .eq('id', id);

            if (deleteError) throw deleteError;

            return {
                statusCode: 200,
                headers,
                body: JSON.stringify({ success: true, message: 'Gravure effacée avec succès' }),
            };
        }

        return { statusCode: 405, headers, body: 'Method Not Allowed' };

    } catch (error: any) {
        console.error('Legacy API Error:', error);
        return {
            statusCode: 500,
            headers,
            body: JSON.stringify({ error: error.message }),
        };
    }
};
