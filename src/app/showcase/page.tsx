"use client";

import { CodeBlock } from "@/components/code-block";
import { MultiFileCodeBlock } from "@/components/multi-file-code-block";
import { DiffCodeBlock } from "@/components/diff-code-block";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Code2, 
  Sparkles, 
  Zap, 
  Palette, 
  Search, 
  Copy, 
  Eye,
  Github,
  Star,
  Download
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
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 dark:from-slate-950 dark:via-purple-950 dark:to-slate-950 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Floating Code Symbols */}
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-white/10 text-4xl font-mono"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -20, 0],
              opacity: [0.1, 0.3, 0.1],
              rotate: [0, 180, 360],
            }}
            transition={{
              duration: 8 + Math.random() * 4,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          >
            {['<', '>', '{', '}', '(', ')', ';', '=', '+', '-', '*', '/'][Math.floor(Math.random() * 12)]}
          </motion.div>
        ))}
        
        {/* Gradient Orbs */}
        <motion.div
          className="absolute top-20 left-20 w-96 h-96 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            x: [0, 100, 0],
            y: [0, -50, 0],
          }}
          transition={{ duration: 8, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-20 right-20 w-80 h-80 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.3, 1],
            x: [0, -80, 0],
            y: [0, 60, 0],
          }}
          transition={{ duration: 10, repeat: Infinity, delay: 1 }}
        />
      </div>

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
          className="px-4 py-2 bg-white/20 backdrop-blur-sm rounded-lg text-white text-sm font-medium hover:bg-white/30 transition-colors"
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

      {/* Header */}
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative z-10 p-8"
      >
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <motion.div
            animate={{ rotate: [0, 5, -5, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="flex items-center gap-3"
          >
            <div className="p-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl">
              <Code2 className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white">Beautiful Code Block</h1>
              <p className="text-purple-200 text-sm">The most beautiful code component</p>
            </div>
          </motion.div>
          
          <div className="flex items-center gap-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={toggleTheme}
              className="p-3 bg-white/10 backdrop-blur-sm rounded-xl text-white hover:bg-white/20 transition-colors"
            >
              {isDarkMode ? '☀️' : '🌙'}
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2 px-4 py-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl text-white font-medium hover:from-purple-600 hover:to-pink-600 transition-all"
            >
              <Github className="w-5 h-5" />
              View on GitHub
            </motion.button>
          </div>
        </div>
      </motion.header>

      {/* Main Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-8 pb-16">
        {/* Hero Section */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-center mb-16"
        >
          <motion.div
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 3, repeat: Infinity }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-white mb-8"
          >
            <Sparkles className="w-5 h-5 text-yellow-400" />
            <span className="text-sm font-medium">Now Available</span>
          </motion.div>
          
          <h2 className="text-6xl font-bold text-white mb-6">
            The Most{" "}
            <motion.span
              animate={{ 
                backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
              }}
              transition={{ duration: 3, repeat: Infinity }}
              className="bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text text-transparent bg-[length:200%_100%]"
            >
              Beautiful
            </motion.span>
            <br />
            Code Block Component
          </h2>
          
          <p className="text-xl text-purple-200 mb-8 max-w-3xl mx-auto">
            Feature-rich, customizable, and stunningly beautiful code display component 
            with syntax highlighting, search, animations, and more.
          </p>
          
          <div className="flex justify-center gap-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl text-white font-semibold text-lg hover:from-purple-600 hover:to-pink-600 transition-all shadow-lg shadow-purple-500/25"
            >
              <Download className="w-6 h-6" />
              Get Started
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2 px-8 py-4 bg-white/10 backdrop-blur-sm rounded-xl text-white font-semibold text-lg hover:bg-white/20 transition-all border border-white/20"
            >
              <Star className="w-6 h-6" />
              Star on GitHub
            </motion.button>
          </div>
        </motion.div>

        {/* Demo Showcase */}
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="grid lg:grid-cols-2 gap-12 items-center mb-16"
        >
          {/* Demo Info */}
          <div className="space-y-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentDemo}
                initial={{ x: -50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: 50, opacity: 0 }}
                transition={{ duration: 0.5 }}
                className="space-y-4"
              >
                <div className={`inline-flex items-center gap-3 px-4 py-3 bg-gradient-to-r ${demos[currentDemo].color} rounded-xl text-white`}>
                  {demos[currentDemo].icon}
                  <span className="font-semibold">{demos[currentDemo].title}</span>
                </div>
                
                <h3 className="text-3xl font-bold text-white">
                  {demos[currentDemo].title}
                </h3>
                
                <p className="text-xl text-purple-200">
                  {demos[currentDemo].description}
                </p>
                
                <div className="flex gap-2">
                  {demos.map((_, index) => (
                    <motion.div
                      key={index}
                      className={`w-3 h-3 rounded-full ${
                        index === currentDemo ? 'bg-purple-400' : 'bg-white/30'
                      }`}
                      animate={{
                        scale: index === currentDemo ? [1, 1.2, 1] : 1,
                      }}
                      transition={{ duration: 0.5 }}
                    />
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Code Block Demo */}
          <motion.div
            animate={{
              scale: animationPhase === 0 ? [1, 1.02, 1] : 1,
              rotateY: animationPhase === 1 ? [0, 5, 0] : 0,
            }}
            transition={{ duration: 2 }}
            className="relative"
          >
            <motion.div
              animate={{
                boxShadow: [
                  "0 0 0 0 rgba(168, 85, 247, 0.4)",
                  "0 0 0 20px rgba(168, 85, 247, 0)",
                  "0 0 0 0 rgba(168, 85, 247, 0)",
                ],
              }}
              transition={{ duration: 2, repeat: Infinity }}
              className="absolute -inset-4 rounded-2xl"
            />
            
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
          </motion.div>
        </motion.div>

        {/* Features Grid */}
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {[
            { icon: <Zap className="w-8 h-8" />, title: "110+ Languages", desc: "Comprehensive syntax highlighting" },
            { icon: <Search className="w-8 h-8" />, title: "Smart Search", desc: "Find code instantly with Cmd+F" },
            { icon: <Copy className="w-8 h-8" />, title: "One-Click Copy", desc: "Copy code with Cmd+C" },
            { icon: <Eye className="w-8 h-8" />, title: "Line Highlighting", desc: "Interactive line selection" },
          ].map((feature, index) => (
            <motion.div
              key={index}
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.8 + index * 0.1 }}
              whileHover={{ y: -5, scale: 1.02 }}
              className="p-6 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 text-center group hover:bg-white/10 transition-all"
            >
              <div className="text-purple-400 mb-4 group-hover:text-purple-300 transition-colors">
                {feature.icon}
              </div>
              <h4 className="text-white font-semibold mb-2">{feature.title}</h4>
              <p className="text-purple-200 text-sm">{feature.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
