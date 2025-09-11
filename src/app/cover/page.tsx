"use client";

import { CodeBlock } from "@/components/code-block";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { 
  Code2, 
  Sparkles, 
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
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 dark:from-slate-950 dark:via-purple-950 dark:to-slate-950 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Floating Code Symbols */}
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-white/5 text-6xl font-mono"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.05, 0.15, 0.05],
              rotate: [0, 180, 360],
            }}
            transition={{
              duration: 12 + Math.random() * 6,
              repeat: Infinity,
              delay: Math.random() * 3,
            }}
          >
            {['<', '>', '{', '}', '(', ')', ';', '=', '+', '-', '*', '/', '&', '|', '!'][Math.floor(Math.random() * 15)]}
          </motion.div>
        ))}
        
        {/* Gradient Orbs */}
        <motion.div
          className="absolute top-10 left-10 w-[500px] h-[500px] bg-gradient-to-r from-purple-500/15 to-pink-500/15 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.3, 1],
            x: [0, 150, 0],
            y: [0, -80, 0],
          }}
          transition={{ duration: 12, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-10 right-10 w-[400px] h-[400px] bg-gradient-to-r from-blue-500/15 to-cyan-500/15 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.4, 1],
            x: [0, -120, 0],
            y: [0, 100, 0],
          }}
          transition={{ duration: 15, repeat: Infinity, delay: 2 }}
        />
        <motion.div
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-emerald-500/10 to-teal-500/10 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 180, 360],
          }}
          transition={{ duration: 20, repeat: Infinity, delay: 1 }}
        />
      </div>

      {/* Main Content - Centered for Cover Photo */}
      <div className="relative z-10 min-h-screen flex items-center justify-center p-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <motion.div
              animate={{ rotate: [0, 5, -5, 0] }}
              transition={{ duration: 3, repeat: Infinity }}
              className="inline-flex items-center gap-4 mb-8"
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
                className="p-4 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl"
              >
                <Code2 className="w-12 h-12 text-white" />
              </motion.div>
              
              <div className="text-left">
                <h1 className="text-4xl font-bold text-white mb-2">Beautiful Code Block</h1>
                <div className="flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-yellow-400" />
                  <span className="text-purple-200 text-lg">The most beautiful code component</span>
                </div>
              </div>
            </motion.div>
            
            <motion.div
              animate={{ 
                backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
              }}
              transition={{ duration: 4, repeat: Infinity }}
              className="text-7xl font-bold mb-6 bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text text-transparent bg-[length:200%_100%]"
            >
              Stunning Code Display
            </motion.div>
            
            <p className="text-2xl text-purple-200 mb-8 max-w-4xl mx-auto leading-relaxed">
              Feature-rich, customizable, and stunningly beautiful code display component 
              with syntax highlighting, search, animations, and more.
            </p>
          </motion.div>

          {/* Code Block Showcase */}
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            {/* Glow Effect */}
            <motion.div
              animate={{
                boxShadow: [
                  "0 0 0 0 rgba(168, 85, 247, 0.4)",
                  "0 0 0 30px rgba(168, 85, 247, 0)",
                  "0 0 0 0 rgba(168, 85, 247, 0)",
                ],
              }}
              transition={{ duration: 3, repeat: Infinity }}
              className="absolute -inset-8 rounded-3xl"
            />
            
            {/* Code Block */}
            <motion.div
              animate={{
                scale: animationPhase === 0 ? [1, 1.02, 1] : 1,
                rotateY: animationPhase === 1 ? [0, 3, 0] : 0,
                rotateX: animationPhase === 2 ? [0, 2, 0] : 0,
              }}
              transition={{ duration: 2 }}
              className="relative"
            >
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
            </motion.div>
          </motion.div>

          {/* Features */}
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6"
          >
            {[
              { icon: <Zap className="w-8 h-8" />, title: "110+ Languages", color: "from-yellow-400 to-orange-500" },
              { icon: <Search className="w-8 h-8" />, title: "Smart Search", color: "from-blue-400 to-cyan-500" },
              { icon: <Copy className="w-8 h-8" />, title: "One-Click Copy", color: "from-green-400 to-emerald-500" },
              { icon: <Eye className="w-8 h-8" />, title: "Line Highlighting", color: "from-purple-400 to-pink-500" },
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                whileHover={{ y: -5, scale: 1.05 }}
                className="text-center group"
              >
                <motion.div
                  animate={{ 
                    scale: animationPhase === index ? [1, 1.1, 1] : 1,
                  }}
                  transition={{ duration: 0.5 }}
                  className={`inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r ${feature.color} rounded-2xl mb-4 group-hover:shadow-lg group-hover:shadow-purple-500/25 transition-all`}
                >
                  <div className="text-white">
                    {feature.icon}
                  </div>
                </motion.div>
                <h4 className="text-white font-semibold text-lg">{feature.title}</h4>
              </motion.div>
            ))}
          </motion.div>

          {/* Action Buttons */}
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="flex justify-center gap-6 mt-12"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl text-white font-semibold text-xl hover:from-purple-600 hover:to-pink-600 transition-all shadow-lg shadow-purple-500/25"
            >
              <Github className="w-6 h-6" />
              View on GitHub
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-3 px-8 py-4 bg-white/10 backdrop-blur-sm rounded-2xl text-white font-semibold text-xl hover:bg-white/20 transition-all border border-white/20"
            >
              <Star className="w-6 h-6" />
              Star Project
            </motion.button>
          </motion.div>
        </div>
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
          className="px-4 py-2 bg-white/10 backdrop-blur-sm rounded-lg text-white text-sm font-medium hover:bg-white/20 transition-colors"
        >
          Showcase
        </Link>
        <Link 
          href="/cover"
          className="px-4 py-2 bg-white/20 backdrop-blur-sm rounded-lg text-white text-sm font-medium hover:bg-white/30 transition-colors"
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
