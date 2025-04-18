"use client";

import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs/tabs";
import { Map } from "@/components/ui/icons/map-icon";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import { mapMaster, type MapId } from "@/data/mapMaster";
import {
  getCurrentSplit,
  getRankedMapIndex,
  getCasualMapIndex,
  getNextRankRotationTime,
  getNextCasualRotationTime,
  formatRotationRange,
} from "@/lib/mapRotation";
import { MapCard } from "@/components/ui/card/MapCard";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

// 共通ユーティリティ
function getRotationMapList(mapIds: MapId[], startIndex: number): MapId[] {
  const extended = [...mapIds, ...mapIds]; // 繰り返し対策
  return extended.slice(startIndex, startIndex + 7);
}

function getStartDateTime(end: Date, hours: number): Date {
  return new Date(end.getTime() - hours * 60 * 60 * 1000);
}

export function MapRotation() {
  const [rankedIndex, setRankedIndex] = useState(0);
  const [casualIndex, setCasualIndex] = useState(0);
  const [rankedMaps, setRankedMaps] = useState<MapId[]>([]);
  const [casualMaps, setCasualMaps] = useState<MapId[]>([]);

  useEffect(() => {
    const split = getCurrentSplit();
    if (!split) return;

    const rankedIdx = getRankedMapIndex(split.startDate);
    const casualIdx = getCasualMapIndex(split.startDate);

    setRankedIndex(rankedIdx);
    setCasualIndex(casualIdx);
    setRankedMaps(split.rankedMaps as MapId[]);
    setCasualMaps(split.casualMaps as MapId[]);
  }, []);

  const nextRankTime = getNextRankRotationTime();
  const nextCasualTime = getNextCasualRotationTime();
  const rankStart = getStartDateTime(nextRankTime, 24);
  const casualStart = getStartDateTime(nextCasualTime, 1.5);

  const currentRankedMap = rankedMaps[rankedIndex]
    ? mapMaster[rankedMaps[rankedIndex]]
    : null;
  const currentCasualMap = casualMaps[casualIndex]
    ? mapMaster[casualMaps[casualIndex]]
    : null;

  const nextRankedMapIds = getRotationMapList(rankedMaps, rankedIndex);
  const nextCasualMapIds = getRotationMapList(casualMaps, casualIndex);

  return (
    <Tabs defaultValue="ranked" className="space-y-4">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="ranked">ランクマッチ</TabsTrigger>
        <TabsTrigger value="casual">カジュアル</TabsTrigger>
      </TabsList>

      {/* ランクマッチ */}
      <TabsContent value="ranked" className="space-y-4">
        <Card className="border-orange-500/20 bg-background/50 backdrop-blur">
          <CardHeader className="flex flex-row items-center space-x-4">
            <Map className="w-6 h-6 text-orange-500" />
            <CardTitle>現在のマップ</CardTitle>
          </CardHeader>
          <CardContent>
            {currentRankedMap && (
              <MapCard
                map={currentRankedMap}
                start={rankStart}
                end={nextRankTime}
                showCountdown
              />
            )}
            <h3 className="text-lg font-semibold mt-6 mb-2">
              次のマップローテーション
            </h3>
            <Swiper
              modules={[Navigation, Pagination]}
              spaceBetween={8}
              slidesPerView="auto"
              navigation
              pagination={{ clickable: true }}
            >
              {nextRankedMapIds.slice(1).map((mapId: MapId, i: number) => {
                const map = mapMaster[mapId];
                const start = new Date(
                  rankStart.getTime() + i * 24 * 60 * 60 * 1000
                );
                const end = new Date(start.getTime() + 24 * 60 * 60 * 1000);
                return (
                  <SwiperSlide key={i} className="!w-[150px]">
                    <div className="aspect-[1/1] w-full relative rounded-lg overflow-hidden">
                      <img
                        src={map.image}
                        alt={map.name}
                        className="object-contain w-full h-full"
                      />
                      <div className="absolute bottom-0 left-0 right-0 p-2 bg-gradient-to-t from-black/80 to-transparent">
                        <h3 className="text-sm font-semibold text-white">
                          {map.name}
                        </h3>
                        <p className="text-xs text-white">
                          {formatRotationRange(start, end)}
                        </p>
                      </div>
                    </div>
                  </SwiperSlide>
                );
              })}
            </Swiper>
          </CardContent>
        </Card>
      </TabsContent>

      {/* カジュアル */}
      <TabsContent value="casual" className="space-y-4">
        <Card className="border-orange-500/20 bg-background/50 backdrop-blur">
          <CardHeader className="flex flex-row items-center space-x-4">
            <Map className="w-6 h-6 text-orange-500" />
            <CardTitle>現在のマップ</CardTitle>
          </CardHeader>
          <CardContent>
            {currentCasualMap && (
              <MapCard
                map={currentCasualMap}
                start={casualStart}
                end={nextCasualTime}
                showCountdown
              />
            )}
            <h3 className="text-lg font-semibold mt-6 mb-2">
              次のマップローテーション
            </h3>
            <Swiper
              modules={[Navigation, Pagination]}
              spaceBetween={8}
              slidesPerView="auto"
              navigation
              pagination={{ clickable: true }}
            >
              {nextCasualMapIds.slice(1).map((mapId: MapId, i: number) => {
                const map = mapMaster[mapId];
                const start = new Date(
                  casualStart.getTime() + i * 1.5 * 60 * 60 * 1000
                );
                const end = new Date(start.getTime() + 1.5 * 60 * 60 * 1000);
                return (
                  <SwiperSlide key={i} className="!w-[150px]">
                    <div className="aspect-[1/1] w-full relative rounded-lg overflow-hidden">
                      <img
                        src={map.image}
                        alt={map.name}
                        className="object-contain w-full h-full"
                      />
                      <div className="absolute bottom-0 left-0 right-0 p-2 bg-gradient-to-t from-black/80 to-transparent">
                        <h3 className="text-sm font-semibold text-white">
                          {map.name}
                        </h3>
                        <p className="text-xs text-white">
                          {formatRotationRange(start, end)}
                        </p>
                      </div>
                    </div>
                  </SwiperSlide>
                );
              })}
            </Swiper>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
}
