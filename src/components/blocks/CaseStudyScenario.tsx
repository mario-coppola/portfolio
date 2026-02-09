import { DefinitionList } from "@/components/ui/DefinitionList";
import { Figure } from "@/components/ui/Figure";

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
    <section className="space-y-4">
      <h3 className="text-lg font-semibold text-[var(--foreground)]">{title}</h3>
      <DefinitionList
        items={[
          { term: labels.scenario, description: scenario },
          { term: labels.systemBehavior, description: systemBehavior },
          { term: labels.outcome, description: outcome },
        ]}
      />
      <div className="grid gap-4 md:grid-cols-2">
        {images.map((image) => (
          <Figure
            key={image.src}
            src={image.src}
            alt={image.alt}
            caption={image.caption}
          />
        ))}
      </div>
    </section>
  );
}
