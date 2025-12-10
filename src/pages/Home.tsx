import Hero from '../components/Hero';
import { SEO } from '../components/SEO';

const Home = () => {
    const personSchema = {
        "@context": "https://schema.org",
        "@type": "Person",
        "name": "Théophile Dequecker",
        "jobTitle": "Photographe Argentique Fine Art",
        "url": "https://borntwolate.com",
        "sameAs": ["https://instagram.com/borntwolate"],
        "knowsAbout": ["Film Photography", "Rollei 35", "Fine Art", "Travel Photography"],
        "description": "Photographe argentique basé à Paris, spécialisé dans le grain, la texture et le temps long. Auteur des séries 'Rue des Mauvais Garçons' et 'Retro Mountain'."
    };

    return (
        <>
            <SEO
                title="Home"
                description="Portfolio de Théophile Dequecker. Photographie argentique, grain, et récits de voyage. Paris, Alpes, Montréal."
                schema={personSchema}
            />
            <Hero />
        </>
    );
};

export default Home;
