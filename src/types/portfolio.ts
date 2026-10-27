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
  // Preuve chiffrée et points forts montrés sur la porte d'entrée de l'accueil.
  proof: { value: string; label: string };
  highlights: string[];
  // Contenu propre à la page de l'expertise.
  figures: { value: string; label: string }[];
  steps?: { title: string; items: string[] };
  gallery?: { title: string; text: string; items: GalleryItem[] };
  tools?: string[];
  projects: ProjectData[];
}

export interface GalleryItem {
  caption: string;
  src?: string;
  instagramId?: string;
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

export interface SideItem {
  name: string;
  text: string;
  url: string;
  label: string;
}

export interface SideData {
  title: string;
  subtitle: string;
  items: SideItem[];
}

export interface TerrainData {
  title: string;
  text: string;
  link: string;
  items: { name: string; detail: string }[];
}

export interface DoorsData {
  title: string;
  subtitle: string;
  link: string;
}

export interface ContactData {
  title: string;
}

export interface TrustData {
  title: string;
}

export interface LocalizedData {
  hero: HeroData;
  expertises: ExpertiseData[];
  about: AboutData;
  doors: DoorsData;
  terrain: TerrainData;
  side: SideData;
  trust: TrustData;
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
  photo?: string;
  logos?: { src: string; name: string }[];
  linkedinId?: string;
  instagramId?: string;
  youtubeId?: string;
}

export interface ExpertiseMedia {
  id: number;
  hero?: { image: string; x: number; y: number };
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
