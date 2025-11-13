import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import GrainEffect from "@/components/GrainEffect";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Clémentine Dufour - Portfolio",
  description: "Portfolio de Clémentine Dufour - Créations en 3D, vidéos et effets visuels",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <head>
        <link rel="stylesheet" href="https://use.typekit.net/xio7dzt.css" />
        <script defer src="https://umami.clemz.fr/script.js" data-website-id="509b9a84-432c-44f2-89a7-dec2240e42ef"></script>
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <GrainEffect />
        {children}
      </body>
    </html>
  );
}
