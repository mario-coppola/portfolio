import { cn } from "@/lib/cn";

type BadgeProps = React.PropsWithChildren<{
  className?: string;
}>;

export function Badge({ className, children }: BadgeProps) {
  return (
    <span
    className={cn(
      "inline-flex items-center rounded-full border px-2.5 py-1 text-xs",
      "border-[var(--border)] bg-[var(--card)] text-[var(--muted)]",
      "transition-colors duration-200",
      className
    )}
    >
      {children}
    </span>
  );
}