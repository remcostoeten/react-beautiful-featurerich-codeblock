"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "./code-block/button";
import { FileText, Home, Github } from "lucide-react";

const navigationItems = [
  {
    href: "/",
    label: "Demo",
    icon: <Home className="w-4 h-4" />
  },
  {
    href: "/single-file",
    label: "Single File",
    icon: <FileText className="w-4 h-4" />
  }
];

export function Navigation() {
  const pathname = usePathname();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-sm border-b border-gray-800">
      <div className="max-w-6xl mx-auto px-6 py-3">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link 
            href="/" 
            className="text-lg font-semibold text-blue-400 hover:text-blue-300 transition-colors"
          >
            Beautiful Code Block
          </Link>

          {/* Navigation Links */}
          <div className="flex items-center gap-2">
            {navigationItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Button
                  key={item.href}
                  variant={isActive ? "secondary" : "ghost"}
                  size="sm"
                  asChild
                  className={isActive ? "bg-blue-500/20 text-blue-400 border border-blue-500/30" : "text-gray-400 hover:text-white"}
                >
                  <Link href={item.href} className="flex items-center gap-2">
                    {item.icon}
                    {item.label}
                  </Link>
                </Button>
              );
            })}
            
            {/* GitHub Link */}
            <Button
              variant="ghost"
              size="sm"
              asChild
              className="text-gray-400 hover:text-white ml-2"
            >
              <a
                href="https://github.com/remcostoeten/react-next-beautifull-code-block-syntax-highlight-search-kbd"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2"
              >
                <Github className="w-4 h-4" />
                GitHub
              </a>
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
}
