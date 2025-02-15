import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ThemeProvider } from "@/providers/theme-provider"

import "./globals.css";
import { Container } from "@/components/container";
import Sidebar from "./_components/sidebar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Tender Board",
  description: "Tender Board",
  openGraph: {
    title: "Tender Board",
    description: "Tender Board",
    url: 'https://kanban-board-two-bay.vercel.app/',
    type: "website",
    images: [
      {
        url:
          'https://kanban-board-two-bay.vercel.app/og.png',
        width: 1200,
        height: 639,
        alt: 'Kanaban',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: "Tender Board",
    description: "Tender Board",
    images: [
      {
        url:
          'https://kanban-board-two-bay.vercel.app/og.png',
        width: 1200,
        height: 639,
        alt: 'Kanban',
      },
    ],
  },
}



export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased dark:bg-background`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
     
      <div className="flex h-full ">
        <Sidebar />
        <Container>{children}</Container>
      </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
