'use client'

import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowDown,
  ArrowUp,
  Check,
  CheckCircle2,
  ChevronDown,
  Copy,
  Search,
  X,
} from "lucide-react";
import { memo, useCallback, useEffect, useRef, useState } from "react";
import PrismTheme, { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { ANIMATION_VARIANTS, COPY_VARIANTS, TOAST_VARIANTS } from "./animations";
import { Button } from "./button";
import { cn } from "./cn";
import { customTheme } from "./custom-theme";
import * as Icons from "./icons";

export interface CodeBlockProps {
  code: string
  fileName: string
  language: string 
  badges?: string[]
  showLineNumbers?: boolean
  enableLineHighlight?: boolean
  showMetaInfo?: boolean
  maxHeight?: string
  className?: string
  onCopy?: (code: string) => void
  onLineClick?: (lineNumber: number) => void
  onSearch?: (query: string, results: number[]) => void
}

function getLanguageIcon(language: string) {
  const IconComponent = Icons[`${language.charAt(0).toUpperCase() + language.slice(1)}Icon`] || Icons.CodeIcon
  return <IconComponent size={16} />
}

function calculateCodeStats(code: string) {
  const lines = code.split('\n').length
  const chars = code.length
  const words = code.trim().split(/\s+/).length
  return { lines, chars, words }
}

function CodeBlock({
  code,
  fileName,
  language,
  badges = [],
  showLineNumbers = true,
  enableLineHighlight = true,
  showMetaInfo = true,
  maxHeight = "60vh",
  className,
  onCopy,
  onLineClick,
  onSearch
}: CodeBlockProps) {
  const [isCollapsed, setIsCollapsed] = useState(false)
  const [isCopied, setIsCopied] = useState(false)
  const [isHovered, setIsHovered] = useState(false)
  const [highlightedLines, setHighlightedLines] = useState<number[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [isSearching, setIsSearching] = useState(false)
  const [searchResults, setSearchResults] = useState<number[]>([])
  const [currentResultIndex, setCurrentResultIndex] = useState<number>(0)
  const codeRef = useRef<HTMLDivElement>(null)

  const stats = calculateCodeStats(code)

  const handleLineClick = useCallback((lineNumber: number) => {
    if (!enableLineHighlight) return
    
    setHighlightedLines(prev => {
      const newLines = prev.includes(lineNumber)
        ? prev.filter(n => n !== lineNumber)
        : [...prev, lineNumber].sort((a, b) => a - b)
      
      onLineClick?.(lineNumber)
      return newLines
    })
  }, [enableLineHighlight, onLineClick])

  const scrollToLine = useCallback((lineNumber: number) => {
    if (!codeRef.current) return

    const lineElement = codeRef.current.querySelector(`[data-line-number="${lineNumber}"]`)
    if (lineElement) {
      lineElement.scrollIntoView({ behavior: 'smooth', block: 'center' })
    }
  }, [])

  const handleSearch = useCallback((query: string) => {
    setSearchQuery(query)
    if (!query) {
      setSearchResults([])
      setCurrentResultIndex(0)
      setHighlightedLines([])
      onSearch?.("", [])
      return
    }
    
    const lines = code.split('\n')
    const matches = lines.reduce((acc, line, index) => {
      if (line.toLowerCase().includes(query.toLowerCase())) {
        acc.push(index + 1)
      }
      return acc
    }, [] as number[])
    
    setSearchResults(matches)
    setCurrentResultIndex(matches.length > 0 ? 0 : -1)
    setHighlightedLines(matches)
    onSearch?.(query, matches)

    if (matches.length > 0) {
      scrollToLine(matches[0])
    }
  }, [code, onSearch, scrollToLine])

  const handleSearchKeyDown = useCallback((e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      if (searchResults.length === 0) return

      setCurrentResultIndex(prev => {
        const nextIndex = prev + 1
        if (nextIndex >= searchResults.length) {
          return 0
        }
        return nextIndex
      })
    }
  }, [searchResults.length])

  const handleSearchResultsNavigate = useCallback((direction: 'next' | 'prev') => {
    setCurrentResultIndex(prev => {
      if (direction === 'next') {
        const nextIndex = prev + 1
        if (nextIndex >= searchResults.length) {
          return 0
        }
        return nextIndex
      } else {
        const prevIndex = prev - 1
        if (prevIndex < 0) {
          return searchResults.length - 1
        }
        return prevIndex
      }
    })
  }, [searchResults.length])

  useEffect(() => {
    if (searchResults.length > 0) {
      scrollToLine(searchResults[currentResultIndex])
    }
  }, [currentResultIndex, scrollToLine, searchResults])

  useEffect(() => {
    if (!isSearching) {
      setSearchQuery("")
      setSearchResults([])
      setCurrentResultIndex(0)
    }
  }, [isSearching])

  useEffect(() => {
    const timer = setTimeout(() => {
      if (isCopied) setIsCopied(false)
    }, 2000)

    return () => clearTimeout(timer)
  }, [isCopied])

  const copyToClipboard = useCallback(() => {
    if (!navigator?.clipboard) {
      console.warn('Clipboard not supported')
      return
    }

    navigator.clipboard.writeText(code).then(() => {
      setIsCopied(true)
      onCopy?.(code)
    })
  }, [code, onCopy])

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if ((e.ctrlKey || e.metaKey) && e.key === 'c') {
      e.preventDefault()
      copyToClipboard()
    } else if ((e.ctrlKey || e.metaKey) && e.key === 'f') {
      e.preventDefault()
      setIsSearching(true)
    } else if (e.key === 'Escape') {
      setIsSearching(false)
    }
  }, [copyToClipboard])

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [handleKeyDown])

  const toggleCollapse = useCallback(() => {
    setIsCollapsed(prev => !prev)
  }, [])

  const renderSearchBar = () => {
    if (!isSearching) return null

    return (
      <div className="flex items-center gap-2 bg-[#1A1A1A] border border-[#333333] rounded-lg px-3 py-1.5 w-full">
        <Search size={16} className="text-zinc-500" />
        <input
          type="text"
          placeholder="Search code..."
          className="bg-transparent text-zinc-200 placeholder:text-zinc-500 focus:outline-none w-full"
          value={searchQuery}
          onChange={e => handleSearch(e.target.value)}
          onKeyDown={handleSearchKeyDown}
          autoFocus
        />
        {searchQuery && (
          <>
            <div className="flex items-center gap-1 text-xs text-zinc-500">
              <span>{searchResults.length} results</span>
              {searchResults.length > 0 && (
                <span>
                  {currentResultIndex + 1}/{searchResults.length}
                </span>
              )}
            </div>

            <div className="flex items-center gap-1">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => handleSearchResultsNavigate('prev')}
                className="h-5 w-5 text-zinc-500 hover:text-zinc-200 rounded transition-colors duration-200 hover:bg-white/5"
              >
                <ArrowUp size={14} />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => handleSearchResultsNavigate('next')}
                className="h-5 w-5 text-zinc-500 hover:text-zinc-200 rounded transition-colors duration-200 hover:bg-white/5"
              >
                <ArrowDown size={14} />
              </Button>
            </div>
          </>
        )}
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setIsSearching(false)}
          className="ml-auto h-5 w-5 text-zinc-500 hover:text-zinc-200 rounded transition-colors duration-200 hover:bg-white/5"
        >
          <X size={14} />
        </Button>
      </div>
    )
  }

  const renderKeyboardHints = () => {
    if (isSearching) return null

    return (
      <div className="flex items-center gap-2 absolute top-3 right-12 text-xs text-zinc-600">
        <kbd className="text-[10px] text-zinc-400 bg-zinc-800 border border-zinc-600 px-1 py-0.5 rounded">
          ⌘/Ctrl + F
        </kbd>
        <span>to search</span>
      </div>
    )
  }

  return (
    <div
      className={cn(
        "group relative w-full bg-black rounded-lg",
        isCollapsed ? 'h-12' : 'min-h-[200px]',
        className,
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex items-center h-12 border-b border-b-zinc-800">
        <div className="flex items-center gap-2 text-xs text-zinc-400 px-4">
          {showMetaInfo && (
            <>
              <div className="flex items-center gap-1.5">
                {getLanguageIcon(language)}
                <span className="text-zinc-200">{language}</span>
              </div>
              <div className="flex items-center">
                <span>{stats.lines} lines</span>
                <span className="mx-1.5 text-zinc-600">•</span>
                <span>{stats.chars} chars</span>
                <span className="mx-1.5 text-zinc-600">•</span>
                <span>{stats.words} words</span>
              </div>
              {badges.map((badge, index) => (
                <span
                  key={index}
                  className="bg-zinc-900 text-zinc-300 border border-zinc-700 rounded-md px-1.5 py-0.5"
                >
                  {badge}
                </span>
              ))}
            </>
          )}
        </div>

        <div className="relative ml-auto pr-4">
          {renderSearchBar()}

          <div className="flex items-center gap-1">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsSearching(true)}
              className="text-zinc-500 hover:text-zinc-200 h-8 w-8 rounded-lg transition-all duration-200 hover:bg-white/5"
              title="Search code  (⌘/Ctrl + F)"
            >
              <Search size={16} />
            </Button>
            
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleCollapse}
              className="text-zinc-500 hover:text-zinc-200 h-8 w-8 rounded-lg transition-all duration-200 hover:bg-white/5"
              title={`${isCollapsed ? 'Expand' : 'Collapse'} code block`}
            >
              <motion.div
                animate={{ rotate: isCollapsed ? 0 : 180 }}
                transition={{ duration: 0.2 }}
              >
                <ChevronDown size={16} />
              </motion.div>
            </Button>
            
            <Button
              variant="ghost"
              size="icon"
              onClick={copyToClipboard}
              className="relative h-8 w-8 text-zinc-500 hover:text-zinc-200 rounded-lg transition-all duration-200 hover:bg-white/5"
              title="Copy code  (⌘/Ctrl + C)"
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

        {renderKeyboardHints()}

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
                  <div className="absolute left-0 top-0 bottom-0 w-[3.5rem] bg-gradient-to-r from-black via-black/50 to-transparent pointer-events-none z-10" />
                )}
                
                <div className="p-4 overflow-y-auto" style={{ maxHeight }}>
                  <SyntaxHighlighter
                    language={language.toLowerCase()}
                    style={customTheme as PrismTheme}
                    customStyle={{
                      margin: 0,
                      padding: 0,
                      background: 'transparent',
                      fontSize: '0.875rem',
                    }}
                    showLineNumbers={showLineNumbers}
                    lineNumberStyle={{
                      color: '#666666',
                      minWidth: '2.5em',
                      paddingRight: '1em',
                      textAlign: 'right',
                      userSelect: 'none',
                      opacity: isHovered ? 1 : 0.5,
                      transition: 'opacity 0.2s ease'
                    }}
                    wrapLines={true}
                    wrapLongLines={true}
                    lineProps={(lineNumber) => ({
                      style: {
                        cursor: enableLineHighlight ? 'pointer' : 'default',
                        background: highlightedLines.includes(lineNumber) 
                          ? searchResults.length > 0 && lineNumber === searchResults[currentResultIndex]
                            ? 'rgba(255, 255, 255, 0.1)'
                            : 'rgba(255, 255, 255, 0.05)'
                          : 'transparent',
                        display: 'block',
                        transition: 'background-color 0.15s ease',
                      },
                      onClick: () => handleLineClick(lineNumber),
                      'data-line-number': lineNumber
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
  )
}

export default memo(CodeBlock)
