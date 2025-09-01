"use client";

import React, { memo } from "react";
import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";
import { cn } from "./code-block/cn";

type TLoadingSpinnerProps = {
  size?: "sm" | "md" | "lg";
  className?: string | undefined;
  label?: string;
};

export const LoadingSpinner = memo(function LoadingSpinner({
  size = "md",
  className,
  label = "Loading..."
}: TLoadingSpinnerProps) {
  const sizeClasses = {
    sm: "w-4 h-4",
    md: "w-6 h-6", 
    lg: "w-8 h-8"
  };

  return (
    <div 
      className={cn("flex items-center justify-center gap-2", className)}
      role="status"
      aria-live="polite"
      aria-label={label}
    >
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        className="text-zinc-400"
      >
        <Loader2 className={sizeClasses[size]} />
      </motion.div>
      <span className="text-sm text-zinc-400 sr-only">{label}</span>
    </div>
  );
});

type TSkeletonProps = {
  className?: string;
  animate?: boolean;
  style?: React.CSSProperties;
};

export const Skeleton = memo(function Skeleton({ 
  className, 
  animate = true,
  style
}: TSkeletonProps) {
  return (
    <div
      className={cn(
        "rounded-md bg-zinc-800/50",
        animate && "animate-pulse",
        className
      )}
      style={style}
      role="presentation"
      aria-hidden="true"
    />
  );
});

type TCodeBlockSkeletonProps = {
  showHeader?: boolean;
  lines?: number;
  showLineNumbers?: boolean;
};

export const CodeBlockSkeleton = memo(function CodeBlockSkeleton({
  showHeader = true,
  lines = 8,
  showLineNumbers = true
}: TCodeBlockSkeletonProps) {
  return (
    <div className="relative">
      <div className="group relative rounded-xl overflow-hidden bg-[#0A0A0A] border border-[#333333] w-full">
        {showHeader && (
          <div className="flex justify-between items-center px-4 py-2.5 bg-[#0A0A0A] border-b border-[#333333]">
            <div className="flex items-center gap-3">
              <Skeleton className="w-4 h-4 rounded" />
              <Skeleton className="w-20 h-4" />
              <div className="flex gap-2">
                <Skeleton className="w-12 h-5 rounded-full" />
                <Skeleton className="w-16 h-5 rounded-full" />
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Skeleton className="w-8 h-8 rounded" />
              <Skeleton className="w-8 h-8 rounded" />
              <Skeleton className="w-8 h-8 rounded" />
            </div>
          </div>
        )}
        
        <div className="p-4">
          <div className="space-y-2">
            {Array.from({ length: lines }).map((_, index) => (
              <div key={index} className="flex items-center gap-4">
                {showLineNumbers && (
                  <Skeleton className="w-6 h-4" />
                )}
                <Skeleton 
                  className="h-4"
                  style={{ 
                    width: `${Math.random() * 60 + 40}%` 
                  }}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
});

type TLoadingProps = {
  size?: "sm" | "md" | "lg";
  variant?: "spinner" | "skeleton" | "dots";
  className?: string;
  label?: string;
};

export const Loading = memo(function Loading({
  size = "md",
  variant = "spinner",
  className,
  label = "Loading..."
}: TLoadingProps) {
  if (variant === "skeleton") {
    return <CodeBlockSkeleton />;
  }

  if (variant === "dots") {
    return (
      <div 
        className={cn("flex items-center justify-center gap-1", className)}
        role="status"
        aria-live="polite"
        aria-label={label}
      >
        {[0, 1, 2].map((index) => (
          <motion.div
            key={index}
            className="w-2 h-2 bg-zinc-400 rounded-full"
            animate={{ 
              scale: [1, 1.5, 1],
              opacity: [0.5, 1, 0.5] 
            }}
            transition={{ 
              duration: 1.5, 
              repeat: Infinity,
              delay: index * 0.2
            }}
          />
        ))}
        <span className="sr-only">{label}</span>
      </div>
    );
  }

  return <LoadingSpinner size={size} className={className} label={label} />;
});

type TSuspenseWrapperProps = {
  children: React.ReactNode;
  fallback?: React.ReactNode;
  className?: string;
};

export function SuspenseWrapper({ 
  children, 
  fallback,
  className 
}: TSuspenseWrapperProps) {
  const defaultFallback = (
    <div className={cn("flex items-center justify-center p-8", className)}>
      <Loading variant="spinner" />
    </div>
  );

  return (
    <React.Suspense fallback={fallback || defaultFallback}>
      {children}
    </React.Suspense>
  );
}
