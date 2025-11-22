import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import { ErrorBoundary } from "@/components/ErrorBoundary";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: 'swap',
  preload: true,
});

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: '#c9a76f',
};

export const metadata: Metadata = {
  metadataBase: new URL('https://www.exevouches.com'),
  title: "Exe Vouches",
  description: "Pure chill community with daily VCs, giveaways, and nonstop good vibes — no toxicity, just family. EXE is back — louder, richer, and vibing harder than ever.",
  keywords: "EXE, vouches, discord community, gaming, giveaways, voice chat",
  authors: [{ name: "EXE Team" }],
  icons: {
    icon: "/exe.png",
    shortcut: "/exe.png",
    apple: "/exe.png",
  },
  openGraph: {
    title: "Exe Vouches",
    description: "Pure chill community with daily VCs, giveaways, and nonstop good vibes — no toxicity, just family.",
    type: "website",
    locale: "en_US",
    siteName: "Exe Vouches",
    images: [
      {
        url: "https://images-ext-1.discordapp.net/external/MtDdz6yEB-5BuhaCp5cBB9o5r3hTTMsgO5l5ea9_dDg/%3Fsize%3D1024/https/cdn.discordapp.com/banners/449751480375705601/fd2c333bb4b71d1f152ad61f96826a2c.png?format=webp&quality=lossless&width=800&height=428",
        width: 800,
        height: 428,
        alt: "EXE Banner",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Exe Vouches",
    description: "Pure chill community with daily VCs, giveaways, and nonstop good vibes — no toxicity, just family.",
    images: ["https://images-ext-1.discordapp.net/external/MtDdz6yEB-5BuhaCp5cBB9o5r3hTTMsgO5l5ea9_dDg/%3Fsize%3D1024/https/cdn.discordapp.com/banners/449751480375705601/fd2c333bb4b71d1f152ad61f96826a2c.png?format=webp&quality=lossless&width=800&height=428"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://cdn.discordapp.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://cdn.discordapp.com" />
        <link rel="dns-prefetch" href="https://media.discordapp.net" />
        <link rel="dns-prefetch" href="https://images-ext-1.discordapp.net" />
        <link 
          rel="preload" 
          href="https://cdn.discordapp.com/emojis/1360507855769305160.gif" 
          as="image"
          type="image/gif"
        />
      </head>
      <body className={`${inter.variable} font-sans bg-[#0a0a0a] text-white antialiased`}>
        <ErrorBoundary>
          <Header />
          <main className="pt-20">
            {children}
          </main>
        </ErrorBoundary>
      </body>
    </html>
  );
}
