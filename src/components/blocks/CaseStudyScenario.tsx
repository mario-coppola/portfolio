import { DefinitionList } from "@/components/ui/DefinitionList";
import { Figure } from "@/components/ui/Figure";
import { TextLink } from "@/components/ui/TextLink";

type CaseStudyScenarioImage = {
  src: string;
  alt: string;
  caption?: string;
};

type CaseStudyScenarioProps = {
  title: string;
  scenario: string;
  systemBehavior: string;
  outcome: string;
  labels: {
    scenario: string;
    systemBehavior: string;
    outcome: string;
    openFullSize: string;
  };
  images: CaseStudyScenarioImage[];
};

export function CaseStudyScenario({
  title,
  scenario,
  systemBehavior,
  outcome,
  labels,
  images,
}: CaseStudyScenarioProps) {
  return (
    <details className="group rounded-md border border-[var(--border)] bg-[var(--card)] p-4">
      <summary className="cursor-pointer list-none font-semibold text-[var(--foreground)]">
        {title}
      </summary>
      <div className="mt-4 space-y-4">
        <DefinitionList
          items={[
            { term: labels.scenario, description: scenario },
            { term: labels.systemBehavior, description: systemBehavior },
            { term: labels.outcome, description: outcome },
          ]}
        />
        <div className="space-y-6">
          {images.map((image) => (
            <div key={image.src} className="space-y-2">
              <Figure src={image.src} alt={image.alt} caption={image.caption} />
              <TextLink
                href={image.src}
                external
                className="text-xs"
              >
                {labels.openFullSize}
              </TextLink>
            </div>
          ))}
        </div>
      </div>
    </details>
  );
}
