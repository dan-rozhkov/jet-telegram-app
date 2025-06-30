import React, { useState, useEffect, useRef } from "react";
import { initQRScanner } from "@telegram-apps/sdk";
import { postEvent, on } from "@telegram-apps/bridge";
import "./types/telegram";
import { viewport } from "@telegram-apps/sdk-react";
import { Map, useMap } from "./components/map";
import BottomPanel from "./components/bottom-panel";
import MapControls from "./components/map-controls";
import { Marker } from "mapbox-gl";
import ScooterDrawer from "./components/scooter-drawer";

const TelegramApp: React.FC = () => {
  const [, setScannedData] = useState<string>("");
  const [, setError] = useState<string>("");
  const qrScannerRef = useRef<any>(null);
  const map = useMap();
  const { zoomMap, zoomOutMap, handleGeolocate, position } = map;
  const [selectedMarker, setSelectedMarker] = useState<Marker | null>(null);
  const [open, setOpen] = useState(false);

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

  const onMarkerClick = (marker: Marker) => {
    setSelectedMarker(marker);
    setOpen(true);
  };

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
      <div className="absolute top-0 left-0 w-dvw h-[calc(100dvh+10dvh)]">
        <Map
          onMarkerClick={(marker) => onMarkerClick(marker as unknown as Marker)}
          mapRef={map.mapRef}
          mapContainer={map.mapContainer}
          markersRef={map.markersRef}
          handleGeolocate={map.handleGeolocate}
          position={position}
        />
      </div>

      <ScooterDrawer
        marker={selectedMarker as unknown as Marker}
        open={open}
        setOpen={setOpen}
      />

      <MapControls zoomMap={zoomMap} zoomOutMap={zoomOutMap} />

      <BottomPanel
        startScanning={startScanning}
        handleGeolocate={handleGeolocate}
      />
    </div>
  );
};

export default TelegramApp;
