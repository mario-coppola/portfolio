import Link from "next/link";
import { cn } from "@/lib/cn";

type TextLinkProps = {
  href: string;
  className?: string;
  external?: boolean;
  children: React.ReactNode;
};

export function TextLink({ href, className, external, children }: TextLinkProps) {
  const styles = cn("text-sm text-neutral-600 hover:text-neutral-900 hover:underline", className);

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