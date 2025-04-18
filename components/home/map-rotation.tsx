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
import {
  currentSeason,
  mapMaster,
  type MapId,
  type MapInfo,
} from "@/data/mapMaster";
import {
  getCasualMapIndex,
  getCurrentSplit,
  getMapList,
  getNextCasualRotationTime,
  getNextRankRotationTime,
  getRankedMapIndex,
  getTimeRemaining,
  formatRotationRange,
} from "@/lib/mapRotation";
import { MapCard } from "@/components/ui/card/MapCard";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

export function MapRotation() {
  const [currentRankedMap, setCurrentRankedMap] = useState<MapInfo | null>(
    null
  );
  const [currentCasualMap, setCurrentCasualMap] = useState<MapInfo | null>(
    null
  );
  const [nextRankedMaps, setNextRankedMaps] = useState<MapInfo[]>([]);
  const [nextCasualMaps, setNextCasualMaps] = useState<MapInfo[]>([]);

  useEffect(() => {
    const split = getCurrentSplit();
    if (!split) return;

    const rankedIndex = getRankedMapIndex(split.startDate);
    const casualIndex = getCasualMapIndex(split.startDate);

    const rankedMapIds = split.rankedMaps as MapId[];
    const casualMapIds = split.casualMaps as MapId[];

    setCurrentRankedMap(mapMaster[rankedMapIds[rankedIndex]]);
    setCurrentCasualMap(mapMaster[casualMapIds[casualIndex]]);
    setNextRankedMaps(getMapList(rankedIndex, rankedMapIds));
    setNextCasualMaps(getMapList(casualIndex, casualMapIds));
  }, []);

  const now = new Date();
  const nextRankTime = getNextRankRotationTime();
  const nextCasualTime = getNextCasualRotationTime();
  const rankStart = new Date(nextRankTime.getTime() - 24 * 60 * 60 * 1000);
  const casualStart = new Date(nextCasualTime.getTime() - 1.5 * 60 * 60 * 1000);

  return (
    <Tabs defaultValue="ranked" className="space-y-4">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="ranked">ランクマッチ</TabsTrigger>
        <TabsTrigger value="casual">カジュアル</TabsTrigger>
      </TabsList>

      {/* ランク */}
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
              />
            )}
            <h3 className="text-lg font-semibold mt-4 mb-4">
              次のマップローテーション
            </h3>
            <Swiper
              modules={[Navigation, Pagination]}
              spaceBetween={8}
              slidesPerView="auto"
              navigation
              pagination={{ clickable: true }}
            >
              {nextRankedMaps.slice(1).map((map, i) => {
                const start = new Date(
                  rankStart.getTime() + (i + 1) * 24 * 60 * 60 * 1000
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
                        <p className="text-xs text-orange-400">
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
              />
            )}
            <h3 className="text-lg font-semibold mt-4 mb-4">
              次のマップローテーション
            </h3>
            <Swiper
              modules={[Navigation, Pagination]}
              spaceBetween={8}
              slidesPerView="auto"
              navigation
              pagination={{ clickable: true }}
            >
              {nextCasualMaps.slice(1).map((map, i) => {
                const start = new Date(
                  casualStart.getTime() + (i + 1) * 1.5 * 60 * 60 * 1000
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
                        <p className="text-xs text-orange-400">
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
