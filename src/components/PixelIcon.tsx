import React from 'react';

interface PixelIconProps {
  className?: string;
}

/**
 * Exact 8-bit pixel viewfinder glyph from Pyxel AI.
 * Formed by 4 rectangular pixel blocks leaving the 4 corners open.
 */
export const PixelIcon: React.FC<PixelIconProps> = ({ className = 'w-16 h-16' }) => {
  return (
    <svg
      viewBox="0 0 48 48"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      shapeRendering="crispEdges"
      aria-hidden="true"
    >
      {/* Top horizontal block */}
      <rect x="12" y="6" width="24" height="8" />
      {/* Bottom horizontal block */}
      <rect x="12" y="34" width="24" height="8" />
      {/* Left vertical block */}
      <rect x="6" y="12" width="8" height="24" />
      {/* Right vertical block */}
      <rect x="34" y="12" width="8" height="24" />
    </svg>
  );
};
