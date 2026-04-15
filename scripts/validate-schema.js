import fs from 'fs';
import path from 'path';

const distPath = path.resolve('dist/index.html');

console.log('Validating JSON-LD schema in dist/index.html...');

try {
    const html = fs.readFileSync(distPath, 'utf8');
    const scriptRegex = /<script\s+type="application\/ld\+json">([\s\S]*?)<\/script>/gi;
    
    let match;
    let found = false;
    let errors = 0;

    while ((match = scriptRegex.exec(html)) !== null) {
        found = true;
        try {
            JSON.parse(match[1]);
        } catch (e) {
            console.error('❌ SEVERE: Invalid JSON semantic schema detected:', e.message);
            errors++;
        }
    }

    if (!found) {
        console.warn('⚠️ No explicit JSON-LD statically found in dist/index.html. React-Helmet might be injecting it at runtime, but we allow the build to pass.');
    } else if (errors === 0) {
        console.log('✅ SEO Schema payload valid.');
    }

    if (errors > 0) {
        console.error('❌ Build failed due to SEO JSON-LD corruption.');
        process.exit(1);
    }
} catch (e) {
    if (e.code === 'ENOENT') {
        console.error('❌ dist/index.html not found. Ensure this runs after vite build.');
        process.exit(1);
    } else {
        throw e;
    }
}
