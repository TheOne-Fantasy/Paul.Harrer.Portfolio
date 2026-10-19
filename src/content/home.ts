// Contenu de la page d'accueil. Chaque fait vient du profil vérifié de Paul
// (skill paul-harrer) ; ne rien ajouter qui n'y figure pas.

export type L = { fr: string; en: string };

export const LINKS = {
  email: 'paulharrer@hotmail.com',
  cv: '/CV-PaulHarrer-VC.pdf',
  linkedin: 'https://www.linkedin.com/in/pharrer/',
  instagram: 'https://www.instagram.com/plharrer/',
  x: 'https://x.com/HarrerPaul',
  youtube: (id: string) => `https://www.youtube.com/watch?v=${id}`,
};

export const NAV = {
  links: [
    { href: '#parcours', label: { fr: 'Parcours', en: 'Career' } },
    { href: '#terrain', label: { fr: 'Terrain', en: 'On location' } },
    { href: '#antenne', label: { fr: 'Antenne', en: 'On air' } },
    { href: '#creation', label: { fr: 'Création', en: 'Design' } },
    { href: '#contact', label: { fr: 'Contact', en: 'Contact' } },
  ],
  cv: { fr: 'Mon CV', en: 'My CV' },
  menu: { fr: 'Menu', en: 'Menu' },
  close: { fr: 'Fermer', en: 'Close' },
};

export const HERO = {
  first: 'Paul',
  last: 'Harrer',
  lede: {
    fr: "J'ai cofondé le média sport de First Team et fait grandir ses comptes de zéro à plus de 600 000 abonnés, avec plus de 2 000 émissions réalisées.",
    en: "I co-founded First Team's sports media and grew its accounts from zero to more than 600,000 followers, with over 2,000 shows directed.",
  },
  // Le bandeau façon télé reste fixe ; ses deux lignes changent avec l'image.
  frames: [
    {
      src: '/media/wembanyama-plateau.jpg',
      position: '50% 22%',
      title: { fr: 'Interview de Victor Wembanyama', en: 'Interview with Victor Wembanyama' },
      detail: { fr: 'First Team', en: 'First Team' },
    },
    {
      src: '/media/wec-paddock-alpine.jpg',
      position: '50% 30%',
      title: { fr: 'Paddock du WEC', en: 'WEC paddock' },
      detail: { fr: 'First Team', en: 'First Team' },
    },
    {
      src: '/media/nba-interview-philadelphie.jpg',
      position: '50% 40%',
      title: { fr: 'Tournage chez les Sixers', en: 'Filming with the Sixers' },
      detail: { fr: 'Philadelphie', en: 'Philadelphia' },
    },
    {
      src: '/media/nba-bord-de-terrain.jpg',
      position: '50% 35%',
      title: { fr: 'Tournage en bord de terrain', en: 'Courtside filming' },
      detail: { fr: 'NBA', en: 'NBA' },
    },
  ],
};

export const STATS = {
  heading: { fr: 'Une audience partie de zéro', en: 'An audience built from zero' },
  figure: { fr: '600 000', en: '600,000' },
  unit: { fr: 'abonnés', en: 'followers' },
  sentence: {
    fr: "Cumulés sur Instagram, TikTok, X, Facebook et YouTube, avec l'équipe de First Team.",
    en: 'Across Instagram, TikTok, X, Facebook and YouTube, with the First Team crew.',
  },
  photo: {
    src: '/media/tournage-basket.jpg',
    alt: { fr: 'Tournage au bord d’un terrain de basket', en: 'Filming at the side of a basketball court' },
  },
  more: [
    {
      value: { fr: '2 000+', en: '2,000+' },
      label: {
        fr: 'émissions réalisées, en studio, en multicam et en extérieur',
        en: 'shows directed, in studio, multicam and on location',
      },
    },
    {
      value: { fr: '11 ans', en: '11 years' },
      label: { fr: 'dans le sport digital, depuis Basket USA en 2014', en: 'in digital sport, since Basket USA in 2014' },
    },
  ],
};

export const FIRST_TEAM = {
  heading: { fr: "Le média que j'ai cofondé", en: 'The media I co-founded' },
  lead: {
    fr: "First Team, de janvier 2017 à septembre 2025, avec Webedia puis Influx. Tout était à construire : j'ai tenu l'éditorial, de journaliste à rédacteur en chef, et j'étais aussi celui qui publiait.",
    en: 'First Team, January 2017 to September 2025, with Webedia then Influx. Everything had to be built: I ran the editorial side, from reporter to editor-in-chief, and I was also the one who published.',
  },
  photo: {
    src: '/media/first-day-show-plateau.jpg',
    alt: {
      fr: "Le plateau du First Day Show, l'émission NBA de First Team",
      en: "The set of the First Day Show, First Team's NBA programme",
    },
  },
  roles: [
    {
      name: { fr: 'Éditorial', en: 'Editorial' },
      text: {
        fr: "Journaliste et chef d'édition, puis rédacteur en chef, avec une ligne éditoriale pensée pour la cible de chaque compte.",
        en: "Reporter and desk editor, then editor-in-chief, with an editorial line built for each account's audience.",
      },
    },
    {
      name: { fr: 'Production', en: 'Production' },
      text: {
        fr: 'Plus de 2 000 émissions et contenus longs et courts réalisés en studio, en multicam et en extérieur, du tournage au montage.',
        en: '2,000+ shows and long- and short-form pieces directed in studio, multicam and on location, from shoot to edit.',
      },
    },
    {
      name: { fr: 'Social media', en: 'Social media' },
      text: {
        fr: 'Community manager puis social media manager, puis à la tête des community managers : planning de publication et visuels Canva.',
        en: 'Community manager, then social media manager, then leading the community managers: publishing schedule and Canva visuals.',
      },
    },
    {
      name: { fr: 'Équipe et partenaires', en: 'Team and partners' },
      text: {
        fr: "Management d'une équipe pluridisciplinaire, de la rédaction à la technique, et suivi des sponsors : livrables et KPI.",
        en: 'Led a multidisciplinary team, from the newsroom to the crew, and handled sponsor deliverables and KPIs.',
      },
    },
  ],
  showsHeading: { fr: 'Quelques émissions', en: 'A few shows' },
  shows: [
    {
      id: 'eutokTzXWBk',
      img: '/media/yt-risacher-entretien.jpg',
      title: { fr: "Zaccharie Risacher, l'entretien", en: 'Zaccharie Risacher, the interview' },
    },
    {
      id: 'XClB8WCHz2Q',
      img: '/media/yt-monaco-lnb-club.jpg',
      title: { fr: 'Monaco champion de France, LNB Club', en: 'Monaco win the French title, LNB Club' },
    },
    {
      id: 'DZuwGFZNKWY',
      img: '/media/yt-lakers-first-day-show.jpg',
      title: { fr: 'First Day Show, les Lakers éliminés', en: 'First Day Show, the Lakers knocked out' },
    },
    {
      id: 'w5dXFuLqQzI',
      img: '/media/yt-wec-qatar-vlog.jpg',
      title: { fr: 'Le vlog du WEC au Qatar, FT Sports', en: 'The WEC vlog from Qatar, FT Sports' },
    },
  ],
  launched: {
    heading: { fr: "Les émissions que j'ai lancées", en: 'The shows I launched' },
    text: {
      fr: "Sur FT Sports, la petite sœur de First Team (aujourd'hui Offense), j'ai lancé et produit les émissions omnisports, et tourné des vlogs comme celui du WEC au Qatar.",
      en: "On FT Sports, First Team's sister channel (now called Offense), I launched and produced the multisport shows, and shot vlogs such as the WEC one in Qatar.",
    },
    names: ['Roue Libre', 'Les Pistonnés', 'Bureau Ovale'],
  },
};

export type ParcoursItem = {
  name: string;
  kind: L;
  years: L;
  href: string;
  img?: string;
  logo?: string;
  external?: boolean;
};

export const PARCOURS = {
  heading: { fr: 'Parcours', en: 'Career' },
  items: [
    {
      name: 'First Team',
      kind: { fr: 'Cofondateur et rédacteur en chef', en: 'Co-founder and editor-in-chief' },
      years: { fr: '2017 à 2025', en: '2017 to 2025' },
      href: '#first-team',
      img: '/media/yt-lakers-first-day-show.jpg',
    },
    {
      name: "L'Échappée",
      kind: { fr: 'Cofondateur et animateur', en: 'Co-founder and host' },
      years: { fr: 'Depuis 2020', en: 'Since 2020' },
      href: '#antenne',
      img: '/media/yt-echappee-preview-2026.jpg',
    },
    {
      name: 'DAZN',
      kind: { fr: 'Commentateur NFL', en: 'NFL commentator' },
      years: { fr: 'Depuis 2026', en: 'Since 2026' },
      href: '#antenne',
    },
    {
      name: 'Cylindrique',
      kind: { fr: 'Stratégie de contenu et direction artistique', en: 'Content strategy and art direction' },
      years: { fr: 'Depuis 2025', en: 'Since 2025' },
      href: '#missions',
      logo: '/Logo-Cylindrique.jpeg',
    },
    {
      name: 'Oh My Goal',
      kind: { fr: 'Stratégie de contenu et influence', en: 'Content strategy and influence' },
      years: { fr: '2025 à 2026', en: '2025 to 2026' },
      href: '#missions',
      logo: '/oh_my_goal_logo.jpeg',
    },
    {
      name: 'The One Fantasy',
      kind: { fr: 'Conçu et développé, puis vendu', en: 'Designed and built, then sold' },
      years: { fr: '2026', en: '2026' },
      href: '#projets',
      img: '/media/site-theone-fantasy.jpg',
    },
    {
      name: 'AS Can Mines',
      kind: { fr: 'Direction artistique', en: 'Art direction' },
      years: { fr: '2026', en: '2026' },
      href: '/work',
      img: '/DA-ASCanMines-Foot/1.png',
    },
    {
      name: 'Ebloch Legal',
      kind: { fr: 'Site web en Next.js', en: 'Next.js website' },
      years: { fr: 'Site', en: 'Website' },
      href: 'https://www.eblochlegal.com/',
      img: '/media/site-ebloch-legal.jpg',
      external: true,
    },
    {
      name: 'Sports US Travels',
      kind: { fr: 'Cofondateur, communication digitale', en: 'Co-founder, digital communication' },
      years: { fr: '2017 à 2025', en: '2017 to 2025' },
      href: '#missions',
      logo: '/sports_us_travels_logo.jpeg',
    },
    {
      name: 'Basket USA',
      kind: { fr: 'Journaliste', en: 'Reporter' },
      years: { fr: '2014 à 2017', en: '2014 to 2017' },
      href: '#a-propos',
    },
  ] as ParcoursItem[],
};

export type SportKey = 'basket' | 'rugby' | 'endurance' | 'cyclisme' | 'footus' | 'sportsus';

export const TERRAIN = {
  heading: { fr: 'Sur le terrain', en: 'On location' },
  intro: {
    fr: "Les compétitions couvertes avec First Team, puis le cyclisme et la NFL à l'antenne.",
    en: 'Competitions covered with First Team, then cycling and the NFL on air.',
  },
  filterLabel: { fr: 'Choisir un sport', en: 'Pick a sport' },
  all: { fr: 'Tout', en: 'All' },
  columns: {
    event: { fr: 'Événement', en: 'Event' },
    sport: { fr: 'Sport', en: 'Sport' },
    with: { fr: 'Pour', en: 'For' },
  },
  sports: {
    basket: { fr: 'Basket', en: 'Basketball' },
    rugby: { fr: 'Rugby', en: 'Rugby' },
    endurance: { fr: 'Endurance', en: 'Endurance' },
    cyclisme: { fr: 'Cyclisme', en: 'Cycling' },
    footus: { fr: 'Foot US', en: 'NFL' },
    sportsus: { fr: 'Sports US', en: 'US sports' },
  } as Record<SportKey, L>,
  rows: [
    { sport: 'basket', event: { fr: 'Coupe du monde de basket, deux éditions', en: 'Basketball World Cup, two editions' }, with: { fr: 'First Team', en: 'First Team' } },
    { sport: 'basket', event: { fr: 'EuroBasket, deux éditions', en: 'EuroBasket, two editions' }, with: { fr: 'First Team', en: 'First Team' } },
    { sport: 'rugby', event: { fr: 'Finales de Top 14', en: 'Top 14 finals' }, with: { fr: 'First Team', en: 'First Team' } },
    { sport: 'endurance', event: { fr: 'WEC, Qatar', en: 'WEC, Qatar' }, with: { fr: 'First Team', en: 'First Team' } },
    { sport: 'endurance', event: { fr: 'WEC, Bahreïn', en: 'WEC, Bahrain' }, with: { fr: 'First Team', en: 'First Team' } },
    { sport: 'cyclisme', event: { fr: 'Grands Tours et Classiques', en: 'Grand Tours and Classics' }, with: { fr: "L'Échappée, avec Winamax", en: "L'Échappée, with Winamax" } },
    { sport: 'footus', event: { fr: 'NFL, le dimanche soir', en: 'NFL, Sunday nights' }, with: { fr: 'DAZN', en: 'DAZN' } },
    { sport: 'sportsus', event: { fr: 'Séjours NBA, NFL, MLB et NHL', en: 'NBA, NFL, MLB and NHL trips' }, with: { fr: 'Sports US Travels', en: 'Sports US Travels' } },
  ] as { sport: SportKey; event: L; with: L }[],
  // Image montrée à côté du tableau selon le sport choisi ; null quand aucune n'existe.
  media: {
    all: { src: '/media/nba-interview-philadelphie.jpg', caption: { fr: 'Tournage chez les Sixers, Philadelphie', en: 'Filming with the Sixers, Philadelphia' } },
    basket: { src: '/media/yt-risacher-entretien.jpg', caption: { fr: "Zaccharie Risacher, l'entretien, First Team", en: 'Zaccharie Risacher, the interview, First Team' }, link: 'eutokTzXWBk' },
    rugby: null,
    endurance: { src: '/media/yt-wec-qatar-vlog.jpg', caption: { fr: 'Le vlog du WEC au Qatar, FT Sports', en: 'The WEC vlog from Qatar, FT Sports' }, link: 'w5dXFuLqQzI' },
    cyclisme: { src: '/media/yt-echappee-preview-2026.jpg', caption: { fr: "La preview de la saison 2026, L'Échappée", en: "The 2026 season preview, L'Échappée" }, link: 'gBDeZCXNuIw' },
    footus: null,
    sportsus: { src: '/media/nba-bord-de-terrain.jpg', caption: { fr: 'Bord de terrain NBA', en: 'NBA courtside' } },
  } as Record<'all' | SportKey, { src: string; caption: L; link?: string } | null>,
  watch: { fr: 'Voir la vidéo', en: 'Watch the video' },
};

export const ANTENNE = {
  heading: { fr: "À l'antenne", en: 'On air' },
  photo: {
    title: 'Roue Libre',
    detail: { fr: "Ma première émission, avant L'Échappée", en: "My first show, before L'Échappée" },
    src: '/media/plateau-cyclisme.jpg',
    alt: { fr: "Paul Harrer sur le plateau de Roue Libre, sa première émission, avant L'Échappée", en: "Paul Harrer on the set of Roue Libre, his first show, before L'Échappée" },
  },
  cards: [
    {
      name: "L'Échappée",
      role: { fr: 'Cofondateur et animateur, avec Winamax', en: 'Co-founder and host, with Winamax' },
      fact: {
        fr: 'Le premier talk cyclisme du digital français, depuis 2020. Grands Tours, Classiques et interviews.',
        en: "France's first digital cycling talk show, since 2020. Grand Tours, Classics and interviews.",
      },
      action: { fr: 'Voir une émission', en: 'Watch a show' },
      href: 'https://www.youtube.com/watch?v=gBDeZCXNuIw',
    },
    {
      name: 'Winamax',
      role: { fr: 'Consultant multisport', en: 'Multisport analyst' },
      fact: {
        fr: "Consultant NBA dans Clutch sur Winamax, comme chez First Team, avec un peu de F1 et de foot US.",
        en: 'NBA analyst on Clutch for Winamax, as at First Team, with some F1 and NFL.',
      },
      action: { fr: 'Voir une émission', en: 'Watch a show' },
      href: 'https://www.youtube.com/watch?v=2wefUwOdr88',
    },
    {
      name: 'DAZN',
      role: { fr: 'Commentateur NFL', en: 'NFL commentator' },
      fact: {
        fr: 'Je commente la NFL pour DAZN le dimanche soir, depuis septembre 2026.',
        en: 'I call NFL games for DAZN on Sunday nights, since September 2026.',
      },
    },
  ],
};

export const CREATION = {
  heading: { fr: 'Création visuelle', en: 'Visual design' },
  text: {
    fr: "La direction artistique rouge et or de l'AS Can Mines, réalisée pour le club. Puis des travaux de concept : un montage sur la victoire d'EF Pro Cycling au Tour, et des affiches pour Decathlon CMA CGM et Milan-San Remo.",
    en: "The red and gold art direction of AS Can Mines, made for the club. Then concept work: an edit of EF Pro Cycling's Tour stage win, and posters for Decathlon CMA CGM and Milan-San Remo.",
  },
  link: { fr: 'Voir le showreel et les affiches', en: 'See the showreel and posters' },
  images: [
    { src: '/DA-ASCanMines-Foot/1.png', alt: { fr: 'AS Can Mines, affiche Match Day', en: 'AS Can Mines, matchday poster' } },
    { src: '/DA-ASCanMines-Foot/2.png', alt: { fr: 'AS Can Mines, score final', en: 'AS Can Mines, final score' } },
    { src: '/DA-ASCanMines-Foot/3.png', alt: { fr: 'AS Can Mines, classement', en: 'AS Can Mines, league table' } },
    { src: '/media/loop-ef-victoire.mp4', poster: '/media/loop-ef-victoire.jpg', alt: { fr: "EF Pro Cycling, victoire d'étape sur le Tour, montage de concept", en: 'EF Pro Cycling, Tour de France stage win, concept edit' } },
    { src: '/CONCEPT-DCT/1.png', alt: { fr: 'Decathlon CMA CGM, Paul Seixas, affiche de concept', en: 'Decathlon CMA CGM, Paul Seixas, concept poster' } },
    { src: '/CONCEPT-DCT/2.png', alt: { fr: 'Decathlon CMA CGM, Strade Bianche, affiche de concept', en: 'Decathlon CMA CGM, Strade Bianche, concept poster' } },
    { src: '/CONCEPT-DCT/save-the-date.png', alt: { fr: 'Decathlon CMA CGM, ventes privées, affiche de concept', en: 'Decathlon CMA CGM, team sale, concept poster' } },
    { src: '/milan-san-remo-poster.png', alt: { fr: 'Milan-San Remo, affiche de concept', en: 'Milan-San Remo, concept poster' } },
  ],
};

export const PROJETS = {
  heading: { fr: "Ce que j'ai construit", en: "What I've built" },
  items: [
    {
      name: 'The One Fantasy Cycling',
      img: '/media/site-theone-fantasy.jpg',
      alt: { fr: "La page d'accueil de The One Fantasy Cycling", en: 'The One Fantasy Cycling home page' },
      text: {
        fr: "Un jeu de pronostics cyclistes que j'ai conçu et développé avec Claude (React, Supabase), lancé en février 2026 puis vendu à l'automne.",
        en: 'A cycling prediction game I designed and built with Claude (React, Supabase), launched in February 2026 and sold in the autumn.',
      },
      facts: [
        { value: { fr: '4 160', en: '4,160' }, label: { fr: 'inscrits', en: 'sign-ups' } },
        { value: { fr: '86 %', en: '86%' }, label: { fr: "d'activation", en: 'activation' } },
        { value: { fr: '94 409', en: '94,409' }, label: { fr: 'pronostics', en: 'picks' } },
        { value: { fr: '12', en: '12' }, label: { fr: 'compétitions', en: 'competitions' } },
      ],
      href: 'https://theone-fantasy.com/',
      linkLabel: 'theone-fantasy.com',
    },
    {
      name: 'Ebloch Legal',
      img: '/media/site-ebloch-legal.jpg',
      alt: { fr: "La page d'accueil d'Ebloch Legal", en: 'Ebloch Legal home page' },
      text: {
        fr: "Le site d'un cabinet d'avocats parisien en droit audiovisuel et propriété intellectuelle, conçu et développé en Next.js.",
        en: 'The website of a Paris law firm in media and intellectual property law, designed and built in Next.js.',
      },
      facts: [],
      href: 'https://www.eblochlegal.com/',
      linkLabel: 'eblochlegal.com',
    },
  ],
  tools: {
    fr: "Je construis aussi mes outils avec l'IA, comme un pipeline qui transforme des plans de match en clips verticaux sous-titrés (Python, FFmpeg, Whisper, OpenCV).",
    en: 'I also build my own tools with AI, such as a pipeline that turns match footage into subtitled vertical clips (Python, FFmpeg, Whisper, OpenCV).',
  },
  missionsHeading: { fr: 'Missions', en: 'Engagements' },
  missions: [
    {
      name: 'Cylindrique Consulting',
      years: { fr: 'Depuis 2025', en: 'Since 2025' },
      text: {
        fr: 'Stratégie de contenu et direction artistique pour deux fédérations sportives nationales, dont la Confédération Française de Jiu-Jitsu Brésilien : un guide de 86 pages et sa charte artistique et éditoriale.',
        en: 'Content strategy and art direction for two national sports federations, including the Confédération Française de Jiu-Jitsu Brésilien: an 86-page guide with its art and editorial charter.',
      },
    },
    {
      name: 'Oh My Goal (Blue Foxes)',
      years: { fr: '2025 à 2026', en: '2025 to 2026' },
      text: {
        fr: 'Content strategist et influence manager : stratégie éditoriale par le sourcing et le coaching de créateurs.',
        en: 'Content strategist and influence manager: editorial strategy through creator sourcing and coaching.',
      },
    },
    {
      name: 'Sports US Travels',
      years: { fr: '2017 à 2025', en: '2017 to 2025' },
      text: {
        fr: "L'agence de voyages sports US que j'ai cofondée et fait vivre pendant huit ans : communication digitale et encadrement sur place.",
        en: 'The US sports travel agency I co-founded and ran for eight years: digital communication and on-site guidance.',
      },
    },
  ],
};

export const ABOUT = {
  heading: { fr: 'À propos', en: 'About' },
  facts: [
    { label: { fr: 'Basé à', en: 'Based in' }, value: { fr: 'Annecy (installation automne 2026)', en: 'Annecy, France (moving in autumn 2026)' } },
    { label: { fr: 'Langues', en: 'Languages' }, value: { fr: 'Français, anglais (C1/C2)', en: 'French, English (C1/C2)' } },
    { label: { fr: 'Formation', en: 'Education' }, value: { fr: 'Master de journalisme digital, CFPJ Paris', en: "Master's in digital journalism, CFPJ Paris" } },
  ],
  text: {
    fr: "J'ai 33 ans et onze ans de métier dans le sport, depuis mes débuts de journaliste à Basket USA en 2014. Le cyclisme est mon domaine : je le raconte dans L'Échappée, et j'ai gravi le Galibier et l'Izoard. Je suis aussi de près le basket, le football, la F1 et le golf. Je tourne et je monte mes vidéos, et je conçois mes visuels sur Canva, Figma, Photoshop et Midjourney.",
    en: "I'm 33, with eleven years in sport since I started as a reporter at Basket USA in 2014. Cycling is my field: I talk about it on L'Échappée, and I've ridden up the Galibier and the Izoard. I also follow basketball, football, F1 and golf closely. I shoot and edit my own videos, and I design my visuals in Canva, Figma, Photoshop and Midjourney.",
  },
  photo: {
    src: '/media/paul-portrait.jpg',
    alt: { fr: 'Portrait de Paul Harrer', en: 'Portrait of Paul Harrer' },
  },
  cv: { fr: 'Télécharger mon CV (PDF)', en: 'Download my CV (PDF, in French)' },
};

export const CONTACT = {
  heading: { fr: 'Contact', en: 'Contact' },
  sentence: { fr: 'Un poste ou une mission : écrivez-moi.', en: 'A role or a project: write to me.' },
  place: { fr: 'Annecy, Haute-Savoie', en: 'Annecy, France' },
};

export const FOOTER = {
  what: { fr: 'Paul Harrer, sport et contenu', en: 'Paul Harrer, sport and content' },
  showreel: { fr: 'Showreel', en: 'Showreel' },
  cv: { fr: 'CV', en: 'CV' },
};
