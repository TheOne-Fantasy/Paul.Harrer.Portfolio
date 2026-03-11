'use client';
import { useState, useMemo } from 'react';
import styles from '../../page.module.css';
import allData from '../../../data.json';

export default function StrategyPage() {
  const [lang, setLang] = useState<'fr' | 'en'>('fr');
  
  // @ts-ignore
  const data = allData[lang];
  const common = allData.common;
  const expertise = data.expertises.find((e: any) => e.id === 1);
  const mediaExp = common.expertises_media.find((m: any) => m.id === 1);
  const projects = expertise?.projects || [];

  return (
    <main className={styles.main}>
      <header className={styles.header}>
        <nav className={styles.nav}>
          <div className={styles.logoGroup}>
            <img src="/Photo-Profil.jpg" alt="Paul Harrer" className={styles.navAvatar} />
            <div className={styles.logo}><a href="/">PAUL HARRER</a></div>
          </div>
          <div className={styles.navLinks}>
            <a href="/expertise/strategie" style={{color: '#ff5c35'}}>{lang === 'fr' ? 'Stratégie' : 'Strategy'}</a>
            <a href="/expertise/production">Production</a>
            <a href="/expertise/content">Content</a>
          </div>
          <div className={styles.navActions}>
            <div className={styles.langSwitcher}>
                <button className={lang === 'fr' ? styles.langActive : ''} onClick={() => setLang('fr')}>FR</button>
                <span>|</span>
                <button className={lang === 'en' ? styles.langActive : ''} onClick={() => setLang('en')}>EN</button>
            </div>
            <a href="/admin" className={styles.adminLink}>Admin</a>
            <a href="#contact" className={styles.contactCta}>{lang === 'fr' ? "Parlons-en" : "Let's talk"}</a>
          </div>
        </nav>
      </header>

      <section className={styles.hero} style={{minHeight: '30vh', paddingTop: '10rem'}}>
        <div className={styles.heroMain}>
          <span className={styles.kicker}>Expertise 01</span>
          <h1 className={styles.title}>{expertise?.title}</h1>
          <p className={styles.subtitle} style={{maxWidth: '800px'}}>{expertise?.description}</p>
        </div>
      </section>

      <section className={styles.expertiseDetailSection}>
        {projects.map((proj: any, index: number) => {
          const media = mediaExp?.projects[index] || {};
          // @ts-ignore
          const hasMedia = !!(media.linkedinId || media.instagramId || media.youtubeId);
          return (
            <div key={index} className={`${styles.caseStudyItem} ${!hasMedia ? styles.fullWidth : ''}`}>
              <div className={styles.caseStudyContent}>
                <div className={styles.projectHeader} style={{marginBottom: '1rem'}}>
                  {/* @ts-ignore */}
                  {media.image && <img src={media.image} alt={proj.name} className={styles.projectLogo} style={{height: '30px'}} />}
                </div>
                <h4>{proj.name}</h4>
                <p>{proj.detail}</p>
                {/* @ts-ignore */}
                {media.subImage && (
                  <div className={styles.subLogoWrapper} style={{marginBottom: '1rem'}}>
                    {/* @ts-ignore */}
                    <img src={media.subImage} alt="Secondary Logo" className={styles.subLogo} style={{height: '20px'}} />
                  </div>
                )}
                {/* @ts-ignore */}
                {media.link && (
                  <a 
                    // @ts-ignore
                    href={media.link} target="_blank" rel="noopener noreferrer" className={styles.projectLink}>→ {lang === 'fr' ? 'Voir le projet en ligne' : 'View project online'}</a>
                )}
              </div>

              {hasMedia && (
                <div className={styles.caseStudyMedia}>
                  {/* @ts-ignore */}
                  {media.linkedinId && (
                    <div className={styles.linkedinWrapper}>
                      <iframe
                        // @ts-ignore
                        src={`https://www.linkedin.com/embed/feed/update/urn:li:activity:${media.linkedinId}`}
                        height="550" width="100%" frameBorder="0" allowFullScreen title="LinkedIn Post"
                      ></iframe>
                    </div>
                  )}
                  {/* @ts-ignore */}
                  {media.instagramId && (
                    <div className={styles.instaWrapper}>
                      <iframe
                        // @ts-ignore
                        src={`https://www.instagram.com/p/${media.instagramId}/embed/`}
                        width="100%" height="550" frameBorder="0" scrolling="no" allowTransparency={true}
                      ></iframe>
                    </div>
                  )}
                  {/* @ts-ignore */}
                  {media.youtubeId && (
                    <div className={styles.videoWrapper}>
                      <iframe 
                        // @ts-ignore
                        width="100%" height="auto" src={`https://www.youtube.com/embed/${media.youtubeId}`}
                        title={proj.name} frameBorder="0" allowFullScreen
                      ></iframe>
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </section>

      <footer className={styles.footer}>
        <p>© 2026 Paul Harrer. {lang === 'fr' ? 'Stratégie Digitale' : 'Digital Strategy'}.</p>
        <a href="/" className={styles.backLink}>← {lang === 'fr' ? "Retour à l'accueil" : "Back to home"}</a>
      </footer>
    </main>
  );
}
