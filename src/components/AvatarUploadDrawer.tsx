import Loader from "@/components/Loader";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { Field, FieldGroup } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { formSchema, type AvatarFormSchema } from "@/schemas/avatarFormSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";

type Props = {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
  isLoading: boolean;
  hasUploadedAvatar: boolean;
  onSubmit: (avatar: File) => Promise<void>;
  onDelete: () => Promise<void>;
};

const AvatarUploadDrawer = ({
  isOpen,
  setIsOpen,
  onSubmit,
  isLoading,
  hasUploadedAvatar,
  onDelete,
}: Props) => {
  const form = useForm<AvatarFormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      avatar: undefined,
    },
  });

  const handleSubmit = form.handleSubmit(async (values) => {
    await onSubmit(values.avatar);
  });

  const handleClose = (open: boolean) => {
    form.reset();
    setIsOpen(open);
  };

  const avatar = form.watch("avatar");

  return (
    <Drawer open={isOpen} onOpenChange={handleClose}>
      <DrawerContent>
        <form>
          <DrawerHeader className="items-start px-4">
            <DrawerTitle>Аватар</DrawerTitle>
            <DrawerDescription>
              Выберите файл на вашем устройстве
            </DrawerDescription>
          </DrawerHeader>
          <FieldGroup className="px-4 pt-2">
            {avatar ? (
              <div className="flex items-center justify-center">
                <div className="aspect-square w-40 overflow-hidden rounded-full">
                  <img
                    src={URL.createObjectURL(avatar)}
                    alt={avatar.name}
                    className="h-full w-full scale-110 object-cover"
                  />
                </div>
              </div>
            ) : (
              <Controller
                name="avatar"
                control={form.control}
                render={({ field }) => (
                  <Field>
                    <Button type="button" block className="relative">
                      Выбрать из галереи
                      <Input
                        type="file"
                        accept="image/png, image/jpeg"
                        className="absolute opacity-0"
                        {...field}
                        onChange={(event) => {
                          const file = event.target.files?.[0];
                          field.onChange(file);
                        }}
                        value=""
                      />
                    </Button>
                  </Field>
                )}
              />
            )}
          </FieldGroup>

          <DrawerFooter className="pt-2">
            {avatar && (
              <DrawerClose asChild>
                <Button onClick={handleSubmit} block disabled={isLoading}>
                  {isLoading ? <Loader /> : "Сохранить"}
                </Button>
              </DrawerClose>
            )}
            {hasUploadedAvatar && (
              <DrawerClose asChild>
                <Button
                  onClick={onDelete}
                  type="button"
                  variant="outline"
                  block
                  disabled={isLoading}
                >
                  {isLoading ? <Loader /> : "Удалить аватар"}
                </Button>
              </DrawerClose>
            )}
          </DrawerFooter>
        </form>
      </DrawerContent>
    </Drawer>
  );
};

export default AvatarUploadDrawer;
