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

    return (
        <>
            <SEO
                title="Théophile Dequecker | Photographe Argentique & Directeur Artistique"
                description={t('home.seo_desc')}
                url="/"
                schema={personSchema}
            />
            <Hero />
        </>
    );
};

export default Home;
