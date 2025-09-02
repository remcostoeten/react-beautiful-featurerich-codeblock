import { generateStructuredData } from "../core/seo";

export function StructuredData() {
  const structuredData = generateStructuredData();

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: structuredData }}
    />
  );
}
