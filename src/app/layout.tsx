import type { Metadata } from "next";
import { Anton, Work_Sans } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "@/context/LanguageContext";
import SmoothScroll from "@/components/SmoothScroll";

const anton = Anton({
  variable: "--font-anton",
  weight: "400",
  subsets: ["latin"],
});

const workSans = Work_Sans({
  variable: "--font-work-sans",
  weight: ["400", "600"],
  subsets: ["latin"],
});

const description =
  "Cofondateur du média sport de First Team, mené de zéro à plus de 600 000 abonnés, avec plus de 2 000 émissions réalisées. Animateur de L'Échappée, commentateur NFL pour DAZN.";

export const metadata: Metadata = {
  metadataBase: new URL('https://paul-harrer.vercel.app'),
  title: "Paul Harrer | Contenu, social media et production sport",
  description,
  openGraph: {
    title: "Paul Harrer | Contenu, social media et production sport",
    description,
    images: [{ url: '/media/wembanyama-plateau.jpg' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: "Paul Harrer | Contenu, social media et production sport",
    description,
    images: ['/media/wembanyama-plateau.jpg'],
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className={`${anton.variable} ${workSans.variable}`} suppressHydrationWarning>
      <head>
        {/* Active les entrées animées seulement quand le script tourne. */}
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
      </head>
      <body>
        <LanguageProvider>
          <SmoothScroll>
            {children}
          </SmoothScroll>
        </LanguageProvider>
      </body>
    </html>
  );
}
