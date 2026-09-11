import { PageHeader } from "@/src/components/page-header";
import {
  ActivityFeed,
  PreferencePanel,
  ProjectSummaryCard,
  RatingMeter,
} from "@/src/components/patterns";
import { Specimen } from "@/src/components/specimen";
import {
  Avatar,
  Badge,
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  EmptyState,
  Input,
} from "@/src/ui/react";

function PatternsPage() {
  return (
    <div className="animate-fade-in grid gap-8">
      <PageHeader
        eyebrow="Composed components"
        title="Product patterns built from the UI layer."
        description="These components belong in src/components because they combine multiple reusable primitives into recognizable application features. Their children still depend only on semantic roles."
      />

      <Specimen
        name="Project summary"
        description="Card, badge, progress, rating, metadata, and action hierarchy in one reusable project block."
      >
        <div className="max-w-3xl">
          <ProjectSummaryCard
            title="Portfolio refresh"
            description="A focused delivery card suitable for dashboards and project detail pages."
            status="On track"
            progress={64}
            score={76}
          />
        </div>
      </Specimen>

      <Specimen
        name="Settings panel"
        description="A realistic settings composition using form primitives, feedback, and primary/secondary actions."
      >
        <div className="max-w-4xl">
          <PreferencePanel />
        </div>
      </Specimen>

      <Specimen
        name="Dashboard grid"
        description="Independent composed cards adapt from one column to tablet and desktop layouts."
      >
        <div className="grid gap-5 tablet:grid-cols-2">
          <ActivityFeed />
          <Card>
            <CardHeader>
              <div>
                <CardTitle>Quality pulse</CardTitle>
                <CardDescription>
                  A compact analytical panel with readable score meaning.
                </CardDescription>
              </div>
            </CardHeader>
            <CardContent className="grid gap-6">
              <RatingMeter score={91} />
              <div className="grid grid-cols-3 gap-2 text-center">
                <div className="rounded-control bg-muted p-3">
                  <p className="font-display text-xl font-bold">28</p>
                  <p className="mt-1 text-[0.625rem] text-muted-foreground">Components</p>
                </div>
                <div className="rounded-control bg-muted p-3">
                  <p className="font-display text-xl font-bold">4</p>
                  <p className="mt-1 text-[0.625rem] text-muted-foreground">Routes</p>
                </div>
                <div className="rounded-control bg-muted p-3">
                  <p className="font-display text-xl font-bold">0</p>
                  <p className="mt-1 text-[0.625rem] text-muted-foreground">Errors</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </Specimen>

      <Specimen
        name="Team directory"
        description="A responsive collection row combining identity, metadata, status, and actions."
      >
        <Card>
          <CardContent className="grid gap-3">
            {[
              {
                initials: "MY",
                name: "Mehmet Yıldız",
                role: "Design-system owner",
                state: "Active",
              },
              {
                initials: "AI",
                name: "Project agent",
                role: "Implementation collaborator",
                state: "Reviewing",
              },
            ].map((person) => (
              <article
                key={person.name}
                className="flex flex-wrap items-center gap-3 rounded-surface border border-border/30 bg-background p-4"
              >
                <Avatar alt={person.name} fallback={person.initials} />
                <div className="min-w-40 flex-1">
                  <h3 className="text-sm font-semibold">{person.name}</h3>
                  <p className="mt-1 text-xs text-metadata">{person.role}</p>
                </div>
                <Badge variant="secondary">{person.state}</Badge>
                <Button size="sm" variant="outline">
                  View profile
                </Button>
              </article>
            ))}
          </CardContent>
        </Card>
      </Specimen>

      <Specimen
        name="Search empty state"
        description="Search and zero-result feedback combined into a reusable discovery pattern."
      >
        <div className="max-w-3xl">
          <Card>
            <CardHeader>
              <div>
                <CardTitle>Find a component</CardTitle>
                <CardDescription>Search the reusable UI catalog.</CardDescription>
              </div>
            </CardHeader>
            <CardContent className="grid gap-4">
              <Input
                type="search"
                placeholder="Search components…"
                aria-label="Search components"
              />
              <EmptyState
                title="No matching components"
                action={<Button variant="secondary">Clear search</Button>}
              >
                Try a semantic role, interaction state, or component name.
              </EmptyState>
            </CardContent>
          </Card>
        </div>
      </Specimen>
    </div>
  );
}

export { PatternsPage };
