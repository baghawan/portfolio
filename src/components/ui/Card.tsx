import { forwardRef, type ReactNode } from "react";
import { cn } from "@/utils/cn";

type CardProps = {
  children: ReactNode;
  className?: string;
};

const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ children, className = "" }, ref) => {
    const classes = cn(
      "rounded-xl overflow-hidden bg-neutral-50 dark:bg-neutral-900",
      className
    );

    return (
      <div
        ref={ref}
        className={classes}
      >
        {children}
      </div>
    );
  }
);

Card.displayName = "Card";

export default Card;
