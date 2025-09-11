"use client";

import { CodeBlock } from "@/components/code-block";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { 
  Code2, 
  Zap, 
  Search, 
  Copy, 
  Eye,
  Star,
  Github
} from "lucide-react";
import Link from "next/link";

const coverCode = `// Beautiful Code Block Component
import { CodeBlock } from '@/components/code-block';

export function App() {
  return (
    <CodeBlock
      code={\`async function fetchUserData(userId) {
  try {
    const response = await fetch(\`/api/users/\${userId}\`);
    if (!response.ok) {
      throw new Error('Failed to fetch user data');
    }
    const userData = await response.json();
    return userData;
  } catch (error) {
    console.error('Error fetching user data:', error);
    return null;
  }
}\`}
      language="typescript"
      fileName="user-service.ts"
      badges={[
        { text: "TypeScript", variant: "primary" },
        { text: "Async", variant: "secondary" },
        { text: "Error Handling", variant: "success" }
      ]}
      showLineNumbers
      enableLineHighlight
      enableLineHover
      showIcon
    />
  );
}`;

export default function CoverPage() {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [animationPhase, setAnimationPhase] = useState(0);

  // Animation phases for cover photo
  useEffect(() => {
    const interval = setInterval(() => {
      setAnimationPhase((prev) => (prev + 1) % 4);
    }, 1500);
    return () => clearInterval(interval);
  }, []);

  const toggleTheme = () => {
    const root = document.documentElement;
    const newTheme = !isDarkMode;
    
    if (newTheme) {
      root.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      root.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
    
    setIsDarkMode(newTheme);
  };

  return (
    <div className="min-h-screen bg-white dark:bg-[rgb(11,11,11)] relative">

      {/* Main Content - Centered for Cover Photo */}
      <div className="relative z-10 min-h-screen flex items-center justify-center p-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ y: -30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <div className="inline-flex items-center gap-4 mb-8">
              <div className="p-4 bg-gray-100 dark:bg-gray-800 rounded-2xl">
                <Code2 className="w-12 h-12 text-gray-700 dark:text-gray-300" />
              </div>
              
              <div className="text-left">
                <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-2">Beautiful Code Block</h1>
                <div className="flex items-center gap-2">
                  <span className="text-gray-600 dark:text-gray-400 text-lg">Component showcase</span>
                </div>
              </div>
            </div>
            
            <h2 className="text-5xl font-bold text-gray-900 dark:text-gray-100 mb-6">
              Clean Code Display
            </h2>
            
            <p className="text-xl text-gray-600 dark:text-gray-400 mb-8 max-w-4xl mx-auto leading-relaxed">
              Feature-rich, customizable, and beautifully designed code display component 
              with syntax highlighting, search, and interactive features.
            </p>
          </motion.div>

          {/* Code Block Showcase */}
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="relative"
          >
            {/* Code Block */}
            <div className="relative">
              <CodeBlock
                code={coverCode}
                language="typescript"
                fileName="beautiful-codeblock.tsx"
                badges={[
                  { text: "React", variant: "primary" },
                  { text: "TypeScript", variant: "secondary" },
                  { text: "Beautiful", variant: "success" },
                  { text: "Interactive", variant: "warning" }
                ]}
                showLineNumbers
                enableLineHighlight
                enableLineHover
                showIcon
                maxHeight="500px"
              />
            </div>
          </motion.div>

          {/* Features */}
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6"
          >
            {[
              { icon: <Zap className="w-6 h-6" />, title: "110+ Languages" },
              { icon: <Search className="w-6 h-6" />, title: "Smart Search" },
              { icon: <Copy className="w-6 h-6" />, title: "One-Click Copy" },
              { icon: <Eye className="w-6 h-6" />, title: "Line Highlighting" },
            ].map((feature, index) => (
              <div
                key={index}
                className="text-center group"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-100 dark:bg-gray-800 rounded-2xl mb-4 group-hover:bg-gray-200 dark:group-hover:bg-gray-700 transition-all">
                  <div className="text-gray-600 dark:text-gray-400">
                    {feature.icon}
                  </div>
                </div>
                <h4 className="text-gray-900 dark:text-gray-100 font-semibold text-lg">{feature.title}</h4>
              </div>
            ))}
          </motion.div>

          {/* Action Buttons */}
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="flex justify-center gap-6 mt-12"
          >
            <button className="flex items-center gap-3 px-8 py-4 bg-gray-900 dark:bg-gray-100 rounded-2xl text-white dark:text-gray-900 font-semibold text-xl hover:bg-gray-800 dark:hover:bg-gray-200 transition-all">
              <Github className="w-6 h-6" />
              View on GitHub
            </button>
            
            <button className="flex items-center gap-3 px-8 py-4 bg-gray-100 dark:bg-gray-800 rounded-2xl text-gray-900 dark:text-gray-100 font-semibold text-xl hover:bg-gray-200 dark:hover:bg-gray-700 transition-all border border-gray-200 dark:border-gray-700">
              <Star className="w-6 h-6" />
              Star Project
            </button>
          </motion.div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="fixed top-4 left-4 z-50 flex gap-2">
        <Link 
          href="/"
          className="px-4 py-2 bg-gray-100 dark:bg-gray-800 rounded-lg text-gray-700 dark:text-gray-300 text-sm font-medium hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
        >
          Demo
        </Link>
        <Link 
          href="/showcase"
          className="px-4 py-2 bg-gray-100 dark:bg-gray-800 rounded-lg text-gray-700 dark:text-gray-300 text-sm font-medium hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
        >
          Showcase
        </Link>
        <Link 
          href="/cover"
          className="px-4 py-2 bg-gray-200 dark:bg-gray-700 rounded-lg text-gray-900 dark:text-gray-100 text-sm font-medium hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
        >
          Cover
        </Link>
      </nav>

      {/* Theme Toggle (Hidden for screenshots) */}
      <button
        onClick={toggleTheme}
        className="fixed top-4 right-4 z-50 p-3 bg-white/10 backdrop-blur-sm rounded-xl text-white hover:bg-white/20 transition-colors opacity-0"
        aria-label="Toggle theme"
      >
        {isDarkMode ? '☀️' : '🌙'}
      </button>
    </div>
  );
}
