"use client";

import React, { lazy } from "react";
import type { CodeBlockProps } from "./code-block/code-block";
import { CodeBlockSkeleton, SuspenseWrapper } from "./loading";

// Lazy load the heavy CodeBlock component
const LazyCodeBlock = lazy(() => 
  import("./code-block/code-block").then(module => ({
    default: module.CodeBlock
  }))
);

type TCodeBlockLazyProps = CodeBlockProps & {
  /**
   * Whether to enable lazy loading with Suspense
   * @default true
   */
  enableLazyLoading?: boolean;
  
  /**
   * Custom loading fallback component
   */
  loadingFallback?: React.ReactNode;
  
  /**
   * Whether to show a skeleton that matches the code block structure
   * @default true
   */
  showSkeleton?: boolean;
};

/**
 * Optimized CodeBlock with lazy loading and performance enhancements
 */
export function CodeBlockLazy({
  loadingFallback,
  showSkeleton = true,
  ...props
}: TCodeBlockLazyProps) {
  // Always use lazy loading for consistency and better performance

  const defaultFallback = showSkeleton ? (
    <CodeBlockSkeleton 
      showHeader={true}
      showLineNumbers={props.showLineNumbers ?? true}
      lines={props.code ? Math.min(props.code.split('\n').length, 10) : 8}
    />
  ) : (
    loadingFallback || <div className="flex items-center justify-center p-8">Loading...</div>
  );

  return (
    <SuspenseWrapper fallback={defaultFallback}>
      <LazyCodeBlock {...props} />
    </SuspenseWrapper>
  );
}

/**
 * Hook for preloading the CodeBlock component
 */
export function usePreloadCodeBlock() {
  const preload = React.useCallback(() => {
    // Preload the component
    import("./code-block/code-block");
  }, []);

  return preload;
}

/**
 * Utility function to preload the CodeBlock component
 */
export function preloadCodeBlock() {
  import("./code-block/code-block");
}

// Re-export types and original component for backwards compatibility
export type { CodeBlockProps } from "./code-block/code-block";
export { CodeBlock } from "./code-block/code-block";
