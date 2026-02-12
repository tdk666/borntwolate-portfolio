export interface LocalizedText { fr: string; en: string; }

export interface Photo {
    id: number;
    slug: string;
    url: string;
    title: string;
    category: 'nature' | 'urban' | 'portrait' | 'bnw';
    seriesId?: string;
    technical_info?: string;
    orientation?: 'landscape' | 'portrait';
    alt_accessible?: LocalizedText;
    caption_artistic?: LocalizedText;
    tags?: string[];
}

export interface Series {
    id: string;
    title: string;
    year: string;
    description: LocalizedText;
    coverImage: string;
    photos: Photo[];
    theme?: { background: string; text: string; };
    seo_title?: LocalizedText;
}

export const seriesData: Series[] = [
    {
        id: 'polish-hike',
        title: 'Polish Hike',
        year: 'Août 2025',
        description: {
            fr: "Août 2025. Zakopane. Entre la Pologne et la Hongrie, les montagnes des Tatras dressent une barrière de granit. Cette série documente une parenthèse d'effort et de contemplation. Loin de l'agitation urbaine, le Rollei 35 a accompagné chaque pas de cette ascension en duo. Le choix de la pellicule Kodak Gold n'est pas anodin : elle baigne ces paysages austères d'une lumière chaude et familière, conférant aux souvenirs de randonnée une patine intemporelle. Ici, la roche, les lacs et les vallées ne sont pas seulement des décors, mais les témoins silencieux d'une marche vers les sommets.",
            en: "August 2025. Zakopane. Between Poland and Hungary, the Tatra mountains erect a granite barrier. This series documents a parenthesis of effort and contemplation. Far from urban agitation, the Rollei 35 accompanied every step of this duo ascent. The choice of Kodak Gold film is not insignificant: it bathes these austere landscapes in warm and familiar light, giving hiking memories a timeless patina. Here, rock, lakes, and valleys are not just settings, but silent witnesses of a march towards the summits."
        },
        coverImage: '/images/polish-hike/the-hills.jpg',
        theme: { background: '#D6DBDF', text: '#2E4053' },
        seo_title: { fr: "Polish Hike - Randonnée Photo Argentique dans les Tatras (Pologne)", en: "Polish Hike - Analog Photo Hiking in the Tatras (Poland)" },
        photos: [
            {
                id: 9701, slug: 'crete-verte', url: '/images/polish-hike/the-hills.jpg', title: 'Crête Verte', category: 'nature', seriesId: 'polish-hike', technical_info: 'Rollei 35 | Kodak Gold', orientation: 'landscape', tags: ['nature', 'montagne', 'pologne', 'randonnée', 'tatras', 'vert', 'kodak gold', 'europe', 'mountain', 'hiking', 'paysage', 'landscape', 'été', 'summer', 'poland'],
                alt_accessible: { fr: "Paysage de montagne verdoyant avec sentier sinueux et ciel chargé.", en: "Green mountain landscape with winding path and heavy sky." },
                caption_artistic: { fr: "Crête Verte. Cette image ouvre la marche avec une respiration épique. La composition divise le monde en deux : la terre et les cieux. La moitié inférieure est une masse organique où les verts, saturés par la Kodak Gold, révèlent les courbes musculaires de la montagne. Un sentier sinueux, telle une veine, guide l'œil vers la droite, ponctué de minuscules silhouettes donnant l'échelle vertigineuse du lieu. Surplombant cette scène, le ciel chargé confère à l'ensemble une atmosphère de \"Terre du Milieu\".", en: "Green Ridge. This image opens the march with an epic breath. The composition divides the world in two: earth and skies. The lower half is an organic mass where greens, saturated by Kodak Gold, reveal the mountain's muscular curves. A winding path, like a vein, guides the eye to the right, punctuated by tiny silhouettes giving the dizzying scale of the place. Overlooking this scene, the heavy sky gives the whole a \"Middle-earth\" atmosphere." }
            },
            {
                id: 9702, slug: 'equilibre-mineral', url: '/images/polish-hike/tiny-stonhedge.jpg', title: 'Équilibre Minéral', category: 'nature', seriesId: 'polish-hike', technical_info: 'Rollei 35 | Kodak Gold', orientation: 'landscape', tags: ['nature', 'montagne', 'pologne', 'randonnée', 'tatras', 'vert', 'kodak gold', 'europe', 'mountain', 'hiking', 'stone', 'pierre', 'cairn', 'landscape'],
                alt_accessible: { fr: "Deux petits cairns de pierres au premier plan devant un vaste paysage de vallées.", en: "Two small stone cairns in foreground before a vast valley landscape." },
                caption_artistic: { fr: "Équilibre Minéral. Cette photographie marque une pause contemplative. En posant l'appareil à même le sol, l'image inverse les échelles : deux petits cairns deviennent des monuments au premier plan, leurs teintes ocres réchauffées par la pellicule. Ils se détachent sur un arrière-plan grandiose de collines et de vallées sous un ciel chargé. C'est un dialogue silencieux entre la trace humaine éphémère et le macrocosme immuable de la montagne.", en: "Mineral Balance. This photograph marks a contemplative pause. By placing the camera on the ground, the image reverses scales: two small cairns become monuments in the foreground, their ochre hues warmed by the film. They stand out against a grandiose background of hills and valleys under a heavy sky. It is a silent dialogue between the ephemeral human trace and the immutable macrocosm of the mountain." }
            },
            {
                id: 9703, slug: 'miroir-jumeau', url: '/images/polish-hike/the-lakes.jpg', title: 'Miroir Jumeau', category: 'nature', seriesId: 'polish-hike', technical_info: 'Rollei 35 | Kodak Gold', orientation: 'landscape', tags: ['nature', 'montagne', 'pologne', 'randonnée', 'tatras', 'vert', 'kodak gold', 'europe', 'mountain', 'hiking', 'lac', 'lake', 'water', 'eau', 'reflet', 'reflection'],
                alt_accessible: { fr: "Deux lacs de montagne gris-bleu nichés dans un cirque rocheux.", en: "Two grey-blue mountain lakes nestled in a rocky circus." },
                caption_artistic: { fr: "Miroir Jumeau. Le regard plonge dans le creux des montagnes pour découvrir deux lacs d'altitude, véritables miroirs jumeaux posés au fond du cirque glaciaire. L'image est structurée par une symétrie naturelle, les deux taches gris-bleu étant séparées par un fin isthme de terre. Autour d'eux, la palette de la pellicule réchauffe les teintes austères de la roche. Sous un ciel gris, ces eaux immobiles semblent \"tapis dans l'ombre\", gardiens secrets de la vallée.", en: "Twin Mirror. The gaze plunges into the hollow of the mountains to discover two high-altitude lakes, true twin mirrors placed at the bottom of the glacial circus. The image is structured by natural symmetry, the two grey-blue spots being separated by a thin isthmus of land. Around them, the film palette warms the austere rock hues. Under a grey sky, these still waters seem \"lurking in the shadow\", secret guardians of the valley." }
            },
            {
                id: 9704, slug: 'la-vallee', url: '/images/polish-hike/the-valley.jpg', title: 'La Vallée', category: 'nature', seriesId: 'polish-hike', technical_info: 'Rollei 35 | Kodak Gold', orientation: 'landscape', tags: ['nature', 'montagne', 'pologne', 'randonnée', 'tatras', 'vert', 'kodak gold', 'europe', 'mountain', 'hiking', 'valley', 'vallée', 'forest', 'forêt'],
                alt_accessible: { fr: "Vue en contre-plongée d'une vallée encadrée par des sapins sombres.", en: "Low angle view of a valley framed by dark fir trees." },
                caption_artistic: { fr: "La Vallée. Arrivé au pied du massif, le regard se retourne. Le premier plan, parsemé de fleurs sauvages, contraste avec l'austérité à venir. Le regard est guidé par un sentier central qui s'engouffre dans un entonnoir végétal : deux forêts de sapins sombres descendent en diagonales abruptes, fermant le cadre. Au-delà, les montagnes rocheuses et le ciel bleu nuageux apparaissent comme un décor lointain. L'exposition sombre souligne l'encaissement protecteur de la vallée.", en: "The Valley. Arrived at the foot of the massif, the gaze turns back. The foreground, dotted with wildflowers, contrasts with the austerity to come. The gaze is guided by a central path rushing into a vegetal funnel: two dark fir forests descend in abrupt diagonals, closing the frame. Beyond, rocky mountains and cloudy blue sky appear as a distant backdrop. The dark exposure highlights the valley's protective enclosure." }
            },
            {
                id: 9705, slug: 'cathedrale-verte', url: '/images/polish-hike/the-trees.jpg', title: 'Cathédrale Verte', category: 'nature', seriesId: 'polish-hike', technical_info: 'Rollei 35 | Kodak Gold', orientation: 'landscape', tags: ['nature', 'montagne', 'pologne', 'randonnée', 'tatras', 'vert', 'kodak gold', 'europe', 'mountain', 'hiking', 'forest', 'forêt', 'arbre', 'tree', 'wood', 'bois'],
                alt_accessible: { fr: "Forêt dense de sapins hauts et droits, sentier au premier plan.", en: "Dense forest of tall straight fir trees, path in foreground." },
                caption_artistic: { fr: "Cathédrale Verte. L'horizon s'est refermé. Cette photographie plonge le spectateur au cœur de la forêt, où les troncs s'élancent comme des piliers vers une voûte invisible. La composition est saturée de verticalité, créant un rythme visuel hypnotique. Seule la moitié inférieure offre une respiration avec un sentier bordé de fougères. La Kodak Gold sature les verts et les bruns, transformant le sous-bois en un cocon où la lumière filtre à peine.", en: "Green Cathedral. The horizon has closed. This photograph plunges the viewer into the heart of the forest, where trunks soar like pillars towards an invisible vault. The composition is saturated with verticality, creating a hypnotic visual rhythm. Only the lower half offers a breath with a fern-lined path. Kodak Gold saturates greens and browns, transforming the undergrowth into a cocoon where light barely filters." }
            },
            {
                id: 9706, slug: 'l-emeraude', url: '/images/polish-hike/the-spot.jpg', title: "L'Émeraude", category: 'nature', seriesId: 'polish-hike', technical_info: 'Rollei 35 | Kodak Gold', orientation: 'landscape', tags: ['nature', 'montagne', 'pologne', 'randonnée', 'tatras', 'vert', 'kodak gold', 'europe', 'mountain', 'hiking', 'lac', 'lake', 'emerald', 'émeraude'],
                alt_accessible: { fr: "Lac de montagne couleur émeraude entouré de collines vertes.", en: "Emerald colored mountain lake surrounded by green hills." },
                caption_artistic: { fr: "L'Émeraude. Dernier regard en arrière, cette image capture le lac le plus bas, point de départ désormais isolé. Ce qui frappe, c'est la teinte surnaturelle de l'eau : une nuance entre l'azur et le vert, véritable joyau serti dans la roche. Le paysage qui l'enserre résume les Tatras : sommets bruns et collines vertes. Sous un ciel gris, ce lac solitaire brille de sa propre lumière, point focal apaisant au milieu du chaos minéral.", en: "The Emerald. Last look back, this image captures the lowest lake, now isolated starting point. What strikes is the water's supernatural hue: a shade between azure and green, a true jewel set in rock. The enclosing landscape summarizes the Tatras: brown summits and green hills. Under a grey sky, this solitary lake shines with its own light, soothing focal point amidst mineral chaos." }
            }
        ]
    },
    {
        id: 'white-mounts',
        title: 'White Mounts',
        year: 'Janvier 2025',
        description: {
            fr: "Janvier 2025. Alpes du Sud. Loin de l'austérité graphique, cette série est une ode à l'énergie collective. Le temps d'un week-end, le Rollei 35 a capturé l'insouciance d'une évasion entre amis. Le choix technique est ici crucial : la pellicule Portra 400. Habituellement louée pour son rendu des carnations, elle est ici détournée pour sublimer la matière de l'hiver. Elle transforme la neige en sucre glace, adoucit les bleus du ciel et enveloppe les paysages d'une chaleur subtile. \"White Mounts\", c'est la montagne vécue non pas comme un défi, mais comme un terrain de jeu.",
            en: "January 2025. Southern Alps. Far from graphic austerity, this series is an ode to collective energy. For a weekend, the Rollei 35 captured the carelessness of an escape with friends. The technical choice is crucial here: Portra 400 film. Usually praised for its skin tone rendering, here it is diverted to sublimate the winter texture. It turns snow into icing sugar, softens sky blues and wraps landscapes in subtle warmth. \"White Mounts\" is the mountain experienced not as a challenge, but as a playground."
        },
        coverImage: '/images/white-mounts/like-sugar.jpg',
        theme: { background: '#F0F8FF', text: '#003366' },
        seo_title: { fr: "White Mounts - Photo Argentique Ski Vintage Alpes (Portra 400)", en: "White Mounts - Vintage Analog Ski Photography Alps (Portra 400)" },
        photos: [
            {
                id: 9502, slug: 'sucre-glace', url: '/images/white-mounts/like-sugar.jpg', title: 'Sucre Glace', category: 'nature', seriesId: 'white-mounts', technical_info: 'Rollei 35 | Portra 400', orientation: 'landscape', tags: ['nature', 'montagne', 'alpes', 'neige', 'ski', 'hiver', 'blanc', 'portra 400', 'europe', 'mountain', 'snow', 'winter', 'white', 'sunset', 'coucher de soleil'],
                alt_accessible: { fr: "Stries de neige d'un snowpark au coucher du soleil, texture douce ressemblant à du sucre glace.", en: "Snowpark streaks at sunset, soft texture resembling icing sugar." },
                caption_artistic: { fr: "Sucre Glace. Cette image justifie à elle seule le choix de la pellicule Portra 400. Capturée à l'heure où le soleil décline, la photographie ne montre pas le froid, mais la douceur. Au premier plan, les stries régulières d'un snowpark, adoucies par le grain du film, perdent leur nature glacée pour évoquer la texture poudrée du sucre glace. La composition est une étude stratigraphique des blancs, des pistes compactes aux nuages vaporeux, jusqu'au ciel teinté de pastel.", en: "Icing Sugar. This image alone justifies the choice of Portra 400 film. Captured as the sun sets, the photograph does not show the cold, but the softness. In the foreground, the regular streaks of a snowpark, softened by the film grain, lose their icy nature to evoke the powdery texture of icing sugar. The composition is a stratigraphic study of whites, from compact slopes to vaporous clouds, up to the pastel-tinted sky." }
            },
            {
                id: 9501, slug: 'l-insolence', url: '/images/white-mounts/cig-man.jpg', title: "L'Insolence", category: 'portrait', seriesId: 'white-mounts', technical_info: 'Rollei 35 | Portra 400', orientation: 'portrait', tags: ['nature', 'montagne', 'alpes', 'neige', 'ski', 'hiver', 'blanc', 'portra 400', 'europe', 'mountain', 'snow', 'winter', 'portrait', 'man', 'homme', 'cigarette'],
                alt_accessible: { fr: "Portrait d'un skieur avec cigarette et masque reflétant le panorama.", en: "Portrait of a skier with cigarette and goggles reflecting the panorama." },
                caption_artistic: { fr: "L'Insolence. Cadré à bout portant, ce portrait rompt avec l'imagerie lisse des sports d'hiver. Une cigarette aux lèvres, un œil mi-clos, le sujet dévisage l'objectif avec une désinvolture insolente. La complexité de l'image réside dans le masque de ski : véritable miroir convexe, il offre une mise en abyme du panorama alpin et de la silhouette du photographe. La Portra 400 enveloppe cette scène brute d'une douceur inattendue, traitant le nylon et la fumée avec la même délicatesse que la peau.", en: "Insolence. Framed at point-blank range, this portrait breaks with the smooth imagery of winter sports. Cigarette on lips, one eye half-closed, the subject stares at the lens with insolent casualness. The complexity of the image lies in the ski mask: a true convex mirror, it offers a mise en abyme of the alpine panorama and the photographer's silhouette. Portra 400 wraps this raw scene in unexpected softness, treating nylon and smoke with the same delicacy as skin." }
            },
            {
                id: 9503, slug: 'l-ascension', url: '/images/white-mounts/the-ascension.jpg', title: "L'Ascension", category: 'nature', seriesId: 'white-mounts', technical_info: 'Rollei 35 | Portra 400', orientation: 'landscape', tags: ['nature', 'montagne', 'alpes', 'neige', 'ski', 'hiver', 'blanc', 'portra 400', 'europe', 'mountain', 'snow', 'winter', 'sky', 'ciel', 'bleu', 'blue'],
                alt_accessible: { fr: "Vue plongeante depuis un téléphérique sur des pistes enneigées et un ciel bleu profond.", en: "Bird's eye view from a cable car over snowy slopes and deep blue sky." },
                caption_artistic: { fr: "L'Ascension. Cette photographie horizontale documente le moment précis du passage vers l'altitude depuis l'habitacle d'un téléphérique. Le regard plonge sur un chaos de pistes et de roches pour buter contre un ciel magistral. C'est ici que la signature de la pellicule éclate : le bleu du ciel est profond, dense, presque royal. Ce contraste vibrant entre la minéralité chaude des crêtes et l'abysse bleu transforme ce trajet fonctionnel en une expérience visuelle saturée.", en: "The Ascent. This horizontal photograph documents the precise moment of passage to altitude from a cable car cabin. The gaze plunges onto a chaos of tracks and rocks to hit a majestic sky. This is where the film's signature bursts: the sky blue is deep, dense, almost royal. This vibrant contrast between the warm minerality of the ridges and the blue abyss transforms this functional journey into a saturated visual experience." }
            },
            {
                id: 9504, slug: 'mont-caramel', url: '/images/white-mounts/carmel-mount.jpg', title: 'Mont Caramel', category: 'nature', seriesId: 'white-mounts', technical_info: 'Rollei 35 | Portra 400', orientation: 'landscape', tags: ['nature', 'montagne', 'alpes', 'neige', 'ski', 'hiver', 'blanc', 'portra 400', 'europe', 'mountain', 'snow', 'winter', 'rock', 'rocher'],
                alt_accessible: { fr: "Sommet montagneux aux rochers couleur caramel et neige blanche sous un ciel bleu.", en: "Mountain peak with caramel-colored rocks and white snow under a blue sky." },
                caption_artistic: { fr: "Mont Caramel. Avec cette image, la série bascule dans la gourmandise visuelle. Le paysage alpin perd sa dureté minérale pour devenir une confiserie géologique. Les rochers nus, chauffés par le soleil, prennent des teintes de caramel liquide, coulant sur des flancs d'une blancheur onctueuse. Sous un ciel d'un bleu \"bonbon\", la montagne devient une matière tactile et alléchante, réveillant la mémoire gustative de l'enfance.", en: "Mount Caramel. With this image, the series tips into visual gluttony. The alpine landscape loses its mineral hardness to become a geological confectionery. Bare rocks, heated by the sun, take on shades of liquid caramel, flowing over flanks of creamy whiteness. Under a 'candy' blue sky, the mountain becomes a tactile and tempting material, awakening childhood taste memories." }
            },
            {
                id: 9505, slug: 'cimes-et-brume', url: '/images/white-mounts/cloudy.jpg', title: 'Cimes et Brume', category: 'nature', seriesId: 'white-mounts', technical_info: 'Rollei 35 | Portra 400', orientation: 'landscape', tags: ['nature', 'montagne', 'alpes', 'neige', 'ski', 'hiver', 'blanc', 'portra 400', 'europe', 'mountain', 'snow', 'winter', 'cloud', 'nuage', 'fog', 'brouillard', 'brume'],
                alt_accessible: { fr: "Pic montagneux enneigé à moitié caché par une nappe de brouillard.", en: "Snowy mountain peak half-hidden by a sheet of fog." },
                caption_artistic: { fr: "Cimes et Brume. Cette photographie capture une frontière invisible. Sur la droite, l'hiver solaire règne avec un pic enneigé d'une netteté tranchante sur fond bleu roi. Sur la gauche, une nappe de brouillard monte à l'assaut, gommant le relief. C'est un duel de textures entre le \"sucre glace\" solide de la montagne et le coton vaporeux des nuages, saisissant l'instant précis où la clarté cède le pas au mystère.", en: "Peaks and Mist. This photograph captures an invisible border. On the right, solar winter reigns with a razor-sharp snowy peak against a royal blue background. On the left, a sheet of fog attacks, erasing the relief. It is a duel of textures between the solid 'icing sugar' of the mountain and the vaporous cotton of the clouds, seizing the precise moment when clarity gives way to mystery." }
            },
            {
                id: 9507, slug: 'la-muraille', url: '/images/white-mounts/above-the-wall.jpg', title: 'La Muraille', category: 'nature', seriesId: 'white-mounts', technical_info: 'Rollei 35 | Portra 400', orientation: 'landscape', tags: ['nature', 'montagne', 'alpes', 'neige', 'ski', 'hiver', 'blanc', 'portra 400', 'europe', 'mountain', 'snow', 'winter', 'skier', 'skieur'],
                alt_accessible: { fr: "Barre rocheuse massive surplombant deux minuscules skieurs.", en: "Massive rocky bar towering over two tiny skiers." },
                caption_artistic: { fr: "La Muraille. Capturée depuis un téléphérique, cette image remet l'homme à sa juste place. Une barre rocheuse massive aux teintes dorées barre le tiers supérieur de l'image. En bas, deux skieurs minuscules traversent une pente de neige vierge, donnant l'échelle vertigineuse de la scène. En coupant le sommet de la falaise, le cadrage suggère un mur naturel infranchissable au pied duquel l'humain n'est qu'un point en mouvement.", en: "The Wall. Captured from a cable car, this image puts man back in his rightful place. A massive golden-hued rocky bar blocks the upper third of the image. Below, two tiny skiers traverse a slope of virgin snow, giving the dizzying scale of the scene. By cutting off the cliff top, the framing suggests an impassable natural wall at the foot of which the human is just a moving dot." }
            },
            {
                id: 9506, slug: 'l-apparition', url: '/images/white-mounts/hello-moon.jpg', title: "L'Apparition", category: 'nature', seriesId: 'white-mounts', technical_info: 'Rollei 35 | Portra 400', orientation: 'landscape', tags: ['nature', 'montagne', 'alpes', 'neige', 'ski', 'hiver', 'blanc', 'portra 400', 'europe', 'mountain', 'snow', 'winter', 'moon', 'lune'],
                alt_accessible: { fr: "Lune visible dans le ciel au-dessus d'une crête enneigée dorée par le soleil couchant.", en: "Moon visible in the sky above a snowy ridge golden by the setting sun." },
                caption_artistic: { fr: "L'Apparition. L'épilogue se joue dans le ciel. Le soleil couchant projette ses derniers rayons, teintant la neige d'un doré chaud. Mais le véritable sujet est minuscule : au centre du ciel, la lune fait son entrée avant la nuit. C'est une image d'équilibre où la chaleur du jour salue la fraîcheur de l'astre nocturne, clôturant la série sur une note de mélancolie lumineuse.", en: "The Apparition. The epilogue plays out in the sky. The setting sun casts its last rays, tinting the snow a warm golden. But the real subject is tiny: in the center of the sky, the moon makes its entrance before nightfall. It is an image of balance where the day's warmth greets the night star's coolness, closing the series on a note of luminous melancholy." }
            }
        ]
    },
    {
        id: 'puglia-famiglia',
        title: 'Puglia Famiglia',
        year: 'Août 2024',
        description: {
            fr: "Août 2024. Les Pouilles. Ce n’est pas un simple road-trip familial, c’est une parenthèse cinématographique sous le soleil écrasant du sud de l'Italie. Pour capturer cette \"Dolce Vita\" brute, le choix s'est imposé : la CineStill 400D. Une pellicule cinéma détournée de son usage, capable d'imprégner chaque image d'une chaleur saturée et de reflets dorés. L'inspiration est claire : retrouver l'esthétique moite et sensuelle de Plein Soleil. Entre les eaux turquoise et la terre brûlée, les figures familières deviennent des personnages de fiction, figés dans une lumière qui ne semble exister que dans les souvenirs des années 60.",
            en: "August 2024. Puglia. This is not a simple family road trip, it is a cinematic interlude under the crushing sun of Southern Italy. To capture this raw \"Dolce Vita\", the choice was obvious: CineStill 400D. A cinema film diverted from its use, capable of imbuing each image with saturated warmth and golden reflections. The inspiration is clear: to rediscover the sweaty and sensual aesthetic of Purple Noon. Between turquoise waters and scorched earth, familiar figures become fictional characters, frozen in a light that seems to exist only in the memories of the 60s."
        },
        coverImage: '/images/puglia/vespa.jpg',
        theme: { background: '#CFE9F7', text: '#C0392B' },
        seo_title: { fr: "Puglia Famiglia - Voyage Photo Argentique dans les Pouilles (Italie)", en: "Puglia Famiglia - Analog Photo Trip in Puglia (Italy)" },
        photos: [
            {
                id: 9301, slug: 'liberta-bianca', url: '/images/puglia/vespa.jpg', title: 'Libertà Bianca', category: 'nature', seriesId: 'puglia-famiglia', technical_info: 'Rollei 35 | CineStill 400D', orientation: 'landscape', tags: ['nature', 'mer', 'italie', 'pouilles', 'été', 'vacances', 'cinestill 400d', 'bleu', 'chaleur', 'europe', 'moto', 'scooter', 'vespa', 'véhicule', 'deux-roues'],
                alt_accessible: { fr: "Vespa blanc garé face à la mer Adriatique, ciel bleu intense et terre ocre.", en: "White Vespa parked facing the Adriatic Sea, intense blue sky and ochre earth." },
                caption_artistic: { fr: "Libertà Bianca. Symbole absolu de l'errance italienne, ce Vespa blanc n'est pas simplement garé ; il pose, seul face à l'Adriatique. La composition horizontale est d'une rigueur géométrique, découpant le paysage en trois strates de couleurs saturées : la terre ocre, l'horizon marin bleu profond, et un ciel azur immense. Sous l'impact du soleil zénithal, les reflets sur la carrosserie blanche s'embrasent de halos rouges caractéristiques de la pellicule CineStill 400D, transformant une scène de vacances en une image vibrante, évoquant la chaleur écrasante d'un midi dans les Pouilles.", en: "Libertà Bianca. Absolute symbol of Italian wandering, this white Vespa is not simply parked; it poses, alone facing the Adriatic. The horizontal composition is of geometric rigor, cutting the landscape into three layers of saturated colors: ochre earth, deep blue sea horizon, and immense azure sky. Under the impact of the zenithal sun, reflections on the white bodywork ignite with red halos characteristic of CineStill 400D film, transforming a holiday scene into a vibrant image, evoking the crushing heat of a noon in Puglia." }
            },
            {
                id: 9305, slug: 'l-ombrello', url: '/images/puglia/ombrello.jpg', title: "L'Ombrello", category: 'portrait', seriesId: 'puglia-famiglia', technical_info: 'Rollei 35 | CineStill 400D', orientation: 'portrait', tags: ['nature', 'mer', 'italie', 'pouilles', 'été', 'vacances', 'cinestill 400d', 'bleu', 'chaleur', 'europe', 'fille', 'femme', 'woman', 'girl', 'parapluie', 'umbrella'],
                alt_accessible: { fr: "Silhouette féminine de dos sous un grand parapluie noir dans une crique turquoise.", en: "Female silhouette from behind under a large black umbrella in a turquoise cove." },
                caption_artistic: { fr: "L'Ombrello. Dans une composition verticale structurée par les strates géologiques — la roche brute, le turquoise de la crique, le ciel blanc de chaleur — le sujet introduit une note de surréalisme. Dos à l'objectif, une silhouette féminine assume une pose sculpturale. Mais l'œil est capté par l'élément perturbateur : un vaste parapluie noir, incliné, qui devient ici une ombrelle graphique. L'ombre portée sur le visage ajoute une touche de mystère à cette scène qui oscille entre l'esthétique balnéaire vintage et la mise en scène cinématographique décalée.", en: "L'Ombrello. In a vertical composition structured by geological layers — raw rock, cove turquoise, heat-white sky — the subject introduces a note of surrealism. Back to the lens, a female silhouette assumes a sculptural pose. But the eye is caught by the disturbing element: a vast black umbrella, tilted, becoming here a graphic parasol. The shadow cast on the face adds a touch of mystery to this scene oscillating between vintage seaside aesthetic and offbeat cinematic staging." }
            },
            {
                id: 9304, slug: 'le-due-sorelle', url: '/images/puglia/le-due-sorelle.jpg', title: 'Le Due Sorelle', category: 'portrait', seriesId: 'puglia-famiglia', technical_info: 'Rollei 35 | CineStill 400D', orientation: 'portrait', tags: ['nature', 'mer', 'italie', 'pouilles', 'été', 'vacances', 'cinestill 400d', 'bleu', 'chaleur', 'europe', 'fille', 'femme', 'woman', 'girl', 'soeurs', 'sisters', 'humain'],
                alt_accessible: { fr: "Deux jeunes femmes marchant dans une ruelle blanche, l'une en blanc, l'autre en robe sombre.", en: "Two young women walking in a white alley, one in white, the other in a dark dress." },
                caption_artistic: { fr: "Le Due Sorelle. Dans le dédale de chaux d'une ruelle des Pouilles, le temps semble suspendu. La composition joue sur une perspective fuyante classique, guidant le regard vers un horizon de ciel bleu. Saisies dans un mouvement d'arrêt, \"Le Due Sorelle\" offrent à l'objectif une synchronicité troublante. L'une en blanc éclatant, l'autre en robe sombre et transparente, elles incarnent une dualité complémentaire. Leurs regards directs transforment cet instantané de vacances en une scène de genre intemporelle, célébrant l'élégance naturelle de la jeunesse italienne.", en: "Le Due Sorelle. In the lime maze of a Puglia alley, time seems suspended. The composition plays on a classic vanishing perspective, guiding the gaze towards a blue sky horizon. Captured in a stopped movement, \"Le Due Sorelle\" offer the lens a disturbing synchronicity. One in brilliant white, the other in a dark transparent dress, they embody a complementary duality. Their direct gazes transform this holiday snapshot into a timeless genre scene, celebrating the natural elegance of Italian youth." }
            },
            {
                id: 9303, slug: 'l-attesa', url: '/images/puglia/carlota.jpg', title: "L'Attesa", category: 'portrait', seriesId: 'puglia-famiglia', technical_info: 'Rollei 35 | CineStill 400D', orientation: 'portrait', tags: ['nature', 'mer', 'italie', 'pouilles', 'été', 'vacances', 'cinestill 400d', 'bleu', 'chaleur', 'europe', 'fille', 'femme', 'woman', 'girl', 'rob'],
                alt_accessible: { fr: "Jeune femme assise jambes croisées sur des marches blanches, robe brune.", en: "Young woman sitting cross-legged on white steps, brown dress." },
                caption_artistic: { fr: "L'Attesa. Dans la touffeur d'une ruelle, le temps semble s'être arrêté. Cette composition verticale saisit un instant de répit sur des marches de pierre blanchies à la chaux. Au premier plan, le sujet adopte une posture d'attente faussement nonchalante. Assise jambes croisées, la tête légèrement inclinée, elle fixe l'objectif avec une intensité calme. La robe brune aux jeux de transparence tranche avec l'éclat aveuglant de l'escalier, créant un plan fixe de cinéma où la beauté du modèle rivalise avec l'atmosphère écrasante de l'été italien.", en: "L'Attesa. In the stifling heat of an alley, time seems to have stopped. This vertical composition captures a moment of respite on whitewashed stone steps. In the foreground, the subject adopts a falsely nonchalant waiting posture. Sitting cross-legged, head slightly tilted, she stares at the lens with calm intensity. The brown dress with its transparency effects contrasts with the blinding glare of the staircase, creating a cinematic still shot where the model's beauty rivals the crushing atmosphere of the Italian summer." }
            },
            {
                id: 9306, slug: 'il-salto', url: '/images/puglia/il-salto.jpg', title: 'Il Salto', category: 'portrait', seriesId: 'puglia-famiglia', technical_info: 'Rollei 35 | CineStill 400D', orientation: 'portrait', tags: ['nature', 'mer', 'italie', 'pouilles', 'été', 'vacances', 'cinestill 400d', 'bleu', 'chaleur', 'europe', 'fille', 'femme', 'woman', 'girl', 'soeurs', 'sisters', 'saut', 'jump'],
                alt_accessible: { fr: "Femme en suspension au-dessus de l'eau turquoise, tenue par la main par une autre femme.", en: "Woman suspended above turquoise water, held by the hand by another woman." },
                caption_artistic: { fr: "Il Salto. La photographie est une étude de l'envol, découpée par la ligne d'horizon qui sépare un tiers de ciel azur de deux tiers d'une eau turquoise profonde. Le duo fonctionne en asymétrie : Charlotte, ancrée au sol, retient par la main sa sœur aînée Alice, saisie dans une lévitation miraculeuse. Le corps en croix, suspendu au-dessus des flots, un pied effleurant à peine la pierre, elle fixe sa chute imminente. C'est la capture pure de l'apesanteur, un arrêt sur image vertigineux où la gravité semble avoir oublié de s'appliquer.", en: "Il Salto. The photograph is a study of flight, cut by the horizon line separating a third of azure sky from two thirds of deep turquoise water. The duo works in asymmetry: Charlotte, anchored to the ground, holds her older sister Alice by the hand, captured in a miraculous levitation. Body in a cross, suspended above the waves, one foot barely brushing the stone, she stares at her imminent fall. It is the pure capture of weightlessness, a dizzying freeze-frame where gravity seems to have forgotten to apply." }
            },
            {
                id: 9302, slug: 'problema-della-benzina', url: '/images/puglia/problema-della-benzina.jpg', title: 'Problema della Benzina', category: 'urban', seriesId: 'puglia-famiglia', technical_info: 'Rollei 35 | CineStill 400D', orientation: 'landscape', tags: ['nature', 'mer', 'italie', 'pouilles', 'été', 'vacances', 'cinestill 400d', 'bleu', 'chaleur', 'europe', 'sea', 'italy', 'summer', 'holiday', 'gas station', 'station essence', 'vintage'],
                alt_accessible: { fr: "Station essence vintage surexposée sur la gauche par un effet de pellicule.", en: "Vintage gas station overexposed on the left by a film effect." },
                caption_artistic: { fr: "Problema della Benzina. Cette image est un manifeste de l'imprévu argentique. Ce qui devait être un cliché documentaire d'une station-service vintage est devenu une œuvre abstraite. La photographie est amputée de son tiers gauche par une brûlure blanche, une surexposition violente qui masque l'origine de la route et dialogue avec le mât de l'enseigne \"Italiana Benzina\". Le titre ironique joue sur cette double lecture : la panne d'essence suggérée par le lieu, et la panne technique de l'image elle-même. Une imperfection assumée qui rappelle la fragilité de l'interprétation photographique.", en: "Problema della Benzina. This image is a manifesto of the analog unforeseen. What was supposed to be a documentary shot of a vintage gas station became an abstract work. The photograph is amputated of its left third by a white burn, a violent overexposure masking the road's origin and dialogue with the \"Italiana Benzina\" sign mast. The ironic title plays on this double reading: the fuel shortage suggested by the place, and the technical breakdown of the image itself. An assumed imperfection reminding of the fragility of photographic interpretation." }
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
        seo_title: { fr: "Retro Mountain - Thollon-les-Mémises Ski Vintage (Rollei Retro 400S)", en: "Retro Mountain - Thollon-les-Mémises Vintage Skiing" },
        photos: [
            {
                id: 9105, slug: 'tree-shape', url: '/images/retro-mountain/tree-shape.jpg', title: 'Géométrie Naturelle', category: 'bnw', seriesId: 'retro-mountain', technical_info: 'Rollei 35 | Rollei Retro 400S', orientation: 'portrait', tags: ['bnw', 'montagne', 'alpes', 'suisse', 'noir et blanc', 'ski', 'hiver', 'rollei retro 400s', 'europe', 'mountain', 'switzerland', 'black and white', 'winter', 'tree', 'arbre'],
                alt_accessible: { fr: "Silhouette noire d'un arbre au premier plan encadrant des montagnes enneigées lumineuses.", en: "Black silhouette of a tree in foreground framing bright snowy mountains." },
                caption_artistic: { fr: "Géométrie Naturelle. Clôturant cette série, cette composition verticale abandonne la figure humaine pour se concentrer sur la structure du paysage. L'image est construite comme une estampe : le premier plan, d'un noir d'encre, sature la partie droite d'une végétation ciselée dont la netteté est presque coupante. Ce cadre organique sombre ouvre une fenêtre sur les sommets suisses d'une clarté cristalline. C’est une étude sur la profondeur où la lumière et l'ombre dessinent les formes brutes de la montagne.", en: "Natural Geometry. Closing this series, this vertical composition abandons the human figure to focus on the landscape structure. The image is built like a print: the foreground, ink black, saturates the right part with chiseled vegetation whose sharpness is almost cutting. This dark organic frame opens a window onto crystal clear Swiss peaks. It is a study on depth where light and shadow draw the mountain's raw forms." }
            },
            {
                id: 9104, slug: 'lawrence', url: '/images/retro-mountain/lawrence.jpg', title: "Lawrence d'Hiver", category: 'bnw', seriesId: 'retro-mountain', technical_info: 'Rollei 35 | Rollei Retro 400S', orientation: 'landscape', tags: ['bnw', 'montagne', 'alpes', 'suisse', 'noir et blanc', 'ski', 'hiver', 'rollei retro 400s', 'europe', 'mountain', 'switzerland', 'black and white', 'winter', 'lac', 'lake'],
                alt_accessible: { fr: "Silhouette sombre de profil avec turban sur un balcon surplombant un paysage brumeux.", en: "Dark profile silhouette with turban on a balcony overlooking a misty landscape." },
                caption_artistic: { fr: "Lawrence d'Hiver. Capturée depuis un balcon surplombant le Lac Léman, cette photographie horizontale bascule dans l'onirisme. Le sujet, relégué sur le flanc gauche, est réduit à l'état de silhouette d'encre par un contre-jour radical. De cette ombre chinoise ne subsistent que les contours d'un profil barbu et d'un turban inattendu, convoquant l'imaginaire de Lawrence d'Arabie au cœur des Alpes. Le reste de l'image est une étude de textures où la cime noire des sapins semble flotter sur une mer de brume et de dégradés de gris.", en: "Winter Lawrence. Captured from a balcony overlooking Lake Geneva, this horizontal photograph tips into dreamlike quality. The subject, relegated to the left flank, is reduced to an ink silhouette by radical backlighting. From this shadow puppet show remain only the contours of a bearded profile and an unexpected turban, summoning the imagery of Lawrence of Arabia in the heart of the Alps. The rest of the image is a study of textures where the black tops of fir trees seem to float on a sea of mist and shades of gray." }
            },
            {
                id: 9102, slug: 'contre-plongee', url: '/images/retro-mountain/contre-plongee.jpg', title: "L'Observatoire", category: 'bnw', seriesId: 'retro-mountain', technical_info: 'Rollei 35 | Rollei Retro 400S', orientation: 'landscape', tags: ['bnw', 'montagne', 'alpes', 'suisse', 'noir et blanc', 'ski', 'hiver', 'rollei retro 400s', 'europe', 'mountain', 'switzerland', 'black and white', 'winter', 'man', 'homme', 'architecture'],
                alt_accessible: { fr: "Homme assis les jambes dans le vide sur un toit en béton, vu en contre-plongée avec montagnes en fond.", en: "Man sitting legs dangling on a concrete roof, low angle view with mountains in background." },
                caption_artistic: { fr: "L'Observatoire. Cette photographie horizontale est une leçon de géométrie. Le sujet trône au bord d'une structure cubique, un toit de garage transformé en piédestal brut. La prise de vue en contre-plongée inverse les rapports de force : assis les pieds dans le vide, il domine l'objectif d'un regard insondable. L'arrière-plan construit une scène théâtrale où les courbes organiques des montagnes sont brutalement tranchées par la ligne rigide du béton, isolant cette figure solitaire entre la banalité humaine et l'immensité des cimes.", en: "The Observatory. This horizontal photograph is a geometry lesson. The subject sits on the edge of a cubic structure, a garage roof transformed into a raw pedestal. The low-angle shot reverses power dynamics: sitting with feet in the void, he dominates the lens with an inscrutable gaze. The background builds a theatrical scene where organic mountain curves are brutally sliced by the rigid concrete line, isolating this solitary figure between human banality and the vastness of the peaks." }
            },
            {
                id: 9103, slug: 'la-raclette', url: '/images/retro-mountain/la-raclette.jpg', title: "Le Rituel", category: 'bnw', seriesId: 'retro-mountain', technical_info: 'Rollei 35 | Rollei Retro 400S', orientation: 'landscape', tags: ['bnw', 'montagne', 'alpes', 'suisse', 'noir et blanc', 'ski', 'hiver', 'rollei retro 400s', 'europe', 'mountain', 'switzerland', 'black and white', 'winter', 'raclette', 'food', 'repas', 'intérieur'],
                alt_accessible: { fr: "Plan rapproché d'un repas de raclette avec appareil photo vintage au premier plan.", en: "Close-up of a raclette meal with vintage camera in foreground." },
                caption_artistic: { fr: "Le Rituel. Rompant avec la majesté froide des extérieurs, cette scène d'intérieur plonge le spectateur dans l'intimité du vieux chalet. L'utilisation du flash direct sculpte l'image avec une brutalité esthétique assumée : au premier plan, la demi-meule de fromage devient un bloc de matière minérale. La composition est dictée par l'appareil vintage qui barre la diagonale, laissant surgir Amaury dans l'interstice. Une célébration sans filtre de la convivialité alpine, transformant un repas traditionnel en une nature morte vivante.", en: "The Ritual. Breaking with the cold majesty of exteriors, this interior scene plunges the viewer into the intimacy of the old chalet. The use of direct flash sculpts the image with assumed aesthetic brutality: in the foreground, the half-wheel of cheese becomes a block of mineral matter. The composition is dictated by the vintage camera barring the diagonal, letting Amaury emerge in the gap. An unfiltered celebration of Alpine conviviality, transforming a traditional meal into a living still life." }
            },
            {
                id: 9106, slug: 'contemplation-retro', url: '/images/retro-mountain/contemplation.jpg', title: 'Mise en Abyme', category: 'bnw', seriesId: 'retro-mountain', technical_info: 'Rollei 35 | Rollei Retro 400S', orientation: 'landscape', tags: ['bnw', 'montagne', 'alpes', 'suisse', 'noir et blanc', 'ski', 'hiver', 'rollei retro 400s', 'europe', 'mountain', 'switzerland', 'black and white', 'winter', 'camera', 'appareil photo'],
                alt_accessible: { fr: "Appareil photo Nikon posé sur une rambarde givrée face à un panorama flou de montagnes.", en: "Nikon camera resting on a frosted railing facing a blurred mountain panorama." },
                caption_artistic: { fr: "Mise en Abyme. Radicale, cette photographie rompt avec la quête obsessionnelle de la netteté pour explorer l'esthétique de l'effacement. Posé sur une rambarde givrée face aux sommets suisses, un boîtier Nikon — l'outil même du regard — devient ici l'objet regardé. Le traitement est pictural, presque impressionniste, noyant la scène dans un flou artistique volontaire. Ce n'est plus un appareil photo, c'est le souvenir d'une prise de vue, une trace visuelle qui s'évapore dans l'atmosphère hivernale.", en: "Mise en Abyme. Radical, this photograph breaks with the obsessive quest for sharpness to explore the aesthetic of erasure. Resting on a frosted railing facing Swiss peaks, a Nikon camera — the very tool of vision — becomes here the viewed object. The treatment is pictorial, almost impressionist, drowning the scene in voluntary artistic blur. It is no longer a camera, it is the memory of a shot, a visual trace evaporating into the winter atmosphere." }
            },
            {
                id: 9101, slug: 'mountain-retro', url: '/images/retro-mountain/mountain-retro.jpg', title: 'Le Gardien des Cimes', category: 'portrait', seriesId: 'retro-mountain', technical_info: 'Rollei 35 | Rollei Retro 400S', orientation: 'portrait', tags: ['bnw', 'montagne', 'alpes', 'suisse', 'noir et blanc', 'ski', 'hiver', 'rollei retro 400s', 'europe', 'mountain', 'switzerland', 'black and white', 'winter', 'skieur', 'skier', 'man', 'homme'],
                alt_accessible: { fr: "Skieur solitaire debout de trois-quarts dans la neige, regardant l'horizon, noir et blanc contrasté.", en: "Solitary skier standing three-quarters in the snow, looking at the horizon, contrasted black and white." },
                caption_artistic: { fr: "Le Gardien des Cimes. Dans cette composition verticale d'une netteté absolue, le sujet s'impose au centre de l'image tel une sentinelle des hauteurs. De trois-quarts, le regard fixé vers l'horizon hors-champ, il adopte une posture statuaire, un genou fléchi ancrant sa présence dans la poudreuse. L'image est construite sur une géométrie rigoureuse : les lignes verticales des skis s'élancent vers un ciel qui se confond avec la neige. Le noir profond du pantalon et la texture du gilet en laine se détachent violemment sur le blanc immaculé, transformant une simple halte sur les pistes en une scène mythologique.", en: "The Guardian of the Peaks. In this vertical composition of absolute sharpness, the subject imposes himself in the center of the image like a sentinel of the heights. Three-quarters, gaze fixed towards the off-screen horizon, he adopts a statuesque posture, one knee bent anchoring his presence in the powder. The image is built on rigorous geometry: the vertical lines of skis soar towards a sky that merges with the snow. The deep black of the trousers and the texture of the wool vest stand out violently against the pristine white, transforming a simple stop on the slopes into a mythological scene." }
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
        seo_title: { fr: "A Winter in the Fruit - New York Photo Argentique de Rue", en: "A Winter in the Fruit - New York Analog Street Photography" },
        photos: [
            {
                id: 9401,
                slug: 'king-of-midtown',
                url: '/images/winter-in-the-fruit/empire-state.jpg',
                title: 'King of Midtown',
                category: 'urban',
                seriesId: 'winter-in-the-fruit',
                technical_info: 'Rollei 35 | Kodak Gold 400',
                orientation: 'landscape',
                tags: ['urban', 'ville', 'new york', 'usa', 'hiver', 'architecture', 'kodak gold 400', 'amerique', 'city', 'winter', 'america', 'building', 'immeuble', 'sky', 'ciel', 'empire state building', 'manhattan'],
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
                slug: 'quiet-central',
                url: '/images/winter-in-the-fruit/central-park-reading.jpg',
                title: 'Quiet Central',
                category: 'portrait',
                seriesId: 'winter-in-the-fruit',
                technical_info: 'Rollei 35 | Kodak Gold 400',
                orientation: 'portrait',
                tags: ['urban', 'ville', 'new york', 'usa', 'hiver', 'architecture', 'kodak gold 400', 'amerique', 'city', 'winter', 'america', 'park', 'parc', 'central park', 'woman', 'femme', 'reading', 'lecture'],
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
                slug: 'midnight-city',
                url: '/images/winter-in-the-fruit/central-park-night.jpg',
                title: 'Midnight City',
                category: 'urban',
                seriesId: 'winter-in-the-fruit',
                technical_info: 'Rollei 35 | Kodak Gold 400',
                orientation: 'landscape',
                tags: ['urban', 'ville', 'new york', 'usa', 'hiver', 'architecture', 'kodak gold 400', 'amerique', 'city', 'winter', 'america', 'night', 'nuit', 'lac', 'lake', 'reflection', 'reflet', 'central park'],
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
                slug: 'colors-of-december',
                url: '/images/winter-in-the-fruit/central-park-day.jpg',
                title: 'Colors of December',
                category: 'urban',
                seriesId: 'winter-in-the-fruit',
                technical_info: 'Rollei 35 | Kodak Gold 400',
                orientation: 'landscape',
                tags: ['urban', 'ville', 'new york', 'usa', 'hiver', 'architecture', 'kodak gold 400', 'amerique', 'city', 'winter', 'america', 'park', 'parc', 'lac', 'lake', 'canard', 'duck', 'central park'],
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
                slug: 'fawn-in-town',
                url: '/images/winter-in-the-fruit/jaguar-soho.jpg',
                title: 'Fawn in Town',
                category: 'urban',
                seriesId: 'winter-in-the-fruit',
                technical_info: 'Rollei 35 | Kodak Gold 400',
                orientation: 'portrait',
                tags: ['urban', 'ville', 'new york', 'usa', 'hiver', 'architecture', 'kodak gold 400', 'amerique', 'city', 'winter', 'america', 'car', 'voiture', 'jaguar', 'vintage', 'blue', 'bleu', 'street', 'rue'],
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
                slug: 'high-line-view',
                url: '/images/winter-in-the-fruit/highline-taxi.jpg',
                title: 'High Line View',
                category: 'urban',
                seriesId: 'winter-in-the-fruit',
                technical_info: 'Rollei 35 | Kodak Gold 400',
                orientation: 'portrait',
                tags: ['urban', 'ville', 'new york', 'usa', 'hiver', 'architecture', 'kodak gold 400', 'amerique', 'city', 'winter', 'america', 'taxi', 'yellow cab', 'voiture', 'car', 'street', 'rue', 'high line'],
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
                slug: 'underground',
                url: '/images/winter-in-the-fruit/underground.jpg',
                title: 'Underground',
                category: 'urban',
                seriesId: 'winter-in-the-fruit',
                technical_info: 'Rollei 35 | Kodak Gold 400',
                orientation: 'landscape',
                tags: ['urban', 'ville', 'new york', 'usa', 'hiver', 'architecture', 'kodak gold 400', 'amerique', 'city', 'winter', 'america', 'subway', 'métro', 'underground', 'transport', 'neon'],
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
        seo_title: { fr: "Psychadelic MTL - Montréal Insolite & Photo Infrarouge (LomoChrome)", en: "Psychadelic MTL - Unusual Montreal & Infrared Photo (LomoChrome)" },
        photos: [
            {
                id: 9201, slug: 'montreal-vis-versa', url: '/images/psychadelic-mtl/montreal-vis-versa.JPG', title: 'Monde Inversé', category: 'urban', seriesId: 'psychadelic-mtl', technical_info: 'Rollei 35 | LomoChrome Turquoise', orientation: 'landscape', tags: ['urban', 'ville', 'montréal', 'canada', 'expérimental', 'lomochrome turquoise', 'architecture', 'amerique', 'city', 'montreal', 'skyline', 'building', 'immeuble'],
                alt_accessible: { fr: "Skyline de Montréal avec ciel orange et tours bleu-vert, effet pellicule infrarouge LomoChrome.", en: "Montreal skyline with orange sky and blue-green towers, LomoChrome infrared film effect." },
                caption_artistic: { fr: "Vue du Mont-Royal. L'horizon familier de Montréal bascule dans l'irréel. Les tours iconiques du centre-ville se figent dans un bleu verdâtre spectral, occupant la moitié inférieure du cadre comme une cité engloutie. Au-dessus, le ciel subit une transmutation alchimique : l'azur cède la place à un orange satiné. Ce 'Monde Inversé' joue sur la complémentarité chromatique poussée à l'extrême.", en: "View from Mount Royal. Montreal's familiar skyline tips into the unreal. The iconic downtown towers freeze in a spectral greenish blue, occupying the lower half of the frame like a sunken city. Above, the sky undergoes an alchemical transmutation: azure gives way to a satin orange. This 'Inverted World' plays on chromatic complementarity pushed to the extreme." }
            },
            {
                id: 9202, slug: 'kapital-circle', url: '/images/psychadelic-mtl/kapital-circle.JPG', title: 'Oeil Urbain', category: 'urban', seriesId: 'psychadelic-mtl', technical_info: 'Rollei 35 | LomoChrome Turquoise', orientation: 'landscape', tags: ['urban', 'ville', 'montréal', 'canada', 'expérimental', 'lomochrome turquoise', 'architecture', 'amerique', 'city', 'montreal', 'art', 'sculpture', 'cercle', 'circle'],
                alt_accessible: { fr: "Anneau géant de la Place Ville Marie encadrant un gratte-ciel sur fond de ciel orange.", en: "Place Ville Marie giant ring framing a skyscraper against an orange sky." },
                caption_artistic: { fr: "Place Ville Marie. L'anneau monumental cesse d'être une simple sculpture pour devenir un oculaire braqué sur une réalité alternative. À travers ce cercle parfait, l'architecture rectangulaire du centre financier se dresse, transfigurée. Le verre des gratte-ciels ne reflète plus le bleu rassurant du jour, mais un ciel orange électrique. L'image capture une ville familière qui semble pourtant nous observer depuis une autre galaxie.", en: "Place Ville Marie. The monumental ring ceases to be a simple sculpture to become an eyepiece focused on an alternative reality. Through this perfect circle, the rectangular architecture of the financial center stands transfigured. The glass of the skyscrapers no longer reflects the reassuring blue of the day, but an electric orange sky. The image captures a familiar city that nevertheless seems to observe us from another galaxy." }
            },
            {
                id: 9205, slug: 'plots', url: '/images/psychadelic-mtl/plots.JPG', title: 'Mutation Signalétique', category: 'urban', seriesId: 'psychadelic-mtl', technical_info: 'Rollei 35 | LomoChrome Turquoise', orientation: 'landscape', tags: ['urban', 'ville', 'montréal', 'canada', 'expérimental', 'lomochrome turquoise', 'architecture', 'amerique', 'city', 'montreal', 'cone', 'construction'],
                alt_accessible: { fr: "Cônes de chantier bleus et blancs alignés sous un ciel inversé par la LomoChrome Turquoise.", en: "Blue and white construction cones aligned under a sky inverted by LomoChrome Turquoise." },
                caption_artistic: { fr: "Ironie montréalaise. Le cône de chantier — mascotte involontaire de la ville — subit ici une mutation génétique. Alignés en une perspective rigoureuse, les plots perdent leur orange strident pour alterner entre un blanc spectral et un bleu marine profond. En inversant les codes de sécurité chromatiques sous un ciel inversé, l'image transforme un banal alignement de travaux en une piste d'atterrissage pour un monde alien.", en: "Montreal irony. The construction cone — the city's unintentional mascot — undergoes a genetic mutation here. Aligned in a rigorous perspective, the cones lose their strident orange to alternate between spectral white and deep navy blue. By reversing chromatic safety codes under an inverted sky, the image transforms a banal construction alignment into a landing strip for an alien world." }
            },
            {
                id: 9203, slug: 'sharp-contrast', url: '/images/psychadelic-mtl/sharp-contrast.JPG', title: 'Sharp Contrast', category: 'urban', seriesId: 'psychadelic-mtl', technical_info: 'Rollei 35 | LomoChrome Turquoise', orientation: 'landscape', tags: ['urban', 'ville', 'montréal', 'canada', 'expérimental', 'lomochrome turquoise', 'architecture', 'amerique', 'city', 'montreal', 'building', 'immeuble', 'geometry', 'géométrie'],
                alt_accessible: { fr: "Immeuble en brique rouge devenu bleu-vert avec architecture géométrique sous ciel orange.", en: "Red brick building turned blue-green with geometric architecture under orange sky." },
                caption_artistic: { fr: "Géométrie brutale. Un immeuble en rénovation devient le théâtre d'une transmutation chimique. La brique rouge traditionnelle est convertie en un monolithe bleu-vert, découpé au scalpel par une contre-plongée vertigineuse. Le ciel, saturé d'un orange incendiaire, vient heurter les arêtes nettes du toit. En bas, les ombres du chantier sculptent la façade en gradins, créant un effet 'Lego' presque artificiel.", en: "Brutal geometry. A building under renovation becomes the theater of a chemical transmutation. Traditional red brick is converted into a blue-green monolith, cut by a scalpel in a dizzying low angle. The sky, saturated with incendiary orange, strikes the sharp edges of the roof. Below, construction shadows sculpt the facade into tiers, creating an almost artificial 'Lego' effect." }
            },
            {
                id: 9206, slug: 'frvr-in-dr', url: '/images/psychadelic-mtl/frvr-in-d-r.JPG', title: 'Forever in the Air', category: 'portrait', seriesId: 'psychadelic-mtl', technical_info: 'Rollei 35 | LomoChrome Turquoise', orientation: 'landscape', tags: ['urban', 'ville', 'montréal', 'canada', 'expérimental', 'lomochrome turquoise', 'architecture', 'amerique', 'city', 'montreal', 'skate', 'skater', 'skateur', 'jump', 'saut', 'sport'],
                alt_accessible: { fr: "Skateur en saut figé en l'air, manteau bleu électrique et ciel pâle.", en: "Skater frozen in mid-air jump, electric blue coat and pale sky." },
                caption_artistic: { fr: "Gravité suspendue. L'obturateur capture l'instant précis de l'apogée. Le skateur, accroupi en plein vol, flotte à un mètre cinquante du sol, détaché de son ombre. La chimie de la pellicule opère une mutation radicale : son manteau orange vire au bleu électrique, tandis que le ciel devient une fournaise pâle. Figé pour l'éternité, il est le seul élément dynamique d'une nature morte aux couleurs inversées.", en: "Suspended gravity. The shutter captures the precise moment of the apex. The skater, crouched in mid-flight, floats one and a half meters off the ground, detached from his shadow. The film's chemistry operates a radical mutation: his orange coat turns electric blue, while the sky becomes a pale furnace. Frozen for eternity, he is the only dynamic element of a still life with inverted colors." }
            },
            {
                id: 9204, slug: 'duo-on-cliff', url: '/images/psychadelic-mtl/duo-on-cliff.JPG', title: 'Duo on Cliff', category: 'portrait', seriesId: 'psychadelic-mtl', technical_info: 'Rollei 35 | LomoChrome Turquoise', orientation: 'landscape', tags: ['urban', 'ville', 'montréal', 'canada', 'expérimental', 'lomochrome turquoise', 'architecture', 'amerique', 'city', 'montreal', 'people', 'gens', 'silhouette'],
                alt_accessible: { fr: "Deux silhouettes sur une esplanade en contre-plongée sous un ciel orange incendiaire.", en: "Two silhouettes on an esplanade in low angle view under an incendiary orange sky." },
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
        seo_title: { fr: "Canadian Evasion - Road Trip Québec Photo Argentique", en: "Canadian Evasion - Quebec Road Trip Analog Photography" },
        photos: [
            {
                id: 9604, slug: 'bivouac', url: '/images/canadian-evasion/intrus.JPG', title: 'Bivouac', category: 'nature', seriesId: 'canadian-evasion', technical_info: 'Rollei 35 | Portra 400', orientation: 'landscape', tags: ['nature', 'canada', 'québec', 'voyage', 'route', 'portra 400', 'amerique', 'travel', 'roadtrip', 'quebec', 'camping', 'tent', 'tente', 'field', 'champ', 'blé'],
                alt_accessible: { fr: "Tente de camping solitaire dans un champ de blé, ambiance Into the Wild.", en: "Solitary camping tent in a wheat field, Into the Wild atmosphere." },
                caption_artistic: { fr: "Perdue dans l'immensité d'un 'openfield', la tente n'est plus un simple accessoire de camping, mais un module d'exploration posé sur une planète étrangère. Telle une capsule de survie, sa géométrie synthétique tranche avec le chaos organique des épis de blé. L'image fige une trace humaine éphémère : le bivouac sauvage comme unique point de repère, évoquant une solitude cinématique où l'explorateur n'est qu'un invité temporaire.", en: "Lost in the vastness of an 'openfield', the tent is no longer a simple camping accessory, but an exploration module landed on a foreign planet. Like a survival capsule, its synthetic geometry cuts through the organic chaos of wheat ears. The image freezes an ephemeral human trace: the wild bivouac as the only landmark, evoking a cinematic solitude where the explorer is only a temporary guest." }
            },
            {
                id: 9601, slug: 'route-infinie', url: '/images/canadian-evasion/infinity.JPG', title: 'Route Infinie', category: 'nature', seriesId: 'canadian-evasion', technical_info: 'Rollei 35 | Portra 400', orientation: 'landscape', tags: ['nature', 'canada', 'québec', 'voyage', 'route', 'portra 400', 'amerique', 'travel', 'roadtrip', 'quebec', 'road', 'forest', 'forêt'],
                alt_accessible: { fr: "Longue route droite traversant une forêt de conifères sous un ciel gris à Mont-Tremblant.", en: "Long straight road crossing a coniferous forest under a grey sky at Mont-Tremblant." },
                caption_artistic: { fr: "7h du matin, aux abords du Mont-Tremblant. L'image capture l'archétype du road-trip nord-américain : une ligne de fuite absolue qui fend l'océan vert des conifères. Sous un ciel laiteux, les nuages descendent toucher la cime des arbres, installant une atmosphère spectrale. Le bitume, gris et lézardé par les hivers, s'étend jusqu'à se dissoudre dans la brume. Face à cette géométrie implacable, le photographe n'est plus qu'un point minuscule confronté au vertige des distances.", en: "7 AM, near Mont-Tremblant. The image captures the archetype of the North American road trip: an absolute vanishing point cutting through the green ocean of conifers. Under a milky sky, clouds descend to touch the treetops, setting a spectral atmosphere. The asphalt, gray and cracked by winters, stretches until it dissolves into the mist. Faced with this relentless geometry, the photographer is nothing more than a tiny point confronted with the vertigo of distances." }
            },
            {
                id: 9603, slug: 'miroir-boreal', url: '/images/canadian-evasion/Mirroir-vert.JPG', title: 'Miroir Boréal', category: 'nature', seriesId: 'canadian-evasion', technical_info: 'Rollei 35 | Portra 400', orientation: 'landscape', tags: ['nature', 'canada', 'québec', 'voyage', 'route', 'portra 400', 'amerique', 'travel', 'roadtrip', 'quebec', 'lake', 'lac', 'reflection', 'reflet', 'mirror', 'miroir'],
                alt_accessible: { fr: "Reflet parfait de la forêt et du ciel dans un lac calme, symétrie naturelle.", en: "Perfect reflection of forest and sky in a calm lake, natural symmetry." },
                caption_artistic: { fr: "Une étude de symétrie absolue où l'horizon cesse d'être une fuite pour devenir un axe. La ligne verte des conifères scinde l'image en deux hémisphères parfaits : le ciel trouve son jumeau exact dans les eaux immobiles du lac. Cette répétition hypnotique n'est interrompue que par un rocher solitaire en bas à gauche — unique imperfection géologique qui brise la mathématique du reflet et ancre l'image dans le réel.", en: "A study of absolute symmetry where the horizon ceases to be an escape to become an axis. The green line of conifers splits the image into two perfect hemispheres: the sky finds its exact twin in the still waters of the lake. This hypnotic repetition is interrupted only by a lonely rock in the bottom left — a unique geological imperfection breaking the mathematics of the reflection and anchoring the image in reality." }
            },
            {
                id: 9606, slug: 'contemplation', url: '/images/canadian-evasion/contemplation.jpg', title: 'Contemplation', category: 'nature', seriesId: 'canadian-evasion', technical_info: 'Rollei 35 | Portra 400', orientation: 'landscape', tags: ['nature', 'canada', 'québec', 'voyage', 'route', 'portra 400', 'amerique', 'travel', 'roadtrip', 'quebec', 'sea', 'mer', 'chair', 'chaise', 'view', 'vue'],
                alt_accessible: { fr: "Deux fauteuils rouges et bleus face à l'immensité du paysage à Tadoussac.", en: "Two red and blue armchairs facing the landscape vastness in Tadoussac." },
                caption_artistic: { fr: "Tadoussac. Rupture chromatique. Après la rigueur des forêts, l'objectif sature soudainement les rouges et les bleus. Ces deux fauteuils tournent le dos à la terre pour faire face à l'immensité. Une tête dépasse à peine, trace de vie minimale, tandis que le siège de droite reste vide : une place laissée vacante pour le spectateur, invité à ce point de chute final où la route s'arrête et où le regard porte au-delà.", en: "Tadoussac. Chromatic rupture. After the rigor of forests, the lens suddenly saturates reds and blues. These two armchairs turn their backs to the land to face the immensity. A head barely peeks out, a minimal trace of life, while the right seat remains empty: a place left vacant for the viewer, invited to this final drop-off point where the road ends and the gaze carries beyond." }
            },
            {
                id: 9602, slug: 'le-saint-laurent', url: '/images/canadian-evasion/bout-du-monde.JPG', title: 'Le Saint-Laurent', category: 'nature', seriesId: 'canadian-evasion', technical_info: 'Rollei 35 | Portra 400', orientation: 'landscape', tags: ['nature', 'canada', 'québec', 'voyage', 'route', 'portra 400', 'amerique', 'travel', 'roadtrip', 'quebec', 'river', 'fleuve', 'water', 'eau'],
                alt_accessible: { fr: "Rive du fleuve Saint-Laurent avec forêt dense et eau bleue à perte de vue.", en: "Saint Lawrence river bank with dense forest and blue water as far as the eye can see." },
                caption_artistic: { fr: "Point de bascule. L'image matérialise la frontière physique du voyage. Sur la gauche, la densité verte de la forêt boréale s'effondre brutalement vers la rive, stoppée net par une force supérieure. Le reste du cadre est envahi par les nuances de bleu du Saint-Laurent. C'est une confrontation silencieuse entre deux immensités : la terre qui s'arrête et l'eau qui commence.", en: "Tipping point. The image materializes the physical border of the journey. On the left, the green density of the boreal forest collapses brutally towards the shore, stopped dead by a superior force. The rest of the frame is invaded by the shades of blue of the Saint Lawrence. It is a silent confrontation between two vastnesses: the land that ends and the water that begins." }
            },
            {
                id: 9605, slug: 'face-au-large', url: '/images/canadian-evasion/autoportrait.JPG', title: 'Face au Large', category: 'portrait', seriesId: 'canadian-evasion', technical_info: 'Rollei 35 | Portra 400', orientation: 'landscape', tags: ['nature', 'canada', 'québec', 'voyage', 'route', 'portra 400', 'amerique', 'travel', 'roadtrip', 'quebec', 'portrait', 'man', 'homme', 'sea', 'mer'],
                alt_accessible: { fr: "Photographe de dos face à la mer, portant un t-shirt blanc, regardant l'horizon.", en: "Photographer from behind facing the sea, wearing a white t-shirt, looking at the horizon." },
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
        seo_title: { fr: "Rue des Mauvais Garçons - Paris Vintage & Moto Classique", en: "Rue des Mauvais Garçons - Vintage Paris & Classic Motorcycles" },
        photos: [
            {
                id: 9001, slug: 'l-attente', url: '/images/mauvais-garcons/gab-moto-debout.jpg', title: "L'Attente", category: 'portrait', seriesId: 'mauvais-garcons', technical_info: 'Nikon F-301 | Portra 400', orientation: 'landscape', tags: ['urban', 'portrait', 'paris', 'france', 'moto', 'vintage', 'portra 400', 'europe', 'motorcycle', 'bécane', 'astor', 'homme', 'man'],
                alt_accessible: { fr: "Gabriel, dandy en manteau beige, adossé à un porche en bois dans le Marais.", en: "Gabriel, dandy in beige coat, leaning against a wooden porch in the Marais." },
                caption_artistic: { fr: "Dans une harmonie de beiges et de terres brûlées, Gabriel se fond dans l'architecture du Marais. Adossé au porche monumental, il semble faire corps avec le bois patiné. Son regard, fuyant vers la droite, brise la symétrie du cadre et introduit une narration invisible : qui attend-il ? Appuyé sur son Astor comme sur une ancre, il incarne une patience élégante.", en: "In a harmony of beiges and burnt earth, Gabriel blends into the architecture of the Marais. Leaning against the monumental porch, he seems to merge with the weathered wood. His gaze, fleeing to the right, breaks the frame's symmetry and introduces an invisible narrative: who is he waiting for? Leaning on his Astor like an anchor, he embodies an elegant patience." }
            },
            {
                id: 9004, slug: 'lecture-urbaine', url: '/images/mauvais-garcons/gab-bouquin.jpg', title: 'Lecture Urbaine', category: 'portrait', seriesId: 'mauvais-garcons', technical_info: 'Nikon F-301 | Portra 400', orientation: 'portrait', tags: ['urban', 'portrait', 'paris', 'france', 'moto', 'vintage', 'portra 400', 'europe', 'reading', 'lecture', 'book', 'livre', 'man', 'homme'],
                alt_accessible: { fr: "Gabriel lisant un livre accoudé à une rambarde Place des Vosges, gants et lunettes.", en: "Gabriel reading a book leaning on a railing at Place des Vosges, gloves and glasses." },
                caption_artistic: { fr: "Place des Vosges. Dans ce format vertical, Gabriel s'appuie sur l'histoire des lieux autant que sur la rambarde. La composition délibérée sature la moitié gauche, laissant le vide envahir la partie droite de l'image — un espace négatif lourd de sens, réservé à celle ou celui qui n'arrive pas. Ganté, lunetté, il trompe l'attente par l'érudition.", en: "Place des Vosges. In this vertical format, Gabriel leans on the history of the place as much as on the railing. The deliberate composition saturates the left half, leaving the void to invade the right part of the image — a negative space heavy with meaning, reserved for the one who does not arrive. Gloved, spectacled, he cheats the wait with erudition." }
            },
            {
                id: 9005, slug: 'l-heure-bleue', url: '/images/mauvais-garcons/gab-lampadaire.jpg', title: "L'Heure Bleue", category: 'urban', seriesId: 'mauvais-garcons', technical_info: 'Nikon F-301 | Portra 400', orientation: 'portrait', tags: ['urban', 'portrait', 'paris', 'france', 'moto', 'vintage', 'portra 400', 'europe', 'street lamp', 'lampadaire', 'night', 'nuit', 'man', 'homme'],
                alt_accessible: { fr: "Gabriel perché sur un muret accroché à un lampadaire, quai de l'Île Saint-Louis au crépuscule.", en: "Gabriel perched on a low wall holding a street lamp, Île Saint-Louis quay at twilight." },
                caption_artistic: { fr: "Sur les quais de l'Île Saint-Louis, la narration évolue. Le manteau est tombé. Perché sur le muret, Gabriel s'accroche à un réverbère comme aux aiguilles d'une horloge arrêtée. Cette suspension, physique et temporelle, contraste avec l'ancrage immuable du Panthéon qui se découpe à l'horizon. Il danse avec l'absence sous la lumière naissante du crépuscule.", en: "On the quays of Île Saint-Louis, the narrative evolves. The coat has fallen. Perched on the low wall, Gabriel hangs on to a street lamp like the hands of a stopped clock. This suspension, physical and temporal, contrasts with the immutable anchor of the Pantheon silhouetted on the horizon. He dances with absence under the rising light of twilight." }
            },
            {
                id: 9002, slug: 'astor-sur-seine', url: '/images/mauvais-garcons/moto-seine.jpg', title: 'Astor sur Seine', category: 'urban', seriesId: 'mauvais-garcons', technical_info: 'Nikon F-301 | Portra 400', orientation: 'landscape', tags: ['urban', 'portrait', 'paris', 'france', 'moto', 'vintage', 'portra 400', 'europe', 'motorcycle', 'bécane', 'astor', 'seine', 'quais'],
                alt_accessible: { fr: "Moto Astor vintage garée sur les pavés des quais de Seine.", en: "Vintage Astor motorcycle parked on the Seine quay cobblestones." },
                caption_artistic: { fr: "Rupture de rythme. Le cadre bascule à l'horizontal et l'humain s'efface. Seule demeure l'Astor, béquillée sur les pavés, se découpant sur le fil de l'eau telle une icône vintage. L'absence de Gabriel charge l'image d'une tension nouvelle. La machine reste là, fidèle destrier et témoin silencieux, seule ancre immobile face au temps qui coule comme la Seine.", en: "Rhythm break. The frame shifts to horizontal and the human fades away. Only the Astor remains, propped up on the cobblestones, silhouetted against the water like a vintage icon. Gabriel's absence charges the image with a new tension. The machine remains there, faithful steed and silent witness, the only motionless anchor facing time flowing like the Seine." }
            },
            {
                id: 9003, slug: 'regard-rive-droite', url: '/images/mauvais-garcons/gab-seine.jpg', title: 'Regard Rive Droite', category: 'portrait', seriesId: 'mauvais-garcons', technical_info: 'Nikon F-301 | Portra 400', orientation: 'landscape', tags: ['urban', 'portrait', 'paris', 'france', 'moto', 'vintage', 'portra 400', 'europe', 'motion', 'mouvement', 'blur', 'flou', 'man', 'homme', 'seine'],
                alt_accessible: { fr: "Silhouette floue de Gabriel marchant sur un pont de Paris, effet de mouvement.", en: "Blurred silhouette of Gabriel walking on a Paris bridge, motion effect." },
                caption_artistic: { fr: "Sur le pont ralliant l'Île Saint-Louis, la photographie se fait impressionniste. L'appareil refuse la netteté au sujet pour l'offrir au décor : Gabriel n'est plus qu'une silhouette floue, happée par le mouvement. En laissant le dandy se fondre dans le flou cinétique pour focaliser sur la Seine immuable, l'image capture l'essence de la traque : le décor reste, les hommes passent.", en: "On the bridge joining Île Saint-Louis, photography becomes impressionistic. The camera refuses sharpness to the subject to offer it to the setting: Gabriel is nothing more than a blurred silhouette, caught in movement. By letting the dandy melt into kinetic blur to focus on the immutable Seine, the image captures the essence of the hunt: the setting remains, men pass." }
            },
            {
                id: 9006, slug: 'le-rendez-vous', url: '/images/mauvais-garcons/le-rendez-vous.jpg', title: 'Le Rendez-vous', category: 'portrait', seriesId: 'mauvais-garcons', technical_info: 'Nikon F-301 | Portra 400', orientation: 'landscape', tags: ['urban', 'portrait', 'paris', 'france', 'moto', 'vintage', 'portra 400', 'europe', 'motorcycle', 'bécane', 'astor', 'homme', 'man', 'lunettes'],
                alt_accessible: { fr: "Portrait de Gabriel avec lunettes noires assis sur sa moto Astor, regard fixe.", en: "Portrait of Gabriel with black glasses sitting on his Astor motorcycle, staring gaze." },
                caption_artistic: { fr: "Épilogue. L'homme et la machine fusionnent à nouveau. Gabriel ne fuit plus, ne cherche plus : il fixe l'objectif. Derrière ses lunettes noires, l'expression est indéchiffrable — ni joie, ni colère, juste une intensité froide. L'histoire s'arrête sur ce face-à-face : le rendez-vous a eu lieu, mais personne ne saura jamais ce qui s'y est dit.", en: "Epilogue. Man and machine merge again. Gabriel no longer flees, no longer seeks: he stares at the lens. Behind his black glasses, the expression is indecipherable — neither joy nor anger, just a cold intensity. The story ends on this face-to-face: the meeting took place, but no one will ever know what was said." }
            }
        ]
    }
];

export const photos: Photo[] = seriesData.flatMap(series => series.photos);