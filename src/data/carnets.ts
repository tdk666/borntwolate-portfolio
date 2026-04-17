export interface Carnet {
    id: string;
    seriesId: string;
    title: string;
    location: { fr: string; en: string };
    coverImage: string;
    coverAlt: { fr: string; en: string };
    seo: {
        fr: { title: string; description: string };
        en: { title: string; description: string };
    };
    content: {
        fr: string[];
        en: string[];
    };
    inlinePhotos: {
        src: string;
        alt: { fr: string; en: string };
        caption: { fr: string; en: string };
        orientation: 'portrait' | 'landscape';
    }[];
    film: string;
    seriesUrl: string;
}

export const carnets: Carnet[] = [
    {
        id: 'retro-mountain',
        seriesId: 'retro-mountain',
        title: 'Retro Mountain',
        location: {
            fr: 'Thollon-les-Mémises, janvier 2024',
            en: 'Thollon-les-Mémises, January 2024',
        },
        coverImage: '/images/retro-mountain/lawrence.jpg',
        coverAlt: {
            fr: "Lawrence d'Hiver, silhouette en contre-jour sur un balcon, Lac Léman brumeux, Rollei Retro 400S",
            en: 'Winter Lawrence, backlit silhouette on a balcony, misty Lake Geneva, Rollei Retro 400S',
        },
        seo: {
            fr: {
                title: 'Retro Mountain — Thollon-les-Mémises, janvier 2024 | Carnets | Borntwolate',
                description: 'Six photographies argentiques en noir et blanc. Rollei Retro 400S, Thollon-les-Mémises. Le silence blanc des Alpes, un grain charbonneux, une silhouette hors du temps.',
            },
            en: {
                title: 'Retro Mountain — Thollon-les-Mémises, January 2024 | Field Notes | Borntwolate',
                description: 'Six analog black-and-white photographs. Rollei Retro 400S, Thollon-les-Mémises. The white silence of the Alps, charcoal grain, a silhouette out of time.',
            },
        },
        content: {
            fr: [
                "Janvier 2024. Thollon-les-Mémises. Une semaine au ski avec mon ami Amaury. J'avais chargé le Rollei avec une Retro 400S deux jours avant de partir. Cette émulsion, je voulais voir ce qu'elle faisait avec la neige.",
                "La Rollei Retro 400S ne blanchit pas la neige. Elle la brûle. Le grain est charbonneux, presque violent, et quand il rencontre la lumière crue d'une journée sans nuage, les blancs deviennent des matières à part entière. J'avais vu ça sur des tirages de ski des années 70. Je voulais vérifier si c'était toujours vrai.",
                "Thollon-les-Mémises n'est pas une station-spectacle. C'est un village-station, avec ses balcons en béton qui surplombent le Léman, ses toits sous la neige, une atmosphère qui tient plus du refuge que du resort. Le Gardien des Cimes s'est imposé comme la photo centrale très vite. Cette posture, de trois-quarts, regard vers l'horizon : j'ai eu moins de dix secondes pour la saisir. C'est ce que l'argentique oblige à faire. Décider.",
                "Les autres photos sont venues en cherchant les espaces entre. Lawrence d'Hiver depuis un balcon, une silhouette réduite à ses contours par le contre-jour du Léman. Le Rituel au flash direct dans le chalet, sans chercher à embellir. Mise en Abyme, la seule image délibérément floue de la série : le Rollei photographié, le regard qui se regarde.",
                "Six photographies. Chacune existe en 30 exemplaires. Ce que la neige m'a appris cette semaine-là, c'est qu'elle ne se photographie pas. Elle se brûle.",
            ],
            en: [
                "January 2024. Thollon-les-Mémises. A week skiing with my friend Amaury. I had loaded the Rollei with a Retro 400S two days before leaving. This emulsion, I wanted to see what it would do with snow.",
                "Rollei Retro 400S doesn't whiten snow. It burns it. The grain is charcoal-like, almost violent, and when it meets the raw light of a cloudless winter day, the whites become materials in their own right. I had seen that on ski prints from the 1970s. I wanted to verify if it was still true.",
                "Thollon-les-Mémises is not a spectacle-resort. It's a village-resort, with its concrete balconies overlooking Lake Geneva, its snow-covered rooftops, an atmosphere that feels more like a refuge than a resort. The Guardian of the Peaks established itself as the central photograph quickly. That posture, three-quarters, gaze toward the horizon: I had less than ten seconds to capture it. That's what analog forces you to do. Decide.",
                "The other photographs came from looking for the spaces between. Winter Lawrence from a balcony, a silhouette reduced to its outlines by the backlight of the lake. The Ritual with direct flash in the chalet, without trying to embellish. Mise en Abyme, the only deliberately blurred image in the series: the Rollei photographed, the gaze watching itself.",
                "Six photographs. Each exists in 30 copies. What snow taught me that week was that you don't photograph it. You burn it.",
            ],
        },
        inlinePhotos: [
            {
                src: '/images/retro-mountain/mountain-retro.jpg',
                alt: {
                    fr: 'Le Gardien des Cimes, skieur solitaire de trois-quarts dans la neige, Rollei Retro 400S',
                    en: 'The Guardian of the Peaks, solitary skier three-quarters in the snow, Rollei Retro 400S',
                },
                caption: {
                    fr: 'Le Gardien des Cimes — Rollei Retro 400S',
                    en: 'The Guardian of the Peaks — Rollei Retro 400S',
                },
                orientation: 'portrait',
            },
            {
                src: '/images/retro-mountain/contemplation.jpg',
                alt: {
                    fr: 'Mise en Abyme, appareil Nikon posé sur une rambarde givrée, panorama alpin flou',
                    en: 'Mise en Abyme, Nikon camera resting on a frosted railing, blurred alpine panorama',
                },
                caption: {
                    fr: 'Mise en Abyme — Rollei Retro 400S',
                    en: 'Mise en Abyme — Rollei Retro 400S',
                },
                orientation: 'landscape',
            },
        ],
        film: 'Rollei Retro 400S',
        seriesUrl: '/series/retro-mountain',
    },
    {
        id: 'mauvais-garcons',
        seriesId: 'mauvais-garcons',
        title: 'Mauvais Garçons',
        location: {
            fr: 'Paris, Marais — Île Saint-Louis, avril 2023',
            en: 'Paris, Marais — Île Saint-Louis, April 2023',
        },
        coverImage: '/images/mauvais-garcons/le-rendez-vous.jpg',
        coverAlt: {
            fr: 'Gabriel sur son Astor, lunettes noires, regard fixe, rue pavée du Marais, Kodak Portra 400',
            en: 'Gabriel on his Astor, dark glasses, staring gaze, cobbled Marais street, Kodak Portra 400',
        },
        seo: {
            fr: {
                title: 'Mauvais Garçons — Paris, Marais, avril 2023 | Carnets | Borntwolate',
                description: 'Six photographies argentiques en couleur. Nikon F-301, Kodak Portra 400, Paris. Un dandy moderne, une moto Astor, une impasse du Marais et une journée entière à attendre.',
            },
            en: {
                title: 'Mauvais Garçons — Paris, Marais, April 2023 | Field Notes | Borntwolate',
                description: 'Six color analog photographs. Nikon F-301, Kodak Portra 400, Paris. A modern dandy, an Astor motorcycle, a dead-end in the Marais and a whole day of waiting.',
            },
        },
        content: {
            fr: [
                "Avril 2023. Gabriel a accepté de poser sans vraiment savoir ce que je cherchais. Je ne le savais pas non plus. Je savais juste qu'il y avait quelque chose dans sa façon d'habiter les vêtements, d'attendre sur sa moto sans regarder son téléphone, d'exister dans l'espace public comme si le présent lui appartenait. J'ai chargé le Nikon F-301 avec une Kodak Portra 400 et on est allés dans le Marais.",
                "La Portra 400 produit une chaleur particulière sur les tons chair et les beiges. C'est le film des portraitistes, de ceux qui travaillent en lumière naturelle sans la combattre. Sous le soleil d'avril dans le Marais, les façades haussmanniennes viraient à l'ocre et le manteau de Gabriel disparaissait dans le décor. C'était exactement ça : quelqu'un qui fait corps avec un endroit.",
                "La rue des Mauvais Garçons existe vraiment. C'est une impasse courte dans le 4e arrondissement, entre la rue du Roi de Sicile et la rue de la Verrerie. Quelques mètres de pavés, un porche en bois, des murs qui écoutent. Gabriel a garé l'Astor devant et on a attendu que la lumière fasse son travail. On a beaucoup attendu dans cette série. Le titre s'est imposé tout seul.",
                "La structure narrative n'est apparue qu'après le développement. Chaque image avançait vers quelque chose : l'attente du porche, la lecture Place des Vosges, la suspension de l'Île Saint-Louis, la machine seule sur les quais, la silhouette floue sur le pont, et enfin le regard direct. Six poses qui racontent un rendez-vous qu'on aurait pu manquer.",
                "Ce qui reste de cette journée, c'est l'idée qu'une série peut avoir une dramaturgie sans être mise en scène. Gabriel n'a rien joué : il était là, il attendait, il regardait. Le Portra a capturé quelque chose de réel, même si ce réel était légèrement costumé. C'est la frontière que j'essaie de tenir dans chaque série : entre le document et la fiction, entre l'instant et la pose.",
            ],
            en: [
                "April 2023. Gabriel agreed to shoot without really knowing what I was looking for. Neither did I. I just knew there was something in the way he occupied clothes, waited on his motorcycle without checking his phone, existed in public space as if the present belonged to him. I loaded the Nikon F-301 with Kodak Portra 400 and we went to the Marais.",
                "Portra 400 has a particular warmth on skin tones and beiges. It's the portraitist's film, for those who work with natural light rather than against it. Under the April sun in the Marais, the Haussmann facades turned ochre and Gabriel's coat dissolved into the setting. That was exactly it: someone who merges with a place.",
                "Rue des Mauvais Garçons is a real street. A short dead-end in the 4th arrondissement, between Rue du Roi de Sicile and Rue de la Verrerie. A few meters of cobblestones, a wooden porch, walls that listen. Gabriel parked the Astor and we waited for the light to do its work. We waited a lot in this series. The title came on its own.",
                "The narrative structure only became clear after the prints dried. Each image moved toward something: the wait at the porch, reading at Place des Vosges, the suspension on Île Saint-Louis, the machine alone on the quay, the blurred silhouette on the bridge, and finally the direct gaze. Six frames telling a story of a meeting we could have missed.",
                "What stays with me from that day is the idea that a series can have dramatic arc without being staged. Gabriel didn't perform: he was there, waiting, looking. The Portra captured something real, even if that real was slightly costumed. That's the line I try to hold in every series: between document and fiction, between the instant and the pose.",
            ],
        },
        inlinePhotos: [
            {
                src: '/images/mauvais-garcons/gab-lampadaire.jpg',
                alt: {
                    fr: "L'Heure Bleue, Gabriel perché sur un muret accroché à un lampadaire, quai de l'Île Saint-Louis",
                    en: "L'Heure Bleue, Gabriel perched on a low wall holding a street lamp, Île Saint-Louis quay",
                },
                caption: {
                    fr: "L'Heure Bleue — Nikon F-301 — Kodak Portra 400",
                    en: "L'Heure Bleue — Nikon F-301 — Kodak Portra 400",
                },
                orientation: 'portrait',
            },
            {
                src: '/images/mauvais-garcons/moto-seine.jpg',
                alt: {
                    fr: 'Astor sur Seine, moto vintage béquillée sur les pavés des quais, sans son cavalier',
                    en: 'Astor sur Seine, vintage motorcycle propped on quay cobblestones, without its rider',
                },
                caption: {
                    fr: 'Astor sur Seine — Nikon F-301 — Kodak Portra 400',
                    en: 'Astor sur Seine — Nikon F-301 — Kodak Portra 400',
                },
                orientation: 'landscape',
            },
        ],
        film: 'Kodak Portra 400',
        seriesUrl: '/series/mauvais-garcons',
    },
    {
        id: 'winter-in-the-fruit',
        seriesId: 'winter-in-the-fruit',
        title: 'A Winter in the Fruit',
        location: {
            fr: 'New York, Manhattan, décembre 2023',
            en: 'New York, Manhattan, December 2023',
        },
        coverImage: '/images/winter-in-the-fruit/empire-state.jpg',
        coverAlt: {
            fr: "Empire State Building en contre-plongée fendant un ciel d'hiver pâle, Kodak Gold 400",
            en: 'Empire State Building from a low angle splitting a pale winter sky, Kodak Gold 400',
        },
        seo: {
            fr: {
                title: 'A Winter in the Fruit — New York, décembre 2023 | Carnets | Borntwolate',
                description: "Sept photographies argentiques couleur. Rollei 35, Kodak Gold 400, Manhattan. Bus depuis Montréal, puis la verticalité de Manhattan, Central Park comme respiration, la lumière d'hiver sur la pierre grise.",
            },
            en: {
                title: 'A Winter in the Fruit — New York, December 2023 | Field Notes | Borntwolate',
                description: "Seven color analog photographs. Rollei 35, Kodak Gold 400, Manhattan. Bus from Montreal, then the verticality of Manhattan, Central Park as breathing room, winter light on grey stone.",
            },
        },
        content: {
            fr: [
                "Décembre 2023. J'étais en échange universitaire à Montréal depuis quelques mois. J'ai pris un bus depuis la gare Berri-UQAM jusqu'à New York, douze heures de route. J'avais chargé le Rollei 35 avec une Kodak Gold 400 avant de monter. Pas de plan de tournage. Juste l'idée que New York méritait d'être regardée comme une erreur de perspective : trop grande, trop verticale, trop connue pour être vraiment vue.",
                "La Kodak Gold 400 en hiver, c'est une décision. Ce film préfère la chaleur : les peaux, les lumières d'intérieur, les couchers de soleil. Sous le soleil rasant de décembre à Manhattan, il fait quelque chose d'inattendu avec la pierre grise et le métal. Les ombres portées deviennent des constructions géométriques. Les jaunes de taxi virent à l'orange. La ville prend une teinte de cinéma des années 70 que je n'avais pas prévue.",
                "J'ai passé quatre jours à marcher. Depuis le bas de la High Line jusqu'à Central Park, depuis le métro de la 34e jusqu'aux quais de l'Hudson. L'Empire State, je l'ai photographié depuis la rue, en contre-plongée, sans chercher le point de vue panoramique. Il était là, au bout d'une avenue, comme une évidence écrasante. Je n'avais pas d'autre choix que de lever l'objectif.",
                "En regardant les planches contact à Paris, la série s'est organisée autour d'une tension : la ville comme masse et la ville comme refuge. King of Midtown et Midnight City d'un côté, verticale et reflet nocturne. Quiet Central et Colors of December de l'autre, le parc comme respiration, les gens dedans qui lisent ou marchent sans regarder les gratte-ciels. New York n'est supportable que parce qu'elle contient Central Park.",
                "Ce qui reste de ce premier séjour, c'est l'idée que certaines villes ne se découvrent pas. Elles se confrontent. Manhattan n'est pas un décor : c'est une proposition. Accepter de marcher dedans, c'est accepter d'être petit. Le Rollei 35 est un cadre minuscule face à quelque chose d'immense. Peut-être que c'est exactement le bon outil.",
            ],
            en: [
                "December 2023. I had been on a university exchange in Montreal for a few months. I took a bus from Berri-UQAM station to New York, twelve hours on the road. I had loaded the Rollei 35 with Kodak Gold 400 before getting on. No shooting plan. Just the idea that New York deserved to be looked at as a perspective error: too large, too vertical, too well-known to be actually seen.",
                "Kodak Gold 400 in winter is a decision. This film prefers warmth: skin tones, interior lights, sunsets. Under the grazing December sun on Manhattan, it does something unexpected with grey stone and metal. Cast shadows become geometric constructions. Taxi yellows turn orange. The city takes on a 1970s film hue I hadn't planned for.",
                "I spent four days walking. From the bottom of the High Line to Central Park, from the 34th Street subway to the Hudson piers. The Empire State, I photographed it from the street, low angle, without looking for the panoramic viewpoint. It was there at the end of an avenue, like an overwhelming given. I had no choice but to raise the lens.",
                "Looking at the contact sheets in Paris, the series organized itself around a tension: the city as mass and the city as refuge. King of Midtown and Midnight City on one side, vertical mass and night reflection. Quiet Central and Colors of December on the other, the park as breathing room, people inside reading or walking without looking up at the skyscrapers. New York is only bearable because it contains Central Park.",
                "What stays from that first stay is the idea that some cities aren't discovered. They're confronted. Manhattan isn't a backdrop: it's a proposition. Agreeing to walk through it means agreeing to be small. The Rollei 35 is a tiny frame facing something immense. Maybe that's exactly the right tool.",
            ],
        },
        inlinePhotos: [
            {
                src: '/images/winter-in-the-fruit/central-park-reading.jpg',
                alt: {
                    fr: "Quiet Central, femme lisant au pied d'un arbre dans Central Park, tours en arrière-plan, Kodak Gold 400",
                    en: 'Quiet Central, woman reading at the foot of a tree in Central Park, towers in the background, Kodak Gold 400',
                },
                caption: {
                    fr: 'Quiet Central — Rollei 35 — Kodak Gold 400',
                    en: 'Quiet Central — Rollei 35 — Kodak Gold 400',
                },
                orientation: 'portrait',
            },
            {
                src: '/images/winter-in-the-fruit/central-park-night.jpg',
                alt: {
                    fr: 'Midnight City, gratte-ciels se reflétant dans le lac de Central Park la nuit, Kodak Gold 400',
                    en: 'Midnight City, skyscrapers reflecting in the Central Park lake at night, Kodak Gold 400',
                },
                caption: {
                    fr: 'Midnight City — Rollei 35 — Kodak Gold 400',
                    en: 'Midnight City — Rollei 35 — Kodak Gold 400',
                },
                orientation: 'landscape',
            },
        ],
        film: 'Kodak Gold 400',
        seriesUrl: '/series/winter-in-the-fruit',
    },
    {
        id: 'puglia-famiglia',
        seriesId: 'puglia-famiglia',
        title: 'Puglia Famiglia',
        location: {
            fr: 'Pouilles, Italie, août 2024',
            en: 'Puglia, Italy, August 2024',
        },
        coverImage: '/images/puglia/vespa.jpg',
        coverAlt: {
            fr: 'Vespa blanche garée contre un mur blanc face à la mer, Pouilles, CineStill 400D',
            en: 'White Vespa parked against a white wall facing the sea, Puglia, CineStill 400D',
        },
        seo: {
            fr: {
                title: 'Puglia Famiglia — Pouilles, août 2024 | Carnets | Borntwolate',
                description: "Six photographies argentiques couleur. Rollei 35, CineStill 400D, Pouilles. Une semaine entre Lecce et Otrante sous la lumière du sud de l'Italie, entre figures familières et objets abandonnés.",
            },
            en: {
                title: 'Puglia Famiglia — Puglia, August 2024 | Field Notes | Borntwolate',
                description: 'Six color analog photographs. Rollei 35, CineStill 400D, Puglia. A week between Lecce and Otranto under Southern Italian light, between familiar figures and abandoned objects.',
            },
        },
        content: {
            fr: [
                "Août 2024. Les Pouilles. Neuf jours en famille, entre Lecce, Otrante et les côtes adriatiques. J'avais une pellicule CineStill 400D dans le Rollei 35 et un projet précis : faire quelque chose avec la lumière du sud sur un film conçu pour le cinéma. L'esthétique de Plein Soleil, c'était l'idée de départ.",
                "La CineStill 400D est une pellicule cinéma reconditionnée en bobine 35mm. Elle est faite pour les lumières artificielles, les projecteurs, les scènes éclairées. Je savais, avant de partir, qu'en plein été à Otrante elle allait faire autre chose. Elle sature les bleus. Elle tient les blancs des masserie sans les brûler. Les teintes chair deviennent chaudes sans virer à l'orange. Plein Soleil, Alain Delon sur un bateau, la Méditerranée trop bleue : c'est l'image que j'avais en tête avant même de charger le film.",
                "La Vespa de la première image n'appartient à personne dans notre groupe. Elle était garée contre un mur blanc de village, face à la mer, comme si elle attendait son propriétaire depuis le matin. J'ai attendu que personne ne passe devant. Problema della Benzina, c'est une station-service sur la route entre Lecce et Gallipoli : arrêt non prévu, lumière parfaite sur une architecture fonctionnelle. Les meilleures images de voyage sont celles qu'on ne cherchait pas.",
                "La série s'est construite autour de quelques figures récurrentes : les filles qui bougent (Le Due Sorelle, Il Salto), les filles qui attendent (L'Attesa, L'Ombrello), et les objets qui restent quand les gens sont partis (la Vespa, la station-service). C'est un album de famille détourné. Les personnages sont connus. La mise en scène est absente. Ce qui reste, c'est la lumière.",
                "Ce que les Pouilles m'ont appris, c'est qu'un film cinéma n'a pas besoin d'une scène de cinéma. Il suffit d'une lumière juste, d'un mur blanc et de gens qui n'attendent rien. C'est peut-être ça, la dolce vita : ne pas chercher à la photographier.",
            ],
            en: [
                "August 2024. Puglia. Nine days with family, between Lecce, Otranto and the Adriatic coast. I had a roll of CineStill 400D in the Rollei 35 and a specific plan: do something with southern light, using a film made for cinema. The Purple Noon aesthetic was the starting point.",
                "CineStill 400D is a cinema film repurposed in a 35mm roll. It's made for artificial lights, projectors, lit sets. I knew, before leaving, that under a noon sun in Otranto it would do something else. It saturates blues. It holds the whites of masserie without burning them. Skin tones go warm without turning orange. Purple Noon, Alain Delon on a boat, the Mediterranean too blue: that was the image in my mind before I even loaded the film.",
                "The Vespa in the first image belongs to no one in our group. It was parked against a white village wall, facing the sea, as if it had been waiting for its owner since morning. I waited for no one to pass in front. Problema della Benzina is a petrol station on the road between Lecce and Gallipoli: an unplanned stop, perfect light on functional architecture. The best travel images are the ones you weren't looking for.",
                "The series built itself around a few recurring figures: girls in motion (Le Due Sorelle, Il Salto), girls waiting (L'Attesa, L'Ombrello), and objects that remain when people have gone (the Vespa, the petrol station). It's a diverted family album. The subjects are known. There is no staging. What remains is the light.",
                "What Puglia taught me is that a cinema film doesn't need a cinema scene. All it needs is good light, a white wall, and people who aren't expecting anything. Maybe that's dolce vita: not trying to photograph it.",
            ],
        },
        inlinePhotos: [
            {
                src: '/images/puglia/le-due-sorelle.jpg',
                alt: {
                    fr: 'Le Due Sorelle, deux jeunes femmes de dos face à la mer adriatique, CineStill 400D',
                    en: 'Le Due Sorelle, two young women from behind facing the Adriatic sea, CineStill 400D',
                },
                caption: {
                    fr: 'Le Due Sorelle — Rollei 35 — CineStill 400D',
                    en: 'Le Due Sorelle — Rollei 35 — CineStill 400D',
                },
                orientation: 'portrait',
            },
            {
                src: '/images/puglia/problema-della-benzina.jpg',
                alt: {
                    fr: 'Problema della Benzina, station-service vintage sur la route de Gallipoli, Pouilles, CineStill 400D',
                    en: 'Problema della Benzina, vintage petrol station on the road to Gallipoli, Puglia, CineStill 400D',
                },
                caption: {
                    fr: 'Problema della Benzina — Rollei 35 — CineStill 400D',
                    en: 'Problema della Benzina — Rollei 35 — CineStill 400D',
                },
                orientation: 'landscape',
            },
        ],
        film: 'CineStill 400D',
        seriesUrl: '/series/puglia-famiglia',
    },
    {
        id: 'psychadelic-mtl',
        seriesId: 'psychadelic-mtl',
        title: 'Psychadelic MTL',
        location: {
            fr: 'Montréal, Québec, octobre 2023',
            en: 'Montreal, Quebec, October 2023',
        },
        coverImage: '/images/psychadelic-mtl/montreal-vis-versa.avif',
        coverAlt: {
            fr: 'Monde Inversé, skyline de Montréal reflété dans une flaque, teintes cyan LomoChrome Turquoise',
            en: 'Monde Inversé, Montreal skyline reflected in a puddle, cyan LomoChrome Turquoise tones',
        },
        seo: {
            fr: {
                title: 'Psychadelic MTL — Montréal, octobre 2023 | Carnets | Borntwolate',
                description: "Six photographies argentiques expérimentales. Rollei 35, LomoChrome Turquoise, Montréal. Une ville ordinaire filmée avec une émulsion qui inverse les couleurs et pose une autre question sur ce qu'on regarde.",
            },
            en: {
                title: 'Psychadelic MTL — Montreal, October 2023 | Field Notes | Borntwolate',
                description: 'Six experimental analog photographs. Rollei 35, LomoChrome Turquoise, Montreal. An ordinary city filmed with an emulsion that shifts colors and asks a different question about what you see.',
            },
        },
        content: {
            fr: [
                "Octobre 2023. Montréal. J'étais en échange à McGill depuis août, jusqu'en décembre. J'avais acheté une LomoChrome Turquoise à un développeur que je connaissais là-bas, quelques semaines après mon arrivée. J'avais eu des mois pour préparer cette série. Ce film fait des choses étranges avec les couleurs : j'avais décidé que Montréal en automne était le bon endroit pour voir ce que ça donnait.",
                "La LomoChrome Turquoise est une émulsion expérimentale. Elle vire les teintes selon une logique propre : les verts deviennent bleus, les bleus tournent au cyan, les rouges tendent vers le mauve. Sur l'architecture moderniste des années 70 de Montréal, ça produit quelque chose que je n'avais pas vu sur d'autres films. La ville devient une palette qui n'existe pas dans la réalité. Pas un filtre : une autre réalité.",
                "J'ai beaucoup marché dans le Quartier des Spectacles et autour de l'UQAM. Le Kapital Circle, c'est une sculpture au coin d'une rue que j'ai photographiée parce qu'elle ressemblait à une pupille. Le skateur de Forever in the Air, je l'ai attendu vingt minutes au pied d'une rampe avant qu'il tente le saut qui convenait. Monde Inversé, c'est le skyline de Montréal dans le reflet d'une flaque d'eau après la pluie de la veille.",
                "En regardant les images développées, la cohérence s'est imposée d'elle-même : toutes les photos parlent de transformation. La ville qui se retourne, l'homme dans les airs, les cônes de chantier qui changent de couleur, l'architecture géométrique qui prend une teinte aquatique. Montréal en octobre, avec ce film, est devenue une ville qui ne ressemble à aucune image que j'avais vue de Montréal.",
                "Ce que cette série a confirmé, c'est qu'un film expérimental n'est pas un effet spécial. C'est un point de vue. La LomoChrome Turquoise ne décore pas les images. Elle pose une question sur ce qu'on regarde. Montréal existe dans cette couleur, quelque part.",
            ],
            en: [
                "October 2023. Montreal. I had been on exchange at McGill since August, through to December. I had bought a roll of LomoChrome Turquoise from a developer I knew there, a few weeks after arriving. I had had months to prepare this series. This film does strange things with color: I had decided that Montreal in autumn was the right place to see what it would do.",
                "LomoChrome Turquoise is an experimental emulsion. It shifts hues according to its own logic: greens become blue, blues turn cyan, reds lean toward mauve. On Montreal's 1970s modernist architecture, it produces something I hadn't seen on any other film. The city becomes a palette that doesn't exist in reality. Not a filter: a different reality.",
                "I walked a lot around the Quartier des Spectacles and near UQAM. The Kapital Circle is a sculpture on a street corner that I photographed because it looked like a pupil. The skater in Forever in the Air, I waited twenty minutes at the bottom of a ramp before he attempted the right jump. Monde Inversé is the Montreal skyline reflected in a puddle from the previous night's rain.",
                "When the images came back, the coherence was immediate: every photograph is about transformation. The city turned upside down, the man in the air, the construction cones shifting color, the geometric architecture going aquatic. Montreal in October, with this film, became a city unlike any image of Montreal I had ever seen.",
                "What this series confirmed is that an experimental film isn't a special effect. It's a point of view. LomoChrome Turquoise doesn't decorate images. It asks a question about what you're looking at. Montreal exists in that color, somewhere.",
            ],
        },
        inlinePhotos: [
            {
                src: '/images/psychadelic-mtl/kapital-circle.avif',
                alt: {
                    fr: 'Oeil Urbain, sculpture circulaire en acier photographiée en contre-plongée, teinte cyan, Montréal',
                    en: 'Oeil Urbain, circular steel sculpture photographed from below, cyan tones, Montreal',
                },
                caption: {
                    fr: 'Oeil Urbain — Rollei 35 — LomoChrome Turquoise',
                    en: 'Oeil Urbain — Rollei 35 — LomoChrome Turquoise',
                },
                orientation: 'landscape',
            },
            {
                src: '/images/psychadelic-mtl/frvr-in-d-r.avif',
                alt: {
                    fr: "Forever in the Air, skateur en suspension au-dessus d'une rampe, ciel cyan, Montréal",
                    en: 'Forever in the Air, skater suspended above a ramp, cyan sky, Montreal',
                },
                caption: {
                    fr: 'Forever in the Air — Rollei 35 — LomoChrome Turquoise',
                    en: 'Forever in the Air — Rollei 35 — LomoChrome Turquoise',
                },
                orientation: 'landscape',
            },
        ],
        film: 'LomoChrome Turquoise',
        seriesUrl: '/series/psychadelic-mtl',
    },
    {
        id: 'canadian-evasion',
        seriesId: 'canadian-evasion',
        title: 'Canadian Evasion',
        location: {
            fr: 'Québec, Canada, août 2023',
            en: 'Quebec, Canada, August 2023',
        },
        coverImage: '/images/canadian-evasion/infinity.avif',
        coverAlt: {
            fr: 'Route Infinie, route nationale entre forêts boréales au Bas-Saint-Laurent, Kodak Portra 400',
            en: 'Route Infinie, national road between boreal forests in Bas-Saint-Laurent, Kodak Portra 400',
        },
        seo: {
            fr: {
                title: 'Canadian Evasion — Québec, août 2023 | Carnets | Borntwolate',
                description: "Six photographies argentiques couleur. Rollei 35, Kodak Portra 400, Québec. Douze jours depuis Montréal : randonnée à Mont-Tremblant, tente déchirée par l'orage, auto-stop jusqu'à Tadoussac et retour par la rive sud.",
            },
            en: {
                title: 'Canadian Evasion — Quebec, August 2023 | Field Notes | Borntwolate',
                description: "Six color analog photographs. Rollei 35, Kodak Portra 400, Quebec. Twelve days from Montreal: hiking in Mont-Tremblant, storm-torn tent, hitchhiking to Tadoussac and back via the south shore.",
            },
        },
        content: {
            fr: [
                "Août 2023. Cinq jours après mon arrivée à Montréal pour l'échange, j'ai pris mon sac à dos et je suis parti à pied vers Mont-Tremblant. Pas de voiture, pas de plan fixe. J'avais le Rollei 35, une boîte de Kodak Portra 400, et douze jours devant moi.",
                "La Kodak Portra 400, c'est le film de la lumière naturelle douce. Elle ne force pas. Les verts de la forêt boréale restent verts, pas saturés. Les ciels nuageux du Québec gardent leur densité grise sans basculer dans un bleu artificiel. Ce que la Portra fait le mieux, c'est tenir la complexité des tonalités quand la lumière change vite. Elle le fait au Québec, entre deux orages.",
                "Quatre jours de randonnée dans le parc de Mont-Tremblant. La deuxième nuit, l'orage a percé la tente et j'ai dormi à moitié dedans, à moitié dehors. Route Infinie, c'est une route du Bas-Saint-Laurent que j'ai photographiée depuis le bas-côté pendant que j'attendais qu'une voiture s'arrête, après le trek. J'ai fait du stop jusqu'à Tadoussac, traversé le Saint-Laurent, remonté par la rive sud.",
                "La série s'est construite autour du silence et de l'immensité. Pas de villes, pas de foule. Quelques figures humaines, minuscules dans le paysage : une silhouette face au large depuis la Gaspésie, une chaise sur une falaise qui regarde le Saint-Laurent disparaître dans la brume. Ce sont des images de présence, pas d'action. Être là suffisait.",
                "Ce que ce voyage m'a pris, c'est l'habitude des espaces courts. Après douze jours au Québec, Paris m'a semblé étroite pendant une semaine. Ce que la photographie ne peut pas rendre, c'est la durée. On peut fixer l'immensité, mais pas le temps qu'il a fallu pour y arriver.",
            ],
            en: [
                "August 2023. Five days after arriving in Montreal for the exchange, I took my backpack and left on foot toward Mont-Tremblant. No car, no fixed plan. I had the Rollei 35, a box of Kodak Portra 400, and twelve days ahead of me.",
                "Kodak Portra 400 is the soft natural light film. It doesn't force anything. The greens of the boreal forest stay green, not oversaturated. Quebec's grey skies keep their density without being pushed into artificial blue. What Portra does best is hold the complexity of tones when light changes quickly. It does that in Quebec, between two storms.",
                "Four days hiking in Mont-Tremblant park. On the second night, the storm tore through the tent and I slept half inside, half out. Route Infinie is a road in the Bas-Saint-Laurent that I photographed from the roadside while waiting for a car to stop, after the trek. I hitchhiked to Tadoussac, crossed the St. Lawrence, came back via the south shore.",
                "The series built itself around silence and vastness. No cities, no crowds. A few human figures, tiny in the landscape: a silhouette facing the open sea from Gaspésie, a chair on a cliff watching the St. Lawrence disappear into mist. These are images of presence, not action. Being there was enough.",
                "What this journey took from me is the habit of short distances. After twelve days in Quebec, Paris felt narrow for a week. What photography can't render is duration. You can fix the vastness, but not the time it took to get there.",
            ],
        },
        inlinePhotos: [
            {
                src: '/images/canadian-evasion/autoportrait.avif',
                alt: {
                    fr: "Face au Large, autoportrait de dos face à l'horizon du Saint-Laurent en Gaspésie, Kodak Portra 400",
                    en: 'Face au Large, self-portrait from behind facing the St. Lawrence horizon in Gaspésie, Kodak Portra 400',
                },
                caption: {
                    fr: 'Face au Large — Rollei 35 — Kodak Portra 400',
                    en: 'Face au Large — Rollei 35 — Kodak Portra 400',
                },
                orientation: 'landscape',
            },
            {
                src: '/images/canadian-evasion/intrus.avif',
                alt: {
                    fr: 'Bivouac, tente solitaire dans un champ de blé au crépuscule, Bas-Saint-Laurent, Kodak Portra 400',
                    en: 'Bivouac, solitary tent in a wheat field at dusk, Bas-Saint-Laurent, Kodak Portra 400',
                },
                caption: {
                    fr: 'Bivouac — Rollei 35 — Kodak Portra 400',
                    en: 'Bivouac — Rollei 35 — Kodak Portra 400',
                },
                orientation: 'landscape',
            },
        ],
        film: 'Kodak Portra 400',
        seriesUrl: '/series/canadian-evasion',
    },
    {
        id: 'white-mounts',
        seriesId: 'white-mounts',
        title: 'White Mounts',
        location: {
            fr: 'Alpes du Sud, janvier 2025',
            en: 'Southern Alps, January 2025',
        },
        coverImage: '/images/white-mounts/like-sugar.jpg',
        coverAlt: {
            fr: 'Sucre Glace, pentes enneigées des Alpes au coucher de soleil, teintes dorées, Kodak Portra 400',
            en: 'Sucre Glace, snow-covered Alpine slopes at sunset, golden tones, Kodak Portra 400',
        },
        seo: {
            fr: {
                title: 'White Mounts — Alpes du Sud, janvier 2025 | Carnets | Borntwolate',
                description: "Sept photographies argentiques couleur. Rollei 35, Kodak Portra 400, Alpes du Sud. Un week-end de ski vu depuis le bord de piste : la neige en sucre glace, la lune qui monte avant le coucher du soleil, et L'Insolence.",
            },
            en: {
                title: 'White Mounts — Southern Alps, January 2025 | Field Notes | Borntwolate',
                description: "Seven color analog photographs. Rollei 35, Kodak Portra 400, Southern Alps. A ski weekend seen from the sidelines: snow like icing sugar, the moon rising before sunset, and L\'Insolence.",
            },
        },
        content: {
            fr: [
                "Janvier 2025. Alpes du Sud. Un week-end avec un groupe d'amis, dans une station que je ne connaissais pas. J'avais le Rollei 35 et une Portra 400. L'idée n'était pas de faire une série, juste d'avoir le film avec moi si quelque chose se présentait.",
                "La Portra 400 est utilisée habituellement pour les portraits, pour sa façon de traiter les carnations avec douceur. Sur la neige blanche des Alpes en janvier, elle fait quelque chose de différent : elle transforme le blanc pur en matière, lui donne une consistance presque alimentaire. Sucre glace. L'expression est venue en regardant les premiers tirages.",
                "L'Insolence est la photo que je n'aurais pas faite si j'avais cherché à la faire. Un ami s'est arrêté sur une crête, a allumé une cigarette, regardait les pistes en dessous. J'avais dix secondes, peut-être moins. Le format portrait s'est imposé naturellement : la verticalité de la posture, le ciel blanc derrière, et ce calme absolu au milieu d'une station bondée.",
                "L'Apparition est arrivée vers 16h, quand la lumière rasante faisait apparaître la lune au-dessus des cimes avant même que le soleil ne soit couché. C'est le genre d'image qu'on ne voit jamais dans les photos de ski, parce qu'on est généralement à l'intérieur à cette heure-là. La Muraille, c'est le seul skieur sur une piste large, vu depuis la télécabine : une figure minuscule sur une étendue blanche démesurée.",
                "Ce que cette série a montré, c'est qu'un week-end de ski produit des images très différentes selon qu'on participe ou qu'on observe. J'ai beaucoup moins skié que les autres. Je ne regrette pas.",
            ],
            en: [
                "January 2025. Southern Alps. A weekend with a group of friends, in a resort I didn't know. I had the Rollei 35 and a roll of Portra 400. The idea wasn't to make a series, just to have the film on me if something presented itself.",
                "Portra 400 is normally used for portraits, for the way it renders skin tones with softness. On the white snow of the Alps in January, it does something different: it turns pure white into a material, gives it an almost edible consistency. Icing sugar. That's where the title came from, looking at the first prints.",
                "L'Insolence is the photograph I wouldn't have made if I'd been looking for it. A friend stopped on a ridge, lit a cigarette, was looking at the slopes below. I had ten seconds, maybe less. The portrait format imposed itself: the verticality of the posture, the white sky behind, and this absolute calm in the middle of a packed ski resort.",
                "L'Apparition arrived around 4pm, when the low light was making the moon appear above the peaks before the sun had even set. It's the kind of image you never see in ski photography, because you're usually inside by then. La Muraille is the only skier on a wide run, seen from the cable car: a tiny figure on a disproportionate white expanse.",
                "What this series showed is that a ski weekend produces very different images depending on whether you participate or observe. I skied much less than the others. I don't regret it.",
            ],
        },
        inlinePhotos: [
            {
                src: '/images/white-mounts/cig-man.jpg',
                alt: {
                    fr: "L'Insolence, homme de dos sur une crête, cigarette à la main, ciel blanc d'hiver, Kodak Portra 400",
                    en: "L'Insolence, man from behind on a ridge, cigarette in hand, white winter sky, Kodak Portra 400",
                },
                caption: {
                    fr: "L'Insolence — Rollei 35 — Kodak Portra 400",
                    en: "L'Insolence — Rollei 35 — Kodak Portra 400",
                },
                orientation: 'portrait',
            },
            {
                src: '/images/white-mounts/hello-moon.jpg',
                alt: {
                    fr: "L'Apparition, lune pleine se levant au-dessus des cimes enneigées avant le coucher du soleil, Kodak Portra 400",
                    en: "L'Apparition, full moon rising above snow-covered peaks before sunset, Kodak Portra 400",
                },
                caption: {
                    fr: "L'Apparition — Rollei 35 — Kodak Portra 400",
                    en: "L'Apparition — Rollei 35 — Kodak Portra 400",
                },
                orientation: 'landscape',
            },
        ],
        film: 'Kodak Portra 400',
        seriesUrl: '/series/white-mounts',
    },
    {
        id: 'polish-hike',
        seriesId: 'polish-hike',
        title: 'Polish Hike',
        location: {
            fr: 'Tatras, Zakopane, août 2025',
            en: 'Tatras, Zakopane, August 2025',
        },
        coverImage: '/images/polish-hike/the-lakes.jpg',
        coverAlt: {
            fr: 'Miroir Jumeau, lacs jumeaux des Tatras en altitude, reflets parfaits, Kodak Gold',
            en: 'Miroir Jumeau, twin Tatra lakes at altitude, perfect reflections, Kodak Gold',
        },
        seo: {
            fr: {
                title: 'Polish Hike — Tatras, Zakopane, août 2025 | Carnets | Borntwolate',
                description: 'Six photographies argentiques couleur. Rollei 35, Kodak Gold, Tatras. Quatre jours de randonnée en duo entre forêts de hêtres et lacs émeraude, de la vallée aux crêtes de granit.',
            },
            en: {
                title: 'Polish Hike — Tatras, Zakopane, August 2025 | Field Notes | Borntwolate',
                description: 'Six color analog photographs. Rollei 35, Kodak Gold, Tatras. Four days hiking as a duo between beech forests and emerald lakes, from valley floor to granite ridges.',
            },
        },
        content: {
            fr: [
                "Août 2025. Zakopane. Quatre jours de randonnée dans les Tatras avec ma petite amie, depuis la frontière polonaise jusqu'aux lacs de haute montagne. J'avais une pellicule Kodak Gold dans le Rollei 35. Pas besoin d'autre chose quand la montagne est là.",
                "La Kodak Gold en montagne, en plein été, produit des verts impossibles. Pas les verts synthétiques d'un traitement numérique : des verts denses, chauds, presque bruns par endroits, avec un grain visible qui les ancre dans le réel. Dans les Tatras en août, sous un ciel alternant l'orage et le soleil, ce film était exactement ce qu'il fallait.",
                "On a marché six heures par jour pendant quatre jours. La Crête Verte, c'est la première vue sur le massif depuis le sentier du matin, avant que les nuages ne montent. L'Émeraude, c'est un lac de haute altitude dont la couleur est si saturée que la première photo ressemble à un faux. Elle est vraie. Les lacs des Tatras sont verts.",
                "La série s'est construite autour d'une progression verticale : depuis les vallées boisées jusqu'aux crêtes minérales. Cathédrale Verte et La Vallée documentent les premières heures, la forêt qui monte. Miroir Jumeau et L'Émeraude arrivent en altitude, là où la végétation disparaît et où l'eau prend des teintes qu'on n'attendait pas. Équilibre Minéral est la dernière image avant la descente.",
                "Ce que les Tatras ont de particulier, c'est la brutalité du changement de décor. En deux heures de marche, on passe de la forêt de hêtres au granit nu. Il n'y a pas de transition, juste une frontière. L'appareil photo est une bonne raison de s'arrêter devant.",
            ],
            en: [
                "August 2025. Zakopane. Four days hiking in the Tatras with my girlfriend, from the Polish border to the high-altitude lakes. I had a roll of Kodak Gold in the Rollei 35. Nothing else needed when the mountain is there.",
                "Kodak Gold in the mountains, in full summer, produces impossible greens. Not the synthetic greens of digital processing: dense, warm greens, almost brown in places, with visible grain that anchors them in reality. In the Tatras in August, under a sky alternating between storm and sun, this film was exactly right.",
                "We walked six hours a day for four days. Crête Verte is the first view of the massif from the morning trail, before the clouds rose. L'Émeraude is a high-altitude lake whose color is so saturated that the first photograph looks fake. It isn't. The Tatra lakes are green.",
                "The series built itself around a vertical progression: from wooded valleys to mineral ridges. Cathédrale Verte and La Vallée document the first hours, the forest climbing. Miroir Jumeau and L'Émeraude arrive at altitude, where the vegetation disappears and the water takes on colors you didn't expect. Équilibre Minéral is the last image before the descent.",
                "What makes the Tatras particular is the brutality of the scenery change. In two hours of walking, you go from beech forest to bare granite. There's no transition, just a boundary. The camera is a good reason to stop in front of it.",
            ],
        },
        inlinePhotos: [
            {
                src: '/images/polish-hike/the-trees.jpg',
                alt: {
                    fr: 'Cathédrale Verte, sous-bois de hêtres dans les Tatras, lumière filtrée, Kodak Gold',
                    en: 'Cathédrale Verte, beech forest in the Tatras, filtered light, Kodak Gold',
                },
                caption: {
                    fr: 'Cathédrale Verte — Rollei 35 — Kodak Gold',
                    en: 'Cathédrale Verte — Rollei 35 — Kodak Gold',
                },
                orientation: 'landscape',
            },
            {
                src: '/images/polish-hike/the-spot.jpg',
                alt: {
                    fr: "L'Émeraude, lac de haute altitude aux eaux vertes saturées, Tatras, Kodak Gold",
                    en: "L'Émeraude, high-altitude lake with saturated green water, Tatras, Kodak Gold",
                },
                caption: {
                    fr: "L'Émeraude — Rollei 35 — Kodak Gold",
                    en: "L'Émeraude — Rollei 35 — Kodak Gold",
                },
                orientation: 'landscape',
            },
        ],
        film: 'Kodak Gold',
        seriesUrl: '/series/polish-hike',
    },
];
