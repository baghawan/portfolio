import React from "react";
import Link, { type LinkProps } from "next/link";
import { cn } from "../../lib/cn";

export type AnchorProps = {
  href: string;
  variant?: "link" | "muted";
  children: React.ReactNode;
  className?: string;
} & Omit<
  React.AnchorHTMLAttributes<HTMLAnchorElement>,
  "href" | "className" | "children"
> &
  Omit<LinkProps, "href" | "className" | "children">;

export default function Anchor({
  href,
  children,
  className,
  variant = "link",
  ...props
}: AnchorProps) {
  const classes = cn(
    "inline-flex items-center gap-2 underline-offset-4 transition-colors",
    variant === "link"
      ? "text-indigo-600 hover:underline"
      : "text-muted-foreground hover:text-gray-600",
    className
  );

  if (href.startsWith("/")) {
    return (
      <Link
        href={href}
        {...props}
        className={classes}
      >
        {children}
      </Link>
    );
  }

  return (
    <a
      href={href}
      {...props}
      className={classes}
    >
      {children}
    </a>
  );
}
