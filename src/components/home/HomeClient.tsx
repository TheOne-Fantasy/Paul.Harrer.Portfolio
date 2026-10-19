'use client';
import { useEffect, useRef } from 'react';
import Image from 'next/image';
import Navbar from '@/components/Navbar';
import useReveal from '@/components/useReveal';
import { useLanguage } from '@/context/LanguageContext';
import { ABOUT, ANTENNE, CONTACT, CREATION, FIRST_TEAM, FOOTER, LINKS, PROJETS, STATS } from '@/content/home';
import Hero from './Hero';
import Parcours from './Parcours';
import Terrain from './Terrain';
import styles from './home.module.css';

const i = (n: number) => ({ '--i': n }) as React.CSSProperties;

// Le rang de visuels se fait glisser à la souris ; au doigt et au trackpad, le
// défilement natif suffit.
function useDragScroll() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let startX = 0;
    let startLeft = 0;
    let down = false;
    const onDown = (e: PointerEvent) => {
      if (e.pointerType !== 'mouse') return;
      down = true;
      startX = e.clientX;
      startLeft = el.scrollLeft;
      el.classList.add(styles.dragging);
    };
    const onMove = (e: PointerEvent) => {
      if (!down) return;
      el.scrollLeft = startLeft - (e.clientX - startX);
    };
    const onUp = () => {
      down = false;
      el.classList.remove(styles.dragging);
    };
    el.addEventListener('pointerdown', onDown);
    window.addEventListener('pointermove', onMove);
    window.addEventListener('pointerup', onUp);
    return () => {
      el.removeEventListener('pointerdown', onDown);
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('pointerup', onUp);
    };
  }, []);
  return ref;
}

export default function HomeClient() {
  const { lang } = useLanguage();
  const rowRef = useDragScroll();
  useReveal();

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  const [user, domain] = LINKS.email.split('@');

  return (
    <main className={styles.main}>
      <Navbar home />
      <Hero />

      {/* Le chiffre posé sur la photo, comme un titre de film sur son plan. */}
      <section className={styles.stats} aria-labelledby="stats-title">
        <h2 className={styles.statsHeading} id="stats-title">
          {STATS.heading[lang]}
        </h2>
        <div className={styles.statsPhoto}>
          <Image
            src={STATS.photo.src}
            alt={STATS.photo.alt[lang]}
            fill
            sizes="100vw"
            className={styles.drift}
            style={{ objectFit: 'cover', objectPosition: '50% 40%' }}
          />
          <p className={styles.figure} data-reveal>
            <span>{STATS.figure[lang]}</span> <span className={styles.unit}>{STATS.unit[lang]}</span>
          </p>
          <p className={styles.figureNote} data-reveal style={i(1)}>
            {STATS.sentence[lang]}
          </p>
        </div>
        <dl className={styles.more}>
          {STATS.more.map((m, n) => (
            <div key={m.value.fr} data-reveal style={i(n)}>
              <dt>{m.value[lang]}</dt>
              <dd>{m.label[lang]}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section className={styles.firstTeam} id="first-team" aria-labelledby="ft-title">
        <h2 className={styles.head} id="ft-title" data-reveal>
          {FIRST_TEAM.heading[lang]}
        </h2>
        <p className={styles.ftLead} data-reveal style={i(1)}>
          {FIRST_TEAM.lead[lang]}
        </p>
        <div className={styles.ftTiles}>
          <div className={styles.ftPhoto} data-reveal style={i(2)}>
            <Image
              src={FIRST_TEAM.photo.src}
              alt={FIRST_TEAM.photo.alt[lang]}
              fill
              sizes="(max-width: 860px) 100vw, 58vw"
              style={{ objectFit: 'cover' }}
            />
          </div>
          <dl className={styles.ftRoles} data-reveal style={i(3)}>
            {FIRST_TEAM.roles.map((r) => (
              <div key={r.name.fr}>
                <dt>{r.name[lang]}</dt>
                <dd>{r.text[lang]}</dd>
              </div>
            ))}
          </dl>
        </div>
        <div className={styles.launched}>
          <h3 className={styles.showsHeading} data-reveal>
            {FIRST_TEAM.launched.heading[lang]}
          </h3>
          <p data-reveal style={i(1)}>{FIRST_TEAM.launched.text[lang]}</p>
          <ul className={styles.launchedNames} data-reveal style={i(2)}>
            {FIRST_TEAM.launched.names.map((n) => (
              <li key={n}>{n}</li>
            ))}
          </ul>
        </div>
        <h3 className={styles.showsHeading} data-reveal>
          {FIRST_TEAM.showsHeading[lang]}
        </h3>
        <ul className={styles.shows}>
          {FIRST_TEAM.shows.map((s, n) => (
            <li key={s.id} data-reveal style={i(n)}>
              <a href={LINKS.youtube(s.id)} target="_blank" rel="noopener noreferrer">
                <span className={styles.showThumb}>
                  <Image src={s.img} alt="" fill sizes="(max-width: 760px) 92vw, 31vw" style={{ objectFit: 'cover' }} />
                </span>
                <span className={styles.showTitle}>{s.title[lang]}</span>
              </a>
            </li>
          ))}
        </ul>
      </section>

      <Parcours />
      <Terrain />

      <section className={styles.antenne} id="antenne" aria-labelledby="antenne-title">
        <h2 className={styles.head} id="antenne-title" data-reveal>
          {ANTENNE.heading[lang]}
        </h2>
        <div className={styles.antenneFrame}>
          <div className={styles.antennePhoto}>
            <Image
              src={ANTENNE.photo.src}
              alt={ANTENNE.photo.alt[lang]}
              fill
              sizes="100vw"
              style={{ objectFit: 'cover', objectPosition: '50% 55%' }}
            />
            <p className={styles.photoThird}>
              <span className={styles.ptTitle}>{ANTENNE.photo.title}</span>
              <span className={styles.ptDetail}>{ANTENNE.photo.detail[lang]}</span>
            </p>
          </div>
          <div className={styles.cards}>
            {ANTENNE.cards.map((c, n) => (
              <article key={c.name} className={styles.card} data-reveal style={i(n)}>
                <h3 className={styles.cardName}>{c.name}</h3>
                <p className={styles.cardRole}>{c.role[lang]}</p>
                <p className={styles.cardFact}>{c.fact[lang]}</p>
                {c.href && c.action && (
                  <a className={styles.cardAction} href={c.href} target="_blank" rel="noopener noreferrer">
                    {c.action[lang]}
                  </a>
                )}
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.creation} id="creation" aria-labelledby="creation-title">
        <h2 className={`${styles.head} ${styles.creationHead}`} id="creation-title" data-reveal>
          {CREATION.heading[lang]}
        </h2>
        <div className={styles.row} ref={rowRef}>
          {CREATION.images.map((img) =>
            'poster' in img ? (
              <div key={img.src} className={`${styles.rowItem} ${styles.rowVideo}`}>
                <video src={img.src} poster={img.poster} muted loop autoPlay playsInline aria-label={img.alt[lang]} />
              </div>
            ) : (
              <div key={img.src} className={styles.rowItem}>
                <Image src={img.src} alt={img.alt[lang]} fill loading="eager" sizes="(max-width: 760px) 72vw, 44svh" draggable={false} style={{ objectFit: 'cover' }} />
              </div>
            )
          )}
        </div>
        <div className={styles.creationFoot}>
          <p data-reveal>{CREATION.text[lang]}</p>
          <a href="/work" className={styles.textLink} data-reveal style={i(1)}>
            {CREATION.link[lang]}
          </a>
        </div>
      </section>

      <section className={styles.projets} id="projets" aria-labelledby="projets-title">
        <h2 className={styles.head} id="projets-title" data-reveal>
          {PROJETS.heading[lang]}
        </h2>
        {PROJETS.items.map((p) => (
          <article key={p.name} className={styles.project}>
            <a className={styles.projectShot} href={p.href} target="_blank" rel="noopener noreferrer" data-reveal>
              <Image src={p.img} alt={p.alt[lang]} fill sizes="(max-width: 860px) 100vw, 62vw" style={{ objectFit: 'cover', objectPosition: 'top' }} />
            </a>
            <div className={styles.projectText}>
              <h3 data-reveal>{p.name}</h3>
              <p data-reveal style={i(1)}>{p.text[lang]}</p>
              {p.facts.length > 0 && (
                <dl className={styles.facts} data-reveal style={i(2)}>
                  {p.facts.map((f) => (
                    <div key={f.label.fr}>
                      <dt>{f.value[lang]}</dt>
                      <dd>{f.label[lang]}</dd>
                    </div>
                  ))}
                </dl>
              )}
              <a className={styles.textLink} href={p.href} target="_blank" rel="noopener noreferrer" data-reveal style={i(3)}>
                {p.linkLabel}
              </a>
            </div>
          </article>
        ))}
        <p className={styles.tools} data-reveal>
          {PROJETS.tools[lang]}
        </p>

        <div className={styles.ledger} id="missions">
          <h3 data-reveal>{PROJETS.missionsHeading[lang]}</h3>
          <ul>
            {PROJETS.missions.map((m, n) => (
              <li key={m.name} data-reveal style={i(n)}>
                <span className={styles.ledgerName}>{m.name}</span>
                <span className={styles.ledgerText}>{m.text[lang]}</span>
                <span className={styles.ledgerYears}>{m.years[lang]}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className={styles.about} id="a-propos" aria-labelledby="about-title">
        <div className={styles.aboutSide}>
          <h2 className={styles.head} id="about-title" data-reveal>
            {ABOUT.heading[lang]}
          </h2>
          <div className={styles.aboutPhoto} data-reveal style={i(1)}>
            <Image src={ABOUT.photo.src} alt={ABOUT.photo.alt[lang]} fill sizes="(max-width: 860px) 60vw, 26vw" style={{ objectFit: 'cover' }} />
          </div>
          <dl className={styles.aboutFacts}>
            {ABOUT.facts.map((f, n) => (
              <div key={f.label.fr} data-reveal style={i(n + 2)}>
                <dt>{f.label[lang]}</dt>
                <dd>{f.value[lang]}</dd>
              </div>
            ))}
          </dl>
        </div>
        <div className={styles.aboutMain}>
          <p className={styles.aboutText} data-reveal>
            {ABOUT.text[lang]}
          </p>
          <a className={styles.button} href={LINKS.cv} target="_blank" rel="noopener" data-reveal style={i(1)}>
            {ABOUT.cv[lang]}
          </a>
        </div>
      </section>

      <section className={styles.contact} id="contact" aria-labelledby="contact-title">
        <div className={styles.contactTop}>
          <h2 id="contact-title">{CONTACT.sentence[lang]}</h2>
        </div>
        <a className={styles.email} href={`mailto:${LINKS.email}`}>
          {user}
          <wbr />@{domain}
        </a>
        <div className={styles.contactFoot}>
          <span>{CONTACT.place[lang]}</span>
          <span className={styles.socials}>
            <a href={LINKS.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn</a>
            <a href={LINKS.instagram} target="_blank" rel="noopener noreferrer">Instagram</a>
            <a href={LINKS.x} target="_blank" rel="noopener noreferrer">X</a>
          </span>
        </div>
      </section>

      <footer className={styles.footer}>
        <span>{FOOTER.what[lang]}</span>
        <span className={styles.footerLinks}>
          <a href="/work">{FOOTER.showreel[lang]}</a>
          <a href={LINKS.cv} target="_blank" rel="noopener">{FOOTER.cv[lang]}</a>
          <a href={LINKS.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn</a>
        </span>
        <span className={styles.footerYear}>© 2026</span>
      </footer>
    </main>
  );
}
