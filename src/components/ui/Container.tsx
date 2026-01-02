import { cn } from "@/lib/cn";

type ContainerProps = React.PropsWithChildren<{
  className?: string;
}>;

export function Container({ className, children }: ContainerProps) {
  return (
    <div className={cn("mx-auto w-full max-w-4xl px-4", className)}>
      {children}
    </div>
  );
}