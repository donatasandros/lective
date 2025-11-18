import { useSuspenseQuery } from "@tanstack/react-query";
import { Link, useLocation, useParams } from "@tanstack/react-router";
import { NotebookTextIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { trpc } from "@/utils/trpc";
import { AddLectureDialog } from "./add-lecture-dialog";
import { Card, CardPanel } from "./ui/card";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "./ui/empty";
import {
  Select,
  SelectItem,
  SelectPopup,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

const sortItems = [
  { label: "Sorty by: Date", value: "date" },
  { label: "Sorty by: Importance", value: "importance" },
];

export function LectureList() {
  const params1 = useParams({
    from: "/subject/$subjectId/",
    shouldThrow: false,
  });

  const pathname = useLocation({
    select: (location) => location.pathname,
  });

  const params2 = useParams({
    from: "/subject/$subjectId/lecture/$lectureId",
    shouldThrow: false,
  });

  const subjectId = (params1?.subjectId || params2?.subjectId) ?? "";

  const { data: subject } = useSuspenseQuery(
    trpc.subject.getOneById.queryOptions({
      id: subjectId,
    })
  );

  return (
    <div className="flex min-h-full w-96 flex-col border-r bg-muted">
      <div className="border-b bg-card p-4">
        <div className="mb-3 flex items-center justify-between">
          <h2 className="font-semibold text-foreground">
            {subject.name} lectures
          </h2>
        </div>
        <Select
          aria-label="Select sorting option"
          defaultValue="date"
          items={sortItems}
        >
          <SelectTrigger>
            <SelectValue className="text-left" />
          </SelectTrigger>
          <SelectPopup>
            {sortItems.map(({ label, value }) => (
              <SelectItem key={value} value={value}>
                {label}
              </SelectItem>
            ))}
          </SelectPopup>
        </Select>
      </div>
      {subject.lectures.length > 0 ? (
        <>
          <div className="flex-1 overflow-y-auto p-3">
            <div className="space-y-2">
              {subject.lectures.map((lecture) => (
                <Link
                  className="block"
                  key={lecture.id}
                  params={{
                    subjectId: subject.id,
                    lectureId: lecture.id,
                  }}
                  to="/subject/$subjectId/lecture/$lectureId"
                >
                  <Card
                    className={cn(
                      "py-4",
                      pathname.includes(lecture.id) && "ring ring-pimary"
                    )}
                  >
                    <CardPanel className="px-4">
                      <div className="mb-2 flex items-start justify-between gap-2">
                        <p className="font-medium text-sm leading-snug">
                          {lecture.title}
                        </p>
                      </div>
                      <p className="text-muted-foreground text-xs">
                        {lecture.date}
                      </p>
                    </CardPanel>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
          <div className="border-t bg-card p-3">
            <AddLectureDialog subjectId={subjectId} />
          </div>
        </>
      ) : (
        <Empty>
          <EmptyHeader>
            <EmptyMedia variant="icon">
              <NotebookTextIcon />
            </EmptyMedia>
            <EmptyTitle>No lectures found</EmptyTitle>
            <EmptyDescription>
              Create a new lecture to get started.
            </EmptyDescription>
          </EmptyHeader>
          <EmptyContent>
            <AddLectureDialog subjectId={subjectId} />
          </EmptyContent>
        </Empty>
      )}
    </div>
  );
}
