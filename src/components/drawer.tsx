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
        <VaulDrawer.Content className="h-auto max-h-[80%] fixed bottom-0 left-0 right-0 outline-none flex flex-col">
          <div className="flex-1 overflow-y-auto p-6 bg-white rounded-t-3xl text-md relative pb-12 flex flex-col gap-2">
            <div className="flex w-9 h-[5px] rounded-full bg-gray-400/80 mx-auto top-1 absolute left-1/2 -translate-x-1/2"></div>
            {children}
          </div>
        </VaulDrawer.Content>
      </VaulDrawer.Portal>
    </VaulDrawer.Root>
  );
}
