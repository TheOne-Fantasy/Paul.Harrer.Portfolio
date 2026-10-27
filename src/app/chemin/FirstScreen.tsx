import { Big_Shoulders, Onest, Unbounded } from 'next/font/google';
import { TEXTES, type Lang } from '@/content/textes';
import Course from './Course';
import Defile from './Defile';
import { LangProvider } from './Lang';
import styles from './chemin.module.css';

// Unbounded pour le nom, Big Shoulders pour les étapes et les chiffres, Onest pour le texte.
const name = Unbounded({ variable: '--font-name', weight: ['800'], subsets: ['latin'] });
const display = Big_Shoulders({ variable: '--font-display', weight: ['800'], subsets: ['latin'] });
const text = Onest({ variable: '--font-text', weight: ['400', '600', '700'], subsets: ['latin'] });

// Premier écran commun aux deux pistes d'identité, le temps que Paul choisisse :
// « route » (livre de route imprimé) ou « asphalte » (nom peint sur la chaussée).
// Avec scroll, les étapes se lisent aussi en défilant sous le premier écran. lang choisit la
// langue de la page, alt donne l'adresse de la même page dans l'autre langue.
export default function FirstScreen({
  variant,
  scroll = false,
  lang = 'fr',
  alt,
}: {
  variant: 'route' | 'asphalte';
  scroll?: boolean;
  lang?: Lang;
  alt?: string;
}) {
  const painted = variant === 'asphalte';
  const Ride = scroll ? Defile : Course;
  return (
    <main lang={lang} className={`${styles.main} ${painted ? styles.asphalte : ''} ${scroll ? styles.scroll : ''} ${name.variable} ${display.variable} ${text.variable}`}>
      {/* Le script tourne : ce qui doit entrer en scène peut attendre d'être vu. Sans lui,
          tout s'affiche d'emblée. */}
      <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
      {painted && (
        // Peinture usée : bords irréguliers, puis des manques où le bitume réapparaît.
        // La version fine déplace moins les bords, pour qu'un titre plus petit garde ses accents.
        <svg width="0" height="0" aria-hidden="true" className={styles.defs}>
          <filter id="peinture" x="-5%" y="-10%" width="110%" height="120%">
            <feTurbulence type="fractalNoise" baseFrequency="0.035" numOctaves="3" seed="7" result="ondes" />
            <feDisplacementMap in="SourceGraphic" in2="ondes" scale="7" xChannelSelector="R" yChannelSelector="G" result="bords" />
            <feTurbulence type="fractalNoise" baseFrequency="0.45" numOctaves="2" seed="3" result="grain" />
            <feColorMatrix in="grain" type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  14 0 0 0 -4" result="manques" />
            <feComposite in="bords" in2="manques" operator="in" />
          </filter>
          <filter id="peintureFine" x="-5%" y="-10%" width="110%" height="120%">
            <feTurbulence type="fractalNoise" baseFrequency="0.035" numOctaves="3" seed="7" result="ondes" />
            <feDisplacementMap in="SourceGraphic" in2="ondes" scale="2.5" xChannelSelector="R" yChannelSelector="G" result="bords" />
            <feTurbulence type="fractalNoise" baseFrequency="0.45" numOctaves="2" seed="3" result="grain" />
            <feColorMatrix in="grain" type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  14 0 0 0 -3" result="manques" />
            <feComposite in="bords" in2="manques" operator="in" />
          </filter>
        </svg>
      )}
      <LangProvider lang={lang} alt={alt}>
        <Ride>
          <h1 className={`${styles.title} ${painted ? styles.painted : ''}`}>Paul Harrer</h1>
          <p className={styles.lede}>{TEXTES[lang].lede}</p>
        </Ride>
      </LangProvider>
    </main>
  );
}
