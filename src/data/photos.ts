export interface Photo { id: number; url: string; title: string; category: string; seriesId?: string; technical_info?: string; orientation?: 'landscape' | 'portrait'; alt_accessible?: string; caption_artistic?: string; }
export interface Series { id: string; title: string; year: string; description: string; coverImage: string; photos: Photo[]; theme?: { background: string; text: string; }; }

export const seriesData: Series[] = [
    {
        id: 'polish-hike',
        title: 'Polish Hike',
        year: 'Août 2025',
        description: "L'appel de la forêt et des sommets des Tatras.\n\nRandonnée dans une nature brute et minérale, sublimée par le grain chaud de la Kodak Gold 400.",
        coverImage: '/images/polish-hike/the-lakes.jpg',
        theme: { background: '#1A2F23', text: '#E6DCC3' },
        photos: [
            {
                id: 9604,
                url: '/images/polish-hike/the-hills.jpg', // 1. Crêtes Vertes
                title: 'Crêtes Vertes',
                category: 'Nature',
                seriesId: 'polish-hike',
                technical_info: 'Rollei 35 | Kodak Gold 400',
                orientation: 'landscape'
            },
            {
                id: 9605,
                url: '/images/polish-hike/tiny-stonhedge.jpg', // 2. Équilibre Minéral
                title: 'Équilibre Minéral',
                category: 'Nature',
                seriesId: 'polish-hike',
                technical_info: 'Rollei 35 | Kodak Gold 400',
                orientation: 'landscape'
            },
            {
                id: 9601,
                url: '/images/polish-hike/the-lakes.jpg', // 3. Miroirs Jumeaux
                title: 'Miroirs Jumeaux',
                category: 'Nature',
                seriesId: 'polish-hike',
                technical_info: 'Rollei 35 | Kodak Gold 400',
                orientation: 'landscape'
            },
            {
                id: 9606,
                url: '/images/polish-hike/the-valley.jpg', // 4. The Valley
                title: 'The Valley',
                category: 'Nature',
                seriesId: 'polish-hike',
                technical_info: 'Rollei 35 | Kodak Gold 400',
                orientation: 'landscape'
            },
            {
                id: 9602,
                url: '/images/polish-hike/the-trees.jpg', // 5. Cathédrale Verte (Vertical)
                title: 'Cathédrale Verte',
                category: 'Nature',
                seriesId: 'polish-hike',
                technical_info: 'Rollei 35 | Kodak Gold 400',
                orientation: 'portrait'
            },
            {
                id: 9603,
                url: '/images/polish-hike/the-spot.jpg', // 6. Vallée Secrète
                title: 'Vallée Secrète',
                category: 'Nature',
                seriesId: 'polish-hike',
                technical_info: 'Rollei 35 | Kodak Gold 400',
                orientation: 'landscape'
            }
        ]
    },
    {
        id: 'white-mounts',
        title: 'White Mounts',
        year: 'Janvier 2025',
        description: "Amitié, altitude et lumière d'hiver.\n\nUne semaine de glisse et de souvenirs avec la promo de Master, figée sur la douceur et les tons chauds de la Portra 400.",
        coverImage: '/images/white-mounts/like-sugar.jpg',
        theme: { background: '#F0F8FF', text: '#003366' }, // Deep Sky Blue text
        photos: [
            {
                id: 9502,
                url: '/images/white-mounts/like-sugar.jpg',
                title: 'Sucre Glace',
                category: 'Nature',
                seriesId: 'white-mounts',
                technical_info: 'Rollei 35 | Portra 400',
                orientation: 'landscape'
            },
            {
                id: 9501,
                url: '/images/white-mounts/cig-man.jpg',
                title: 'Pause au Sommet',
                category: 'Portrait',
                seriesId: 'white-mounts',
                technical_info: 'Rollei 35 | Portra 400',
                orientation: 'portrait'
            },
            {
                id: 9503,
                url: '/images/white-mounts/the-ascension.jpg',
                title: "L'Ascension",
                category: 'Nature',
                seriesId: 'white-mounts',
                technical_info: 'Rollei 35 | Portra 400',
                orientation: 'landscape'
            },
            {
                id: 9504,
                url: '/images/white-mounts/carmel-mount.jpg',
                title: 'Pic Doré',
                category: 'Nature',
                seriesId: 'white-mounts',
                technical_info: 'Rollei 35 | Portra 400',
                orientation: 'landscape'
            },
            {
                id: 9505,
                url: '/images/white-mounts/cloudy.jpg',
                title: 'Cimes et Brumes',
                category: 'Nature',
                seriesId: 'white-mounts',
                technical_info: 'Rollei 35 | Portra 400',
                orientation: 'landscape'
            },
            {
                id: 9507,
                url: '/images/white-mounts/above-the-wall.jpg', // Moved to 6th (Left)
                title: 'Horizon Blanc',
                category: 'Nature',
                seriesId: 'white-mounts',
                technical_info: 'Rollei 35 | Portra 400',
                orientation: 'landscape'
            },
            {
                id: 9506,
                url: '/images/white-mounts/hello-moon.jpg', // Moved to 7th (Right)
                title: 'Lune Blanche',
                category: 'Nature',
                seriesId: 'white-mounts',
                technical_info: 'Rollei 35 | Portra 400',
                orientation: 'landscape'
            }
        ]
    },
    {
        id: 'puglia-famiglia',
        title: 'Puglia Famiglia',
        year: 'Août 2024',
        description: "L'été italien éternel. Dolce farniente, pierre blanche et mer azur.\n\nSouvenirs de famille capturés avec la chaleur cinématique de la CineStill, entre deux plongeons et une virée en Vespa.",
        coverImage: '/images/puglia/vespa.jpg',
        theme: { background: '#CFE9F7', text: '#C0392B' },
        photos: [
            {
                id: 9301,
                url: '/images/puglia/vespa.jpg',
                title: 'Vespa Rossa',
                category: 'Urbain',
                seriesId: 'puglia-famiglia',
                technical_info: 'Rollei 35 | CineStill 400D',
                orientation: 'landscape'
            },
            {
                id: 9305,
                url: '/images/puglia/ombrello.jpg',
                title: 'Ombra Estiva',
                category: 'Portrait',
                seriesId: 'puglia-famiglia',
                technical_info: 'Rollei 35 | CineStill 400D',
                orientation: 'portrait'
            },
            {
                id: 9304,
                url: '/images/puglia/le-due-sorelle.jpg', // 3. Vertical (Middle Right - under Vespa)
                title: 'Le Due Sorelle',
                category: 'Portrait',
                seriesId: 'puglia-famiglia',
                technical_info: 'Rollei 35 | CineStill 400D',
                orientation: 'portrait'
            },
            {
                id: 9303,
                url: '/images/puglia/carlota.jpg', // 4. Vertical (Middle Left - under Ombrello)
                title: 'Carlota',
                category: 'Portrait',
                seriesId: 'puglia-famiglia',
                technical_info: 'Rollei 35 | CineStill 400D',
                orientation: 'portrait'
            },
            {
                id: 9306,
                url: '/images/puglia/il-salto.jpg', // 5. Vertical (Bottom Left)
                title: 'Il Salto',
                category: 'Portrait',
                seriesId: 'puglia-famiglia',
                technical_info: 'Rollei 35 | CineStill 400D',
                orientation: 'portrait'
            },
            {
                id: 9302,
                url: '/images/puglia/problema-della-benzina.jpg', // 6. Landscape (Bottom Right - under Le Due Sorelle)
                title: 'Problema della Benzina',
                category: 'Urbain',
                seriesId: 'puglia-famiglia',
                technical_info: 'Rollei 35 | CineStill 400D',
                orientation: 'landscape'
            }
        ]
    },
    {
        id: 'retro-mountain',
        title: 'Retro Mountain',
        year: 'Janvier 2024',
        description: "Grain brut, noirs profonds et l'insouciance des sommets.\n\nUne ode à l'esthétique du ski d'antan et aux textures de l'hiver, capturée sur le vif.",
        coverImage: '/images/retro-mountain/mountain-retro.jpg',
        theme: {
            background: '#F0F0F0',
            text: '#000000'
        },
        photos: [
            {
                id: 9101,
                url: '/images/retro-mountain/mountain-retro.jpg', // Vertical (Col 1 Top)
                title: 'Sommets Vintage',
                category: 'Portrait',
                seriesId: 'retro-mountain',
                technical_info: 'Rollei 35 | Rollei Retro 400S',
                orientation: 'portrait'
            },
            {
                id: 9104,
                url: '/images/retro-mountain/lawrence.jpg', // Landscape (Col 2 Top)
                title: 'Lawrence',
                category: 'Noir & Blanc',
                seriesId: 'retro-mountain',
                technical_info: 'Rollei 35 | Rollei Retro 400S',
                orientation: 'landscape'
            },
            {
                id: 9102,
                url: '/images/retro-mountain/contre-plongée.jpg', // Landscape (Col 2 Middle)
                title: 'Contre Plongée',
                category: 'Noir & Blanc',
                seriesId: 'retro-mountain',
                technical_info: 'Rollei 35 | Rollei Retro 400S',
                orientation: 'landscape'
            },
            {
                id: 9103,
                url: '/images/retro-mountain/la-raclette.jpg', // Landscape (Col 2 Middle)
                title: 'Tradition Fondante',
                category: 'Noir & Blanc',
                seriesId: 'retro-mountain',
                technical_info: 'Rollei 35 | Rollei Retro 400S',
                orientation: 'landscape'
            },
            {
                id: 9106,
                url: '/images/retro-mountain/contemplation.jpg', // Landscape (Col 1 Bottom)
                title: 'Mise en Abyme',
                category: 'Noir & Blanc',
                seriesId: 'retro-mountain',
                technical_info: 'Rollei 35 | Rollei Retro 400S',
                orientation: 'landscape'
            },
            {
                id: 9105,
                url: '/images/retro-mountain/tree-shape.jpg', // Vertical Tree (Col 2 Bottom - Hopefully!)
                title: 'Géométrie Naturelle',
                category: 'Noir & Blanc',
                seriesId: 'retro-mountain',
                technical_info: 'Rollei 35 | Rollei Retro 400S',
                orientation: 'portrait'
            }
        ]
    },
    {
        id: 'winter-in-the-fruit',
        title: 'A Winter in the Fruit',
        year: 'Décembre 2023',
        description: "La Grosse Pomme endormie sous le froid de décembre.\n\nLumière dorée rase, briques rouges et ombres bleutées : l'hiver new-yorkais capturé à l'argentique.",
        coverImage: '/images/ny-winter/empire-state-building.JPG',
        theme: { background: '#D1D5DB', text: '#8B0000' },
        photos: [
            {
                id: 9401,
                url: '/images/ny-winter/empire-state-building.JPG', // 1. Vertical (Top Left)
                title: 'King of Midtown',
                category: 'Urbain',
                seriesId: 'winter-in-the-fruit',
                technical_info: 'Rollei 35 | Kodak Gold 400',
                orientation: 'portrait'
            },
            {
                id: 9402,
                url: '/images/ny-winter/reading-girl-under-tree.JPG', // 2. Vertical (Top Right)
                title: 'Quiet Central',
                category: 'Portrait',
                seriesId: 'winter-in-the-fruit',
                technical_info: 'Rollei 35 | Kodak Gold 400',
                orientation: 'portrait'
            },
            {
                id: 9403,
                url: '/images/ny-winter/skyline-by-night.JPG', // 3. Landscape (Middle Left)
                title: 'Midnight City',
                category: 'Urbain',
                seriesId: 'winter-in-the-fruit',
                technical_info: 'Rollei 35 | Kodak Gold 400',
                orientation: 'landscape'
            },
            {
                id: 9405,
                url: '/images/ny-winter/central-park.JPG', // 4. Landscape (Middle Right)
                title: 'Colors of December',
                category: 'Nature',
                seriesId: 'winter-in-the-fruit',
                technical_info: 'Rollei 35 | Kodak Gold 400',
                orientation: 'landscape'
            },
            {
                id: 9406,
                url: '/images/ny-winter/jaguar.JPG', // 5. Vertical (Bottom Left)
                title: 'Fawn in town',
                category: 'Urbain',
                seriesId: 'winter-in-the-fruit',
                technical_info: 'Rollei 35 | Kodak Gold 400',
                orientation: 'portrait'
            },
            {
                id: 9404,
                url: '/images/ny-winter/brige-building.JPG', // 6. Vertical (Bottom Right)
                title: 'High Line View',
                category: 'Urbain',
                seriesId: 'winter-in-the-fruit',
                technical_info: 'Rollei 35 | Kodak Gold 400',
                orientation: 'portrait'
            },
            {
                id: 9407,
                url: '/images/ny-winter/subway.JPG', // 7. The New Addition (Bottom Right target)
                title: 'Underground',
                category: 'Urbain',
                seriesId: 'winter-in-the-fruit',
                technical_info: 'Rollei 35 | Kodak Gold 400',
                orientation: 'landscape'
            }
        ]
    },
    {
        id: 'psychadelic-mtl',
        title: 'Psychadelic MTL',
        year: 'Octobre 2023',
        description: "Une réalité alternative où le ciel s'embrase et la ville vire au bleu.\n\nMontréal passée au filtre de la pellicule LomoChrome Turquoise, révélant une dimension parallèle vibrante et onirique.",
        coverImage: '/images/psychadelic-mtl/montreal-vis-versa.JPG',
        theme: { background: '#C87533', text: '#003B46' },
        photos: [
            {
                id: 9201,
                url: '/images/psychadelic-mtl/montreal-vis-versa.JPG',
                title: 'Vis Versa',
                category: 'Urbain',
                seriesId: 'psychadelic-mtl',
                technical_info: 'Rollei 35 | LomoChrome Turquoise',
                orientation: 'landscape'
            },
            {
                id: 9202,
                url: '/images/psychadelic-mtl/kapital-circle.JPG',
                title: 'Kapital Circle',
                category: 'Urbain',
                seriesId: 'psychadelic-mtl',
                technical_info: 'Rollei 35 | LomoChrome Turquoise',
                orientation: 'portrait'
            },
            {
                id: 9205,
                url: '/images/psychadelic-mtl/plots.JPG',
                title: 'Plots',
                category: 'Urbain',
                seriesId: 'psychadelic-mtl',
                technical_info: 'Rollei 35 | LomoChrome Turquoise',
                orientation: 'landscape'
            },
            {
                id: 9203,
                url: '/images/psychadelic-mtl/sharp-contrast.JPG',
                title: 'Sharp Contrast',
                category: 'Urbain',
                seriesId: 'psychadelic-mtl',
                technical_info: 'Rollei 35 | LomoChrome Turquoise',
                orientation: 'landscape'
            },
            {
                id: 9206,
                url: '/images/psychadelic-mtl/frvr-in-d-r.JPG',
                title: 'Forever in Dream',
                category: 'Urbain',
                seriesId: 'psychadelic-mtl',
                technical_info: 'Rollei 35 | LomoChrome Turquoise',
                orientation: 'landscape'
            },
            {
                id: 9204,
                url: '/images/psychadelic-mtl/duo-on-cliff.JPG',
                title: 'Duo on Cliff',
                category: 'Urbain',
                seriesId: 'psychadelic-mtl',
                technical_info: 'Rollei 35 | LomoChrome Turquoise',
                orientation: 'landscape'
            }
        ]
    },
    {
        id: 'canadian-evasion',
        title: 'Canadian Evasion',
        year: 'Août 2023',
        description: "12 jours de marche et de pouce le long du Saint-Laurent.\n\nL'immensité québécoise, le bitume infini et la liberté du sac à dos, capturés à la Portra 400.",
        coverImage: '/images/canadian-evasion/infinity.JPG',
        theme: { background: '#3C4A57', text: '#F0F4F8' },
        photos: [
            {
                id: 9704,
                url: '/images/canadian-evasion/intrus.JPG', // 1. Bivouac
                title: 'Bivouac',
                category: 'Nature',
                seriesId: 'canadian-evasion',
                technical_info: 'Rollei 35 | Portra 400',
                orientation: 'landscape'
            },
            {
                id: 9701,
                url: '/images/canadian-evasion/infinity.JPG', // 2. Route Infinie
                title: 'Route Infinie',
                category: 'Nature',
                seriesId: 'canadian-evasion',
                technical_info: 'Rollei 35 | Portra 400',
                orientation: 'landscape'
            },
            {
                id: 9703,
                url: '/images/canadian-evasion/Mirroir-vert.JPG', // 3. Miroir Boréal
                title: 'Miroir Boréal',
                category: 'Nature',
                seriesId: 'canadian-evasion',
                technical_info: 'Rollei 35 | Portra 400',
                orientation: 'landscape'
            },
            {
                id: 9706,
                url: '/images/canadian-evasion/contemplation.jpg', // 4. Contemplation
                title: 'Contemplation',
                category: 'Lifestyle',
                seriesId: 'canadian-evasion',
                technical_info: 'Rollei 35 | Portra 400',
                orientation: 'landscape'
            },
            {
                id: 9702,
                url: '/images/canadian-evasion/bout-du-monde.JPG', // 5. Le Saint-Laurent
                title: 'Le Saint-Laurent',
                category: 'Nature',
                seriesId: 'canadian-evasion',
                technical_info: 'Rollei 35 | Portra 400',
                orientation: 'landscape'
            },
            {
                id: 9705,
                url: '/images/canadian-evasion/autoportrait.JPG', // 6. Face au Large
                title: 'Face au Large',
                category: 'Portrait',
                seriesId: 'canadian-evasion',
                technical_info: 'Rollei 35 | Portra 400',
                orientation: 'landscape'
            }
        ]
    },
    {
        id: 'rue-des-mauvais-garcons',
        title: 'Rue des Mauvais Garçons',
        year: 'Avril 2023',
        description: "Une élégance intemporelle, entre mécanique vintage et flânerie parisienne.\n\nLe portrait d'un gentleman moderne capturé dans la lumière douce de la capitale.",
        coverImage: '/images/mauvais-garcons/gab-moto-debout.jpg',
        theme: {
            background: '#F5F5DC',
            text: '#1A1A1A'
        },
        photos: [
            {
                id: 9001,
                url: '/images/mauvais-garcons/gab-moto-debout.jpg', // 1. L'Attente
                title: "L'Attente",
                category: 'Portrait',
                seriesId: 'rue-des-mauvais-garcons',
                technical_info: 'Nikon F-301 | Portra 400',
                orientation: 'landscape'
            },
            {
                id: 9004,
                url: '/images/mauvais-garcons/gab-bouquin.jpg', // 2. Lecture Urbaine
                title: 'Lecture Urbaine',
                category: 'Portrait',
                seriesId: 'rue-des-mauvais-garcons',
                technical_info: 'Nikon F-301 | Portra 400',
                orientation: 'portrait'
            },
            {
                id: 9005,
                url: '/images/mauvais-garcons/gab-lampadaire.jpg', // 3. L'Heure Bleue
                title: "L'Heure Bleue",
                category: 'Urbain',
                seriesId: 'rue-des-mauvais-garcons',
                technical_info: 'Nikon F-301 | Portra 400',
                orientation: 'portrait'
            },
            {
                id: 9002,
                url: '/images/mauvais-garcons/moto-seine.jpg', // 4. Astor sur Seine
                title: 'Astor sur Seine',
                category: 'Urbain',
                seriesId: 'rue-des-mauvais-garcons',
                technical_info: 'Nikon F-301 | Portra 400',
                orientation: 'landscape'
            },
            {
                id: 9003,
                url: '/images/mauvais-garcons/gab-seine.jpg', // 5. Regard Rive Droite
                title: 'Regard Rive Droite',
                category: 'Portrait',
                seriesId: 'rue-des-mauvais-garcons',
                technical_info: 'Nikon F-301 | Portra 400',
                orientation: 'landscape'
            },
            {
                id: 9006,
                url: '/images/mauvais-garcons/le-rendez-vous.jpg', // 6. Le Rendez vous
                title: 'Le Rendez vous',
                category: 'Portrait',
                seriesId: 'rue-des-mauvais-garcons',
                technical_info: 'Nikon F-301 | Portra 400',
                orientation: 'landscape'
            }
        ]
    }
];

export const photos: Photo[] = seriesData.flatMap(series => series.photos);
