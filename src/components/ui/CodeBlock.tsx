import { codeToHtml } from "shiki";

type CodeBlockProps = {
  code: string;
  language?: string;
  className?: string;
  showLineNumbers?: boolean;
};

const lineClassTransformer = {
  name: "code-line-block",
  line(
    node: { properties?: Record<string, unknown>; type: string },
    line: number,
  ) {
    if (node.type === "element" && node.properties) {
      const cls = (node.properties.className as string[] | undefined) ?? [];
      node.properties.className = [...cls, "code-line"];
      node.properties["data-line"] = line;
    }
  },
};

export async function CodeBlock({
  code,
  language,
  className = "",
  showLineNumbers = true,
}: CodeBlockProps) {
  const lang = language ?? "text";
  const normalized = code.endsWith("\n") ? code.slice(0, -1) : code;
  const lineCount = normalized.length ? normalized.split("\n").length : 0;

  const highlighted = await codeToHtml(normalized, {
    lang: lang === "bash" ? "bash" : lang === "json" ? "json" : "plaintext",
    themes: {
      light: "github-light",
      dark: "github-dark",
    },
    defaultColor: "light",
    transformers: [lineClassTransformer],
  });

  return (
    <div
      className={`overflow-hidden rounded-md border border-[var(--border)] bg-[var(--card)] ${className}`.trim()}
    >
      {language ? (
        <div className="border-b border-[var(--border)] px-4 py-2">
          <span className="text-xs text-[var(--muted)]">{language}</span>
        </div>
      ) : null}
      <div className="flex overflow-x-auto">
        {showLineNumbers && lineCount > 0 ? (
          <div
            className="code-gutter shrink-0 border-r border-[var(--border)] py-4 pl-4 pr-3 text-right font-mono text-[13px] leading-[1.6] text-[var(--muted)] select-none"
            aria-hidden
          >
            {Array.from({ length: lineCount }, (_, i) => (
              <div key={i} className="code-gutter-line">
                {i + 1}
              </div>
            ))}
          </div>
        ) : null}
        <div
          className="code-content min-w-0 flex-1 overflow-x-auto py-4 pr-4 pl-4 text-[13px] leading-[1.6] [&_.shiki]:!bg-transparent [&_.shiki]:!p-0 [&_.code-line]:block"
          dangerouslySetInnerHTML={{ __html: highlighted }}
        />
      </div>
    </div>
  );
}
