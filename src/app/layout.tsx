import type { Metadata } from "next";
import localFont from "next/font/local";
import { appConfig } from "../core/config";
import "./globals.css";

const geistSans = localFont({
  src: "../core/fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "../core/fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: appConfig.applicationName,
  description:
    "A modern, feature-rich code block component with syntax highlighting and interactive features",
  authors: [{ name: appConfig.author }],
  keywords: [
    "code block",
    "syntax highlighting",
    "react",
    "next.js",
    "typescript",
  ],
  openGraph: {
    title: appConfig.applicationName,
    description:
      "A modern, feature-rich code block component with syntax highlighting and interactive features",
    url: appConfig.website,
    siteName: appConfig.applicationName,
    images: [
      {
        url: `${appConfig.website}/og-image.png`,
        width: 1200,
        height: 630,
      },
    ],
    locale: "en-US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: appConfig.applicationName,
    description:
      "A modern, feature-rich code block component with syntax highlighting and interactive features",
    creator: `@${appConfig.githubHandle}`,
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
  manifest: `${appConfig.website}/site.webmanifest`,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" scroll-behavior="smooth">
      <body suppressHydrationWarning
        className={`${geistSans.variable} ${geistMono.variable} bg-gradient-to-b from-zinc-900 to-zinc-800 antialiased `}
      >
        {children}
      </body>
    </html>
  );
}
