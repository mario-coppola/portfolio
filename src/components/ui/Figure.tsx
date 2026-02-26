import Image from "next/image";
import { cn } from "@/lib/cn";

type FigureProps = {
  src: string;
  alt: string;
  caption?: string;
  className?: string;
  priority?: boolean;
  /** When set, the image wrapper gets this class and the image uses object-cover to fill it (e.g. h-14 aspect-square). */
  constrainedClassName?: string;
};

export function Figure({ src, alt, caption, className, constrainedClassName, priority }: FigureProps) {
  const isConstrained = Boolean(constrainedClassName);
  return (
    <figure className={cn("space-y-2", className)}>
      <a
        href={src}
        target="_blank"
        rel="noopener noreferrer"
        className="block"
      >
        <div
          className={cn(
            "overflow-hidden rounded-md border border-[var(--border)] bg-[var(--card)]",
            isConstrained && constrainedClassName
          )}
        >
          <Image
            src={src}
            alt={alt}
            width={1600}
            height={1000}
            sizes="100vw"
            className={cn(
              "cursor-zoom-in",
              isConstrained ? "h-full w-full object-cover" : "h-auto w-full"
            )}
            priority={priority}
          />
        </div>
      </a>
      {caption ? (
        <figcaption className="text-xs text-[var(--muted)]">{caption}</figcaption>
      ) : null}
    </figure>
  );
}
