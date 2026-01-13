import Hero from '../components/Hero';
import { SEO } from '../components/SEO';

const Home = () => {


    return (
        <>
            <SEO
                title="Photographe Argentique & Portfolio Voyage" // Titre fort pour Google
                description="Bienvenue sur Born Too Late. Le portfolio de photographie argentique de Théophile Dequecker. Une exploration esthétique du monde en 35mm, de Paris à Montréal."
                url="/"
            />
            <Hero />
        </>
    );
};

export default Home;
