import Link from "next/link";
import { cn } from "@/lib/cn";

type TextLinkProps = {
  href: string;
  className?: string;
  external?: boolean;
  children: React.ReactNode;
};

export function TextLink({ href, className, external, children }: TextLinkProps) {
    const styles = cn(
        "text-sm text-neutral-600 underline-offset-4 transition-colors duration-200",
        "hover:text-neutral-500 hover:underline",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-900 focus-visible:ring-offset-2",
        className
      );
  if (external) {
    return (
      <a className={styles} href={href} target="_blank" rel="noreferrer">
        {children}
      </a>
    );
  }

  return (
    <Link className={styles} href={href}>
      {children}
    </Link>
  );
}