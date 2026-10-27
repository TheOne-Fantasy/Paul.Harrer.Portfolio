import type { Metadata } from 'next';
import { Shell } from '../../chemin/FirstScreen';
import Voiture from '../../chemin/Voiture';

// La voiture suiveuse, en anglais.
export const metadata: Metadata = {
  title: 'In the team car | Paul Harrer',
  description: 'The editing tools Paul Harrer builds with AI, an art direction for AS Can Mines, and concept work: vertical edits and posters.',
  alternates: { canonical: '/en/work', languages: { fr: '/work', en: '/en/work' } },
};

export default function WorkPageEnglish() {
  return (
    <Shell painted scroll lang="en" alt="/work">
      <Voiture />
    </Shell>
  );
}
