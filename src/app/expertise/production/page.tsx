'use client';
import { useState } from 'react';
import styles from '../../page.module.css';
import allData from '../../../data.json';
import Navbar from '../../../components/Navbar';

export default function ProductionPage() {
  const [lang, setLang] = useState<'fr' | 'en'>('fr');
  
  // @ts-ignore
  const data = allData[lang];
  const common = allData.common;
  const expertise = data.expertises.find((e: any) => e.id === 2);
  const mediaExp = common.expertises_media.find((m: any) => m.id === 2);
  const projects = expertise?.projects || [];

  return (
    <main className={styles.main}>
      <Navbar lang={lang} setLang={setLang} activeExpertise="production" />

      {/* Hero Section */}
      <section className={styles.hero} style={{minHeight: '45vh', display: 'flex', alignItems: 'center'}}>
        <div className={styles.heroGrid} style={{gridTemplateColumns: '1fr'}}>
          <div className={styles.heroMain}>
            <span className={styles.kicker}>Expertise 02</span>
            <h1 className={styles.title} style={{fontSize: 'clamp(3rem, 8vw, 6rem)', marginBottom: '2rem'}}>
              {expertise?.title}
            </h1>
            <p className={styles.subtitle} style={{maxWidth: '700px', fontSize: '1.4rem'}}>
              {expertise?.description}
            </p>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section className={styles.capabilities} style={{marginTop: '-2rem'}}>
        <div className={styles.expertisesContainer}>
          <div className={styles.bentoHeader} style={{textAlign: 'left', marginBottom: '4rem'}}>
            <h2 className={styles.sectionTitle} style={{textAlign: 'left'}}>
              {lang === 'fr' ? 'Réalisations & Régie' : 'Directing & Production'}
            </h2>
          </div>

          <div className={styles.projectsBentoGrid}>
            {projects.map((proj: any, index: number) => {
              const media: any = mediaExp?.projects[index] || {};
              const hasMedia = !!media.youtubeId;
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
                      <span className={styles.categoryTag} style={{background: '#f0f7ff', color: '#0070f3', fontSize: '0.7rem'}}>
                        Showreel 0{index + 1}
                      </span>
                    </div>
                  </div>

                  <div className={styles.cardBody}>
                    <h4 style={{fontSize: isFirst ? '2.2rem' : '1.8rem'}}>{proj.name}</h4>
                    <p style={{fontSize: '1.05rem', marginBottom: '2rem'}}>{proj.detail}</p>
                    
                    {hasMedia && (
                      <div className={styles.caseStudyMedia} style={{marginTop: 'auto', borderRadius: '16px', overflow: 'hidden'}}>
                        <div className={styles.videoWrapper}>
                          <iframe 
                            width="100%" height="auto" src={`https://www.youtube.com/embed/${media.youtubeId}`}
                            title={proj.name} frameBorder="0" allowFullScreen
                          ></iframe>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <footer className={styles.footer} style={{borderTop: 'none'}}>
        <div style={{maxWidth: '1400px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0 2rem'}}>
          <p style={{fontSize: '0.9rem'}}>© 2026 Paul Harrer. Visual Production.</p>
          <a href="/" className={styles.projectLink} style={{marginTop: 0, fontSize: '0.9rem'}}>
            ← {lang === 'fr' ? "Retour à l'accueil" : "Back to home"}
          </a>
        </div>
      </footer>
    </main>
  );
}
