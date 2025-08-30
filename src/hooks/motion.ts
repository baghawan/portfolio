"use client";

import type { ValueTransition } from "motion/react";
import { useReducedMotion } from "motion/react";

/**
 * Returns common motion values (initial, animate) and a helper to build transitions.
 * - `initial` and `animate` automatically respect reduced motion settings.
 * - `transition(delay)` returns a nice transition object with a springy Y transition merged in.
 */
export function useEntranceMotion() {
  const reduce = useReducedMotion();

  const initial = reduce ? { y: 0, opacity: 1 } : { y: 20, opacity: 0 };
  const animate = { y: 0, opacity: 1 };

  const yTransition: ValueTransition = {
    type: "spring",
    visualDuration: 0.3,
    bounce: 0.5,
  };

  const transition = (delay = 0) => ({
    duration: 0.2,
    delay,
    y: {
      ...yTransition,
      delay,
    },
  });

  return { initial, animate, transition } as const;
}
