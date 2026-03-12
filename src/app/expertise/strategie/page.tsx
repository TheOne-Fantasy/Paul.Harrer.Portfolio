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

      {/* Hero Section - Plus aérée et impactante */}
      <section className={styles.hero} style={{minHeight: '45vh', display: 'flex', alignItems: 'center'}}>
        <div className={styles.heroGrid} style={{gridTemplateColumns: '1fr'}}>
          <div className={styles.heroMain}>
            <span className={styles.kicker}>Expertise 01</span>
            <h1 className={styles.title} style={{fontSize: 'clamp(3rem, 8vw, 6rem)', marginBottom: '2rem'}}>
              {expertise?.title}
            </h1>
            <p className={styles.subtitle} style={{maxWidth: '700px', fontSize: '1.4rem'}}>
              {expertise?.description}
            </p>
          </div>
        </div>
      </section>

      {/* Projects Section - Format Bento avec fond secondaire */}
      <section className={styles.capabilities} style={{marginTop: '-2rem'}}>
        <div className={styles.expertisesContainer}>
          <div className={styles.bentoHeader} style={{textAlign: 'left', marginBottom: '4rem'}}>
            <h2 className={styles.sectionTitle} style={{textAlign: 'left'}}>Projets & Études de cas</h2>
          </div>

          <div className={styles.projectsBentoGrid}>
            {projects.map((proj: any, index: number) => {
              const media: any = mediaExp?.projects[index] || {};
              const hasMedia = !!(media.linkedinId || media.instagramId || media.youtubeId);
              
              // On rend la première carte plus large pour le style
              const isFirst = index === 0;

              return (
                <div 
                  key={index} 
                  className={`${styles.projectCard} ${isFirst || hasMedia ? styles.largeCard : ''}`}
                  style={isFirst ? {gridColumn: 'span 2'} : {}}
                >
                  <div className={styles.cardHeader}>
                    <div className={styles.projectHeader}>
                      {media.image && <img src={media.image} alt={proj.name} className={styles.projectLogo} />}
                      <span className={styles.categoryTag} style={{background: '#fdf2f0', color: '#ff5c35', fontSize: '0.7rem'}}>
                         {lang === 'fr' ? 'Étude de cas' : 'Case Study'} 0{index + 1}
                      </span>
                    </div>
                  </div>

                  <div className={styles.cardBody}>
                    <h4 style={{fontSize: isFirst ? '2.2rem' : '1.8rem'}}>{proj.name}</h4>
                    <p style={{fontSize: '1.05rem', marginBottom: '2rem'}}>{proj.detail}</p>
                    
                    {media.subImage && (
                      <div className={styles.subLogoWrapper} style={{marginBottom: '1.5rem'}}>
                        <img src={media.subImage} alt="Secondary Logo" className={styles.subLogo} />
                      </div>
                    )}

                    {hasMedia && (
                      <div className={styles.caseStudyMedia} style={{marginTop: 'auto', borderRadius: '16px', overflow: 'hidden'}}>
                        {media.linkedinId && (
                          <div className={styles.linkedinWrapper} style={{border: 'none'}}>
                            <iframe
                              src={`https://www.linkedin.com/embed/feed/update/urn:li:activity:${media.linkedinId}`}
                              height="550" width="100%" frameBorder="0" allowFullScreen
                            ></iframe>
                          </div>
                        )}
                        {media.instagramId && (
                          <div className={styles.instaWrapper} style={{border: 'none'}}>
                            <iframe
                              src={`https://www.instagram.com/p/${media.instagramId}/embed/`}
                              width="100%" height="550" frameBorder="0" scrolling="no" allowTransparency={true}
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
                        → {lang === 'fr' ? 'Explorer le projet' : 'Explore project'}
                      </a>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Footer simplifié mais propre */}
      <footer className={styles.footer} style={{borderTop: 'none'}}>
        <div style={{maxWidth: '1400px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0 2rem'}}>
          <p style={{fontSize: '0.9rem'}}>© 2026 Paul Harrer. Strategic Focus.</p>
          <a href="/" className={styles.projectLink} style={{marginTop: 0, fontSize: '0.9rem'}}>
            ← {lang === 'fr' ? "Retour à l'accueil" : "Back to home"}
          </a>
        </div>
      </footer>
    </main>
  );
}
