import type { Metadata } from 'next';
import FirstScreen from './chemin/FirstScreen';

// L'accueil : le parcours de Paul en profil d'étape, à lire en défilant.
export const metadata: Metadata = {
  alternates: { canonical: '/', languages: { fr: '/', en: '/en' } },
  openGraph: { images: [{ url: '/og-paul-harrer.jpg', width: 1200, height: 630 }] },
  twitter: { images: ['/og-paul-harrer.jpg'] },
};

export default function Home() {
  return <FirstScreen variant="asphalte" scroll road alt="/en" />;
}
