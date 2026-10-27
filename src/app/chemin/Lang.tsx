'use client';
import { createContext, useContext, type ReactNode } from 'react';
import { SIDE, STAGES } from '@/content/chemin';
import { SIDE_EN, STAGES_EN } from '@/content/chemin-en';
import { TEXTES, type Lang } from '@/content/textes';

// La langue de la page : les mots de l'interface, les étapes et la voiture suiveuse dans
// cette langue, et l'adresse de la même page dans l'autre (alt, absente s'il n'y en a pas).
const words = (lang: Lang, alt?: string) => ({
  lang,
  alt,
  t: TEXTES[lang],
  stages: lang === 'en' ? STAGES_EN : STAGES,
  side: lang === 'en' ? SIDE_EN : SIDE,
});

const LangContext = createContext(words('fr'));

export function LangProvider({ lang, alt, children }: { lang: Lang; alt?: string; children: ReactNode }) {
  return <LangContext.Provider value={words(lang, alt)}>{children}</LangContext.Provider>;
}

export const useLang = () => useContext(LangContext);
