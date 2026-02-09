import Image from "next/image";
import { cn } from "@/lib/cn";

type FigureProps = {
  src: string;
  alt: string;
  caption?: string;
  className?: string;
  priority?: boolean;
};

export function Figure({ src, alt, caption, className, priority }: FigureProps) {
  return (
    <figure className={cn("space-y-2", className)}>
      <a
        href={src}
        target="_blank"
        rel="noopener noreferrer"
        className="block"
      >
        <div className="overflow-hidden rounded-md border border-[var(--border)] bg-[var(--card)]">
          <Image
            src={src}
            alt={alt}
            width={1600}
            height={1000}
            sizes="100vw"
            className="h-auto w-full cursor-zoom-in"
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
