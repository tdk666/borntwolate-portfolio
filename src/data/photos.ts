export interface LocalizedText { fr: string; en: string; }

export interface Photo {
    id: number;
    url: string;
    title: string;
    category: 'nature' | 'urban' | 'portrait' | 'bnw';
    seriesId?: string;
    technical_info?: string;
    orientation?: 'landscape' | 'portrait';
    alt_accessible?: LocalizedText;
    caption_artistic?: LocalizedText;
}

export interface Series {
    id: string;
    title: string;
    year: string;
    description: LocalizedText;
    coverImage: string;
    photos: Photo[];
    theme?: { background: string; text: string; };
}

export const seriesData: Series[] = [
    {
        id: 'polish-hike',
        title: 'Polish Hike',
        year: 'Août 2025',
        description: {
            fr: "L'appel primitif des Tatras.\n\nUne immersion dans une nature dense et minérale, où le vert des vallées contraste avec la roche brute. Ces images sont des respirations, capturant l'effort de l'ascension et la récompense des sommets, enveloppées dans la chaleur organique de la Kodak Gold.",
            en: "The primal call of the Tatras.\n\nAn immersion into dense, mineral nature, where valley greens contrast with raw rock. These images are breaths, capturing the effort of the ascent and the reward of the summits, wrapped in the organic warmth of Kodak Gold."
        },
        coverImage: '/images/polish-hike/the-lakes.jpg',
        theme: { background: '#1A2F23', text: '#E6DCC3' },
        photos: [
            {
                id: 9604, url: '/images/polish-hike/the-hills.jpg', title: 'Crêtes Vertes', category: 'nature', seriesId: 'polish-hike', technical_info: 'Rollei 35 | Kodak Gold 400', orientation: 'landscape',
                alt_accessible: { fr: "Panorama de collines verdoyantes s'étendant à l'infini sous un ciel nuageux, texture granuleuse.", en: "Panorama of rolling green hills extending infinitely under a cloudy sky, grainy texture." },
                caption_artistic: { fr: "L'ondulation du monde. La Kodak Gold réchauffe ces verts profonds, transformant le paysage en une peinture vivante où chaque crête raconte une histoire géologique ancienne.", en: "The undulation of the world. Kodak Gold warms these deep greens, turning the landscape into a living painting where every ridge tells an ancient geological story." }
            },
            {
                id: 9605, url: '/images/polish-hike/tiny-stonhedge.jpg', title: 'Équilibre Minéral', category: 'nature', seriesId: 'polish-hike', technical_info: 'Rollei 35 | Kodak Gold 400', orientation: 'landscape',
                alt_accessible: { fr: "Empilement délicat de petites pierres en équilibre au premier plan, flou d'arrière-plan sur les montagnes.", en: "Delicate stack of small stones balanced in the foreground, background blur on the mountains." },
                caption_artistic: { fr: "Architecture éphémère. Un cairn minuscule dressé face à l'immensité, marqueur fragile du passage humain. La faible profondeur de champ isole ce monument de poche.", en: "Ephemeral architecture. A tiny cairn standing against the vastness, a fragile marker of human passage. The shallow depth of field isolates this pocket monument." }
            },
            {
                id: 9601, url: '/images/polish-hike/the-lakes.jpg', title: 'Miroirs Jumeaux', category: 'nature', seriesId: 'polish-hike', technical_info: 'Rollei 35 | Kodak Gold 400', orientation: 'landscape',
                alt_accessible: { fr: "Deux lacs de montagne d'un bleu profond nichés au creux d'une vallée rocheuse abrupte.", en: "Two deep blue mountain lakes nestled in the hollow of a steep rocky valley." },
                caption_artistic: { fr: "Les yeux de la montagne. Ces lacs glaciaires capturent le ciel. Le grain de la pellicule ajoute une texture organique à cette minéralité brute, adoucissant la dureté de la roche.", en: "The eyes of the mountain. These glacial lakes capture the sky. The film grain adds an organic texture to this raw minerality, softening the hardness of the rock." }
            },
            {
                id: 9606, url: '/images/polish-hike/the-valley.jpg', title: 'The Valley', category: 'nature', seriesId: 'polish-hike', technical_info: 'Rollei 35 | Kodak Gold 400', orientation: 'landscape',
                alt_accessible: { fr: "Vue plongeante sur une vallée encaissée, sentier sinueux visible en contrebas.", en: "Bird's eye view of a deep valley, winding path visible below." },
                caption_artistic: { fr: "Vertige horizontal. La perspective atmosphérique guide le regard vers le fond de la vallée, là où le silence devient presque audible.", en: "Horizontal vertigo. Atmospheric perspective guides the gaze to the valley floor, where silence becomes almost audible." }
            },
            {
                id: 9602, url: '/images/polish-hike/the-trees.jpg', title: 'Cathédrale Verte', category: 'nature', seriesId: 'polish-hike', technical_info: 'Rollei 35 | Kodak Gold 400', orientation: 'portrait',
                alt_accessible: { fr: "Forêt dense de sapins sombres sur une pente raide, brume légère.", en: "Dense forest of dark fir trees on a steep slope, light mist." },
                caption_artistic: { fr: "Cathédrale verte. Une étude de textures végétales. La répétition des troncs crée un rythme visuel hypnotique, brisé seulement par la lumière filtrant à travers les aiguilles.", en: "Green cathedral. A study of plant textures. The repetition of trunks creates a hypnotic visual rhythm, broken only by light filtering through the needles." }
            },
            {
                id: 9603, url: '/images/polish-hike/the-spot.jpg', title: 'Vallée Secrète', category: 'nature', seriesId: 'polish-hike', technical_info: 'Rollei 35 | Kodak Gold 400', orientation: 'landscape',
                alt_accessible: { fr: "Clairière isolée entourée de pics montagneux, lumière douce de fin de journée.", en: "Isolated clearing surrounded by mountain peaks, soft late-day light." },
                caption_artistic: { fr: "Le refuge mental. Un espace de respiration capturé au sommet de l'effort. La lumière dorée de la fin d'après-midi caresse les sommets.", en: "The mental refuge. A breathing space captured at the peak of effort. The golden late afternoon light caresses the summits." }
            }
        ]
    },
    {
        id: 'white-mounts',
        title: 'White Mounts',
        year: 'Janvier 2025',
        description: {
            fr: "L'hiver vu sous un prisme doux.\n\nContrairement à la rudesse du noir et blanc, cette série explore les tons pastels de la neige et du ciel d'altitude. C'est le récit intime d'une évasion collective, où le froid fige les rires et les souvenirs dans une lumière cotonneuse.",
            en: "Winter seen through a soft prism.\n\nUnlike the harshness of black and white, this series explores the pastel tones of snow and high-altitude sky. It is the intimate tale of a collective escape, where the cold freezes laughter and memories in cottony light."
        },
        coverImage: '/images/white-mounts/like-sugar.jpg',
        theme: { background: '#F0F8FF', text: '#003366' },
        photos: [
            {
                id: 9502, url: '/images/white-mounts/like-sugar.jpg', title: 'Sucre Glace', category: 'nature', seriesId: 'white-mounts', technical_info: 'Rollei 35 | Portra 400', orientation: 'landscape',
                alt_accessible: { fr: "Gros plan sur de la neige poudreuse immaculée, texture douce et brillante.", en: "Close-up on pristine powdery snow, soft and shiny texture." },
                caption_artistic: { fr: "Matière première. La Portra 400 révèle ici toutes les nuances de blanc, transformant la neige en une texture de sucre glace, presque tactile.", en: "Raw material. Portra 400 reveals here all the nuances of white, transforming snow into a powdered sugar texture, almost tactile." }
            },
            {
                id: 9501, url: '/images/white-mounts/cig-man.jpg', title: 'Pause au Sommet', category: 'portrait', seriesId: 'white-mounts', technical_info: 'Rollei 35 | Portra 400', orientation: 'portrait',
                alt_accessible: { fr: "Portrait d'un homme en tenue de ski fumant une cigarette, regardant au loin, ciel bleu.", en: "Portrait of a man in ski gear smoking a cigarette, looking away, blue sky." },
                caption_artistic: { fr: "Pause au sommet. L'attitude désinvolte contraste avec la rigueur du décor. Un instantané de vie, suspendu dans l'air raréfié.", en: "Summit break. The casual attitude contrasts with the rigor of the setting. A snapshot of life, suspended in the rarefied air." }
            },
            {
                id: 9503, url: '/images/white-mounts/the-ascension.jpg', title: "L'Ascension", category: 'nature', seriesId: 'white-mounts', technical_info: 'Rollei 35 | Portra 400', orientation: 'landscape',
                alt_accessible: { fr: "Groupe de skieurs vus de dos remontant une pente enneigée.", en: "Group of skiers seen from behind ascending a snowy slope." },
                caption_artistic: { fr: "L'effort collectif. Les silhouettes se détachent graphiquement sur le fond blanc, rappelant les compositions minimalistes de la photographie d'expédition.", en: "Collective effort. Silhouettes stand out graphically against the white background, recalling the minimalist compositions of expedition photography." }
            },
            {
                id: 9504, url: '/images/white-mounts/carmel-mount.jpg', title: 'Pic Doré', category: 'nature', seriesId: 'white-mounts', technical_info: 'Rollei 35 | Portra 400', orientation: 'landscape',
                alt_accessible: { fr: "Sommet de montagne éclairé par une lumière dorée intense au coucher du soleil.", en: "Mountain peak lit by intense golden light at sunset." },
                caption_artistic: { fr: "L'heure dorée sur la glace. La roche froide s'embrase sous les derniers rayons, créant un contraste chaud-froid saisissant typique de la pellicule argentique.", en: "Golden hour on ice. Cold rock ignites under the last rays, creating a striking warm-cold contrast typical of analog film." }
            },
            {
                id: 9505, url: '/images/white-mounts/cloudy.jpg', title: 'Cimes et Brumes', category: 'nature', seriesId: 'white-mounts', technical_info: 'Rollei 35 | Portra 400', orientation: 'landscape',
                alt_accessible: { fr: "Paysage de montagne où les nuages bas s'accrochent aux sommets, ambiance mystérieuse.", en: "Mountain landscape where low clouds cling to the peaks, mysterious atmosphere." },
                caption_artistic: { fr: "Cimes et Brumes. Quand le ciel et la terre se confondent. Une atmosphère ouatée où les frontières s'effacent dans un gris laiteux.", en: "Peaks and Mists. When sky and earth merge. A cottony atmosphere where boundaries fade into a milky grey." }
            },
            {
                id: 9507, url: '/images/white-mounts/above-the-wall.jpg', title: 'Horizon Blanc', category: 'nature', seriesId: 'white-mounts', technical_info: 'Rollei 35 | Portra 400', orientation: 'landscape',
                alt_accessible: { fr: "Vue depuis une crête, mer de nuages en contrebas, ciel bleu pur au-dessus.", en: "View from a ridge, sea of clouds below, pure blue sky above." },
                caption_artistic: { fr: "Au-dessus du monde. Une sensation de flottement absolu. La ligne d'horizon sépare le tangible de l'éthéré.", en: "Above the world. A sensation of absolute floating. The horizon line separates the tangible from the ethereal." }
            },
            {
                id: 9506, url: '/images/white-mounts/hello-moon.jpg', title: 'Lune Blanche', category: 'nature', seriesId: 'white-mounts', technical_info: 'Rollei 35 | Portra 400', orientation: 'landscape',
                alt_accessible: { fr: "Lune visible en plein jour dans un ciel bleu pâle au-dessus d'une crête enneigée.", en: "Moon visible in broad daylight in a pale blue sky above a snowy ridge." },
                caption_artistic: { fr: "Dialogue céleste. La lune, témoin discret de l'hiver, ajoute une touche de surréalisme à ce paysage diurne.", en: "Celestial dialogue. The moon, a discreet witness of winter, adds a touch of surrealism to this daytime landscape." }
            }
        ]
    },
    {
        id: 'puglia-famiglia',
        title: 'Puglia Famiglia',
        year: 'Août 2024',
        description: {
            fr: "L'été italien dans son absolu.\n\nLa lumière aveuglante du sud de l'Italie rencontre l'émulsion cinématographique de la CineStill. Une série saturée de bleus profonds et de blancs éclatants, qui capture la langueur des après-midis sans fin, l'odeur des pins et la liberté mécanique d'une Vespa.",
            en: "Italian summer in its absolute.\n\nThe blinding light of Southern Italy meets the cinematic emulsion of CineStill. A series saturated with deep blues and brilliant whites, capturing the languor of endless afternoons, the scent of pines, and the mechanical freedom of a Vespa."
        },
        coverImage: '/images/puglia/vespa.jpg',
        theme: { background: '#CFE9F7', text: '#C0392B' },
        photos: [
            {
                id: 9301, url: '/images/puglia/vespa.jpg', title: 'Libertà Rossa', category: 'urban', seriesId: 'puglia-famiglia', technical_info: 'Rollei 35 | CineStill 400D', orientation: 'landscape',
                alt_accessible: { fr: "Scooter Vespa rouge garé contre un mur de pierre blanche, ciel bleu.", en: "Red Vespa scooter parked against a white stone wall, blue sky." },
                caption_artistic: { fr: "Plus qu'un objet, le symbole d'un art de vivre. Le rouge de la carrosserie claque comme un étendard contre la pierre blanche.", en: "More than an object, the symbol of a lifestyle. The red of the bodywork snaps like a flag against the white stone." }
            },
            {
                id: 9305, url: '/images/puglia/ombrello.jpg', title: 'Ombra Estiva', category: 'portrait', seriesId: 'puglia-famiglia', technical_info: 'Rollei 35 | CineStill 400D', orientation: 'portrait',
                alt_accessible: { fr: "Parasol coloré sur une plage italienne, vue en contre-plongée avec ciel bleu intense.", en: "Colorful umbrella on an Italian beach, low angle view with intense blue sky." },
                caption_artistic: { fr: "Ombra Estiva. Géométrie de protection contre le zénith. Le halo typique de la CineStill fait vibrer les rouges du tissu contre l'azur saturé.", en: "Ombra Estiva. Protection geometry against the zenith. The typical CineStill halo makes the fabric reds vibrate against the saturated azure." }
            },
            {
                id: 9304, url: '/images/puglia/le-due-sorelle.jpg', title: 'Le Due Sorelle', category: 'portrait', seriesId: 'puglia-famiglia', technical_info: 'Rollei 35 | CineStill 400D', orientation: 'portrait',
                alt_accessible: { fr: "Deux rochers emblématiques émergeant de la mer turquoise.", en: "Two iconic rocks emerging from the turquoise sea." },
                caption_artistic: { fr: "Les gardiennes de la baie. La mer devient une texture d'huile peinte, les rochers des sculptures éternelles posées sur l'eau.", en: "Guardians of the bay. The sea becomes a painted oil texture, the rocks eternal sculptures resting on the water." }
            },
            {
                id: 9303, url: '/images/puglia/carlota.jpg', title: 'Portrait Solaire', category: 'portrait', seriesId: 'puglia-famiglia', technical_info: 'Rollei 35 | CineStill 400D', orientation: 'portrait',
                alt_accessible: { fr: "Portrait de femme avec chapeau de paille projetant une ombre sur le visage.", en: "Portrait of a woman with a straw hat casting a shadow on her face." },
                caption_artistic: { fr: "L'ombre d'un chapeau de paille découpe le visage, dessinant une géométrie intime sous le soleil de midi.", en: "The shadow of a straw hat cuts across the face, drawing an intimate geometry under the midday sun." }
            },
            {
                id: 9306, url: '/images/puglia/il-salto.jpg', title: 'Le Grand Saut', category: 'portrait', seriesId: 'puglia-famiglia', technical_info: 'Rollei 35 | CineStill 400D', orientation: 'portrait',
                alt_accessible: { fr: "Personne sautant dans l'eau depuis un rocher, figée en l'air.", en: "Person jumping into the water from a rock, frozen in mid-air." },
                caption_artistic: { fr: "L'insouciance figée en plein vol. L'eau devient une surface abstraite, prête à engloutir la chaleur de l'été.", en: "Carefreeness frozen in flight. The water becomes an abstract surface, ready to swallow the summer heat." }
            },
            {
                id: 9302, url: '/images/puglia/problema-della-benzina.jpg', title: 'Problema della Benzina', category: 'urban', seriesId: 'puglia-famiglia', technical_info: 'Rollei 35 | CineStill 400D', orientation: 'landscape',
                alt_accessible: { fr: "Vieille pompe à essence italienne abandonnée ou rustique, lumière dure.", en: "Old abandoned or rustic Italian gas pump, harsh light." },
                caption_artistic: { fr: "Arrêt sur image. L'anecdote de voyage devient esthétique. La banalité d'une panne sèche transformée en souvenir cinématographique.", en: "Freeze frame. The travel anecdote becomes aesthetic. The banality of running out of gas transformed into a cinematic memory." }
            }
        ]
    },
    {
        id: 'retro-mountain',
        title: 'Retro Mountain',
        year: 'Janvier 2024',
        description: {
            fr: "Hommage à l'âge d'or de l'alpinisme.\n\nIci, la montagne n'est pas un terrain de sport, mais un décor graphique en noir et blanc. Le grain prononcé de la Rollei Retro 400S transforme la neige en matière vivante, charbonneuse, effaçant les décennies pour ne laisser que la verticalité et le silence.",
            en: "Homage to the golden age of mountaineering.\n\nHere, the mountain is not a sports ground, but a graphic black and white setting. The pronounced grain of Rollei Retro 400S transforms snow into living, charcoal-like matter, erasing decades to leave only verticality and silence."
        },
        coverImage: '/images/retro-mountain/mountain-retro.jpg',
        theme: { background: '#F0F0F0', text: '#000000' },
        photos: [
            {
                id: 9101, url: '/images/retro-mountain/mountain-retro.jpg', title: 'Le Gardien des Cimes', category: 'portrait', seriesId: 'retro-mountain', technical_info: 'Rollei 35 | Rollei Retro 400S', orientation: 'portrait',
                alt_accessible: { fr: "Skieur solitaire sur une pente enneigée abrupte, noir et blanc contrasté.", en: "Solitary skier on a steep snowy slope, contrasted black and white." },
                caption_artistic: { fr: "Une composition verticale qui défie la gravité. Le skieur devient un trait d'union entre la terre et le ciel.", en: "A vertical composition defying gravity. The skier becomes a hyphen between earth and sky." }
            },
            {
                id: 9104, url: '/images/retro-mountain/lawrence.jpg', title: 'Horizon Blanc', category: 'bnw', seriesId: 'retro-mountain', technical_info: 'Rollei 35 | Rollei Retro 400S', orientation: 'landscape',
                alt_accessible: { fr: "Silhouette masculine marchant dans la neige, horizon lointain.", en: "Male silhouette walking in the snow, distant horizon." },
                caption_artistic: { fr: "L'homme face à l'immensité. Le contraste fort du film noir et blanc gomme les détails pour ne garder que l'essentiel : la silhouette et la pente.", en: "Man facing vastness. The strong contrast of black and white film erases details to keep only the essential: silhouette and slope." }
            },
            {
                id: 9102, url: '/images/retro-mountain/contre-plongée.jpg', title: 'Contre Plongée', category: 'bnw', seriesId: 'retro-mountain', technical_info: 'Rollei 35 | Rollei Retro 400S', orientation: 'landscape',
                alt_accessible: { fr: "Vue en contre-plongée vertigineuse vers le sommet d'une montagne, contrastes forts.", en: "Dizzying low angle view towards a mountain peak, strong contrasts." },
                caption_artistic: { fr: "Écrasante verticalité. Le noir et blanc accentue la dramaturgie de la pente, nous faisant sentir tout petits face au colosse de pierre.", en: "Overwhelming verticality. Black and white makes the slope's dramaturgy sharper, making us feel tiny before the stone colossus." }
            },
            {
                id: 9103, url: '/images/retro-mountain/la-raclette.jpg', title: 'Rituel d\'Altitude', category: 'bnw', seriesId: 'retro-mountain', technical_info: 'Rollei 35 | Rollei Retro 400S', orientation: 'landscape',
                alt_accessible: { fr: "Groupe de personnes partageant un repas en montagne, ambiance conviviale et enfumée.", en: "Group of people sharing a meal in the mountains, convivial and smoky atmosphere." },
                caption_artistic: { fr: "Au-delà du folklore, la capture d'un instant de partage brut, où la fumée et la lumière créent une atmosphère de clair-obscur.", en: "Beyond folklore, capturing a raw moment of sharing, where smoke and light create a chiaroscuro atmosphere." }
            },
            {
                id: 9106, url: '/images/retro-mountain/contemplation.jpg', title: 'Mise en Abyme', category: 'bnw', seriesId: 'retro-mountain', technical_info: 'Rollei 35 | Rollei Retro 400S', orientation: 'landscape',
                alt_accessible: { fr: "Silhouette solitaire assise face à un vaste panorama montagneux.", en: "Solitary silhouette sitting facing a vast mountain panorama." },
                caption_artistic: { fr: "Mise en abyme. L'homme face à la nature, un thème romantique classique revisité par le grain brut de la pellicule.", en: "Mise en abyme. Man facing nature, a classic romantic theme revisited by the raw film grain." }
            },
            {
                id: 9105, url: '/images/retro-mountain/tree-shape.jpg', title: 'Géométrie Naturelle', category: 'bnw', seriesId: 'retro-mountain', technical_info: 'Rollei 35 | Rollei Retro 400S', orientation: 'portrait',
                alt_accessible: { fr: "Arbre isolé couvert de neige, forme sculpturale sombre sur fond blanc.", en: "Isolated snow-covered tree, dark sculptural shape on white background." },
                caption_artistic: { fr: "Calligraphie hivernale. L'arbre nu devient un caractère d'encre tracé sur la page blanche de la montagne.", en: "Winter calligraphy. The bare tree becomes an ink character traced on the mountain's white page." }
            }
        ]
    },
    {
        id: 'winter-in-the-fruit',
        title: 'A Winter in the Fruit',
        year: 'Décembre 2023',
        description: {
            fr: "New York dépouillée de sa frénésie.\n\nCapturée sous la lumière rase de décembre, la métropole de verre et d'acier révèle sa fragilité. Les ombres s'allongent, les briques rougissent, et l'humain devient une silhouette furtive écrasée par la verticalité du mythe américain.",
            en: "New York stripped of its frenzy.\n\nCaptured under December's low light, the metropolis of glass and steel reveals its fragility. Shadows lengthen, bricks redden, and the human becomes a furtive silhouette crushed by the verticality of the American myth."
        },
        coverImage: '/images/ny-winter/empire-state-building.JPG',
        theme: { background: '#D1D5DB', text: '#8B0000' },
        photos: [
            {
                id: 9401, url: '/images/ny-winter/empire-state-building.JPG', title: 'King of Midtown', category: 'urban', seriesId: 'winter-in-the-fruit', technical_info: 'Rollei 35 | Kodak Gold 400', orientation: 'portrait',
                alt_accessible: { fr: "Empire State Building vu d'en bas, ciel bleu clair.", en: "Empire State Building seen from below, clear blue sky." },
                caption_artistic: { fr: "Le colosse de pierre capturé dans sa majesté solitaire, fendant un ciel d'hiver sans nuage.", en: "The stone colossus captured in its solitary majesty, splitting a cloudless winter sky." }
            },
            {
                id: 9402, url: '/images/ny-winter/reading-girl-under-tree.JPG', title: 'Quiet Central', category: 'portrait', seriesId: 'winter-in-the-fruit', technical_info: 'Rollei 35 | Kodak Gold 400', orientation: 'portrait',
                alt_accessible: { fr: "Jeune femme lisant assise au pied d'un arbre gigantesque dans Central Park.", en: "Young woman reading sitting at the foot of a gigantic tree in Central Park." },
                caption_artistic: { fr: "Quiet Central. Une bulle d'intimité dans la mégalopole. L'échelle de l'arbre protège la lectrice, créant une chambre verte au cœur de Manhattan.", en: "Quiet Central. A bubble of intimacy in the megalopolis. The scale of the tree protects the reader, creating a green room in the heart of Manhattan." }
            },
            {
                id: 9403, url: '/images/ny-winter/skyline-by-night.JPG', title: 'Midnight City', category: 'urban', seriesId: 'winter-in-the-fruit', technical_info: 'Rollei 35 | Kodak Gold 400', orientation: 'landscape',
                alt_accessible: { fr: "Vue nocturne de la skyline de Manhattan avec reflets sur l'eau.", en: "Night view of Manhattan skyline with reflections on water." },
                caption_artistic: { fr: "L'électricité de Manhattan se reflète sur l'eau noire de Central Park. Une vibration visuelle presque sonore.", en: "Manhattan's electricity reflects on Central Park's black water. An almost audible visual vibration." }
            },
            {
                id: 9405, url: '/images/ny-winter/central-park.JPG', title: 'Colors of December', category: 'nature', seriesId: 'winter-in-the-fruit', technical_info: 'Rollei 35 | Kodak Gold 400', orientation: 'landscape',
                alt_accessible: { fr: "Paysage de Central Park avec des couleurs automnales tardives et des immeubles en fond.", en: "Central Park landscape with late autumn colors and buildings in background." },
                caption_artistic: { fr: "L'été indien en sursis. Les ors et les rouilles de la végétation luttent une dernière fois contre la grisaille des gratte-ciels.", en: "Indian summer on reprieve. The golds and rusts of vegetation fight one last time against the greyness of skyscrapers." }
            },
            {
                id: 9406, url: '/images/ny-winter/jaguar.JPG', title: 'Fawn in town', category: 'urban', seriesId: 'winter-in-the-fruit', technical_info: 'Rollei 35 | Kodak Gold 400', orientation: 'portrait',
                alt_accessible: { fr: "Détail d'une voiture Jaguar vintage garée dans une rue de New York.", en: "Detail of a vintage Jaguar car parked on a New York street." },
                caption_artistic: { fr: "Fawn in town. Le luxe discret d'une carrosserie anglaise perdue dans la jungle de béton américaine. Reflets métalliques et nostalgie.", en: "Fawn in town. The discreet luxury of English bodywork lost in the American concrete jungle. Metallic reflections and nostalgia." }
            },
            {
                id: 9404, url: '/images/ny-winter/brige-building.JPG', title: 'High Line View', category: 'urban', seriesId: 'winter-in-the-fruit', technical_info: 'Rollei 35 | Kodak Gold 400', orientation: 'portrait',
                alt_accessible: { fr: "Vue architecturale d'un pont reliant deux bâtiments, style industriel.", en: "Architectural view of a bridge connecting two buildings, industrial style." },
                caption_artistic: { fr: "High Line View. L'architecture industrielle réhabilitée. Lignes de fuite et briques rouges, la signature visuelle de Chelsea.", en: "High Line View. Rehabilitated industrial architecture. Vanishing lines and red bricks, Chelsea's visual signature." }
            },
            {
                id: 9407, url: '/images/ny-winter/subway.JPG', title: 'Underground', category: 'urban', seriesId: 'winter-in-the-fruit', technical_info: 'Rollei 35 | Kodak Gold 400', orientation: 'landscape',
                alt_accessible: { fr: "Couloir ou quai de métro new-yorkais désert, symétrie.", en: "Deserted New York subway corridor or platform, symmetry." },
                caption_artistic: { fr: "La beauté clinique et symétrique du métro new-yorkais. Une perspective fuyante vers l'inconnu.", en: "The clinical and symmetrical beauty of the New York subway. A fleeing perspective towards the unknown." }
            }
        ]
    },
    {
        id: 'psychadelic-mtl',
        title: 'Psychadelic MTL',
        year: 'Octobre 2023',
        description: {
            fr: "Montréal passée au travers du miroir.\n\nL'utilisation de la pellicule expérimentale LomoChrome Turquoise fait basculer la réalité dans une dimension onirique. Le ciel s'embrase, la peau se refroidit ; une exploration hallucinatoire de l'urbanité nord-américaine.",
            en: "Montreal through the looking glass.\n\nThe use of experimental LomoChrome Turquoise film shifts reality into a dreamlike dimension. The sky ignites, skin cools; a hallucinatory exploration of North American urbanity."
        },
        coverImage: '/images/psychadelic-mtl/montreal-vis-versa.JPG',
        theme: { background: '#C87533', text: '#003B46' },
        photos: [
            {
                id: 9201, url: '/images/psychadelic-mtl/montreal-vis-versa.JPG', title: 'Monde Inversé', category: 'urban', seriesId: 'psychadelic-mtl', technical_info: 'Rollei 35 | LomoChrome Turquoise', orientation: 'landscape',
                alt_accessible: { fr: "Paysage urbain inversé ou reflet dans l'eau avec teintes turquoise.", en: "Inverted urban landscape or water reflection with turquoise hues." },
                caption_artistic: { fr: "L'architecture familière devient étrangère sous le filtre turquoise. Une ville rêvée plus que vécue.", en: "Familiar architecture becomes foreign under the turquoise filter. A city dreamed more than lived." }
            },
            {
                id: 9202, url: '/images/psychadelic-mtl/kapital-circle.JPG', title: 'Oeil Urbain', category: 'urban', seriesId: 'psychadelic-mtl', technical_info: 'Rollei 35 | LomoChrome Turquoise', orientation: 'portrait',
                alt_accessible: { fr: "Structure circulaire en béton ou architecture ronde, teintes étranges.", en: "Circular concrete structure or round architecture, strange hues." },
                caption_artistic: { fr: "La géométrie du béton transformée en artefact alien par la chimie de la pellicule.", en: "Concrete geometry transformed into an alien artifact by film chemistry." }
            },
            {
                id: 9205, url: '/images/psychadelic-mtl/plots.JPG', title: 'Plots', category: 'urban', seriesId: 'psychadelic-mtl', technical_info: 'Rollei 35 | LomoChrome Turquoise', orientation: 'landscape',
                alt_accessible: { fr: "Cônes de chantier oranges vus à travers un filtre turquoise, rendu étrange.", en: "Orange construction cones seen through a turquoise filter, strange rendering." },
                caption_artistic: { fr: "Signalétique Alien. Les objets les plus banals du quotidien urbain mutent sous l'effet de la chimie LomoChrome.", en: "Alien signage. The most banal objects of urban daily life mutate under the effect of LomoChrome chemistry." }
            },
            {
                id: 9203, url: '/images/psychadelic-mtl/sharp-contrast.JPG', title: 'Sharp Contrast', category: 'urban', seriesId: 'psychadelic-mtl', technical_info: 'Rollei 35 | LomoChrome Turquoise', orientation: 'landscape',
                alt_accessible: { fr: "Bâtiment moderne avec des ombres très marquées et des couleurs inversées.", en: "Modern building with very marked shadows and inverted colors." },
                caption_artistic: { fr: "Géométrie acide. Les ombres ne sont plus noires mais bleues profondes, le soleil devient froid. Une architecture de science-fiction.", en: "Acid geometry. Shadows are no longer black but deep blue, the sun becomes cold. Science fiction architecture." }
            },
            {
                id: 9206, url: '/images/psychadelic-mtl/frvr-in-d-r.JPG', title: 'Forever in the Air', category: 'urban', seriesId: 'psychadelic-mtl', technical_info: 'Rollei 35 | LomoChrome Turquoise', orientation: 'landscape',
                alt_accessible: { fr: "Scène de rue onirique avec des passants flous et des couleurs irréelles.", en: "Dreamlike street scene with blurry passersby and unreal colors." },
                caption_artistic: { fr: "Forever in the Air. Une suspension du temps et de la gravité. L'atmosphère turquoise semble porter les corps, comme si la ville retenait son souffle.", en: "Forever in the Air. A suspension of time and gravity. The turquoise atmosphere seems to carry the bodies, as if the city were holding its breath." }
            },
            {
                id: 9204, url: '/images/psychadelic-mtl/duo-on-cliff.JPG', title: 'Duo on Cliff', category: 'urban', seriesId: 'psychadelic-mtl', technical_info: 'Rollei 35 | LomoChrome Turquoise', orientation: 'landscape',
                alt_accessible: { fr: "Deux silhouettes minuscules au bord d'une falaise ou d'un point de vue urbain.", en: "Two tiny silhouettes at the edge of a cliff or urban viewpoint." },
                caption_artistic: { fr: "Les observateurs. Perchés au bord de la réalité, contemplant une ville qui a changé de couleur.", en: "The observers. Perched on the edge of reality, contemplating a city that has changed color." }
            }
        ]
    },
    {
        id: 'canadian-evasion',
        title: 'Canadian Evasion',
        year: 'Août 2023',
        description: {
            fr: "La route comme destination.\n\nUne traversée de l'immensité québécoise, le long du fleuve Saint-Laurent qui ressemble à la mer. C'est le journal de bord d'une itinérance, capturant la solitude paisible du voyageur face à l'horizon infini.",
            en: "The road as a destination.\n\nA crossing of the Quebec immensity, along the Saint Lawrence River which looks like the sea. It is the logbook of a wandering, capturing the traveler's peaceful solitude facing the infinite horizon."
        },
        coverImage: '/images/canadian-evasion/infinity.JPG',
        theme: { background: '#3C4A57', text: '#F0F4F8' },
        photos: [
            {
                id: 9704, url: '/images/canadian-evasion/intrus.JPG', title: 'Bivouac', category: 'nature', seriesId: 'canadian-evasion', technical_info: 'Rollei 35 | Portra 400', orientation: 'landscape',
                alt_accessible: { fr: "Tente de camping installée dans un paysage sauvage, au crépuscule.", en: "Camping tent pitched in a wild landscape, at twilight." },
                caption_artistic: { fr: "Bivouac. L'intrusion douce de l'homme dans le sauvage. La toile de la tente capte la dernière lumière, lanterne fragile dans la nuit qui vient.", en: "Bivouac. Man's gentle intrusion into the wild. The tent canvas catches the last light, a fragile lantern in the coming night." }
            },
            {
                id: 9701, url: '/images/canadian-evasion/infinity.JPG', title: 'Route Infinie', category: 'nature', seriesId: 'canadian-evasion', technical_info: 'Rollei 35 | Portra 400', orientation: 'landscape',
                alt_accessible: { fr: "Route rectiligne s'étendant à perte de vue dans un paysage canadien plat.", en: "Straight road extending as far as the eye can see in a flat Canadian landscape." },
                caption_artistic: { fr: "Le Ruban. La route nord-américaine par excellence, promesse de liberté et de monotonie hypnotique. Point de fuite absolu.", en: "The Ribbon. The quintessential North American road, promise of freedom and hypnotic monotony. Absolute vanishing point." }
            },
            {
                id: 9703, url: '/images/canadian-evasion/Mirroir-vert.JPG', title: 'Miroir Boréal', category: 'nature', seriesId: 'canadian-evasion', technical_info: 'Rollei 35 | Portra 400', orientation: 'landscape',
                alt_accessible: { fr: "Reflet parfait d'une forêt de conifères dans un lac calme.", en: "Perfect reflection of a coniferous forest in a calm lake." },
                caption_artistic: { fr: "Miroir Boréal. Symétrie parfaite. L'eau immobile du Saint-Laurent double le monde, créant une image Rorschach naturelle.", en: "Boreal Mirror. Perfect symmetry. The still water of the Saint Lawrence doubles the world, creating a natural Rorschach image." }
            },
            {
                id: 9706, url: '/images/canadian-evasion/contemplation.jpg', title: 'Contemplation', category: 'nature', seriesId: 'canadian-evasion', technical_info: 'Rollei 35 | Portra 400', orientation: 'landscape',
                alt_accessible: { fr: "Jeune homme assis de dos regardant le fleuve, ambiance paisible.", en: "Young man sitting with his back turned watching the river, peaceful atmosphere." },
                caption_artistic: { fr: "Pause. Le temps du voyage n'est pas celui de la montre. Un moment de reconnexion face à l'étendue liquide.", en: "Pause. Travel time is not watch time. A moment of reconnection engaging the liquid expanse." }
            },
            {
                id: 9702, url: '/images/canadian-evasion/bout-du-monde.JPG', title: 'Le Saint-Laurent', category: 'nature', seriesId: 'canadian-evasion', technical_info: 'Rollei 35 | Portra 400', orientation: 'landscape',
                alt_accessible: { fr: "Paysage côtier désolé avec du bois flotté et l'immensité de l'eau.", en: "Desolate coastal landscape with driftwood and the immensity of water." },
                caption_artistic: { fr: "Finisterre. Là où la terre renonce et laisse place à l'océan. Textures de bois mort et d'écume salée.", en: "Land's end. Where the land gives up and makes way for the ocean. Textures of dead wood and salty foam." }
            },
            {
                id: 9705, url: '/images/canadian-evasion/autoportrait.JPG', title: 'Face au Large', category: 'portrait', seriesId: 'canadian-evasion', technical_info: 'Rollei 35 | Portra 400', orientation: 'landscape',
                alt_accessible: { fr: "Ombre du photographe projetée sur le sol ou reflet discret.", en: "Shadow of the photographer cast on the ground or discreet reflection." },
                caption_artistic: { fr: "La trace de l'auteur. Affirmer sa présence sans voler la vedette au paysage. Une signature visuelle éphémère.", en: "The author's trace. Asserting presence without stealing the show from the landscape. An ephemeral visual signature." }
            }
        ]
    },
    {
        id: 'rue-des-mauvais-garcons',
        title: 'Rue des Mauvais Garçons',
        year: 'Avril 2023',
        description: {
            fr: "Une étude de l'élégance masculine dans le décor immuable de Paris.\n\nEntre cuir patiné, chromes vintage et architecture haussmannienne, cette série interroge la figure du gentleman moderne. La pellicule Portra 400 adoucit la rigueur de la pierre et fige une nostalgie qui n'a pas d'âge.",
            en: "A study of masculine elegance set against the immutable backdrop of Paris.\n\nBetween patinated leather, vintage chrome, and Haussmannian architecture, this series questions the figure of the modern gentleman. Portra 400 film softens the stone's rigor and freezes an ageless nostalgia."
        },
        coverImage: '/images/mauvais-garcons/gab-moto-debout.jpg',
        theme: {
            background: '#F5F5DC',
            text: '#1A1A1A'
        },
        photos: [
            {
                id: 9001, url: '/images/mauvais-garcons/gab-moto-debout.jpg', title: "L'Attente", category: 'portrait', seriesId: 'rue-des-mauvais-garcons', technical_info: 'Nikon F-301 | Portra 400', orientation: 'landscape',
                alt_accessible: { fr: "Homme élégant et moto vintage", en: "Elegant man and vintage motorcycle" },
                caption_artistic: { fr: "Le dialogue silencieux entre l'homme et la machine, ancré devant la massivité du bois parisien.", en: "The silent dialogue between man and machine, anchored before the massiveness of Parisian wood." }
            },
            {
                id: 9004, url: '/images/mauvais-garcons/gab-bouquin.jpg', title: 'Lecture Urbaine', category: 'portrait', seriesId: 'rue-des-mauvais-garcons', technical_info: 'Nikon F-301 | Portra 400', orientation: 'portrait',
                alt_accessible: { fr: "Homme lisant sur un banc", en: "Man reading on a bench" },
                caption_artistic: { fr: "S'abstraire du tumulte de la ville. Le grain de la pellicule semble ici matérialiser le silence de la concentration.", en: "Withdrawing from the city's tumult. The film grain here seems to materialize the silence of concentration." }
            },
            {
                id: 9005, url: '/images/mauvais-garcons/gab-lampadaire.jpg', title: "L'Heure Bleue", category: 'urban', seriesId: 'rue-des-mauvais-garcons', technical_info: 'Nikon F-301 | Portra 400', orientation: 'portrait',
                alt_accessible: { fr: "Homme sous un lampadaire au crépuscule", en: "Man under a streetlight at twilight" },
                caption_artistic: { fr: "Quand la lumière artificielle commence à lutter avec le crépuscule, révélant la solitude du flâneur.", en: "When artificial light begins to fight with twilight, revealing the stroller's solitude." }
            },
            {
                id: 9002, url: '/images/mauvais-garcons/moto-seine.jpg', title: 'Astor sur Seine', category: 'urban', seriesId: 'rue-des-mauvais-garcons', technical_info: 'Nikon F-301 | Portra 400', orientation: 'landscape',
                alt_accessible: { fr: "Moto vintage garée sur les quais de Seine avec le fleuve en arrière-plan.", en: "Vintage motorcycle parked on the Seine quays with the river in the background." },
                caption_artistic: { fr: "Astor sur Seine. La mécanique au repos. Le chrome de la moto répond aux reflets de l'eau, ancrant la machine dans le paysage parisien.", en: "Astor on Seine. Mechanics at rest. The motorcycle's chrome responds to the water's reflections, anchoring the machine in the Parisian landscape." }
            },
            {
                id: 9003, url: '/images/mauvais-garcons/gab-seine.jpg', title: 'Regard Rive Droite', category: 'portrait', seriesId: 'rue-des-mauvais-garcons', technical_info: 'Nikon F-301 | Portra 400', orientation: 'landscape',
                alt_accessible: { fr: "Portrait d'homme accoudé au parapet des quais, regardant la Seine.", en: "Portrait of a man leaning on the quay parapet, watching the Seine." },
                caption_artistic: { fr: "Regard Rive Droite. La mélancolie du fleuve. Un moment de solitude au cœur de la ville, cadré avec une distance respectueuse.", en: "Right Bank Gaze. The river's melancholy. A moment of solitude in the heart of the city, framed with respectful distance." }
            },
            {
                id: 9006, url: '/images/mauvais-garcons/le-rendez-vous.jpg', title: 'Le Rendez vous', category: 'portrait', seriesId: 'rue-des-mauvais-garcons', technical_info: 'Nikon F-301 | Portra 400', orientation: 'landscape',
                alt_accessible: { fr: "Homme marchant ou attendant au coin d'une rue parisienne typique.", en: "Man walking or waiting at a typical Parisian street corner." },
                caption_artistic: { fr: "L'Incertitude. Est-elle venue ? Est-elle partie ? Une narration ouverte, laissée à l'imagination du spectateur.", en: "Uncertainty. Did she come? Did she leave? An open narrative, left to the viewer's imagination." }
            }
        ]
    }
];

export const photos: Photo[] = seriesData.flatMap(series => series.photos);