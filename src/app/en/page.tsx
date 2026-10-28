import type { Metadata } from 'next';
import FirstScreen from '../chemin/FirstScreen';

// La version anglaise de l'accueil.
const title = 'Paul Harrer | Content and social media in sport';
const description = 'Co-founder of First Team’s sports outlet, grown from zero to 600,000+ followers, with 2,000+ shows produced. Host of L’Échappée, NFL commentator on DAZN.';

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: '/en', languages: { fr: '/', en: '/en' } },
  openGraph: { title, description, locale: 'en_GB', images: [{ url: '/og-paul-harrer.jpg', width: 1200, height: 630 }] },
  twitter: { card: 'summary_large_image', title, description, images: ['/og-paul-harrer.jpg'] },
};

export default function HomeEnglish() {
  return <FirstScreen variant="asphalte" scroll road lang="en" alt="/" />;
}
