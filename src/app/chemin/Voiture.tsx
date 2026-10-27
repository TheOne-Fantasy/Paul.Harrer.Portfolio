'use client';
import { useEffect, useRef, useState } from 'react';
import { VOITURE, VOITURE_EN } from '@/content/voiture';
import Arrivee from './Arrivee';
import { Bar, PhotoStack, Reel, rise } from './Course';
import { useLang } from './Lang';
import styles from './chemin.module.css';

// Un bloc de la page : il entre en scène la première fois qu'il apparaît (seen), et ses
// vidéos ou sa pile ne jouent que tant qu'il est à l'écran (on).
function useShown<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  const [seen, setSeen] = useState(false);
  const [on, setOn] = useState(false);
  useEffect(() => {
    const io = new IntersectionObserver(
      ([e]) => {
        setOn(e.isIntersecting);
        if (e.isIntersecting) setSeen(true);
      },
      { threshold: 0.2 },
    );
    io.observe(ref.current!);
    return () => io.disconnect();
  }, []);
  return [ref, seen, on] as const;
}

// La page « Dans la voiture suiveuse » : les outils de montage par IA et leurs reels, la
// direction artistique de l'AS Can Mines, puis les travaux de concept, montages et affiches.
// Même barre, mêmes piles de photos, mêmes cadres de reels et même arrivée que l'accueil.
export default function Voiture() {
  const { lang, t } = useLang();
  const v = lang === 'en' ? VOITURE_EN : VOITURE;
  const home = lang === 'en' ? '/en' : '/';
  const [toolsRef, toolsSeen, toolsOn] = useShown<HTMLDivElement>();
  const [clubRef, clubSeen, clubOn] = useShown<HTMLElement>();
  const [conceptsRef, conceptsSeen] = useShown<HTMLDivElement>();
  const [postersRef, postersSeen, postersOn] = useShown<HTMLElement>();
  const [clubShot, setClubShot] = useState(0);
  const [posterShot, setPosterShot] = useState(0);
  const poster = v.posters[posterShot];

  return (
    <>
      <Bar riding onHome={() => window.location.assign(home)} contact="#contact" />

      <div className={styles.vsHead}>
        <h1 className={styles.vsTitle}>{v.title}</h1>
        <p className={styles.vsLede}>{v.lede}</p>
        <p className={styles.vsIntro}>{v.intro}</p>
        <a className={styles.textButton} href={home}>{t.backHome}</a>
      </div>

      {/* Les outils de montage, et les deux reels qui en sortent. */}
      <div ref={toolsRef} className={`${styles.car} ${toolsSeen ? styles.seen : ''}`}>
        <div className={styles.carText}>
          <h2 id="outils" className={`${styles.stageTitle} ${styles.rise}`} style={rise(0)}>{v.toolsTitle}</h2>
          {v.side.paragraphs.map((text, i) => (
            <p key={text} className={`${styles.carParagraph} ${styles.rise}`} style={rise(1 + i)}>{text}</p>
          ))}
          <p className={`${styles.caption} ${styles.rise}`} style={rise(1 + v.side.paragraphs.length)}>{v.side.tools}</p>
        </div>
        <div className={styles.reels}>
          {v.side.reels.map((r, i) => (
            <Reel key={r.video} photo={r} active={toolsOn} order={i} />
          ))}
        </div>
      </div>

      {/* La direction artistique de l'AS Can Mines : la pile de visuels, le texte et la palette. */}
      <article ref={clubRef} className={`${styles.etape} ${styles.flip} ${styles.vsBlock} ${clubSeen ? styles.seen : ''}`} aria-labelledby="club">
        <div className={styles.etapeText}>
          <h2 id="club" className={`${styles.stageTitle} ${styles.rise}`} style={rise(0)}>{v.clubTitle}</h2>
          <p className={`${styles.stageDetail} ${styles.rise}`} style={rise(1)}>{v.clubText}</p>
          <ul className={`${styles.palette} ${styles.rise}`} style={rise(2)} aria-label={v.paletteLabel}>
            {v.palette.map((c) => (
              <li key={c.hex}>
                <span className={styles.swatch} style={{ background: c.hex }} aria-hidden="true" />
                <span>{c.name}</span>
                <span className={styles.swatchHex}>{c.hex}</span>
              </li>
            ))}
          </ul>
        </div>
        <figure className={styles.etapePhoto}>
          <PhotoStack photos={v.club} shot={clubShot} onShot={setClubShot} autoplay={clubOn} enter={-56} peek={1} />
          <figcaption className={styles.caption}>{v.club[clubShot].alt}</figcaption>
        </figure>
      </article>

      {/* Les travaux de concept : d'abord les montages, à lancer soi-même. */}
      <div ref={conceptsRef} className={`${styles.vsConcepts} ${conceptsSeen ? styles.seen : ''}`}>
        <h2 className={`${styles.stageTitle} ${styles.rise}`} style={rise(0)}>{v.conceptTitle}</h2>
        <p className={`${styles.stageDetail} ${styles.rise}`} style={rise(1)}>{v.disclaimer}</p>
        <h3 className={`${styles.vsSub} ${styles.rise}`} style={rise(2)}>{v.videoTitle}</h3>
        <div className={styles.conceptReels}>
          {v.videos.map((w, i) => (
            <Reel key={w.photo.video} photo={w.photo} active={false} order={2 + i} label={v.badge}>
              <strong className={styles.reelTitle}>{w.title}</strong>
              {w.text}
            </Reel>
          ))}
        </div>
      </div>

      {/* Puis les affiches, en pile : le texte suit l'affiche du dessus. */}
      <article ref={postersRef} className={`${styles.etape} ${styles.vsBlock} ${postersSeen ? styles.seen : ''}`} aria-labelledby="affiches">
        <div className={styles.etapeText}>
          <h3 id="affiches" className={`${styles.vsSub} ${styles.rise}`} style={rise(0)}>{v.posterTitle}</h3>
          <div key={posterShot} className={styles.vsPoster}>
            <p className={styles.vsPosterTitle}>{poster.title}</p>
            <p className={styles.stageDetail}>{poster.text}</p>
          </div>
        </div>
        <figure className={styles.etapePhoto}>
          <PhotoStack photos={v.posters.map((p) => p.photo)} shot={posterShot} onShot={setPosterShot} autoplay={postersOn} enter={56} />
          <figcaption className={styles.caption}>{v.badge}</figcaption>
        </figure>
      </article>

      <Arrivee links={[{ href: home, label: t.backHome }]} />
    </>
  );
}
