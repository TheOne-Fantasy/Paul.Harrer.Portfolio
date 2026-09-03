'use client';
import { useEffect } from 'react';
import Navbar from './Navbar';
import { useLanguage } from '@/context/LanguageContext';
import styles from '../app/work/work.module.css';

interface Piece {
  file: string;
  title: string;
  text: string;
}

const REEL_URL = 'https://www.instagram.com/reel/CoxY6espxHX/';

const COPY = {
  fr: {
    back: 'Retour au portfolio',
    kicker: 'Showreel',
    title: 'Montage et narration au format court.',
    intro:
      "Des montages réalisés à partir d'images de compétition, pour montrer comment je repère un moment et comment je l'emballe pour les réseaux.",
    publishedLabel: 'Publié',
    publishedTitle: 'Reel publié sur Instagram',
    publishedText:
      "Un montage sorti sur les réseaux, avec ses chiffres visibles. Les trois pièces suivantes sont des travaux de concept.",
    fallback: 'Voir le reel sur Instagram',
    conceptHeading: 'Travaux de concept',
    disclaimer:
      "Réalisés de ma propre initiative à partir d'images de diffusion. Les marques et fédérations citées ne les ont pas commandés.",
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
  },
  en: {
    back: 'Back to portfolio',
    kicker: 'Showreel',
    title: 'Editing and short-form storytelling.',
    intro:
      'Edits built from competition footage, to show how I spot a moment and how I package it for social.',
    publishedLabel: 'Published',
    publishedTitle: 'Reel published on Instagram',
    publishedText:
      'An edit that went out on social, with its numbers in plain sight. The three pieces below are concept work.',
    fallback: 'View the reel on Instagram',
    conceptHeading: 'Concept work',
    disclaimer:
      'Made on my own initiative from broadcast footage. The brands and federations shown did not commission them.',
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
  },
};

export default function WorkClient() {
  const { lang } = useLanguage();
  const t = COPY[lang] ?? COPY.fr;

  // Le script Instagram transforme le blockquote en lecteur. S'il ne charge pas
  // (bloqueur, réseau), le blockquote reste un lien cliquable vers le reel.
  useEffect(() => {
    const id = 'instagram-embed-script';
    const existing = document.getElementById(id);
    if (existing) {
      (window as unknown as { instgrm?: { Embeds: { process: () => void } } }).instgrm?.Embeds.process();
      return;
    }
    const s = document.createElement('script');
    s.id = id;
    s.async = true;
    s.src = 'https://www.instagram.com/embed.js';
    document.body.appendChild(s);
  }, [lang]);

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

      <section className={styles.featured}>
        <div className={styles.featuredEmbed}>
          <blockquote
            className="instagram-media"
            data-instgrm-permalink={REEL_URL}
            data-instgrm-version="14"
            style={{ background: '#FFF', border: 0, margin: '0 auto', maxWidth: 420, width: '100%' }}
          >
            <a href={REEL_URL} target="_blank" rel="noopener noreferrer">
              {t.fallback}
            </a>
          </blockquote>
        </div>
        <div className={styles.featuredBody}>
          <span className={`${styles.badge} ${styles.badgeLive}`}>{t.publishedLabel}</span>
          <h2 className={styles.featuredTitle}>{t.publishedTitle}</h2>
          <p className={styles.cardText}>{t.publishedText}</p>
        </div>
      </section>

      <div className={styles.sectionHead}>
        <h2 className={styles.sectionTitle}>{t.conceptHeading}</h2>
        <p className={styles.disclaimer}>{t.disclaimer}</p>
      </div>

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

      <div className={styles.footer}>
        <p>
          {t.footer} <a href="mailto:paulharrer@hotmail.com">paulharrer@hotmail.com</a>.
        </p>
      </div>
    </main>
  );
}
