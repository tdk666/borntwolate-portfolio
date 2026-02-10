import { SEO } from '../components/SEO';
import Hero from '../components/Hero';
import { useTranslation } from 'react-i18next';

const Home = () => {
    const { t } = useTranslation();

    const personSchema = {
        "@type": "Person",
        "name": "Théophile Dequecker",
        "jobTitle": "Photographe Argentique & Directeur Artistique",
        "url": "https://borntwolate.com",
        "sameAs": [
            "https://instagram.com/borntwolate",
            "https://www.linkedin.com/in/theophiledequecker/"
        ]
    };

    const organizationSchema = {
        "@type": "Organization",
        "name": "Born Too Late",
        "url": "https://borntwolate.com",
        "logo": "https://borntwolate.com/logo.png", // Assuming logo exists or use text
        "sameAs": [
            "https://instagram.com/borntwolate"
        ]
    };

    const homeSchema = {
        "@graph": [personSchema, organizationSchema]
    };

    return (
        <>
            <SEO
                title="Théophile Dequecker | Photographe Argentique & Directeur Artistique"
                description={t('home.seo_desc')}
                url="/"
                structuredData={homeSchema}
            />
            <Hero />
        </>
    );
};

export default Home;
