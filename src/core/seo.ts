import { appConfig } from "./config";

export type TSEOPage = {
  title?: string;
  description?: string;
  keywords?: string[];
  canonical?: string;
  noindex?: boolean;
};

export function generatePageMetadata(page: TSEOPage) {
  const baseTitle = `${appConfig.applicationName} - Beautiful React Code Block Component`;
  const title = page.title ? `${page.title} | ${appConfig.applicationName}` : baseTitle;
  
  return {
    title,
    description: page.description || "A feature-rich, customizable React/Next.js code display component with syntax highlighting, search functionality, keyboard shortcuts, and interactive features.",
    keywords: [
      ...(page.keywords || []),
      "react code block",
      "syntax highlighting",
      "code component",
      "developer tools",
    ],
    canonical: page.canonical || appConfig.website,
    robots: page.noindex ? "noindex,nofollow" : "index,follow",
    openGraph: {
      title,
      description: page.description,
      url: page.canonical || appConfig.website,
      siteName: appConfig.applicationName,
    },
    twitter: {
      title,
      description: page.description,
    },
  };
}

export function generateStructuredData() {
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": `${appConfig.website}#website`,
        url: appConfig.website,
        name: appConfig.applicationName,
        description: "Beautiful React Code Block Component with syntax highlighting and interactive features",
        publisher: {
          "@id": `${appConfig.githubProfile}#person`,
        },
        inLanguage: "en-US",
      },
      {
        "@type": "WebPage",
        "@id": `${appConfig.website}#webpage`,
        url: appConfig.website,
        name: `${appConfig.applicationName} - Beautiful React Code Block Component`,
        isPartOf: {
          "@id": `${appConfig.website}#website`,
        },
        about: {
          "@id": `${appConfig.githubProfile}#person`,
        },
        description: "A feature-rich, customizable React/Next.js code display component with syntax highlighting, search functionality, keyboard shortcuts, and interactive features.",
        inLanguage: "en-US",
      },
      {
        "@type": "Person",
        "@id": `${appConfig.githubProfile}#person`,
        name: appConfig.author,
        url: appConfig.githubProfile,
        sameAs: [
          appConfig.githubProfile,
          `https://twitter.com/${appConfig.githubHandle}`,
        ],
      },
      {
        "@type": "SoftwareApplication",
        name: appConfig.applicationName,
        description: "A feature-rich, customizable React/Next.js code display component with syntax highlighting, search functionality, keyboard shortcuts, and interactive features.",
        url: appConfig.website,
        downloadUrl: appConfig.repositoryLink,
        author: {
          "@id": `${appConfig.githubProfile}#person`,
        },
        applicationCategory: "DeveloperApplication",
        operatingSystem: "Web Browser",
        offers: {
          "@type": "Offer",
          price: "0",
          priceCurrency: "USD",
        },
        screenshot: `${appConfig.website}/og-image.png`,
        softwareVersion: appConfig.version,
        programmingLanguage: ["TypeScript", "JavaScript", "React"],
        codeRepository: appConfig.repositoryLink,
        license: "https://opensource.org/licenses/MIT",
        keywords: "react, code block, syntax highlighting, developer tools, component",
      },
      {
        "@type": "Organization",
        "@id": `${appConfig.githubProfile}#organization`,
        name: appConfig.author,
        url: appConfig.githubProfile,
        logo: {
          "@type": "ImageObject",
          url: `${appConfig.website}/logo.png`,
        },
        sameAs: [
          appConfig.githubProfile,
          `https://twitter.com/${appConfig.githubHandle}`,
        ],
      },
    ],
  };

  return JSON.stringify(structuredData, null, 2);
}

export function generateBreadcrumbStructuredData(breadcrumbs: Array<{ name: string; url: string }>) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: breadcrumbs.map((crumb, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: crumb.name,
      item: crumb.url,
    })),
  };

  return JSON.stringify(structuredData, null, 2);
}

export function generateFAQStructuredData(faqs: Array<{ question: string; answer: string }>) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  return JSON.stringify(structuredData, null, 2);
}

export function generateHowToStructuredData(title: string, steps: Array<{ name: string; text: string }>) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: title,
    description: `Learn how to ${title.toLowerCase()}`,
    step: steps.map((step, index) => ({
      "@type": "HowToStep",
      position: index + 1,
      name: step.name,
      text: step.text,
    })),
  };

  return JSON.stringify(structuredData, null, 2);
}
