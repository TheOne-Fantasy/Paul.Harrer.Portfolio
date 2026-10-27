import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "@/context/LanguageContext";
import SmoothScroll from "@/components/SmoothScroll";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://paul-harrer.vercel.app'),
  title: "Paul Harrer | Contenu et social media dans le sport",
  description: "Cofondateur du média sport de First Team, mené de zéro à plus de 600 000 abonnés, avec plus de 2 000 émissions réalisées. Animateur de L'Échappée, commentateur NFL sur DAZN.",
  openGraph: {
    title: "Paul Harrer | Contenu et social media dans le sport",
    description: "Cofondateur du média sport de First Team, mené de zéro à plus de 600 000 abonnés, avec plus de 2 000 émissions réalisées.",
    images: [{ url: '/Photo-Profil.jpg' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: "Paul Harrer | Contenu et social media dans le sport",
    description: "Cofondateur du média sport de First Team, mené de zéro à plus de 600 000 abonnés.",
    images: ['/Photo-Profil.jpg'],
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // La page parcours marque <html> d'une classe « js » avant l'hydratation : écart voulu.
    <html lang="fr" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <LanguageProvider>
          <SmoothScroll>
            {children}
          </SmoothScroll>
        </LanguageProvider>
      </body>
    </html>
  );
}
