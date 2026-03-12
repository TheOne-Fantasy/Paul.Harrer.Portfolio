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
      <section className={styles.hero} style={{paddingTop: '12rem', minHeight: 'auto'}}>
        <div className={styles.heroMain}>
          <span className={styles.kicker}>Expertise 02</span>
          <h1 className={styles.title}>{expertise?.title}</h1>
          <p className={styles.subtitle}>{expertise?.description}</p>
        </div>
      </section>

      {/* Projects Section */}
      <section className={styles.capabilities} id="projects">
        <div className={styles.expertisesContainer}>
          <div className={styles.bentoHeader} style={{textAlign: 'left', marginBottom: '3rem'}}>
            <h2 className={styles.sectionTitle} style={{textAlign: 'left'}}>
              {lang === 'fr' ? 'Réalisations & Régie' : 'Directing & Production'}
            </h2>
          </div>

          <div className={styles.projectsBentoGrid}>
            {projects.map((proj: any, index: number) => {
              const media: any = mediaExp?.projects[index] || {};
              const hasMedia = !!media.youtubeId;

              return (
                <div key={index} className={`${styles.projectCard} ${hasMedia ? styles.largeCard : ''}`}>
                  <div className={styles.cardHeader}>
                    {media.image && <img src={media.image} alt={proj.name} className={styles.projectLogo} />}
                  </div>

                  <div className={styles.cardBody}>
                    <h4>{proj.name}</h4>
                    <p>{proj.detail}</p>
                    
                    {hasMedia && (
                      <div className={styles.caseStudyMedia} style={{marginTop: '1.5rem'}}>
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

      <footer className={styles.footer}>
        <div style={{maxWidth: '1400px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0 2rem'}}>
          <p>© 2026 Paul Harrer. Visual Production.</p>
          <a href="/" className={styles.projectLink} style={{marginTop: 0}}>← {lang === 'fr' ? "Retour" : "Back"}</a>
        </div>
      </footer>
    </main>
  );
}
