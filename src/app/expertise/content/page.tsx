import styles from '../../page.module.css';
import data from '../../../data.json';

export default function ContentPage() {
  const expertise = data.expertises.find(e => e.id === 3);
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
            <a href="/expertise/strategie">Stratégie</a>
            <a href="/expertise/production">Production</a>
            <a href="/expertise/content" style={{color: '#ff5c35'}}>Content</a>
          </div>
          <div className={styles.navActions}>
            <a href="/admin" className={styles.adminLink}>Admin</a>
            <a href="#contact" className={styles.contactCta}>Let&apos;s talk</a>
          </div>
        </nav>
      </header>

      <section className={styles.hero} style={{minHeight: '30vh', paddingTop: '10rem'}}>
        <div className={styles.heroMain}>
          <span className={styles.kicker}>Expertise 03</span>
          <h1 className={styles.title}>{expertise?.title}</h1>
          <p className={styles.subtitle} style={{maxWidth: '800px'}}>{expertise?.description}</p>
        </div>
      </section>

      <section className={styles.expertiseDetailSection}>
        {projects.map((proj: any, index) => {
          const hasMedia = !!proj.youtubeId;
          return (
            <div key={index} className={`${styles.caseStudyItem} ${!hasMedia ? styles.fullWidth : ''}`}>
              <div className={styles.caseStudyContent}>
                <div className={styles.projectHeader} style={{marginBottom: '1rem'}}>
                  {proj.image && <img src={proj.image} alt={proj.name} className={styles.projectLogo} style={{height: '30px'}} />}
                </div>
                <h4>{proj.name}</h4>
                <p>{proj.detail}</p>
              </div>

              {hasMedia && (
                <div className={styles.caseStudyMedia}>
                  <div className={styles.videoWrapper}>
                    <iframe 
                      width="100%" height="auto" src={`https://www.youtube.com/embed/${proj.youtubeId}`}
                      title={proj.name} frameBorder="0" allowFullScreen
                    ></iframe>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </section>

      <footer className={styles.footer}>
        <p>© 2026 Paul Harrer. Création de Contenu.</p>
        <a href="/" className={styles.backLink}>← Retour à l'accueil</a>
      </footer>
    </main>
  );
}
