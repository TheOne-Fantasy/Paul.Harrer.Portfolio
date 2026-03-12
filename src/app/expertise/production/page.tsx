import allDataRaw from '../../../data.json';
import { PortfolioData } from '@/types/portfolio';
import { Metadata } from 'next';
import ProductionClient from '@/components/ProductionClient';

export const metadata: Metadata = {
  title: "Production Créative | Paul Harrer",
  description: "Réalisation multi-cam, live production et supervision technique d'émissions digitales.",
};

const allData = allDataRaw as PortfolioData;

export default function ProductionPage() {
  return <ProductionClient allData={allData} />;
}
