import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

i18n
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
        fallbackLng: 'fr',
        interpolation: {
            escapeValue: false,
        },
        resources: {
            fr: {
                translation: {
                    nav: {
                        portfolio: 'Portfolio',
                        series: 'Séries',
                        about: 'À Propos',
                        contact: 'Contact',
                        switch: 'EN'
                    },
                    about: {
                        title: 'Chronologie',
                        tech: 'Arsenal Technique',
                        cameras: 'Boîtiers',
                        lenses: 'Optiques',
                        color: 'Films Couleur',
                        bw: 'Films N&B',
                        lab: 'Laboratoire'
                    },
                    series: {
                        prev: 'Précédent',
                        next: 'Suivant'
                    },
                    contact: {
                        title: 'Contact',
                        subtitle: 'Disponible pour commandes et collaborations.',
                        name: 'Nom',
                        email: 'Email',
                        message: 'Message',
                        placeholderName: 'Votre Nom',
                        placeholderEmail: 'votre@email.com',
                        placeholderMessage: 'Parlez-moi de votre projet...',
                        send: 'Envoyer'
                    },
                    home: {
                        subtitle: 'Photographie Argentique',
                        loading: 'Développement...'
                    },
                    categories: {
                        all: 'Tout',
                        urban: 'Urbain',
                        nature: 'Nature',
                        portrait: 'Portrait',
                        bnw: 'Noir & Blanc',
                        lifestyle: 'Lifestyle'
                    }
                },
            },
            en: {
                translation: {
                    nav: {
                        portfolio: 'Portfolio',
                        series: 'Series',
                        about: 'About',
                        contact: 'Contact',
                        switch: 'FR'
                    },
                    about: {
                        title: 'Timeline',
                        tech: 'Technical Arsenal',
                        cameras: 'Cameras',
                        lenses: 'Lenses',
                        color: 'Color Films',
                        bw: 'B&W Films',
                        lab: 'Lab'
                    },
                    series: {
                        prev: 'Previous',
                        next: 'Next'
                    },
                    contact: {
                        title: 'Contact',
                        subtitle: 'Available for commissions and collaborations.',
                        name: 'Name',
                        email: 'Email',
                        message: 'Message',
                        placeholderName: 'Your Name',
                        placeholderEmail: 'your@email.com',
                        placeholderMessage: 'Tell me about your project...',
                        send: 'Send Message'
                    },
                    home: {
                        subtitle: 'Analog Photography',
                        loading: 'Developing...'
                    },
                    categories: {
                        all: 'All',
                        urban: 'Urban',
                        nature: 'Nature',
                        portrait: 'Portrait',
                        bnw: 'Black & White',
                        lifestyle: 'Lifestyle'
                    }
                },
            },
        },
    });

export default i18n;
