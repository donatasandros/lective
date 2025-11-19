import { createFileRoute } from "@tanstack/react-router";
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyTitle,
} from "@/components/ui/empty";

export const Route = createFileRoute("/subject/$subjectId/")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="flex w-full items-center justify-center">
      <Empty>
        <EmptyHeader>
          <EmptyTitle>No lectures selected</EmptyTitle>
          <EmptyDescription>
            Selected a lecture to view its notes.
          </EmptyDescription>
        </EmptyHeader>
      </Empty>
    </div>
  );
}
