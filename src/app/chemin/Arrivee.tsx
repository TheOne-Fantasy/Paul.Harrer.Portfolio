'use client';
import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { EMAIL, rise } from './Course';
import { useLang } from './Lang';
import styles from './chemin.module.css';

const LINKEDIN = 'https://www.linkedin.com/in/pharrer/';

// L'arrivée : la route de la page y finit (le bloc « arrivee », voir Route), le coureur y
// passe la ligne en bas de page. Puis le contact entre, le CV attend sur la route comme une
// feuille posée, et le nom revient, peint en grand, pour finir. links ajoute des liens
// entre LinkedIn et le CV (la voiture suiveuse depuis l'accueil, par exemple).
export default function Arrivee({ links }: { links?: { href: string; label: string }[] }) {
  const { t, lang } = useLang();
  const finish = useRef<HTMLElement>(null);
  const [seen, setSeen] = useState(false);
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
      <div data-road="arrivee" className={styles.finishZone} aria-hidden="true" />
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
        <a className={`${styles.cvCard} ${styles.rise}`} style={rise(2)} href={lang === 'en' ? '/CV-PaulHarrer-EN.pdf' : '/CV-PaulHarrer-VC.pdf'} target="_blank" rel="noopener noreferrer">
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
