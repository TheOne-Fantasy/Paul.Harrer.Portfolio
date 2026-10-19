'use client';
import { useState } from 'react';
import Image from 'next/image';
import { useLanguage } from '@/context/LanguageContext';
import { LINKS, TERRAIN, type SportKey } from '@/content/home';
import styles from './terrain.module.css';

// L'élément interactif de la page : on choisit un sport et on voit ce que Paul y a
// couvert. Sans script, tout le tableau reste affiché.
export default function Terrain() {
  const { lang } = useLanguage();
  const [sport, setSport] = useState<'all' | SportKey>('all');
  const sports = Object.keys(TERRAIN.sports) as SportKey[];
  const rows = TERRAIN.rows.filter((r) => sport === 'all' || r.sport === sport);
  const media = TERRAIN.media[sport];

  return (
    <section className={styles.section} id="terrain" aria-labelledby="terrain-title">
      <div className={styles.top}>
        <div className={styles.intro}>
          <h2 className={styles.heading} id="terrain-title" data-reveal>
            {TERRAIN.heading[lang]}
          </h2>
          <p className={styles.lead} data-reveal style={{ '--i': 1 } as React.CSSProperties}>
            {TERRAIN.intro[lang]}
          </p>
          <div className={styles.filter} role="group" aria-label={TERRAIN.filterLabel[lang]} data-reveal style={{ '--i': 2 } as React.CSSProperties}>
            <span className={styles.filterLabel}>{TERRAIN.filterLabel[lang]}</span>
            <div className={styles.buttons}>
              {(['all', ...sports] as const).map((key) => (
                <button
                  key={key}
                  type="button"
                  aria-pressed={sport === key}
                  onClick={() => setSport(key)}
                >
                  {key === 'all' ? TERRAIN.all[lang] : TERRAIN.sports[key][lang]}
                </button>
              ))}
            </div>
          </div>
        </div>

        <figure className={styles.media} data-reveal style={{ '--i': 1 } as React.CSSProperties}>
          {media ? (
            <>
              <div className={styles.mediaFrame}>
                <Image
                  key={media.src}
                  src={media.src}
                  alt={media.caption[lang]}
                  fill
                  sizes="(max-width: 760px) 92vw, 44vw"
                  className={styles.mediaImg}
                  style={{ objectFit: 'cover' }}
                />
              </div>
              <figcaption>
                {media.caption[lang]}
                {media.link && (
                  <>
                    {' · '}
                    <a href={LINKS.youtube(media.link)} target="_blank" rel="noopener noreferrer">
                      {TERRAIN.watch[lang]}
                    </a>
                  </>
                )}
              </figcaption>
            </>
          ) : (
            <div className={`${styles.mediaFrame} ${styles.mediaType}`}>
              <span>{sport !== 'all' && TERRAIN.sports[sport][lang]}</span>
              <span className={styles.mediaWith}>{rows[0]?.with[lang]}</span>
            </div>
          )}
        </figure>
      </div>

      <table className={styles.table}>
        <caption className="sr-only">{TERRAIN.heading[lang]}</caption>
        <thead className="sr-only">
          <tr>
            <th scope="col">{TERRAIN.columns.event[lang]}</th>
            <th scope="col">{TERRAIN.columns.sport[lang]}</th>
            <th scope="col">{TERRAIN.columns.with[lang]}</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr key={r.event.fr}>
              <th scope="row">{r.event[lang]}</th>
              <td>{TERRAIN.sports[r.sport][lang]}</td>
              <td>{r.with[lang]}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}
