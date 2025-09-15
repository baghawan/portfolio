"use client";

import React, { useEffect, useRef } from "react";
import { interpolate } from "flubber";
import {
  animate,
  motion,
  MotionValue,
  useMotionValue,
  useTransform,
} from "motion/react";

function encode(i: number, j: number) {
  return i * 1000 + j;
}

function getShapes(squareScale = 1) {
  const rhombus = "M50 10 L90 50 L50 90 L10 50 Z";
  const circle = polygonCirclePath(50, 50, 36, 64);
  const square = "M30 30 L70 30 L70 70 L30 70 Z";

  const scaledSquare = scalePath(square, squareScale, 50, 50);

  // recenter shapes so their centroid is at (50,50)
  return [rhombus, circle, scaledSquare].map((p) => centerPath(p, 50, 50));
}

function scalePath(path: string, scale = 1, cx = 50, cy = 50) {
  const verts = parsePathVertices(path);
  if (verts.length === 0) return path;
  const moved = verts.map(([x, y]) => [
    cx + (x - cx) * scale,
    cy + (y - cy) * scale,
  ]);

  let d = "";
  moved.forEach(([x, y], i) => {
    d +=
      i === 0
        ? `M${x.toFixed(2)} ${y.toFixed(2)}`
        : ` L${x.toFixed(2)} ${y.toFixed(2)}`;
  });
  d += " Z";
  return d;
}

function polygonCirclePath(cx: number, cy: number, r: number, segments = 32) {
  const step = (Math.PI * 2) / segments;
  let d = "";
  for (let i = 0; i < segments; i++) {
    const theta = -Math.PI / 2 + i * step;
    const x = cx + r * Math.cos(theta);
    const y = cy + r * Math.sin(theta);
    d +=
      i === 0
        ? `M${x.toFixed(2)} ${y.toFixed(2)}`
        : ` L${x.toFixed(2)} ${y.toFixed(2)}`;
  }
  d += " Z";
  return d;
}

function centerPath(path: string, targetX = 50, targetY = 50) {
  const verts = parsePathVertices(path);
  if (verts.length === 0) return path;

  const { x: cx, y: cy } = polygonCentroid(verts);
  const dx = targetX - cx;
  const dy = targetY - cy;
  const moved = verts.map(([x, y]) => [x + dx, y + dy]);

  // reconstruct a simple M/L path (we keep it a polygon)
  let d = "";
  moved.forEach(([x, y], i) => {
    d +=
      i === 0
        ? `M${x.toFixed(2)} ${y.toFixed(2)}`
        : ` L${x.toFixed(2)} ${y.toFixed(2)}`;
  });
  d += " Z";
  return d;
}

function parsePathVertices(path: string): [number, number][] {
  // extract all numbers (works for our simple M/L/Z polygons)
  const nums = path.match(/-?\d*\.?\d+(?:e[+-]?\d+)?/gi);
  if (!nums) return [];
  const values = nums.map((n) => parseFloat(n));
  const verts: [number, number][] = [];
  for (let i = 0; i < values.length; i += 2) {
    const x = values[i];
    const y = values[i + 1];
    if (typeof x === "number" && typeof y === "number") verts.push([x, y]);
  }
  return verts;
}

function polygonCentroid(verts: [number, number][]) {
  // polygon centroid (area-weighted). Falls back to average if area is zero.
  let twiceArea = 0;
  let cx = 0;
  let cy = 0;
  const n = verts.length;
  for (let i = 0; i < n; i++) {
    const [x0, y0] = verts[i];
    const [x1, y1] = verts[(i + 1) % n];
    const cross = x0 * y1 - x1 * y0;
    twiceArea += cross;
    cx += (x0 + x1) * cross;
    cy += (y0 + y1) * cross;
  }
  const denom = twiceArea || 1;
  const area = denom / 2;
  if (Math.abs(area) < 1e-8) {
    // degenerate polygon -> average vertices
    const avg = verts.reduce(
      (acc, v) => [acc[0] + v[0], acc[1] + v[1]],
      [0, 0]
    );
    return { x: avg[0] / n, y: avg[1] / n };
  }
  cx = cx / (3 * denom);
  cy = cy / (3 * denom);
  return { x: cx, y: cy };
}

type Props = {
  size?: number;
  fillClassname?: string;
  className?: string;
};

const DEFAULT_FILL_CLASSNAME = "stroke-current";

export default function MorphedShapes({
  size = 24,
  fillClassname = DEFAULT_FILL_CLASSNAME,
  className,
}: Props) {
  const duration = 0.6;
  const delay = 0.8;
  const squareScale = 1.6;

  const paths = getShapes(squareScale);
  const n = paths.length;

  const t = useMotionValue<number>(0);
  const pair = useMotionValue<number>(encode(0, 0));
  const rot = useMotionValue<number>(0);

  const interpCache = useRef<Map<string, (v: number) => string>>(new Map());
  const spinAnimRef = useRef<{ stop?: () => void } | null>(null);
  const morphAnimRef = useRef<{ stop?: () => void } | null>(null);
  const mountedRef = useRef(true);
  const timerRef = useRef<number | null>(null);

  function getInterpolator(i: number, j: number): (v: number) => string {
    const key = `${i}_${j}`;
    const cached = interpCache.current.get(key);
    if (cached) return cached;
    const fn = interpolate(paths[i], paths[j], { maxSegmentLength: 0.5 });
    interpCache.current.set(key, fn);
    return fn;
  }

  const d = useTransform(
    [t, pair] as MotionValue<number>[],
    (values: number[]) => {
      const [v, p] = values as [number, number];
      const i = Math.floor(p / 1000);
      const j = p % 1000;
      const fn = getInterpolator(i, j);
      return fn(v);
    }
  );

  const transformStyle = useTransform(rot, (r) => `rotate(${r}deg)`);

  useEffect(() => {
    mountedRef.current = true;

    function clearTimer() {
      if (timerRef.current != null) {
        clearTimeout(timerRef.current);
        timerRef.current = null;
      }
    }

    function runCycle(fromIndex: number) {
      if (!mountedRef.current) return;
      const toIndex = (fromIndex + 1) % n;

      pair.set(encode(fromIndex, toIndex));
      t.set(0);

      const spinTo = rot.get() + 270;
      spinAnimRef.current?.stop?.();
      morphAnimRef.current?.stop?.();

      spinAnimRef.current = animate(rot, spinTo, {
        duration,
        ease: "easeInOut",
      });

      morphAnimRef.current = animate(t, 1, {
        duration,
        ease: "easeInOut",
        onComplete: () => {
          if (!mountedRef.current) return;

          pair.set(encode(toIndex, toIndex));
          t.set(0);

          clearTimer();
          timerRef.current = window.setTimeout(() => {
            if (mountedRef.current) runCycle(toIndex);
          }, Math.max(0, delay) * 1000);
        },
      });
    }

    runCycle(0);

    return () => {
      mountedRef.current = false;
      spinAnimRef.current?.stop?.();
      morphAnimRef.current?.stop?.();
      if (timerRef.current != null) clearTimeout(timerRef.current);
    };
  }, [duration, delay, n, t, pair, rot]);

  return (
    <div className={className}>
      <svg
        width={size}
        height={size}
        viewBox='0 0 100 100'
        role='img'
        aria-label='Shape morphing animation'
      >
        <motion.g
          style={{
            transform: transformStyle,
            transformOrigin: "50% 50%",
            transformBox: "fill-box",
          }}
        >
          <motion.path
            d={d}
            strokeWidth={size / 2}
            fill='none'
            className={fillClassname}
          />
        </motion.g>
      </svg>
    </div>
  );
}
