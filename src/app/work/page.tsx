import type { Metadata } from 'next';
import WorkClient from '@/components/WorkClient';

export const metadata: Metadata = {
  title: 'Showreel | Paul Harrer',
  description:
    "Montages courts et narration sportive : rythme, accroches et formats natifs pour les réseaux sociaux.",
};

export default function WorkPage() {
  return <WorkClient />;
}
