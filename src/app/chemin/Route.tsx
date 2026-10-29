'use client';
import { useEffect, useRef, useState, type CSSProperties, type RefObject } from 'react';
import { useLang } from './Lang';
import styles from './chemin.module.css';

type Pt = { x: number; y: number };

// La ligne d'arrivée tombe aux trois quarts du bloc « arrivee » ; la route finit en bas du bloc.
const FINISH_AT = 0.72;

// Les points de passage de la route, dans le repère du parcours, lus sur la page elle-même.
// Sur ordinateur (wide), elle descend dans l'allée entre les deux colonnes de chaque bloc
// marqué « allee » (le texte et les photos d'une étape, le texte et les reels de la voiture
// suiveuse), passe à droite du titre des derniers kilomètres (« titre »), puis tout droit
// jusqu'à l'arrivée. Sur tablette et téléphone, ou sans étapes (la page de la voiture
// suiveuse), il ne reste que la dernière ligne droite, au milieu, dans le bloc « arrivee ».
function waypoints(course: HTMLElement, wide: boolean) {
  const box = course.getBoundingClientRect();
  const rel = (el: Element) => {
    const r = el.getBoundingClientRect();
    return { left: r.left - box.left, right: r.right - box.left, top: r.top - box.top, bottom: r.bottom - box.top };
  };
  const pts: Pt[] = [];
  let finish: Pt | null = null;
  let x = box.width / 2;
  for (const el of course.querySelectorAll<HTMLElement>('[data-road]')) {
    const kind = el.dataset.road;
    if (wide && kind === 'allee' && el.children.length >= 2) {
      const [a, b] = [el.children[0], el.children[1]].map(rel).sort((p, q) => p.left - q.left);
      x = (a.right + b.left) / 2;
      pts.push({ x, y: Math.min(a.top, b.top) }, { x, y: Math.max(a.bottom, b.bottom) });
    } else if (wide && kind === 'titre' && el.lastElementChild) {
      const r = rel(el);
      x = (rel(el.lastElementChild).right + box.width) / 2;
      pts.push({ x, y: r.top }, { x, y: r.bottom });
    } else if (kind === 'arrivee') {
      const r = rel(el);
      if (!pts.length) pts.push({ x, y: r.top });
      finish = { x, y: r.top + (r.bottom - r.top) * FINISH_AT };
      pts.push({ x, y: r.bottom });
    }
  }
  if (!finish || pts.length < 2) return null;
  // La route complète part du haut du parcours, sous le premier écran, avec sa ligne de départ.
  const full = pts.length > 2;
  if (full) pts.unshift({ x: pts[0].x, y: 0 });
  return { pts, finish, full };
}

// D'un point au suivant, une courbe qui part et arrive à la verticale : la route descend
// droit le long d'une étape et prend ses virages entre deux étapes.
function pathOf(pts: Pt[]) {
  let d = `M${pts[0].x.toFixed(1)} ${pts[0].y.toFixed(1)}`;
  for (let i = 1; i < pts.length; i++) {
    const a = pts[i - 1];
    const b = pts[i];
    const h = (b.y - a.y) / 2;
    d += ` C${a.x.toFixed(1)} ${(a.y + h).toFixed(1)} ${b.x.toFixed(1)} ${(b.y - h).toFixed(1)} ${b.x.toFixed(1)} ${b.y.toFixed(1)}`;
  }
  return d;
}

// Le coureur vu du dessus, roues vers le haut de son repère : maillot jaune, casque blanc,
// jambes qui pédalent quand il roule (data-moving). La ligne passée (data-finish), il lâche
// le guidon et lève les bras en V.
function TopRider() {
  return (
    <g className={styles.topRider}>
      <rect x="-2" y="-22" width="4" height="13" rx="2" className={styles.topWheel} />
      <rect x="-2" y="9" width="4" height="13" rx="2" className={styles.topWheel} />
      <path d="M0 -10V10" className={styles.topFrame} />
      <path d="M-8 -12.5H8" className={styles.topFrame} />
      <ellipse cx="-3.6" cy="6.5" rx="2.6" ry="4.6" className={`${styles.topLeg} ${styles.topLegL}`} />
      <ellipse cx="3.6" cy="6.5" rx="2.6" ry="4.6" className={`${styles.topLeg} ${styles.topLegR}`} />
      <path d="M-6 -3L-7 -12M6 -3L7 -12" className={`${styles.topArm} ${styles.topArmsDown}`} />
      <path d="M-6 -4L-13 -15M6 -4L13 -15" className={`${styles.topArm} ${styles.topArmsUp}`} />
      <ellipse cx="0" cy="-1" rx="7.5" ry="6.5" className={styles.topJersey} />
      <ellipse cx="0" cy="-7.5" rx="4" ry="4.6" className={styles.topHelmet} />
    </g>
  );
}

// Les feux d'artifice de l'arrivée : quatre gerbes autour de la ligne (décalage depuis la
// ligne, retard en millisecondes, couleur), chacune de dix rayons.
const BURSTS: [number, number, number, string][] = [
  [-120, -95, 0, 'var(--accent)'],
  [130, -60, 160, 'var(--ink)'],
  [-70, -165, 320, '#e5392f'],
  [95, -150, 480, 'var(--accent)'],
];
const RAYS = Array.from({ length: 10 }, (_, k) => {
  const a = (k * Math.PI) / 5;
  return { x1: Math.cos(a) * 7, y1: Math.sin(a) * 7, x2: Math.cos(a) * 24, y2: Math.sin(a) * 24 };
});

// La route vue du dessus, sous le contenu du parcours, avec le coureur qui la descend au
// défilement : il est là où la route croise le milieu de l'écran, et la ligne jaune marque
// ce qu'il a déjà roulé. Au bout, une arrivée d'étape : l'arche, la ligne à damier peinte
// sur la chaussée et les barrières. En bas de page, il passe la ligne et lève les bras sous
// les feux d'artifice.
export default function Route({ course }: { course: RefObject<HTMLDivElement | null> }) {
  const { t } = useLang();
  const [geo, setGeo] = useState<{ d: string; w: number; h: number; start: Pt; finish: Pt; end: Pt; full: boolean } | null>(null);
  const root = useRef<SVGSVGElement>(null);
  const line = useRef<SVGPathElement>(null);
  const trail = useRef<SVGPathElement>(null);
  const rider = useRef<SVGGElement>(null);

  // Le tracé, refait chaque fois que le parcours change de taille.
  useEffect(() => {
    const el = course.current!;
    const wide = window.matchMedia('(min-width: 1100px)');
    let frame = 0;
    const measure = () => {
      frame = 0;
      const r = waypoints(el, wide.matches);
      setGeo(
        r && {
          d: pathOf(r.pts),
          w: el.clientWidth,
          h: el.clientHeight,
          start: r.pts[0],
          finish: r.finish,
          end: r.pts[r.pts.length - 1],
          full: r.full,
        },
      );
    };
    const ro = new ResizeObserver(() => {
      if (!frame) frame = requestAnimationFrame(measure);
    });
    ro.observe(el);
    return () => {
      ro.disconnect();
      cancelAnimationFrame(frame);
    };
  }, [course]);

  // Le coureur suit le défilement.
  useEffect(() => {
    if (!geo) return;
    const el = course.current!;
    const svg = root.current!;
    const p = line.current!;
    const g = rider.current!;
    const total = p.getTotalLength();
    const samples: { l: number; y: number }[] = [];
    for (let l = 0; l < total; l += 6) samples.push({ l, y: p.getPointAtLength(l).y });
    samples.push({ l: total, y: p.getPointAtLength(total).y });

    // La longueur de route où elle croise une hauteur donnée (la route ne remonte jamais).
    const lengthAt = (y: number) => {
      if (y <= samples[0].y) return 0;
      if (y >= samples[samples.length - 1].y) return total;
      let lo = 0;
      let hi = samples.length - 1;
      while (hi - lo > 1) {
        const mid = (lo + hi) >> 1;
        if (samples[mid].y < y) lo = mid;
        else hi = mid;
      }
      const a = samples[lo];
      const b = samples[hi];
      return a.l + ((y - a.y) / (b.y - a.y || 1)) * (b.l - a.l);
    };
    const finishL = lengthAt(geo.finish.y);

    let frame = 0;
    let prev: number | null = null;
    let still = 0;
    const update = () => {
      frame = 0;
      const vh = window.innerHeight;
      const at = window.scrollY;
      const max = document.documentElement.scrollHeight - vh;
      let y = vh * 0.55 - el.getBoundingClientRect().top;
      // Le milieu de l'écran n'atteint pas toujours le bout de la route en bas de page : sur
      // le dernier écran de défilement, le coureur rattrape la différence, pour passer la
      // ligne et finir au bout de la route quand la page est tout en bas.
      const short = geo.end.y - (y + max - at);
      if (short > 0) y += short * Math.max(0, Math.min(1, (at - (max - vh)) / vh));
      const l = lengthAt(y);
      const pt = p.getPointAtLength(l);
      const a = p.getPointAtLength(Math.max(0, l - 3));
      const b = p.getPointAtLength(Math.min(total, l + 3));
      // Il regarde vers le bas de la route, ou vers le haut quand on remonte.
      if (prev !== null && l !== prev) {
        g.toggleAttribute('data-back', l < prev);
        g.setAttribute('data-moving', '');
        clearTimeout(still);
        still = window.setTimeout(() => {
          g.removeAttribute('data-moving');
          g.removeAttribute('data-back');
        }, 180);
      }
      // La ligne passée : les bras levés, et les feux d'artifice partent (une fois par passage).
      const won = l >= finishL - 1;
      g.toggleAttribute('data-finish', won);
      svg.toggleAttribute('data-won', won);
      const back = g.hasAttribute('data-back');
      const heading = (Math.atan2(b.y - a.y, b.x - a.x) * 180) / Math.PI + 90 + (back ? 180 : 0);
      g.setAttribute('transform', `translate(${pt.x.toFixed(1)} ${pt.y.toFixed(1)}) rotate(${heading.toFixed(1)})`);
      trail.current!.style.strokeDasharray = `${l.toFixed(1)} ${total.toFixed(1)}`;
      prev = l;
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
  }, [geo, course]);

  if (!geo) return null;
  const { finish: f, end } = geo;
  const span = end.y - geo.start.y;
  return (
    <svg ref={root} className={styles.road2d} width={geo.w} height={geo.h} viewBox={`0 0 ${geo.w} ${geo.h}`} aria-hidden="true">
      <defs>
        <pattern id="damierRoute" width="8" height="8" patternUnits="userSpaceOnUse">
          <rect width="8" height="8" className={styles.checkLight} />
          <rect width="4" height="4" className={styles.checkDark} />
          <rect x="4" y="4" width="4" height="4" className={styles.checkDark} />
        </pattern>
        {/* La route s'efface au bout, et apparaît en fondu quand il n'en reste que la dernière
            ligne droite. */}
        <linearGradient id="routeFondu" gradientUnits="userSpaceOnUse" x1="0" y1={geo.start.y} x2="0" y2={end.y}>
          <stop offset="0" stopColor="#ffffff" stopOpacity={geo.full ? 1 : 0} />
          <stop offset={Math.min(0.4, 90 / span)} stopColor="#ffffff" />
          <stop offset={Math.max(0.6, 1 - 70 / span)} stopColor="#ffffff" />
          <stop offset="1" stopColor="#ffffff" stopOpacity="0" />
        </linearGradient>
        <mask id="routeMasque" maskUnits="userSpaceOnUse" x="0" y="0" width={geo.w} height={geo.h}>
          <rect width={geo.w} height={geo.h} fill="url(#routeFondu)" />
        </mask>
      </defs>
      <g mask="url(#routeMasque)">
        <path d={geo.d} className={styles.roadEdge} />
        <path d={geo.d} className={styles.roadTar} />
        <path ref={line} d={geo.d} className={styles.roadDash} />
        <path ref={trail} d={geo.d} className={styles.roadTrail} />
        <path d={`M${f.x - 46} ${f.y - 220}V${end.y}M${f.x + 46} ${f.y - 220}V${end.y}`} className={styles.barrier} />
      </g>
      {/* La ligne de départ, peinte en travers de la route. */}
      {geo.full && <rect x={geo.start.x - 26} y={geo.start.y + 6} width="52" height="6" className={styles.roadStart} />}
      {/* L'arrivée : les barrières de la dernière ligne droite (plus haut), la ligne à damier
          peinte sur la chaussée, et l'arche juste avant, vue du dessus, avec ses deux pieds. */}
      <rect x={f.x - 26} y={f.y - 6} width="52" height="12" fill="url(#damierRoute)" />
      <rect x={f.x - 84} y={f.y - 40} width="168" height="22" rx="4" className={styles.gantryBeam} />
      <rect x={f.x - 92} y={f.y - 37} width="10" height="16" rx="2" className={styles.gantryFoot} />
      <rect x={f.x + 82} y={f.y - 37} width="10" height="16" rx="2" className={styles.gantryFoot} />
      <text x={f.x} y={f.y - 25} className={styles.gantryText}>{t.arrival}</text>
      {BURSTS.map(([dx, dy, delay, color]) => (
        <g key={`${dx}${dy}`} transform={`translate(${f.x + dx} ${f.y + dy})`}>
          <g className={styles.firework} style={{ '--d': `${delay}ms`, stroke: color } as CSSProperties}>
            {RAYS.map((r, k) => (
              <line key={k} {...r} />
            ))}
          </g>
        </g>
      ))}
      <g ref={rider}>
        <g transform="scale(1.5)">
          <TopRider />
        </g>
      </g>
    </svg>
  );
}
