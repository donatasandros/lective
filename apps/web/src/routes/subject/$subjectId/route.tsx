import { createFileRoute, Outlet } from "@tanstack/react-router";
import { LectureList } from "@/components/lecture-list";

export const Route = createFileRoute("/subject/$subjectId")({
  component: RouteComponent,
  beforeLoad: async ({ params, context }) => {
    await context.queryClient.ensureQueryData(
      context.trpc.subject.getOneById.queryOptions({
        id: params.subjectId,
      })
    );
  },
});

function RouteComponent() {
  return (
    <div className="flex w-full">
      <LectureList />
      <Outlet />
    </div>
  );
}
