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
                        photographer: 'Photographe',
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
                        acquisition_body_selection: "Bonjour Théophile,\n\nJe souhaite acquérir les tirages sélectionnés ci-dessus.\n\nMerci de me confirmer la disponibilité et les modalités de livraison.\n\nCordialement,",
                        acquisition_body_single: "Bonjour Théophile,\n\nJe souhaite acquérir un tirage photo.\n\nMerci de me confirmer la disponibilité et les modalités de livraison.\n\nCordialement,",
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
                        available_prints: "Tirages d'art disponibles sur demande. Éditions limitées.",
                        selection: "Sélection",
                        format_label: "Format souhaité",
                        finish_label: "Finition",
                        options: {
                            unknown: "Je ne sais pas encore",
                            print_only: "Tirage Seul (Collection)",
                            framed: "Encadré Nielsen (Élégance)",
                            shadow_box: "Caisse Américaine (Galerie)",
                            custom: "Sur Mesure",
                            a4: "20x30 cm (A4) - Collection",
                            a3: "30x45 cm (A3+) - Standard",
                            large: "40x60 cm - Grand",
                            giant: "60x90 cm - Géant"
                        },

                    },
                    lightbox: {
                        collect_button: "Collectionner ce tirage",
                        close: "Fermer",
                        scan: "Scan / Scroll Up"
                    },
                    series_seo: {
                        title: "Séries",
                        desc: "Explorez les séries thématiques de Théophile Dequecker. De l'hiver new-yorkais aux montagnes polonaises, chaque série raconte une histoire unique sur pellicule.",
                        aria_view: "Voir la série {{title}}"
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
                        rights: 'Born Too Late',
                        prints: "L'Atelier",
                        newsletter_desc: "Inscrivez-vous pour être notifié en avant-première de la sortie de nos nouveaux tirages d'art limités.",
                        newsletter_placeholder: "votre@email.com",
                        newsletter_btn: "S'inscrire",
                        newsletter_success: "Inscription confirmée. Merci.",
                        newsletter_error: "Erreur technique. Veuillez réessayer."
                    },

                    wall: {
                        simulated_size: "Simulation",
                        close: "Fermer"
                    },
                    legals: {
                        title: "Mentions Légales & CGV",
                        update: "Dernière mise à jour : Février 2026",
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
                                title: "4.1 Commande & Conformité AGEC",
                                text: "Les produits sont des œuvres photographiques originales. Le contrat est conclu à la réception du paiement. Conformément à la loi AGEC, nous garantissons une démarche éco-responsable : tirages réalisés par Picto Paris sur papier d'art sans acide (100% coton, certifié FSC) et emballages 100% recyclables."
                            },
                            article2: {
                                title: "4.2 Droit de Rétractation",
                                text: "Conformément à l'article L221-18 du Code de la consommation, vous disposez de <strong>14 jours</strong> à réception pour exercer votre droit de rétractation (frais de retour à votre charge), sauf pour les œuvres nettement personnalisées."
                            },
                            article3: {
                                title: "4.3 Livraison",
                                text: "Les tirages sont produits à la demande par le laboratoire Picto Paris. Le délai moyen de production est de 5 à 7 jours ouvrés, auquel s'ajoute le délai d'expédition (Colissimo Suivi ou Transporteur Spécialisé). Born Too Late ne saurait être tenu responsable des retards liés au transporteur."
                            },
                            article4: {
                                title: "4.4 Paiement Sécurisé",
                                text: "Les paiements par carte bancaire sont traités par notre partenaire <strong>Stripe</strong>, utilisant le protocole de cryptage SSL/TLS. Aucune donnée bancaire n'est conservée sur nos serveurs."
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
                        order_error: "⚠️ Erreur technique : La commande a été notée par l'IA mais l'email de confirmation n'a pas pu partir. Veuillez nous contacter via la page Contact.",
                        err_generic_human: "L'image est floue... Je n'arrive pas à développer votre réponse pour l'instant. Laissez-moi quelques minutes pour changer les bains de chimie."
                    },
                    pricing: {
                        collection: {
                            label: "La Collection",
                            description: "L'œuvre pure. Tirage Fine Art sur papier Canson Infinity Baryta. Livré roulé, prêt à encadrer.",
                            features: {
                                "0": "Papier Canson Baryta",
                                "1": "Qualité Musée",
                                "2": "Signé & Numéroté",
                                "3": "Livré roulé"
                            }
                        },
                        elegance: {
                            label: "L'Élégance",
                            description: "La sobriété intemporelle. Encadrement aluminium noir mat Nielsen Alpha.",
                            features: {
                                "0": "Cadre Nielsen Alpha",
                                "1": "Aluminium Noir Mat",
                                "2": "Prêt à accrocher",
                                "3": "Livraison Europe Uniq."
                            }
                        },
                        exception: {
                            label: "L'Exception",
                            description: "L'immersion totale. Tirage contrecollé flottant dans une Caisse Américaine en bois noir.",
                            features: {
                                "0": "Caisse Américaine Bois",
                                "1": "Effet Flottant",
                                "2": "Finition Luxe",
                                "3": "Sans vitre (Reflets 0)"
                            }
                        }
                    },
                    guarantee: {
                        title: "Garantie & Authenticité",
                        text: "Chaque tirage est une œuvre originale, numérotée et signée (limite de 30 exemplaires). Certificat d'authenticité inclus."
                    },
                    acquisition: {
                        selected_work: "Œuvre sélectionnée",
                        limited_edition: "Tirage Original (Limité à 30 exemplaires), signé et numéroté. Produit artisanalement par Picto Paris.",
                        custom_request_label: "Une demande spécifique ?",
                        custom_request_btn: "Demander un devis sur mesure",
                        cert_note: "* Votre commande inclut le certificat d'authenticité et la signature de l'artiste.",
                        choose_format: "Configurer le Tirage",
                        view_wall: "Voir en situation",
                        proceed_payment: "Commander en ligne",
                        secure_payment: "Paiement 100% sécurisé via Stripe",
                        encrypted: "Transaction cryptée SSL",
                        variants: {
                            "20x30": "20x30 cm",
                            "30x45": "30x45 cm",
                            "40x60": "40x60 cm",
                            "60x90": "60x90 cm",
                            "70x100": "70x100 cm",
                            "frame_30x40": "Encadré 30x40 cm",
                            "frame_40x60": "Encadré 40x60 cm",
                            "frame_70x100": "Encadré 70x100 cm",
                            "img_20x30": "(Format Image 20x30)",
                            "full_frame": "(Plein Cadre)",
                            "img_60x90": "(Format Image 60x90)",
                            "masterpiece": "(Édition Prestige)",
                            "redirecting": "Redirection vers Stripe...",
                        },
                        shipping_worldwide: "Expédition : Monde entier / Worldwide Shipping",
                        shipping_europe: "Expédition : France & Europe uniquement (Fragile)",
                        shipping_secure: "Livraison suivie & assurée",
                        bank_transfer: "Je préfère payer par Virement Bancaire",
                        sold_out: "SOLD OUT - ÉPUISÉ",
                        stock_remaining: "{{count}} exemplaires restants",
                        stock_limited: "Édition Limitée - {{count}}/30 exemplaires"
                    },
                    prints: {
                        seo_title: 'Atelier & Collection',
                        seo_desc: 'Tirages d\'art en édition limitée. Signés et numérotés.',
                        title: "L'Atelier",
                        subtitle: "Chaque tirage est une pièce unique, produite artisanalement pour sublimer l'image.",
                        craft_title: "Savoir-Faire",
                        craft_text: "Impression Fine Art sur papier <1>Canson Infinity Platine Fibre Rag 310g</1>. Un rendu argentique exceptionnel et une longévité muséale.",
                        explore_series: "Parcourir la collection",
                        visualize: "Mise en situation",
                        compare_finish: "Visualiser les formats et finitions",
                        pricing_grid: "Tarifs & Finitions"
                    }
                },
            },
            en: {
                translation: {
                    nav: {
                        portfolio: 'Portfolio',
                        series: 'Series',
                        photographer: 'Photographer',
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
                        acquisition_body_selection: "Hello Théophile,\n\nI would like to acquire the selected prints above.\n\nPlease confirm availability and shipping details.\n\nBest regards,",
                        acquisition_body_single: "Hello Théophile,\n\nI would like to acquire a photo print.\n\nPlease confirm availability and shipping details.\n\nBest regards,",
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
                        available_prints: "Fine Art Prints available upon request. Limited Editions.",
                        selection: "Selection",
                        format_label: "Preferred Format",
                        finish_label: "Finish",
                        options: {
                            unknown: "I don't know yet",
                            print_only: "Print Only (Collection)",
                            framed: "Nielsen Framed (Elegance)",
                            shadow_box: "Shadow Box (Gallery)",
                            custom: "Custom Request",
                            a4: "20x30 cm (A4) - Collection",
                            a3: "30x45 cm (A3+) - Standard",
                            large: "40x60 cm - Large",
                            giant: "60x90 cm - Giant"
                        },

                    },
                    lightbox: {
                        collect_button: "Collect this print",
                        close: "Close",
                        scan: "Scan / Scroll Up"
                    },
                    series_seo: {
                        title: "Series",
                        desc: "Explore the thematic series of Théophile Dequecker. From New York winter to Polish mountains, each series tells a unique story on film.",
                        aria_view: "View series {{title}}"
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
                        rights: 'Born Too Late',
                        prints: "The Workshop",
                        newsletter_desc: "Sign up to be notified in advance of the release of our new limited art prints.",
                        newsletter_placeholder: "your@email.com",
                        newsletter_btn: "Subscribe",
                        newsletter_success: "Subscription confirmed. Thank you.",
                        newsletter_error: "Technical error. Please try again."
                    },
                    wall: {
                        simulated_size: "Simulation",
                        close: "Close"
                    },
                    legals: {
                        title: "Legal Notice & Terms",
                        update: "Last updated: February 2026",
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
                                title: "4.1 Order & AGEC Compliance",
                                text: "Products are original photographic works. The contract is concluded upon receipt of payment. In accordance with the French AGEC law, we guarantee an eco-responsible approach: prints made by Picto Paris on acid-free art paper (100% cotton, FSC certified) and 100% recyclable packaging."
                            },
                            article2: {
                                title: "4.2 Right of Withdrawal",
                                text: "In accordance with Article L221-18 of the Consumer Code, you have <strong>14 days</strong> upon receipt to exercise your right of withdrawal (return costs at your expense), except for clearly personalized works."
                            },
                            article3: {
                                title: "4.3 Delivery",
                                text: "Prints are produced on demand by the Picto Paris laboratory. The average production time is 5 to 7 business days, plus shipping time (Tracked Colissimo or Specialized Carrier). Born Too Late cannot be held responsible for carrier delays."
                            },
                            article4: {
                                title: "4.4 Secure Payment",
                                text: "Credit card payments are processed by our partner <strong>Stripe</strong>, using SSL/TLS encryption protocol. No banking data is stored on our servers."
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
                        order_error: "⚠️ Erreur technique : La commande a été notée par l'IA mais l'email de confirmation n'a pas pu partir. Veuillez nous contacter via la page Contact.",
                        err_generic_human: "L'image est floue... Je n'arrive pas à développer votre réponse pour l'instant. Laissez-moi quelques minutes pour changer les bains de chimie."
                    },
                    pricing: {
                        collection: {
                            label: "The Collection",
                            description: "The pure artwork. Fine Art print on Canson Infinity Platine Fibre Rag 310g. The purist's choice for an authentic analog look.",
                            shipping: "Free Shipping (France)",
                            features: [
                                "Canson Platine 310g Paper",
                                "Museum Quality & Satin",
                                "Signed & Numbered (30 copies)",
                                "Certificate of Authenticity"
                            ]
                        },
                        elegance: {
                            label: "The Elegance (Framed)",
                            description: "The Gallery Look. Centered print with white margin (or full frame) in a Matte Black Aluminum Frame (Nielsen Alpha).",
                            shipping: "Shipping Included (France)",
                            features: [
                                "Nielsen Alpha Black Frame",
                                "Passe-partout / White Margin",
                                "Ready to hang",
                                "Glass Protection"
                            ]
                        },
                        exception: {
                            label: "The Exception (Shadow Box)",
                            description: "The ultimate showcase. Mounted print floating in a black wooden American Box (Shadow Box). No glass for total immersion without reflections.",
                            shipping: "Shipping Included (France)",
                            features: [
                                "Black Wood American Box",
                                "Floating Effect (Mounted)",
                                "No Glass (Zero Reflection)",
                                "Luxury Finish"
                            ]
                        }
                    },
                    acquisition: {
                        selected_work: "Selected Work",
                        limited_edition: "Limited edition, signed and numbered. Handcrafted by Picto Paris.",
                        custom_request_label: "Specific request?",
                        custom_request_btn: "Request a custom quote",
                        cert_note: "* Your order includes the certificate of authenticity and the artist's signature.",
                        choose_format: "Configure Print",
                        view_wall: "View in room",
                        proceed_payment: "Order Online",
                        secure_payment: "100% Secure via Stripe",
                        encrypted: "SSL Encrypted Transaction",
                        variants: {
                            "20x30": "20x30 cm",
                            "30x45": "30x45 cm",
                            "40x60": "40x60 cm",
                            "60x90": "60x90 cm",
                            "70x105": "70x105 cm",

                            "30x40": "Framed 30x40 cm",
                            "60x80": "Framed 60x80 cm",

                            "24x36": "Shadow Box 24x36 cm",
                            "50x75": "Shadow Box 50x75 cm",

                            "detail_20x30": "(Image 20x30 cm)",
                            "detail_24x36": "(Image 24x36 cm)",
                            "detail_47x70": "(Image 47x70 cm)",
                            "detail_full": "(Full Frame)",
                            "redirecting": "Redirecting to Stripe...",
                        },
                        shipping_worldwide: "Shipping: Worldwide",
                        shipping_europe: "Shipping: France & Europe Only (Fragile)",
                        shipping_secure: "Tracked & Insured Shipping",
                        bank_transfer: "I prefer Bank Transfer via Email",
                        sold_out: "SOLD OUT",
                        stock_remaining: "{{count}} copies remaining",
                        stock_limited: "Limited Edition - {{count}}/30 copies"
                    },
                    prints: {
                        seo_title: 'Workshop & Collection',
                        seo_desc: 'Acquire an original Born Too Late print. Limited editions.',
                        title: "The Workshop",
                        subtitle: "The print is the culmination of the photographic process. It is the moment when the virtual image becomes matter.",
                        craft_title: "The Artisanal Gesture",
                        craft_text: "Each print is made to order by our partner laboratory Picto Paris. We exclusively use <1>Canson Infinity Platine Fibre Rag 310g</1> paper.",
                        explore_series: "Explore Series",
                        visualize: "Visualize Formats",
                        compare_finish: "Compare Nielsen Frame and Shadow Box",
                        pricing_grid: "Pricing Grid & Finishes"
                    }
                },
            },
        },
    });


export default i18n;
