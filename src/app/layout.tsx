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
  title: "Paul Harrer | Stratège digital & producteur créatif",
  description: "11 ans à construire des audiences dans le sport : un média mené à 600 000 abonnés, plus de 2000 émissions produites.",
  openGraph: {
    title: "Paul Harrer | Stratège digital & producteur créatif",
    description: "Expertise terrain au service de stratégies sociales d'envergure.",
    images: [{ url: '/Photo-Profil.jpg' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: "Paul Harrer | Stratège digital & producteur créatif",
    description: "Stratégies sociales et production créative.",
    images: ['/Photo-Profil.jpg'],
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
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
