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
  threshold?: number; // scroll sensitivity, not direction
  repeat?: number;
  reverse?: boolean; // flips direction of scroll + idle drift
}

export default function MarqueeBlock({
  children,
  speed = 100,
  threshold = 0.02,
  repeat = 3,
  reverse = false,
}: MarqueeProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const itemRef = useRef<HTMLDivElement | null>(null);

  const baseX = useMotionValue<number>(0);
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, {
    damping: 50,
    stiffness: 400,
  });

  const velocityFactor = useTransform(
    smoothVelocity,
    [-1000, 0, 1000],
    [-5, 0, 5],
    { clamp: false }
  );

  const [singleWidth, setSingleWidth] = useState<number>(0);
  const [repeatCount, setRepeatCount] = useState<number>(repeat);

  const directionRef = useRef(1); // 1 = right, -1 = left

  // Measure item and container widths
  useLayoutEffect(() => {
    if (!containerRef.current || !itemRef.current) return;

    const update = () => {
      const containerWidth = containerRef.current!.offsetWidth;
      const oneWidth = itemRef.current!.offsetWidth;

      if (oneWidth <= 0) return;

      const count = Math.max(2, Math.ceil(containerWidth / oneWidth) + 2);
      setSingleWidth(oneWidth);
      setRepeatCount(count);
      baseX.set(0);
    };

    update();

    const ro = new ResizeObserver(update);
    ro.observe(containerRef.current);
    ro.observe(itemRef.current);

    return () => ro.disconnect();
  }, [children]);

  const motionStyle: MotionStyle = { x: baseX as MotionValue<number> };

  useAnimationFrame((t, delta) => {
    if (singleWidth === 0) return;

    const rawFactor = velocityFactor.get();
    const directionSign = reverse ? -1 : 1;

    // update direction if user scrolls beyond threshold
    if (Math.abs(rawFactor) >= threshold) {
      directionRef.current =
        rawFactor > 0 ? -1 * directionSign : 1 * directionSign;
    }

    // base idle motion
    const baseMove = (delta / 1000) * speed * directionRef.current;

    // scroll-based boost
    const velocityMove = -(delta / 1000) * speed * rawFactor * directionSign;

    const moveBy = baseMove + velocityMove;
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
