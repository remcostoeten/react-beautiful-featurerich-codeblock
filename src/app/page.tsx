import { CodeBlockView } from "@/components/code-block-view";
import Link from "next/link";

export const metadata = {
  title: "Beautiful Code Block Component",
  description: "Showcase of a beautiful, syntax-highlighted code block component with copy functionality and theme support.",
};

export default function HomePage() {
  return (
    <div className="relative">
      <CodeBlockView />
    </div>
  );
}

