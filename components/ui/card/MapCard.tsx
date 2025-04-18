import { formatRotationTime, getTimeRemaining } from "@/lib/mapRotation";

type Props = {
  map: { name: string; image: string };
  start: Date;
  end: Date;
  subtitle?: string;
};

export function MapCard({ map, start, end, subtitle }: Props) {
  return (
    <div className="aspect-[1/1] relative rounded-lg overflow-hidden w-full max-w-[400px]">
      <img
        src={map.image}
        alt={map.name}
        className="object-contain w-full h-full"
      />
      <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
        <h3 className="text-2xl font-bold text-white mb-2">{map.name}</h3>
        <p className="text-white/90">
          {formatRotationTime(start)} ~ {formatRotationTime(end)}
        </p>
        <p className="text-orange-400 mt-1">
          次の切り替えまで: {getTimeRemaining(end)}
        </p>
        {subtitle && <p className="text-xs text-white/60 mt-1">{subtitle}</p>}
      </div>
    </div>
  );
}
