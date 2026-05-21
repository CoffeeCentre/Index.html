import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center font-semibold uppercase tracking-[1.5px] transition-colors duration-300 disabled:pointer-events-none disabled:opacity-50 font-sans",
  {
    variants: {
      variant: {
        primary: "bg-gold text-charcoal hover:bg-gold-light",
        secondary:
          "border-2 border-white bg-transparent text-white hover:bg-white hover:text-charcoal",
        outline:
          "border-2 border-charcoal bg-transparent text-charcoal hover:bg-charcoal hover:text-white",
        dark: "bg-charcoal text-white hover:bg-charcoal-light",
        ghost: "bg-transparent text-charcoal hover:bg-cream",
      },
      size: {
        default: "px-8 py-3.5 text-[13px]",
        sm: "px-5 py-2.5 text-xs",
        lg: "px-10 py-4 text-sm",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        ref={ref}
        className={cn(buttonVariants({ variant, size }), className)}
        {...props}
      />
    );
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
