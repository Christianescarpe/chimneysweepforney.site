import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { HOME_PAGE } from "@/data/siteData";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-jakarta",
});

export const SITE_URL = "https://www.chimneysweepforney.site";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: HOME_PAGE.seoTitle,
  description: HOME_PAGE.metaDescription,
  verification: {
    google: "fkSeJPld_qTX8g3m_gL1cO-Dc1-nAuid0q6Eere8QBo",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: "/",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${jakarta.variable} antialiased`}>
      <body
        style={{ fontFamily: "var(--font-jakarta), sans-serif" }}
        className="min-h-screen flex flex-col bg-white text-slate-800"
      >
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
