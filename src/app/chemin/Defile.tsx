'use client';
import { Fragment, useEffect, useRef, useState, type CSSProperties, type ReactNode } from 'react';
import Image from 'next/image';
import { END, FINAL, PROFILE, START, STAGES, type Stage } from '@/content/chemin';
import Arrivee from './Arrivee';
import { Bar, LogoRow, Odometer, paulPhotos, PhotoStack, Reel, rise, StageView, useStage } from './Course';
import { useLang } from './Lang';
import Profile, { altAt, Cyclist } from './Profile';
import Route from './Route';
import styles from './chemin.module.css';

// Sur le bandeau, les étapes sont espacées régulièrement, un pas par étape, pour que
// leurs logos ne se chevauchent pas. Entre deux étapes, le profil garde sa forme, étirée.
const KNOTS = [...STAGES.map((s) => s.year), END];
const slot = (year: number) => {
  for (let i = 1; i < KNOTS.length; i++) {
    if (year <= KNOTS[i]) return (i - 1 + (year - KNOTS[i - 1]) / (KNOTS[i] - KNOTS[i - 1])) / (KNOTS.length - 1);
  }
  return 1;
};
// Le bandeau dessine le profil sur 1000 × 100 unités, étiré à sa largeur ;
// la route y tient entre 8 et 92 en hauteur. Le tracé passe aussi par chaque étape,
// pour que leurs points et le coureur tombent pile sur la route.
const by = (alt: number) => 92 - alt * 0.84;
const bandYears = [...new Set([...PROFILE.map(([yr]) => yr), ...KNOTS])].sort((a, b) => a - b);
const bandLine = bandYears.map((yr) => `${(slot(yr) * 1000).toFixed(1)},${by(altAt(yr)).toFixed(1)}`).join(' ');
const bandArea = `0,100 ${bandLine} 1000,100`;
const bandFinal = `${slot(FINAL) * 1000},100 ${bandYears
  .filter((yr) => yr >= FINAL)
  .map((yr) => `${(slot(yr) * 1000).toFixed(1)},${by(altAt(yr)).toFixed(1)}`)
  .join(' ')} 1000,100`;
// La première étape des derniers kilomètres, annoncée par la flamme rouge.
const LAST_KM = STAGES.findIndex((s) => s.year > FINAL);

const reduced = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// La version qui défile. Le premier écran marche comme dans la version de départ : un clic
// sur une étape l'ouvre sur place. Dessous, les étapes se lisent l'une après l'autre ; une
// fois le premier écran passé, le profil se résume en un bandeau sous la barre, où le
// coureur avance au fil de la lecture.
// Avec road, une route vue du dessus serpente entre les étapes jusqu'à l'arrivée ; sur
// ordinateur, son coureur remplace celui du bandeau.
export default function Defile({ children, road = false }: { children: ReactNode; road?: boolean }) {
  const { lang, stages, side, t } = useLang();
  const [paulShot, setPaulShot] = useState(0);
  const [scrolled, setScrolled] = useState(false);
  // Le clavier ne sert qu'au premier écran, quand on le voit.
  const { selected, select, from } = useStage(!scrolled);
  const [active, setActive] = useState<number | null>(null);    // l'étape qu'on lit
  const [reached, setReached] = useState<number | null>(null);  // la dernière où est passé le coureur
  const [seen, setSeen] = useState(() => STAGES.map(() => false));
  const [lastKmSeen, setLastKmSeen] = useState(false);
  const [sideSeen, setSideSeen] = useState(false);
  const [sideOn, setSideOn] = useState(false); // la voiture suiveuse est à l'écran : ses reels jouent
  const hero = useRef<HTMLDivElement>(null);
  const sections = useRef<(HTMLElement | null)[]>([]);
  const lastKm = useRef<HTMLDivElement>(null);
  const car = useRef<HTMLElement>(null);
  const course = useRef<HTMLDivElement>(null);
  const rider = useRef<HTMLSpanElement>(null);
  const tilt = useRef<SVGGElement>(null);
  const ridden = useRef<SVGRectElement>(null);
  const strip = useRef<HTMLDivElement>(null);

  // À chaque défilement : l'étape en cours, le bandeau, et la place du coureur.
  useEffect(() => {
    let frame = 0;
    let prev: number | null = null; // place précédente du coureur, pour savoir s'il roule et dans quel sens
    let still = 0;
    const update = () => {
      frame = 0;
      const els = sections.current.filter((el): el is HTMLElement => el !== null);
      const margin = parseFloat(getComputedStyle(els[0]).scrollMarginTop);
      const at = window.scrollY;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      // Là où chaque étape arrive juste sous le bandeau, comme après un clic.
      const knots = els.map((el) => el.getBoundingClientRect().top + at - margin);

      // L'étape en cours change quand la suivante passe le milieu de l'écran.
      const half = (window.innerHeight - margin) / 2;
      let current = -1;
      knots.forEach((k, i) => {
        if (at >= k - half) current = i;
      });
      setActive(current < 0 ? null : current);
      setScrolled(hero.current!.getBoundingClientRect().bottom < margin);

      // Le coureur est sur une étape quand elle arrive sous le bandeau, puis roule
      // vers la suivante ; après la dernière, il finit sa course en bas de page.
      let year = START;
      let i = -1;
      // Un pixel de marge : le défilement s'arrête parfois une fraction avant l'étape.
      knots.forEach((k, n) => {
        if (at + 1 >= k) i = n;
      });
      // Le bandeau suit le coureur : une étape s'allume quand il y arrive.
      setReached(i < 0 ? null : i);
      if (i >= 0) {
        const last = i === knots.length - 1;
        const span = (last ? max : knots[i + 1]) - knots[i];
        const f = span > 0 ? Math.max(0, Math.min(1, (at - knots[i]) / span)) : 1;
        const to = last ? END : STAGES[i + 1].year;
        year = STAGES[i].year + (to - STAGES[i].year) * f;
      }
      const p = slot(year);
      const r = rider.current!;
      r.style.transform = `translate(${p * 100}%, ${by(altAt(year))}%)`;
      // En bas de page, il passe la ligne et lève les bras.
      r.toggleAttribute('data-finish', p > 0.999);
      ridden.current?.setAttribute('width', String(p * 1000));

      // Il s'incline avec la pente, telle qu'on la voit sur le bandeau étiré.
      const box = strip.current!.getBoundingClientRect();
      const y0 = Math.max(START, year - 0.05);
      const y1 = Math.min(END, year + 0.05);
      const dx = (slot(y1) - slot(y0)) * box.width;
      const dy = ((by(altAt(y1)) - by(altAt(y0))) / 100) * box.height;
      tilt.current?.setAttribute('transform', `rotate(${((Math.atan2(dy, dx) * 180) / Math.PI).toFixed(1)})`);
      // Ses roues tournent tant qu'on défile, des traits de vitesse filent derrière lui
      // quand on défile vite ; il se retourne quand on remonte, et refait face à la course
      // à l'arrêt.
      if (prev !== null && p !== prev) {
        r.toggleAttribute('data-back', p < prev);
        r.setAttribute('data-moving', '');
        r.style.setProperty('--speed', Math.min(1, (Math.abs(p - prev) * box.width) / 14).toFixed(2));
        clearTimeout(still);
        still = window.setTimeout(() => {
          r.removeAttribute('data-moving');
          r.removeAttribute('data-back');
          r.style.setProperty('--speed', '0');
        }, 160);
      }
      prev = p;
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    schedule();
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule);
    return () => {
      cancelAnimationFrame(frame);
      clearTimeout(still);
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', schedule);
    };
  }, []);

  // Une étape, l'annonce des derniers kilomètres ou la voiture suiveuse entre en scène la
  // première fois qu'elle apparaît à l'écran.
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (!e.isIntersecting) return;
          if (e.target === lastKm.current) setLastKmSeen(true);
          else if (e.target === car.current) setSideSeen(true);
          else {
            const i = sections.current.indexOf(e.target as HTMLElement);
            setSeen((prev) => (prev[i] ? prev : prev.map((v, k) => v || k === i)));
          }
          io.unobserve(e.target);
        });
      },
      { rootMargin: '0px 0px -15% 0px' },
    );
    [...sections.current, lastKm.current, car.current].forEach((el) => el && io.observe(el));
    // Les reels jouent tant que le quart de la voiture suiveuse au moins est à l'écran.
    const shown = new IntersectionObserver(([e]) => setSideOn(e.isIntersecting), { threshold: 0.25 });
    if (car.current) shown.observe(car.current);
    return () => {
      io.disconnect();
      shown.disconnect();
    };
  }, []);

  const goTo = (i: number) => {
    const el = sections.current[i];
    if (!el) return;
    el.scrollIntoView({ behavior: reduced() ? 'auto' : 'smooth', block: 'start' });
    el.focus({ preventScroll: true });
  };
  // Sur téléphone et tablette, l'étape s'ouvrirait sous le profil puis reviendrait plus bas
  // dans la page : un clic mène directement à elle. Sur ordinateur, elle s'ouvre sur place.
  const open = (i: number) => {
    if (window.matchMedia('(max-width: 1099px)').matches) goTo(i);
    else select(i);
  };
  // Le nom dans la barre ramène à la présentation, en haut de page.
  const goHome = () => {
    select(null);
    window.scrollTo({ top: 0, behavior: reduced() ? 'auto' : 'smooth' });
  };
  const current = reached === null ? null : stages[reached];
  const inFinal = reached !== null && reached >= LAST_KM;

  return (
    <>
      <Bar riding={selected !== null || scrolled} onHome={goHome} contact="#contact">
        <nav className={`${styles.band} ${scrolled ? styles.bandOn : ''} ${inFinal ? styles.inFinal : ''} ${road ? styles.bandRoad : ''}`} aria-label={t.route}>
          <p key={reached} className={styles.bandName}>
            {current?.icon && <Image src={current.icon.src} alt="" width={24} height={24} />}
            <span>{current?.name}</span>
          </p>
          <div ref={strip} className={styles.strip}>
            <svg className={styles.bandRoute} viewBox="0 0 1000 100" preserveAspectRatio="none" aria-hidden="true">
              <defs>
                <clipPath id="bandRidden">
                  <rect ref={ridden} width="0" height="100" />
                </clipPath>
              </defs>
              <polygon points={bandArea} className={styles.area} />
              <polygon points={bandFinal} className={styles.finalZone} />
              <polyline points={bandLine} className={styles.line} vectorEffect="non-scaling-stroke" />
              <polyline points={bandLine} className={styles.ride} clipPath="url(#bandRidden)" vectorEffect="non-scaling-stroke" />
            </svg>
            <span className={styles.bandFlame} style={{ left: `${slot(FINAL) * 100}%` }} aria-hidden="true" />
            {/* L'arrivée, au bout de la route : un mât et un petit drapeau à damier. */}
            <svg className={styles.bandFinish} viewBox="0 0 12 44" aria-hidden="true">
              <rect x="0" y="0" width="1.5" height="44" className={styles.checkLight} />
              {[0, 1, 2].map((c) =>
                [0, 1].map((r) => (
                  <rect key={`${c}${r}`} x={1.5 + c * 3.5} y={r * 3.5} width="3.5" height="3.5" className={(c + r) % 2 ? styles.checkLight : styles.checkDark} />
                )),
              )}
            </svg>
            {/* Chaque étape : son logo au-dessus de son point de passage. Ils entrent l'un
                après l'autre quand le bandeau apparaît. */}
            {STAGES.map((s, i) => (
              <button
                key={s.name}
                type="button"
                className={`${styles.bandStop} ${reached !== null && i <= reached ? styles.bandPassed : ''}`}
                style={{ left: `${slot(s.year) * 100}%`, top: `${by(altAt(s.year))}%`, '--delay': `${120 + i * 35}ms` } as CSSProperties}
                aria-label={t.goTo(stages[i].name)}
                aria-current={i === reached ? 'step' : undefined}
                onClick={() => goTo(i)}
              >
                {s.icon && <Image src={s.icon.src} alt="" width={20} height={20} />}
              </button>
            ))}
            <span ref={rider} className={styles.bandRider} aria-hidden="true">
              <svg viewBox="-15 -28 30 30">
                <Cyclist tilt={tilt} />
              </svg>
            </span>
          </div>
        </nav>
      </Bar>

      <div ref={hero} className={`${styles.hero} ${selected !== null ? styles.hasStage : ''}`}>
        <div className={styles.identity}>
          {children}
          <button type="button" className={styles.start} onClick={() => open(0)}>
            {t.start}
          </button>
        </div>
        {selected === null ? (
          <PhotoStack photos={paulPhotos(lang)} shot={paulShot} onShot={setPaulShot} eager />
        ) : (
          <StageView key={selected} stage={stages[selected]} index={selected} from={from} onSelect={select} />
        )}
        <Profile selected={selected} onSelect={open} />
      </div>

      <div ref={course} className={road ? styles.roadCourse : undefined}>
      {road && <Route course={course} />}
      <div className={styles.etapes}>
        {STAGES.map((s, i) => (
          <Fragment key={s.id}>
            {i === LAST_KM && (
              <div ref={lastKm} data-road="titre" className={`${styles.lastKm} ${lastKmSeen ? styles.seen : ''}`}>
                <span className={styles.lastKmFlag} aria-hidden="true" />
                <h2 className={styles.lastKmTitle}>{t.lastKm}</h2>
              </div>
            )}
            <StageSection
              stage={stages[i]}
              flip={i % 2 === 1}
              seen={seen[i]}
              playing={i === active}
              sectionRef={(el) => {
                sections.current[i] = el;
              }}
            />
          </Fragment>
        ))}
      </div>

      {/* À côté des étapes, la voiture suiveuse : ce qu'on trouve sur sa page, et deux reels
          sortis des outils de montage, en lecture tant qu'elle est à l'écran. */}
      <aside ref={car} data-road="allee" className={`${styles.car} ${sideSeen ? styles.seen : ''}`} aria-labelledby="voiture-suiveuse">
        <div className={styles.carText}>
          <h2 id="voiture-suiveuse" className={`${styles.stageTitle} ${styles.rise}`} style={rise(0)}>{side.title}</h2>
          <p className={`${styles.stageDetail} ${styles.rise}`} style={rise(1)}>{side.lede}</p>
          <p className={`${styles.carParagraph} ${styles.rise}`} style={rise(2)}>{side.note}</p>
          <a className={`${styles.start} ${styles.carMore} ${styles.rise}`} style={rise(3)} href={t.carHref}>
            {t.carMore}
          </a>
        </div>
        <div className={styles.reels}>
          {side.reels.map((r, i) => (
            <Reel key={r.video} photo={r} active={sideOn} order={i} />
          ))}
        </div>
      </aside>

      <Arrivee links={[{ href: t.carHref, label: t.car }]} />
      </div>
    </>
  );
}

// Une étape dans la page : le texte et ses chiffres d'un côté, la pile de photos et sa
// légende de l'autre, en alternance. Ses blocs attendent qu'elle apparaisse pour entrer,
// la pile arrive de son côté, et ses photos défilent quand elle est l'étape en cours.
function StageSection({
  stage,
  flip,
  seen,
  playing,
  sectionRef,
}: {
  stage: Stage;
  flip: boolean;
  seen: boolean;
  playing: boolean;
  sectionRef: (el: HTMLElement | null) => void;
}) {
  const photos = stage.photos ?? [];
  const logos = stage.logos ?? [];
  const [shot, setShot] = useState(0);
  const extras = (stage.links?.length ?? 0) + logos.length > 0;

  return (
    <article ref={sectionRef} tabIndex={-1} data-road="allee" className={`${styles.etape} ${flip ? styles.flip : ''} ${seen ? styles.seen : ''}`}>
      <div className={styles.etapeText}>
        <h2 className={`${styles.stageTitle} ${styles.rise}`} style={rise(0)}>{stage.name}</h2>
        <p className={`${styles.stageDetail} ${styles.rise}`} style={rise(1)}>{stage.detail}</p>
        {stage.figures && (
          <dl className={styles.figures}>
            {stage.figures.map((f, i) => (
              <div key={f.label} className={styles.rise} style={rise(2 + i)}>
                <dt><Odometer value={f.value} delay={250 + i * 160} run={seen} /></dt>
                <dd>{f.label}</dd>
              </div>
            ))}
          </dl>
        )}
        {extras && (
          <div className={`${styles.extras} ${styles.rise}`} style={rise(2 + (stage.figures?.length ?? 0))}>
            {stage.links?.map((l) => (
              <a key={l.href} className={styles.link} href={l.href} target="_blank" rel="noopener noreferrer">
                {l.label}
              </a>
            ))}
            {logos.length > 0 && <LogoRow logos={logos} />}
          </div>
        )}
      </div>
      {photos.length > 0 && (
        <figure className={styles.etapePhoto}>
          <PhotoStack photos={photos} shot={shot} onShot={setShot} autoplay={playing} enter={flip ? -56 : 56} peek={flip ? 1 : -1} />
          <figcaption className={styles.caption}>{photos[shot].alt}</figcaption>
        </figure>
      )}
    </article>
  );
}
