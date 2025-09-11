import { CodeBlockView } from "@/components/code-block-view";
import Link from "next/link";

export const metadata = {
  title: "Beautiful Code Block Component",
  description: "Showcase of a beautiful, syntax-highlighted code block component with copy functionality and theme support.",
};

export default function HomePage() {
  return (
    <div className="relative">
      {/* Navigation */}
      <nav className="fixed top-4 left-4 z-50 flex gap-2">
        <Link 
          href="/"
          className="px-4 py-2 bg-white/10 backdrop-blur-sm rounded-lg text-white text-sm font-medium hover:bg-white/20 transition-colors"
        >
          Demo
        </Link>
        <Link 
          href="/showcase"
          className="px-4 py-2 bg-white/10 backdrop-blur-sm rounded-lg text-white text-sm font-medium hover:bg-white/20 transition-colors"
        >
          Showcase
        </Link>
        <Link 
          href="/cover"
          className="px-4 py-2 bg-white/10 backdrop-blur-sm rounded-lg text-white text-sm font-medium hover:bg-white/20 transition-colors"
        >
          Cover
        </Link>
      </nav>
      
      <CodeBlockView />
    </div>
  );
}

