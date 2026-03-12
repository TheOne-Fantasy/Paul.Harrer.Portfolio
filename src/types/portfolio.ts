export type Language = 'fr' | 'en';

export interface HeroData {
  kicker: string;
  title: string;
  subtitle: string;
}

export interface ProjectData {
  name: string;
  detail: string;
}

export interface ExpertiseData {
  id: number;
  title: string;
  description: string;
  projects: ProjectData[];
}

export interface StatData {
  label: string;
  value: string;
}

export interface AboutData {
  title: string;
  text: string;
  cv: string;
  stats: StatData[];
}

export interface DevProject {
  name: string;
}

export interface DevData {
  title: string;
  projects: DevProject[];
}

export interface ContactData {
  title: string;
}

export interface LocalizedData {
  hero: HeroData;
  expertises: ExpertiseData[];
  about: AboutData;
  dev: DevData;
  contact: ContactData;
}

export interface BentoItem {
  id: number;
  label: string;
  image: string;
  x: number;
  y: number;
}

export interface ProjectMedia {
  link?: string;
  image?: string;
  subImage?: string;
  linkedinId?: string;
  instagramId?: string;
  youtubeId?: string;
}

export interface ExpertiseMedia {
  id: number;
  projects: ProjectMedia[];
}

export interface AboutMedia {
  image: string;
  x: number;
  y: number;
}

export interface CommonData {
  bento: BentoItem[];
  expertises_media: ExpertiseMedia[];
  about_media: AboutMedia;
}

export interface PortfolioData {
  fr: LocalizedData;
  en: LocalizedData;
  common: CommonData;
}
