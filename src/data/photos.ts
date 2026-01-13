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
            fr: "Thollon-les-Mémises, Janvier 2024. L’hiver alpin se révèle ici sous un jour purement graphique. L'objectif n'est pas de documenter le ski, mais de saisir l'esthétique du silence blanc. Capturée à la Rollei Retro 400S, la série exploite un grain puissant, quasi charbonneux, qui affronte la lumière crue de la neige dans un duel sans nuance. Au cœur de ce décor minimaliste, une silhouette à l'allure anachronique semble flotter hors du temps. Une étude où le noir et le blanc cessent d'être des couleurs pour devenir des matières brutes.",
            en: "Thollon-les-Mémises, January 2024. Alpine winter reveals itself here in a purely graphic light. The goal is not to document skiing, but to capture the aesthetic of white silence. Captured on Rollei Retro 400S, the series exploits a powerful, almost charcoal-like grain that confronts the raw light of snow in a nuanceless duel. At the heart of this minimalist setting, an anachronistic-looking silhouette seems to float out of time. A study where black and white cease to be colors to become raw materials."
        },
        coverImage: '/images/retro-mountain/mountain-retro.jpg',
        theme: { background: '#F0F0F0', text: '#000000' },
        photos: [
            {
                id: 9101, url: '/images/retro-mountain/mountain-retro.jpg', title: 'Le Gardien des Cimes', category: 'portrait', seriesId: 'retro-mountain', technical_info: 'Rollei 35 | Rollei Retro 400S', orientation: 'portrait',
                alt_accessible: { fr: "Skieur solitaire debout de trois-quarts dans la neige, regardant l'horizon, noir et blanc contrasté.", en: "Solitary skier standing three-quarters in the snow, looking at the horizon, contrasted black and white." },
                caption_artistic: { fr: "Le Gardien des Cimes. Dans cette composition verticale d'une netteté absolue, le sujet s'impose au centre de l'image tel une sentinelle des hauteurs. De trois-quarts, le regard fixé vers l'horizon hors-champ, il adopte une posture statuaire, un genou fléchi ancrant sa présence dans la poudreuse. L'image est construite sur une géométrie rigoureuse : les lignes verticales des skis s'élancent vers un ciel qui se confond avec la neige. Le noir profond du pantalon et la texture du gilet en laine se détachent violemment sur le blanc immaculé, transformant une simple halte sur les pistes en une scène mythologique.", en: "The Guardian of the Peaks. In this vertical composition of absolute sharpness, the subject imposes himself in the center of the image like a sentinel of the heights. Three-quarters, gaze fixed towards the off-screen horizon, he adopts a statuesque posture, one knee bent anchoring his presence in the powder. The image is built on rigorous geometry: the vertical lines of skis soar towards a sky that merges with the snow. The deep black of the trousers and the texture of the wool vest stand out violently against the pristine white, transforming a simple stop on the slopes into a mythological scene." }
            },
            {
                id: 9104, url: '/images/retro-mountain/lawrence.jpg', title: "Lawrence d'Hiver", category: 'bnw', seriesId: 'retro-mountain', technical_info: 'Rollei 35 | Rollei Retro 400S', orientation: 'landscape',
                alt_accessible: { fr: "Silhouette sombre de profil avec turban sur un balcon surplombant un paysage brumeux.", en: "Dark profile silhouette with turban on a balcony overlooking a misty landscape." },
                caption_artistic: { fr: "Lawrence d'Hiver. Capturée depuis un balcon surplombant le Lac Léman, cette photographie horizontale bascule dans l'onirisme. Le sujet, relégué sur le flanc gauche, est réduit à l'état de silhouette d'encre par un contre-jour radical. De cette ombre chinoise ne subsistent que les contours d'un profil barbu et d'un turban inattendu, convoquant l'imaginaire de Lawrence d'Arabie au cœur des Alpes. Le reste de l'image est une étude de textures où la cime noire des sapins semble flotter sur une mer de brume et de dégradés de gris.", en: "Winter Lawrence. Captured from a balcony overlooking Lake Geneva, this horizontal photograph tips into dreamlike quality. The subject, relegated to the left flank, is reduced to an ink silhouette by radical backlighting. From this shadow puppet show remain only the contours of a bearded profile and an unexpected turban, summoning the imagery of Lawrence of Arabia in the heart of the Alps. The rest of the image is a study of textures where the black tops of fir trees seem to float on a sea of mist and shades of gray." }
            },
            {
                id: 9102, url: '/images/retro-mountain/contre-plongée.jpg', title: "L'Observatoire", category: 'bnw', seriesId: 'retro-mountain', technical_info: 'Rollei 35 | Rollei Retro 400S', orientation: 'landscape',
                alt_accessible: { fr: "Homme assis les jambes dans le vide sur un toit en béton, vu en contre-plongée avec montagnes en fond.", en: "Man sitting legs dangling on a concrete roof, low angle view with mountains in background." },
                caption_artistic: { fr: "L'Observatoire. Cette photographie horizontale est une leçon de géométrie. Le sujet trône au bord d'une structure cubique, un toit de garage transformé en piédestal brut. La prise de vue en contre-plongée inverse les rapports de force : assis les pieds dans le vide, il domine l'objectif d'un regard insondable. L'arrière-plan construit une scène théâtrale où les courbes organiques des montagnes sont brutalement tranchées par la ligne rigide du béton, isolant cette figure solitaire entre la banalité humaine et l'immensité des cimes.", en: "The Observatory. This horizontal photograph is a geometry lesson. The subject sits on the edge of a cubic structure, a garage roof transformed into a raw pedestal. The low-angle shot reverses power dynamics: sitting with feet in the void, he dominates the lens with an inscrutable gaze. The background builds a theatrical scene where organic mountain curves are brutally sliced by the rigid concrete line, isolating this solitary figure between human banality and the vastness of the peaks." }
            },
            {
                id: 9103, url: '/images/retro-mountain/la-raclette.jpg', title: "Le Rituel", category: 'bnw', seriesId: 'retro-mountain', technical_info: 'Rollei 35 | Rollei Retro 400S', orientation: 'landscape',
                alt_accessible: { fr: "Plan rapproché d'un repas de raclette avec appareil photo vintage au premier plan.", en: "Close-up of a raclette meal with vintage camera in foreground." },
                caption_artistic: { fr: "Le Rituel. Rompant avec la majesté froide des extérieurs, cette scène d'intérieur plonge le spectateur dans l'intimité du vieux chalet. L'utilisation du flash direct sculpte l'image avec une brutalité esthétique assumée : au premier plan, la demi-meule de fromage devient un bloc de matière minérale. La composition est dictée par l'appareil vintage qui barre la diagonale, laissant surgir Amaury dans l'interstice. Une célébration sans filtre de la convivialité alpine, transformant un repas traditionnel en une nature morte vivante.", en: "The Ritual. Breaking with the cold majesty of exteriors, this interior scene plunges the viewer into the intimacy of the old chalet. The use of direct flash sculpts the image with assumed aesthetic brutality: in the foreground, the half-wheel of cheese becomes a block of mineral matter. The composition is dictated by the vintage camera barring the diagonal, letting Amaury emerge in the gap. An unfiltered celebration of Alpine conviviality, transforming a traditional meal into a living still life." }
            },
            {
                id: 9106, url: '/images/retro-mountain/contemplation.jpg', title: 'Mise en Abyme', category: 'bnw', seriesId: 'retro-mountain', technical_info: 'Rollei 35 | Rollei Retro 400S', orientation: 'landscape',
                alt_accessible: { fr: "Appareil photo Nikon posé sur une rambarde givrée face à un panorama flou de montagnes.", en: "Nikon camera resting on a frosted railing facing a blurred mountain panorama." },
                caption_artistic: { fr: "Mise en Abyme. Radicale, cette photographie rompt avec la quête obsessionnelle de la netteté pour explorer l'esthétique de l'effacement. Posé sur une rambarde givrée face aux sommets suisses, un boîtier Nikon — l'outil même du regard — devient ici l'objet regardé. Le traitement est pictural, presque impressionniste, noyant la scène dans un flou artistique volontaire. Ce n'est plus un appareil photo, c'est le souvenir d'une prise de vue, une trace visuelle qui s'évapore dans l'atmosphère hivernale.", en: "Mise en Abyme. Radical, this photograph breaks with the obsessive quest for sharpness to explore the aesthetic of erasure. Resting on a frosted railing facing Swiss peaks, a Nikon camera — the very tool of vision — becomes here the viewed object. The treatment is pictorial, almost impressionist, drowning the scene in voluntary artistic blur. It is no longer a camera, it is the memory of a shot, a visual trace evaporating into the winter atmosphere." }
            },
            {
                id: 9105, url: '/images/retro-mountain/tree-shape.jpg', title: 'Géométrie Naturelle', category: 'bnw', seriesId: 'retro-mountain', technical_info: 'Rollei 35 | Rollei Retro 400S', orientation: 'portrait',
                alt_accessible: { fr: "Silhouette noire d'un arbre au premier plan encadrant des montagnes enneigées lumineuses.", en: "Black silhouette of a tree in foreground framing bright snowy mountains." },
                caption_artistic: { fr: "Géométrie Naturelle. Clôturant cette série, cette composition verticale abandonne la figure humaine pour se concentrer sur la structure du paysage. L'image est construite comme une estampe : le premier plan, d'un noir d'encre, sature la partie droite d'une végétation ciselée dont la netteté est presque coupante. Ce cadre organique sombre ouvre une fenêtre sur les sommets suisses d'une clarté cristalline. C’est une étude sur la profondeur où la lumière et l'ombre dessinent les formes brutes de la montagne.", en: "Natural Geometry. Closing this series, this vertical composition abandons the human figure to focus on the landscape structure. The image is built like a print: the foreground, ink black, saturates the right part with chiseled vegetation whose sharpness is almost cutting. This dark organic frame opens a window onto crystal clear Swiss peaks. It is a study on depth where light and shadow draw the mountain's raw forms." }
            }
        ]
    },
    {
        id: 'winter-in-the-fruit',
        title: 'A Winter in the Fruit',
        year: 'Décembre 2023',
        description: {
            fr: "Décembre 2023. Premier pas sur le continent américain. New York ne se découvre pas, elle se confronte. Cette série documente le choc initial face à la verticalité absolue de Manhattan. Sous un soleil d'hiver rasant qui découpe les ombres au scalpel, la ville se révèle dans ses contrastes : la froideur minérale des gratte-ciels, le silence végétal de Central Park et la chaleur souterraine du métro. Le grain chaud de la Kodak Gold 400 capture l'esthétique brute de la métropole, figée dans l'air glacé, entre mythe cinématographique et réalité de béton.",
            en: "December 2023. First steps on the American continent. New York is not discovered, it is confronted. This series documents the initial shock of Manhattan's absolute verticality. Under a grazing winter sun that cuts shadows with a scalpel, the city reveals itself in its contrasts: the mineral coldness of skyscrapers, the vegetable silence of Central Park, and the subterranean heat of the subway. The warm grain of Kodak Gold 400 captures the metropolis's raw aesthetic, frozen in icy air, between cinematic myth and concrete reality."
        },
        coverImage: '/images/winter-in-the-fruit/empire-state.jpg',
        theme: { background: '#D1D5DB', text: '#8B0000' },
        photos: [
            {
                id: 9401,
                url: '/images/winter-in-the-fruit/empire-state.jpg',
                title: 'King of Midtown',
                category: 'urban',
                seriesId: 'winter-in-the-fruit',
                technical_info: 'Rollei 35 | Kodak Gold 400',
                orientation: 'portrait',
                alt_accessible: {
                    fr: "Empire State Building vu en contre-plongée, fendant un ciel bleu pâle.",
                    en: "Empire State Building seen from a low angle, splitting a pale blue sky."
                },
                caption_artistic: {
                    fr: "L'icône absolue. L'Empire State Building ne se contente pas d'être dans le cadre, il le règne. Pris en contre-plongée, le colosse s'élance depuis l'ombre urbaine pour percer un ciel d'hiver bleu pâle. Le grain de la pellicule nimbe le gratte-ciel d'un halo presque irréel, détachant sa silhouette Art Déco de la grisaille. Le 'Roi de Midtown' écrase la ville sombre à ses pieds pour capter toute la lumière.",
                    en: "The absolute icon. The Empire State Building is not just in the frame, it reigns over it. Taken from a low angle, the colossus soars from the urban shadow to pierce a pale blue winter sky. The film grain halos the skyscraper in an almost unreal aura, detaching its Art Deco silhouette from the greyness. The 'King of Midtown' crushes the dark city at its feet to capture all the light."
                }
            },
            {
                id: 9402,
                url: '/images/winter-in-the-fruit/central-park-reading.jpg',
                title: 'Quiet Central',
                category: 'portrait',
                seriesId: 'winter-in-the-fruit',
                technical_info: 'Rollei 35 | Kodak Gold 400',
                orientation: 'portrait',
                alt_accessible: {
                    fr: "Femme lisant au pied d'un arbre dans Central Park, avec des tours en arrière-plan.",
                    en: "Woman reading at the foot of a tree in Central Park, with towers in the background."
                },
                caption_artistic: {
                    fr: "Central Park, flanc Est. Dans cette composition verticale, la ville et la nature jouent leur éternel duel. Au premier plan, l'herbe d'hiver offre un refuge à une lectrice solitaire, minuscule point de quiétude à l'ombre d'un arbre dénudé. En arrière-plan, deux tours montent la garde, monolithiques sous un azur sans nuage. Une bulle d'intimité volée au pied des géants de béton.",
                    en: "Central Park, East side. In this vertical composition, the city and nature play their eternal duel. In the foreground, winter grass offers a refuge to a solitary reader, a tiny point of quietude in the shadow of a bare tree. In the background, two towers stand guard, monolithic under a cloudless azure. A bubble of stolen intimacy at the feet of concrete giants."
                }
            },
            {
                id: 9403,
                url: '/images/winter-in-the-fruit/central-park-night.jpg',
                title: 'Midnight City',
                category: 'urban',
                seriesId: 'winter-in-the-fruit',
                technical_info: 'Rollei 35 | Kodak Gold 400',
                orientation: 'landscape',
                alt_accessible: {
                    fr: "Vue nocturne des gratte-ciels se reflétant dans le lac de Central Park.",
                    en: "Night view of skyscrapers reflecting in the Central Park lake."
                },
                caption_artistic: {
                    fr: "Crépuscule sur le lac. La ville qui ne dort jamais commence à s'illuminer, se reflétant dans l'eau sombre comme un égaliseur graphique. Au premier plan, des roseaux se dressent, nets et fragiles, répondant par leur verticalité naturelle aux tours d'acier qui griffent le ciel violet. Une frontière d'ombre entre le silence de l'eau et le fracas de la ville.",
                    en: "Twilight on the lake. The city that never sleeps begins to light up, reflecting in the dark water like a graphic equalizer. In the foreground, reeds stand tall, sharp and fragile, responding with their natural verticality to the steel towers scratching the purple sky. A shadow border between the silence of the water and the city's crash."
                }
            },
            {
                id: 9405,
                url: '/images/winter-in-the-fruit/central-park-day.jpg',
                title: 'Colors of December',
                category: 'nature',
                seriesId: 'winter-in-the-fruit',
                technical_info: 'Rollei 35 | Kodak Gold 400',
                orientation: 'landscape',
                alt_accessible: {
                    fr: "Plan d'eau de Central Park avec des canards, arbres nus et bâtiments au loin.",
                    en: "Central Park water body with ducks, bare trees and buildings in the distance."
                },
                caption_artistic: {
                    fr: "Lendemain matin. Prise en légère plongée, la composition oppose l'azur pâle du ciel d'hiver au bleu profond du lac. La surface de l'eau n'est troublée que par le sillage de deux canards. La ceinture d'arbres squelettiques retient une dernière touche d'automne, tandis que les toits de la ville émergent au loin. Une nature morte paisible où les promeneurs se fondent dans le décor.",
                    en: "The next morning. Taken from a slight high angle, the composition opposes the pale azure of the winter sky to the deep blue of the lake. The water surface is disturbed only by the wake of two ducks. The belt of skeletal trees holds a last touch of autumn, while the city roofs emerge in the distance. A peaceful still life where walkers blend into the scenery."
                }
            },
            {
                id: 9406,
                url: '/images/winter-in-the-fruit/jaguar-soho.jpg',
                title: 'Fawn in Town',
                category: 'urban',
                seriesId: 'winter-in-the-fruit',
                technical_info: 'Rollei 35 | Kodak Gold 400',
                orientation: 'portrait',
                alt_accessible: {
                    fr: "Jaguar bleue garée dans une rue pavée de SoHo.",
                    en: "Blue Jaguar parked on a cobbled street in SoHo."
                },
                caption_artistic: {
                    fr: "SoHo. Dans un écrin de briques et de pavés, surgit une anomalie chromatique : une Jaguar d'un bleu azur éclatant. Cadrée serrée à la verticale, elle est capturée de trois-quarts arrière. Telle une bête sauvage en cage — un 'fauve' (Fawn) urbain — la machine attend patiemment, sa couleur électrique tranchant avec la patine ocre du quartier.",
                    en: "SoHo. In a setting of bricks and cobblestones, a chromatic anomaly arises: a Jaguar of striking azure blue. Framed tightly vertically, it is captured from the rear three-quarters. Like a wild beast in a cage — an urban 'Fawn' — the machine waits patiently, its electric color slicing through the neighborhood's ochre patina."
                }
            },
            {
                id: 9404,
                url: '/images/winter-in-the-fruit/highline-taxi.jpg',
                title: 'High Line View',
                category: 'urban',
                seriesId: 'winter-in-the-fruit',
                technical_info: 'Rollei 35 | Kodak Gold 400',
                orientation: 'portrait',
                alt_accessible: {
                    fr: "Vue en plongée depuis la High Line sur une avenue, avec un taxi jaune.",
                    en: "High angle view from the High Line onto an avenue, with a yellow taxi."
                },
                caption_artistic: {
                    fr: "Vue depuis la High Line. Une plongée vertigineuse dans les canyons de Chelsea. La composition est verrouillée par une passerelle Art Déco qui relie les deux façades. Au fond, le soleil couchant brûle l'horizon. Sur le bitume gris, un unique taxi jaune — touche de couleur saturée — remonte l'avenue vers l'objectif. Une symétrie urbaine parfaite.",
                    en: "View from the High Line. A dizzying dive into the canyons of Chelsea. The composition is locked by an Art Deco bridge connecting the two facades. In the background, the setting sun burns the horizon. On the gray asphalt, a single yellow taxi — a touch of saturated color — drives up the avenue towards the lens. A perfect urban symmetry."
                }
            },
            {
                id: 9407,
                url: '/images/winter-in-the-fruit/underground.jpg',
                title: 'Underground',
                category: 'urban',
                seriesId: 'winter-in-the-fruit',
                technical_info: 'Rollei 35 | Kodak Gold 400',
                orientation: 'landscape',
                alt_accessible: {
                    fr: "Intérieur d'un wagon de métro new-yorkais vide avec éclairage au néon.",
                    en: "Interior of an empty New York subway car with neon lighting."
                },
                caption_artistic: {
                    fr: "Plongée dans les entrailles de la ville. L'objectif capture le silence électrique d'une rame de métro déserte. Baigné dans une lumière de néon crue, l'intérieur du wagon révèle une esthétique vintage : banquettes vides, sol usé et teintes bleutées. Une scène de cinéma sans acteurs, une ode à la solitude souterraine au cœur du mythe new-yorkais.",
                    en: "Dive into the bowels of the city. The lens captures the electric silence of a deserted subway car. Bathed in harsh neon light, the wagon interior reveals a vintage aesthetic: empty benches, worn floor, and bluish hues. A movie scene without actors, an ode to subterranean solitude in the heart of the New York myth."
                }
            }
        ]
    },
    {
        id: 'psychadelic-mtl',
        title: 'Psychadelic MTL',
        year: 'Octobre 2023',
        description: {
            fr: "Octobre 2023. Montréal passée au crible de la LomoChrome Turquoise. Dans cette série expérimentale, la chimie de la pellicule inverse le spectre lumineux pour révéler une dimension parallèle. Les lois de la nature sont révoquées : le ciel d'automne s'embrase en un orange apocalyptique, tandis que le feuillage des érables gèle dans des teintes bleutées surnaturelles. Ce n'est plus la ville de l'échange universitaire, c'est une métropole de science-fiction, une hallucination visuelle où la chaleur de l'été indien se mue en une froideur électrique.",
            en: "October 2023. Montreal filtered through LomoChrome Turquoise. In this experimental series, the film's chemistry reverses the light spectrum to reveal a parallel dimension. The laws of nature are revoked: the autumn sky ignites in an apocalyptic orange, while maple foliage freezes in supernatural bluish hues. It is no longer the city of the academic exchange, it is a science fiction metropolis, a visual hallucination where the heat of Indian summer transforms into an electric coldness."
        },
        coverImage: '/images/psychadelic-mtl/montreal-vis-versa.JPG',
        theme: { background: '#C87533', text: '#003B46' },
        photos: [
            {
                id: 9201, url: '/images/psychadelic-mtl/montreal-vis-versa.JPG', title: 'Monde Inversé', category: 'urban', seriesId: 'psychadelic-mtl', technical_info: 'Rollei 35 | LomoChrome Turquoise', orientation: 'landscape',
                alt_accessible: { fr: "Monde Inversé", en: "Inverted World" },
                caption_artistic: { fr: "Vue du Mont-Royal. L'horizon familier de Montréal bascule dans l'irréel. Les tours iconiques du centre-ville se figent dans un bleu verdâtre spectral, occupant la moitié inférieure du cadre comme une cité engloutie. Au-dessus, le ciel subit une transmutation alchimique : l'azur cède la place à un orange satiné. Ce 'Monde Inversé' joue sur la complémentarité chromatique poussée à l'extrême.", en: "View from Mount Royal. Montreal's familiar skyline tips into the unreal. The iconic downtown towers freeze in a spectral greenish blue, occupying the lower half of the frame like a sunken city. Above, the sky undergoes an alchemical transmutation: azure gives way to a satin orange. This 'Inverted World' plays on chromatic complementarity pushed to the extreme." }
            },
            {
                id: 9202, url: '/images/psychadelic-mtl/kapital-circle.JPG', title: 'Oeil Urbain', category: 'urban', seriesId: 'psychadelic-mtl', technical_info: 'Rollei 35 | LomoChrome Turquoise', orientation: 'portrait',
                alt_accessible: { fr: "Œil Urbain", en: "Urban Eye" },
                caption_artistic: { fr: "Place Ville Marie. L'anneau monumental cesse d'être une simple sculpture pour devenir un oculaire braqué sur une réalité alternative. À travers ce cercle parfait, l'architecture rectangulaire du centre financier se dresse, transfigurée. Le verre des gratte-ciels ne reflète plus le bleu rassurant du jour, mais un ciel orange électrique. L'image capture une ville familière qui semble pourtant nous observer depuis une autre galaxie.", en: "Place Ville Marie. The monumental ring ceases to be a simple sculpture to become an eyepiece focused on an alternative reality. Through this perfect circle, the rectangular architecture of the financial center stands transfigured. The glass of the skyscrapers no longer reflects the reassuring blue of the day, but an electric orange sky. The image captures a familiar city that nevertheless seems to observe us from another galaxy." }
            },
            {
                id: 9205, url: '/images/psychadelic-mtl/plots.JPG', title: 'Mutation Signalétique', category: 'urban', seriesId: 'psychadelic-mtl', technical_info: 'Rollei 35 | LomoChrome Turquoise', orientation: 'landscape',
                alt_accessible: { fr: "Mutation Signalétique", en: "Signage Mutation" },
                caption_artistic: { fr: "Ironie montréalaise. Le cône de chantier — mascotte involontaire de la ville — subit ici une mutation génétique. Alignés en une perspective rigoureuse, les plots perdent leur orange strident pour alterner entre un blanc spectral et un bleu marine profond. En inversant les codes de sécurité chromatiques sous un ciel inversé, l'image transforme un banal alignement de travaux en une piste d'atterrissage pour un monde alien.", en: "Montreal irony. The construction cone — the city's unintentional mascot — undergoes a genetic mutation here. Aligned in a rigorous perspective, the cones lose their strident orange to alternate between spectral white and deep navy blue. By reversing chromatic safety codes under an inverted sky, the image transforms a banal construction alignment into a landing strip for an alien world." }
            },
            {
                id: 9203, url: '/images/psychadelic-mtl/sharp-contrast.JPG', title: 'Sharp Contrast', category: 'urban', seriesId: 'psychadelic-mtl', technical_info: 'Rollei 35 | LomoChrome Turquoise', orientation: 'landscape',
                alt_accessible: { fr: "Sharp Contrast", en: "Sharp Contrast" },
                caption_artistic: { fr: "Géométrie brutale. Un immeuble en rénovation devient le théâtre d'une transmutation chimique. La brique rouge traditionnelle est convertie en un monolithe bleu-vert, découpé au scalpel par une contre-plongée vertigineuse. Le ciel, saturé d'un orange incendiaire, vient heurter les arêtes nettes du toit. En bas, les ombres du chantier sculptent la façade en gradins, créant un effet 'Lego' presque artificiel.", en: "Brutal geometry. A building under renovation becomes the theater of a chemical transmutation. Traditional red brick is converted into a blue-green monolith, cut by a scalpel in a dizzying low angle. The sky, saturated with incendiary orange, strikes the sharp edges of the roof. Below, construction shadows sculpt the facade into tiers, creating an almost artificial 'Lego' effect." }
            },
            {
                id: 9206, url: '/images/psychadelic-mtl/frvr-in-d-r.JPG', title: 'Forever in the Air', category: 'urban', seriesId: 'psychadelic-mtl', technical_info: 'Rollei 35 | LomoChrome Turquoise', orientation: 'landscape',
                alt_accessible: { fr: "Forever in the Air", en: "Forever in the Air" },
                caption_artistic: { fr: "Gravité suspendue. L'obturateur capture l'instant précis de l'apogée. Le skateur, accroupi en plein vol, flotte à un mètre cinquante du sol, détaché de son ombre. La chimie de la pellicule opère une mutation radicale : son manteau orange vire au bleu électrique, tandis que le ciel devient une fournaise pâle. Figé pour l'éternité, il est le seul élément dynamique d'une nature morte aux couleurs inversées.", en: "Suspended gravity. The shutter captures the precise moment of the apex. The skater, crouched in mid-flight, floats one and a half meters off the ground, detached from his shadow. The film's chemistry operates a radical mutation: his orange coat turns electric blue, while the sky becomes a pale furnace. Frozen for eternity, he is the only dynamic element of a still life with inverted colors." }
            },
            {
                id: 9204, url: '/images/psychadelic-mtl/duo-on-cliff.JPG', title: 'Duo on Cliff', category: 'urban', seriesId: 'psychadelic-mtl', technical_info: 'Rollei 35 | LomoChrome Turquoise', orientation: 'landscape',
                alt_accessible: { fr: "Duo on Cliff", en: "Duo on Cliff" },
                caption_artistic: { fr: "Trompe-l'œil urbain. Une simple esplanade se métamorphose en falaise vertigineuse par la grâce d'une perspective en contre-plongée. Au bord de ce vide illusoire, deux silhouettes échangent des mots secrets, se découpant sur l'incendie orange du ciel. Au-dessus d'eux, une mouette figée en plein vol scelle l'instant. Est-ce une romance volée au bord de la fin du monde ? L'image crée un vertige purement optique.", en: "Urban trompe-l'œil. A simple esplanade transforms into a dizzying cliff by the grace of a low-angle perspective. On the edge of this illusory void, two silhouettes exchange secret words, silhouetted against the orange fire of the sky. Above them, a seagull frozen in flight seals the moment. Is it a stolen romance at the edge of the end of the world? The image creates a purely optical vertigo." }
            }
        ]
    },
    {
        id: 'canadian-evasion',
        title: 'Canadian Evasion',
        year: 'Août 2023',
        description: {
            fr: "Août 2023. Une errance solitaire sur les routes du Québec, sac au dos et pouce levé. Cette série n'est pas un simple carnet de voyage, c'est l'enregistrement d'une confrontation : celle de l'immensité sauvage face à la mécanique minuscule du Rollei 35. De Montréal aux fjords de Tadoussac, en passant par les Laurentides, la pellicule capture l'improvisation totale d'un road-trip sans itinéraire. La Portra 400 y révèle la rudesse de la marche et la douceur des lumières du Saint-Laurent, peignant un monde où l'homme redevient une échelle négligeable face à la nature.",
            en: "August 2023. A solitary wandering on the roads of Quebec, backpack on and thumb raised. This series is not a simple travelogue, it is the recording of a confrontation: that of the wild vastness against the tiny mechanics of the Rollei 35. From Montreal to the fjords of Tadoussac, through the Laurentians, the film captures the total improvisation of a road trip without an itinerary. Portra 400 reveals the harshness of the walk and the softness of the Saint Lawrence lights, painting a world where man becomes a negligible scale against nature."
        },
        coverImage: '/images/canadian-evasion/infinity.JPG',
        theme: { background: '#3C4A57', text: '#F0F4F8' },
        photos: [
            {
                id: 9704, url: '/images/canadian-evasion/intrus.JPG', title: 'Bivouac', category: 'nature', seriesId: 'canadian-evasion', technical_info: 'Rollei 35 | Portra 400', orientation: 'landscape',
                alt_accessible: { fr: "Bivouac", en: "Bivouac" },
                caption_artistic: { fr: "Perdue dans l'immensité d'un 'openfield', la tente n'est plus un simple accessoire de camping, mais un module d'exploration posé sur une planète étrangère. Telle une capsule de survie, sa géométrie synthétique tranche avec le chaos organique des épis de blé. L'image fige une trace humaine éphémère : le bivouac sauvage comme unique point de repère, évoquant une solitude cinématique où l'explorateur n'est qu'un invité temporaire.", en: "Lost in the vastness of an 'openfield', the tent is no longer a simple camping accessory, but an exploration module landed on a foreign planet. Like a survival capsule, its synthetic geometry cuts through the organic chaos of wheat ears. The image freezes an ephemeral human trace: the wild bivouac as the only landmark, evoking a cinematic solitude where the explorer is only a temporary guest." }
            },
            {
                id: 9701, url: '/images/canadian-evasion/infinity.JPG', title: 'Route Infinie', category: 'nature', seriesId: 'canadian-evasion', technical_info: 'Rollei 35 | Portra 400', orientation: 'landscape',
                alt_accessible: { fr: "Route Infinie", en: "Infinite Road" },
                caption_artistic: { fr: "7h du matin, aux abords du Mont-Tremblant. L'image capture l'archétype du road-trip nord-américain : une ligne de fuite absolue qui fend l'océan vert des conifères. Sous un ciel laiteux, les nuages descendent toucher la cime des arbres, installant une atmosphère spectrale. Le bitume, gris et lézardé par les hivers, s'étend jusqu'à se dissoudre dans la brume. Face à cette géométrie implacable, le photographe n'est plus qu'un point minuscule confronté au vertige des distances.", en: "7 AM, near Mont-Tremblant. The image captures the archetype of the North American road trip: an absolute vanishing point cutting through the green ocean of conifers. Under a milky sky, clouds descend to touch the treetops, setting a spectral atmosphere. The asphalt, gray and cracked by winters, stretches until it dissolves into the mist. Faced with this relentless geometry, the photographer is nothing more than a tiny point confronted with the vertigo of distances." }
            },
            {
                id: 9703, url: '/images/canadian-evasion/Mirroir-vert.JPG', title: 'Miroir Boréal', category: 'nature', seriesId: 'canadian-evasion', technical_info: 'Rollei 35 | Portra 400', orientation: 'landscape',
                alt_accessible: { fr: "Miroir Boréal", en: "Boreal Mirror" },
                caption_artistic: { fr: "Une étude de symétrie absolue où l'horizon cesse d'être une fuite pour devenir un axe. La ligne verte des conifères scinde l'image en deux hémisphères parfaits : le ciel trouve son jumeau exact dans les eaux immobiles du lac. Cette répétition hypnotique n'est interrompue que par un rocher solitaire en bas à gauche — unique imperfection géologique qui brise la mathématique du reflet et ancre l'image dans le réel.", en: "A study of absolute symmetry where the horizon ceases to be an escape to become an axis. The green line of conifers splits the image into two perfect hemispheres: the sky finds its exact twin in the still waters of the lake. This hypnotic repetition is interrupted only by a lonely rock in the bottom left — a unique geological imperfection breaking the mathematics of the reflection and anchoring the image in reality." }
            },
            {
                id: 9706, url: '/images/canadian-evasion/contemplation.jpg', title: 'Contemplation', category: 'nature', seriesId: 'canadian-evasion', technical_info: 'Rollei 35 | Portra 400', orientation: 'landscape',
                alt_accessible: { fr: "Contemplation", en: "Contemplation" },
                caption_artistic: { fr: "Tadoussac. Rupture chromatique. Après la rigueur des forêts, l'objectif sature soudainement les rouges et les bleus. Ces deux fauteuils tournent le dos à la terre pour faire face à l'immensité. Une tête dépasse à peine, trace de vie minimale, tandis que le siège de droite reste vide : une place laissée vacante pour le spectateur, invité à ce point de chute final où la route s'arrête et où le regard porte au-delà.", en: "Tadoussac. Chromatic rupture. After the rigor of forests, the lens suddenly saturates reds and blues. These two armchairs turn their backs to the land to face the immensity. A head barely peeks out, a minimal trace of life, while the right seat remains empty: a place left vacant for the viewer, invited to this final drop-off point where the road ends and the gaze carries beyond." }
            },
            {
                id: 9702, url: '/images/canadian-evasion/bout-du-monde.JPG', title: 'Le Saint-Laurent', category: 'nature', seriesId: 'canadian-evasion', technical_info: 'Rollei 35 | Portra 400', orientation: 'landscape',
                alt_accessible: { fr: "Le Saint-Laurent", en: "The Saint Lawrence" },
                caption_artistic: { fr: "Point de bascule. L'image matérialise la frontière physique du voyage. Sur la gauche, la densité verte de la forêt boréale s'effondre brutalement vers la rive, stoppée net par une force supérieure. Le reste du cadre est envahi par les nuances de bleu du Saint-Laurent. C'est une confrontation silencieuse entre deux immensités : la terre qui s'arrête et l'eau qui commence.", en: "Tipping point. The image materializes the physical border of the journey. On the left, the green density of the boreal forest collapses brutally towards the shore, stopped dead by a superior force. The rest of the frame is invaded by the shades of blue of the Saint Lawrence. It is a silent confrontation between two vastnesses: the land that ends and the water that begins." }
            },
            {
                id: 9705, url: '/images/canadian-evasion/autoportrait.JPG', title: 'Face au Large', category: 'portrait', seriesId: 'canadian-evasion', technical_info: 'Rollei 35 | Portra 400', orientation: 'landscape',
                alt_accessible: { fr: "Face au Large", en: "Facing the Open Sea" },
                caption_artistic: { fr: "Clôture du voyage et unique apparition du photographe dans son œuvre. De dos, vêtu d'un t-shirt blanc anonyme, il se tient au bord du cadre face à l'immensité. La composition écrase la terre pour laisser triompher le ciel et l'eau. Le regard tourné vers la gauche — vers le passé, vers la route parcourue — il marque l'arrêt obligatoire. Face à l'impossibilité d'avancer, ne reste que la contemplation du chemin accompli.", en: "Closure of the journey and unique appearance of the photographer in his work. From behind, dressed in an anonymous white t-shirt, he stands at the edge of the frame facing the vastness. The composition crushes the land to let the sky and water triumph. Gaze turned to the left — towards the past, towards the traveled road — he marks the mandatory stop. Faced with the impossibility of advancing, only remains the contemplation of the accomplished path." }
            }
        ]
    },
    {
        id: 'mauvais-garcons',
        title: 'Rue des Mauvais Garçons',
        year: 'Avril 2023',
        description: {
            fr: "Avril 2023. Paris, entre l'aristocratie de l'Île Saint-Louis et les ruelles du Marais. Cette série inaugurale capture l'essence de Gabriel, dandy moderne et frère d'âme, figé dans une époque qu'il fantasme autant qu'il l'incarne. Au guidon de son Astor, il ne traverse pas la ville, il habite le décor. Entre poses étudiées et mélancolie brute, cette série est le récit silencieux d'une attente : celle d'une élégance perdue, ou d'un rendez-vous qui ne viendra peut-être jamais.",
            en: "April 2023. Paris, between the aristocracy of Île Saint-Louis and the alleys of the Marais. This inaugural series captures the essence of Gabriel, a modern dandy and soul brother, frozen in an era he fantasizes about as much as he embodies. Riding his Astor, he doesn't just cross the city, he inhabits the setting. Between studied poses and raw melancholy, this series is the silent tale of a wait: that of a lost elegance, or a meeting that may never come."
        },
        coverImage: '/images/mauvais-garcons/le-rendez-vous.jpg',
        theme: {
            background: '#F5F5DC',
            text: '#1A1A1A'
        },
        photos: [
            {
                id: 9001, url: '/images/mauvais-garcons/gab-moto-debout.jpg', title: "L'Attente", category: 'portrait', seriesId: 'mauvais-garcons', technical_info: 'Nikon F-301 | Portra 400', orientation: 'landscape',
                alt_accessible: { fr: "L'Attente", en: "The Wait" },
                caption_artistic: { fr: "Dans une harmonie de beiges et de terres brûlées, Gabriel se fond dans l'architecture du Marais. Adossé au porche monumental, il semble faire corps avec le bois patiné. Son regard, fuyant vers la droite, brise la symétrie du cadre et introduit une narration invisible : qui attend-il ? Appuyé sur son Astor comme sur une ancre, il incarne une patience élégante.", en: "In a harmony of beiges and burnt earth, Gabriel blends into the architecture of the Marais. Leaning against the monumental porch, he seems to merge with the weathered wood. His gaze, fleeing to the right, breaks the frame's symmetry and introduces an invisible narrative: who is he waiting for? Leaning on his Astor like an anchor, he embodies an elegant patience." }
            },
            {
                id: 9004, url: '/images/mauvais-garcons/gab-bouquin.jpg', title: 'Lecture Urbaine', category: 'portrait', seriesId: 'mauvais-garcons', technical_info: 'Nikon F-301 | Portra 400', orientation: 'portrait',
                alt_accessible: { fr: "Lecture Urbaine", en: "Urban Reading" },
                caption_artistic: { fr: "Place des Vosges. Dans ce format vertical, Gabriel s'appuie sur l'histoire des lieux autant que sur la rambarde. La composition délibérée sature la moitié gauche, laissant le vide envahir la partie droite de l'image — un espace négatif lourd de sens, réservé à celle ou celui qui n'arrive pas. Ganté, lunetté, il trompe l'attente par l'érudition.", en: "Place des Vosges. In this vertical format, Gabriel leans on the history of the place as much as on the railing. The deliberate composition saturates the left half, leaving the void to invade the right part of the image — a negative space heavy with meaning, reserved for the one who does not arrive. Gloved, spectacled, he cheats the wait with erudition." }
            },
            {
                id: 9005, url: '/images/mauvais-garcons/gab-lampadaire.jpg', title: "L'Heure Bleue", category: 'urban', seriesId: 'mauvais-garcons', technical_info: 'Nikon F-301 | Portra 400', orientation: 'portrait',
                alt_accessible: { fr: "L'Heure Bleue", en: "The Blue Hour" },
                caption_artistic: { fr: "Sur les quais de l'Île Saint-Louis, la narration évolue. Le manteau est tombé. Perché sur le muret, Gabriel s'accroche à un réverbère comme aux aiguilles d'une horloge arrêtée. Cette suspension, physique et temporelle, contraste avec l'ancrage immuable du Panthéon qui se découpe à l'horizon. Il danse avec l'absence sous la lumière naissante du crépuscule.", en: "On the quays of Île Saint-Louis, the narrative evolves. The coat has fallen. Perched on the low wall, Gabriel hangs on to a street lamp like the hands of a stopped clock. This suspension, physical and temporal, contrasts with the immutable anchor of the Pantheon silhouetted on the horizon. He dances with absence under the rising light of twilight." }
            },
            {
                id: 9002, url: '/images/mauvais-garcons/moto-seine.jpg', title: 'Astor sur Seine', category: 'urban', seriesId: 'mauvais-garcons', technical_info: 'Nikon F-301 | Portra 400', orientation: 'landscape',
                alt_accessible: { fr: "Astor sur Seine", en: "Astor on Seine" },
                caption_artistic: { fr: "Rupture de rythme. Le cadre bascule à l'horizontal et l'humain s'efface. Seule demeure l'Astor, béquillée sur les pavés, se découpant sur le fil de l'eau telle une icône vintage. L'absence de Gabriel charge l'image d'une tension nouvelle. La machine reste là, fidèle destrier et témoin silencieux, seule ancre immobile face au temps qui coule comme la Seine.", en: "Rhythm break. The frame shifts to horizontal and the human fades away. Only the Astor remains, propped up on the cobblestones, silhouetted against the water like a vintage icon. Gabriel's absence charges the image with a new tension. The machine remains there, faithful steed and silent witness, the only motionless anchor facing time flowing like the Seine." }
            },
            {
                id: 9003, url: '/images/mauvais-garcons/gab-seine.jpg', title: 'Regard Rive Droite', category: 'portrait', seriesId: 'mauvais-garcons', technical_info: 'Nikon F-301 | Portra 400', orientation: 'landscape',
                alt_accessible: { fr: "Regard Rive Droite", en: "Right Bank Gaze" },
                caption_artistic: { fr: "Sur le pont ralliant l'Île Saint-Louis, la photographie se fait impressionniste. L'appareil refuse la netteté au sujet pour l'offrir au décor : Gabriel n'est plus qu'une silhouette floue, happée par le mouvement. En laissant le dandy se fondre dans le flou cinétique pour focaliser sur la Seine immuable, l'image capture l'essence de la traque : le décor reste, les hommes passent.", en: "On the bridge joining Île Saint-Louis, photography becomes impressionistic. The camera refuses sharpness to the subject to offer it to the setting: Gabriel is nothing more than a blurred silhouette, caught in movement. By letting the dandy melt into kinetic blur to focus on the immutable Seine, the image captures the essence of the hunt: the setting remains, men pass." }
            },
            {
                id: 9006, url: '/images/mauvais-garcons/le-rendez-vous.jpg', title: 'Le Rendez-vous', category: 'portrait', seriesId: 'mauvais-garcons', technical_info: 'Nikon F-301 | Portra 400', orientation: 'landscape',
                alt_accessible: { fr: "Le Rendez-vous", en: "The Meeting" },
                caption_artistic: { fr: "Épilogue. L'homme et la machine fusionnent à nouveau. Gabriel ne fuit plus, ne cherche plus : il fixe l'objectif. Derrière ses lunettes noires, l'expression est indéchiffrable — ni joie, ni colère, juste une intensité froide. L'histoire s'arrête sur ce face-à-face : le rendez-vous a eu lieu, mais personne ne saura jamais ce qui s'y est dit.", en: "Epilogue. Man and machine merge again. Gabriel no longer flees, no longer seeks: he stares at the lens. Behind his black glasses, the expression is indecipherable — neither joy nor anger, just a cold intensity. The story ends on this face-to-face: the meeting took place, but no one will ever know what was said." }
            }
        ]
    }
];

export const photos: Photo[] = seriesData.flatMap(series => series.photos);