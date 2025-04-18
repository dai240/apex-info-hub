import { MapRotation } from "@/components/home/map-rotation";
import { CurrentSeason } from "@/components/home/current-season";

export default function Home() {
  return (
    <div className="container px-4 py-8 mx-auto max-w-7xl">
      <CurrentSeason />
      <MapRotation />
    </div>
  );
}
