import React, { useState, useEffect, useRef } from "react";
import QrScanner from "qr-scanner";

// Эмуляция Telegram WebApp API для тестирования
declare global {
  interface Window {
    Telegram?: {
      WebApp: {
        ready: () => void;
        expand: () => void;
        enableClosingConfirmation: () => void;
        disableClosingConfirmation: () => void;
        showAlert: (message: string) => void;
        close: () => void;
        MainButton: {
          text: string;
          show: () => void;
          hide: () => void;
          onClick: (callback: () => void) => void;
        };
        themeParams: {
          bg_color?: string;
          text_color?: string;
          hint_color?: string;
          link_color?: string;
          button_color?: string;
          button_text_color?: string;
        };
      };
    };
  }
}

const TelegramQRApp: React.FC = () => {
  const [isScanning, setIsScanning] = useState(false);
  const [scannedData, setScannedData] = useState<string>("");
  const [error, setError] = useState<string>("");
  const videoRef = useRef<HTMLVideoElement>(null);
  const qrScannerRef = useRef<QrScanner | null>(null);

  useEffect(() => {
    // Инициализация Telegram WebApp
    if (window.Telegram?.WebApp) {
      const tg = window.Telegram.WebApp;
      tg.ready();
      tg.expand();

      // Устанавливаем CSS переменные для цветов темы
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

    return () => {
      // Очистка сканера при размонтировании
      if (qrScannerRef.current) {
        qrScannerRef.current.destroy();
      }
    };
  }, []);

  const startScanning = async () => {
    try {
      setError("");
      setScannedData("");
      setIsScanning(true);

      if (!videoRef.current) {
        throw new Error("Video element not found");
      }

      // Проверяем поддержку камеры
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        throw new Error("Camera not supported");
      }

      // Создаем QR сканер
      qrScannerRef.current = new QrScanner(
        videoRef.current,
        (result) => {
          setScannedData(result.data);
          stopScanning();

          // Показываем результат через Telegram API
          if (window.Telegram?.WebApp) {
            window.Telegram.WebApp.showAlert(`QR Code: ${result.data}`);
          }
        },
        {
          highlightScanRegion: true,
          highlightCodeOutline: true,
          preferredCamera: "environment", // Используем заднюю камеру
        }
      );

      await qrScannerRef.current.start();
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Unknown error";
      setError(`Ошибка доступа к камере: ${errorMessage}`);
      setIsScanning(false);
    }
  };

  const stopScanning = () => {
    if (qrScannerRef.current) {
      qrScannerRef.current.stop();
      qrScannerRef.current.destroy();
      qrScannerRef.current = null;
    }
    setIsScanning(false);
  };

  const handleScanClick = () => {
    if (isScanning) {
      stopScanning();
    } else {
      startScanning();
    }
  };

  return (
    <div className="min-h-screen bg-tg-bg text-tg-text p-5 flex flex-col items-center justify-center font-sans">
      <div className="text-center max-w-md w-full">
        <h1 className="text-2xl font-semibold mb-8 text-tg-text">QR Сканер</h1>

        {!isScanning && (
          <button
            onClick={handleScanClick}
            className="scan-button flex items-center justify-center gap-2 mx-auto hover:shadow-xl active:scale-95"
          >
            <span className="text-2xl">📱</span>
            <span>Скан</span>
          </button>
        )}

        {isScanning && (
          <div className="relative w-full">
            <div className="scanner-overlay rounded-xl overflow-hidden bg-black mb-5">
              <video
                ref={videoRef}
                className="w-full max-w-xs h-80 object-cover mx-auto block"
                playsInline
                muted
              />
            </div>

            <button
              onClick={stopScanning}
              className="bg-red-500 hover:bg-red-600 text-white border-none rounded-xl px-6 py-3 text-base font-medium cursor-pointer transition-all duration-200 active:scale-95"
            >
              Остановить
            </button>

            <div className="mt-3 text-sm text-tg-hint">
              Наведите камеру на QR-код
            </div>
          </div>
        )}

        {error && (
          <div className="bg-red-500 text-white p-4 rounded-lg mt-5 text-sm shadow-lg">
            <div className="flex items-center gap-2">
              <span className="text-lg">⚠️</span>
              <span>{error}</span>
            </div>
          </div>
        )}

        {scannedData && (
          <div className="bg-tg-button text-tg-button-text p-4 rounded-xl mt-5 break-all text-sm shadow-lg">
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

        <div className="mt-10 text-xs text-tg-hint text-center opacity-70">
          Telegram Mini App • QR Scanner
        </div>
      </div>
    </div>
  );
};

export default TelegramQRApp;
