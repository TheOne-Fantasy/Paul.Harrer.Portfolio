'use client';
import { useState } from 'react';
import styles from '../../page.module.css';
import allData from '../../../data.json';
import Navbar from '../../../components/Navbar';

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
      <Navbar lang={lang} setLang={setLang} activeExpertise="strategie" />

      <section className={styles.hero} style={{minHeight: '40vh', alignItems: 'flex-end', paddingBottom: '4rem'}}>
        <div className={styles.heroMain}>
          <span className={styles.kicker}>Expertise 01</span>
          <h1 className={styles.title} style={{fontSize: 'clamp(2.5rem, 5vw, 4rem)'}}>{expertise?.title}</h1>
          <p className={styles.subtitle} style={{maxWidth: '800px'}}>{expertise?.description}</p>
        </div>
      </section>

      <section className={styles.capabilities} style={{background: 'var(--background)', borderRadius: 0}}>
        <div className={styles.expertisesContainer}>
          <div className={styles.projectsBentoGrid}>
            {projects.map((proj: any, index: number) => {
              const media = mediaExp?.projects[index] || {};
              // @ts-ignore
              const hasMedia = !!(media.linkedinId || media.instagramId || media.youtubeId);
              
              return (
                <div key={index} className={`${styles.projectCard} ${hasMedia ? styles.largeCard : ''}`}>
                  <div className={styles.cardHeader}>
                    <div className={styles.projectHeader}>
                      {media.image && <img src={media.image} alt={proj.name} className={styles.projectLogo} />}
                      <span className={styles.categoryTag} style={{background: '#fdf2f0', color: '#ff5c35'}}>
                        Case Study {index + 1}
                      </span>
                    </div>
                  </div>

                  <div className={styles.cardBody}>
                    <h4>{proj.name}</h4>
                    <p>{proj.detail}</p>
                    
                    {media.subImage && (
                      <div className={styles.subLogoWrapper}>
                        <img src={media.subImage} alt="Secondary Logo" className={styles.subLogo} />
                      </div>
                    )}

                    {hasMedia && (
                      <div className={styles.caseStudyMedia} style={{marginTop: '1.5rem'}}>
                        {media.linkedinId && (
                          <div className={styles.linkedinWrapper}>
                            <iframe
                              src={`https://www.linkedin.com/embed/feed/update/urn:li:activity:${media.linkedinId}`}
                              height="500" width="100%" frameBorder="0" allowFullScreen
                            ></iframe>
                          </div>
                        )}
                        {media.instagramId && (
                          <div className={styles.instaWrapper}>
                            <iframe
                              src={`https://www.instagram.com/p/${media.instagramId}/embed/`}
                              width="100%" height="450" frameBorder="0" scrolling="no" allowTransparency={true}
                            ></iframe>
                          </div>
                        )}
                        {media.youtubeId && (
                          <div className={styles.videoWrapper}>
                            <iframe 
                              width="100%" height="auto" src={`https://www.youtube.com/embed/${media.youtubeId}`}
                              title={proj.name} frameBorder="0" allowFullScreen
                            ></iframe>
                          </div>
                        )}
                      </div>
                    )}
                  </div>

                  {media.link && (
                    <div className={styles.cardFooter}>
                      <a href={media.link} target="_blank" rel="noopener noreferrer" className={styles.projectLink}>
                        → {lang === 'fr' ? 'Voir le projet en ligne' : 'View project online'}
                      </a>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <footer className={styles.footer}>
        <div style={{maxWidth: '1400px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0 2rem'}}>
          <p>© 2026 Paul Harrer. {lang === 'fr' ? 'Stratégie Digitale' : 'Digital Strategy'}.</p>
          <a href="/" className={styles.projectLink} style={{marginTop: 0}}>← {lang === 'fr' ? "Retour à l'accueil" : "Back to home"}</a>
        </div>
      </footer>
    </main>
  );
}
