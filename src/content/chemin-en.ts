// Le même parcours en anglais. Seuls les mots changent : les années, les photos, les logos
// et la place des étiquettes viennent du fichier français, pour que les deux versions ne
// puissent pas diverger.
import { SIDE, STAGES, type Figure, type Side, type Stage } from './chemin';

interface Words {
  when: string;
  kind: string;
  name: string;
  detail: string;
  alts: string[];       // une par photo, dans le même ordre
  links?: string[];     // un libellé par lien, dans le même ordre
  figures?: Figure[];
}

const EN: Record<string, Words> = {
  cfpj: {
    when: '2015',
    kind: 'Start',
    name: 'CFPJ and Basket USA',
    detail: 'In 2015, I start a master’s degree in digital journalism at CFPJ, on a work-study contract as a journalist at Basket USA.',
    alts: ['CFPJ, rue du Louvre in Paris'],
  },
  'first-team': {
    when: '2017',
    kind: 'Category 4 climb',
    name: 'First Team',
    detail: 'In 2017, I co-found First Team’s sports outlet, at Webedia then Influx. Everything has to be built: I am journalist, director, video editor and community manager at once.',
    alts: ['The First Day Show set, First Team’s NBA show', 'From the First Day Show, First Team’s NBA show'],
  },
  'sports-us-travels': {
    when: 'August 2017 to August 2025',
    kind: 'Category 3 climb',
    name: 'Sports US Travels',
    detail: 'From August 2017 to August 2025, I co-found and run Sports US Travels, a travel agency built around American sports. I handle its digital communication and look after travellers on site.',
    alts: ['With my two Sports US Travels partners'],
    links: ['@sportsustravels, on Instagram'],
    figures: [
      { value: '8 years', label: 'of the agency, August 2017 to August 2025' },
      { value: '4', label: 'leagues: NBA, NFL, MLB and NHL' },
    ],
  },
  'ft-sports': {
    when: '2020',
    kind: 'Category 2 climb',
    name: 'FT Sports shows',
    detail: 'In 2020, I launch Roue Libre, my first show, then Les Pistonnés and Bureau Ovale on FT Sports, First Team’s sister channel.',
    alts: ['The Roue Libre set'],
  },
  echappee: {
    when: '2020',
    kind: 'Intermediate sprint',
    name: 'L’Échappée and Clutch',
    detail: 'The same year, I co-found and host L’Échappée with Winamax, the first cycling talk show on French digital media, from the Grand Tours to the Classics. I also become an NBA analyst on Clutch.',
    alts: ['On the L’Échappée set', 'On air for L’Échappée’s 2026 awards'],
    links: ['L’Échappée’s 2026 season preview, on YouTube', 'L’Échappée’s 2026 awards, on YouTube', 'Clutch, France vs Germany, on YouTube'],
  },
  redacteur: {
    when: '2021',
    kind: 'Category 1 climb',
    name: 'Editor-in-chief',
    detail: 'From 2021, I become First Team’s editor-in-chief, then head of digital leading the community managers. Each account has its own editorial line, built for its audience. I also work with the sponsors, on product placements and on tracking deliverables and KPIs.',
    alts: ['Interviewing Victor Wembanyama for First Team', 'From the interview with Zaccharie Risacher, for First Team'],
    links: ['Zaccharie Risacher, the interview, on YouTube'],
  },
  terrain: {
    when: '2021 to 2025',
    kind: 'Cobbled sector',
    name: 'In the field',
    detail: 'From 2021 to 2025, I cover the Top 14 final, the NBA All-Star Game, the Basketball World Cup, the EuroBasket, Paris-Roubaix, the WEC, and the Tour de France almost every summer.',
    alts: [
      'Basketball World Cup 2023, Manila',
      'Les Pistonnés’ vlog at the WEC, in Qatar',
      'NBA All-Star Game 2022, Cleveland',
      'Paris-Roubaix, the Tilloy cobbled sector',
      'WEC, the Alpine Endurance Team paddock',
      'Tour de France',
      'Interviewing Rudy Gobert, Los Angeles',
      'Filming courtside, NBA',
      'Basketball World Cup 2023, with the First Team crew',
    ],
    links: ['The WEC vlog in Qatar, on YouTube'],
  },
  '600k': {
    when: '2025',
    kind: 'Hors catégorie climb',
    name: '600,000 followers',
    detail: 'In 2025, with the team, First Team’s accounts pass 600,000 combined followers on Instagram, TikTok, X, Facebook and YouTube. They started from zero.',
    alts: ['Filming courtside at a basketball game', 'Kevin Durant’s mark on the NBA, a video posted on First Team’s Instagram'],
    links: ['The video, on Instagram', 'First Day Show, the Lakers knocked out, on YouTube'],
    figures: [
      { value: '600,000', label: 'combined followers' },
      { value: '2,000+', label: 'shows produced' },
    ],
  },
  cylindrique: {
    when: 'Since October 2025',
    kind: 'Attack',
    name: 'Cylindrique',
    detail: 'Since October 2025, as a freelancer with Cylindrique, I build the content strategy and art direction of two national sports federations, including the Confédération Française de Jiu-Jitsu Brésilien.',
    alts: ['The CFJJB’s media strategy guide, online'],
    figures: [
      { value: '86', label: 'page strategy guide for the CFJJB' },
      { value: '2', label: 'charters, visual and editorial' },
      { value: '90', label: 'day roadmap' },
    ],
  },
  'oh-my-goal': {
    when: 'December 2025 to August 2026',
    kind: 'Final climb',
    name: 'Oh My Goal',
    detail: 'From December 2025 to August 2026, I am Content Strategist and Influence Manager for Oh My Goal (Blue Foxes). The editorial strategy runs through recruiting and coaching creators.',
    alts: ['My LinkedIn post on the adidas deal landed by a creator we coached'],
    links: ['The post, on LinkedIn'],
    figures: [
      { value: '3 days', label: 'for a creator format to land a deal with adidas' },
      { value: '10M+', label: 'followers for this football media' },
    ],
  },
  'the-one': {
    when: 'February 2026',
    kind: 'Solo breakaway',
    name: 'The One Fantasy',
    detail: 'In 2026, I design and build a cycling prediction game with Claude, launched in February and then sold.',
    alts: ['A launch visual for The One Fantasy Cycling'],
    figures: [
      { value: '4,160', label: 'sign-ups' },
      { value: '86%', label: 'activation' },
      { value: '94,409', label: 'predictions' },
    ],
  },
  dazn: {
    when: 'Since September 2026',
    kind: 'Final kilometre',
    name: 'DAZN',
    detail: 'Since September 2026, I have been a multi-sport commentator for DAZN, with the NFL on Sunday nights. And still L’Échappée.',
    alts: ['The NFL, which I call on Sunday nights for DAZN'],
  },
};

export const STAGES_EN: Stage[] = STAGES.map((s) => {
  const w = EN[s.id];
  return {
    ...s,
    when: w.when,
    kind: w.kind,
    name: w.name,
    detail: w.detail,
    photos: s.photos?.map((p, i) => ({ ...p, alt: w.alts[i] })),
    links: s.links?.map((l, i) => ({ ...l, label: w.links?.[i] ?? l.label })),
    figures: w.figures ?? s.figures,
  };
});

export const SIDE_EN: Side = {
  ...SIDE,
  title: 'In the team car',
  lede: 'Beside the stages, the editing tools I build with AI.',
  paragraphs: [
    'The first, built with Claude, turns a studio clip into a vertical reel edited and styled in code: reframing on the face, zooms timed to the pauses, word-by-word subtitles and cards synced to speech. These two L’Échappée reels come out of it.',
    'The second cuts match footage into vertical and square clips, subtitled, with four looks to choose from.',
  ],
  tools: 'Python, FFmpeg, Whisper, OpenCV and GSAP',
  reels: [
    { ...SIDE.reels[0], alt: 'L’Échappée reel: Evenepoel out of the top 5?' },
    { ...SIDE.reels[1], alt: 'L’Échappée reel: Mea Culpa, the trial' },
  ],
};
