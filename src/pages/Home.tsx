import { SEO } from '../components/SEO';
import Hero from '../components/Hero';
import { useTranslation } from 'react-i18next';

const Home = () => {
    const { t } = useTranslation();

    return (
        <>
            <SEO
                title={t('home.seo_title')}
                description={t('home.seo_desc')}
                url="/"
            />
            <Hero />
        </>
    );
};

export default Home;
