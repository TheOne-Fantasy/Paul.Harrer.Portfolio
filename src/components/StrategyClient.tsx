'use client';
import { useMemo } from 'react';
import styles from '../app/page.module.css';
import Navbar from './Navbar';
import Image from 'next/image';
import { useLanguage } from '@/context/LanguageContext';
import { PortfolioData, LocalizedData, CommonData, ExpertiseData, ProjectData, ProjectMedia } from '@/types/portfolio';

interface StrategyClientProps {
  allData: PortfolioData;
}

export default function StrategyClient({ allData }: StrategyClientProps) {
  const { lang } = useLanguage();
  
  const data: LocalizedData = useMemo(() => allData[lang], [lang, allData]);
  const common: CommonData = allData.common;
  const expertise = data.expertises.find((e: ExpertiseData) => e.id === 1);
  const mediaExp = common.expertises_media.find((m) => m.id === 1);
  const projects = expertise?.projects || [];

  return (
    <main className={styles.main}>
      <Navbar activeExpertise="strategie" />

      {/* Hero Section */}
      <section className={styles.hero} style={{paddingTop: '12rem', minHeight: 'auto'}}>
        <div className={styles.heroMain}>
          <span className={styles.kicker}>Expertise 01</span>
          <h1 className={styles.title}>{expertise?.title}</h1>
          <p className={styles.subtitle}>{expertise?.description}</p>
        </div>
      </section>

      {/* Projects Section */}
      <section className={styles.capabilities} id="projects">
        <div className={styles.expertisesContainer}>
          <div className={styles.bentoHeader} style={{textAlign: 'left', marginBottom: '3rem'}}>
            <h2 className={styles.sectionTitle} style={{textAlign: 'left'}}>Projets & Missions</h2>
          </div>

          <div className={styles.projectsBentoGrid}>
            {projects.map((proj: ProjectData, index: number) => {
              const media: ProjectMedia = mediaExp?.projects[index] || {};
              const hasMedia = !!(media.linkedinId || media.instagramId || media.youtubeId);
              
              return (
                <div key={index} className={`${styles.projectCard} ${hasMedia ? styles.largeCard : ''}`}>
                  <div className={styles.cardHeader}>
                    {media.image && (
                      <div style={{ position: 'relative', height: '28px', width: '80px' }}>
                        <Image 
                          src={media.image} 
                          alt={proj.name} 
                          fill
                          style={{ objectFit: 'contain', objectPosition: 'left' }}
                        />
                      </div>
                    )}
                  </div>

                  <div className={styles.cardBody}>
                    <h4>{proj.name}</h4>
                    <p>{proj.detail}</p>
                    
                    {media.subImage && (
                      <div style={{ position: 'relative', height: '20px', width: '60px', marginTop: '1rem', marginBottom: '1rem' }}>
                        <Image 
                          src={media.subImage} 
                          alt="Secondary Logo" 
                          fill
                          style={{ objectFit: 'contain', objectPosition: 'left' }}
                        />
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
                        → {lang === 'fr' ? 'Voir le projet' : 'View project'}
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
          <p>© 2026 Paul Harrer. Strategic Focus.</p>
          <a href="/" className={styles.projectLink} style={{marginTop: 0}}>← {lang === 'fr' ? "Retour" : "Back"}</a>
        </div>
      </footer>
    </main>
  );
}
