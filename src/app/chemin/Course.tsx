'use client';
import { useEffect, useLayoutEffect, useRef, useState, type CSSProperties, type PointerEvent, type ReactNode } from 'react';
import Image from 'next/image';
import { STAGES, type Logo, type Photo, type Stage } from '@/content/chemin';
import type { Lang } from '@/content/textes';
import { useLang } from './Lang';
import Profile from './Profile';
import styles from './chemin.module.css';

// Les photos de Paul, en pile à droite de son nom avant la course.
export const paulPhotos = (lang: Lang): Photo[] => [
  { src: '/media/paul-harrer-portrait.jpg', alt: 'Paul Harrer', position: '50% 20%' },
  {
    src: '/media/wec-paddock-alpine.jpg',
    alt: lang === 'en' ? 'Paul Harrer in the Alpine paddock, at the WEC' : 'Paul Harrer dans le paddock d’Alpine, au WEC',
    position: '50% 30%',
  },
];
export const EMAIL = 'paulharrer@hotmail.com';

// Chaque bloc entre à son tour, 70 ms après le précédent : n est son rang.
export const rise = (n: number) => ({ '--rise-i': n }) as CSSProperties;

// Le premier écran vivant. À gauche, l'identité, puis l'étape choisie à sa place ;
// à droite, une pile de photos qui ne bouge pas : Paul d'abord, puis l'étape.
// Dessous, le profil sert de carte de la course. Pendant la course, la barre du haut
// garde qui est Paul et ce qu'il fait.
export default function Course({ children }: { children: ReactNode }) {
  const { lang, stages, t } = useLang();
  const { selected, select, from } = useStage();
  const [paulShot, setPaulShot] = useState(0);
  const riding = selected !== null;

  return (
    <>
      <Bar riding={riding} onHome={() => select(null)} />

      <div className={`${styles.hero} ${riding ? styles.hasStage : ''}`}>
        <div className={styles.identity}>
          {children}
          <button type="button" className={styles.start} onClick={() => select(0)}>
            {t.start}
          </button>
        </div>

        {selected === null ? (
          <PhotoStack photos={paulPhotos(lang)} shot={paulShot} onShot={setPaulShot} eager />
        ) : (
          <StageView key={selected} stage={stages[selected]} index={selected} from={from} onSelect={select} />
        )}

        <Profile selected={selected} onSelect={select} />
      </div>
    </>
  );
}

// L'étape ouverte dans le premier écran, et le côté d'où elle arrive : 1 de la droite (la
// suivante), -1 de la gauche (une précédente), 0 à l'ouverture. Tant que keys est vrai,
// les flèches du clavier passent d'une étape à l'autre et Échap referme.
export function useStage(keys = true) {
  const [selected, setSelected] = useState<number | null>(null);
  const [from, setFrom] = useState<-1 | 0 | 1>(0);
  const side = (prev: number | null, next: number | null) => (prev === null || next === null ? 0 : next < prev ? -1 : 1);
  const select = (i: number | null) => {
    setFrom(side(selected, i));
    setSelected(i);
  };

  useEffect(() => {
    if (selected === null || !keys) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.altKey || e.ctrlKey || e.metaKey) return;
      let next: number | null | undefined;
      if (e.key === 'ArrowRight' && selected < STAGES.length - 1) next = selected + 1;
      else if (e.key === 'ArrowLeft' && selected > 0) next = selected - 1;
      else if (e.key === 'Escape') next = null;
      if (next === undefined) return;
      e.preventDefault();
      setFrom(side(selected, next));
      setSelected(next);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [selected, keys]);

  return { selected, select, from };
}

// La barre du haut : le nom, puis pendant la course la photo et la phrase de Paul en plus.
// Un clic sur le nom ramène au départ. Contact mène à l'adresse, ou au bas de page quand
// la page en a un ; la dernière entrée mène à la même page dans l'autre langue.
export function Bar({
  riding,
  onHome,
  contact = `mailto:${EMAIL}`,
  children,
}: {
  riding: boolean;
  onHome: () => void;
  contact?: string;
  children?: ReactNode;
}) {
  const { t, alt } = useLang();
  return (
    <header className={`${styles.bar} ${riding ? styles.barRiding : ''}`}>
      <button
        type="button"
        className={styles.who}
        onClick={onHome}
        disabled={!riding}
        aria-label={riding ? t.home : undefined}
      >
        <span className={styles.avatar}>
          <Image src="/media/paul-harrer-portrait.jpg" alt="" fill sizes="44px" style={{ objectFit: 'cover', objectPosition: '50% 18%' }} />
        </span>
        <span className={styles.whoText}>
          <span className={styles.whoName}>Paul Harrer</span>
          <span className={styles.tagline}>{t.tagline}</span>
        </span>
      </button>
      <nav>
        <a href="/CV-PaulHarrer-VC.pdf" target="_blank" rel="noopener noreferrer">{t.cv}</a>
        <a href={t.carHref} className={styles.barWork}>{t.car}</a>
        <a href={contact}>{t.contact}</a>
        {alt && (
          <a href={alt} hrefLang={t.other.code} lang={t.other.code} aria-label={t.other.label}>
            {t.other.short}
          </a>
        )}
      </nav>
      {children}
    </header>
  );
}

export function StageView({ stage, index, from, onSelect }: { stage: Stage; index: number; from: -1 | 0 | 1; onSelect: (i: number | null) => void }) {
  const photos = stage.photos ?? [];
  const logos = stage.logos ?? [];
  const [shot, setShot] = useState(0);
  const { t } = useLang();
  const last = index === STAGES.length - 1;
  // Les blocs entrent par le bas à l'ouverture, puis par le côté d'où vient l'étape.
  const side = from ? ({ '--rise-x': `${from * 36}px`, '--rise-y': '0px' } as CSSProperties) : undefined;

  return (
    <>
      <div className={styles.stageBody} style={side}>
        <h2 className={`${styles.stageTitle} ${styles.rise}`} style={rise(0)}>{stage.name}</h2>
        <div className={styles.stageText}>
          <p className={`${styles.stageDetail} ${styles.rise}`} style={rise(1)}>{stage.detail}</p>
          <div className={styles.rise} style={rise(2)}>
            {photos.length > 0 && <p className={styles.caption}>{photos[shot].alt}</p>}
            <div className={styles.extras}>
              {stage.links?.map((l) => (
                <a key={l.href} className={styles.link} href={l.href} target="_blank" rel="noopener noreferrer">
                  {l.label}
                </a>
              ))}
              {/* Quand la pile montre des photos, les logos de l'étape passent sous le texte. */}
              {photos.length > 0 && logos.length > 0 && <LogoRow logos={logos} />}
            </div>
          </div>
        </div>

        {/* À droite du texte, les chiffres. */}
        {stage.figures && (
          <dl className={styles.figures}>
            {stage.figures.map((f, i) => (
              <div key={f.label} className={styles.rise} style={rise(2 + i)}>
                <dt><Odometer value={f.value} delay={200 + i * 140} /></dt>
                <dd>{f.label}</dd>
              </div>
            ))}
          </dl>
        )}

        <nav className={`${styles.stageNav} ${styles.rise}`} style={rise(3)} aria-label={t.stagesNav}>
          <button type="button" className={styles.next} onClick={() => onSelect(last ? 0 : index + 1)}>
            {last ? t.restart : <Short long={t.next} short={t.nextShort} />}
          </button>
          {index > 0 && (
            <button type="button" onClick={() => onSelect(index - 1)}>
              <Short long={t.prev} short={t.prevShort} />
            </button>
          )}
          <button type="button" className={styles.close} onClick={() => onSelect(null)}>
            {t.close}
          </button>
        </nav>
      </div>

      {photos.length > 0 ? (
        <PhotoStack photos={photos} shot={shot} onShot={setShot} autoplay enter={from * 48} />
      ) : (
        <div className={styles.stack}>
          <div className={styles.card} data-pos="0">
            <div className={styles.logoWall}>
              {logos.map((l) => (
                <span key={l.name} className={styles.logoBig} style={{ aspectRatio: l.ratio, background: l.bg }}>
                  <span className={styles.logoInner} style={{ inset: l.bg ? '12%' : 0 }}>
                    <Image src={l.src} alt={l.name} fill sizes="240px" style={{ objectFit: 'contain' }} />
                  </span>
                </span>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

// Une pile de photos aux coins arrondis : celle du dessus, et les suivantes qui dépassent
// derrière, inclinées vers l'intérieur de la page (peek : -1 vers la gauche, 1 vers la
// droite). Un clic (ou la barre pleine, en lecture auto) fait passer la suivante. Sous la
// souris, la pile s'incline légèrement vers le pointeur. La photo du dessus entre par le bas,
// ou de côté quand enter donne un décalage en pixels. Au premier écran (eager), les photos
// se chargent tout de suite. Une carte peut être un extrait vidéo : en lecture auto, il joue
// sans le son le temps de sa durée ; « Son » le fait écouter et retient la pile sur lui.
export function PhotoStack({
  photos,
  shot,
  onShot,
  autoplay = false,
  enter = 0,
  peek = -1,
  eager = false,
}: {
  photos: Photo[];
  shot: number;
  onShot: (i: number) => void;
  autoplay?: boolean;
  enter?: number;
  peek?: -1 | 1;
  eager?: boolean;
}) {
  const n = photos.length;
  const stack = useRef<HTMLDivElement>(null);
  const { t } = useLang();
  const clip = useClip();
  const top = photos[shot];
  // On écoute l'extrait du dessus, ou on l'a mis en pause : la pile attend.
  const hold = Boolean(top.video) && (clip.sound || clip.want === 'pause');
  const go = (i: number) => {
    clip.reset();
    onShot(i);
  };
  const next = () => go((shot + 1) % n);

  const tilt = (e: PointerEvent<HTMLDivElement>) => {
    const el = stack.current;
    if (!el || e.pointerType !== 'mouse' || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const box = el.getBoundingClientRect();
    const dx = (e.clientX - box.left) / box.width - 0.5;
    const dy = (e.clientY - box.top) / box.height - 0.5;
    el.style.transition = 'transform 0.12s linear';
    el.style.transform = `perspective(900px) rotateY(${dx * 10}deg) rotateX(${-dy * 10}deg)`;
  };
  const untilt = () => {
    const el = stack.current;
    if (!el) return;
    el.style.transition = 'transform 0.5s var(--ease-out)';
    el.style.transform = '';
  };

  return (
    <div
      ref={stack}
      className={`${styles.stack} ${n > 1 ? styles.stackMulti : ''} ${hold ? styles.stackHold : ''}`}
      style={{ '--peek': peek, '--enter-x': `${enter}px`, '--enter-y': enter ? '0px' : '14px' } as CSSProperties}
      onClick={n > 1 ? next : undefined}
      onPointerMove={tilt}
      onPointerLeave={untilt}
    >
      {photos.map((p, i) => {
        const pos = (i - shot + n) % n;
        // La photo qui vient de partir s'envole ; les autres attendent en pile.
        const place = pos === 0 ? '0' : n > 2 && pos === n - 1 ? 'out' : pos <= 2 ? String(pos) : 'hidden';
        return (
          <div key={p.src} className={`${styles.card} ${p.whole ? styles.cardWhole : ''}`} data-pos={place} aria-hidden={pos !== 0}>
            {p.video ? (
              <Clip photo={p} onTop={pos === 0} active={autoplay} clip={clip} />
            ) : (
              <Image
                src={p.src}
                alt={pos === 0 ? p.alt : ''}
                fill
                loading={eager ? 'eager' : undefined}
                sizes="(max-width: 1099px) 100vw, 360px"
                className={`${styles.photo} ${pos === 0 && !p.whole ? styles.settle : ''}`}
                style={{ objectPosition: p.position, objectFit: p.whole ? 'contain' : undefined }}
              />
            )}
            {p.badge && (
              <span className={styles.badge} style={{ aspectRatio: p.badge.ratio }}>
                <Image src={p.badge.src} alt={p.badge.name} fill sizes="64px" style={{ objectFit: 'contain' }} />
              </span>
            )}
          </div>
        );
      })}
      {top.video && <ClipControls clip={clip} />}
      {autoplay && n > 1 && (
        <div className={styles.ticks}>
          {photos.map((p, i) => (
            <button
              key={p.src}
              type="button"
              aria-label={t.photo(i + 1, n, p.alt)}
              className={`${styles.tick} ${i < shot ? styles.tickDone : ''}`}
              onClick={(e) => {
                e.stopPropagation();
                go(i);
              }}
            >
              {i === shot && <span onAnimationEnd={next} style={p.video ? { animationDuration: `${p.duration}s` } : undefined} />}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

// L'état d'un extrait vidéo : le son, ce que veut le visiteur (lecture automatique, lecture
// ou pause), et s'il joue vraiment.
export function useClip() {
  const [sound, setSound] = useState(false);
  const [want, setWant] = useState<'auto' | 'play' | 'pause'>('auto');
  const [playing, setPlaying] = useState(false);
  return {
    sound,
    want,
    playing,
    setPlaying,
    toggleSound: () => {
      if (!sound) setWant('play');
      setSound(!sound);
    },
    togglePlay: () => setWant(playing ? 'pause' : 'play'),
    reset: () => {
      setSound(false);
      setWant('auto');
    },
  };
}

type ClipState = ReturnType<typeof useClip>;

// Un extrait vidéo, l'image d'attente en place tant qu'il ne joue pas. Il joue s'il est en
// tête et que le visiteur l'a lancé, ou en lecture automatique quand active est vrai, sauf
// pour qui a demandé moins d'animations. Revenu en tête, il repart du début.
export function Clip({ photo, onTop, active, clip }: { photo: Photo; onTop: boolean; active: boolean; clip: ClipState }) {
  const video = useRef<HTMLVideoElement>(null);
  const { want, sound, setPlaying } = clip;

  useEffect(() => {
    if (onTop && video.current) video.current.currentTime = 0;
  }, [onTop]);

  useEffect(() => {
    const el = video.current!;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    el.muted = !sound;
    if (onTop && (want === 'play' || (want === 'auto' && active && !reduce))) el.play().catch(() => setPlaying(false));
    else el.pause();
  }, [onTop, active, want, sound, setPlaying]);

  return (
    <video
      ref={video}
      className={styles.clip}
      src={photo.video}
      poster={photo.src}
      muted
      loop
      playsInline
      preload="none"
      aria-label={photo.alt}
      style={{ objectPosition: photo.position }}
      onPlay={() => onTop && setPlaying(true)}
      onPause={() => onTop && setPlaying(false)}
    />
  );
}

// Un reel vertical, dans un cadre de téléphone aux coins arrondis, avec ses deux boutons et
// sa légende (le texte de la photo, ou children). Il joue sans le son tant qu'active est
// vrai ; label pose une étiquette dans le coin du cadre.
export function Reel({
  photo,
  active,
  order,
  label,
  children,
}: {
  photo: Photo;
  active: boolean;
  order: number;
  label?: string;
  children?: ReactNode;
}) {
  const clip = useClip();
  return (
    <figure className={`${styles.reel} ${styles.rise}`} style={rise(1 + order)}>
      <div className={styles.reelFrame}>
        <Clip photo={photo} onTop active={active} clip={clip} />
        {label && <span className={styles.reelLabel}>{label}</span>}
        <ClipControls clip={clip} />
      </div>
      <figcaption className={styles.caption}>{children ?? photo.alt}</figcaption>
    </figure>
  );
}

// Les deux boutons d'un extrait : le son, et pause ou lecture.
export function ClipControls({ clip }: { clip: ClipState }) {
  const { t } = useLang();
  return (
    <div className={styles.clipControls}>
      <button
        type="button"
        aria-pressed={clip.sound}
        onClick={(e) => {
          e.stopPropagation();
          clip.toggleSound();
        }}
      >
        {clip.sound ? t.soundOn : t.sound}
      </button>
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          clip.togglePlay();
        }}
      >
        {clip.playing ? t.pause : t.play}
      </button>
    </div>
  );
}

// Un libellé complet, raccourci sur téléphone pour que les boutons tiennent sur une ligne.
function Short({ long, short }: { long: string; short: string }) {
  return (
    <>
      <span className={styles.long}>{long}</span>
      <span className={styles.short}>{short}</span>
    </>
  );
}

export function LogoRow({ logos }: { logos: Logo[] }) {
  return (
    <ul className={styles.stageLogos}>
      {logos.map((l) => (
        <li key={l.name} style={{ aspectRatio: l.ratio, background: l.bg }}>
          <Image src={l.src} alt={l.name} fill sizes="120px" style={{ objectFit: 'contain' }} />
        </li>
      ))}
    </ul>
  );
}

// Un chiffre affiché comme sur un tableau de score : chaque chiffre roule jusqu'à sa valeur,
// et les rouleaux s'arrêtent l'un après l'autre. « 600 000 », « 86 % », « 10 M+ » : seuls les
// chiffres tournent. Sans script, ou avec moins d'animations, la valeur s'affiche telle
// quelle ; sinon les rouleaux attendent à zéro et partent quand run passe à vrai, après delay.
// La bande de chaque rouleau est dessinée par le style.
export function Odometer({ value, delay, run = true }: { value: string; delay: number; run?: boolean }) {
  const box = useRef<HTMLSpanElement>(null);

  useLayoutEffect(() => {
    if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) box.current!.setAttribute('data-armed', '');
  }, []);
  useLayoutEffect(() => {
    const el = box.current!;
    if (!run || !el.hasAttribute('data-armed')) return;
    el.getBoundingClientRect(); // les rouleaux sont posés à zéro avant de partir
    el.removeAttribute('data-armed');
  }, [run]);

  // Les chiffres sont de vrais caractères, invisibles sous leur rouleau ; le reste du texte
  // (« ans », « M+ », les espaces) est lu d'un bloc. Le texte de la page reste « 8 ans ».
  const parts = value.match(/\d|\D+/g) ?? [value];
  let digits = 0;
  return (
    <span ref={box} className={styles.odometer} style={{ '--odo-delay': `${delay}ms` } as CSSProperties}>
      {parts.map((c, i) =>
        /\d/.test(c) ? (
          <span key={i} className={styles.roller} style={{ '--d': c, '--k': digits++ } as CSSProperties}>
            <span className={styles.realDigit}>{c}</span>
          </span>
        ) : (
          <span key={i} className={styles.glyph}>{c}</span>
        ),
      )}
    </span>
  );
}
