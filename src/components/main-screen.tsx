import React, { useState, useEffect, useRef } from "react";
import { initQRScanner } from "@telegram-apps/sdk";
import { postEvent, on } from "@telegram-apps/bridge";
import { viewport } from "@telegram-apps/sdk-react";
import { useMap } from "./map";
import { Marker } from "mapbox-gl";
import ScooterDrawer from "./scooter-drawer";
import MapControls from "./map-controls";
import BottomPanel from "./bottom-panel";
import { useNavigate, useLocation } from "react-router-dom";
import { Map } from "./map";

const MainScreen: React.FC = () => {
  const [, setScannedData] = useState<string>("");
  const [error, setError] = useState<string>("");
  const qrScannerRef = useRef<any>(null);
  const map = useMap();
  const { zoomMap, zoomOutMap, handleGeolocate, position } = map;
  const [selectedMarker, setSelectedMarker] = useState<Marker | null>(null);
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  let view: "start" | "eco" | "history" | "wallet" | "payment" | "active-ride" =
    "start";
  if (location.pathname === "/eco") view = "eco";
  else if (location.pathname === "/history") view = "history";
  else if (location.pathname === "/wallet") view = "wallet";
  else if (location.pathname === "/payment") view = "payment";
  else if (location.pathname === "/active-ride") view = "active-ride";
  else view = "start";

  useEffect(() => {
    viewport.mount.isAvailable() && viewport.mount();
    viewport.bindCssVars.isAvailable() && viewport.bindCssVars();

    if (window.Telegram?.WebApp) {
      const tg = window.Telegram.WebApp;
      tg.ready();
      tg.expand();
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
      postEvent("web_app_request_fullscreen");
    }

    on("visibility_changed", goFull);

    setTimeout(() => {
      goFull();
    }, 500);

    return () => {
      if (qrScannerRef.current) {
        qrScannerRef.current.stop();
      }
    };
  }, []);

  const onMarkerClick = (marker: any) => {
    setSelectedMarker(marker);
    setOpen(true);
    navigate("/start");
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
    <div className="flex flex-col items-end justify-end w-full h-full gap-4 pb-4">
      <div className="text-red-500 absolute top-0 left-0 z-1">{error}</div>
      <div className="absolute top-0 left-0 w-dvw h-[calc(100dvh+10dvh)] z-0">
        <Map
          onMarkerClick={onMarkerClick}
          mapRef={map.mapRef}
          mapContainer={map.mapContainer}
          markersRef={map.markersRef}
          handleGeolocate={handleGeolocate}
          position={position}
        />
      </div>

      <ScooterDrawer
        view={view}
        setView={(v) => navigate(`/${v}`)}
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

export default MainScreen;
