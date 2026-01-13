import React from "react";
import Link from "next/link";
import { cn } from "@/utils"; // Utility to merge classNames (optional but clean)

type Variant = "primary" | "secondary" | "outline" | "ghost" | "tab" | "pure" | "destructive";
type Size = "sm" | "md" | "lg";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  as?: "button" | "link";
  href?: string;
  variant?: Variant;
  size?: Size;
  loading?: boolean;
  icon?: React.ReactNode;
}

const baseStyles =
  "inline-flex items-center justify-center font-raleway rounded-md cursor-pointer font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2";

const variantStyles: Record<Variant, string> = {
  primary: "bg-[#00A057] text-white hover:bg-[#00A057]",
  secondary: "bg-[#E5F5EE] text-[#00A057]  hover:bg-[#E5F5EE]",
  tab: "bg-[#F7F7F7] text-[#756282]  hover:bg-[#EDEDED]",
  pure: "bg-white text-[#756282] border border-purple-200 hover:bg-[#EDEDED]",
  outline: "border border-gray-300 text-gray-700 hover:bg-gray-100 ",
  ghost: "bg-transparent text-gray-700 hover:bg-gray-100 ",
  destructive: "bg-red-600 text-white hover:bg-red-700 ",
};

const sizeStyles: Record<Size, string> = {
  sm: "px-3 py-1 text-sm",
  md: "px-4 py-2 text-base",
  lg: "px-5 py-3 text-lg",
};

export const Button: React.FC<ButtonProps> = ({
  as = "button",
  href,
  variant = "primary",
  size = "md",
  loading = false,
  icon,
  children,
  className,
  ...props
}) => {
  const classes = cn(
    baseStyles,
    variantStyles[variant],
    sizeStyles[size],
    loading && "opacity-60 cursor-not-allowed",
    className
  );

  if (as === "link" && href) {
    return (
      <Link href={href} className={classes}>
        {icon && <span className="mr-2">{icon}</span>}
        {children}
      </Link>
    );
  }

  return (
    <button className={classes} disabled={loading || props.disabled} {...props}>
      {loading ? (
        "Loading . . "
      ) : (
        <>
          {icon && <span className="mr-2">{icon}</span>}
          {children}
        </>
      )}
    </button>
  );
};
