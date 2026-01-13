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
                    },
                    legals: {
                        title: "Mentions Légales & CGV",
                        update: "Dernière mise à jour : Janvier 2026",
                        section1: {
                            title: "1. Mentions Légales",
                            editor: "Éditeur du Site",
                            host: "Hébergeur",
                            status: "Statut : Artiste-Auteur / Particulier (SIRET en cours d'attribution)"
                        },
                        section2: {
                            title: "2. Propriété Intellectuelle",
                            text: "L'ensemble des contenus de ce site (structure, design, textes, et particulièrement les <strong>photographies</strong>) est protégé par le Code de la Propriété Intellectuelle. Les œuvres photographiques présentées sont la propriété exclusive de Théophile Dequecker.<br/><br/>Toute reproduction, représentation, modification, publication, adaptation de tout ou partie des éléments du site, quel que soit le moyen ou le procédé utilisé, est <strong>strictement interdite</strong> sans l'autorisation écrite préalable de l'auteur."
                        },
                        section3: {
                            title: "3. Politique de Confidentialité (RGPD)",
                            intro: "Conformément au Règlement Général sur la Protection des Données (RGPD), nous vous informons sur l'usage de vos données :",
                            responsible: "<strong>Responsable du traitement :</strong> Théophile Dequecker.",
                            data: "<strong>Données collectées :</strong> Nom, email, adresse (si commande), contenu des messages.",
                            purpose: "<strong>Finalité :</strong> Gestion des demandes de contact, expédition des commandes, discussion via le Chatbot.",
                            subcontractors: {
                                title: "<strong>Sous-traitants :</strong>",
                                netlify: "<em>Netlify</em> (Hébergement)",
                                emailjs: "<em>EmailJS</em> (Envoi d'emails transactionnels)",
                                gemini: "<em>Google Gemini AI</em> (Traitement du Chatbot). <strong>Attention :</strong> Les échanges avec le \"Labo AI\" sont traités par Google. Ne partagez pas de données sensibles."
                            },
                            rights: "<strong>Vos droits :</strong> Droit d'accès, rectification, effacement. Contact : via l'email de l'éditeur."
                        },
                        section4: {
                            title: "4. Conditions Générales de Vente (CGV)",
                            subtitle: "Applicables aux ventes de tirages d'art.",
                            article1: {
                                title: "4.1 Commande",
                                text: "Les produits sont des œuvres photographiques originales. La vente se fait \"sur devis\". Le contrat est conclu à l'acceptation du devis et réception du paiement."
                            },
                            article2: {
                                title: "4.2 Droit de Rétractation",
                                text: "Conformément à l'article L221-18 du Code de la consommation, vous disposez de <strong>14 jours</strong> à réception pour exercer votre droit de rétractation (frais de retour à votre charge), sauf pour les œuvres nettement personnalisées."
                            }
                        }
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
                    },
                    legals: {
                        title: "Legal Notice & Terms",
                        update: "Last updated: January 2026",
                        section1: {
                            title: "1. Legal Notice",
                            editor: "Site Editor",
                            host: "Host",
                            status: "Status: Artist-Author / Individual (SIRET in progress)"
                        },
                        section2: {
                            title: "2. Intellectual Property",
                            text: "All content on this site (structure, design, texts, and particularly <strong>photographs</strong>) is protected by Intellectual Property laws. The photographic works presented are the exclusive property of Théophile Dequecker.<br/><br/>Any reproduction, representation, modification, publication, adaptation of all or part of the site elements, regardless of the means or process used, is <strong>strictly prohibited</strong> without prior written permission from the author."
                        },
                        section3: {
                            title: "3. Privacy Policy (GDPR)",
                            intro: "In accordance with the General Data Protection Regulation (GDPR), we inform you about the use of your data:",
                            responsible: "<strong>Data Controller:</strong> Théophile Dequecker.",
                            data: "<strong>Collected Data:</strong> Name, email, address (if ordering), message content.",
                            purpose: "<strong>Purpose:</strong> Management of contact requests, shipment of orders, discussion via Chatbot.",
                            subcontractors: {
                                title: "<strong>Subcontractors:</strong>",
                                netlify: "<em>Netlify</em> (Hosting)",
                                emailjs: "<em>EmailJS</em> (Transactional emails)",
                                gemini: "<em>Google Gemini AI</em> (Chatbot processing). <strong>Caution:</strong> Exchanges with 'Labo AI' are processed by Google. Do not share sensitive data."
                            },
                            rights: "<strong>Your Rights:</strong> Right of access, rectification, erasure. Contact: via the editor's email."
                        },
                        section4: {
                            title: "4. Terms of Sale (CGV)",
                            subtitle: "Applicable to art print sales.",
                            article1: {
                                title: "4.1 Order",
                                text: "Products are original photographic works. Sales are 'by quote'. The contract is concluded upon acceptance of the quote and receipt of payment."
                            },
                            article2: {
                                title: "4.2 Right of Withdrawal",
                                text: "In accordance with Article L221-18 of the Consumer Code, you have <strong>14 days</strong> upon receipt to exercise your right of withdrawal (return costs at your expense), except for clearly personalized works."
                            }
                        }
                    }
                },
            },
        },
    });


export default i18n;
