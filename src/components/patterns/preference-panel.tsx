import {
  Alert,
  Button,
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  Checkbox,
  Input,
  Select,
} from "@/src/ui/react";

function PreferencePanel() {
  return (
    <Card>
      <CardHeader>
        <div>
          <CardTitle>Workspace preferences</CardTitle>
          <CardDescription>A composed form with validation and action hierarchy.</CardDescription>
        </div>
      </CardHeader>
      <CardContent className="grid gap-5">
        <div className="grid gap-4 tablet:grid-cols-2">
          <label className="grid gap-2 text-sm" htmlFor="workspace-name">
            Workspace name
            <Input id="workspace-name" defaultValue="Alchemy Studio" />
          </label>
          <label className="grid gap-2 text-sm" htmlFor="workspace-visibility">
            Visibility
            <Select id="workspace-visibility" defaultValue="private">
              <option value="private">Private</option>
              <option value="organization">Organization</option>
              <option value="public">Public</option>
            </Select>
          </label>
        </div>
        <label className="flex items-start gap-3 text-sm" htmlFor="workspace-notifications">
          <Checkbox id="workspace-notifications" defaultChecked className="mt-0.5" />
          <span>
            <strong className="block">Weekly summary</strong>
            <span className="text-muted-foreground">
              Receive a compact progress and quality report.
            </span>
          </span>
        </label>
        <Alert tone="info">Changes apply to this workspace and can be revised at any time.</Alert>
      </CardContent>
      <CardFooter className="justify-end gap-2 border-t border-border/30">
        <Button variant="secondary">Cancel</Button>
        <Button>Save changes</Button>
      </CardFooter>
    </Card>
  );
}

export { PreferencePanel };
