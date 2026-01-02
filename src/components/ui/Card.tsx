import { cn } from "@/lib/cn";

type CardProps = React.PropsWithChildren<{
  className?: string;
}>;

export function Card({ className, children }: CardProps) {
  return (
    <div className={cn("rounded-2xl border border-neutral-200 bg-white p-4", className)}>
      {children}
    </div>
  );
}