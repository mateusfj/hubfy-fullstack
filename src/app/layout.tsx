import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { LayoutProviders } from "../lib/utils/providers/LayoutProviders";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Hubfy Fullstack",
  description:
    "Aplicação para gerenciamento de tarefas simples usando Next.js, React e TypeScript.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <LayoutProviders>{children}</LayoutProviders>
      </body>
    </html>
  );
}
