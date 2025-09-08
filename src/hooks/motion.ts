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

  const initial = reduce
    ? { y: 0, opacity: 1, filter: "none" }
    : { y: 20, opacity: 0, filter: "blur(15px)" };
  const animate = { y: 0, opacity: 1, filter: "none" };

  const yTransition: ValueTransition = {
    type: "spring",
    visualDuration: 0.4,
    bounce: 0.5,
  };

  const transition = (delay = 0) => ({
    duration: 0.4,
    delay,
    y: {
      ...yTransition,
      delay,
    },
  });

  return { initial, animate, transition } as const;
}
