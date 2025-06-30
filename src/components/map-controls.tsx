import { Minus, Plus } from "lucide-react";

type MapControlsProps = {
  zoomMap: () => void;
  zoomOutMap: () => void;
};

function MapControls({ zoomMap, zoomOutMap }: MapControlsProps) {
  return (
    <div className="absolute right-4 top-1/2 transform -translate-y-1/2 flex flex-col -space-y-[1px]">
      <button
        onClick={zoomMap}
        className="w-12 h-12 bg-white rounded-2xl rounded-b-none shadow-lg flex items-center justify-center text-gray-700 hover:bg-gray-50 active:scale-95"
      >
        <Plus className="size-6" />
      </button>
      <button
        onClick={zoomOutMap}
        className="w-12 h-12 bg-white rounded-2xl rounded-t-none shadow-lg flex items-center justify-center text-gray-700 hover:bg-gray-50 active:scale-95"
      >
        <Minus className="size-6" />
      </button>
    </div>
  );
}

export default MapControls;
