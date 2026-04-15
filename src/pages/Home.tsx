import { SEO } from '../components/SEO';
import Hero from '../components/Hero';
import { useTranslation, Trans } from 'react-i18next';
import { Link } from 'react-router-dom';

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
                title="Théophile Dequecker | Photographe Argentique Paris"
                description={t('home.seo_desc')}
                url="/"
                structuredData={homeSchema}
            />
            <Hero />
            
            <section className="bg-deep-black text-silver py-24 px-6 md:px-12 border-t border-white/5 font-sans">
                <div className="max-w-4xl mx-auto text-center">
                    <h2 className="text-3xl md:text-5xl font-serif italic mb-8 text-off-white">
                        <Trans i18nKey="home.manifest_title" />
                    </h2>
                    <div className="text-lg md:text-xl font-light leading-relaxed mb-6 text-silver/80 text-justify md:text-left drop-cap">
                        <Trans i18nKey="home.manifest_p1" components={{ 1: <strong /> }} />
                    </div>
                    <div className="text-lg md:text-xl font-light leading-relaxed mb-12 text-silver/80 text-justify md:text-left">
                        <Trans i18nKey="home.manifest_p2" />
                    </div>
                    
                    <div className="flex flex-col md:flex-row justify-center items-center gap-4">
                        <Link
                            to="/photographe-argentique"
                            className="btn-ghost"
                        >
                            <span>{t('home.manifest_cta_explore')}</span>
                        </Link>
                        <Link
                            to="/portfolio"
                            className="btn-primary"
                        >
                            <span>{t('home.manifest_cta_buy')}</span>
                        </Link>
                    </div>
                </div>
            </section>
        </>
    );
};

export default Home;
