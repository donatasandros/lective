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

type AddSubjectDialogProps = {
  isOnboarding?: boolean;
};

export function AddSubjectDialog({
  isOnboarding = false,
}: AddSubjectDialogProps) {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  const createSubject = useMutation(
    trpc.subject.create.mutationOptions({
      onSuccess: (data) => {
        setIsOpen(false);

        toastManager.add({
          title: "Subject created",
          description: "Your subject has been successfully created.",
          type: "success",
        });

        queryClient.invalidateQueries(trpc.subject.getMany.queryOptions());

        router.navigate({ to: "/subject/$id", params: { id: data.id } });
      },
      onError: (error) => {
        toastManager.add({
          title: "Error creating subject",
          description: error.message,
          type: "error",
        });
      },
    })
  );

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    await createSubject.mutateAsync({
      name: formData.get("name") as string,
    });
  };

  return (
    <Dialog onOpenChange={setIsOpen} open={isOnboarding ? true : isOpen}>
      {!isOnboarding && (
        <DialogTrigger
          render={<Button className="w-full" size="lg" variant="outline" />}
        >
          <PlusIcon /> New Subject
        </DialogTrigger>
      )}
      <DialogPopup className="sm:max-w-sm" showCloseButton={!isOnboarding}>
        <Form onSubmit={onSubmit}>
          <DialogHeader>
            <DialogTitle>Create a subject</DialogTitle>
            <DialogDescription>
              Add a subject to start organizing your lectures and notes. You can
              edit or remove it anytime.
            </DialogDescription>
          </DialogHeader>
          <div className="flex flex-col gap-4">
            <Field>
              <FieldLabel>Subject name</FieldLabel>
              <Input name="name" placeholder="Enter subject name" type="text" />
            </Field>
          </div>
          <DialogFooter>
            {!isOnboarding && (
              <DialogClose render={<Button variant="ghost" />}>
                Cancel
              </DialogClose>
            )}
            <Button disabled={createSubject.isPending} type="submit">
              Create subject
            </Button>
          </DialogFooter>
        </Form>
      </DialogPopup>
    </Dialog>
  );
}
