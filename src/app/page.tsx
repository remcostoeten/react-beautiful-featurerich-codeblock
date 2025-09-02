import type { Metadata } from "next";
import { appConfig } from "../core/config";
import { HomeView } from "./view/home-view";

export const metadata: Metadata = {
  title: `${appConfig.applicationName} - Beautiful Code Block Component`,
  description: "A modern, feature-rich code block component for React/Next.js with syntax highlighting, search functionality, keyboard shortcuts, and interactive features.",
  authors: [{ name: appConfig.author }],
  keywords: [
    "code block",
    "syntax highlighting",
    "react",
    "next.js",
    "typescript",
    "component",
    "search",
    "keyboard shortcuts",
    "interactive",
    "copy to clipboard",
  ],
  openGraph: {
    title: `${appConfig.applicationName} - Beautiful Code Block Component`,
    description: "A modern, feature-rich code block component for React/Next.js with syntax highlighting, search functionality, keyboard shortcuts, and interactive features.",
    url: appConfig.website,
    siteName: appConfig.applicationName,
    images: [
      {
        url: `${appConfig.website}/og-image.png`,
        width: 1200,
        height: 630,
        alt: "Beautiful Code Block Component Preview",
      },
    ],
    locale: "en-US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `${appConfig.applicationName} - Beautiful Code Block Component`,
    description: "A modern, feature-rich code block component for React/Next.js with syntax highlighting, search functionality, keyboard shortcuts, and interactive features.",
    creator: `@${appConfig.githubHandle}`,
    images: [`${appConfig.website}/og-image.png`],
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
};

export default function HomePage() {
  return <HomeView />;
}
