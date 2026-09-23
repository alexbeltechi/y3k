import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], weight: ["400", "500"], variable: "--font-inter" });

const title = "Y3K.Club";
const description = "(Re)launch your dream project in 6 weeks, starting Oct 14.";
const image = { url: "/Y3KSocialSharing.jpg", width: 1280, height: 900, alt: "Y3K" };

export const metadata: Metadata = {
  metadataBase: new URL("https://y3k.club"),
  title,
  description,
  openGraph: { type: "website", url: "/", siteName: title, title, description, images: [image] },
  twitter: { card: "summary_large_image", title, description, images: [image] },
};

export const viewport: Viewport = {
  themeColor: "#000000",
  viewportFit: "cover",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.variable}>
      <body>{children}</body>
    </html>
  );
}
