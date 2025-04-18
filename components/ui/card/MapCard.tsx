import { format } from "date-fns";
import { MapInfo } from "@/data/mapMaster";
import { getTimeRemaining } from "@/lib/mapRotation";

type Props = {
  map: MapInfo;
  start: Date;
  end: Date;
  showCountdown?: boolean;
};

export function MapCard({ map, start, end, showCountdown = true }: Props) {
  return (
    <div className="mb-8">
      <div className="aspect-[1/1] relative rounded-lg overflow-hidden w-full max-w-[400px]">
        <img
          src={map.image}
          alt={map.name}
          className="object-contain w-full h-full"
        />
        <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
          <h3 className="text-2xl font-bold text-white mb-2">{map.name}</h3>
          <p className="text-white/90">
            {format(start, "M/d(E) HH:mm")} ~ {format(end, "M/d(E) HH:mm")}
          </p>
          {showCountdown && (
            <p className="text-orange-400 mt-1">
              次の切り替え: {getTimeRemaining(end)}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
