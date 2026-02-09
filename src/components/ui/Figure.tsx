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
      <div className="overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--card)]">
        <Image
          src={src}
          alt={alt}
          width={1600}
          height={1000}
          sizes="(min-width: 768px) 50vw, 100vw"
          className="h-auto w-full"
          priority={priority}
        />
      </div>
      {caption ? (
        <figcaption className="text-xs text-[var(--muted)]">{caption}</figcaption>
      ) : null}
    </figure>
  );
}
