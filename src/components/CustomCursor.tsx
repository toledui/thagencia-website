"use client";

import { useMagneticCursor } from "@/hooks/useGSAPAnimations";

export function CustomCursor() {
  const cursorRef = useMagneticCursor();

  return (
    <div
      ref={cursorRef}
      className="custom-cursor"
    />
  );
}
