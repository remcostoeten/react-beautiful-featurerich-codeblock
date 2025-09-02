/**
 * Badge carousel utilities for responsive badge handling
 */

// Estimated minimum width for a badge (px + padding + border)
const BADGE_MIN_WIDTH = 80;

/**
 * Determines if badges should use carousel mode based on count and container width
 */
export function shouldUseCarousel(badgeCount: number, containerWidth: number): boolean {
  if (badgeCount < 3 || containerWidth === 0) return false;
  
  const estimatedTotalWidth = badgeCount * BADGE_MIN_WIDTH;
  const availableWidth = containerWidth - 120; // Reserve space for other header elements
  
  return estimatedTotalWidth > availableWidth;
}

/**
 * Calculates the scroll distance for badge carousel navigation
 */
export function calculateScrollDistance(containerWidth: number): number {
  return Math.max(containerWidth * 0.6, 200);
}
