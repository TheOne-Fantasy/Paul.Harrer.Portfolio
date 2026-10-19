'use client';
import { useEffect, useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { LINKS, NAV } from '@/content/home';
import styles from './nav.module.css';

interface NavbarProps {
  // Sur une autre page que l'accueil, les ancres renvoient vers l'accueil.
  home?: boolean;
}

export default function Navbar({ home = false }: NavbarProps) {
  const { lang, setLang } = useLanguage();
  const [open, setOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const prefix = home ? '' : '/';

  useEffect(() => {
    let last = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      setHidden(y > last && y > 240);
      last = y;
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open]);

  return (
    <header className={`${styles.bar} ${hidden && !open ? styles.hidden : ''}`}>
      <a href={home ? '#top' : '/'} className={styles.wordmark}>
        Paul Harrer
      </a>

      <nav className={`${styles.links} ${open ? styles.linksOpen : ''}`} id="site-menu" aria-label="Principale">
        {NAV.links.map((l) => (
          <a key={l.href} href={`${prefix}${l.href}`} onClick={() => setOpen(false)}>
            {l.label[lang]}
          </a>
        ))}
      </nav>

      <div className={styles.actions}>
        <div className={styles.lang} role="group" aria-label="Langue">
          <button type="button" aria-pressed={lang === 'fr'} onClick={() => setLang('fr')}>
            FR
          </button>
          <button type="button" aria-pressed={lang === 'en'} onClick={() => setLang('en')}>
            EN
          </button>
        </div>
        <a href={LINKS.cv} className={styles.cv} target="_blank" rel="noopener">
          {NAV.cv[lang]}
        </a>
        <button
          type="button"
          className={styles.menuButton}
          aria-expanded={open}
          aria-controls="site-menu"
          onClick={() => setOpen((o) => !o)}
        >
          {open ? NAV.close[lang] : NAV.menu[lang]}
        </button>
      </div>
    </header>
  );
}
