import { PageHeader } from "@/src/components/page-header";
import { Specimen } from "@/src/components/specimen";
import { useThemeLab } from "@/src/components/theme-lab-provider";
import {
  Alert,
  Avatar,
  Badge,
  Button,
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  Checkbox,
  Dialog,
  EmptyState,
  Input,
  Link,
  Popover,
  Progress,
  Select,
  Separator,
  Skeleton,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
  Textarea,
  Tooltip,
} from "@/src/ui/react";
import * as React from "react";

function UiPage() {
  const theme = useThemeLab();
  const [dialogOpen, setDialogOpen] = React.useState(false);

  return (
    <div className="animate-fade-in grid gap-8">
      <PageHeader
        eyebrow="React UI primitives"
        title="Every reusable primitive, grouped by name."
        description="Each specimen uses semantic tokens exclusively. Use the left rail to change a role and verify that every relevant component responds consistently."
      />

      <div className="grid gap-5">
        <Specimen
          name="Badge"
          description="Default, secondary, destructive, outline, subtle, ghost, and link labels."
        >
          <div className="flex flex-wrap gap-3">
            <Badge>Default</Badge>
            <Badge variant="secondary">Secondary</Badge>
            <Badge variant="destructive">Destructive</Badge>
            <Badge variant="outline">Outline</Badge>
            <Badge variant="subtle">Subtle</Badge>
            <Badge variant="ghost">Ghost</Badge>
            <Badge variant="link">Link</Badge>
          </div>
        </Specimen>

        <Specimen
          name="Button"
          description="Action hierarchy, non-filled treatments, disabled behavior, and size options."
        >
          <div className="flex flex-wrap items-center gap-3">
            <Button>Default</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="destructive">Destructive</Button>
            <Button variant="outline">Outline</Button>
            <Button variant="ghost">Ghost</Button>
            <Button variant="glass">Glass</Button>
            <Button variant="link">Link</Button>
            <Button disabled>Disabled</Button>
            <Separator orientation="vertical" className="mx-1 h-8" />
            <Button size="xs">XS</Button>
            <Button size="sm">Small</Button>
            <Button size="lg">Large</Button>
          </div>
        </Specimen>

        <Specimen
          name="Card"
          description="A surface composition with header, supporting text, nested muted content, metadata, and actions."
        >
          <Card className="max-w-3xl">
            <CardHeader>
              <div>
                <CardTitle>A durable semantic surface</CardTitle>
                <CardDescription>
                  Long-form text tests comfort beyond a short component label.
                </CardDescription>
              </div>
              <Badge variant="subtle">Reference</Badge>
            </CardHeader>
            <CardContent>
              <article className="max-w-[68ch] text-sm leading-7 text-card-foreground">
                <p>
                  A design system becomes useful when its tokens describe intent instead of a
                  particular screen. This card is an elevated reading surface: its text should
                  remain comfortable across several sentences, while the diamond page canvas stays
                  quieter behind it and the graphite pearl card establishes a gentle boundary.
                </p>
                <p className="mt-4 text-muted-foreground">
                  The alchemy palette can retain its personality without every role becoming
                  decorative. Let semantic purpose determine where color belongs, then tune the
                  material behind that role until hierarchy, contrast, and atmosphere agree in both
                  light and dark modes.
                </p>
              </article>
              <aside className="mt-5 rounded-surface bg-muted p-4 text-sm leading-6 text-muted-foreground">
                <strong className="text-foreground">Muted inset.</strong> Supporting context can sit
                inside the larger card without competing with its primary content.
              </aside>
              <p className="mt-4 text-xs text-metadata">
                Updated 11 September 2026 · alchemy/ui/card
              </p>
            </CardContent>
            <CardFooter className="gap-2 border-t border-border/30">
              <Button size="sm">Save</Button>
              <Button size="sm" variant="secondary">
                Cancel
              </Button>
            </CardFooter>
          </Card>
        </Specimen>

        <Specimen
          name="Form controls"
          description="Input, textarea, select, and checkbox states using field-specific semantics."
        >
          <div className="grid max-w-3xl gap-4 tablet:grid-cols-2">
            <label className="grid gap-2 text-sm" htmlFor="sample-input">
              Input
              <Input id="sample-input" defaultValue="Alchemy starter" />
            </label>
            <label className="grid gap-2 text-sm" htmlFor="sample-select">
              Select
              <Select id="sample-select">
                <option>Obsidian</option>
                <option>Diamond</option>
                <option>Pearl</option>
              </Select>
            </label>
            <label className="grid gap-2 text-sm tablet:col-span-2" htmlFor="sample-textarea">
              Textarea
              <Textarea
                id="sample-textarea"
                placeholder="A longer value tests the quiet surface."
              />
            </label>
            <label className="flex items-center gap-2 text-sm" htmlFor="sample-checkbox">
              <Checkbox id="sample-checkbox" defaultChecked />
              Enable semantic defaults
            </label>
          </div>
        </Specimen>

        <Specimen
          name="Tabs"
          description="Active navigation uses a selected surface; inactive items retain readable supporting text."
        >
          <Tabs defaultValue="overview">
            <TabsList>
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="activity">Activity</TabsTrigger>
              <TabsTrigger value="settings">Settings</TabsTrigger>
            </TabsList>
            <TabsContent value="overview">
              <p className="rounded-surface bg-muted p-4 text-sm">
                Overview content uses the muted surface role.
              </p>
            </TabsContent>
            <TabsContent value="activity">
              <p className="rounded-surface bg-muted p-4 text-sm">
                Activity content responds to the same semantic mapping.
              </p>
            </TabsContent>
            <TabsContent value="settings">
              <p className="rounded-surface bg-muted p-4 text-sm">
                Settings content remains structurally identical.
              </p>
            </TabsContent>
          </Tabs>
        </Specimen>

        <Specimen
          name="Tooltip"
          description="Transient hints use the popover surface and gold popover foreground by default."
        >
          <div className="flex flex-wrap gap-4">
            <Tooltip content="Top tooltip" placement="top">
              <Button variant="outline">Top</Button>
            </Tooltip>
            <Tooltip content="Bottom tooltip" placement="bottom">
              <Button variant="outline">Bottom</Button>
            </Tooltip>
            <Tooltip content="Pointer-follow tooltip">
              <Badge variant="subtle">Follow pointer</Badge>
            </Tooltip>
          </div>
        </Specimen>

        <Specimen
          name="Popover"
          description="Positioned interactive content uses popover and popover-foreground roles."
        >
          <Popover
            trigger={<span>Open popover</span>}
            content={
              <div className="grid gap-2">
                <p className="text-sm font-semibold">Popover title</p>
                <p className="text-xs leading-5 text-popover-foreground/80">
                  Obsidian remains independent from the surrounding pearl card.
                </p>
                <Link href="#dialog">Inspect overlay usage</Link>
              </div>
            }
          />
        </Specimen>

        <Specimen
          id="dialog"
          name="Dialog and overlay"
          description="Opening the native modal reveals the overlay token behind the popover-surface panel."
        >
          <Button variant="outline" onClick={() => setDialogOpen(true)}>
            Open dialog
          </Button>
        </Specimen>

        <Specimen
          name="Alert"
          description="Information, success, warning, and danger remain separate from action semantics."
        >
          <div className="grid gap-3">
            <Alert tone="info">
              <strong>Info:</strong> Primary is currently {theme.tokens.primary}.
            </Alert>
            <Alert tone="success">
              <strong>Success:</strong> Token and structural choices persist locally.
            </Alert>
            <Alert tone="warning">
              <strong>Warning:</strong> Validate contrast before locking a combination.
            </Alert>
            <Alert tone="danger">
              <strong>Error:</strong> Destructive actions should require deliberate confirmation.
            </Alert>
          </div>
        </Specimen>

        <Specimen
          name="Status fills"
          description="Filled system states exercise each status foreground token directly."
        >
          <div className="flex flex-wrap gap-3 text-xs font-semibold">
            <span className="rounded-full bg-info px-3 py-1.5 text-info-foreground">
              Information
            </span>
            <span className="rounded-full bg-success px-3 py-1.5 text-success-foreground">
              Successful
            </span>
            <span className="rounded-full bg-warning px-3 py-1.5 text-warning-foreground">
              Warning
            </span>
            <span className="rounded-full bg-destructive px-3 py-1.5 text-destructive-foreground">
              Error
            </span>
          </div>
        </Specimen>

        <Specimen
          name="Avatar and user actions"
          description="Identity, account navigation, and the primary user action appear together."
        >
          <div className="flex flex-wrap items-center gap-3">
            <Avatar alt="Mehmet Yıldız" fallback="MY" />
            <Popover
              trigger={
                <Avatar
                  alt="Open Mehmet Yıldız account menu"
                  fallback="MY"
                  className="ring-2 ring-ring/50"
                />
              }
              content={
                <div className="grid gap-3">
                  <div>
                    <p className="text-sm font-semibold">Mehmet Yıldız</p>
                    <p className="text-xs text-popover-foreground/75">mehmetyildiz.dev</p>
                  </div>
                  <Separator />
                  <Button size="sm" variant="ghost">
                    Account settings
                  </Button>
                  <Button size="sm" variant="ghost">
                    Sign out
                  </Button>
                </div>
              }
            />
            <Button>New project</Button>
          </div>
        </Specimen>

        <Specimen
          name="Link"
          description="Inline navigation remains distinct from actions and surrounding body text."
        >
          <p className="max-w-2xl text-sm leading-7 text-foreground">
            Semantic roles describe purpose rather than material. Revisit the{" "}
            <Link href="#card">card specimen</Link>, inspect the{" "}
            <Link href="#tooltip">tooltip sample</Link>, or open the{" "}
            <Link href="#dialog">overlay example</Link>.
          </p>
        </Specimen>

        <Specimen
          name="Disabled"
          description="Disabled controls use explicit surface and foreground roles so they stay visible inside cards."
        >
          <div className="flex flex-wrap items-center gap-3">
            <Button disabled>Save changes</Button>
            <Input disabled defaultValue="Unavailable" className="max-w-44" />
            <Select disabled className="w-36">
              <option>Locked</option>
            </Select>
          </div>
        </Specimen>

        <Specimen
          name="Skeleton"
          description="Loading placeholders use the muted surface role and respect the selected motion preference."
        >
          <div className="grid max-w-md gap-3">
            <Skeleton className="h-5 w-2/5" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-4/5" />
            <div className="flex items-center gap-3">
              <Skeleton className="size-9 rounded-full" />
              <Skeleton className="h-8 w-28" />
            </div>
          </div>
        </Specimen>

        <Specimen
          name="Progress and separator"
          description="Compact feedback and structural division primitives."
        >
          <div className="grid max-w-md gap-5">
            <Progress value={68} />
            <Separator />
          </div>
        </Specimen>

        <Specimen name="Empty state" description="A common first-run or zero-results composition.">
          <EmptyState title="No projects yet" action={<Button size="sm">Create project</Button>}>
            Start with a focused idea, then let the semantic system carry its visual hierarchy.
          </EmptyState>
        </Specimen>
      </div>

      <Dialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        title="Confirm transformation"
        description="The backdrop uses overlay; this panel uses the popover surface."
      >
        <p className="text-sm leading-6 text-popover-foreground/80">
          A reusable dialog exposes modal focus, overlay density, surface hierarchy, and action
          contrast in one interaction.
        </p>
        <div className="mt-5 flex justify-end gap-2">
          <Button variant="secondary" onClick={() => setDialogOpen(false)}>
            Cancel
          </Button>
          <Button onClick={() => setDialogOpen(false)}>Confirm</Button>
        </div>
      </Dialog>
    </div>
  );
}

export { UiPage };
