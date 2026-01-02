import { cn } from "@/lib/cn";

type CardProps = React.PropsWithChildren<{
  className?: string;
  interactive?: boolean;
}>;

export function Card({ className, interactive, children }: CardProps) {
  return (
    <div
    className={cn(
      "rounded-2xl border p-4 shadow-sm",
      "border-[var(--border)] bg-[var(--card)]",
      "transition-shadow duration-200",
      interactive &&
        "hover:shadow-md motion-safe:transition-transform motion-safe:duration-200 motion-safe:hover:scale-[1.01]",
      className
    )}
    >
      {children}
    </div>
  );
}