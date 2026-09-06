'use client';
import Image from 'next/image';
import Navbar from './Navbar';
import { useLanguage } from '@/context/LanguageContext';
import styles from '../app/work/work.module.css';

interface Piece {
  file: string;
  title: string;
  text: string;
  image?: string;
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
    publishedTitle: 'First Team, reel publié',
    publishedText:
      "Publié sur le compte First Team, 143 000 abonnés, où j'étais rédacteur en chef. Un montage sorti en production, avec ses chiffres à la vue de tous. Les pièces suivantes sont des travaux de concept.",
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
      {
        file: 'milan-san-remo-poster',
        title: 'Milan-San Remo, affiche de concept',
        text: 'Une affiche façon cinéma pour une classique italienne : typographie, montage photo et identité visuelle pensés comme une direction artistique de marque.',
        image: '/milan-san-remo-poster.png',
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
    publishedTitle: 'First Team, published reel',
    publishedText:
      'Published on the First Team account, 143,000 followers, where I was Editor-in-Chief. An edit that shipped, with its numbers in plain sight. The pieces below are concept work.',
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
      {
        file: 'milan-san-remo-poster',
        title: 'Milan-San Remo, concept poster',
        text: 'A cinema-style poster for an Italian classic: typography, photo compositing and visual identity, built as a brand art direction exercise.',
        image: '/milan-san-remo-poster.png',
      },
    ] as Piece[],
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

      <section className={styles.featured}>
        {/* Iframe directe plutôt que le script embed.js d'Instagram : celui-ci
            négocie la hauteur par postMessage et repliait le lecteur à 38 px. */}
        <div className={styles.featuredEmbed}>
          <iframe
            src={`${REEL_URL}embed/`}
            title={t.publishedTitle}
            scrolling="no"
            allow="encrypted-media"
            loading="lazy"
          />
          <a className={styles.fallbackLink} href={REEL_URL} target="_blank" rel="noopener noreferrer">
            {t.fallback}
          </a>
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
              {p.image ? (
                <Image
                  src={p.image}
                  alt={p.title}
                  fill
                  style={{ objectFit: 'contain' }}
                  sizes="(max-width: 620px) 100vw, (max-width: 980px) 50vw, 33vw"
                />
              ) : (
                <video controls preload="metadata" playsInline>
                  <source src={`/work/${p.file}.mp4`} type="video/mp4" />
                </video>
              )}
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
