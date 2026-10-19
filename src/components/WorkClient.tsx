'use client';
import { useEffect } from 'react';
import Image from 'next/image';
import Navbar from './Navbar';
import useReveal from './useReveal';
import { useLanguage } from '@/context/LanguageContext';
import { LINKS } from '@/content/home';
import styles from '../app/work/work.module.css';

interface Piece {
  file: string;
  title: string;
  text: string;
}

interface Poster {
  src: string;
  title: string;
  text: string;
}

// Couleurs relevées sur les visuels du club.
const CAN_MINES_PALETTE = [
  { hex: '#d8504f', fr: 'Rouge maillot', en: 'Kit red' },
  { hex: '#842121', fr: 'Rouge profond', en: 'Deep red' },
  { hex: '#e8b868', fr: 'Or', en: 'Gold' },
  { hex: '#f6e8ca', fr: 'Papier crème', en: 'Cream paper' },
];

const CAN_MINES_VISUALS = [
  '/DA-ASCanMines-Foot/1.png',
  '/DA-ASCanMines-Foot/2.png',
  '/DA-ASCanMines-Foot/3.png',
];

const i = (n: number) => ({ '--i': n }) as React.CSSProperties;

const COPY = {
  fr: {
    title: 'Montage et graphisme',
    intro:
      "Des montages et des visuels pensés pour les réseaux, pour montrer comment je repère un moment et comment je l'habille pour qu'il se partage.",
    clubTitle: 'AS Can Mines, rouge et or',
    clubText:
      "L'identité visuelle des réseaux de l'AS Can Mines, club de football amateur parisien, réalisée pour le club. Le rouge du maillot et l'or du blason sur un fond papier, avec une typo condensée et une écriture manuscrite. Les photos de match sont virées en monochrome rouge, et le système se décline chaque semaine en gabarits réutilisables.",
    paletteLabel: 'Palette',
    clubCaptions: ['Match Day', 'Score final', 'Classement'],
    conceptHeading: 'Travaux de concept',
    disclaimer:
      "Réalisés de ma propre initiative à partir d'images de diffusion et de presse. Les marques, équipes et fédérations citées ne les ont pas commandés.",
    videoHeading: 'Montage vidéo',
    posterHeading: 'Affiches',
    footer: 'Études de cas complètes sur demande. Écrivez-moi à',
    pieces: [
      {
        file: 'ef-tdf-victory',
        title: "EF Pro Cycling, victoire d'étape sur le Tour",
        text: "L'interview d'après-course remontée en vertical, de la réaction à chaud jusqu'à l'accolade de l'équipe sur la ligne.",
      },
      {
        file: 'wa-hodgkinson',
        title: 'World Athletics, Keely Hodgkinson',
        text: "Un record du 800 m en salle, raconté par la statistique qui le rend partageable : le record battu datait du jour de sa naissance.",
      },
      {
        file: 'wa-mclaughlin',
        title: 'World Athletics, Sydney McLaughlin-Levrone',
        text: "Un titre mondial sur 400 m ramené à la seule comparaison qui donne l'échelle : un chrono de 1985 reste le seul plus rapide.",
      },
    ] as Piece[],
    posters: [
      {
        src: '/CONCEPT-DCT/1.png',
        title: 'Decathlon CMA CGM, Paul Seixas',
        text: "« Yellow is the mission » : un portrait noir et blanc rehaussé de jaune, et un collage parisien qui projette l'ambition du maillot jaune.",
      },
      {
        src: '/CONCEPT-DCT/2.png',
        title: 'Decathlon CMA CGM, Strade Bianche',
        text: "L'annonce de la sélection : les coureurs réunis dans le blason de l'équipe, avec Sienne et les chemins blancs en toile de fond.",
      },
      {
        src: '/CONCEPT-DCT/save-the-date.png',
        title: 'Decathlon CMA CGM, ventes privées',
        text: "Un save the date pour la vente du matériel de l'équipe, en grille modulaire aux couleurs du maillot.",
      },
      {
        src: '/milan-san-remo-poster.png',
        title: 'Milan-San Remo',
        text: "Une affiche façon cinéma pour une classique italienne, où la typographie et le montage photo sont pensés comme une direction artistique de marque.",
      },
    ] as Poster[],
  },
  en: {
    title: 'Editing and design',
    intro:
      'Edits and visuals built for social, to show how I spot a moment and how I dress it up so it gets shared.',
    clubTitle: 'AS Can Mines, red and gold',
    clubText:
      "The social media identity of AS Can Mines, an amateur football club in Paris, made for the club. The red of the kit and the gold of the crest on a paper background, with a condensed typeface and handwritten script. Match photos are toned in red monochrome, and the system runs every week as reusable templates.",
    paletteLabel: 'Palette',
    clubCaptions: ['Matchday', 'Final score', 'League table'],
    conceptHeading: 'Concept work',
    disclaimer:
      'Made on my own initiative from broadcast and press images. The brands, teams and federations shown did not commission them.',
    videoHeading: 'Video editing',
    posterHeading: 'Posters',
    footer: 'Full case studies on request. Reach me at',
    pieces: [
      {
        file: 'ef-tdf-victory',
        title: 'EF Pro Cycling, Tour de France stage win',
        text: 'The post-stage interview recut as a vertical story, from the raw reaction to the team embrace at the line.',
      },
      {
        file: 'wa-hodgkinson',
        title: 'World Athletics, Keely Hodgkinson',
        text: 'An indoor 800m record, told through the stat that makes it shareable: the record she beat was set on the day she was born.',
      },
      {
        file: 'wa-mclaughlin',
        title: 'World Athletics, Sydney McLaughlin-Levrone',
        text: 'A 400m world title reduced to the one comparison that gives it scale: only a mark from 1985 has ever gone faster.',
      },
    ] as Piece[],
    posters: [
      {
        src: '/CONCEPT-DCT/1.png',
        title: 'Decathlon CMA CGM, Paul Seixas',
        text: '"Yellow is the mission": a black and white portrait lifted with yellow, and a Paris collage that projects the yellow jersey ambition.',
      },
      {
        src: '/CONCEPT-DCT/2.png',
        title: 'Decathlon CMA CGM, Strade Bianche',
        text: 'The line-up announcement: the riders framed inside the team crest, with Siena and the white gravel roads behind them.',
      },
      {
        src: '/CONCEPT-DCT/save-the-date.png',
        title: 'Decathlon CMA CGM, team sale',
        text: "A save the date for the sale of the team's equipment, laid out as a modular grid in the kit colours.",
      },
      {
        src: '/milan-san-remo-poster.png',
        title: 'Milan-San Remo',
        text: 'A cinema-style poster for an Italian classic, with typography and photo compositing built as a brand art direction.',
      },
    ] as Poster[],
  },
};

export default function WorkClient() {
  const { lang } = useLanguage();
  const t = COPY[lang] ?? COPY.fr;
  useReveal();

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  return (
    <main className={styles.main}>
      <Navbar />

      <header className={styles.header}>
        <h1 className={styles.title} data-reveal>
          {t.title}
        </h1>
        <p className={styles.intro} data-reveal style={i(1)}>
          {t.intro}
        </p>
      </header>

      <section className={styles.club} aria-labelledby="club-title">
        <h2 className={styles.clubTitle} id="club-title" data-reveal>
          {t.clubTitle}
        </h2>
        <div className={styles.clubHead}>
          <p className={styles.clubText} data-reveal style={i(1)}>
            {t.clubText}
          </p>
          <div data-reveal style={i(2)}>
            <p className={styles.paletteLabel}>{t.paletteLabel}</p>
            <ul className={styles.palette}>
              {CAN_MINES_PALETTE.map((c) => (
                <li key={c.hex}>
                  <span className={styles.swatch} style={{ background: c.hex }} />
                  <span className={styles.swatchName}>{c[lang] ?? c.fr}</span>
                  <span className={styles.swatchHex}>{c.hex}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className={styles.clubGrid}>
          {CAN_MINES_VISUALS.map((src, n) => (
            <figure key={src} className={styles.clubFigure} data-reveal style={i(n)}>
              <div className={styles.posterWrap}>
                <Image
                  src={src}
                  alt={`AS Can Mines, ${t.clubCaptions[n]}`}
                  fill
                  style={{ objectFit: 'cover' }}
                  sizes="(max-width: 720px) 100vw, 33vw"
                />
              </div>
              <figcaption>{t.clubCaptions[n]}</figcaption>
            </figure>
          ))}
        </div>
      </section>

      <section className={styles.concept} aria-labelledby="concept-title">
        <div className={styles.conceptHead}>
          <h2 className={styles.sectionTitle} id="concept-title" data-reveal>
            {t.conceptHeading}
          </h2>
          <p className={styles.disclaimer} data-reveal style={i(1)}>
            {t.disclaimer}
          </p>
        </div>

        <h3 className={styles.subHeading} data-reveal>
          {t.posterHeading}
        </h3>
        <div className={styles.posters}>
          {t.posters.map((p, n) => (
            <article key={p.src} className={styles.piece} data-reveal style={i(n)}>
              <div className={styles.posterWrap}>
                <Image
                  src={p.src}
                  alt={p.title}
                  fill
                  style={{ objectFit: 'cover' }}
                  sizes="(max-width: 620px) 100vw, (max-width: 980px) 50vw, 25vw"
                />
              </div>
              <h4 className={styles.pieceTitle}>{p.title}</h4>
              <p className={styles.pieceText}>{p.text}</p>
            </article>
          ))}
        </div>

        <h3 className={styles.subHeading} data-reveal>
          {t.videoHeading}
        </h3>
        <div className={styles.videos}>
          {t.pieces.map((p, n) => (
            <article key={p.file} className={styles.piece} data-reveal style={i(n)}>
              <div className={styles.videoWrap}>
                <video controls preload="none" playsInline poster={`/work/${p.file}.jpg`}>
                  <source src={`/work/${p.file}.mp4`} type="video/mp4" />
                </video>
              </div>
              <h4 className={styles.pieceTitle}>{p.title}</h4>
              <p className={styles.pieceText}>{p.text}</p>
            </article>
          ))}
        </div>
      </section>

      <footer className={styles.footer}>
        <p>
          {t.footer}{' '}
          <a href={`mailto:${LINKS.email}`}>{LINKS.email}</a>.
        </p>
      </footer>
    </main>
  );
}
