import type { Metadata } from "next";
import { Space_Grotesk, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/layout/SmoothScroll";
import CursorGlow from "@/components/layout/CursorGlow";
import ScrollProgress from "@/components/layout/ScrollProgress";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "QuarryChain — The Blockchain Built for What's Next",
  description:
    "Layer 1 blockchain with 100,000 TPS, 3-second finality, and Delegated Proof of Stake consensus. Build, trade, and tokenize on QuarryChain.",
  icons: {
    icon: "/favicon.svg",
  },
  openGraph: {
    title: "QuarryChain — The Blockchain Built for What's Next",
    description:
      "Layer 1 blockchain with 100,000 TPS, 3-second finality, and Delegated Proof of Stake consensus.",
    type: "website",
    url: "https://quarrychain.network",
    images: [
      {
        url: "/og-image.svg",
        width: 1200,
        height: 630,
        alt: "QuarryChain — The Blockchain Built for What's Next",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "QuarryChain — The Blockchain Built for What's Next",
    description:
      "Layer 1 blockchain with 100,000 TPS, 3-second finality, and Delegated Proof of Stake consensus.",
    images: ["/og-image.svg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${inter.variable} ${jetbrainsMono.variable} dark`}
    >
      <body className="min-h-screen bg-bg-primary text-text-primary font-sans antialiased">
        <SmoothScroll />
        <ScrollProgress />
        <CursorGlow />
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
