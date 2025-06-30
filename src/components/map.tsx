import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { useEffect, useRef } from "react";

const mockMarkers = [
  {
    id: "1",
    lngLat: [37.6173, 55.7558] as [number, number],
    title: "Moscow",
    description: "Moscow",
  },
  {
    id: "2",
    lngLat: [37.5173, 55.7558] as [number, number],
    title: "Moscow",
    description: "Moscow",
  },
];

interface Marker {
  id: string;
  lngLat: [number, number];
  title?: string;
  description?: string;
}

export function Map({ markers = mockMarkers }: { markers?: Marker[] }) {
  const mapRef = useRef<mapboxgl.Map | null>(null);
  const mapContainer = useRef<HTMLDivElement>(null);
  const markersRef = useRef<mapboxgl.Marker[]>([]);

  const createMarkerElement = (marker: Marker) => {
    console.log(marker);
    const el = document.createElement("div");
    el.className = "custom-marker";
    el.innerHTML = `
      <div class="size-9 flex items-center justify-center">
        <img src="./images/pin.png" />
      </div>
    `;
    return el;
  };

  const updateMarkers = () => {
    // Remove existing markers
    markersRef.current.forEach((marker) => marker.remove());
    markersRef.current = [];

    // Add new markers
    markers.forEach((marker) => {
      const el = createMarkerElement(marker);
      const mapboxMarker = new mapboxgl.Marker(el)
        .setLngLat(marker.lngLat)
        .addTo(mapRef.current!);

      // Add click event
      // el.addEventListener("click", () => {
      //   onMarkerClick?.(marker);
      // });

      markersRef.current.push(mapboxMarker);
    });
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

      mapRef.current.on("load", () => {
        updateMarkers();
      });
    }

    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
      }
    };
  }, []);

  return (
    <div className="relative h-full w-full">
      <div ref={mapContainer} className="h-full w-full" />
    </div>
  );
}
