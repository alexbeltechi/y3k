import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Y3K.Club",
  description: "6 weeks to (re)launch your dream project. Free to join, starts Nov 15.",
};

export const viewport: Viewport = {
  themeColor: "#002fa7",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
