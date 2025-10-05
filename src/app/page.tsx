import { CodeBlockView } from "@/components/code-block-view";
import { Suspense } from "react";

export const metadata = {
  title: "Beautiful Code Block Component",
  description: "Showcase of a beautiful, syntax-highlighted code block component with copy functionality and theme support.",
};

function LoadingFallback() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 dark:border-white"></div>
    </div>
  );
}

export default function HomePage() {
  return (
    <div className="relative">
      <Suspense fallback={<LoadingFallback />}>
        <CodeBlockView />
      </Suspense>
    </div>
  );
}

