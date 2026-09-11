import { Button, EmptyState } from "@/src/ui/react";
import { Link } from "react-router-dom";

function NotFoundPage() {
  return (
    <EmptyState
      title="Showcase page not found"
      action={
        <Button asChild>
          <Link to="/">Return home</Link>
        </Button>
      }
    >
      This route is not part of the current Digital Alchemy showcase.
    </EmptyState>
  );
}

export { NotFoundPage };
