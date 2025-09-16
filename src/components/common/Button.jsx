import { cva } from "class-variance-authority";
import clsx from "clsx";

const buttonVariants = cva(
  "rounded-lg font-semibold transition-all transform hover:scale-105 focus:outline-none cursor-pointer",
  {
    variants: {
      variant: {
        primary: "bg-surface text-foreground shadow-lg hover:bg-surface/90",
        secondary: "bg-muted text-text-secondary hover:bg-muted/80",
        outline:
          "border-2 border-border text-subtle-text hover:bg-surface hover:text-foreground",
        ghost: "text-subtle-text hover:bg-surface hover:text-foreground",
        destructive: "bg-red-600 text-white shadow-lg hover:bg-red-700",
        muted: "bg-muted text-text-secondary cursor-not-allowed opacity-70",
      },
      size: {
        sm: "px-4 py-2 text-sm",
        md: "px-6 py-3 text-base",
        lg: "px-8 py-4 text-lg",
      },
      width: {
        auto: "w-auto",
        full: "w-full",
        fit: "w-fit",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "lg",
      width: "auto",
    },
  }
);

export function Button({
  variant,
  size,
  width,
  className,
  children,
  ...props
}) {
  return (
    <button
      className={clsx(buttonVariants({ variant, size, width }), className)}
      {...props}
    >
      {children}
    </button>
  );
}
