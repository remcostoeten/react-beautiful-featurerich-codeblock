"use client";

import { CodeBlock } from "@/components/code-block";
import { MultiFileCodeBlock } from "@/components/multi-file-code-block";
import { DiffCodeBlock } from "@/components/diff-code-block";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Code2, 
  Zap, 
  Palette, 
  Search, 
  Copy, 
  Eye
} from "lucide-react";
import Link from "next/link";

const showcaseCode = `// Beautiful Code Block Component
import { CodeBlock } from '@/components/code-block';

export function App() {
  return (
    <CodeBlock
      code={\`async function fetchUserData(userId) {
  try {
    const response = await fetch(\`/api/users/\${userId}\`);
    const userData = await response.json();
    return userData;
  } catch (error) {
    console.error('Error:', error);
    return null;
  }
}\`}
      language="typescript"
      fileName="user-service.ts"
      badges={[
        { text: "TypeScript", variant: "primary" },
        { text: "Async", variant: "secondary" }
      ]}
      showLineNumbers
      enableLineHighlight
      enableLineHover
      showIcon
    />
  );
}`;

const multiFileCode = [
  {
    name: "App.tsx",
    language: "typescript",
    code: `import { useState } from 'react';
import { CodeBlock } from '@/components/code-block';

export function App() {
  const [theme, setTheme] = useState('light');
  
  return (
    <div className="p-4">
      <CodeBlock
        code="console.log('Hello World!');"
        language="javascript"
        theme={theme}
      />
    </div>
  );
}`,
    badges: [{ text: "React", variant: "primary" as const }]
  },
  {
    name: "styles.css",
    language: "css",
    code: `.code-block {
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  overflow: hidden;
}

.code-block pre {
  margin: 0;
  padding: 1rem;
}`,
    badges: [{ text: "CSS", variant: "secondary" as const }]
  }
];

const diffCode = {
  oldCode: `function greet(name) {
  return "Hello " + name;
}`,
  newCode: `function greet(name, title = "") {
  const prefix = title ? title + " " : "";
  return "Hello " + prefix + name + "!";
}`
};

export default function ShowcasePage() {
  const [currentDemo, setCurrentDemo] = useState(0);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [animationPhase, setAnimationPhase] = useState(0);

  const demos = [
    {
      title: "Beautiful Syntax Highlighting",
      description: "110+ languages with stunning visual appeal",
      icon: <Palette className="w-6 h-6" />,
      color: "from-purple-500 to-pink-500"
    },
    {
      title: "Interactive Search",
      description: "Find code instantly with Cmd+F",
      icon: <Search className="w-6 h-6" />,
      color: "from-blue-500 to-cyan-500"
    },
    {
      title: "Multi-File Support",
      description: "Switch between related files seamlessly",
      icon: <Code2 className="w-6 h-6" />,
      color: "from-green-500 to-emerald-500"
    },
    {
      title: "Diff Viewing",
      description: "Compare code changes with precision",
      icon: <Eye className="w-6 h-6" />,
      color: "from-orange-500 to-red-500"
    }
  ];

  // Auto-cycle through demos
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentDemo((prev) => (prev + 1) % demos.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [demos.length]);

  // Animation phases
  useEffect(() => {
    const interval = setInterval(() => {
      setAnimationPhase((prev) => (prev + 1) % 3);
    }, 2000);
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
          className="px-4 py-2 bg-gray-200 dark:bg-gray-700 rounded-lg text-gray-900 dark:text-gray-100 text-sm font-medium hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
        >
          Showcase
        </Link>
        <Link 
          href="/cover"
          className="px-4 py-2 bg-gray-100 dark:bg-gray-800 rounded-lg text-gray-700 dark:text-gray-300 text-sm font-medium hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
        >
          Cover
        </Link>
      </nav>

      {/* Header */}
      <motion.header
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 p-8"
      >
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-gray-100 dark:bg-gray-800 rounded-xl">
              <Code2 className="w-8 h-8 text-gray-700 dark:text-gray-300" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Beautiful Code Block</h1>
              <p className="text-gray-600 dark:text-gray-400 text-sm">Component showcase</p>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <button
              onClick={toggleTheme}
              className="p-3 bg-gray-100 dark:bg-gray-800 rounded-xl text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
            >
              {isDarkMode ? '☀️' : '🌙'}
            </button>
          </div>
        </div>
      </motion.header>

      {/* Main Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-8 pb-16">
        {/* Hero Section */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-6">
            Component Showcase
          </h2>
          
          <p className="text-lg text-gray-600 dark:text-gray-400 mb-8 max-w-3xl mx-auto">
            Explore the different features and capabilities of the Beautiful Code Block component.
          </p>
        </motion.div>

        {/* Demo Showcase */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="space-y-12 mb-16"
        >
          {/* Demo Info */}
          <div className="text-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentDemo}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -20, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="space-y-4"
              >
                <div className="inline-flex items-center gap-3 px-4 py-2 bg-gray-100 dark:bg-gray-800 rounded-lg text-gray-700 dark:text-gray-300">
                  {demos[currentDemo].icon}
                  <span className="font-medium">{demos[currentDemo].title}</span>
                </div>
                
                <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                  {demos[currentDemo].title}
                </h3>
                
                <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                  {demos[currentDemo].description}
                </p>
                
                <div className="flex justify-center gap-2">
                  {demos.map((_, index) => (
                    <div
                      key={index}
                      className={`w-2 h-2 rounded-full ${
                        index === currentDemo ? 'bg-gray-600 dark:bg-gray-400' : 'bg-gray-300 dark:bg-gray-600'
                      }`}
                    />
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Code Block Demo */}
          <div className="relative">
            
            {currentDemo === 0 && (
              <CodeBlock
                code={showcaseCode}
                language="typescript"
                fileName="showcase.tsx"
                badges={[
                  { text: "React", variant: "primary" },
                  { text: "TypeScript", variant: "secondary" },
                  { text: "Beautiful", variant: "success" }
                ]}
                showLineNumbers
                enableLineHighlight
                enableLineHover
                showIcon
                maxHeight="400px"
              />
            )}
            
            {currentDemo === 1 && (
              <CodeBlock
                code={`// Search Demo - Try Cmd+F or Ctrl+F
function searchInCode(query, code) {
  const lines = code.split('\\n');
  const results = [];
  
  lines.forEach((line, index) => {
    if (line.toLowerCase().includes(query.toLowerCase())) {
      results.push(index + 1);
    }
  });
  
  return results;
}

// Example usage
const code = \`function greet(name) {
  return "Hello " + name;
}\`;

const searchResults = searchInCode("function", code);
console.log("Found on lines:", searchResults);`}
                language="javascript"
                fileName="search-demo.js"
                badges={[
                  { text: "Search", variant: "primary" },
                  { text: "Interactive", variant: "secondary" }
                ]}
                showLineNumbers
                enableLineHighlight
                showIcon
                maxHeight="400px"
              />
            )}
            
            {currentDemo === 2 && (
              <MultiFileCodeBlock
                files={multiFileCode}
                showLineNumbers
                enableLineHighlight
                enableLineHover
              />
            )}
            
            {currentDemo === 3 && (
              <DiffCodeBlock
                fileName="greet.js"
                language="javascript"
                oldCode={diffCode.oldCode}
                newCode={diffCode.newCode}
              />
            )}
          </div>
        </motion.div>

        {/* Features Grid */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {[
            { icon: <Zap className="w-6 h-6" />, title: "110+ Languages", desc: "Comprehensive syntax highlighting" },
            { icon: <Search className="w-6 h-6" />, title: "Smart Search", desc: "Find code instantly with Cmd+F" },
            { icon: <Copy className="w-6 h-6" />, title: "One-Click Copy", desc: "Copy code with Cmd+C" },
            { icon: <Eye className="w-6 h-6" />, title: "Line Highlighting", desc: "Interactive line selection" },
          ].map((feature, index) => (
            <div
              key={index}
              className="p-6 bg-gray-50 dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-700 text-center group hover:bg-gray-100 dark:hover:bg-gray-800 transition-all"
            >
              <div className="text-gray-600 dark:text-gray-400 mb-4 group-hover:text-gray-700 dark:group-hover:text-gray-300 transition-colors">
                {feature.icon}
              </div>
              <h4 className="text-gray-900 dark:text-gray-100 font-semibold mb-2">{feature.title}</h4>
              <p className="text-gray-600 dark:text-gray-400 text-sm">{feature.desc}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
