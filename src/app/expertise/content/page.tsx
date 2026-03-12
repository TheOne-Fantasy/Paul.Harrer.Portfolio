import allDataRaw from '../../../data.json';
import { PortfolioData } from '@/types/portfolio';
import { Metadata } from 'next';
import ContentClient from '@/components/ContentClient';

export const metadata: Metadata = {
  title: "Content Creation & Hosting | Paul Harrer",
  description: "Expertise éditoriale, animation d'émissions et création de contenus immersifs.",
};

const allData = allDataRaw as PortfolioData;

export default function ContentPage() {
  return <ContentClient allData={allData} />;
}
