'use client';
import { useState, useEffect } from 'react';
import styles from './ef.module.css';

export default function EFPage() {
  const [fanName, setFanName] = useState('');
  const [fanId, setFanId] = useState('');
  const [mounted, setMounted] = useState(false);
  
  // Handle mounting and generation of ID on client-side only to avoid hydration mismatch
  useEffect(() => {
    setMounted(true);
    setFanId(Math.floor(Math.random() * 100000).toString().padStart(6, '0'));
  }, []);

  // Animation au scroll (Intersection Observer)
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

  return (
    <main className={styles.main}>
      {/* Header */}
      <header className={styles.header}>
        <nav className={styles.nav}>
          <div className={styles.logoArea}>
            <div className={styles.efLogoContainer}>
               <img src="/Photo-Profil.jpg" alt="Paul Harrer" className={styles.navAvatar} />
               <img src="/EF-LOGO.png?v=1" alt="EF Logo" style={{ height: '30px', objectFit: 'contain' }} />
            </div>
            <div className={styles.candidateInfo}>
              <span className={styles.candidateName}>Paul Harrer</span>
              <span className={styles.candidateTitle}>Social Media Strategy & Growth</span>
            </div>
          </div>
          <div className={styles.navLinks}>
            <a href="#culture">Culture</a>
            <a href="#portfolio">Portfolio</a>
            <a href="#strategy">Strategy</a>
            <a href="#contact">Contact</a>
          </div>
        </nav>
      </header>

      {/* Section 1: Hero */}
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <h1 className={styles.heroTitle}>
            MORE THAN CONTENT.<br />
            BUILDING THE DIGITAL INFRASTRUCTURE OF <br />
            <span className={styles.heroPink}>THE PINK WAVE.</span>
          </h1>
          <p className={styles.heroSubtitle}>
            Harnessing Culture, Community, and Code for EF Pro Cycling.
          </p>
          <a href="#strategy" className={styles.ctaButton}>Explore My Strategy</a>
          
          <div className={styles.heroVisual}>
             <div className={styles.grainyOverlay}></div>
             <div style={{ width: '100%', height: '100%', background: '#0a0a0a', position: 'relative' }}>
                <img 
                  src="/ef-assets/hero.webp?v=1" 
                  alt="EF Pro Cycling Hero" 
                  style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.8 }} 
                />
             </div>
          </div>
        </div>
      </section>

      {/* Section 2: Culture EF */}
      <section id="culture" className={`${styles.section} ${styles.reveal}`}>
        <h2 className={styles.sectionTitle}>
          EMBRACING THE EF SPIRIT:<br />
          <span className={styles.heroPink}>PINK. PASSION. UNCONVENTIONAL.</span>
        </h2>
        <p className={styles.sectionSubtitle}>
          My approach aligns with EF’s core values of alternative storytelling, adventure, and inclusivity.
        </p>
        
        <div className={styles.mosaicGrid}>
          <div className={styles.mosaicItem}>
            <img 
              src="/ef-assets/culture-1.webp?v=1" 
              alt="EF Culture Fog" 
            />
          </div>
          <div className={styles.mosaicItem}>
            <img 
              src="/ef-assets/culture-2.webp?v=1" 
              alt="EF Culture Cobbles" 
            />
          </div>
          <div className={styles.mosaicItem}>
            <img 
              src="/ef-assets/culture-3.webp?v=1" 
              alt="EF Riders Portrait" 
            />
          </div>
          <div className={styles.mosaicItem}>
            <img 
              src="/ef-assets/culture-4.webp?v=1" 
              alt="EF Jersey Back" 
            />
          </div>
        </div>
      </section>

      {/* Section 3: Portfolio & Stats */}
      <section id="portfolio" className={`${styles.section} ${styles.reveal}`}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '2rem', marginBottom: '3rem' }}>
          <div style={{ flex: 1, minWidth: '300px' }}>
            <h2 className={styles.sectionTitle}>
              THE PROOF IS IN THE REACH:<br />
              <span className={styles.heroPink}>STRATEGIC IMPACT AT SCALE.</span>
            </h2>
            <p className={styles.sectionSubtitle} style={{ marginBottom: 0 }}>
              10 years of piloting digital audiences and co-founding niche media.
            </p>
          </div>
          <div className={styles.avatarContainer}>
             <img src="/Photo-Profil.jpg" alt="Paul Harrer" className={styles.candidateAvatar} />
          </div>
        </div>

        <div className={styles.statsGrid}>
          <div className={styles.statCard}>
            <span className={styles.statValue}>700K+</span>
            <span className={styles.statLabel}>Subscribers Piloted (First Team)</span>
          </div>
          <div className={styles.statCard}>
            <span className={styles.statValue}>2000+</span>
            <span className={styles.statLabel}>Shows Produced & Directed</span>
          </div>
          <div className={styles.statCard}>
            <span className={styles.statValue}>1000+</span>
            <span className={styles.statLabel}>Active Cycling Fantasy Players</span>
          </div>
          <div className={styles.statCard}>
            <span className={styles.statValue}>#1</span>
            <span className={styles.statLabel}>Digital Cycling Talk-Show (FR)</span>
          </div>
        </div>

        {/* Portfolio Preview Card */}
        <div className={styles.portfolioPreviewCard}>
          <div className={styles.portfolioPreviewContent}>
            <h3>FULL PORTFOLIO</h3>
            <p>10 years of field expertise in digital strategy, creative production, and social media growth for major sports ecosystems.</p>
            <a href="https://paul-harrer.vercel.app/" target="_blank" rel="noopener noreferrer" className={styles.ctaButton}>
              Explore All Case Studies
            </a>
          </div>
          <div className={styles.portfolioPreviewVisual}>
            <img src="/portfolio-real-preview.png?v=1" alt="Portfolio Preview" />
            <div className={styles.grainyOverlay}></div>
          </div>
        </div>
      </section>

      {/* Section 4: 3 Strategy Pillars */}
      <section id="strategy" className={`${styles.section} ${styles.reveal}`}>
        <h2 className={styles.sectionTitle}>
          VISION 2026:<br />
          <span className={styles.heroPink}>THE THREE PILLARS OF FUTURE GROWTH.</span>
        </h2>
        
        <div className={styles.strategyGrid}>
          {/* Card 1: Ecosystem */}
          <div className={styles.strategyCard}>
            <div className={styles.strategyIcon}>
               <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
            </div>
            <span className={styles.tag}>Fan Ecosystem</span>
            <h3>The &quot;Pink Panthers&quot; (Working Title)</h3>
            <p>Formalizing fan identity through a tiered digital membership club. 
               <strong> Inspiration:</strong> The <em>&quot;Wolf Pack&quot;</em> model from Soudal Quick-Step, shifting from passive viewership to a branded community belonging.</p>
            <div style={{ borderTop: '1px solid #eee', paddingTop: '1rem', marginTop: 'auto' }}>
               <small style={{ color: '#888', fontStyle: 'italic' }}>Value: Exclusive access to Rapha drops, Cannondale tech, and <strong>exclusive invitations to team events & meet-and-greets.</strong></small>
            </div>
          </div>

          {/* Card 2: Hubs */}
          <div className={styles.strategyCard}>
            <div className={styles.strategyIcon}>
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="2" y1="12" x2="22" y2="12"></line><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path></svg>
            </div>
            <span className={styles.tag}>Growth</span>
            <h3>Localized Digital Hubs</h3>
            <p>Scaling reach through region-specific storytelling. Following the successful NBA model in the French market (EF USA, EF Ecuador, EF France).</p>
            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', margin: '0.5rem 0' }}>
               <a href="https://www.instagram.com/leschicagobulls/?hl=fr" target="_blank" rel="noopener noreferrer" className={styles.tag} style={{ background: '#000', color: '#fff', textDecoration: 'none', fontSize: '0.65rem' }}>@LesChicagoBulls</a>
               <a href="https://www.instagram.com/lesspurs/?hl=fr" target="_blank" rel="noopener noreferrer" className={styles.tag} style={{ background: '#000', color: '#fff', textDecoration: 'none', fontSize: '0.65rem' }}>@LesSpurs</a>
            </div>
            <div style={{ borderTop: '1px solid #eee', paddingTop: '1rem', marginTop: 'auto' }}>
               <small style={{ color: '#888', fontStyle: 'italic' }}>Dominating regional social algorithms through cultural relevance and local cycling fervor.</small>
            </div>
          </div>

          {/* Card 3: AI */}
          <div className={styles.strategyCard}>
            <div className={styles.strategyIcon}>
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>
            </div>
            <span className={styles.tag}>Innovation</span>
            <h3>AI Community Assistant</h3>
            <p>Closing the gap between pro riders and fans. A bespoke AI Bot to manage social interactions at scale, providing 24/7 engagement and personalized community support across all digital touchpoints.</p>
            <p style={{ fontSize: '0.85rem', color: '#555', marginTop: '-0.5rem', fontWeight: 500 }}>
              <em>&quot;The AI bot will be perfectly fine-tuned to mirror EF&apos;s unique tone of voice, visual identity, and unconventional spirit.&quot;</em>
            </p>
            <div style={{ borderTop: '1px solid #eee', paddingTop: '1rem', marginTop: 'auto' }}>
               <small style={{ color: '#888', fontStyle: 'italic' }}>Scaling the unscalable: Real-time interaction for a global, multilingual fanbase.</small>
            </div>
          </div>
        </div>
      </section>

      {/* Section 5: Technical Capabilities */}
      <section className={`${styles.section} ${styles.reveal}`}>
        <h2 className={styles.sectionTitle}>
          CODING CUSTOM ENGAGEMENT:<br />
          <span className={styles.heroPink}>BEYOND PLATFORM LIMITS.</span>
        </h2>
        <p className={styles.sectionSubtitle}>
          I don&apos;t just design tools; I can build them.
        </p>

        <div className={styles.generatorSection}>
          <div className={styles.generatorForm}>
            <h3>Fan-ID Generator Prototype</h3>
            <div className={styles.inputGroup}>
              <label htmlFor="fanName">Enter your name to join the Panthers</label>
              <input 
                type="text" 
                id="fanName" 
                placeholder="Ex: Johannes" 
                value={fanName}
                onChange={(e) => setFanName(e.target.value)}
              />
            </div>
            <p style={{ fontSize: '0.9rem', color: '#666' }}>
              <strong>High-Speed, Custom Microsites.</strong> Ability to code fast-loading landing pages for high-impact events or product launches.
            </p>
          </div>

          <div className={styles.fanIdPreview}>
             <div style={{ position: 'absolute', inset: 0, opacity: 0.3, zIndex: 0 }}>
                <img src="/ef-assets/culture-2.webp?v=1" alt="Card Background" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
             </div>
            <div className={styles.fanIdHeader} style={{ position: 'relative', zIndex: 1 }}>
              <div className={styles.fanIdLogo}>
                <img src="/EF-LOGO.png?v=1" alt="EF Logo" style={{ height: '20px', objectFit: 'contain', filter: 'brightness(0) invert(1)' }} />
              </div>
              <div className={styles.fanIdType}>PINK PANTHERS CLUB</div>
            </div>
            <div className={styles.fanIdName} style={{ position: 'relative', zIndex: 1 }}>
              {fanName || "YOUR NAME"}
            </div>
            <div className={styles.fanIdFooter} style={{ position: 'relative', zIndex: 1 }}>
              <div className={styles.fanIdNumber}>
                ID #{mounted ? fanId : '------'}
              </div>
              <div style={{ fontSize: '0.6rem', opacity: 0.8, textAlign: 'right' }}>
                DIGITAL PASS 2026<br />VALID WORLDWIDE
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 6: Final CTA */}
      <section id="contact" className={styles.finalCta}>
        <div className={`${styles.reveal}`}>
          <h2>
            READY FOR NEXT STEPS.<br />
            LET&apos;S BUILD THE DIGITAL <span className={styles.heroPink}>PINK WAVE</span> TOGETHER.
          </h2>
          <a href="mailto:paulharrer@hotmail.com" className={styles.ctaButton}>
            LET&apos;S HOP ON A CALL
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ padding: '4rem 2rem', textAlign: 'center', backgroundColor: '#000', color: '#fff' }}>
        <div style={{ marginBottom: '2rem' }}>
          <img src="/EF-LOGO.png?v=1" alt="EF Logo" style={{ height: '35px', objectFit: 'contain', filter: 'brightness(0) invert(1)', opacity: 0.8 }} />
        </div>
        <p style={{ color: '#666', fontSize: '0.8rem' }}>
          © 2026 Paul Harrer x EF Pro Cycling Strategy. All rights reserved.
        </p>
      </footer>
    </main>
  );
}
