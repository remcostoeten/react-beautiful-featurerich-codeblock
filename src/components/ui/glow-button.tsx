import React from "react";
import { cn } from "@/components/code-block/cn";

interface GlowButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  size?: "small" | "medium" | "large";
}

export function GlowButton({
  children,
  className,
  size = "small",
  ...props
}: GlowButtonProps) {
  const sizeClasses = {
    small: "px-3 py-1.5 text-sm",
    medium: "px-4 py-2",
    large: "px-6 py-3 text-lg",
  };

  return (
    <button
      className={cn(
        "relative inline-flex items-center justify-center font-medium leading-6 text-white no-underline bg-gray-800 shadow-lg cursor-pointer group rounded-md transition-all duration-300",
        "hover:bg-gray-700 hover:shadow-blue-500/25",
        sizeClasses[size],
        className,
      )}
      {...props}
    >
      <span className="relative z-10 flex items-center justify-center space-x-2">
        {children}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          aria-hidden="true"
          className="w-4 h-4"
        >
          <path
            fillRule="evenodd"
            d="M5.22 14.78a.75.75 0 001.06 0l7.22-7.22v5.69a.75.75 0 001.5 0v-7.5a.75.75 0 00-.75-.75h-7.5a.75.75 0 000 1.5h5.69l-7.22 7.22a.75.75 0 000 1.06z"
            clipRule="evenodd"
          />
        </svg>
      </span>
      <span className="absolute inset-0 rounded-md overflow-hidden">
        <span className="absolute inset-0 rounded-md bg-gradient-to-r from-blue-500 to-purple-500 opacity-0 group-hover:opacity-10 transition-opacity duration-300"></span>
      </span>
    </button>
  );
}
