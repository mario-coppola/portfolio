import { cn } from "@/lib/cn";

type BadgeProps = React.PropsWithChildren<{
  className?: string;
}>;

export function Badge({ className, children }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border border-neutral-200 bg-white px-2.5 py-1 text-xs text-neutral-700",
        className
      )}
    >
      {children}
    </span>
  );
}