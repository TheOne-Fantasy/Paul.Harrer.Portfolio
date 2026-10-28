'use client';
import { useEffect, useRef, useState, type CSSProperties } from 'react';
import Image from 'next/image';
import { EMAIL, rise } from './Course';
import { useLang } from './Lang';
import { Cyclist } from './Profile';
import styles from './chemin.module.css';

const LINKEDIN = 'https://www.linkedin.com/in/pharrer/';

// Les confettis lancés à l'arrivée : un éventail vers le haut, toujours le même (pas de
// hasard au rendu, pour que le serveur et le navigateur dessinent la même chose).
const CONFETTI = Array.from({ length: 16 }, (_, k) => {
  const angle = (-165 + (k * 150) / 15) * (Math.PI / 180);
  const dist = 70 + ((k * 37) % 55);
  return {
    '--x': `${Math.round(Math.cos(angle) * dist)}px`,
    '--y': `${Math.round(Math.sin(angle) * dist)}px`,
    '--r': `${(k % 2 ? 1 : -1) * (180 + k * 23)}deg`,
    '--d': `${(k % 4) * 40}ms`,
    '--c': ['var(--accent)', 'var(--ink)', '#e5392f'][k % 3],
  } as CSSProperties;
});

// L'arrivée : la ligne à damier se déroule et le coureur la longe jusqu'au bout, lève les
// bras sous les confettis. Puis le contact entre, le CV attend sur la route comme une
// feuille posée, et le nom revient, peint en grand, pour finir. links ajoute des liens
// entre LinkedIn et le CV (la voiture suiveuse depuis l'accueil, par exemple).
export default function Arrivee({ links }: { links?: { href: string; label: string }[] }) {
  const { t } = useLang();
  const finish = useRef<HTMLElement>(null);
  const [seen, setSeen] = useState(false);
  const [arrived, setArrived] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const io = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting) return;
        setSeen(true);
        io.disconnect();
      },
      { rootMargin: '0px 0px -15% 0px' },
    );
    io.observe(finish.current!);
    return () => io.disconnect();
  }, []);

  // Il roule le temps de sa transition (voir .winner), puis s'arrête et fête l'arrivée ;
  // tout de suite pour qui a demandé moins d'animations.
  useEffect(() => {
    if (!seen) return;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const id = window.setTimeout(() => setArrived(true), reduce ? 0 : 1700);
    return () => clearTimeout(id);
  }, [seen]);

  // Copier l'adresse, pour qui n'écrit pas depuis une messagerie installée.
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2200);
    } catch {
      window.location.href = `mailto:${EMAIL}`;
    }
  };

  return (
    <footer ref={finish} id="contact" className={`${styles.arrivee} ${seen ? styles.seen : ''}`}>
      <div className={styles.finishWrap}>
        <span className={styles.winner} data-moving={seen && !arrived ? '' : undefined} data-finish={arrived ? '' : undefined} aria-hidden="true">
          <svg viewBox="-16 -36 32 37">
            <Cyclist />
          </svg>
          <span className={styles.confetti}>
            {CONFETTI.map((style, k) => (
              <i key={k} style={style} />
            ))}
          </span>
        </span>
        <svg className={styles.finishLine} data-road="arrivee" aria-hidden="true">
          <defs>
            <pattern id="damierArrivee" width="16" height="16" patternUnits="userSpaceOnUse">
              <rect width="16" height="16" className={styles.checkLight} />
              <rect width="8" height="8" className={styles.checkDark} />
              <rect x="8" y="8" width="8" height="8" className={styles.checkDark} />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#damierArrivee)" />
        </svg>
      </div>
      <div className={styles.arriveeBody}>
        <div>
          <h2 className={`${styles.stageTitle} ${styles.rise}`} style={rise(0)}>{t.finish}</h2>
          <p className={`${styles.arriveeLede} ${styles.rise}`} style={rise(1)}>{t.contactLede}</p>
          <a className={`${styles.email} ${styles.rise}`} style={rise(2)} href={`mailto:${EMAIL}`}>{EMAIL}</a>
          <div className={`${styles.arriveeActions} ${styles.rise}`} style={rise(3)}>
            <a className={styles.start} href={`mailto:${EMAIL}`}>{t.write}</a>
            <button type="button" className={styles.textButton} onClick={copy}>
              {copied ? t.copied : t.copy}
            </button>
            <a className={styles.textButton} href={LINKEDIN} target="_blank" rel="noopener noreferrer">LinkedIn</a>
            {links?.map((l) => (
              <a key={l.href} className={styles.textButton} href={l.href}>{l.label}</a>
            ))}
            <span className={styles.srOnly} role="status">{copied ? t.copied : ''}</span>
          </div>
        </div>
        <a className={`${styles.cvCard} ${styles.rise}`} style={rise(2)} href="/CV-PaulHarrer-VC.pdf" target="_blank" rel="noopener noreferrer">
          <span className={styles.cvSheet}>
            <Image src="/media/cv-apercu.jpg" alt={t.cvAlt} fill sizes="(max-width: 720px) 60vw, 280px" />
          </span>
          <span className={styles.cvLabel}>{t.cvLabel}</span>
        </a>
      </div>
      <p className={`${styles.signature} ${styles.painted}`} aria-hidden="true">Paul Harrer</p>
    </footer>
  );
}
