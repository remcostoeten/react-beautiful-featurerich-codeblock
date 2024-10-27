import type { Metadata } from "next";
import localFont from "next/font/local";
import { config } from './core/config';
import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: config.applicationName,
  description: "A modern, feature-rich code block component with syntax highlighting and interactive features",
  authors: [{ name: config.author }],
  keywords: ["code block", "syntax highlighting", "react", "next.js", "typescript"],
  openGraph: {
    title: config.applicationName,
    description: "A modern, feature-rich code block component with syntax highlighting and interactive features",
    url: config.website,
    siteName: config.applicationName,
    images: [
      {
        url: `${config.website}/og-image.png`,
        width: 1200,
        height: 630,
      },
    ],
    locale: "en-US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: config.applicationName,
    description: "A modern, feature-rich code block component with syntax highlighting and interactive features",
    creator: `@${config.githubHandle}`,
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
  manifest: `${config.website}/site.webmanifest`,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} bg-red-400 antialiased `}
      >
        {children}

      </body>
    </html>
  );
}
