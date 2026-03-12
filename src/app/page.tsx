'use client';
import { useMemo, useEffect } from 'react';
import styles from './page.module.css'
import allDataRaw from '../data.json'
import Navbar from '../components/Navbar';
import Image from 'next/image';
import { useLanguage } from '@/context/LanguageContext';
import { PortfolioData, LocalizedData, CommonData, BentoItem, ExpertiseData, ProjectData, ProjectMedia } from '@/types/portfolio';

const allData = allDataRaw as PortfolioData;

export default function Home() {
  const { lang } = useLanguage();
  
  // Animation au scroll
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add(styles.revealVisible);
        }
      });
    }, { threshold: 0.1 });

    const elements = document.querySelectorAll(`.${styles.reveal}`);
    elements.forEach(el => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  // Accès simplifié aux données selon la langue
  const data: LocalizedData = useMemo(() => allData[lang], [lang]);
  const common: CommonData = allData.common;

  return (
    <main className={styles.main}>
      <Navbar />

      {/* 1. HERO */}
      <section className={`${styles.hero} ${styles.reveal} ${styles.revealVisible}`}>
        <div className={styles.heroGrid}>
          <div className={styles.heroMain}>
            <span className={styles.kicker}>{data.hero.kicker}</span>
            <h1 className={styles.title}>
              {data.hero.title}
            </h1>
            <p className={styles.subtitle}>{data.hero.subtitle}</p>
          </div>
          
          <div className={styles.bentoPhotos}>
            {common.bento.map((item: BentoItem, index: number) => (
              <div 
                key={item.id} 
                className={`${styles[`bentoItem${index + 1}`]} ${styles.reveal}`}
                style={{ position: 'relative', overflow: 'hidden', transitionDelay: `${index * 0.1}s` }}
              >
                <Image 
                  src={item.image} 
                  alt={item.label} 
                  fill
                  sizes="(max-width: 768px) 50vw, 25vw"
                  style={{ 
                    objectFit: 'cover', 
                    objectPosition: `${item.x}% ${item.y}%` 
                  }}
                  priority={index < 2}
                />
                <div className={styles.photoPlaceholder} style={{position: 'relative', zIndex: 1}}>{item.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 2. BENTO GRID DYNAMIQUE DES PROJETS */}
      <section className={`${styles.capabilities} ${styles.reveal}`} id="work">
        <div className={styles.expertisesContainer}>
          <div className={styles.bentoHeader}>
            <h2 className={styles.sectionTitle}>{lang === 'fr' ? 'Portfolio & Expertises' : 'Portfolio & Expertise'}</h2>
            <p className={styles.bentoSubtitle}>{lang === 'fr' ? 'Un aperçu de 10 ans de stratégie, production et création de contenu.' : 'A glimpse into 10 years of strategy, production, and content creation.'}</p>
          </div>

          <div className={styles.projectsBentoGrid}>
            {data.expertises.flatMap((exp: ExpertiseData) => 
              exp.projects.map((proj: ProjectData, idx: number) => {
                const mediaExp = common.expertises_media.find((m) => m.id === exp.id);
                const media: ProjectMedia = mediaExp ? mediaExp.projects[idx] : {};
                return { ...proj, ...media, category: exp.title, categoryId: exp.id };
              })
            ).map((proj: any, index: number) => (
              <div 
                key={index} 
                className={`${styles.projectCard} ${styles.reveal} ${proj.youtubeId || proj.instagramId || proj.linkedinId ? styles.largeCard : styles.smallCard}`}
                style={{ transitionDelay: `${(index % 3) * 0.1}s` }}
              >
                <div className={styles.cardHeader}>
                  <span className={`${styles.categoryTag} ${styles[`tag${proj.categoryId}`]}`}>
                    {proj.category}
                  </span>
                  {proj.image && (
                    <div style={{ position: 'relative', height: '28px', width: '80px' }}>
                      <Image 
                        src={proj.image} 
                        alt={proj.name} 
                        fill
                        style={{ objectFit: 'contain', objectPosition: 'right' }}
                      />
                    </div>
                  )}
                </div>

                <div className={styles.cardBody}>
                  <h4>{proj.name}</h4>
                  <p>{proj.detail}</p>
                  
                  {proj.subImage && (
                    <div className={styles.subLogoWrapper} style={{ position: 'relative', height: '20px', width: '60px', marginTop: '1rem' }}>
                      <Image 
                        src={proj.subImage} 
                        alt="Secondary Logo" 
                        fill
                        style={{ objectFit: 'contain', objectPosition: 'left' }}
                      />
                    </div>
                  )}

                  {proj.youtubeId && (
                    <div className={styles.videoWrapper}>
                      <iframe 
                        width="100%" 
                        height="auto" 
                        src={`https://www.youtube.com/embed/${proj.youtubeId}`}
                        title={proj.name}
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      ></iframe>
                    </div>
                  )}

                  {proj.instagramId && (
                    <div className={styles.instaWrapper}>
                      <iframe
                        src={`https://www.instagram.com/p/${proj.instagramId}/embed/`}
                        width="100%"
                        height="450"
                        frameBorder="0"
                        scrolling="no"
                        allowTransparency={true}
                      ></iframe>
                    </div>
                  )}

                  {proj.linkedinId && (
                    <div className={styles.linkedinWrapper}>
                      <iframe
                        src={`https://www.linkedin.com/embed/feed/update/urn:li:activity:${proj.linkedinId}`}
                        height="500"
                        width="100%"
                        frameBorder="0"
                        allowFullScreen={true}
                        title="Embedded LinkedIn Post"
                      ></iframe>
                    </div>
                  )}
                </div>

                {proj.link && (
                  <div className={styles.cardFooter}>
                    <a 
                      href={proj.link} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className={styles.projectLink}
                    >
                      → {lang === 'fr' ? 'Voir le projet' : 'View project'}
                    </a>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 2.5 WEB DEVELOPMENT SECTION */}
      <section className={`${styles.devSection} ${styles.reveal}`}>
        <div className={styles.devContainer}>
          <div className={styles.devHeader}>
            <span className={styles.devTag}>Web Development</span>
            <h3>{data.dev.title}</h3>
          </div>
          <div className={styles.devLinks}>
            {data.dev.projects.map((p, idx) => (
               <a key={idx} href={idx === 0 ? "https://theone-fantasy.com/" : idx === 1 ? "https://ebloch-legal.vercel.app/" : "https://filet-mignon-crew.vercel.app/"} target="_blank" rel="noopener noreferrer" className={styles.devCard}>
                <div className={styles.devCardContent}>
                  <span className={styles.devUrl}>{idx === 0 ? "theone-fantasy.com" : idx === 1 ? "ebloch-legal.vercel.app" : "filet-mignon-crew.vercel.app"}</span>
                  <p>{p.name}</p>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* 3. ABOUT ACTION */}
      <section className={`${styles.aboutAction} ${styles.reveal}`}>
        <div className={styles.aboutGrid}>
          <div 
            className={styles.aboutPhoto}
            style={{ position: 'relative', overflow: 'hidden' }}
          >
            <Image 
              src={common.about_media.image} 
              alt="About Paul Harrer" 
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              style={{ 
                objectFit: 'cover', 
                objectPosition: `${common.about_media.x}% ${common.about_media.y}%` 
              }}
            />
          </div>
          <div className={styles.aboutContent}>
            <h2 className={styles.sectionTitle} style={{textAlign: 'left'}}>{data.about.title}</h2>
            <p>{data.about.text}</p>
            
            <div className={styles.socialGrid}>
              <a href="https://x.com/HarrerPaul" target="_blank" rel="noopener noreferrer" className={styles.socialLink}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
                <span>@HarrerPaul</span>
              </a>
              <a href="https://www.instagram.com/plharrer/?hl=fr" target="_blank" rel="noopener noreferrer" className={styles.socialLink}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
                <span>@plharrer</span>
              </a>
              <a href="https://www.linkedin.com/in/paul-harrer-b8759982/" target="_blank" rel="noopener noreferrer" className={styles.socialLink}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.761 0 5-2.239 5-5v-14c0-2.761-2.239-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
                <span>Paul Harrer</span>
              </a>
              <a href="mailto:paulharrer@hotmail.com" className={styles.socialLink}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
                <span>paulharrer@hotmail.com</span>
              </a>
            </div>

            <div className={styles.aboutActions}>
              <a href="/CV-PaulHarrer-VC.pdf" target="_blank" className={styles.cvButton}>
                {data.about.cv}
              </a>
            </div>

            <div className={styles.miniStats}>
               {data.about.stats.map((stat, i) => (
                 <div key={i} className={styles.stat}>
                   <strong>{stat.value}</strong> {stat.label}
                 </div>
               ))}
            </div>
          </div>
        </div>
      </section>

      {/* 4. CONTACT */}
      <section className={`${styles.contactSection} ${styles.reveal}`} id="contact">
        <span className={styles.kicker} style={{textAlign: 'center', display: 'block', margin: '0 auto 2rem auto'}}>Contact</span>
        <h2 className={styles.title} style={{textAlign: 'center'}}>{data.contact.title.split('Parlons-en')[0]} <br/> <span className={styles.accent}>{data.contact.title.includes('Parlons-en') ? 'Parlons-en.' : "Let's talk."}</span></h2>
        <a href="mailto:paulharrer@hotmail.com" className={styles.bigMail}>
          paulharrer@hotmail.com
        </a>
        <div className={styles.contactSocials}>
          <a href="https://x.com/HarrerPaul" target="_blank" rel="noopener noreferrer">X / Twitter</a>
          <a href="https://www.instagram.com/plharrer/?hl=fr" target="_blank" rel="noopener noreferrer">Instagram</a>
          <a href="https://www.linkedin.com/in/paul-harrer-b8759982/" target="_blank" rel="noopener noreferrer">LinkedIn</a>
        </div>
      </section>

      <footer className={styles.footer}>
        <p>© 2026 Paul Harrer. Built with Next.js & Strategic Focus.</p>
      </footer>
    </main>
  )
}
