import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card/card";
import { Map } from "@/components/ui/icons/map-icon";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import { MapCard } from "@/components/ui/card/MapCard";
import { MapInfo } from "@/data/mapMaster";

type Props = {
  title: string;
  currentMap: MapInfo | null;
  nextMaps: MapInfo[];
  startTime: Date;
  endTime: Date;
  unit: "日後" | "マップ後";
};

export function MapRotationSection({
  title,
  currentMap,
  nextMaps,
  startTime,
  endTime,
  unit,
}: Props) {
  const now = new Date();

  return (
    <Card className="border-orange-500/20 bg-background/50 backdrop-blur">
      <CardHeader className="flex flex-row items-center space-x-4">
        <Map className="w-6 h-6 text-orange-500" />
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        {currentMap && (
          <MapCard map={currentMap} start={startTime} end={endTime} />
        )}

        <h3 className="text-lg font-semibold mt-6 mb-2">
          次のマップローテーション
        </h3>

        <div className="overflow-hidden">
          <Swiper
            modules={[Navigation, Pagination]}
            spaceBetween={8}
            slidesPerView="auto"
            navigation
            pagination={{ clickable: true }}
            className="!w-full"
          >
            {nextMaps.slice(1).map((map, i) => (
              <SwiperSlide key={i} className="!w-[150px] flex-shrink-0">
                <div className="aspect-square w-full relative rounded-lg overflow-hidden">
                  <img
                    src={map.image}
                    alt={map.name}
                    className="object-cover w-full h-full"
                  />
                  <div className="absolute bottom-0 left-0 right-0 p-2 bg-gradient-to-t from-black/80 to-transparent">
                    <h3 className="text-sm font-semibold text-white">
                      {map.name}
                    </h3>
                    <p className="text-xs text-orange-400">
                      {i + 1}
                      {unit}
                    </p>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </CardContent>
    </Card>
  );
}
