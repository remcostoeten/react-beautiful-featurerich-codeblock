"use client";

import React, { useState, useMemo } from "react";
import { CodeBlockLazy, usePreloadCodeBlock, preloadCodeBlock } from "./code-block-lazy";
import { Loading, CodeBlockSkeleton, SuspenseWrapper } from "./loading";
import { Button } from "./code-block/button";

const sampleCode = `// TypeScript React Component Example
import React, { useState, useEffect } from 'react';

interface UserProfileProps {
  userId: string;
  theme: 'light' | 'dark';
}

export function UserProfile({ userId, theme }: UserProfileProps) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchUser() {
      try {
        const response = await fetch(\`/api/users/\${userId}\`);
        const userData = await response.json();
        setUser(userData);
      } catch (error) {
        console.error('Failed to fetch user:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchUser();
  }, [userId]);

  if (loading) {
    return <div className="animate-pulse">Loading...</div>;
  }

  return (
    <div className={\`profile-\${theme}\`}>
      <h1>{user?.name}</h1>
      <p>{user?.email}</p>
    </div>
  );
}`;

const pythonCode = `# Python Data Processing Example
import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier

class DataProcessor:
    def __init__(self, dataset_path: str):
        self.df = pd.read_csv(dataset_path)
        self.model = None
        
    def preprocess_data(self):
        """Clean and prepare data for training"""
        # Handle missing values
        self.df.fillna(self.df.mean(), inplace=True)
        
        # Feature engineering
        self.df['feature_ratio'] = self.df['feature_a'] / self.df['feature_b']
        
        return self.df
    
    def train_model(self, target_column: str):
        """Train a random forest classifier"""
        X = self.df.drop(columns=[target_column])
        y = self.df[target_column]
        
        X_train, X_test, y_train, y_test = train_test_split(
            X, y, test_size=0.2, random_state=42
        )
        
        self.model = RandomForestClassifier(n_estimators=100)
        self.model.fit(X_train, y_train)
        
        accuracy = self.model.score(X_test, y_test)
        print(f"Model accuracy: {accuracy:.2f}")
        
        return self.model`;

export function UsageExamples() {
  const [activeExample, setActiveExample] = useState<string>("basic");
  const [showLazyExample, setShowLazyExample] = useState(false);
  const [preloadTriggered, setPreloadTriggered] = useState(false);
  
  const preload = usePreloadCodeBlock();

  const handlePreload = () => {
    preload();
    setPreloadTriggered(true);
    setTimeout(() => setPreloadTriggered(false), 2000);
  };

  const memoizedCodeBlock = useMemo(() => (
    <CodeBlockLazy
      code={sampleCode}
      language="typescript"
      fileName="UserProfile.tsx"
      badges={[
        { text: "React 19", variant: "primary" },
        { text: "TypeScript", variant: "secondary" },
        { text: "Hooks", variant: "success" }
      ]}
      showLineNumbers={true}
      enableLineHighlight={true}
      showMetaInfo={true}
      badgeVariant="default"
      fileNameColor="blue"
    />
  ), []);

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-8">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold text-white">
          Performance & Lazy Loading Examples
        </h1>
        <p className="text-lg text-zinc-400 max-w-2xl mx-auto">
          Explore the advanced features including lazy loading, skeleton UI, 
          preloading, and performance optimizations.
        </p>
      </div>

      {/* Navigation */}
      <div className="flex flex-wrap gap-2 justify-center">
        {[
          { id: "basic", label: "Basic Lazy Loading" },
          { id: "skeleton", label: "Skeleton States" },
          { id: "preload", label: "Preloading" },
          { id: "suspense", label: "Suspense Wrapper" },
          { id: "performance", label: "Performance Demo" }
        ].map((example) => (
          <Button
            key={example.id}
            variant={activeExample === example.id ? "default" : "outline"}
            onClick={() => setActiveExample(example.id)}
            className="transition-all duration-200"
          >
            {example.label}
          </Button>
        ))}
      </div>

      {/* Example Content */}
      <div className="space-y-6">
        {activeExample === "basic" && (
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold text-white">Basic Lazy Loading</h2>
            <p className="text-zinc-400">
              The CodeBlockLazy component automatically lazy loads the heavy syntax 
              highlighter only when needed, reducing initial bundle size.
            </p>
            
            <div className="grid gap-4">
              <Button
                onClick={() => setShowLazyExample(!showLazyExample)}
                className="w-fit"
              >
                {showLazyExample ? "Hide" : "Show"} Lazy Code Block
              </Button>
              
              {showLazyExample && memoizedCodeBlock}
            </div>
          </div>
        )}

        {activeExample === "skeleton" && (
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold text-white">Skeleton Loading States</h2>
            <p className="text-zinc-400">
              Multiple loading variants including skeleton UI that matches the 
              actual component structure.
            </p>
            
            <div className="grid gap-6">
              <div>
                <h3 className="text-lg font-medium text-white mb-3">Skeleton with Header</h3>
                <CodeBlockSkeleton showHeader={true} showLineNumbers={true} lines={6} />
              </div>
              
              <div>
                <h3 className="text-lg font-medium text-white mb-3">Skeleton without Header</h3>
                <CodeBlockSkeleton showHeader={false} showLineNumbers={false} lines={4} />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <h4 className="text-sm font-medium text-white mb-2">Spinner</h4>
                  <div className="p-4 bg-[#0A0A0A] border border-[#333333] rounded-lg">
                    <Loading variant="spinner" size="md" />
                  </div>
                </div>
                
                <div>
                  <h4 className="text-sm font-medium text-white mb-2">Dots Animation</h4>
                  <div className="p-4 bg-[#0A0A0A] border border-[#333333] rounded-lg">
                    <Loading variant="dots" />
                  </div>
                </div>
                
                <div>
                  <h4 className="text-sm font-medium text-white mb-2">Custom Size</h4>
                  <div className="p-4 bg-[#0A0A0A] border border-[#333333] rounded-lg">
                    <Loading variant="spinner" size="lg" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeExample === "preload" && (
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold text-white">Preloading</h2>
            <p className="text-zinc-400">
              Preload components before they're needed to improve perceived performance.
            </p>
            
            <div className="space-y-4">
              <div className="flex gap-4">
                <Button
                  onClick={handlePreload}
                  variant={preloadTriggered ? "default" : "outline"}
                >
                  {preloadTriggered ? "✓ Preloaded!" : "Preload CodeBlock"}
                </Button>
                
                <Button
                  onClick={() => preloadCodeBlock()}
                  variant="outline"
                >
                  Static Preload
                </Button>
              </div>
              
              <div className="p-4 bg-zinc-900 border border-zinc-700 rounded-lg">
                <h4 className="font-medium text-white mb-2">Preloading Benefits:</h4>
                <ul className="text-zinc-400 space-y-1">
                  <li>• Reduces perceived loading time</li>
                  <li>• Improves user experience</li>
                  <li>• Can be triggered on hover, route change, or user interaction</li>
                  <li>• Hooks available for React patterns</li>
                </ul>
              </div>
            </div>
          </div>
        )}

        {activeExample === "suspense" && (
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold text-white">Suspense Wrapper</h2>
            <p className="text-zinc-400">
              Use SuspenseWrapper for consistent loading UI across your application.
            </p>
            
            <SuspenseWrapper 
              fallback={
                <div className="text-center p-8">
                  <Loading variant="spinner" size="lg" />
                  <p className="text-zinc-400 mt-4">Loading with custom fallback...</p>
                </div>
              }
            >
              <CodeBlockLazy
                code={pythonCode}
                language="python"
                fileName="data_processor.py"
                badges={[
                  { text: "Python", variant: "warning" },
                  { text: "ML", variant: "success" },
                  { text: "pandas", variant: "custom" }
                ]}
                badgeColor="yellow"
                showLineNumbers={true}
                enableLineHighlight={true}
              />
            </SuspenseWrapper>
          </div>
        )}

        {activeExample === "performance" && (
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold text-white">Performance Demonstration</h2>
            <p className="text-zinc-400">
              See the impact of memoization, lazy loading, and optimized rendering.
            </p>
            
            <div className="grid gap-4">
              <div className="p-4 bg-zinc-900 border border-zinc-700 rounded-lg">
                <h4 className="font-medium text-white mb-2">Performance Features:</h4>
                <ul className="text-zinc-400 space-y-2">
                  <li>✅ <strong>React.memo</strong> - Prevents unnecessary re-renders</li>
                  <li>✅ <strong>useMemo</strong> - Memoizes expensive calculations</li>
                  <li>✅ <strong>useCallback</strong> - Stabilizes function references</li>
                  <li>✅ <strong>Lazy Loading</strong> - Reduces initial bundle size</li>
                  <li>✅ <strong>Code Splitting</strong> - Loads components on demand</li>
                  <li>✅ <strong>Suspense</strong> - Handles loading states gracefully</li>
                </ul>
              </div>

              <div>
                <h4 className="font-medium text-white mb-3">Multiple Code Blocks (Memoized)</h4>
                <div className="grid gap-4">
                  {[1, 2].map((index) => (
                    <CodeBlockLazy
                      key={index}
                      code={`// Example ${index}\nconst optimized = true;\nconsole.log('Performance matters!');`}
                      language="javascript"
                      fileName={`example-${index}.js`}
                      badges={[{ text: `Demo ${index}`, variant: "primary" }]}
                      showLineNumbers={false}
                      maxHeight="150px"
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="text-center text-zinc-500 text-sm">
        All components include accessibility features, TypeScript support, and modern React patterns.
      </div>
    </div>
  );
}
