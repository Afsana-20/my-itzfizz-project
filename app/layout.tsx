import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], weight: ["400", "700", "800", "900"] });

export const metadata: Metadata = {
  title: "ITZFIZZ – Scroll Animation",
  description: "Scroll-driven hero car animation built with Next.js, Tailwind, and GSAP",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
