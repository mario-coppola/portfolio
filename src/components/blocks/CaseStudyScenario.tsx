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
  labels?: {
    scenario: string;
    systemBehavior: string;
    outcome: string;
  };
  scenarioImages: CaseStudyScenarioImage[];
  systemBehaviorImages: CaseStudyScenarioImage[];
  outcomeImages: CaseStudyScenarioImage[];
};

const defaultLabels = {
  scenario: "Scenario",
  systemBehavior: "System behavior",
  outcome: "Outcome",
};

export function CaseStudyScenario({
  title,
  scenario,
  systemBehavior,
  outcome,
  labels = defaultLabels,
  scenarioImages,
  systemBehaviorImages,
  outcomeImages,
}: CaseStudyScenarioProps) {
  return (
    <section className="space-y-4">
      <h3 className="text-lg font-semibold text-[var(--foreground)]">{title}</h3>
      <div className="space-y-2">
        <p className="text-sm text-[var(--foreground)]">
          <span className="font-semibold">{labels.scenario}:</span> {scenario}
        </p>
        <div className="space-y-4">
          {scenarioImages.map((image) => (
            <Figure key={image.src} src={image.src} alt={image.alt} />
          ))}
        </div>
      </div>
      <div className="space-y-2">
        <p className="text-sm text-[var(--foreground)]">
          <span className="font-semibold">{labels.systemBehavior}:</span> {systemBehavior}
        </p>
        <div className="space-y-4">
          {systemBehaviorImages.map((image) => (
            <Figure key={image.src} src={image.src} alt={image.alt} />
          ))}
        </div>
      </div>
      <div className="space-y-2">
        <p className="text-sm text-[var(--foreground)]">
          <span className="font-semibold">{labels.outcome}:</span> {outcome}
        </p>
        <div className="space-y-4">
          {outcomeImages.map((image) => (
            <Figure key={image.src} src={image.src} alt={image.alt} />
          ))}
        </div>
      </div>
    </section>
  );
}
