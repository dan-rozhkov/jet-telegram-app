import Drawer from "./drawer";
import { Marker } from "mapbox-gl";
import {
  ScanQrCode,
  Wallet,
  HelpCircle,
  ClipboardCheck,
  Heart,
} from "lucide-react";

type ScooterDrawerProps = {
  marker: Marker;
  open: boolean;
  setOpen: (open: boolean) => void;
};

export default function ScooterDrawer({ open, setOpen }: ScooterDrawerProps) {
  return (
    <Drawer trigger={<></>} open={open} setOpen={setOpen}>
      <div className="p-6 bg-white rounded-t-3xl text-md relative pb-12 flex flex-col gap-2">
        <div className="flex w-9 h-[5px] rounded-full bg-gray-400/80 mx-auto top-1 absolute left-1/2 -translate-x-1/2"></div>

        <div className="flex items-center gap-4 mb-4">
          <div className="size-20 bg-gray-100 rounded-full flex items-center justify-center overflow-hidden">
            <img
              src="/images/scooter-light.png"
              className="size-full object-cover"
            />
          </div>

          <div className="flex flex-col gap-0">
            <h2 className="text-2xl font-bold">Ninebot SL</h2>
            <div className="flex items-center gap-2">
              <ScanQrCode className="size-4 text-gray-500" />
              <p className="text-gray-500 text-md">480-777</p>
            </div>

            <div className="flex items-center gap-2 mt-1.5">
              <div className="flex items-center gap-px">
                <div className="w-2 h-3.5 bg-emerald-400 rounded-sm rounded-r-none"></div>
                <div className="w-2 h-3.5 bg-emerald-400"></div>
                <div className="w-2 h-3.5 bg-emerald-400 rounded-l-none rounded-sm"></div>
                <div className="w-px h-2 bg-emerald-400 rounded-sm"></div>
              </div>

              <span className="text-gray-500 text-sm">
                ≈ на 3 часа 10 минут • 2 км
              </span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2">
          <div className="bg-gray-100 rounded-2xl p-6 aspect-square font-semibold leading-tight flex flex-col justify-between gap-2">
            <div className="size-8 bg-gray-400/80 rounded-full flex items-center justify-center">
              <HelpCircle className="size-6 text-white" />
            </div>
            <h3 className="text-sm">Тест по ПДД</h3>
          </div>

          <div className="bg-gray-100 rounded-2xl p-6 aspect-square font-semibold leading-tight flex flex-col justify-between gap-2">
            <div className="size-8 bg-gray-400/80 rounded-full flex items-center justify-center">
              <Wallet className="size-6 text-white" />
            </div>
            <h3>Помощь</h3>
          </div>

          <div className="bg-gray-100 rounded-2xl p-6 aspect-square font-semibold leading-tight flex flex-col justify-between gap-2">
            <div className="size-8 bg-gray-400/80 rounded-full flex items-center justify-center">
              <ClipboardCheck className="size-6 text-white" />
            </div>
            <h3>Кошелек</h3>
          </div>

          <div className="bg-gray-100 rounded-2xl p-6 aspect-square font-semibold leading-tight flex flex-col justify-between gap-2">
            <div className="size-8 bg-gray-400/80 rounded-full flex items-center justify-center">
              <Heart className="size-6 text-white" />
            </div>
            <h3>Промокоды и скидки</h3>
          </div>
        </div>

        <button className="bg-[var(--tg-theme-button-color)] text-white px-6 py-3 h-14 rounded-2xl flex items-center justify-center gap-3 font-medium text-lg shadow-lg active:scale-95 transition-all text-nowrap">
          Начать поездку
        </button>
      </div>
    </Drawer>
  );
}
