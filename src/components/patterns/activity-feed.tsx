import {
  Avatar,
  Badge,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/src/ui/react";

const activity = [
  {
    initials: "MY",
    title: "Updated semantic defaults",
    detail: "Card now resolves to graphite pearl",
    time: "8 min",
  },
  {
    initials: "UI",
    title: "Published component preview",
    detail: "Dialog, popover, and disabled states",
    time: "1 hr",
  },
  {
    initials: "DX",
    title: "Passed project checks",
    detail: "Format, lint, types, tests, and build",
    time: "3 hr",
  },
] as const;

function ActivityFeed() {
  return (
    <Card>
      <CardHeader>
        <div>
          <CardTitle>Recent activity</CardTitle>
          <CardDescription>
            Identity, metadata, status, and repeated content structure.
          </CardDescription>
        </div>
      </CardHeader>
      <CardContent>
        <ol className="grid gap-1">
          {activity.map((item, index) => (
            <li key={item.title} className="flex gap-3 rounded-control p-3 hover:bg-accent/20">
              <Avatar alt="Activity author" fallback={item.initials} />
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <p className="text-sm font-semibold text-card-foreground">{item.title}</p>
                  {index === 0 ? <Badge variant="secondary">New</Badge> : null}
                </div>
                <p className="mt-1 text-xs text-muted-foreground">{item.detail}</p>
                <p className="mt-1 text-xs text-metadata">{item.time} ago</p>
              </div>
            </li>
          ))}
        </ol>
      </CardContent>
    </Card>
  );
}

export { ActivityFeed };
