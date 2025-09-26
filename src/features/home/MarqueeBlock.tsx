"use client";

/* eslint-disable react-hooks/exhaustive-deps */
import React, { useRef, useState, useLayoutEffect } from "react";
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  useMotionValue,
  useVelocity,
  useAnimationFrame,
  wrap,
  type MotionValue,
  type MotionStyle,
} from "motion/react";

interface MarqueeProps {
  children: React.ReactNode;
  speed?: number;
  threshold?: number;
  repeat?: number;
}

export default function MarqueeBlock({
  children,
  speed = 100,
  threshold = 0.02,
  repeat = 3,
}: MarqueeProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const itemRef = useRef<HTMLDivElement | null>(null);

  // Motion value for horizontal offset (px)
  const baseX = useMotionValue<number>(0);

  // scroll velocity (smoothed)
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, {
    damping: 50,
    stiffness: 400,
  });

  // map scroll velocity -> factor (-5..5 in this mapping)
  const velocityFactor = useTransform(
    smoothVelocity,
    [-1000, 0, 1000],
    [-5, 0, 5],
    { clamp: false }
  );

  const [singleWidth, setSingleWidth] = useState<number>(0);
  const [repeatCount, setRepeatCount] = useState<number>(repeat);

  // Measure the width of a single "item" (the children wrapper) and the container,
  // then compute how many repeats we need to fill the container.
  useLayoutEffect(() => {
    if (!containerRef.current || !itemRef.current) return;

    const update = () => {
      const containerWidth = containerRef.current!.offsetWidth;
      const oneWidth = itemRef.current!.offsetWidth;

      if (oneWidth <= 0) return;

      const count = Math.max(2, Math.ceil(containerWidth / oneWidth) + 2);
      setSingleWidth(oneWidth);
      setRepeatCount(count);

      // reset baseX so the wrap starts clean after layout changes
      baseX.set(0);
    };

    update();

    const ro = new ResizeObserver(update);
    ro.observe(containerRef.current);
    ro.observe(itemRef.current);

    return () => ro.disconnect();
    // intentionally omitting exhaustive-deps to avoid reattaching observer often
  }, [children]);

  // Strongly-typed motion style (no `any` cast)
  const motionStyle: MotionStyle = { x: baseX as MotionValue<number> };

  useAnimationFrame((t, delta) => {
    if (singleWidth === 0) return; // not measured yet

    const rawFactor = velocityFactor.get();
    const factor = Math.abs(rawFactor) < threshold ? 0 : rawFactor;

    // Invert sign: scrolling down (factor > 0) => move left (negative).
    const moveBy = -1 * (delta / 1000) * speed * factor;

    // Keep baseX bounded between -singleWidth and 0 to avoid drifting large numbers
    const next = wrap(-singleWidth, 0, baseX.get() + moveBy);
    baseX.set(next);
  });

  return (
    <div
      ref={containerRef}
      className='overflow-hidden'
      aria-hidden
      style={{
        transformStyle: "preserve-3d",
        WebkitTransformStyle: "preserve-3d",
        willChange: "transform",
      }}
    >
      <motion.div
        className='flex whitespace-nowrap'
        style={motionStyle}
      >
        {Array.from({ length: repeatCount }).map((_, i) => {
          const isFirst = i === 0;
          return (
            <div
              key={i}
              ref={isFirst ? itemRef : undefined}
              className='py-2 flex items-center'
              style={{
                transform: "translate3d(0,0,0)",
                WebkitTransform: "translate3d(0,0,0)",
                willChange: "transform",
                backfaceVisibility: "hidden",
                WebkitBackfaceVisibility: "hidden",
              }}
            >
              {children}
            </div>
          );
        })}
      </motion.div>
    </div>
  );
}
