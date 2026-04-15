import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import type { PropsWithChildren } from "react";

type Props = PropsWithChildren<{
  title: string;
  description: string;
  submitButtonTitle: string;
  cancelButtonTitle: string;
  onSubmit: () => void;
}>;

const Dialog = ({
  children,
  title,
  description,
  submitButtonTitle,
  cancelButtonTitle,
  onSubmit,
}: Props) => {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>{children}</AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>{description}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel asChild className="flex-grow">
            <Button block variant="outline">
              {cancelButtonTitle}
            </Button>
          </AlertDialogCancel>
          <AlertDialogAction asChild className="flex-grow">
            <Button block onClick={onSubmit}>
              {submitButtonTitle}
            </Button>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default Dialog;
