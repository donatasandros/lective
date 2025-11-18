import { useMutation } from "@tanstack/react-query";
import { useRouter } from "@tanstack/react-router";
import { PlusIcon } from "lucide-react";
import { useState } from "react";
import { queryClient, trpc } from "@/utils/trpc";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogClose,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogPopup,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Field, FieldLabel } from "./ui/field";
import { Form } from "./ui/form";
import { Input } from "./ui/input";
import { toastManager } from "./ui/toast";

type AddLectureDialogProps = {
  subjectId: string;
};

export function AddLectureDialog({ subjectId }: AddLectureDialogProps) {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  const createLecture = useMutation(
    trpc.lecture.create.mutationOptions({
      onSuccess: (data) => {
        setIsOpen(false);

        toastManager.add({
          title: "Lecture created",
          description: "Your lecture has been successfully created.",
          type: "success",
        });

        queryClient.invalidateQueries(trpc.subject.getMany.queryOptions());
        queryClient.invalidateQueries(
          trpc.subject.getOneById.queryOptions({
            id: subjectId,
          })
        );

        router.navigate({
          to: "/subject/$subjectId/lecture/$lectureId",
          params: { subjectId, lectureId: data.id },
        });
      },
      onError: (error) => {
        toastManager.add({
          title: "Error creating lecture",
          description: error.message,
          type: "error",
        });
      },
    })
  );

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    await createLecture.mutateAsync({
      title: formData.get("title") as string,
      subjectId,
    });
  };

  return (
    <Dialog onOpenChange={setIsOpen} open={isOpen}>
      <DialogTrigger render={<Button className="w-full" size="lg" />}>
        <PlusIcon /> New Lecture
      </DialogTrigger>
      <DialogPopup className="sm:max-w-sm">
        <Form onSubmit={onSubmit}>
          <DialogHeader>
            <DialogTitle>Create lecture</DialogTitle>
            <DialogDescription>
              Add a lecture to start organizing your notes.
            </DialogDescription>
          </DialogHeader>
          <div className="flex flex-col gap-4">
            <Field>
              <FieldLabel>Lecture name</FieldLabel>
              <Input
                name="title"
                placeholder="Enter lecture name"
                type="text"
              />
            </Field>
          </div>
          <DialogFooter>
            <DialogClose render={<Button variant="ghost" />}>
              Cancel
            </DialogClose>
            <Button disabled={createLecture.isPending} type="submit">
              Create lecture
            </Button>
          </DialogFooter>
        </Form>
      </DialogPopup>
    </Dialog>
  );
}
