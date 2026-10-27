import type { Metadata } from 'next';
import FirstScreen from '../../chemin/FirstScreen';

// Essai : l'accueil avec la route vue du dessus qui serpente entre les étapes.
export const metadata: Metadata = {
  title: 'Essai, la route | Paul Harrer',
  robots: { index: false },
};

export default function EssaiRoute() {
  return <FirstScreen variant="asphalte" scroll road alt="/en" />;
}
