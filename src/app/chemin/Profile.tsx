'use client';
import { useEffect, useMemo, useRef, useState, type CSSProperties, type Ref } from 'react';
import { END, FINAL, PAVES, PROFILE, START, STAGES, type Logo } from '@/content/chemin';
import { useLang } from './Lang';
import styles from './chemin.module.css';

// Repère du dessin : les années en abscisse, l'altitude (illustrative) en ordonnée.
// Les derniers kilomètres (depuis FINAL) prennent plus de place que le reste. Sur ordinateur,
// le dessin s'élargit à moitié vers la place qu'il occupe ; la hauteur reste fixe.
const H = 420;
const LEFT = 40;
const BASE = 380;   // altitude 0
const TOP = 200;    // altitude 100
// Lignes de base des étiquettes, de haut en bas. Les plus basses descendent dans
// l'espace libre au-dessus des premières années, où le profil est encore bas.
const ROWS = [30, 64, 98, 132, 166, 200, 234];
const CHIP = 24;    // taille des icônes dans les étiquettes

const y = (alt: number) => BASE - (alt / 100) * (BASE - TOP);

// Altitude du profil à une année donnée, par interpolation entre deux points.
export function altAt(year: number) {
  for (let i = 1; i < PROFILE.length; i++) {
    const [y0, a0] = PROFILE[i - 1];
    const [y1, a1] = PROFILE[i];
    if (year <= y1) return a0 + ((year - y0) / (y1 - y0)) * (a1 - a0);
  }
  return PROFILE[PROFILE.length - 1][1];
}

const YEARS = Array.from({ length: 11 }, (_, i) => START + i);

// Même courbe que l'ease-in-out des styles : le coureur accélère puis se pose sur l'étape.
const easeInOut = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);

// Tout ce qui dépend de la largeur w du dessin : l'échelle des années et les tracés. Les
// derniers kilomètres gardent la même part de la route, quelle que soit la largeur.
function geometry(w: number) {
  const right = w - 40;
  const finalX = LEFT + (right - LEFT) * (680 / 1120);
  const x = (year: number) =>
    year <= FINAL
      ? LEFT + ((year - START) / (FINAL - START)) * (finalX - LEFT)
      : finalX + ((year - FINAL) / (END - FINAL)) * (right - finalX);
  const yearAt = (px: number) =>
    px <= finalX
      ? START + ((px - LEFT) / (finalX - LEFT)) * (FINAL - START)
      : FINAL + ((px - finalX) / (right - finalX)) * (END - FINAL);
  const yAt = (px: number) => y(altAt(yearAt(px)));
  // La pente de la route sous le coureur, en degrés, pour qu'il s'incline avec elle.
  const slopeAt = (px: number) => {
    const a = Math.max(LEFT, px - 6);
    const b = Math.min(right, px + 6);
    return (Math.atan2(yAt(b) - yAt(a), b - a) * 180) / Math.PI;
  };
  // Le tracé passe aussi par la flamme rouge, où l'échelle change : le coureur y reste sur la route.
  const line = [...PROFILE.map(([yr]) => yr), FINAL]
    .sort((a, b) => a - b)
    .map((yr) => `${x(yr).toFixed(1)},${y(altAt(yr)).toFixed(1)}`)
    .join(' ');
  const area = `${x(START)},${BASE} ${line} ${x(END)},${BASE}`;
  const paves = [
    `${x(PAVES[0])},${BASE}`,
    ...PROFILE.filter(([yr]) => yr >= PAVES[0] && yr <= PAVES[1]).map(([yr, a]) => `${x(yr)},${y(a)}`),
    `${x(PAVES[1])},${y(altAt(PAVES[1]))}`,
    `${x(PAVES[1])},${BASE}`,
  ].join(' ');
  // Les derniers kilomètres, sous la courbe : la zone s'allume quand le coureur y entre.
  const finalArea = [
    `${finalX},${BASE}`,
    `${finalX},${y(altAt(FINAL))}`,
    ...PROFILE.filter(([yr]) => yr > FINAL).map(([yr, a]) => `${x(yr)},${y(a)}`),
    `${right},${BASE}`,
  ].join(' ');
  return { w, right, finalX, x, yAt, slopeAt, line, area, paves, finalArea };
}

// Le coureur : un vélo de profil, maillot jaune. L'origine est au sol, entre les deux roues.
// tilt reçoit l'inclinaison ; le groupe intérieur se retourne quand il roule en arrière.
// Quand il va vite (--speed, de 0 à 1), des traits de vitesse filent derrière lui. À
// l'arrivée (data-finish), il lâche le guidon et lève les bras.
export function Cyclist({ tilt }: { tilt?: Ref<SVGGElement> }) {
  return (
    <g ref={tilt}>
      <g className={styles.cyclist}>
        <path d="M-27 -8h9M-31 -13.5h11M-28 -19h8" className={styles.speed} />
        {[-9, 9].map((cx) => (
          <g key={cx}>
            <circle cx={cx} cy={-5.5} r={5.5} className={styles.wheel} />
            <path d={`M${cx - 5.5} -5.5h11M${cx} -11v11`} className={styles.spokes} />
          </g>
        ))}
        <path d="M-9 -5.5L-1 -5.5L-4 -14ZM-4 -14L6 -14L-1 -5.5M6 -14L9 -5.5M6 -14L8 -16.5M-4 -16L2 -11L-1 -5.5" className={styles.frame} />
        <path d="M-4 -16L5 -21.5" className={styles.jersey} />
        <path d="M5 -21.5L8 -16.5" className={`${styles.frame} ${styles.armsDown}`} />
        <path d="M5 -21.5L8.5 -27L10.5 -32.5M4 -21L3.5 -27.5L5 -33" className={`${styles.frame} ${styles.armsUp}`} />
        <circle cx={7.6} cy={-24.2} r={2.6} className={styles.head} />
      </g>
    </g>
  );
}

// Le logo d'une étiquette, en icône carrée à partir de left.
function Icon({ logo, left, base }: { logo: Logo; left: number; base: number }) {
  return (
    <image
      href={logo.src}
      x={left}
      y={base - 19}
      width={CHIP}
      height={CHIP}
      preserveAspectRatio="xMidYMid meet"
      clipPath="url(#chip)"
    />
  );
}

export default function Profile({ selected, onSelect }: { selected: number | null; onSelect: (i: number) => void }) {
  const { stages, t } = useLang();
  const rider = useRef<SVGGElement>(null);
  const tilt = useRef<SVGGElement>(null);
  const ridden = useRef<SVGRectElement>(null);
  const at = useRef<number | null>(null); // position actuelle du coureur, nulle avant le départ
  const figure = useRef<HTMLElement>(null);
  const [w, setW] = useState(1440);
  const geo = useMemo(() => geometry(w), [w]);
  const drawn = useRef(geo);

  // Sur ordinateur, le dessin s'élargit vers sa place, à hauteur fixe.
  useEffect(() => {
    const wide = window.matchMedia('(min-width: 1100px)');
    const ro = new ResizeObserver(([e]) => {
      const { width, height } = e.contentRect;
      // À mi-chemin entre la largeur fixe d'origine (1440) et toute la place disponible.
      if (wide.matches && width && height) setW(Math.round(Math.min(1800, Math.max(1440, (1440 + (width / height) * H) / 2))));
      else setW(1440);
    });
    ro.observe(figure.current!);
    return () => ro.disconnect();
  }, []);

  // Le coureur attend au départ. Il roule jusqu'à l'étape choisie, et y revient quand on
  // referme ; la route parcourue passe en couleur.
  useEffect(() => {
    const g = rider.current!;
    // Le dessin a changé de largeur : le coureur se repose à sa place, sans rouler.
    const resized = drawn.current !== geo;
    drawn.current = geo;
    if (resized) at.current = null;
    const target = selected === null ? LEFT : geo.x(STAGES[selected].year);
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const place = (px: number) => {
      if (at.current !== null && px !== at.current) g.toggleAttribute('data-back', px < at.current);
      g.style.setProperty('--speed', at.current === null ? '0' : Math.min(1, Math.abs(px - at.current) / 9).toFixed(2));
      at.current = px;
      ridden.current?.setAttribute('width', String(px - LEFT));
      g.setAttribute('transform', `translate(${px} ${geo.yAt(px)})`);
      tilt.current?.setAttribute('transform', `rotate(${geo.slopeAt(px).toFixed(1)})`);
    };
    // Les roues tournent tant que step renvoie vrai ; à l'arrêt, il refait face à la course.
    let frame = 0;
    const halt = () => {
      g.removeAttribute('data-moving');
      g.removeAttribute('data-back');
      g.style.setProperty('--speed', '0');
    };
    const roll = (step: (now: number) => boolean) => {
      g.setAttribute('data-moving', '');
      const loop = (now: number) => {
        if (step(now)) frame = requestAnimationFrame(loop);
        else halt();
      };
      frame = requestAnimationFrame(loop);
    };
    const stop = () => {
      cancelAnimationFrame(frame);
      halt();
    };

    const from = at.current ?? target;
    if (reduce || resized || from === target) {
      place(target);
      return;
    }
    const duration = Math.min(1100, 450 + Math.abs(target - from) * 0.9);
    const t0 = performance.now();
    roll((now) => {
      const t = Math.min(1, (now - t0) / duration);
      place(from + (target - from) * easeInOut(t));
      return t < 1;
    });
    return stop;
  }, [selected, geo]);

  const inFinal = selected !== null && STAGES[selected].year > FINAL;

  return (
    <figure ref={figure} className={`${styles.profile} ${inFinal ? styles.inFinal : ''}`}>
      <svg viewBox={`0 0 ${geo.w} ${H}`} preserveAspectRatio="xMidYMax meet" role="group" aria-label={t.profile}>
        <defs>
          <pattern id="paves" width="16" height="16" patternUnits="userSpaceOnUse">
            <rect x="1" y="1" width="14" height="6" rx="2" className={styles.cobble} />
            <rect x="-7" y="9" width="14" height="6" rx="2" className={styles.cobble} />
            <rect x="9" y="9" width="14" height="6" rx="2" className={styles.cobble} />
          </pattern>
          <pattern id="damier" width="8" height="8" patternUnits="userSpaceOnUse">
            <rect width="8" height="8" className={styles.checkLight} />
            <rect width="4" height="4" className={styles.checkDark} />
            <rect x="4" y="4" width="4" height="4" className={styles.checkDark} />
          </pattern>
          <clipPath id="chip" clipPathUnits="objectBoundingBox">
            <rect width="1" height="1" rx="0.2" />
          </clipPath>
          <clipPath id="ridden">
            <rect ref={ridden} x={LEFT} y="0" width={geo.right - LEFT} height={H} />
          </clipPath>
        </defs>

        {/* La route : elle se dévoile de gauche à droite au chargement. */}
        <g className={styles.road}>
          <polygon points={geo.area} className={styles.area} />
          <polygon points={geo.finalArea} className={styles.finalZone} />
          <polygon points={geo.paves} fill="url(#paves)" />
          <polyline points={geo.line} className={styles.line} />
          <polyline points={geo.line} className={styles.ride} clipPath="url(#ridden)" />
        </g>

        {/* Flamme rouge : la suite du profil est à plus grande échelle. */}
        <g className={styles.finalMark}>
          <line x1={geo.finalX} y1={172} x2={geo.finalX} y2={BASE} />
          <path d={`M${geo.finalX} 172 L${geo.finalX + 18} 179 L${geo.finalX} 186 Z`} className={styles.flame} />
        </g>

        {/* La ligne d'arrivée : un drapeau à damier, planté quand la route est tracée. */}
        <g className={styles.finish}>
          <line x1={geo.right} y1={120} x2={geo.right} y2={BASE} />
          <rect x={geo.right} y={120} width={24} height={16} fill="url(#damier)" className={styles.checkFlag} />
        </g>

        {/* Les points de passage : un trait monte du profil jusqu'au nom, comme un fanion. */}
        {STAGES.map((s, i) => {
          const words = stages[i];
          const px = geo.x(s.year);
          const py = y(altAt(s.year));
          const base = ROWS[s.row];
          const gap = s.icon ? CHIP + 6 : 0;
          const textW = words.name.length * 10.6;
          const start = s.anchor === 'start';
          const labelLeft = start ? px + 8 : px - 8 - gap - textW;
          const on = i === selected;
          return (
            <g
              key={s.name}
              className={`${styles.marker} ${on ? styles.on : ''}`}
              style={{ '--delay': `${0.35 + ((px - LEFT) / (geo.right - LEFT)) * 1.4}s` } as CSSProperties}
              role="button"
              tabIndex={0}
              aria-pressed={on}
              aria-label={t.marker(words.when, words.kind, words.name)}
              onClick={() => onSelect(i)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  onSelect(i);
                }
              }}
            >
              <rect x={px - 12} y={base - 20} width="24" height={py - base + 32} className={styles.hit} />
              <line x1={px} y1={py - 8} x2={px} y2={base - 20} className={styles.leader} />
              <circle cx={px} cy={py} r="5" className={styles.point} />
              <g className={styles.label}>
                <rect x={labelLeft - 6} y={base - 26} width={gap + textW + 12} height="34" className={styles.hit} />
                {s.icon && <Icon logo={s.icon} left={start ? px + 8 : px - 8 - CHIP} base={base} />}
                <text x={start ? px + 8 + gap : px - 8 - gap} y={base} textAnchor={start ? 'start' : 'end'} className={styles.stageName}>
                  {words.name}
                </text>
              </g>
            </g>
          );
        })}

        {/* Le coureur, au départ ou sur l'étape choisie. */}
        <g ref={rider} className={styles.rider} transform={`translate(${geo.right} ${y(100)})`} aria-hidden="true">
          <g className={styles.riderSize}>
            <Cyclist tilt={tilt} />
          </g>
        </g>

        {/* L'axe des années, comme les kilomètres d'un profil, puis les derniers kilomètres. */}
        <line x1={LEFT} y1={BASE} x2={geo.right} y2={BASE} className={styles.axis} />
        {YEARS.map((yr) => (
          <g key={yr}>
            <line x1={geo.x(yr)} y1={BASE} x2={geo.x(yr)} y2={BASE + 8} className={styles.axis} />
            <text x={geo.x(yr)} y={BASE + 28} textAnchor="middle" className={styles.yearText}>{yr}</text>
          </g>
        ))}
        <line x1={geo.x(2026)} y1={BASE} x2={geo.x(2026)} y2={BASE + 8} className={styles.axis} />
        <text x={(geo.finalX + geo.right) / 2} y={BASE + 28} textAnchor="middle" className={styles.finalText}>
          {t.lastKm}
        </text>
      </svg>
    </figure>
  );
}
