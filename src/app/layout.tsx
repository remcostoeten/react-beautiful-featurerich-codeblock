import type { Metadata } from "next";
import localFont from "next/font/local";
import { appConfig } from "../core/config";
import { StructuredData } from "../components/structured-data";
import { Navigation } from "../components/navigation";
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

const title = `${appConfig.applicationName} - Beautiful React Code Block Component`;
const description = "A feature-rich, customizable React/Next.js code display component with syntax highlighting, search functionality, keyboard shortcuts, and interactive features. Copy-paste ready with smooth animations.";

export const metadata: Metadata = {
  title: {
    default: title,
    template: `%s | ${appConfig.applicationName}`,
  },
  description,
  authors: [
    { 
      name: appConfig.author,
      url: appConfig.githubProfile,
    }
  ],
  creator: appConfig.author,
  publisher: appConfig.author,
  keywords: [
    "react code block",
    "syntax highlighting",
    "code component",
    "react component",
    "next.js component",
    "typescript",
    "prism.js",
    "code display",
    "developer tools",
    "copy code",
    "search code",
    "line highlighting",
    "keyboard shortcuts",
    "framer motion",
    "tailwind css",
  ],
  category: "Developer Tools",
  classification: "Open Source Software",
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
  openGraph: {
    type: "website",
    locale: "en_US",
    url: appConfig.website,
    siteName: appConfig.applicationName,
    title,
    description,
    images: [
      {
        url: `${appConfig.website}/og-image.png`,
        width: 1200,
        height: 630,
        alt: `${appConfig.applicationName} - Beautiful React Code Block Component Preview`,
        type: "image/png",
      },
      {
        url: `${appConfig.website}/og-image-square.png`,
        width: 1200,
        height: 1200,
        alt: `${appConfig.applicationName} Square Logo`,
        type: "image/png",
      },
    ],
    videos: [
      {
        url: `${appConfig.website}/demo-video.mp4`,
        width: 1280,
        height: 720,
        type: "video/mp4",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    creator: `@${appConfig.githubHandle}`,
    site: `@${appConfig.githubHandle}`,
    images: [
      {
        url: `${appConfig.website}/og-image.png`,
        alt: `${appConfig.applicationName} Preview`,
      },
    ],
  },
  alternates: {
    canonical: appConfig.website,
    languages: {
      "en-US": appConfig.website,
    },
  },
  verification: {
    google: "your-google-verification-code",
    yandex: "your-yandex-verification-code",
    yahoo: "your-yahoo-verification-code",
  },
  icons: {
    icon: [
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    shortcut: "/favicon.ico",
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
    other: [
      {
        rel: "apple-touch-icon-precomposed",
        url: "/apple-touch-icon-precomposed.png",
      },
    ],
  },
  manifest: `${appConfig.website}/site.webmanifest`,
  applicationName: appConfig.applicationName,
  referrer: "origin-when-cross-origin",
  appLinks: {
    web: {
      url: appConfig.website,
      should_fallback: true,
    },
  },
  archives: [`${appConfig.repositoryLink}/releases`],
  assets: [`${appConfig.website}/assets`],
  bookmarks: [appConfig.website],
  other: {
    "msapplication-TileColor": "#000000",
    "msapplication-config": "/browserconfig.xml",
    "theme-color": "#000000",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" scroll-behavior="smooth">
      <head>
        <StructuredData />
      </head>
      <body suppressHydrationWarning
        className={`${geistSans.variable} ${geistMono.variable} bg-gradient-to-b from-zinc-900 to-zinc-800 antialiased `}
      >
        <Navigation />
        <div className="pt-16">
          {children}
        </div>
      </body>
    </html>
  );
}
