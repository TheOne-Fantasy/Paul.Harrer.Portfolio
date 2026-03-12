'use client';
import { useState, useEffect, useRef } from 'react';
import styles from '../app/page.module.css';
import Image from 'next/image';
import { useLanguage } from '@/context/LanguageContext';
import { Language } from '@/types/portfolio';

interface NavbarProps {
  activeExpertise?: string;
}

export default function Navbar({ activeExpertise }: NavbarProps) {
  const { lang, setLang } = useLanguage();
  const [showContact, setShowContact] = useState(false);
  const [copied, setCopy] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleLangChange = (newLang: Language) => {
    setLang(newLang);
  };

  // 2. Fermeture au clic extérieur
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowContact(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // 3. Copier l'email
  const copyEmail = (e: React.MouseEvent) => {
    e.preventDefault();
    navigator.clipboard.writeText('paulharrer@hotmail.com');
    setCopy(true);
    setTimeout(() => setCopy(false), 2000);
  };

  return (
    <header className={styles.header}>
      <nav className={styles.nav}>
        <div className={styles.logoGroup}>
          <div className={styles.avatarWrapper}>
            <Image 
              src="/Photo-Profil.jpg" 
              alt="Paul Harrer" 
              width={40} 
              height={40} 
              className={styles.navAvatar}
              priority
            />
          </div>
          <div className={styles.logo}><a href="/">PAUL HARRER</a></div>
        </div>
        
        <div className={styles.navLinks}>
          <a href="/expertise/strategie" style={activeExpertise === 'strategie' ? {color: '#ff5c35'} : {}}>
            {lang === 'fr' ? 'Stratégie' : 'Strategy'}
          </a>
          <a href="/expertise/production" style={activeExpertise === 'production' ? {color: '#ff5c35'} : {}}>
            Production
          </a>
          <a href="/expertise/content" style={activeExpertise === 'content' ? {color: '#ff5c35'} : {}}>
            Content
          </a>
        </div>

        <div className={styles.navActions}>
          <div className={styles.langSwitcher}>
              <button 
                  className={lang === 'fr' ? styles.langActive : ''} 
                  onClick={() => handleLangChange('fr')}
              >FR</button>
              <span>|</span>
              <button 
                  className={lang === 'en' ? styles.langActive : ''} 
                  onClick={() => handleLangChange('en')}
              >EN</button>
          </div>
          
          <a href="/admin" className={styles.adminLink}>Admin</a>
          
          <div className={styles.contactWrapper} ref={dropdownRef}>
            <button 
              className={styles.contactCta}
              onClick={() => setShowContact(!showContact)}
            >
              {lang === 'fr' ? "Parlons-en" : "Let's talk"}
            </button>
            
            {showContact && (
              <div className={styles.contactDropdown}>
                <div className={styles.dropdownSection}>
                  <a href="mailto:paulharrer@hotmail.com" className={styles.dropdownItem}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
                    Email
                  </a>
                  <button onClick={copyEmail} className={styles.copyBtn}>
                    {copied ? (lang === 'fr' ? 'Copié !' : 'Copied!') : (lang === 'fr' ? 'Copier' : 'Copy')}
                  </button>
                </div>
                <div className={styles.dropdownSeparator}></div>
                <a href="https://www.linkedin.com/in/paul-harrer-b8759982/" target="_blank" rel="noopener noreferrer" className={styles.dropdownItem}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.761 0 5-2.239 5-5v-14c0-2.761-2.239-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
                  LinkedIn
                </a>
                <a href="https://www.instagram.com/plharrer/?hl=fr" target="_blank" rel="noopener noreferrer" className={styles.dropdownItem}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
                  Instagram
                </a>
                <a href="https://x.com/HarrerPaul" target="_blank" rel="noopener noreferrer" className={styles.dropdownItem}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
                  X (Twitter)
                </a>
              </div>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
}
