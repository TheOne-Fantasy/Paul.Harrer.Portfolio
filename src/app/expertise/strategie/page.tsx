import allDataRaw from '../../../data.json';
import { PortfolioData } from '@/types/portfolio';
import { Metadata } from 'next';
import StrategyClient from '@/components/StrategyClient';

export const metadata: Metadata = {
  title: "Stratégie Digitale | Paul Harrer",
  description: "Accompagnement éditorial, sourcing créateurs et performance sociale pour médias et marques.",
};

const allData = allDataRaw as PortfolioData;

export default function StrategyPage() {
  return <StrategyClient allData={allData} />;
}
