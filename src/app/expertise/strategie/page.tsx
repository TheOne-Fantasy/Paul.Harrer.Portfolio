import styles from '../../page.module.css';
import data from '../../../data.json';

export default function StrategyPage() {
  const expertise = data.expertises.find(e => e.id === 1);
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
            <a href="/expertise/strategie" style={{color: '#ff5c35'}}>Stratégie</a>
            <a href="/expertise/production">Production</a>
            <a href="/expertise/content">Content</a>
          </div>
          <div className={styles.navActions}>
            <a href="/admin" className={styles.adminLink}>Admin</a>
            <a href="#contact" className={styles.contactCta}>Let&apos;s talk</a>
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
        {projects.map((proj: any, index) => {
          const hasMedia = !!(proj.linkedinId || proj.instagramId || proj.youtubeId);
          return (
            <div key={index} className={`${styles.caseStudyItem} ${!hasMedia ? styles.fullWidth : ''}`}>
              <div className={styles.caseStudyContent}>
                <div className={styles.projectHeader} style={{marginBottom: '1rem'}}>
                  {proj.image && <img src={proj.image} alt={proj.name} className={styles.projectLogo} style={{height: '30px'}} />}
                </div>
                <h4>{proj.name}</h4>
                <p>{proj.detail}</p>
                {proj.subImage && (
                  <div className={styles.subLogoWrapper} style={{marginBottom: '1rem'}}>
                    <img src={proj.subImage} alt="Secondary Logo" className={styles.subLogo} style={{height: '20px'}} />
                  </div>
                )}
                {proj.link && (
                  <a href={proj.link} target="_blank" rel="noopener noreferrer" className={styles.projectLink}>→ Voir le projet en ligne</a>
                )}
              </div>

              {hasMedia && (
                <div className={styles.caseStudyMedia}>
                  {proj.linkedinId && (
                    <div className={styles.linkedinWrapper}>
                      <iframe
                        src={`https://www.linkedin.com/embed/feed/update/urn:li:activity:${proj.linkedinId}`}
                        height="550" width="100%" frameBorder="0" allowFullScreen title="LinkedIn Post"
                      ></iframe>
                    </div>
                  )}
                  {proj.instagramId && (
                    <div className={styles.instaWrapper}>
                      <iframe
                        src={`https://www.instagram.com/p/${proj.instagramId}/embed/`}
                        width="100%" height="550" frameBorder="0" scrolling="no" allowTransparency={true}
                      ></iframe>
                    </div>
                  )}
                  {proj.youtubeId && (
                    <div className={styles.videoWrapper}>
                      <iframe 
                        width="100%" height="auto" src={`https://www.youtube.com/embed/${proj.youtubeId}`}
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
        <p>© 2026 Paul Harrer. Stratégie Digitale.</p>
        <a href="/" className={styles.backLink}>← Retour à l'accueil</a>
      </footer>
    </main>
  );
}
