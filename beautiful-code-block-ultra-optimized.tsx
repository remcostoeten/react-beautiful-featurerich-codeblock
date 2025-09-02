/**
 * @author Remco Stoeten
 * @name  Beautiful Code Block 
 * 
 * @description 
 * A feature-rich, performant, accessible code-block render component, which probably is the most beautiful you'll see.
 * 110+ languages, search highlight, programatic line highlighting, per-language icons, custom labels/themes, copy button, kbd-shortcuts
*/

'use client';

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
import { clsx, type ClassValue } from "clsx";
import type { CSSProperties } from "react";

// ============================================================================
// UTILITIES
// ============================================================================

// Simple className merger - replaces twMerge with basic deduplication
const cn = (...inputs: ClassValue[]) => {
  const classes = clsx(inputs).split(' ');
  const merged = new Map<string, string>();

  // Simple deduplication for common conflicting classes
  for (const cls of classes) {
    if (!cls) continue;

    // Handle responsive variants and state variants
    const baseClass = cls.replace(/^(sm|md|lg|xl|2xl|hover|focus|active|disabled):/, '');
    const prefix = cls.match(/^(sm|md|lg|xl|2xl|hover|focus|active|disabled):/)?.[1] || '';
    const key = prefix ? `${prefix}:${baseClass.split('-')[0]}` : baseClass.split('-')[0];

    merged.set(key, cls);
  }

  return Array.from(merged.values()).join(' ');
};

const calculateCodeStats = (code: string) => {
  const lines = code.split("\n").length;
  const chars = code.length;
  const words = code.trim().split(/\s+/).length;
  return { lines, chars, words };
};

// ============================================================================
// OPTIMIZED THEME CONFIGURATION
// ============================================================================

type TCustomTheme = { [key: string]: CSSProperties };

const customTheme: TCustomTheme = {
  'code[class*="language-"]': {
    color: "#f1f5f9",
    background: "none",
    fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
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
    fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
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
  // Simplified color scheme - merged similar elements
  comment: { color: "#636e7b", fontStyle: "italic" },
  "block-comment": { color: "#636e7b", fontStyle: "italic" },
  prolog: { color: "#636e7b" },
  doctype: { color: "#636e7b" },
  cdata: { color: "#636e7b" },
  punctuation: { color: "#94a3b8" },
  operator: { color: "#94a3b8" },
  url: { color: "#94a3b8" },
  // Pink/magenta elements
  tag: { color: "#f472b6" },
  "attr-name": { color: "#f472b6" },
  namespace: { color: "#f472b6" },
  property: { color: "#f472b6" },
  symbol: { color: "#f472b6" },
  important: { color: "#f472b6", fontWeight: "bold" },
  atrule: { color: "#f472b6" },
  keyword: { color: "#f472b6" },
  regex: { color: "#f472b6" },
  entity: { color: "#f472b6", cursor: "help" },
  // Blue elements
  "function-name": { color: "#60a5fa" },
  function: { color: "#60a5fa" },
  "class-name": { color: "#93c5fd" },
  builtin: { color: "#93c5fd" },
  // Purple elements
  boolean: { color: "#c084fc" },
  number: { color: "#c084fc" },
  constant: { color: "#c084fc" },
  // String elements
  string: { color: "#a5b4fc" },
  char: { color: "#a5b4fc" },
  "attr-value": { color: "#a5b4fc" },
  selector: { color: "#a5b4fc" },
  // Other
  deleted: { color: "#ef4444" },
  inserted: { color: "#34d399" },
  variable: { color: "#f1f5f9" },
  bold: { fontWeight: "bold" },
  italic: { fontStyle: "italic" },
};

// ============================================================================
// OPTIMIZED LANGUAGE ICONS
// ============================================================================

type TIconProps = {
  className?: string;
  size?: number;
};

const DEFAULT_ICON_SIZE = 16;

// Simplified icon data - much smaller than full SVGs
const ICON_DATA = {
  typescript: { color: "#3178c6", symbol: "TS" },
  javascript: { color: "#f7df1e", symbol: "JS" },
  python: { color: "#387EB8", symbol: "PY" },
  rust: { color: "#808080", symbol: "RS" },
  sql: { color: "#0072c6", symbol: "SQL" },
  react: { color: "#61dafb", symbol: "⚛" },
  jsx: { color: "#61dafb", symbol: "⚛" },
  tsx: { color: "#3178c6", symbol: "TSX" },
  java: { color: "#f89820", symbol: "JAVA" },
  php: { color: "#777bb4", symbol: "PHP" },
  go: { color: "#00add8", symbol: "GO" },
  css: { color: "#1572b6", symbol: "CSS" },
  html: { color: "#e34f26", symbol: "HTML" },
  json: { color: "#000000", symbol: "JSON" },
  xml: { color: "#e34f26", symbol: "XML" },
  yaml: { color: "#cb171e", symbol: "YAML" },
  bash: { color: "#4eaa25", symbol: "BASH" },
  shell: { color: "#4eaa25", symbol: "SH" },
} as const;

// Lightweight icon component using CSS instead of SVG
function SimpleIcon({
  language,
  className = "",
  size = DEFAULT_ICON_SIZE
}: TIconProps & { language: string }) {
  const iconInfo = ICON_DATA[language.toLowerCase() as keyof typeof ICON_DATA];

  if (!iconInfo) {
    return <DefaultIcon size={size} className={className} />;
  }

  return (
    <div
      className={cn("inline-flex items-center justify-center rounded text-xs font-bold", className)}
      style={{
        width: size,
        height: size,
        backgroundColor: iconInfo.color,
        color: iconInfo.color === "#f7df1e" || iconInfo.color === "#000000" ? "#000" : "#fff",
        fontSize: size * 0.4,
      }}
    >
      {iconInfo.symbol}
    </div>
  );
}

// ============================================================================
// OPTIMIZED ANIMATIONS
// ============================================================================

const ANIMATIONS = {
  collapse: {
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
  },
  copy: {
    initial: { opacity: 0, scale: 0.96 },
    animate: { opacity: 1, scale: 1, transition: { duration: 0.2, ease: [0.16, 1, 0.3, 1] } },
    exit: { opacity: 0, scale: 0.96, transition: { duration: 0.2, ease: [0.16, 1, 0.3, 1] } },
  },
  toast: {
    hidden: { opacity: 0, y: -20, scale: 0.95, transition: { duration: 0.2, ease: [0.16, 1, 0.3, 1] } },
    visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] } },
  },
};

// ============================================================================
// SIMPLIFIED BUTTON COMPONENT
// ============================================================================

type TButtonVariant = "default" | "destructive" | "outline" | "secondary" | "ghost" | "link";
type TButtonSize = "default" | "sm" | "lg" | "icon";

interface TButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: TButtonVariant;
  size?: TButtonSize;
}

// Simple button class generator - replaces CVA
const getButtonClasses = (variant: TButtonVariant = "default", size: TButtonSize = "default") => {
  const base = "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0";

  const variants = {
    default: "bg-primary text-primary-foreground shadow hover:bg-primary/90",
    destructive: "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90",
    outline: "border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground",
    secondary: "bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80",
    ghost: "hover:bg-accent hover:text-accent-foreground",
    link: "text-primary underline-offset-4 hover:underline",
  };

  const sizes = {
    default: "h-9 px-4 py-2",
    sm: "h-8 rounded-md px-3 text-xs",
    lg: "h-10 rounded-md px-8",
    icon: "h-9 w-9",
  };

  return cn(base, variants[variant], sizes[size]);
};

const Button = memo(function Button({
  className,
  variant = "default",
  size = "default",
  ...props
}: TButtonProps) {
  return (
    <button
      className={cn(getButtonClasses(variant, size), className)}
      {...props}
    />
  );
});

// ============================================================================
// TYPES
// ============================================================================

export type TBadgeVariant = "default" | "primary" | "secondary" | "success" | "warning" | "danger" | "custom";

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
// OPTIMIZED BADGE UTILITIES
// ============================================================================

type TBadgeProps = {
  variant?: TBadgeVariant;
  customColor?: string;
  customClass?: string;
};

const getBadgeClasses = ({ variant = "default", customColor, customClass }: TBadgeProps): string => {
  const base = "px-2 py-0.5 text-xs font-medium rounded-full transition-all duration-200";

  if (variant === "custom") {
    return customClass
      ? cn(base, customClass)
      : cn(base, "bg-gradient-to-r from-pink-500 to-purple-500 text-white border border-pink-500/30");
  }

  const variants = {
    primary: "border border-blue-500/30 bg-blue-500/10 text-blue-400 hover:border-blue-400 hover:text-blue-300",
    secondary: "border border-purple-500/30 bg-purple-500/10 text-purple-400 hover:border-purple-400 hover:text-purple-300",
    success: "border border-green-500/30 bg-green-500/10 text-green-400 hover:border-green-400 hover:text-green-300",
    warning: "border border-yellow-500/30 bg-yellow-500/10 text-yellow-400 hover:border-yellow-400 hover:text-yellow-300",
    danger: "border border-red-500/30 bg-red-500/10 text-red-400 hover:border-red-400 hover:text-red-300",
    default: "border border-[#333333] bg-[#111111] text-zinc-400 hover:border-[#444444] hover:text-zinc-300",
  };

  return cn(base, variants[variant]);
};

// ============================================================================
// MAIN COMPONENT
// ============================================================================

/**
 * Beautiful Code Block Component - Ultra Optimized for Size
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
  const [searchResults, setSearchResults] = useState<number[]>(initialSearchResults);
  const [currentResultIndex, setCurrentResultIndex] = useState(initialSearchResults.length > 0 ? 0 : -1);
  const [highlightedLines, setHighlightedLines] = useState<number[]>(initialHighlightedLines);

  // Refs
  const codeRef = useRef<HTMLDivElement>(null);

  // Memoized values
  const stats = useMemo(() => calculateCodeStats(code), [code]);

  // Scroll to specific line
  const scrollToLine = useCallback((lineNumber: number) => {
    const lineElement = codeRef.current?.querySelector(`[data-line-number="${lineNumber}"]`);
    lineElement?.scrollIntoView({ behavior: "smooth", block: "center" });
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
    const timeoutId = setTimeout(() => handleSearch(searchQuery), 300);
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
    const prevIndex = currentResultIndex - 1 < 0 ? searchResults.length - 1 : currentResultIndex - 1;
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
                <span>{currentResultIndex + 1}/{searchResults.length}</span>
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
              <SimpleIcon language={language} />
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
                  className={fileNameColor ? `text-${fileNameColor}-400` : "text-zinc-400"}
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
                    variants={ANIMATIONS.copy}
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
              variants={ANIMATIONS.collapse}
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
            variants={ANIMATIONS.toast}
            className="absolute top-3 right-3 flex items-center gap-2 px-3 py-2 rounded-lg bg-[#1A1A1A] border border-[#333333] shadow-lg"
          >
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span className="text-sm font-medium text-zinc-200">Copied to clipboard</span>
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
