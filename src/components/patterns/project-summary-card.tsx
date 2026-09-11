import { RatingMeter } from "@/src/components/patterns/rating-meter";
import {
  Badge,
  Button,
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  Progress,
} from "@/src/ui/react";

function ProjectSummaryCard({
  title,
  description,
  status,
  progress,
  score,
}: {
  title: string;
  description: string;
  status: string;
  progress: number;
  score: number;
}) {
  return (
    <Card>
      <CardHeader>
        <div>
          <CardTitle>{title}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </div>
        <CardAction>
          <Badge variant="secondary">{status}</Badge>
        </CardAction>
      </CardHeader>
      <CardContent className="grid gap-5">
        <div>
          <div className="mb-2 flex justify-between text-xs">
            <span className="text-muted-foreground">Milestone progress</span>
            <span className="text-metadata">{progress}%</span>
          </div>
          <Progress value={progress} />
        </div>
        <RatingMeter score={score} />
      </CardContent>
      <CardFooter className="justify-between border-t border-border/30">
        <span className="text-xs text-metadata">Updated today</span>
        <div className="flex gap-2">
          <Button size="sm" variant="secondary">
            Archive
          </Button>
          <Button size="sm">Open project</Button>
        </div>
      </CardFooter>
    </Card>
  );
}

export { ProjectSummaryCard };
