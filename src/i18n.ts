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
                    series_detail: {
                        series_no: 'Série N°'
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
                        send: 'Envoyer',
                        developing: 'Développement en cours...',
                        sent_workshop: 'Demande transmise à l\'atelier.',
                        fixed_bath: 'Fixé dans le bain.',
                        validate_request: 'Valider ma demande (Sans engagement)',
                        acquisition_body_selection: "Bonjour Théophile,\n\nJe souhaite acquérir les tirages sélectionnés ci-dessus.\n\nJ'aimerais en savoir plus sur les formats et les tarifs.\n\nCordialement,",
                        acquisition_body_single: "Bonjour Théophile,\n\nJe souhaite acquérir un tirage photo.\n\nJ'aimerais en savoir plus sur les formats et les tarifs.\n\nCordialement,",
                        add_selection: 'Ajouter une œuvre à votre sélection',
                        select_work: 'Sélectionner une œuvre',
                        add_another: 'Ajouter une autre œuvre...',
                        your_selection: 'Votre sélection',
                        no_selection: 'Aucune œuvre sélectionnée pour le moment.',
                        remove_selection: 'Retirer de la sélection',
                        consent_text: "En soumettant ce formulaire, j'accepte que mes informations soient utilisées pour traiter ma demande.",
                        consent_link: "Voir Politique de Confidentialité",
                        success_message: "Merci ! Votre sélection pour <1>{{titles}}</1> a été transmise. Je reviens vers vous sous 24h pour finaliser les détails.",
                        payment_info: "Paiement et expédition finalisés par retour de mail.",
                        error_message: "Erreur de chimie. Réessayez.",
                        back_gallery: "← Retourner à la galerie",
                        available_prints: "Tirages d'art disponibles sur demande. Éditions limitées."
                    },
                    lightbox: {
                        collect_button: "Collectionner ce tirage"
                    },
                    home: {
                        seo_title: 'Photographe Argentique & Portfolio Voyage',
                        seo_desc: 'Bienvenue sur Born Too Late. Le portfolio de photographie argentique de Théophile Dequecker. Une exploration esthétique du monde en 35mm, de Paris à Montréal.',
                        subtitle: 'Photographie Argentique',
                        loading: 'Développement...'
                    },
                    portfolio: {
                        seo_title: 'Portfolio',
                        seo_desc: 'Galerie complète des œuvres de Théophile Dequecker.',
                        filter_aria: 'Filtrer par {{category}}'
                    },
                    categories: {
                        all: 'Tout',
                        urban: 'Urbain',
                        nature: 'Nature',
                        portrait: 'Portrait',
                        bnw: 'Noir & Blanc',
                        lifestyle: 'Lifestyle'
                    },
                    not_found: {
                        seo_title: '404 - Exposition Ratée',
                        seo_desc: 'Cette image a été perdue au développement. Le négatif est vierge.',
                        title: '404',
                        subtitle: 'Exposition Ratée',
                        text: 'Cette image a été perdue au développement. <br /> Le négatif est vierge.',
                        back: 'Retour à la planche contact'
                    },
                    footer: {
                        legals: 'Mentions Légales',
                        instagram_aria: 'Suivez-moi sur Instagram',
                        rights: 'Born Too Late'
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
                    },
                    chatbot: {
                        open_label: "Ouvrir le Labo",
                        title: "Le Labo AI",
                        welcome_title: "Bienvenue dans le Labo.",
                        welcome_text: "Ce chatbot utilise une Intelligence Artificielle (Google Gemini). Vos échanges sont traités informatiquement. Ne partagez pas de données sensibles. En continuant, vous acceptez notre politique de confidentialité.",
                        input_placeholder: "Écrivez votre message...",
                        developing: "Développement...",
                        rate_limit: "⏳ Oups ! Vous parlez trop vite pour le Labo. Veuillez attendre une minute.",
                        err_technical: "Le processus de développement a échoué. Essayez plus tard.",
                        err_api_missing: "Configuration manquante : Clé API (VITE_GEMINI_API_KEY) introuvable dans le laboratoire.",
                        err_quota: "Le Labo est surchargé (Quota dépassé). Veuillez attendre quelques instants avant de reposer votre question.",
                        order_success: "✅ Commande transmise avec succès à l'atelier. Vous allez recevoir un email de confirmation.",
                        order_error: "⚠️ Erreur technique : La commande a été notée par l'IA mais l'email de confirmation n'a pas pu partir. Veuillez nous contacter via la page Contact."
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
                    series_detail: {
                        series_no: 'Series No.'
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
                        send: 'Send Message',
                        developing: 'Developing...',
                        sent_workshop: 'Request sent to the workshop.',
                        fixed_bath: 'Fixed in the bath.',
                        validate_request: 'Validate my request (No commitment)',
                        acquisition_body_selection: "Hello Théophile,\n\nI would like to acquire the selected prints above.\n\nI would like to know more about formats and pricing.\n\nBest regards,",
                        acquisition_body_single: "Hello Théophile,\n\nI would like to acquire a photo print.\n\nI would like to know more about formats and pricing.\n\nBest regards,",
                        add_selection: 'Add a work to your selection',
                        select_work: 'Select a work',
                        add_another: 'Add another work...',
                        your_selection: 'Your selection',
                        no_selection: 'No work selected yet.',
                        remove_selection: 'Remove from selection',
                        consent_text: "By submitting this form, I accept that my information is used to process my request.",
                        consent_link: "See Privacy Policy",
                        success_message: "Thank you! Your selection for <1>{{titles}}</1> has been sent. I will get back to you within 24h to finalize details.",
                        payment_info: "Payment and shipping finalized by return email.",
                        error_message: "Chemistry error. Please try again.",
                        back_gallery: "← Back to Gallery",
                        available_prints: "Fine Art Prints available upon request. Limited Editions."
                    },
                    lightbox: {
                        collect_button: "Collect this print"
                    },
                    home: {
                        seo_title: 'Analog Photographer & Travel Portfolio',
                        seo_desc: 'Welcome to Born Too Late. The analog photography portfolio of Théophile Dequecker. An aesthetic exploration of the world in 35mm, from Paris to Montreal.',
                        subtitle: 'Analog Photography',
                        loading: 'Developing...'
                    },
                    portfolio: {
                        seo_title: 'Portfolio',
                        seo_desc: 'Complete gallery of works by Théophile Dequecker.',
                        filter_aria: 'Filter by {{category}}'
                    },
                    categories: {
                        all: 'All',
                        urban: 'Urban',
                        nature: 'Nature',
                        portrait: 'Portrait',
                        bnw: 'Black & White',
                        lifestyle: 'Lifestyle'
                    },
                    not_found: {
                        seo_title: '404 - Failed Exposure',
                        seo_desc: 'This image was lost during development. The negative is blank.',
                        title: '404',
                        subtitle: 'Failed Exposure',
                        text: 'This image was lost during development. <br /> The negative is blank.',
                        back: 'Back to contact sheet'
                    },
                    footer: {
                        legals: 'Legal Notice',
                        instagram_aria: 'Follow me on Instagram',
                        rights: 'Born Too Late'
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
                    },
                    chatbot: {
                        open_label: "Open the Lab",
                        title: "The Lab AI",
                        welcome_title: "Welcome to the Lab.",
                        welcome_text: "This chatbot uses Artificial Intelligence (Google Gemini). Your exchanges are processed automatically. Do not share sensitive data. By continuing, you agree to our privacy policy.",
                        input_placeholder: "Write your message...",
                        developing: "Developing...",
                        rate_limit: "⏳ Oops! You're talking too fast for the Lab. Please wait a minute.",
                        err_technical: "The development process failed. Try again later.",
                        err_api_missing: "Missing configuration: API Key (VITE_GEMINI_API_KEY) not found in the lab.",
                        err_quota: "The Lab is overloaded (Quota exceeded). Please wait a few moments before asking your question again.",
                        order_success: "✅ Order successfully sent to the workshop. You will receive a confirmation email.",
                        order_error: "⚠️ Technical error: The order was noted by the AI but the confirmation email could not be sent. Please contact us via the Contact page."
                    }
                },
            },
        },
    });


export default i18n;
