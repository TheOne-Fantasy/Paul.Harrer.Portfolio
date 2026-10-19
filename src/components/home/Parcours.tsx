'use client';
import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { useLanguage } from '@/context/LanguageContext';
import { PARCOURS } from '@/content/home';
import styles from './parcours.module.css';

// Les noms passent devant un carré tenu au centre de l'écran ; le nom qui croise
// la ligne médiane décide de l'image du carré et des deux faits qui l'encadrent.
export default function Parcours() {
  const { lang } = useLanguage();
  const [active, setActive] = useState(0);
  const listRef = useRef<HTMLOListElement>(null);

  useEffect(() => {
    const items = listRef.current?.querySelectorAll('li');
    if (!items) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(Number((e.target as HTMLElement).dataset.index));
        });
      },
      { rootMargin: '-50% 0px -50% 0px' }
    );
    items.forEach((li) => io.observe(li));
    return () => io.disconnect();
  }, []);

  const current = PARCOURS.items[active];

  return (
    <section className={styles.section} id="parcours" aria-labelledby="parcours-title">
      <div className={styles.stack}>
        <div className={styles.hold} aria-hidden="true">
          <div className={styles.square}>
            {PARCOURS.items.map((item, i) =>
              item.img ? (
                <Image
                  key={item.name}
                  src={item.img}
                  alt=""
                  fill
                  sizes="(max-width: 760px) 60vw, 450px"
                  className={`${styles.pic} ${i === active ? styles.picOn : ''}`}
                  style={{ objectFit: 'cover' }}
                />
              ) : (
                <span key={item.name} className={`${styles.field} ${i === active ? styles.picOn : ''}`}>
                  {item.logo && (
                    <Image src={item.logo} alt="" width={160} height={160} className={styles.logo} />
                  )}
                </span>
              )
            )}
            <span className={styles.wash} />
          </div>
          <p className={styles.kind}>{current.kind[lang]}</p>
          <p className={styles.years}>{current.years[lang]}</p>
        </div>

        <div className={styles.names}>
          <h2 className={styles.heading} id="parcours-title">
            {PARCOURS.heading[lang]}
          </h2>
          <ol className={styles.list} ref={listRef}>
            {PARCOURS.items.map((item, i) => (
              <li key={item.name} data-index={i} className={i === active ? styles.on : undefined}>
                <a
                  href={item.href}
                  {...(item.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                >
                  {item.name}
                  <span className="sr-only">
                    , {item.kind[lang]}, {item.years[lang]}
                  </span>
                </a>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
