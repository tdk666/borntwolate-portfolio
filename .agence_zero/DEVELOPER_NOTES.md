# Developer Notes & Critical Constraints

## AI & Chatbot (`src/services/gemini.ts`, `netlify/functions/api-chat.ts`)
- **Model Version**: MUST use `gemini-2.0-flash`.
    - ❌ `gemini-1.5-flash` returns `404 Not Found` (API v1beta/generateContent issue).
    - ❌ `gemini-1.5-pro` is too slow for this realtime chat.
    - ✅ `gemini-2.0-flash` is the only stable, working version for this implementation.

## Merchant Feed (`scripts/generate-merchant-feed.js`)
- **Strict ID Logic**: The `id` must be `slug-range-format` (e.g., `vespa-elegance-60x80`).
- **Grouping**: `item_group_id` MUST be the `slug` to group variants effectively in Google Merchant Center.
- **Stock**: Shared stock logic (30 copies total per photo) is handled via `stockService` but the feed declares `in_stock` for all variants as long as total > 0.

## Environment Variables
- `GEMINI_API_KEY`: Required in Netlify.
- `VITE_SUPABASE_URL` & `VITE_SUPABASE_ANON_KEY`: Required for frontend & stock logic.
