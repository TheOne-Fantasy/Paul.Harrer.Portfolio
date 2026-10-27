// La page « Dans la voiture suiveuse » : ce qui roule à côté des étapes. Les outils de montage
// par IA et leurs reels (repris de SIDE), la direction artistique de l'AS Can Mines, et les
// travaux de concept, montages et affiches, non commandés. Textes repris de l'ancienne page
// /work, validés par Paul.
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
  intro: string;
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
  videoTitle: string;
  videos: Work[];
  posterTitle: string;
  posters: Work[];
}

const clip = (name: string, duration: number) => ({ src: `/media/video/${name}.jpg`, video: `/media/video/${name}.mp4`, duration });
const visuel = (src: string) => ({ src });

export const VOITURE: Voiture = {
  title: 'Dans la voiture suiveuse',
  lede: 'Ce qui roule à côté des étapes\u00a0: les outils de montage que je construis avec l’IA, et mes travaux de direction artistique.',
  intro: 'Des montages et des visuels pensés pour les réseaux, pour montrer comment je repère un moment et comment je l’habille pour qu’il se partage.',
  toolsTitle: 'Les outils de montage',
  side: SIDE,
  clubTitle: 'AS Can Mines, une direction artistique rouge et or',
  clubText:
    'Identité visuelle des réseaux de l’AS Can Mines, club de football amateur parisien. Le rouge du maillot et l’or du blason posés sur un fond papier, une typo condensée associée à une écriture manuscrite, et les photos de match virées en monochrome rouge. Un système décliné en gabarits réutilisables chaque semaine : annonce de match, score final, classement.',
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
  disclaimer: 'Réalisés de ma propre initiative à partir d’images de diffusion et de presse. Les marques, équipes et fédérations citées ne les ont pas commandés.',
  badge: 'Travail de concept',
  videoTitle: 'Montage vidéo',
  videos: [
    {
      photo: { ...clip('concept-ef-tour', 81), alt: 'EF Pro Cycling, victoire d’étape sur le Tour, montage de concept' },
      title: 'EF Pro Cycling, victoire d’étape sur le Tour',
      text: 'L’interview d’après-course remontée en vertical, de la réaction à chaud jusqu’à l’accolade de l’équipe sur la ligne.',
    },
    {
      photo: { ...clip('concept-wa-hodgkinson', 26), alt: 'World Athletics, Keely Hodgkinson, montage de concept' },
      title: 'World Athletics, Keely Hodgkinson',
      text: 'Un record du 800 m en salle, raconté par la statistique qui le rend partageable : le record battu datait du jour de sa naissance.',
    },
    {
      photo: { ...clip('concept-wa-mclaughlin', 29), alt: 'World Athletics, Sydney McLaughlin-Levrone, montage de concept' },
      title: 'World Athletics, Sydney McLaughlin-Levrone',
      text: 'Un titre mondial sur 400 m ramené à la seule comparaison qui donne l’échelle : un chrono de 1985 reste le seul plus rapide.',
    },
  ],
  posterTitle: 'Affiches',
  posters: [
    {
      photo: { ...visuel('/CONCEPT-DCT/1.png'), alt: 'Decathlon CMA CGM, Paul Seixas, affiche de concept' },
      title: 'Decathlon CMA CGM, Paul Seixas',
      text: '« Yellow is the mission » : un portrait noir et blanc rehaussé de jaune, et un collage parisien qui projette l’ambition du maillot jaune.',
    },
    {
      photo: { ...visuel('/CONCEPT-DCT/2.png'), alt: 'Decathlon CMA CGM, Strade Bianche, affiche de concept' },
      title: 'Decathlon CMA CGM, Strade Bianche',
      text: 'L’annonce de la sélection : les coureurs réunis dans le blason de l’équipe, avec Sienne et les chemins blancs en toile de fond.',
    },
    {
      photo: { ...visuel('/CONCEPT-DCT/save-the-date.png'), alt: 'Decathlon CMA CGM, ventes privées, affiche de concept' },
      title: 'Decathlon CMA CGM, ventes privées',
      text: 'Un save the date pour la vente du matériel de l’équipe, en grille modulaire aux couleurs du maillot.',
    },
    {
      photo: { ...visuel('/milan-san-remo-poster.png'), alt: 'Milan-San Remo, affiche de concept' },
      title: 'Milan-San Remo, affiche de concept',
      text: 'Une affiche façon cinéma pour une classique italienne : typographie, montage photo et identité visuelle pensés comme une direction artistique de marque.',
    },
  ],
};

export const VOITURE_EN: Voiture = {
  title: 'In the team car',
  lede: 'What rides alongside the stages: the editing tools I build with AI, and my art direction work.',
  intro: 'Edits and visuals built for social, to show how I spot a moment and how I dress it up so it gets shared.',
  toolsTitle: 'The editing tools',
  side: SIDE_EN,
  clubTitle: 'AS Can Mines, a red and gold art direction',
  clubText:
    'Social media visual identity for AS Can Mines, an amateur football club in Paris. The red of the kit and the gold of the crest on a paper background, a condensed typeface paired with handwritten script, and match photos toned in red monochrome. A system rolled out as reusable weekly templates: matchday, final score, league table.',
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
  disclaimer: 'Made on my own initiative from broadcast and press images. The brands, teams and federations shown did not commission them.',
  badge: 'Concept work',
  videoTitle: 'Video editing',
  videos: [
    { ...VOITURE.videos[0], photo: { ...VOITURE.videos[0].photo, alt: 'EF Pro Cycling, Tour de France stage win, concept edit' }, title: 'EF Pro Cycling, Tour de France stage win', text: 'The post-stage interview recut as a vertical story, from the raw reaction to the team embrace at the line.' },
    { ...VOITURE.videos[1], photo: { ...VOITURE.videos[1].photo, alt: 'World Athletics, Keely Hodgkinson, concept edit' }, title: 'World Athletics, Keely Hodgkinson', text: 'An indoor 800m record, told through the stat that makes it shareable: the record she beat was set on the day she was born.' },
    { ...VOITURE.videos[2], photo: { ...VOITURE.videos[2].photo, alt: 'World Athletics, Sydney McLaughlin-Levrone, concept edit' }, title: 'World Athletics, Sydney McLaughlin-Levrone', text: 'A 400m world title reduced to the one comparison that gives it scale: only a mark from 1985 has ever gone faster.' },
  ],
  posterTitle: 'Posters',
  posters: [
    { ...VOITURE.posters[0], photo: { ...VOITURE.posters[0].photo, alt: 'Decathlon CMA CGM, Paul Seixas, concept poster' }, title: 'Decathlon CMA CGM, Paul Seixas', text: '"Yellow is the mission": a black and white portrait lifted with yellow, and a Paris collage that projects the yellow jersey ambition.' },
    { ...VOITURE.posters[1], photo: { ...VOITURE.posters[1].photo, alt: 'Decathlon CMA CGM, Strade Bianche, concept poster' }, title: 'Decathlon CMA CGM, Strade Bianche', text: 'The line-up announcement: the riders framed inside the team crest, with Siena and the white gravel roads behind them.' },
    { ...VOITURE.posters[2], photo: { ...VOITURE.posters[2].photo, alt: 'Decathlon CMA CGM, team sale, concept poster' }, title: 'Decathlon CMA CGM, team sale', text: 'A save the date for the sale of the team’s equipment, laid out as a modular grid in the kit colours.' },
    { ...VOITURE.posters[3], photo: { ...VOITURE.posters[3].photo, alt: 'Milan-San Remo, concept poster' }, title: 'Milan-San Remo, concept poster', text: 'A cinema-style poster for an Italian classic: typography, photo compositing and visual identity, built as a brand art direction exercise.' },
  ],
};
