import { PageHeader } from "@/src/components/page-header";
import { ProjectSummaryCard, RatingMeter } from "@/src/components/patterns";
import { useThemeLab } from "@/src/components/theme-lab-provider";
import {
  Badge,
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/src/ui/react";
import { Link as RouterLink } from "react-router-dom";

const foundations = [
  { value: "13", label: "Alchemy materials", detail: "Mode-aware raw colors" },
  { value: "30", label: "Semantic roles", detail: "Stable component language" },
  { value: "3", label: "Named breakpoints", detail: "Tablet, desktop, wide" },
  { value: "4", label: "Font sets", detail: "Including my-website" },
] as const;

function HomePage() {
  const { fontSet, motion, radius, tokens } = useThemeLab();

  return (
    <div className="animate-fade-in grid gap-8">
      <PageHeader
        eyebrow="Living design foundation"
        title="A reusable interface language, tuned in context."
        description="Digital Alchemy separates material colors from semantic intent, then shows both through real UI primitives and composed application patterns. Change the left rail once and inspect the result everywhere."
      />

      <section
        className="grid gap-4 tablet:grid-cols-2 desktop:grid-cols-4"
        aria-label="Foundation summary"
      >
        {foundations.map((item) => (
          <Card key={item.label} className="gap-3 py-5">
            <CardContent>
              <p className="font-display text-3xl font-bold text-primary">{item.value}</p>
              <p className="mt-2 text-sm font-semibold text-card-foreground">{item.label}</p>
              <p className="mt-1 text-xs text-muted-foreground">{item.detail}</p>
            </CardContent>
          </Card>
        ))}
      </section>

      <section className="grid gap-5 desktop:grid-cols-[1.2fr_0.8fr]">
        <ProjectSummaryCard
          title="Alchemy theme foundation"
          description="A product-style composition showing semantic roles under realistic pressure."
          status="In refinement"
          progress={78}
          score={86}
        />
        <Card>
          <CardHeader>
            <div>
              <CardTitle>Current structure</CardTitle>
              <CardDescription>Preferences change at the document level.</CardDescription>
            </div>
          </CardHeader>
          <CardContent className="grid gap-5">
            <dl className="grid grid-cols-2 gap-3 text-sm">
              <div className="rounded-control bg-muted p-3">
                <dt className="text-xs text-muted-foreground">Font set</dt>
                <dd className="mt-1 font-semibold capitalize">{fontSet.replace("-", " ")}</dd>
              </div>
              <div className="rounded-control bg-muted p-3">
                <dt className="text-xs text-muted-foreground">Radius</dt>
                <dd className="mt-1 font-semibold capitalize">{radius}</dd>
              </div>
              <div className="rounded-control bg-muted p-3">
                <dt className="text-xs text-muted-foreground">Motion</dt>
                <dd className="mt-1 font-semibold capitalize">{motion}</dd>
              </div>
              <div className="rounded-control bg-muted p-3">
                <dt className="text-xs text-muted-foreground">Token map</dt>
                <dd className="mt-1 font-semibold">{Object.keys(tokens).length} roles</dd>
              </div>
            </dl>
            <RatingMeter score={72} />
          </CardContent>
        </Card>
      </section>

      <section className="grid gap-5 tablet:grid-cols-3">
        <Card>
          <CardHeader>
            <div>
              <Badge variant="secondary">Foundation</Badge>
              <CardTitle className="mt-3">Understand the system</CardTitle>
              <CardDescription>Palette, rating, typography, radius, and motion.</CardDescription>
            </div>
          </CardHeader>
          <CardContent>
            <Button asChild variant="secondary">
              <RouterLink to="/foundations">Explore foundations</RouterLink>
            </Button>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <div>
              <Badge>Primitives</Badge>
              <CardTitle className="mt-3">Inspect every UI state</CardTitle>
              <CardDescription>Reusable React controls grouped by component.</CardDescription>
            </div>
          </CardHeader>
          <CardContent>
            <Button asChild>
              <RouterLink to="/ui">Open UI laboratory</RouterLink>
            </Button>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <div>
              <Badge variant="outline">Compositions</Badge>
              <CardTitle className="mt-3">See product patterns</CardTitle>
              <CardDescription>
                Multiple primitives assembled into reusable components.
              </CardDescription>
            </div>
          </CardHeader>
          <CardContent>
            <Button asChild variant="outline">
              <RouterLink to="/patterns">Browse patterns</RouterLink>
            </Button>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}

export { HomePage };
