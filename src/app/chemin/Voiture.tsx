'use client';
import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { VOITURE, VOITURE_EN } from '@/content/voiture';
import Arrivee from './Arrivee';
import { Bar, PhotoStack, Reel, rise } from './Course';
import { useLang } from './Lang';
import Route from './Route';
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

// La page « Dans la voiture suiveuse » : les outils de montage par IA et leurs reels, les
// travaux de concept (les affiches côte à côte, puis le projet EF Pro Cycling), et la
// direction artistique de l'AS Can Mines. Même barre, mêmes piles de photos, mêmes cadres
// de reels et même arrivée que l'accueil.
export default function Voiture() {
  const { lang, t } = useLang();
  const v = lang === 'en' ? VOITURE_EN : VOITURE;
  const home = lang === 'en' ? '/en' : '/';
  const [toolsRef, toolsSeen, toolsOn] = useShown<HTMLDivElement>();
  const [postersRef, postersSeen] = useShown<HTMLDivElement>();
  const [efRef, efSeen, efOn] = useShown<HTMLElement>();
  const [clubRef, clubSeen, clubOn] = useShown<HTMLElement>();
  const [clubShot, setClubShot] = useState(0);
  const [cardShot, setCardShot] = useState(0);
  const finish = useRef<HTMLDivElement>(null);

  return (
    <>
      <Bar riding onHome={() => window.location.assign(home)} contact="#contact" />

      <div className={styles.vsHead}>
        <h1 className={styles.vsTitle}>{v.title}</h1>
        <p className={styles.vsLede}>{v.lede}</p>
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

      {/* Les travaux de concept : les affiches, toutes visibles, chacune avec son texte. */}
      <div ref={postersRef} className={`${styles.vsConcepts} ${postersSeen ? styles.seen : ''}`}>
        <h2 className={`${styles.stageTitle} ${styles.rise}`} style={rise(0)}>{v.conceptTitle}</h2>
        <p className={`${styles.stageDetail} ${styles.rise}`} style={rise(1)}>{v.disclaimer}</p>
        <h3 className={`${styles.vsSub} ${styles.rise}`} style={rise(2)}>{v.posterTitle}</h3>
        <ul className={styles.posters}>
          {v.posters.map((p, i) => (
            <li key={p.photo.src} className={styles.rise} style={rise(3 + i)}>
              <span className={styles.posterFrame}>
                <Image src={p.photo.src} alt={p.photo.alt} fill sizes="(max-width: 720px) 84vw, (max-width: 1099px) 45vw, 320px" />
              </span>
              <p className={styles.vsPosterTitle}>{p.title}</p>
              <p className={styles.posterText}>{p.text}</p>
            </li>
          ))}
        </ul>
      </div>

      {/* Puis le projet EF, pièce par pièce, dans l'ordre où elles sortent le jour de l'étape. */}
      <article ref={efRef} className={`${styles.vsConcepts} ${styles.efProject} ${efSeen ? styles.seen : ''}`} aria-labelledby="ef">
        <h3 id="ef" className={`${styles.vsSub} ${styles.rise}`} style={rise(0)}>{v.efTitle}</h3>
        <p className={`${styles.stageDetail} ${styles.rise}`} style={rise(1)}>{v.efText}</p>
        <ol className={styles.efRow}>
          {v.ef.map((piece, i) => {
            const [first] = piece.photos;
            return (
              <li key={piece.title} className={`${styles.efPiece} ${first.video ? styles.efReel : ''}`}>
                {first.video ? (
                  <Reel photo={first} active={false} order={2 + i} label={v.badge}>
                    <strong className={styles.reelTitle}>{piece.title}</strong>
                    {piece.text}
                  </Reel>
                ) : (
                  <figure className={`${styles.efFigure} ${styles.rise}`} style={rise(2 + i)}>
                    {piece.photos.length > 1 ? (
                      <PhotoStack photos={piece.photos} shot={cardShot} onShot={setCardShot} autoplay={efOn} enter={56} peek={1} />
                    ) : (
                      <span className={styles.posterFrame}>
                        <Image src={first.src} alt={first.alt} fill sizes="(max-width: 720px) 84vw, (max-width: 1099px) 45vw, 300px" />
                      </span>
                    )}
                    <figcaption className={styles.caption}>
                      <strong className={styles.reelTitle}>{piece.title}</strong>
                      {piece.text}
                    </figcaption>
                  </figure>
                )}
              </li>
            );
          })}
        </ol>
      </article>

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

      {/* La page finit comme l'accueil : la dernière ligne droite, et le coureur qui passe la ligne. */}
      <div ref={finish} className={styles.roadCourse}>
        <Route course={finish} />
        <Arrivee links={[{ href: home, label: t.backHome }]} />
      </div>
    </>
  );
}
