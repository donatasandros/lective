import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute, useParams } from "@tanstack/react-router";
import { RichTextEditorDemo } from "@/components/tiptap/rich-text-editor";
import { trpc } from "@/utils/trpc";

export const Route = createFileRoute("/subject/$subjectId/lecture/$lectureId")({
  component: RouteComponent,
  beforeLoad: async ({ params, context }) => {
    await context.queryClient.prefetchQuery(
      context.trpc.note.getOneByLectureId.queryOptions({
        id: params.lectureId,
      })
    );
  },
});

function RouteComponent() {
  const params = useParams({
    from: "/subject/$subjectId/lecture/$lectureId",
  });

  const { data } = useSuspenseQuery(
    trpc.note.getOneByLectureId.queryOptions({
      id: params.lectureId,
    })
  );

  return (
    <div className="flex-1">
      <RichTextEditorDemo
        content={data.content}
        key={data.lectureId}
        lectureId={data.lectureId}
      />
    </div>
  );
}
