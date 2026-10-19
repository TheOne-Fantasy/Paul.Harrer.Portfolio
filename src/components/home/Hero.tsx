'use client';
import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { useLanguage } from '@/context/LanguageContext';
import { HERO } from '@/content/home';
import styles from './hero.module.css';

// Le nom reste épinglé de part et d'autre du cadre pendant que la bande d'images
// avance d'un cran par portion de défilement. Le bandeau en bas du cadre suit l'image.
export default function Hero() {
  const { lang } = useLanguage();
  const wrapRef = useRef<HTMLElement>(null);
  const [index, setIndex] = useState(0);
  const count = HERO.frames.length;

  useEffect(() => {
    const onScroll = () => {
      const el = wrapRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const travel = el.offsetHeight - window.innerHeight;
      const progress = travel > 0 ? Math.min(Math.max(-rect.top / travel, 0), 0.999) : 0;
      setIndex(Math.floor(progress * count));
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, [count]);

  const frame = HERO.frames[index];

  return (
    <section ref={wrapRef} className={styles.wrap} id="top" style={{ '--count': count } as React.CSSProperties}>
      <div className={styles.stage}>
        <h1 className={styles.name}>
          <span className={styles.first}>{HERO.first}</span>{' '}
          <span className={styles.last}>{HERO.last}</span>
        </h1>

        <div className={styles.window}>
          <div className={styles.reel} style={{ '--i': index } as React.CSSProperties}>
            <div className={`${styles.frame} ${styles.clone}`} aria-hidden="true">
              <Image
                src={HERO.frames[count - 1].src}
                alt=""
                fill
                sizes="(max-width: 760px) 92vw, 36vw"
                style={{ objectFit: 'cover', objectPosition: HERO.frames[count - 1].position }}
              />
            </div>
            {HERO.frames.map((f, i) => (
              <div key={f.src} className={`${styles.frame} ${i === index ? styles.frameOn : ''}`} aria-hidden={i !== index}>
                <Image
                  src={f.src}
                  alt={`${f.title[lang]}, ${f.detail[lang]}`}
                  fill
                  priority={i === 0}
                  sizes="(max-width: 760px) 92vw, 36vw"
                  style={{ objectFit: 'cover', objectPosition: f.position }}
                />
              </div>
            ))}
          </div>

          <div className={styles.lowerThird} aria-live="polite">
            <span key={`${index}-t`} className={styles.ltTitle}>{frame.title[lang]}</span>
            <span key={`${index}-d`} className={styles.ltDetail}>{frame.detail[lang]}</span>
          </div>
        </div>

        <p className={styles.lede}>{HERO.lede[lang]}</p>
      </div>
    </section>
  );
}
