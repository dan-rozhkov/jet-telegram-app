import { Drawer as VaulDrawer } from "vaul";

type DrawerProps = {
  children: React.ReactNode;
  trigger: React.ReactNode;
  open: boolean;
  setOpen: (open: boolean) => void;
};

export default function Drawer({
  children,
  trigger,
  open,
  setOpen,
}: DrawerProps) {
  return (
    <VaulDrawer.Root open={open} onOpenChange={setOpen}>
      <VaulDrawer.Trigger asChild>{trigger}</VaulDrawer.Trigger>
      <VaulDrawer.Portal>
        <VaulDrawer.Overlay className="fixed inset-0 bg-black/20" />
        <VaulDrawer.Content className="h-fit fixed bottom-0 left-0 right-0 outline-none">
          {children}
        </VaulDrawer.Content>
      </VaulDrawer.Portal>
    </VaulDrawer.Root>
  );
}
