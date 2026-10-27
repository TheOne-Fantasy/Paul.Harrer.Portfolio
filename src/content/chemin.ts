// Le parcours de Paul lu comme le profil d'une étape, de 2015 à aujourd'hui.
// Dates validées par Paul le 26/10/2026 (approximatives quand il l'a dit).
// L'altitude est une illustration : elle ne mesure rien.

export interface Logo {
  name: string;
  src: string;
  ratio: number;  // largeur sur hauteur
  bg?: string;    // fond à poser derrière un logo transparent
}

export interface Photo {
  src: string;
  alt: string;
  position?: string;  // object-position, quand le sujet n'est pas au centre
  whole?: boolean;    // montrer la photo entière sur fond noir plutôt que la recadrer
  badge?: Logo;       // logo incrusté dans un coin, comme celui d'une chaîne
  video?: string;     // un extrait vidéo, dont src est l'image d'attente
  duration?: number;  // sa durée en secondes, le temps qu'il reste en tête de pile
}

export interface Link {
  label: string;
  href: string;
}

export interface Figure {
  value: string;
  label: string;
}

export interface Stage {
  id: string;        // pour retrouver l'étape d'une langue à l'autre
  year: number;      // position sur l'axe des années
  when: string;      // date, pour les lecteurs d'écran
  kind: string;      // type de point de passage, à la manière d'un livre de course
  name: string;
  detail: string;    // la date est dite dans la phrase
  icon?: Logo;       // un seul logo carré, à côté du nom sur le profil
  logos?: Logo[];    // les logos montrés dans la vue de l'étape
  photos?: Photo[];
  links?: Link[];
  figures?: Figure[];
  // Place de l'étiquette au-dessus du profil : ligne (0 en haut) et côté du trait.
  row: number;
  anchor: 'start' | 'end';
}

const LOGOS = {
  basketUsa: { name: 'Basket USA', src: '/media/logo-basket-usa.png', ratio: 1 },
  firstTeam: { name: 'First Team', src: '/firstteam101_logo.jpeg', ratio: 1 },
  sut: { name: 'Sports US Travels', src: '/media/logo-sports-us-travels.jpg', ratio: 1 },
  fts: { name: 'FT Sports', src: '/media/logo-fts.png', ratio: 1 },
  rouelibre: { name: 'Roue Libre', src: '/media/logo-roue-libre.png', ratio: 900 / 337 },
  pistonnes: { name: 'Les Pistonnés', src: '/media/logo-les-pistonnes.png', ratio: 900 / 375 },
  bureauOvale: { name: 'Bureau Ovale', src: '/media/logo-bureau-ovale.png', ratio: 900 / 314 },
  echappee: { name: "L’Échappée", src: '/Logo-Echappee.png', ratio: 1 },
  clutch: { name: 'Clutch', src: '/media/logo-clutch.jpg', ratio: 1 },
  cylindrique: { name: 'Cylindrique', src: '/Logo-Cylindrique.jpeg', ratio: 1 },
  cfjjb: { name: 'CFJJB', src: '/Logo-CFJJB.png', ratio: 4518 / 1600, bg: '#ffffff' },
  ohMyGoal: { name: 'Oh My Goal', src: '/oh_my_goal_logo.jpeg', ratio: 1 },
  blueFoxes: { name: 'Blue Foxes', src: '/blue_foxes_logo.jpeg', ratio: 1 },
  theOne: { name: 'The One Fantasy', src: '/media/logo-the-one-tuile.png', ratio: 1 },
  dazn: { name: 'DAZN', src: '/media/logo-dazn.png', ratio: 1 },
} satisfies Record<string, Logo>;

const youtube = (title: string, id: string): Link => ({ label: `${title}, sur YouTube`, href: `https://www.youtube.com/watch?v=${id}` });

export const START = 2015;
export const END = 2026.85;
// À partir d'ici, le profil passe à une plus grande échelle : les derniers kilomètres.
export const FINAL = 2025.6;

export const STAGES: Stage[] = [
  {
    id: 'cfpj', year: 2015, when: '2015', kind: 'Départ',
    name: 'CFPJ et Basket USA',
    detail: 'En 2015, je commence un master de journalisme digital au CFPJ, en alternance comme journaliste à Basket USA.',
    icon: LOGOS.basketUsa,
    photos: [{ src: '/media/cfpj-rue-du-louvre.jpg', alt: 'Le CFPJ, rue du Louvre à Paris' }],
    row: 0, anchor: 'start',
  },
  {
    id: 'first-team', year: 2017, when: '2017', kind: 'Côte de 4e catégorie',
    name: 'First Team',
    detail: "En 2017, je cofonde le média sport de First Team, chez Webedia puis Influx. Tout est à construire : j’y suis à la fois journaliste, réalisateur, monteur et community manager.",
    icon: LOGOS.firstTeam,
    photos: [
      { src: '/media/first-day-show-plateau.jpg', alt: "Le plateau du First Day Show, l’émission NBA de First Team" },
      { src: '/media/video/fds-plateau.jpg', video: '/media/video/fds-plateau.mp4', duration: 12, alt: 'Extrait du First Day Show, l’émission NBA de First Team' },
    ],
    row: 1, anchor: 'start',
  },
  {
    id: 'sports-us-travels', year: 2018, when: 'Août 2017 à août 2025', kind: 'Côte de 3e catégorie',
    name: 'Sports US Travels',
    detail: "D’août 2017 à août 2025, je cofonde et fais vivre Sports US Travels, une agence de voyages autour des sports américains. Je tiens sa communication digitale et j’encadre les voyageurs sur place.",
    icon: LOGOS.sut,
    photos: [{ src: '/media/sports-us-travels-associes.jpg', alt: 'Avec mes deux associés de Sports US Travels', whole: true }],
    links: [{ label: '@sportsustravels, sur Instagram', href: 'https://www.instagram.com/sportsustravels/' }],
    figures: [
      { value: '8 ans', label: "d’agence, d’août 2017 à août 2025" },
      { value: '4', label: 'ligues : NBA, NFL, MLB et NHL' },
    ],
    row: 2, anchor: 'start',
  },
  {
    id: 'ft-sports', year: 2020, when: '2020', kind: 'Col de 2e catégorie',
    name: 'Émissions FT Sports',
    detail: 'En 2020, je lance Roue Libre, ma première émission, puis Les Pistonnés et Bureau Ovale sur FT Sports, la petite sœur de First Team.',
    icon: LOGOS.fts,
    logos: [LOGOS.rouelibre, LOGOS.pistonnes, LOGOS.bureauOvale],
    photos: [{ src: '/media/plateau-cyclisme.jpg', alt: 'Le plateau de Roue Libre' }],
    row: 3, anchor: 'start',
  },
  {
    id: 'echappee', year: 2020.55, when: '2020', kind: 'Sprint intermédiaire',
    name: "L’Échappée et Clutch",
    detail: "La même année, je cofonde et j’anime L’Échappée avec Winamax, le premier talk cyclisme du digital français, des Grands Tours aux Classiques. Je deviens aussi consultant NBA dans Clutch.",
    icon: LOGOS.echappee,
    logos: [LOGOS.echappee, LOGOS.clutch],
    photos: [
      { src: '/media/plateau-echappee.jpg', alt: "Sur le plateau de L’Échappée", position: '50% 30%' },
      { src: '/media/video/echappee-awards.jpg', video: '/media/video/echappee-awards.mp4', duration: 12, alt: 'À l’antenne des awards 2026 de L’Échappée' },
    ],
    links: [
      youtube("La preview de la saison 2026 de L’Échappée", 'gBDeZCXNuIw'),
      youtube('Les awards 2026 de L’Échappée', 'VqK3ZrZT360'),
      youtube('Clutch, France-Allemagne', '1d5wIzhG9pM'),
    ],
    row: 4, anchor: 'start',
  },
  {
    id: 'redacteur', year: 2021.1, when: '2021', kind: 'Col de 1re catégorie',
    name: 'Rédacteur en chef',
    detail: 'À partir de 2021, je deviens rédacteur en chef de First Team, puis responsable du digital à la tête des community managers. Chaque compte a sa ligne éditoriale, pensée pour sa cible. Je suis aussi en lien avec les sponsors, pour les placements de produits et le suivi des livrables et des KPI.',
    icon: LOGOS.firstTeam,
    photos: [
      { src: '/media/wembanyama-plateau.jpg', alt: 'Interview de Victor Wembanyama pour First Team', position: '50% 25%' },
      { src: '/media/video/risacher-entretien.jpg', video: '/media/video/risacher-entretien.mp4', duration: 12, alt: 'Extrait de l’entretien avec Zaccharie Risacher, pour First Team' },
    ],
    links: [youtube("Zaccharie Risacher, l’entretien", 'eutokTzXWBk')],
    row: 5, anchor: 'start',
  },
  {
    id: 'terrain', year: 2023.3, when: '2021 à 2025', kind: 'Secteur pavé',
    name: 'Le terrain',
    detail: "De 2021 à 2025, je couvre la finale du Top 14, le All-Star Game NBA, la Coupe du monde de basket, l’EuroBasket, Paris-Roubaix, le WEC, et le Tour presque chaque été.",
    photos: [
      { src: '/media/terrain-cdm-2023-manille.jpg', alt: 'Coupe du monde de basket 2023, Manille' },
      { src: '/media/video/wec-pistonnes.jpg', video: '/media/video/wec-pistonnes.mp4', duration: 14, alt: 'Le vlog des Pistonnés au WEC, au Qatar' },
      { src: '/media/terrain-all-star-2022-cleveland.jpg', alt: 'All-Star Game NBA 2022, Cleveland' },
      { src: '/media/terrain-paris-roubaix.jpg', alt: 'Paris-Roubaix, secteur pavé de Tilloy' },
      { src: '/media/wec-paddock-alpine.jpg', alt: "WEC, paddock d’Alpine Endurance Team" },
      { src: '/media/terrain-tour-de-france.jpg', alt: 'Tour de France' },
      { src: '/media/interview-gobert-los-angeles.jpg', alt: 'Interview de Rudy Gobert, Los Angeles' },
      { src: '/media/nba-bord-de-terrain.jpg', alt: 'Tournage en bord de terrain, NBA' },
      { src: '/media/terrain-cdm-2023-equipe.jpg', alt: "Coupe du monde de basket 2023, avec l’équipe First Team" },
    ],
    links: [youtube('Le vlog du WEC au Qatar', 'w5dXFuLqQzI')],
    row: 6, anchor: 'start',
  },
  {
    id: '600k', year: 2025.4, when: '2025', kind: 'Col hors catégorie',
    name: '600 000 abonnés',
    detail: "En 2025, avec l’équipe, les comptes de First Team dépassent les 600 000 abonnés cumulés sur Instagram, TikTok, X, Facebook et YouTube. Ils partaient de zéro.",
    icon: LOGOS.firstTeam,
    photos: [
      { src: '/media/tournage-basket.jpg', alt: "Tournage au bord d’un terrain de basket", position: '30% 50%' },
      { src: '/media/video/kd-first-day-show.jpg', video: '/media/video/kd-first-day-show.mp4', duration: 12, alt: 'L’empreinte de Kevin Durant sur la NBA, une vidéo publiée sur l’Instagram de First Team' },
    ],
    links: [
      { label: 'La vidéo, sur Instagram', href: 'https://www.instagram.com/p/CoxY6espxHX/' },
      youtube('First Day Show, les Lakers éliminés', 'DZuwGFZNKWY'),
    ],
    figures: [
      { value: '600 000', label: 'abonnés cumulés' },
      { value: '2 000+', label: 'émissions réalisées' },
    ],
    row: 0, anchor: 'start',
  },
  {
    id: 'cylindrique', year: 2025.8, when: 'Depuis octobre 2025', kind: 'Attaque',
    name: 'Cylindrique',
    detail: 'Depuis octobre 2025, en indépendant avec Cylindrique, je construis la stratégie de contenu et la direction artistique de deux fédérations sportives nationales, dont la Confédération Française de Jiu-Jitsu Brésilien.',
    icon: LOGOS.cylindrique,
    logos: [LOGOS.cylindrique, LOGOS.cfjjb],
    photos: [{ src: '/media/cfjjb-guide-site.jpg', alt: 'Le guide stratégique média de la CFJJB, en ligne', position: '50% 0%' }],
    figures: [
      { value: '86', label: 'pages de guide pour la CFJJB' },
      { value: '2', label: 'chartes, artistique et éditoriale' },
      { value: '90', label: 'jours de feuille de route' },
    ],
    row: 1, anchor: 'start',
  },
  {
    id: 'oh-my-goal', year: 2025.95, when: 'Décembre 2025 à août 2026', kind: 'Montée finale',
    name: 'Oh My Goal',
    detail: 'De décembre 2025 à août 2026, je suis Content Strategist et Influence Manager pour Oh My Goal (Blue Foxes). La stratégie éditoriale passe par le recrutement et le coaching de créateurs.',
    icon: LOGOS.ohMyGoal,
    logos: [LOGOS.ohMyGoal, LOGOS.blueFoxes],
    photos: [{ src: '/media/omg-post-linkedin.jpg', alt: 'Mon post LinkedIn sur le deal adidas décroché par un créateur accompagné', position: '50% 0%' }],
    links: [{ label: 'Le post, sur LinkedIn', href: 'https://www.linkedin.com/posts/paul-harrer-b8759982_3-jours-cest-le-temps-quil-a-fallu-pour-activity-7428054884848934912-Ljgn' }],
    figures: [
      { value: '3 jours', label: "pour qu’un format de créateur décroche un deal avec adidas" },
      { value: '10 M+', label: "d’abonnés suivent ce média football" },
    ],
    row: 2, anchor: 'start',
  },
  {
    id: 'the-one', year: 2026.1, when: 'Février 2026', kind: 'Échappée en solitaire',
    name: 'The One Fantasy',
    detail: 'En 2026, je conçois et développe avec Claude un jeu de pronostics cyclistes, lancé en février puis vendu.',
    icon: LOGOS.theOne,
    photos: [{ src: '/media/the-one-un-pick.jpg', alt: 'Un visuel de lancement de The One Fantasy Cycling' }],
    figures: [
      { value: '4 160', label: 'inscrits' },
      { value: '86 %', label: "d’activation" },
      { value: '94 409', label: 'pronostics' },
    ],
    row: 3, anchor: 'start',
  },
  {
    id: 'dazn', year: 2026.7, when: 'Depuis septembre 2026', kind: 'Dernier kilomètre',
    name: 'DAZN',
    detail: "Depuis septembre 2026, je suis commentateur omnisport pour DAZN, avec la NFL le dimanche soir. Et toujours L’Échappée.",
    icon: LOGOS.dazn,
    photos: [{ src: '/media/dazn-nfl.jpg', alt: 'La NFL, que je commente le dimanche soir sur DAZN', position: '53% 40%', badge: LOGOS.dazn }],
    row: 4, anchor: 'end',
  },
];

// À côté des étapes : les outils de montage que Paul construit avec l'IA, et deux reels
// de L'Échappée qui en sortent (fournis par Paul le 27/10/2026).
export interface Side {
  title: string;
  lede: string;
  paragraphs: string[];
  tools: string;
  reels: Photo[];
}

export const SIDE: Side = {
  title: 'Dans la voiture suiveuse',
  lede: 'À côté des étapes, les outils de montage que je construis avec l’IA.',
  paragraphs: [
    'Le premier, construit avec Claude, transforme un extrait de plateau en reel vertical monté et habillé en code\u00a0: recadrage sur le visage, zooms calés sur les pauses, sous-titres mot à mot et cartes synchronisées sur la parole. Ces deux reels de L’Échappée en sortent.',
    'Le second découpe des plans de match en clips verticaux et carrés, sous-titrés, avec quatre looks au choix.',
  ],
  tools: 'Python, FFmpeg, Whisper, OpenCV et GSAP',
  reels: [
    { src: '/media/video/reel-evenepoel.jpg', video: '/media/video/reel-evenepoel.mp4', duration: 15, alt: 'Reel de L’Échappée\u00a0: Evenepoel hors du top 5\u00a0?' },
    { src: '/media/video/reel-mea-culpa.jpg', video: '/media/video/reel-mea-culpa.mp4', duration: 15, alt: 'Reel de L’Échappée\u00a0: Mea Culpa, le procès' },
  ],
};

// Points du profil (année, altitude de 0 à 100), tracés en segments droits
// comme sur un profil d'étape imprimé. Les sommets tombent sur les cols ;
// la montée finale commence après le départ de First Team.
export const PROFILE: [number, number][] = [
  [2015, 6], [2015.6, 9], [2016.2, 8], [2016.7, 13], [2017, 22], [2017.4, 17],
  [2018, 21], [2018.6, 26], [2019.2, 30], [2019.6, 38], [2020, 52], [2020.3, 46],
  [2020.55, 41], [2020.8, 52], [2021.1, 68], [2021.5, 60], [2022, 62], [2022.5, 59],
  [2023, 63], [2023.5, 60], [2024, 64], [2024.6, 61], [2025, 66], [2025.25, 74],
  [2025.4, 82], [2025.55, 72], [2025.7, 62], [2025.8, 68], [2025.88, 74], [2025.95, 78],
  [2026.05, 83], [2026.15, 87], [2026.3, 90], [2026.5, 94], [2026.7, 97], [2026.85, 100],
];

// Le secteur pavé, hachuré sous la courbe.
export const PAVES: [number, number] = [2021.5, 2025];
