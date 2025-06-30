import { Menu, Navigation, ScanQrCode } from "lucide-react";
import Drawer from "./drawer";
import { useState } from "react";

type BottomPanelProps = {
  startScanning: () => void;
  handleGeolocate: () => void;
};

function BottomPanel({ startScanning, handleGeolocate }: BottomPanelProps) {
  const [open, setOpen] = useState(false);

  return (
    <div className="absolute bottom-8 w-full flex justify-center gap-8 items-center flex-col">
      <div className="bg-white px-4 py-2 rounded-full shadow-lg">
        <span className="text-md font-medium">10 рядом</span>
      </div>
      <div className="flex gap-2">
        <Drawer
          trigger={
            <button className="bg-white size-14 rounded-full shadow-lg flex items-center justify-center">
              <Menu className="size-6" />
            </button>
          }
          open={open}
          setOpen={setOpen}
        >
          <div className="p-6 bg-gray-100 rounded-t-3xl text-md relative pb-12 flex flex-col gap-2">
            <div className="flex w-9 h-[5px] rounded-full bg-gray-400/80 mx-auto top-1 absolute left-1/2 -translate-x-1/2"></div>

            <div className="bg-white rounded-2xl p-4">
              <h3>Профиль</h3>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div className="bg-white rounded-2xl p-4">
                <h3>Кошелек</h3>
              </div>

              <div className="bg-white rounded-2xl p-4">
                <h3>Промокоды и скидки</h3>
              </div>

              <div className="bg-white rounded-2xl p-4">
                <h3>Помощь</h3>
              </div>

              <div className="bg-white rounded-2xl p-4">
                <h3>Тест на ПДД</h3>
              </div>

              <div className="bg-white rounded-2xl p-4">
                <h3>История</h3>
              </div>

              <div className="bg-white rounded-2xl p-4">
                <h3>Способы оплаты</h3>
              </div>
            </div>
          </div>
        </Drawer>

        <button
          onClick={startScanning}
          className="bg-[var(--tg-theme-button-color)] text-white px-6 py-3 h-14 rounded-full flex items-center gap-3 font-medium text-lg shadow-lg active:scale-95 transition-all text-nowrap"
        >
          <ScanQrCode className="size-6" />
          Сканировать QR-код
        </button>
        <button
          onClick={handleGeolocate}
          className="bg-white flex size-14 items-center justify-center rounded-full shadow-lg"
        >
          <Navigation className="size-6" />
        </button>
      </div>
    </div>
  );
}

export default BottomPanel;
