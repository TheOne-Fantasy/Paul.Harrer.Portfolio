'use client';
import { useEffect, useRef, useState, type RefObject } from 'react';
import styles from './chemin.module.css';

type Pt = { x: number; y: number };

// Les points de passage de la route, dans le repère du parcours, lus sur la page elle-même :
// dans l'allée entre les deux colonnes de chaque bloc marqué « allee » (le texte et les
// photos d'une étape, le texte et les reels de la voiture suiveuse), à droite du titre des
// derniers kilomètres (« titre »), puis tout droit jusqu'à la ligne d'arrivée (« arrivee »).
function waypoints(course: HTMLElement): Pt[] {
  const box = course.getBoundingClientRect();
  const rel = (el: Element) => {
    const r = el.getBoundingClientRect();
    return { left: r.left - box.left, right: r.right - box.left, top: r.top - box.top, bottom: r.bottom - box.top };
  };
  const pts: Pt[] = [];
  let x = box.width / 2;
  course.querySelectorAll<HTMLElement>('[data-road]').forEach((el) => {
    const kind = el.dataset.road;
    if (kind === 'allee' && el.children.length >= 2) {
      const [a, b] = [el.children[0], el.children[1]].map(rel).sort((p, q) => p.left - q.left);
      x = (a.right + b.left) / 2;
      pts.push({ x, y: Math.min(a.top, b.top) }, { x, y: Math.max(a.bottom, b.bottom) });
    } else if (kind === 'titre' && el.lastElementChild) {
      const r = rel(el);
      x = (rel(el.lastElementChild).right + box.width) / 2;
      pts.push({ x, y: r.top }, { x, y: r.bottom });
    } else if (kind === 'arrivee') {
      pts.push({ x, y: rel(el).bottom + 40 });
    }
  });
  if (pts.length) pts.unshift({ x: pts[0].x, y: 0 });
  return pts;
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
// jambes qui pédalent quand il roule (data-moving).
function TopRider() {
  return (
    <g className={styles.topRider}>
      <rect x="-2" y="-22" width="4" height="13" rx="2" className={styles.topWheel} />
      <rect x="-2" y="9" width="4" height="13" rx="2" className={styles.topWheel} />
      <path d="M0 -10V10" className={styles.topFrame} />
      <path d="M-8 -12.5H8" className={styles.topFrame} />
      <ellipse cx="-3.6" cy="6.5" rx="2.6" ry="4.6" className={`${styles.topLeg} ${styles.topLegL}`} />
      <ellipse cx="3.6" cy="6.5" rx="2.6" ry="4.6" className={`${styles.topLeg} ${styles.topLegR}`} />
      <path d="M-6 -3L-7 -12M6 -3L7 -12" className={styles.topArm} />
      <ellipse cx="0" cy="-1" rx="7.5" ry="6.5" className={styles.topJersey} />
      <ellipse cx="0" cy="-7.5" rx="4" ry="4.6" className={styles.topHelmet} />
    </g>
  );
}

// La route vue du dessus, sous le contenu du parcours, avec le coureur qui la descend au
// défilement : il est là où la route croise le milieu de l'écran, et la ligne jaune marque
// ce qu'il a déjà roulé. Sur tablette et téléphone, les deux colonnes ne laissent pas
// d'allée : la route n'est pas tracée.
export default function Route({ course }: { course: RefObject<HTMLDivElement | null> }) {
  const [geo, setGeo] = useState<{ d: string; w: number; h: number; start: Pt } | null>(null);
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
      const pts = wide.matches ? waypoints(el) : [];
      setGeo(pts.length > 2 ? { d: pathOf(pts), w: el.clientWidth, h: el.clientHeight, start: pts[0] } : null);
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

    let frame = 0;
    let prev: number | null = null;
    let still = 0;
    const update = () => {
      frame = 0;
      const l = lengthAt(window.innerHeight * 0.55 - el.getBoundingClientRect().top);
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
  return (
    <svg className={styles.road2d} width={geo.w} height={geo.h} viewBox={`0 0 ${geo.w} ${geo.h}`} aria-hidden="true">
      <path d={geo.d} className={styles.roadEdge} />
      <path d={geo.d} className={styles.roadTar} />
      <path ref={line} d={geo.d} className={styles.roadDash} />
      <path ref={trail} d={geo.d} className={styles.roadTrail} />
      {/* La ligne de départ, peinte en travers de la route. */}
      <rect x={geo.start.x - 26} y={geo.start.y + 6} width="52" height="6" className={styles.roadStart} />
      <g ref={rider}>
        <g transform="scale(1.5)">
          <TopRider />
        </g>
      </g>
    </svg>
  );
}
