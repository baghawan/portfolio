import { cn } from "@/utils/cn";
import React from "react";

type TextVariant = "display" | "heading" | "subheading" | "body" | "caption";

type TextElement = keyof React.JSX.IntrinsicElements;

export type TextProps<T extends TextElement = "p"> = {
  variant?: TextVariant;
  as?: T;
  children: React.ReactNode;
  className?: string;
} & Omit<React.ComponentPropsWithoutRef<T>, "className">;

const variantStyles: Record<TextVariant, string> = {
  display: "text-4xl md:text-6xl lg:text-8xl font-medium",
  heading: "text-2xl md:text-3xl lg:text-4xl font-medium",
  subheading: "text-lg md:text-xl xl:text-2xl",
  body: "text-base",
  caption: "text-sm",
};

export default function Text<T extends TextElement = "p">({
  variant = "body",
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
