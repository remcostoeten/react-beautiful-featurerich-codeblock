/**
 * Responsive badge carousel for CodeBlock component
 * Provides smooth scrolling, auto-scroll, and navigation controls
 */

import { ChevronLeft, ChevronRight } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { Button } from "./button";
import { calculateScrollDistance } from "./carousel-utils";
import { cn } from "./cn";

type Badge = {
  text: string;
  variant: string;
  customClass?: string;
};

type TBadgeProps = {
  variant?: string;
  customColor?: string;
  customClass?: string;
};

type TProps = {
  badges: Badge[];
  getBadgeClasses: (props: TBadgeProps) => string;
  badgeVariant?: string;
  badgeColor?: string;
  autoScroll?: boolean;
  scrollInterval?: number;
};

export function BadgeCarousel({
  badges,
  getBadgeClasses,
  badgeVariant = "default",
  badgeColor,
  autoScroll = true,
  scrollInterval = 4000,
}: TProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [showNavigation, setShowNavigation] = useState(false);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const autoScrollIntervalRef = useRef<NodeJS.Timeout | undefined>(undefined);

  const updateScrollState = useCallback(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const { scrollLeft, scrollWidth, clientWidth } = container;
    setCanScrollLeft(scrollLeft > 0);
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 1);
  }, []);

  const scrollToDirection = useCallback((direction: "left" | "right") => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const scrollDistance = calculateScrollDistance(container.clientWidth);
    const scrollAmount = direction === "left" ? -scrollDistance : scrollDistance;

    container.scrollBy({
      left: scrollAmount,
      behavior: "smooth",
    });
  }, []);

  const startAutoScroll = useCallback(() => {
    if (!autoScroll || isHovered) return;

    autoScrollIntervalRef.current = setInterval(() => {
      const container = scrollContainerRef.current;
      if (!container) return;

      const { scrollLeft, scrollWidth, clientWidth } = container;
      
      // If we've reached the end, scroll back to start
      if (scrollLeft >= scrollWidth - clientWidth - 1) {
        container.scrollTo({ left: 0, behavior: "smooth" });
      } else {
        scrollToDirection("right");
      }
    }, scrollInterval);
  }, [autoScroll, isHovered, scrollInterval, scrollToDirection]);

  const stopAutoScroll = useCallback(() => {
    if (autoScrollIntervalRef.current) {
      clearInterval(autoScrollIntervalRef.current);
      autoScrollIntervalRef.current = undefined;
    }
  }, []);

  useEffect(() => {
    updateScrollState();
    
    const container = scrollContainerRef.current;
    if (!container) return;

    // Check if scrolling is needed
    setShowNavigation(container.scrollWidth > container.clientWidth);

    const handleScroll = () => updateScrollState();
    container.addEventListener("scroll", handleScroll);

    return () => container.removeEventListener("scroll", handleScroll);
  }, [updateScrollState]);

  useEffect(() => {
    if (isHovered) {
      stopAutoScroll();
    } else {
      startAutoScroll();
    }

    return stopAutoScroll;
  }, [isHovered, startAutoScroll, stopAutoScroll]);

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === "ArrowLeft") {
      e.preventDefault();
      scrollToDirection("left");
    } else if (e.key === "ArrowRight") {
      e.preventDefault();
      scrollToDirection("right");
    }
  }, [scrollToDirection]);

  return (
    <div
      className="relative flex items-center group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onKeyDown={handleKeyDown}
      tabIndex={0}
    >
      {/* Left fade gradient */}
      <div className="absolute left-0 top-0 bottom-0 w-4 bg-gradient-to-r from-[#0A0A0A] to-transparent z-10 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-200" />

      {/* Left navigation button */}
      {showNavigation && (
        <Button
          variant="ghost"
          size="icon"
          onClick={() => scrollToDirection("left")}
          className={cn(
            "absolute left-0 top-1/2 -translate-y-1/2 z-20 h-6 w-6 bg-[#0A0A0A]/80 backdrop-blur-sm border border-[#333333] text-zinc-400 hover:text-zinc-200 transition-all duration-200",
            "opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0",
            !canScrollLeft && "opacity-30 cursor-not-allowed"
          )}
          disabled={!canScrollLeft}
        >
          <ChevronLeft size={12} />
        </Button>
      )}

      {/* Scrollable container */}
      <div
        ref={scrollContainerRef}
        className={cn(
          "flex items-center gap-2 overflow-x-auto scroll-smooth",
          "scrollbar-none",
          // Hide scrollbar cross-browser
          "[&::-webkit-scrollbar]:hidden",
          "[-ms-overflow-style:none]",
          "[scrollbar-width:none]",
          // Snap scrolling
          "snap-x snap-mandatory",
          // Add padding for navigation buttons
          showNavigation && "px-6"
        )}
        style={{ scrollPaddingLeft: "1.5rem", scrollPaddingRight: "1.5rem" }}
      >
        {badges.map((badge, index) => (
          <span
            key={index}
            className={cn(
              getBadgeClasses({
                variant: badge.variant || badgeVariant,
                customColor: badgeColor,
                customClass: badge.customClass,
              }),
              "snap-start shrink-0"
            )}
          >
            {badge.text}
          </span>
        ))}
      </div>

      {/* Right navigation button */}
      {showNavigation && (
        <Button
          variant="ghost"
          size="icon"
          onClick={() => scrollToDirection("right")}
          className={cn(
            "absolute right-0 top-1/2 -translate-y-1/2 z-20 h-6 w-6 bg-[#0A0A0A]/80 backdrop-blur-sm border border-[#333333] text-zinc-400 hover:text-zinc-200 transition-all duration-200",
            "opacity-0 group-hover:opacity-100 translate-x-2 group-hover:translate-x-0",
            !canScrollRight && "opacity-30 cursor-not-allowed"
          )}
          disabled={!canScrollRight}
        >
          <ChevronRight size={12} />
        </Button>
      )}

      {/* Right fade gradient */}
      <div className="absolute right-0 top-0 bottom-0 w-4 bg-gradient-to-l from-[#0A0A0A] to-transparent z-10 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
    </div>
  );
}
