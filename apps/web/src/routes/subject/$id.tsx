import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/subject/$id")({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Hello "/subject/$id"!</div>;
}
