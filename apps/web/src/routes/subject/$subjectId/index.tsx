import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/subject/$subjectId/")({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Hello "/subject/$id"!</div>;
}
