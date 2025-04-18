"use client";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card/card";
import { MapPin } from "lucide-react";

const landmarks = [
  {
    map: "ストームポイント",
    locations: [
      {
        name: "コマンドセンター",
        image: "/images/map/landmarks/command-center.png",
        tips: "高所から周囲を見渡せる戦略的なポイント。初期降下に人気のスポット。",
      },
      {
        name: "バロメーター",
        image: "/images/map/landmarks/barometer.png",
        tips: "中央タワーでの立ち回りが重要。複数階層を活用した戦闘が可能。",
      },
      // 他のランドマークも同様に追加
    ],
  },
  // 他のマップも同様に追加
];

export default function LandmarksPage() {
  return (
    <div className="container px-4 py-8 mx-auto max-w-7xl">
      {landmarks.map((mapData, i) => (
        <div key={i} className="mb-8">
          <Card className="border-orange-500/20 bg-background/50 backdrop-blur">
            <CardHeader className="flex flex-row items-center space-x-4">
              <MapPin className="w-6 h-6 text-orange-500" />
              <CardTitle>{mapData.map}のランドマーク</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {mapData.locations.map((location, j) => (
                  <Card key={j} className="overflow-hidden">
                    <div className="aspect-video relative">
                      <img
                        src={location.image}
                        alt={location.name}
                        className="object-cover w-full h-full"
                      />
                      <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
                        <h3 className="text-lg font-semibold text-white">
                          {location.name}
                        </h3>
                      </div>
                    </div>
                    <CardContent className="p-4">
                      <p className="text-sm text-muted-foreground">
                        {location.tips}
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      ))}
    </div>
  );
}
