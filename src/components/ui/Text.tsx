import React from "react";
import { cn } from "../../lib/cn";

type TextVariant = "p" | "lead" | "muted" | "caption" | "label";

type TextElement = keyof React.JSX.IntrinsicElements;

export type TextProps<T extends TextElement = "p"> = {
  variant?: TextVariant;
  as?: T;
  children: React.ReactNode;
  className?: string;
} & Omit<React.ComponentPropsWithoutRef<T>, "className">;

const variantStyles: Record<TextVariant, string> = {
  p: "text-base text-gray-800",
  lead: "text-lg text-gray-700",
  muted: "text-sm text-muted-foreground",
  caption: "text-xs text-muted-foreground",
  label: "text-sm font-medium",
};

export function Text<T extends TextElement = "p">({
  variant = "p",
  as,
  className,
  children,
  ...props
}: TextProps<T>) {
  const Component = (as || "p") as React.ElementType;

  const classes = cn(variantStyles[variant], className);

  return (
    <Component
      className={classes}
      {...props}
    >
      {children}
    </Component>
  );
}
