// La page « Dans la voiture suiveuse » : ce qui roule à côté des étapes. Les outils de montage
// par IA et leurs reels (repris de SIDE), les travaux de concept (affiches, puis le projet
// EF Pro Cycling), et la direction artistique de l'AS Can Mines. Ordre voulu par Paul le
// 27/10/2026. Le projet EF vient d'une étude de cas faite pour un recrutement, présentée
// ici en travail de concept (accord de Paul).
import { SIDE, type Photo, type Side } from './chemin';
import { SIDE_EN } from './chemin-en';

export interface Work {
  photo: Photo;
  title: string;
  text: string;
}

export interface Voiture {
  title: string;
  lede: string;
  toolsTitle: string;
  side: Side;
  clubTitle: string;
  clubText: string;
  paletteLabel: string;
  palette: { hex: string; name: string }[];
  club: Photo[];
  conceptTitle: string;
  disclaimer: string;
  badge: string;
  posterTitle: string;
  posters: Work[];
  efTitle: string;
  efText: string;
  // Les quatre pièces du projet EF, dans l'ordre où elles sortent ; la deuxième est un
  // carrousel (plusieurs photos), la troisième le reel.
  ef: { title: string; text: string; photos: Photo[] }[];
}

const clip = (name: string, duration: number) => ({ src: `/media/video/${name}.jpg`, video: `/media/video/${name}.mp4`, duration });
const visuel = (src: string) => ({ src });
const healy = (n: number) => `/media/ef/healy-card-${n}.jpg`;

export const VOITURE: Voiture = {
  title: 'Dans la voiture suiveuse',
  lede: SIDE.lede,
  toolsTitle: 'Les outils de montage',
  side: SIDE,
  clubTitle: 'AS Can Mines, une direction artistique rouge et or',
  clubText:
    'L’identité des réseaux de l’AS Can Mines, club de football amateur parisien. Le rouge du maillot et l’or du blason sur un fond papier, une typo condensée avec une écriture manuscrite, et les photos de match virées en monochrome rouge. Chaque semaine, les mêmes gabarits servent pour l’annonce du match, le score final et le classement.',
  paletteLabel: 'Palette',
  palette: [
    { hex: '#d8504f', name: 'Rouge maillot' },
    { hex: '#842121', name: 'Rouge profond' },
    { hex: '#e8b868', name: 'Or' },
    { hex: '#f6e8ca', name: 'Papier crème' },
  ],
  club: [
    { ...visuel('/DA-ASCanMines-Foot/1.png'), alt: 'AS Can Mines, annonce de match' },
    { ...visuel('/DA-ASCanMines-Foot/2.png'), alt: 'AS Can Mines, score final' },
    { ...visuel('/DA-ASCanMines-Foot/3.png'), alt: 'AS Can Mines, classement' },
  ],
  conceptTitle: 'Travaux de concept',
  disclaimer: 'Réalisés de ma propre initiative, à partir de photos de presse et d’images de diffusion. Les équipes et les courses citées ne les ont pas commandés.',
  badge: 'Travail de concept',
  posterTitle: 'Affiches',
  posters: [
    {
      photo: { ...visuel('/CONCEPT-DCT/1.png'), alt: 'Decathlon CMA CGM, Paul Seixas, affiche de concept' },
      title: 'Decathlon CMA CGM, Paul Seixas',
      text: 'Paul Seixas en noir et blanc, une touche de jaune et un collage de Paris, sous le slogan « Yellow is the mission ».',
    },
    {
      photo: { ...visuel('/CONCEPT-DCT/2.png'), alt: 'Decathlon CMA CGM, Strade Bianche, affiche de concept' },
      title: 'Decathlon CMA CGM, Strade Bianche',
      text: 'L’annonce de la sélection : les coureurs réunis dans le blason de l’équipe, avec Sienne et les chemins blancs derrière eux.',
    },
    {
      photo: { ...visuel('/CONCEPT-DCT/save-the-date.png'), alt: 'Decathlon CMA CGM, ventes privées, affiche de concept' },
      title: 'Decathlon CMA CGM, ventes privées',
      text: 'Le save the date de la vente du matériel de l’équipe, en grille modulaire aux couleurs du maillot.',
    },
    {
      photo: { ...visuel('/milan-san-remo-poster.png'), alt: 'Milan-San Remo 2026, affiche de concept' },
      title: 'Milan-San Remo 2026',
      text: 'Une affiche de film pour la Primavera, « Directed by Tadej Pogačar », avec ses rivaux en tête d’affiche.',
    },
  ],
  efTitle: 'EF Pro Cycling, la victoire de Ben Healy sur le Tour',
  efText:
    'Le 10 juillet 2025, Ben Healy gagne en solitaire la 6e étape du Tour de France. J’ai imaginé ce que les réseaux d’EF Pro Cycling publient ce jour-là, heure par heure, puis l’annonce d’une recrue pour la saison suivante.',
  ef: [
    {
      title: 'Sur la ligne',
      text: 'Un visuel préparé sur gabarit avant l’étape. À l’arrivée, il ne reste qu’à poser la photo pour publier dans la minute.',
      photos: [{ src: '/media/ef/stage-6-pink.jpg', alt: 'EF Pro Cycling, « Stage 6 is pink », visuel de concept' }],
    },
    {
      title: 'Une heure après',
      text: 'Un carrousel de cinq cartes à jouer : une échappée se gagne aussi en choisissant le moment d’abattre ses cartes.',
      photos: [1, 2, 3, 4, 5].map((n) => ({ src: healy(n), alt: `EF Pro Cycling, Ben Healy, carte ${n} sur 5 du carrousel de concept` })),
    },
    {
      title: 'Deux heures après',
      text: 'L’interview d’après-course remontée en vertical : la question posée à Healy ouvre le reel, sa réponse le referme.',
      photos: [{ ...clip('concept-ef-tour', 81), alt: 'EF Pro Cycling, Ben Healy, reel de concept' }],
    },
    {
      title: 'Le recrutement',
      text: 'L’arrivée de Luke Lamperti : le maillot de son ancienne équipe passé en noir et blanc, le rose d’EF par-dessus.',
      photos: [{ src: '/media/ef/lamperti.jpg', alt: 'EF Pro Cycling, l’annonce de Luke Lamperti, visuel de concept' }],
    },
  ],
};

export const VOITURE_EN: Voiture = {
  title: 'In the team car',
  lede: SIDE_EN.lede,
  toolsTitle: 'The editing tools',
  side: SIDE_EN,
  clubTitle: 'AS Can Mines, a red and gold art direction',
  clubText:
    'The social media identity of AS Can Mines, an amateur football club in Paris. The red of the kit and the gold of the crest on a paper background, a condensed typeface with handwritten script, and match photos toned in red monochrome. Every week, the same templates carry the matchday, the final score and the league table.',
  paletteLabel: 'Palette',
  palette: [
    { hex: '#d8504f', name: 'Kit red' },
    { hex: '#842121', name: 'Deep red' },
    { hex: '#e8b868', name: 'Gold' },
    { hex: '#f6e8ca', name: 'Cream paper' },
  ],
  club: [
    { ...visuel('/DA-ASCanMines-Foot/1.png'), alt: 'AS Can Mines, matchday' },
    { ...visuel('/DA-ASCanMines-Foot/2.png'), alt: 'AS Can Mines, final score' },
    { ...visuel('/DA-ASCanMines-Foot/3.png'), alt: 'AS Can Mines, league table' },
  ],
  conceptTitle: 'Concept work',
  disclaimer: 'Made on my own initiative, from press photos and broadcast images. The teams and races shown did not commission them.',
  badge: 'Concept work',
  posterTitle: 'Posters',
  posters: [
    { ...VOITURE.posters[0], photo: { ...VOITURE.posters[0].photo, alt: 'Decathlon CMA CGM, Paul Seixas, concept poster' }, text: 'Paul Seixas in black and white, a touch of yellow and a Paris collage, under the line "Yellow is the mission".' },
    { ...VOITURE.posters[1], photo: { ...VOITURE.posters[1].photo, alt: 'Decathlon CMA CGM, Strade Bianche, concept poster' }, text: 'The line-up announcement: the riders framed inside the team crest, with Siena and the white gravel roads behind them.' },
    { ...VOITURE.posters[2], photo: { ...VOITURE.posters[2].photo, alt: 'Decathlon CMA CGM, team sale, concept poster' }, title: 'Decathlon CMA CGM, team sale', text: 'The save the date for the sale of the team’s equipment, laid out as a modular grid in the kit colours.' },
    { ...VOITURE.posters[3], photo: { ...VOITURE.posters[3].photo, alt: 'Milan-San Remo 2026, concept poster' }, text: 'A film poster for La Primavera, "Directed by Tadej Pogačar", with his rivals as the leading cast.' },
  ],
  efTitle: 'EF Pro Cycling, Ben Healy’s Tour stage win',
  efText:
    'On 10 July 2025, Ben Healy won stage 6 of the Tour de France solo. I imagined what EF Pro Cycling’s social accounts post that day, hour by hour, then the announcement of a signing for the next season.',
  ef: [
    { ...VOITURE.ef[0], title: 'On the line', text: 'A graphic built on a template before the stage. At the finish, the photo goes in and it is out within the minute.', photos: [{ ...VOITURE.ef[0].photos[0], alt: 'EF Pro Cycling, "Stage 6 is pink", concept graphic' }] },
    { ...VOITURE.ef[1], title: 'One hour later', text: 'A carousel of five playing cards: a breakaway is also won by choosing when to lay your cards down.', photos: VOITURE.ef[1].photos.map((p, i) => ({ ...p, alt: `EF Pro Cycling, Ben Healy, card ${i + 1} of 5 of the concept carousel` })) },
    { ...VOITURE.ef[2], title: 'Two hours later', text: 'The post-race interview recut as a vertical story: the question put to Healy opens the reel, his answer closes it.', photos: [{ ...VOITURE.ef[2].photos[0], alt: 'EF Pro Cycling, Ben Healy, concept reel' }] },
    { ...VOITURE.ef[3], title: 'The signing', text: 'Luke Lamperti’s arrival: his former team’s kit turned black and white, with EF pink on top.', photos: [{ ...VOITURE.ef[3].photos[0], alt: 'EF Pro Cycling, Luke Lamperti announcement, concept graphic' }] },
  ],
};
