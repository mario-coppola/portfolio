import Link from "next/link";
import { cn } from "@/lib/cn";

type ButtonVariant = "primary" | "secondary" | "ghost";
type ButtonSize = "sm" | "md" | "lg";

const base =
  "inline-flex items-center justify-center rounded-2xl font-medium " +
  "transition-colors duration-200 motion-safe:transition-transform motion-safe:duration-200 " +
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ring)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--background)] " +
  "disabled:pointer-events-none disabled:opacity-50";

  const variants: Record<ButtonVariant, string> = {
    primary: "bg-[var(--button)] text-[var(--button-text)] hover:shadow-lg motion-safe:transition-transform motion-safe:duration-200 motion-safe:hover:scale-[1.02]",
    secondary:
      "border border-[var(--border)] bg-[var(--button)] text-[var(--button-text)] hover:bg-[color-mix(in_srgb,var(--card),var(--foreground)_6%)]",
    ghost:
      "text-[var(--foreground)] hover:bg-[color-mix(in_srgb,var(--card),var(--foreground)_6%)]",
  };

const sizes: Record<ButtonSize, string> = {
  sm: "h-9 px-3 text-sm",
  md: "h-10 px-4 text-sm font-semibold",
  lg: "h-12 px-5 text-md font-semibold",
};

type ButtonProps = {
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

export function Button({
  variant = "secondary",
  size = "md",
  className,
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(base, variants[variant], sizes[size], className)}
      {...props}
    />
  );
}

type ButtonLinkProps = {
  href: string;
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
  external?: boolean;
  children: React.ReactNode;
};

export function ButtonLink({
  href,
  variant = "secondary",
  size = "md",
  className,
  external,
  children,
}: ButtonLinkProps) {
  const shared = cn(base, variants[variant], sizes[size], className);

  if (external) {
    return (
      <a className={shared} href={href} target="_blank" rel="noreferrer">
        {children}
      </a>
    );
  }

  return (
    <Link className={shared} href={href}>
      {children}
    </Link>
  );
}