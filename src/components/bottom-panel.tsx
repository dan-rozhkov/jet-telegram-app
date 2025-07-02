import { Navigation, ScanQrCode } from "lucide-react";

type BottomPanelProps = {
  startScanning: () => void;
  handleGeolocate: () => void;
};

function BottomPanel({ startScanning, handleGeolocate }: BottomPanelProps) {
  return (
    <div className="relative w-full flex justify-center gap-6 items-center flex-col z-1">
      <div className="bg-white px-4 py-2 rounded-full shadow-lg">
        <span className="text-md font-medium">10 рядом</span>
      </div>
      <div className="flex gap-2">
        <button
          onClick={() => {
            startScanning();
          }}
          className="bg-[var(--tg-theme-button-color)] text-white px-6 py-3 h-14 rounded-full flex items-center gap-3 font-medium text-lg shadow-lg active:scale-95 transition-all text-nowrap"
        >
          <ScanQrCode className="size-6" />
          Сканировать QR-код
        </button>
        <button
          onClick={handleGeolocate}
          className="absolute right-4 mt-1 bg-white flex size-12 items-center justify-center rounded-full shadow-lg"
        >
          <Navigation className="size-6" />
        </button>
      </div>
    </div>
  );
}

export default BottomPanel;
