import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { trpc } from "@/utils/trpc";

export const Route = createFileRoute("/")({
  component: HomeComponent,
  beforeLoad: async ({ context }) => {
    await context.queryClient.ensureQueryData(
      context.trpc.subject.getMany.queryOptions()
    );
  },
});

function HomeComponent() {
  const { data: subjects } = useSuspenseQuery(
    trpc.subject.getMany.queryOptions()
  );

  return (
    <div>
      <pre>{JSON.stringify(subjects, null, 2)}</pre>
    </div>
  );
}
