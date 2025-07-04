import { hapticFeedback } from "@telegram-apps/sdk-react";
import { Heart, ScanQrCode, Wallet, Leaf } from "lucide-react";
import { Button } from "./ui/button";

export default function StartDrawerContent({
  setCurrentView,
}: {
  setCurrentView: (
    view: "start" | "eco" | "history" | "wallet" | "payment" | "active-ride"
  ) => void;
}) {
  return (
    <>
      <div className="flex items-center gap-4 mb-4">
        <div className="size-20 bg-gray-100 rounded-full flex items-center justify-center overflow-hidden">
          <img
            src="./images/scooter-light.png"
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
        <div
          onClick={() => {
            hapticFeedback;
            setCurrentView("wallet");
          }}
          className="bg-gray-100 rounded-2xl p-6 aspect-square font-semibold leading-tight flex flex-col justify-between gap-2"
        >
          <div className="size-8 bg-gray-400/80 rounded-full flex items-center justify-center">
            <Wallet className="size-6 text-white" />
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

      <div className="flex gap-2 w-full">
        <Button
          className="bg-blue-500 hover:bg-blue-600 text-white py-4 h-14 rounded-xl flex-1"
          onClick={() => {
            setCurrentView("payment");
          }}
        >
          <div className="text-center">
            <div className="text-sm font-bold">Поминутный</div>
            <div className="text-xs">50 ₽ • 5 ₽/мин</div>
          </div>
        </Button>

        <Button
          className="bg-blue-500 hover:bg-blue-600 text-white py-4 h-14 rounded-xl flex-1"
          onClick={() => {
            setCurrentView("payment");
          }}
        >
          <div className="text-center">
            <div className="text-sm font-bold">На 1 час</div>
            <div className="text-xs">399 ₽</div>
          </div>
        </Button>
      </div>

      <Button
        variant="outline"
        className="py-4 h-14 rounded-xl bg-transparent"
        onClick={() => {
          setCurrentView("payment");
        }}
      >
        <div className="text-center">
          <div className="text-sm font-bold">Забронировать</div>
          <div className="text-xs text-gray-500">Бесплатно</div>
        </div>
      </Button>

      <button
        onClick={() => {
          hapticFeedback;
          setCurrentView("eco");
        }}
        className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 h-14 rounded-2xl flex items-center justify-center gap-3 font-medium text-lg shadow-lg active:scale-95 transition-all text-nowrap"
      >
        <Leaf className="w-5 h-5" />
        Эко-трекер
      </button>
    </>
  );
}
