"use client";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card/card";
import { Badge } from "@/components/ui/feedback/badge";
import { User } from "lucide-react";

const legends = [
  {
    name: "ホライゾン",
    image: "/images/legends/horizon.png",
    type: "アサルト",
    strengths: ["高所取り", "チーム移動", "空中戦"],
    weaknesses: ["屋内戦闘", "対レイス"],
    tips: "グラビティリフトを使った高所からの攻撃が得意。チームの移動手段としても活用可能。",
    recommendedMaps: ["ストームポイント", "ワールズエッジ"],
  },
  // 他のレジェンドも同様に追加
];

export default function LegendsPage() {
  return (
    <div className="container px-4 py-8 mx-auto max-w-7xl">
      <Card className="mb-8 border-orange-500/20 bg-background/50 backdrop-blur">
        <CardHeader className="flex flex-row items-center space-x-4">
          <User className="w-6 h-6 text-orange-500" />
          <CardTitle>レジェンド情報</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {legends.map((legend, i) => (
              <Card key={i} className="overflow-hidden">
                <div className="aspect-video relative">
                  <img
                    src={legend.image}
                    alt={legend.name}
                    className="object-cover w-full h-full"
                  />
                  <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
                    <h3 className="text-xl font-semibold text-white">
                      {legend.name}
                    </h3>
                    <Badge variant="secondary" className="mt-1">
                      {legend.type}
                    </Badge>
                  </div>
                </div>
                <CardContent className="p-4">
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold mb-2">強み</h4>
                      <div className="flex flex-wrap gap-2">
                        {legend.strengths.map((strength, j) => (
                          <Badge key={j} variant="outline">
                            {strength}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2">弱み</h4>
                      <div className="flex flex-wrap gap-2">
                        {legend.weaknesses.map((weakness, j) => (
                          <Badge key={j} variant="destructive">
                            {weakness}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {legend.tips}
                    </p>
                    <div>
                      <h4 className="font-semibold mb-2">おすすめマップ</h4>
                      <div className="flex flex-wrap gap-2">
                        {legend.recommendedMaps.map((map, j) => (
                          <Badge key={j} variant="secondary">
                            {map}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
