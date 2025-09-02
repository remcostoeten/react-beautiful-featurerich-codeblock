/**
 * Beautiful Code Block Component
 * 
 * A feature-rich, customizable code display component for React/Next.js applications
 * with syntax highlighting, search functionality, keyboard shortcuts, and custom badges.
 * 
 * Features:
 * • Syntax highlighting for 100+ languages
 * • Interactive search with Cmd/Ctrl+F
 * • Line highlighting and click callbacks
 * • Copy to clipboard with Cmd/Ctrl+C
 * • Collapsible code blocks with smooth animations
 * • Custom badge system with variants
 * • Keyboard shortcuts and accessibility support
 * 
 * Installation:
 * 1. Install dependencies: framer-motion lucide-react react-syntax-highlighter clsx tailwind-merge @radix-ui/react-slot class-variance-authority
 * 2. Copy this file to your components directory
 * 3. Import and use: import { CodeBlock } from './beautiful-code-block'
 * 
 * @author Remco Stoeten (@remcostoeten)
 */

"use client";

import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowDown,
  ArrowUp,
  Check,
  CheckCircle2,
  ChevronDown,
  Copy,
  Code as DefaultIcon,
  File,
  Search,
  X,
} from "lucide-react";
import { useCallback, useEffect, useRef, useState, useMemo, memo } from "react";
import { PrismAsyncLight as SyntaxHighlighter } from "react-syntax-highlighter";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import type { CSSProperties } from "react";

// ============================================================================
// UTILITIES
// ============================================================================

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

function calculateCodeStats(code: string) {
  const lines = code.split("\n").length;
  const chars = code.length;
  const words = code.trim().split(/\s+/).length;
  return { lines, chars, words };
}

// ============================================================================
// THEME CONFIGURATION
// ============================================================================

type TCustomTheme = {
  [key: string]: CSSProperties;
};

const customTheme: TCustomTheme = {
  'code[class*="language-"]': {
    color: "#f1f5f9",
    background: "none",
    fontFamily:
      'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
    textAlign: "left",
    whiteSpace: "pre",
    wordSpacing: "normal",
    wordBreak: "normal",
    wordWrap: "normal",
    lineHeight: "1.5",
    fontSize: "14px",
    tabSize: 2,
    hyphens: "none",
  },
  'pre[class*="language-"]': {
    color: "#f1f5f9",
    background: "none",
    fontFamily:
      'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
    textAlign: "left",
    whiteSpace: "pre",
    wordSpacing: "normal",
    wordBreak: "normal",
    wordWrap: "normal",
    lineHeight: "1.5",
    fontSize: "14px",
    tabSize: 2,
    hyphens: "none",
    padding: "1em",
    margin: "0.5em 0",
    overflow: "auto",
  },
  comment: {
    color: "#636e7b",
    fontStyle: "italic",
  },
  "block-comment": {
    color: "#636e7b",
    fontStyle: "italic",
  },
  prolog: {
    color: "#636e7b",
  },
  doctype: {
    color: "#636e7b",
  },
  cdata: {
    color: "#636e7b",
  },
  punctuation: {
    color: "#94a3b8",
  },
  tag: {
    color: "#f472b6",
  },
  "attr-name": {
    color: "#f472b6",
  },
  namespace: {
    color: "#f472b6",
  },
  deleted: {
    color: "#ef4444",
  },
  "function-name": {
    color: "#60a5fa",
  },
  boolean: {
    color: "#c084fc",
  },
  number: {
    color: "#c084fc",
  },
  function: {
    color: "#60a5fa",
  },
  property: {
    color: "#f472b6",
  },
  "class-name": {
    color: "#93c5fd",
  },
  constant: {
    color: "#c084fc",
  },
  symbol: {
    color: "#f472b6",
  },
  selector: {
    color: "#a5b4fc",
  },
  important: {
    color: "#f472b6",
    fontWeight: "bold",
  },
  atrule: {
    color: "#f472b6",
  },
  keyword: {
    color: "#f472b6",
  },
  builtin: {
    color: "#93c5fd",
  },
  string: {
    color: "#a5b4fc",
  },
  char: {
    color: "#a5b4fc",
  },
  "attr-value": {
    color: "#a5b4fc",
  },
  regex: {
    color: "#f472b6",
  },
  variable: {
    color: "#f1f5f9",
  },
  operator: {
    color: "#94a3b8",
  },
  entity: {
    color: "#f472b6",
    cursor: "help",
  },
  url: {
    color: "#94a3b8",
  },
  bold: {
    fontWeight: "bold",
  },
  italic: {
    fontStyle: "italic",
  },
  inserted: {
    color: "#34d399",
  },
};

// ============================================================================
// LANGUAGE ICONS
// ============================================================================

type TIconProps = {
  className?: string;
  size?: number;
};

const DEFAULT_ICON_SIZE = 16;

function SqlLogo({ className = "", size = DEFAULT_ICON_SIZE }: TIconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="#fff"
      fillRule="evenodd"
      stroke="#000"
      strokeLinecap="round"
      strokeLinejoin="round"
      viewBox="0 0 61 81"
      className={className}
      width={size}
      height={size}
    >
      <use x="0.5" y="0.5" xlinkHref="#A" />
      <symbol id="A" overflow="visible">
        <g fill="#0072c6" stroke="none">
          <path d="M0 10.929v58.14C0 75.106 13.432 80 30 80V10.929H0z" />
          <use xlinkHref="#C" />
        </g>
        <use stroke="none" opacity="0.15" xlinkHref="#C" />
        <path
          stroke="none"
          d="M60 10.929c0 6.036-13.432 10.929-30 10.929S0 16.965 0 10.929 13.432 0 30 0s30 4.893 30 10.929"
        />
        <path
          fill="#7fba00"
          stroke="none"
          d="M53.866 10.299c0 3.985-10.685 7.211-23.866 7.211S6.132 14.284 6.132 10.299 16.819 3.088 30 3.088s23.866 3.228 23.866 7.211"
        />
        <path
          fill="#b8d432"
          stroke="none"
          d="M48.867 14.707c3.124-1.219 5.002-2.745 5.002-4.404C53.868 6.318 43.183 3.09 30 3.09S6.134 6.318 6.134 10.303c0 1.658 1.877 3.185 5.002 4.404 4.363-1.704 11.182-2.803 18.865-2.803s14.5 1.099 18.866 2.803"
        />
      </symbol>
      <defs>
        <path
          id="C"
          d="M29.589 79.999H30c16.568 0 30-4.892 30-10.929V10.93H29.589V80z"
        />
      </defs>
    </svg>
  );
}

function RustIcon({ className = "", size = DEFAULT_ICON_SIZE }: TIconProps) {
  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="m47.781 31.608-1.343-.832a18.57 18.57 0 0 0-.038-.391l1.154-1.077a.46.46 0 0 0-.153-.771l-1.476-.552a16.798 16.798 0 0 0-.115-.381l.92-1.279a.462.462 0 0 0-.3-.727l-1.557-.253c-.06-.118-.123-.234-.187-.35l.654-1.435a.46.46 0 0 0-.437-.654l-1.579.055a12.482 12.482 0 0 0-.25-.302l.363-1.539a.461.461 0 0 0-.556-.556l-1.538.362c-.1-.084-.2-.167-.303-.25l.055-1.578a.46.46 0 0 0-.654-.437l-1.435.654a16.712 16.712 0 0 0-.35-.188l-.253-1.556a.462.462 0 0 0-.726-.301l-1.28.92a14.31 14.31 0 0 0-.38-.115l-.552-1.476a.461.461 0 0 0-.771-.154l-1.077 1.156c-.13-.014-.26-.028-.391-.038l-.832-1.344a.462.462 0 0 0-.786 0l-.832 1.344c-.13.01-.261.024-.391.038l-1.077-1.155a.464.464 0 0 0-.771.153l-.552 1.476c-.128.037-.255.076-.38.116l-.552 1.476a.46.46 0 0 0 .771.153l1.155-1.077c-.015.13-.028.26-.039.391l-1.343.832a.462.462 0 0 0 0 .786l1.343.831c.011.131.024.262.039.392l-1.155 1.077a.462.462 0 0 0 .153.771l1.155 1.077c-.014.13-.027.261-.039.392l-1.343.832a.462.462 0 0 0 0-.786l-1.343-.831c-.011-.131-.024-.262-.039-.392l1.077-1.155a.462.462 0 0 0-.771.153l-.552 1.476c-.037.128-.076.255-.116.38l.921 1.28a.462.462 0 0 0-.301.726l-1.556.253c-.061.118-.123.235-.188.35l.655 1.435a.46.46 0 0 0 .437.654l1.579-.055c.082.103.165.203.25.303l-.363 1.539a.46.46 0 0 0 .556.555l1.538-.362c.1.085.201.167.303.249l-.055 1.58a.461.461 0 0 0 .654.436l1.435-.654c.115.064.232.127.35.188l.253 1.555a.461.461 0 0 0 .727.302l1.279-.922c.126.04.253.08.38.116l.552 1.476a.46.46 0 0 0 .771.153l1.078-1.155c.13.015.26.028.391.04l.832 1.343a.463.463 0 0 0 .786 0l.831-1.344c.131-.011.262-.024.392-.039l1.077 1.155a.46.46 0 0 0 .77-.153l.553-1.476c.127-.036.254-.076.38-.116l1.28.922a.463.463 0 0 0 .726-.302l.254-1.556c.117-.06.233-.124.349-.187l1.435.654a.461.461 0 0 0 .654-.437l-.055-1.58c.102-.08.203-.163.303-.248l1.538.362a.46.46 0 0 0 .556-.555l-.362-1.539c.084-.1.167-.2.249-.303l1.58.055a.46.46 0 0 0 .436-.654l-.654-1.435c.064-.115.126-.232.187-.35l1.556-.253a.46.46 0 0 0 .301-.726l-.92-1.28a17.5 17.5 0 0 0 .115-.38l1.476-.552a.46.46 0 0 0 .153-.771l-1.155-1.077c.014-.13.027-.261.039-.392l1.343-.831a.462.462 0 0 0 0-.786zM38.79 42.752a.952.952 0 0 1 .399-1.861.952.952 0 0 1-.4 1.861zm-.457-3.087a.866.866 0 0 0-1.028.666l-.477 2.226A11.649 11.649 0 0 1 32 43.597c-1.76 0-3.43-.39-4.929-1.087l-.477-2.225a.866.866 0 0 0-1.028-.667l-1.965.422a11.68 11.68 0 0 1-1.016-1.197h9.561c.108 0 .18-.02.18-.118v-3.382c0-.099-.072-.118-.18-.118H29.35V33.08h3.024c.276 0 1.476.079 1.86 1.613.12.471.384 2.006.564 2.497.18.551.912 1.652 1.692 1.652h4.764a.977.977 0 0 0 .173-.017c-.33.449-.693.874-1.083 1.27l-2.01-.431zm-13.223 3.04a.952.952 0 0 1-.399-1.861.95.95 0 0 1 .398 1.862zm-3.627-14.707a.95.95 0 1 1-1.737.771.95.95 0 1 1 1.737-.771zm-1.115 2.643 2.047-.91a.868.868 0 0 0 .44-1.145l-.421-.953h1.658v7.474h-3.345a11.714 11.714 0 0 1-.38-4.466zm8.983-.726v-2.203h3.948c.204 0 1.44.236 1.44 1.16 0 .767-.948 1.043-1.728 1.043h-3.66zM43.7 31.898c0 .292-.011.581-.033.868h-1.2c-.12 0-.168.08-.168.197v.551c0 1.298-.732 1.58-1.373 1.652-.61.068-1.288-.256-1.371-.63-.36-2.025-.96-2.458-1.908-3.206 1.176-.746 2.4-1.848 2.4-3.323 0-1.593-1.092-2.596-1.836-3.088-1.044-.688-2.2-.826-2.512-.826H23.285a11.684 11.684 0 0 1 6.545-3.694l1.463 1.535c.331.346.88.36 1.225.028l1.638-1.566a11.71 11.71 0 0 1 8.009 5.704l-1.121 2.532a.869.869 0 0 0 .44 1.145l2.159.958c.037.383.056.77.056 1.163zM31.294 19.093a.95.95 0 0 1 1.344.031.952.952 0 0 1-.032 1.346.949.949 0 0 1-1.343-.032.953.953 0 0 1 .031-1.345zm11.123 8.951a.95.95 0 1 1 1.737.772.95.95 0 1 1-1.737-.772z"
        fill="#808080"
      />
    </svg>
  );
}

function TypescriptIcon({ className = "", size = DEFAULT_ICON_SIZE }: TIconProps) {
  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 512 512"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect fill="#3178c6" height="512" rx="50" width="512" />
      <path
        clipRule="evenodd"
        d="m316.939 407.424v50.061c8.138 4.172 17.763 7.3 28.875 9.386s22.823 3.129 35.135 3.129c11.999 0 23.397-1.147 34.196-3.442 10.799-2.294 20.268-6.075 28.406-11.342 8.138-5.266 14.581-12.15 19.328-20.65s7.121-19.007 7.121-31.522c0-9.074-1.356-17.026-4.069-23.857s-6.625-12.906-11.738-18.225c-5.112-5.319-11.242-10.091-18.389-14.315s-15.207-8.213-24.18-11.967c-6.573-2.712-12.468-5.345-17.685-7.9-5.217-2.556-9.651-5.163-13.303-7.822-3.652-2.66-6.469-5.476-8.451-8.448-1.982-2.973-2.974-6.336-2.974-10.091 0-3.441.887-6.544 2.661-9.308s4.278-5.136 7.512-7.118c3.235-1.981 7.199-3.52 11.894-4.615 4.696-1.095 9.912-1.642 15.651-1.642 4.173 0 8.581.313 13.224.938 4.643.626 9.312 1.591 14.008 2.894 4.695 1.304 9.259 2.947 13.694 4.928 4.434 1.982 8.529 4.276 12.285 6.884v-46.776c-7.616-2.92-15.937-5.084-24.962-6.492s-19.381-2.112-31.066-2.112c-11.895 0-23.163 1.278-33.805 3.833s-20.006 6.544-28.093 11.967c-8.086 5.424-14.476 12.333-19.171 20.729-4.695 8.395-7.043 18.433-7.043 30.114 0 14.914 4.304 27.638 12.912 38.172 8.607 10.533 21.675 19.45 39.204 26.751 6.886 2.816 13.303 5.579 19.25 8.291s11.086 5.528 15.415 8.448c4.33 2.92 7.747 6.101 10.252 9.543 2.504 3.441 3.756 7.352 3.756 11.733 0 3.233-.783 6.231-2.348 8.995s-3.939 5.162-7.121 7.196-7.147 3.624-11.894 4.771c-4.748 1.148-10.303 1.721-16.668 1.721-10.851 0-21.597-1.903-32.24-5.71-10.642-3.806-20.502-9.516-29.579-17.13zm-84.159-123.342h64.22v-41.082h-179v41.082h63.906v182.918h50.874z"
        fill="#fff"
        fillRule="evenodd"
      />
    </svg>
  );
}

function ReactIcon({ className = "", size = DEFAULT_ICON_SIZE }: TIconProps) {
  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="-11.5 -10.23174 23 20.46348"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="0" cy="0" r="2.05" fill="#61dafb" />
      <g stroke="#61dafb" strokeWidth="1" fill="none">
        <ellipse rx="11" ry="4.2" />
        <ellipse rx="11" ry="4.2" transform="rotate(60)" />
        <ellipse rx="11" ry="4.2" transform="rotate(120)" />
      </g>
    </svg>
  );
}

function PythonIcon({ className = "", size = DEFAULT_ICON_SIZE }: TIconProps) {
  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M31.885 16c-8.124 0-7.617 3.523-7.617 3.523l.01 3.65h7.752v1.095H21.197S16 23.678 16 31.876c0 8.196 4.537 7.906 4.537 7.906h2.708v-3.804s-.146-4.537 4.465-4.537h7.688s4.32.07 4.32-4.175v-7.019S40.374 16 31.885 16zm-4.275 2.454c.771 0 1.395.624 1.395 1.395s-.624 1.395-1.395 1.395a1.393 1.393 0 0 1-1.395-1.395c0-.771.624-1.395 1.395-1.395z"
        fill="url(#python-a)"
      />
      <path
        d="M32.115 47.833c8.124 0 7.617-3.523 7.617-3.523l-.01-3.65H31.97v-1.095h10.832S48 40.155 48 31.958c0-8.197-4.537-7.906-4.537-7.906h-2.708v3.803s.146 4.537-4.465 4.537h-7.688s-4.32-.07-4.32 4.175v7.019s-.656 4.247 7.833 4.247zm4.275-2.454a1.393 1.393 0 0 1-1.395-1.395c0-.77.624-1.394 1.395-1.394s1.395.623 1.395 1.394c0 .772-.624 1.395-1.395 1.395z"
        fill="url(#python-b)"
      />
      <defs>
        <linearGradient
          id="python-a"
          x1="19.075"
          y1="18.782"
          x2="34.898"
          y2="34.658"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#387EB8" />
          <stop offset="1" stopColor="#366994" />
        </linearGradient>
        <linearGradient
          id="python-b"
          x1="28.809"
          y1="28.882"
          x2="45.803"
          y2="45.163"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#FFE052" />
          <stop offset="1" stopColor="#FFC331" />
        </linearGradient>
      </defs>
    </svg>
  );
}

function JavascriptIcon({ className = "", size = DEFAULT_ICON_SIZE }: TIconProps) {
  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 256 256"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="m0 0h256v256h-256z" fill="#f7df1e" />
      <path d="m67.311746 213.932292 19.590908-11.856051c3.7794539 6.701105 7.2175746 12.370896 15.464432 12.370896 7.905117 0 12.88899-3.092318 12.88899-15.120254v-81.798096h24.057499v82.13821c0 24.917333-14.605816 36.258946-35.915175 36.258946-19.2451048 0-30.4164571-9.96734-36.0870603-21.995683" />
      <path d="m152.380952 211.354413 19.58847-11.341613c5.156572 8.421181 11.858489 14.607035 23.714946 14.607035 9.968153 0 16.324673-4.983873 16.324673-11.857676 0-8.248483-6.529625-11.170134-17.527873-15.980089l-6.012749-2.579505c-17.357206-7.387835-28.871111-16.667225-28.871111-36.257727 0-18.04353 13.7472-31.791543 35.228444-31.791543 15.294172 0 26.292013 5.327645 34.195911 19.247137l-18.731073 12.028343c-4.124444-7.388648-8.591034-10.309486-15.464431-10.309486-7.045689 0-11.513905 4.467809-11.513905 10.309486 0 7.217574 4.468216 10.139631 14.777702 14.607847l6.013968 2.577473c20.449524 8.764546 31.963428 17.699353 31.963428 37.804292 0 21.653537-17.012215 33.509588-39.86692 33.509588-22.339454 0-36.774603-10.653664-43.819073-24.573562" />
    </svg>
  );
}

function getLanguageIcon(language: string) {
  switch (language.toLowerCase()) {
    case "typescript":
    case "ts":
      return <TypescriptIcon size={16} />;
    case "javascript":
    case "js":
      return <JavascriptIcon size={16} />;
    case "python":
    case "py":
      return <PythonIcon size={16} />;
    case "rust":
    case "rs":
      return <RustIcon size={16} />;
    case "sql":
    case "mysql":
    case "postgresql":
      return <SqlLogo size={16} />;
    case "react":
    case "jsx":
    case "tsx":
      return <ReactIcon size={16} />;
    default:
      return <DefaultIcon size={16} />;
  }
}

// ============================================================================
// ANIMATIONS
// ============================================================================

const ANIMATION_VARIANTS = {
  collapsed: {
    height: 0,
    opacity: 0,
    transition: {
      height: { duration: 0.4, ease: [0.16, 1, 0.3, 1] },
      opacity: { duration: 0.3, ease: [0.16, 1, 0.3, 1] },
    },
  },
  expanded: {
    height: "auto",
    opacity: 1,
    transition: {
      height: { duration: 0.4, ease: [0.16, 1, 0.3, 1] },
      opacity: { duration: 0.3, ease: [0.16, 1, 0.3, 1] },
    },
  },
};

const COPY_VARIANTS = {
  initial: { opacity: 0, scale: 0.96 },
  animate: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.2, ease: [0.16, 1, 0.3, 1] },
  },
  exit: {
    opacity: 0,
    scale: 0.96,
    transition: { duration: 0.2, ease: [0.16, 1, 0.3, 1] },
  },
};

const TOAST_VARIANTS = {
  hidden: {
    opacity: 0,
    y: -20,
    scale: 0.95,
    transition: { duration: 0.2, ease: [0.16, 1, 0.3, 1] },
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] },
  },
};

// ============================================================================
// BUTTON COMPONENT
// ============================================================================

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground shadow hover:bg-primary/90",
        destructive:
          "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90",
        outline:
          "border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground",
        secondary:
          "bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-9 px-4 py-2",
        sm: "h-8 rounded-md px-3 text-xs",
        lg: "h-10 rounded-md px-8",
        icon: "h-9 w-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

interface TButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = memo(function Button({ 
  className, 
  variant, 
  size, 
  asChild = false, 
  ...props 
}: TButtonProps) {
  const Comp = asChild ? Slot : "button";
  return (
    <Comp
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
});

// ============================================================================
// TYPES
// ============================================================================

export type TBadgeVariant =
  | "default"
  | "primary"
  | "secondary"
  | "success"
  | "warning"
  | "danger"
  | "custom";

export type TBadge = {
  text: string;
  variant: TBadgeVariant;
  customClass?: string;
};

export type TCodeBlockProps = {
  /** The source code to display */
  code: string;
  /** Programming language for syntax highlighting */
  language: string;
  /** Optional file name to display in header */
  fileName?: string;
  /** Array of badges to display in header */
  badges?: TBadge[];
  /** Whether to show line numbers (default: true) */
  showLineNumbers?: boolean;
  /** Enable interactive line highlighting (default: false) */
  enableLineHighlight?: boolean;
  /** Show metadata like line count in header (default: true) */
  showMetaInfo?: boolean;
  /** Maximum height before scrolling (default: "400px") */
  maxHeight?: string;
  /** Additional CSS classes */
  className?: string;
  /** Callback when code is copied */
  onCopy?: (code: string) => void;
  /** Callback when a line is clicked (requires enableLineHighlight) */
  onLineClick?: (lineNumber: number) => void;
  /** Callback when search is performed */
  onSearch?: (query: string, results: number[]) => void;
  /** Default badge variant for all badges */
  badgeVariant?: TBadgeVariant;
  /** Custom color for badges when variant is "custom" */
  badgeColor?: string;
  /** Custom color for file name label */
  fileNameColor?: string;
  /** Initial search query */
  initialSearchQuery?: string;
  /** Initial search results (line numbers) */
  initialSearchResults?: number[];
  /** Initial highlighted lines */
  initialHighlightedLines?: number[];
};

// ============================================================================
// BADGE UTILITIES
// ============================================================================

type TBadgeProps = {
  variant?: TBadgeVariant;
  customColor?: string;
  customClass?: string;
};

function getBadgeClasses({
  variant = "default",
  customColor,
  customClass,
}: TBadgeProps): string {
  const baseClasses =
    "px-2 py-0.5 text-xs font-medium rounded-full transition-all duration-200";

  if (variant === "custom") {
    if (customClass) {
      return `${baseClasses} ${customClass}`;
    }
    // Default custom styling (gradient from pink to purple)
    return `${baseClasses} bg-gradient-to-r from-pink-500 to-purple-500 text-white border border-pink-500/30`;
  }

  switch (variant) {
    case "primary":
      return `${baseClasses} border border-blue-500/30 bg-blue-500/10 text-blue-400 hover:border-blue-400 hover:text-blue-300`;
    case "secondary":
      return `${baseClasses} border border-purple-500/30 bg-purple-500/10 text-purple-400 hover:border-purple-400 hover:text-purple-300`;
    case "success":
      return `${baseClasses} border border-green-500/30 bg-green-500/10 text-green-400 hover:border-green-400 hover:text-green-300`;
    case "warning":
      return `${baseClasses} border border-yellow-500/30 bg-yellow-500/10 text-yellow-400 hover:border-yellow-400 hover:text-yellow-300`;
    case "danger":
      return `${baseClasses} border border-red-500/30 bg-red-500/10 text-red-400 hover:border-red-400 hover:text-red-300`;
    default:
      return `${baseClasses} border border-[#333333] bg-[#111111] text-zinc-400 hover:border-[#444444] hover:text-zinc-300`;
  }
}

// ============================================================================
// MAIN COMPONENT
// ============================================================================

/**
 * Beautiful Code Block Component
 * 
 * A comprehensive code display component with syntax highlighting, search,
 * line highlighting, copy functionality, and custom badges.
 * 
 * @example
 * <CodeBlock
 *   code="const hello = 'world';"
 *   language="javascript"
 *   fileName="example.js"
 *   badges={[{ text: 'JS', variant: 'primary' }]}
 *   showLineNumbers
 *   enableLineHighlight
 * />
 */
export function CodeBlock({
  code,
  language,
  fileName,
  badges = [],
  showLineNumbers = true,
  enableLineHighlight = false,
  showMetaInfo = true,
  maxHeight = "400px",
  className,
  onCopy,
  onLineClick,
  onSearch,
  badgeVariant = "default",
  badgeColor,
  fileNameColor,
  initialSearchQuery = "",
  initialSearchResults = [],
  initialHighlightedLines = [],
}: TCodeBlockProps) {
  // State management
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isSearching, setIsSearching] = useState(!!initialSearchQuery);
  const [searchQuery, setSearchQuery] = useState(initialSearchQuery);
  const [searchResults, setSearchResults] =
    useState<number[]>(initialSearchResults);
  const [currentResultIndex, setCurrentResultIndex] = useState(
    initialSearchResults.length > 0 ? 0 : -1,
  );
  const [highlightedLines, setHighlightedLines] = useState<number[]>(
    initialHighlightedLines,
  );

  // Refs
  const codeRef = useRef<HTMLDivElement>(null);

  // Memoized values
  const stats = useMemo(() => calculateCodeStats(code), [code]);

  // Scroll to specific line
  const scrollToLine = useCallback((lineNumber: number) => {
    if (!codeRef.current) return;

    const lineElement = codeRef.current.querySelector(
      `[data-line-number="${lineNumber}"]`,
    );
    if (lineElement) {
      lineElement.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }, []);

  // Search handler with debouncing via useEffect
  const handleSearch = useCallback(
    (query: string) => {
      setSearchQuery(query);
      if (!query) {
        setSearchResults([]);
        setCurrentResultIndex(-1);
        setHighlightedLines([]);
        onSearch?.("", []);
        return;
      }

      const lines = code.split("\n");
      const matches = lines.reduce((acc, line, index) => {
        if (line.toLowerCase().includes(query.toLowerCase())) {
          acc.push(index + 1);
        }
        return acc;
      }, [] as number[]);

      setSearchResults(matches);
      setCurrentResultIndex(matches.length > 0 ? 0 : -1);
      setHighlightedLines(matches);
      onSearch?.(query, matches);

      if (matches.length > 0) {
        scrollToLine(matches[0]);
      }
    },
    [code, onSearch, scrollToLine],
  );

  // Debounced search effect
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      handleSearch(searchQuery);
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [searchQuery, handleSearch]);

  // Copy to clipboard
  const copyToClipboard = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(code);
      setIsCopied(true);
      onCopy?.(code);
      setTimeout(() => setIsCopied(false), 2000);
    } catch (error) {
      console.error("Failed to copy:", error);
    }
  }, [code, onCopy]);

  // Search navigation
  const goToNextResult = useCallback(() => {
    if (searchResults.length === 0) return;
    const nextIndex = (currentResultIndex + 1) % searchResults.length;
    setCurrentResultIndex(nextIndex);
    scrollToLine(searchResults[nextIndex]);
  }, [searchResults, currentResultIndex, scrollToLine]);

  const goToPreviousResult = useCallback(() => {
    if (searchResults.length === 0) return;
    const prevIndex =
      currentResultIndex - 1 < 0
        ? searchResults.length - 1
        : currentResultIndex - 1;
    setCurrentResultIndex(prevIndex);
    scrollToLine(searchResults[prevIndex]);
  }, [searchResults, currentResultIndex, scrollToLine]);

  // Line click handler
  const handleLineClick = useCallback(
    (lineNumber: number) => {
      if (enableLineHighlight) {
        setHighlightedLines((prev) =>
          prev.includes(lineNumber)
            ? prev.filter((line) => line !== lineNumber)
            : [...prev, lineNumber],
        );
        onLineClick?.(lineNumber);
      }
    },
    [enableLineHighlight, onLineClick],
  );

  // Keyboard shortcuts
  useEffect(() => {
    function handleKeyboard(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key === "c") {
        copyToClipboard();
      }

      if ((e.metaKey || e.ctrlKey) && e.key === "f" && !isCollapsed) {
        e.preventDefault();
        setIsSearching(true);
      }

      if (isSearching && searchResults.length > 0) {
        if (e.key === "Enter") {
          if (e.shiftKey) {
            goToPreviousResult();
          } else {
            goToNextResult();
          }
        }
      }

      if (e.key === "Escape") {
        setHighlightedLines([]);
        setIsSearching(false);
        setSearchQuery("");
        setSearchResults([]);
      }
    }

    window.addEventListener("keydown", handleKeyboard);
    return () => window.removeEventListener("keydown", handleKeyboard);
  }, [
    isCollapsed,
    isSearching,
    searchResults,
    currentResultIndex,
    copyToClipboard,
    goToNextResult,
    goToPreviousResult,
  ]);

  // Search UI component
  function renderSearchUI() {
    if (!isSearching) return null;

    return (
      <div 
        className="flex items-center gap-2 bg-[#111111] rounded-lg border border-[#333333] p-1 h-8"
        role="search"
        aria-label="Code search"
      >
        <div className="relative">
          <label htmlFor="code-search-input" className="sr-only">
            Search within code block
          </label>
          <input
            id="code-search-input"
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search..."
            className="w-40 px-2 py-1 text-sm bg-transparent text-zinc-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-[#111111] placeholder:text-zinc-600"
            autoFocus
            aria-describedby={searchResults.length > 0 ? "search-results-status" : undefined}
          />
          {searchQuery && (
            <div className="absolute right-2 top-1/2 -translate-y-1/2 text-xs text-zinc-500">
              {searchResults.length > 0 ? (
                <span>
                  {currentResultIndex + 1}/{searchResults.length}
                </span>
              ) : (
                <span>No results</span>
              )}
            </div>
          )}
        </div>

        {searchResults.length > 0 && (
          <>
            <div className="h-4 w-[1px] bg-[#333333]" />
            <div className="flex items-center gap-1">
              <Button
                variant="ghost"
                size="icon"
                onClick={goToPreviousResult}
                className="h-6 w-6 text-zinc-500 hover:text-zinc-300"
              >
                <ArrowUp size={14} />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={goToNextResult}
                className="h-6 w-6 text-zinc-500 hover:text-zinc-300"
              >
                <ArrowDown size={14} />
              </Button>
            </div>
          </>
        )}

        <div className="h-4 w-[1px] bg-[#333333]" />
        <Button
          variant="ghost"
          size="icon"
          onClick={() => {
            setIsSearching(false);
            setSearchQuery("");
            setSearchResults([]);
            setHighlightedLines([]);
          }}
          className="h-6 w-6 text-zinc-500 hover:text-zinc-300"
        >
          <X size={14} />
        </Button>
      </div>
    );
  }

  return (
    <div className={cn("relative", className)}>
      <div
        className="group relative rounded-xl overflow-hidden bg-[#0A0A0A] dark:bg-[#0A0A0A] border border-[#333333] dark:border-[#333333] w-full transition-all duration-200"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Header */}
        <div className="flex justify-between items-center px-4 py-2.5 bg-[#0A0A0A] dark:bg-[#0A0A0A] border-b border-[#333333]">
          <div className="flex items-center gap-3">
            <span className="text-zinc-500 dark:text-zinc-500 transition-colors duration-200 group-hover:text-zinc-400">
              {getLanguageIcon(language)}
            </span>
            {fileName && (
              <div
                className={cn(
                  "flex items-center gap-2 rounded-full px-3 py-1 border transition-all duration-200",
                  fileNameColor
                    ? `border-${fileNameColor}-500/30 bg-${fileNameColor}-500/10 text-${fileNameColor}-400 group-hover:border-${fileNameColor}-400 group-hover:text-${fileNameColor}-300`
                    : "bg-[#111111] border-[#333333] group-hover:border-[#444444]",
                )}
              >
                <File
                  size={12}
                  className={
                    fileNameColor
                      ? `text-${fileNameColor}-400`
                      : "text-zinc-400"
                  }
                />
                <span
                  className={cn(
                    "text-sm font-medium transition-colors duration-200",
                    fileNameColor
                      ? `text-${fileNameColor}-400 group-hover:text-${fileNameColor}-300`
                      : "text-zinc-400 group-hover:text-zinc-300",
                  )}
                >
                  {fileName}
                </span>
              </div>
            )}
            <div className="flex items-center gap-2">
              {badges.map((badge, index) => (
                <span
                  key={index}
                  className={getBadgeClasses({
                    variant: badge.variant || badgeVariant,
                    customColor: badgeColor,
                    customClass: badge.customClass,
                  })}
                >
                  {badge.text}
                </span>
              ))}
              {showMetaInfo && (
                <span className="px-2 py-0.5 text-xs font-medium text-zinc-500">
                  {stats.lines} lines • {stats.words} words
                </span>
              )}
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center space-x-1.5 h-8">
            {renderSearchUI()}

            {!isSearching && (
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsSearching(true)}
                className="relative h-8 w-8 text-zinc-500 hover:text-zinc-200 rounded-md transition-all duration-200 hover:bg-white/10"
                title="Search (⌘/Ctrl + F)"
              >
                <Search size={16} />
              </Button>
            )}

            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsCollapsed(!isCollapsed)}
              className="relative h-8 w-8 text-zinc-500 hover:text-zinc-200 rounded-md transition-all duration-200 hover:bg-white/10"
            >
              <motion.div
                initial={false}
                animate={{ rotate: isCollapsed ? 0 : 180 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              >
                <ChevronDown size={16} />
              </motion.div>
            </Button>

            <Button
              variant="ghost"
              size="icon"
              onClick={copyToClipboard}
              className="relative h-8 w-8 text-zinc-500 hover:text-zinc-200 rounded-md transition-all duration-200 hover:bg-white/10"
              title="Copy code (⌘/Ctrl + C)"
            >
              <AnimatePresence mode="wait">
                {isCopied ? (
                  <motion.div
                    key="check"
                    variants={COPY_VARIANTS}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    className="text-emerald-400"
                  >
                    <Check size={16} />
                  </motion.div>
                ) : (
                  <Copy size={16} />
                )}
              </AnimatePresence>
            </Button>
          </div>
        </div>

        {/* Code Content */}
        <AnimatePresence initial={false}>
          {!isCollapsed && (
            <motion.div
              initial="collapsed"
              animate="expanded"
              exit="collapsed"
              variants={ANIMATION_VARIANTS}
              className="overflow-hidden"
            >
              <div className="relative" ref={codeRef}>
                {showLineNumbers && (
                  <div className="absolute left-0 top-0 bottom-0 w-[3.5rem] bg-gradient-to-r from-[#0A0A0A] via-[#0A0A0A]/50 to-transparent pointer-events-none z-10" />
                )}

                <div className="p-4 overflow-y-auto" style={{ maxHeight }}>
                  <SyntaxHighlighter
                    language={language.toLowerCase()}
                    style={customTheme}
                    customStyle={{
                      margin: 0,
                      padding: 0,
                      background: "transparent",
                      fontSize: "0.875rem",
                    }}
                    showLineNumbers={showLineNumbers}
                    lineNumberStyle={{
                      color: "#666666",
                      minWidth: "2.5em",
                      paddingRight: "1em",
                      textAlign: "right",
                      userSelect: "none",
                      opacity: isHovered ? 1 : 0.5,
                      transition: "opacity 0.2s ease",
                    }}
                    wrapLines={true}
                    wrapLongLines={true}
                    lineProps={(lineNumber) => ({
                      style: {
                        display: "block",
                        cursor: enableLineHighlight ? "pointer" : "default",
                        backgroundColor: highlightedLines.includes(lineNumber)
                          ? "rgba(255, 255, 255, 0.1)"
                          : "transparent",
                      },
                      onClick: () => handleLineClick(lineNumber),
                    })}
                  >
                    {code}
                  </SyntaxHighlighter>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Copy Toast */}
      <AnimatePresence>
        {isCopied && (
          <motion.div
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={TOAST_VARIANTS}
            className="absolute top-3 right-3 flex items-center gap-2 px-3 py-2 rounded-lg bg-[#1A1A1A] border border-[#333333] shadow-lg"
          >
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span className="text-sm font-medium text-zinc-200">
              Copied to clipboard
            </span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ============================================================================
// EXPORTS
// ============================================================================

export { Button, getBadgeClasses, customTheme };
export type { TButtonProps, TIconProps };
