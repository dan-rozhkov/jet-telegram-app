import React, { useState, useEffect, useRef } from "react";
import { initQRScanner } from "@telegram-apps/sdk";
import { postEvent, on } from "@telegram-apps/bridge";
import "./types/telegram";
import {
  viewport,
  // requestFullscreen,
  // isFullscreen,
} from "@telegram-apps/sdk-react";
import { Menu, Minus, Navigation, Plus, ScanQrCode } from "lucide-react";
import { Map } from "./components/map";

const TelegramQRApp: React.FC = () => {
  const [scannedData, setScannedData] = useState<string>("");
  const [error, setError] = useState<string>("");
  const qrScannerRef = useRef<any>(null);

  useEffect(() => {
    // Telegram WebApp initialization
    viewport.mount.isAvailable() && viewport.mount(); // subscribe to height change
    viewport.bindCssVars.isAvailable() && viewport.bindCssVars();

    if (window.Telegram?.WebApp) {
      const tg = window.Telegram.WebApp;
      tg.ready();
      tg.expand();

      // Set CSS variables for theme colors
      const themeParams = tg.themeParams;
      if (themeParams) {
        const root = document.documentElement;
        Object.entries(themeParams).forEach(([key, value]) => {
          if (value) {
            root.style.setProperty(
              `--tg-theme-${key.replace(/_/g, "-")}`,
              value
            );
          }
        });
      }
    }

    async function goFull() {
      // if (requestFullscreen.isAvailable() && !isFullscreen()) {
      //   try {
      //     await requestFullscreen(); // 💥 fullscreen
      //   } catch (err) {
      //     console.warn("fullscreen failed", err);
      //   }
      // }
      postEvent("web_app_request_fullscreen");
    }

    on("visibility_changed", goFull);

    setTimeout(() => {
      goFull();
    }, 500);

    return () => {
      // Clean up scanner when unmounting
      if (qrScannerRef.current) {
        qrScannerRef.current.stop();
      }

      // off("visibility_changed", goFull);
    };
  }, []);

  const startScanning = async () => {
    try {
      setError("");
      setScannedData("");

      // Create QR scanner using Telegram SDK
      qrScannerRef.current = await initQRScanner();

      try {
        const result = await qrScannerRef.current.open({
          text: "Сканируйте QR-код",
        });

        console.log("Отсканированный QR-код:", result);
        setScannedData(result.data || result);

        // Show result through Telegram API
        if (window.Telegram?.WebApp) {
          window.Telegram.WebApp.showAlert(`QR Code: ${result.data || result}`);
        }
      } catch (error) {
        console.error("Ошибка сканирования:", error);
        setError(
          `Ошибка сканирования: ${
            error instanceof Error ? error.message : "Неизвестная ошибка"
          }`
        );
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Unknown error";
      setError(`Ошибка инициализации сканера: ${errorMessage}`);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 relative">
      <div className="absolute top-0 left-0 w-full h-full">
        <Map />
      </div>

      {/* Zoom controls */}
      <div className="absolute right-4 top-1/2 transform -translate-y-1/2 flex flex-col -space-y-[1px]">
        <button className="w-12 h-12 bg-white rounded-2xl rounded-b-none shadow-lg flex items-center justify-center text-gray-700 hover:bg-gray-50 active:scale-95">
          <Plus className="size-6" />
        </button>
        <button className="w-12 h-12 bg-white rounded-2xl rounded-t-none shadow-lg flex items-center justify-center text-gray-700 hover:bg-gray-50 active:scale-95">
          <Minus className="size-6" />
        </button>
      </div>

      {/* Bottom scan button */}
      <div className="absolute bottom-8 w-full flex justify-center gap-2">
        <button
          className="bg-white px-4 py-2 rounded-full shadow-lg"
          onClick={() => {
            postEvent("web_app_request_fullscreen");
          }}
        >
          <Menu className="size-6" />
        </button>

        <button
          onClick={startScanning}
          className="bg-[var(--tg-theme-button-color)] text-white px-8 py-4 rounded-full flex items-center gap-3 font-medium text-lg shadow-lg active:scale-95 transition-all text-nowrap"
        >
          <ScanQrCode className="size-6" />
          Сканировать QR-код
        </button>

        <button className="bg-white px-4 py-2 rounded-full shadow-lg">
          <Navigation className="size-6" />
        </button>
      </div>

      {/* Distance indicator */}
      <div className="absolute bottom-[14%] left-1/2 transform -translate-x-1/2 bg-white px-4 py-2 rounded-full shadow-lg">
        <span className="text-md font-medium">10 рядом</span>
      </div>

      {error && (
        <div className="absolute top-4 left-4 right-4 bg-red-500 text-white p-4 rounded-lg text-sm shadow-lg z-50">
          <div className="flex items-center gap-2">
            <span className="text-lg">⚠️</span>
            <span>{error}</span>
          </div>
        </div>
      )}

      {scannedData && (
        <div className="absolute top-4 left-4 right-4 bg-green-500 text-white p-4 rounded-lg text-sm shadow-lg z-50">
          <div className="flex items-start gap-2">
            <span className="text-lg flex-shrink-0">✅</span>
            <div>
              <div className="font-semibold mb-1">Результат:</div>
              <div className="font-mono text-xs bg-black bg-opacity-20 p-2 rounded">
                {scannedData}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TelegramQRApp;
