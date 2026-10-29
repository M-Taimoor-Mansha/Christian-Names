import type { Metadata } from "next";
import Script from "next/script";
import { EB_Garamond } from "next/font/google";
import "./globals.css";
import { SITE_URL } from "@/lib/utils";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const garamond = EB_Garamond({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-garamond",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Christian Names: Baby Name Meanings, Origins & Bible References",
    template: "%s | Christian Names",
  },
  description:
    "Browse Christian boy and girl names with meanings, origins, pronunciation and Bible references. Find the perfect name for your baby.",
  openGraph: {
    type: "website",
    siteName: "Christian Names",
    url: SITE_URL,
  },
  twitter: { card: "summary_large_image" },
  alternates: { canonical: "/" },
  robots: { index: true, follow: true },
};

const ADSENSE_ID = process.env.NEXT_PUBLIC_ADSENSE_ID;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={garamond.variable}>
        <Navbar />
        <div className="page">
          {children}
          <Footer />
        </div>
        {ADSENSE_ID && (
          <Script
            async
            strategy="afterInteractive"
            src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_ID}`}
            crossOrigin="anonymous"
          />
        )}
      </body>
    </html>
  );
}
