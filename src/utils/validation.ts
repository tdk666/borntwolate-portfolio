import { PRICING_CATALOG } from '../data/pricing';

export const validatePricing = () => {
    const errors: string[] = [];

    Object.entries(PRICING_CATALOG).forEach(([key, range]) => {
        if (!range.id) errors.push(`Range ${key} missing ID`);
        if (!range.variants || range.variants.length === 0) errors.push(`Range ${key} has no variants`);

        range.variants.forEach(variant => {
            if (!variant.stripeUrl || !variant.stripeUrl.startsWith('https://')) {
                errors.push(`Variant ${variant.id} in ${key} has invalid Stripe URL: ${variant.stripeUrl}`);
            }
            if (!variant.price || variant.price <= 0) {
                errors.push(`Variant ${variant.id} in ${key} has invalid price: ${variant.price}`);
            }
        });
    });

    if (errors.length > 0) {
        console.error("🚨 PRICING DATA INTEGRITY CHECK FAILED 🚨");
        errors.forEach(err => console.error(`- ${err}`));
        return false;
    } else {
        console.log("%c ✨ Pricing Data Integrity Verified ", "background: #0a0a0a; color: #22c55e; border: 1px solid #22c55e; padding: 2px; border-radius: 4px;");
        return true;
    }
};
