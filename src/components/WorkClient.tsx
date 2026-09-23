'use client';
import Image from 'next/image';
import Navbar from './Navbar';
import { useLanguage } from '@/context/LanguageContext';
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

const COPY = {
  fr: {
    back: 'Retour au portfolio',
    kicker: 'Showreel',
    title: 'Montage, graphisme et narration au format court.',
    intro:
      "Des montages et des visuels pensés pour les réseaux, pour montrer comment je repère un moment et comment je l'habille pour qu'il se partage.",
    clubLabel: 'Réalisé pour le club',
    clubTitle: 'AS Can Mines, une direction artistique rouge et or',
    clubText:
      "Identité visuelle des réseaux de l'AS Can Mines, club de football amateur parisien. Le rouge du maillot et l'or du blason posés sur un fond papier, une typo condensée associée à une écriture manuscrite, et les photos de match virées en monochrome rouge. Un système décliné en gabarits réutilisables chaque semaine : annonce de match, score final, classement.",
    paletteLabel: 'Palette',
    clubCaptions: ['Match Day', 'Score final', 'Classement'],
    conceptHeading: 'Travaux de concept',
    disclaimer:
      "Réalisés de ma propre initiative à partir d'images de diffusion et de presse. Les marques, équipes et fédérations citées ne les ont pas commandés.",
    videoHeading: 'Montage vidéo',
    posterHeading: 'Affiches',
    badge: 'Travail de concept',
    footer: 'Taux journalier et études de cas complètes sur demande. Écrivez-moi à',
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
        title: 'Milan-San Remo, affiche de concept',
        text: 'Une affiche façon cinéma pour une classique italienne : typographie, montage photo et identité visuelle pensés comme une direction artistique de marque.',
      },
    ] as Poster[],
  },
  en: {
    back: 'Back to portfolio',
    kicker: 'Showreel',
    title: 'Editing, graphic design and short-form storytelling.',
    intro:
      'Edits and visuals built for social, to show how I spot a moment and how I dress it up so it gets shared.',
    clubLabel: 'Made for the club',
    clubTitle: 'AS Can Mines, a red and gold art direction',
    clubText:
      "Social media visual identity for AS Can Mines, an amateur football club in Paris. The red of the kit and the gold of the crest on a paper background, a condensed typeface paired with handwritten script, and match photos toned in red monochrome. A system rolled out as reusable weekly templates: matchday, final score, league table.",
    paletteLabel: 'Palette',
    clubCaptions: ['Matchday', 'Final score', 'League table'],
    conceptHeading: 'Concept work',
    disclaimer:
      'Made on my own initiative from broadcast and press images. The brands, teams and federations shown did not commission them.',
    videoHeading: 'Video editing',
    posterHeading: 'Posters',
    badge: 'Concept work',
    footer: 'Day rate and full case studies on request. Reach me at',
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
        title: 'Milan-San Remo, concept poster',
        text: 'A cinema-style poster for an Italian classic: typography, photo compositing and visual identity, built as a brand art direction exercise.',
      },
    ] as Poster[],
  },
};

export default function WorkClient() {
  const { lang } = useLanguage();
  const t = COPY[lang] ?? COPY.fr;

  return (
    <main className={styles.main}>
      <Navbar />

      <div className={styles.header}>
        <a href="/" className={styles.back}>
          &larr; {t.back}
        </a>
        <span className={styles.kicker}>{t.kicker}</span>
        <h1 className={styles.title}>{t.title}</h1>
        <p className={styles.intro}>{t.intro}</p>
      </div>

      <section className={styles.club}>
        <div className={styles.clubHead}>
          <div>
            <span className={styles.clubBadge}>{t.clubLabel}</span>
            <h2 className={styles.clubTitle}>{t.clubTitle}</h2>
            <p className={styles.clubText}>{t.clubText}</p>
          </div>
          <div>
            <span className={styles.paletteLabel}>{t.paletteLabel}</span>
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
          {CAN_MINES_VISUALS.map((src, i) => (
            <figure key={src} className={styles.clubFigure}>
              <div className={styles.posterWrap}>
                <Image
                  src={src}
                  alt={`AS Can Mines, ${t.clubCaptions[i]}`}
                  fill
                  style={{ objectFit: 'cover' }}
                  sizes="(max-width: 720px) 100vw, 33vw"
                />
              </div>
              <figcaption>{t.clubCaptions[i]}</figcaption>
            </figure>
          ))}
        </div>
      </section>

      <div className={styles.sectionHead}>
        <h2 className={styles.sectionTitle}>{t.conceptHeading}</h2>
        <p className={styles.disclaimer}>{t.disclaimer}</p>
      </div>

      <h3 className={styles.subHeading}>{t.videoHeading}</h3>
      <div className={styles.grid}>
        {t.pieces.map((p) => (
          <article key={p.file} className={styles.card}>
            <div className={styles.videoWrap}>
              <video controls preload="metadata" playsInline>
                <source src={`/work/${p.file}.mp4`} type="video/mp4" />
              </video>
            </div>
            <div className={styles.cardBody}>
              <div className={styles.cardTop}>
                <h3 className={styles.cardTitle}>{p.title}</h3>
                <span className={styles.badge}>{t.badge}</span>
              </div>
              <p className={styles.cardText}>{p.text}</p>
            </div>
          </article>
        ))}
      </div>

      <h3 className={styles.subHeading}>{t.posterHeading}</h3>
      <div className={styles.grid}>
        {t.posters.map((p) => (
          <article key={p.src} className={styles.card}>
            <div className={styles.posterWrap}>
              <Image
                src={p.src}
                alt={p.title}
                fill
                style={{ objectFit: 'cover' }}
                sizes="(max-width: 620px) 100vw, (max-width: 980px) 50vw, 25vw"
              />
            </div>
            <div className={styles.cardBody}>
              <div className={styles.cardTop}>
                <h3 className={styles.cardTitle}>{p.title}</h3>
                <span className={styles.badge}>{t.badge}</span>
              </div>
              <p className={styles.cardText}>{p.text}</p>
            </div>
          </article>
        ))}
      </div>

      <div className={styles.footer}>
        <p>
          {t.footer} <a href="mailto:paulharrer@hotmail.com">paulharrer@hotmail.com</a>.
        </p>
      </div>
    </main>
  );
}
