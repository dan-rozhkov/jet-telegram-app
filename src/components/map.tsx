import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { useEffect, useRef, useCallback, useState } from "react";

type Marker = {
  id: string;
  lngLat: [number, number];
  title?: string;
  description?: string;
  type?: "position" | "marker";
};

// Function to generate random scooter markers near user position
const generateScooterMarkers = (userPosition: [number, number]): Marker[] => {
  const markers: Marker[] = [];
  const minRadius = 0.002; // ~200m minimum distance
  const maxRadius = 0.015; // ~1.5km maximum distance

  for (let i = 0; i < 10; i++) {
    // Generate random angle and distance with more realistic distribution
    const angle = Math.random() * 2 * Math.PI;
    const distance = minRadius + Math.random() * (maxRadius - minRadius);

    // Calculate new coordinates
    const deltaLng = distance * Math.cos(angle);
    const deltaLat = distance * Math.sin(angle);

    const newLng = userPosition[0] + deltaLng;
    const newLat = userPosition[1] + deltaLat;

    markers.push({
      id: `scooter-${i + 1}`,
      lngLat: [newLng, newLat],
      title: `Самокат ${i + 1}`,
      description: `Доступен для аренды`,
      type: "marker",
    });
  }

  return markers;
};

export function useMap() {
  const [position, setPosition] = useState<[number, number] | null>(null);
  const mapRef = useRef<mapboxgl.Map | null>(null);
  const mapContainer = useRef<HTMLDivElement>(null);
  const markersRef = useRef<mapboxgl.Marker[]>([]);

  const zoomMap = useCallback(() => {
    if (mapRef.current) {
      const currentZoom = mapRef.current.getZoom();
      mapRef.current.flyTo({
        zoom: currentZoom + 1,
        essential: true,
      });
    }
  }, [mapRef]);

  const zoomOutMap = useCallback(() => {
    if (mapRef.current) {
      const currentZoom = mapRef.current.getZoom();
      mapRef.current.flyTo({
        zoom: currentZoom - 1,
        essential: true,
      });
    }
  }, [mapRef]);

  const handleGeolocate = useCallback((): Promise<[number, number]> => {
    return new Promise((resolve, reject) => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            const coords: [number, number] = [longitude, latitude];

            mapRef.current?.flyTo({
              center: coords,
              zoom: 14,
              essential: true,
            });

            setPosition(coords);
            resolve(coords);
          },
          (error) => {
            alert("Не удалось получить геолокацию");
            reject(error);
          }
        );
      } else {
        const error = new Error("Геолокация не поддерживается");
        alert("Геолокация не поддерживается");
        reject(error);
      }
    });
  }, [mapRef]);

  return {
    mapRef,
    mapContainer,
    markersRef,
    handleGeolocate,
    zoomMap,
    zoomOutMap,
    position,
  } as const;
}

export function Map({
  mapRef,
  mapContainer,
  markersRef,
  handleGeolocate,
  position,
  onMarkerClick,
}: {
  mapRef: React.MutableRefObject<mapboxgl.Map | null>;
  mapContainer: React.RefObject<HTMLDivElement>;
  markersRef: React.MutableRefObject<mapboxgl.Marker[]>;
  handleGeolocate: () => Promise<[number, number]>;
  position: [number, number] | null;
  onMarkerClick: (marker: Marker) => void;
}) {
  const createMarkerElement = (marker: Marker) => {
    console.log(marker);
    const el = document.createElement("div");
    el.className = "custom-marker";
    el.innerHTML =
      marker.type === "position"
        ? `
          <div class="size-4 flex items-center justify-center rounded-full bg-blue-500 border-2 border-white ring-[0.5rem] ring-blue-500/20"></div>
        `
        : `
          <img src="/images/pin.svg" class="size-10" />
        `;
    return el;
  };

  const updateMarkers = async (currentPosition: [number, number] | null) => {
    // Remove existing markers
    markersRef.current.forEach((marker) => marker.remove());
    markersRef.current = [];

    // Generate scooter markers if we have user position
    const scooterMarkers = currentPosition
      ? generateScooterMarkers(currentPosition)
      : [];

    // Add scooter markers
    scooterMarkers.forEach((marker) => {
      const el = createMarkerElement(marker);
      const mapboxMarker = new mapboxgl.Marker(el)
        .setLngLat(marker.lngLat)
        .addTo(mapRef.current!);

      // Add click event
      el.addEventListener("click", () => {
        onMarkerClick?.(marker);
      });

      markersRef.current.push(mapboxMarker);
    });

    // Add position marker
    if (currentPosition) {
      const el = createMarkerElement({
        id: "position",
        lngLat: currentPosition,
        title: "Position",
        description: "Position",
        type: "position",
      });

      const mapboxMarker = new mapboxgl.Marker(el)
        .setLngLat(currentPosition)
        .addTo(mapRef.current!);

      markersRef.current.push(mapboxMarker);
    }
  };

  useEffect(() => {
    if (mapContainer.current) {
      mapRef.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: "mapbox://styles/mapbox/streets-v12",
        center: [37.6173, 55.7558],
        zoom: 9,
        accessToken:
          "pk.eyJ1IjoiZGFuaWxyb3poa292IiwiYSI6ImNtYjR2em1ibDBpMm0ybHF1d2NiOWZyY3gifQ.cTZPv1vHnlhb4e6TXiqQsA",
      });

      mapRef.current.on("load", async () => {
        try {
          const geolocationPosition = await handleGeolocate();
          await updateMarkers(geolocationPosition);
        } catch (error) {
          console.error("Failed to get geolocation:", error);
          await updateMarkers(null);
        }
      });
    }

    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
      }
    };
  }, []);

  // Update markers when position changes
  useEffect(() => {
    if (mapRef.current && mapRef.current.isStyleLoaded()) {
      updateMarkers(position);
    }
  }, [position]);

  return (
    <div className="relative h-full w-full">
      <div ref={mapContainer} className="h-full w-full" />
    </div>
  );
}
