'use client';
import { useState } from 'react';
import styles from '../../page.module.css';
import allData from '../../../data.json';
import Navbar from '../../../components/Navbar';

export default function ContentPage() {
  const [lang, setLang] = useState<'fr' | 'en'>('fr');
  
  // @ts-ignore
  const data = allData[lang];
  const common = allData.common;
  const expertise = data.expertises.find((e: any) => e.id === 3);
  const mediaExp = common.expertises_media.find((m: any) => m.id === 3);
  const projects = expertise?.projects || [];

  return (
    <main className={styles.main}>
      <Navbar lang={lang} setLang={setLang} activeExpertise="content" />

      <section className={styles.hero} style={{minHeight: '40vh', alignItems: 'flex-end', paddingBottom: '4rem'}}>
        <div className={styles.heroMain}>
          <span className={styles.kicker}>Expertise 03</span>
          <h1 className={styles.title} style={{fontSize: 'clamp(2.5rem, 5vw, 4rem)'}}>{expertise?.title}</h1>
          <p className={styles.subtitle} style={{maxWidth: '800px'}}>{expertise?.description}</p>
        </div>
      </section>

      <section className={styles.capabilities} style={{background: 'var(--background)', borderRadius: 0}}>
        <div className={styles.expertisesContainer}>
          <div className={styles.projectsBentoGrid}>
            {projects.map((proj: any, index: number) => {
              const media: any = mediaExp?.projects[index] || {};
              const hasMedia = !!media.youtubeId;
              
              return (
                <div key={index} className={`${styles.projectCard} ${hasMedia ? styles.largeCard : ''}`}>
                  <div className={styles.cardHeader}>
                    <div className={styles.projectHeader}>
                      {media.image && <img src={media.image} alt={proj.name} className={styles.projectLogo} />}
                      <span className={styles.categoryTag} style={{background: '#f0fff4', color: '#10b981'}}>
                        Content Creation {index + 1}
                      </span>
                    </div>
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
          <p>© 2026 Paul Harrer. {lang === 'fr' ? 'Création de Contenu' : 'Content Creation'}.</p>
          <a href="/" className={styles.projectLink} style={{marginTop: 0}}>← {lang === 'fr' ? "Retour à l'accueil" : "Back to home"}</a>
        </div>
      </footer>
    </main>
  );
}
