import { useSuspenseQuery } from "@tanstack/react-query";
import { Link, useLocation } from "@tanstack/react-router";
import { trpc } from "@/utils/trpc";
import { AddSubjectDialog } from "./add-subject-dialog";
import { Badge } from "./ui/badge";
import { buttonVariants } from "./ui/button";

export function SubjectList() {
  const { data: subjects } = useSuspenseQuery(
    trpc.subject.getMany.queryOptions()
  );

  const pathname = useLocation({
    select: (location) => location.pathname,
  });

  return (
    <aside className="flex min-h-full w-64 flex-col border-r bg-card">
      <div className="h-fit w-full border-b p-4">
        <h2 className="font-semibold text-foreground">Subjects</h2>
      </div>
      <div className="flex-1 overflow-y-auto p-3">
        <div className="space-y-1">
          {subjects.map((subject) => (
            <Link
              className={buttonVariants({
                variant: pathname.includes(subject.id) ? "secondary" : "ghost",
                size: "lg",
                className: "min-w- w-full justify-start",
              })}
              key={subject.id}
              params={{
                id: subject.id,
              }}
              title={subject.name}
              to="/subject/$id"
            >
              <span className="truncate">{subject.name}</span>
              <Badge className="ml-auto" variant="secondary">
                {subject.lectures.length}
              </Badge>
            </Link>
          ))}
        </div>
      </div>
      <div className="border-t p-3">
        <AddSubjectDialog isOnboarding={false} />
      </div>
    </aside>
  );
}
