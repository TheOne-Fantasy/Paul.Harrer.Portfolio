import type { Metadata } from 'next';
import { Shell } from '../chemin/FirstScreen';
import Voiture from '../chemin/Voiture';

// La voiture suiveuse : outils de montage par IA, direction artistique et travaux de concept.
export const metadata: Metadata = {
  title: 'Dans la voiture suiveuse | Paul Harrer',
  description: 'Les outils de montage que Paul Harrer construit avec l’IA, la direction artistique de l’AS Can Mines et des travaux de concept : montages verticaux et affiches.',
  alternates: { canonical: '/work', languages: { fr: '/work', en: '/en/work' } },
};

export default function WorkPage() {
  return (
    <Shell painted scroll alt="/en/work">
      <Voiture />
    </Shell>
  );
}
