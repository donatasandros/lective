import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/subject/$subjectId/lecture/$lectureId")({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Hello "/subject/$id/lecture/$id"!</div>;
}
