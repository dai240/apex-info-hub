"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card/card";
import { Badge } from "@/components/ui/feedback/badge";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs/tabs";
import { Crosshair } from "lucide-react";

const weapons = [
  {
    name: "R-301 カービン",
    image: "/images/weapons/r301.png",
    type: "アサルトライフル",
    damage: {
      body: 14,
      head: 25,
    },
    dps: 189,
    magazine: {
      base: 18,
      purple: 28,
    },
    ammo: "ライトアモ",
    features: ["扱いやすい", "汎用性が高い"],
    season_tips: "今シーズンも安定の性能。初心者にもおすすめ。",
  },
  {
    name: "フラットライン",
    image: "/images/weapons/flatline.png",
    type: "アサルトライフル",
    damage: {
      body: 18,
      head: 32,
    },
    dps: 190,
    magazine: {
      base: 20,
      purple: 30,
    },
    ammo: "ヘビーアモ",
    features: ["高火力", "反動が強め"],
    season_tips: "近距離での火力が魅力。反動コントロールが必要。",
  },
  // 他の武器も同様に追加
];

const weaponTypes = [
  "すべて",
  "アサルトライフル",
  "サブマシンガン",
  "ライトマシンガン",
  "スナイパーライフル",
  "ショットガン",
  "ピストル",
];

export default function WeaponsPage() {
  const [selectedType, setSelectedType] = useState("すべて");

  const filteredWeapons =
    selectedType === "すべて"
      ? weapons
      : weapons.filter((weapon) => weapon.type === selectedType);

  return (
    <div className="container px-4 py-8 mx-auto max-w-7xl">
      <Card className="mb-8 border-orange-500/20 bg-background/50 backdrop-blur">
        <CardHeader className="flex flex-row items-center space-x-4">
          <Crosshair className="w-6 h-6 text-orange-500" />
          <CardTitle>武器データ</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="mb-6 flex flex-wrap gap-2">
            {weaponTypes.map((type) => (
              <Badge
                key={type}
                variant={selectedType === type ? "default" : "outline"}
                className="cursor-pointer"
                onClick={() => setSelectedType(type)}
              >
                {type}
              </Badge>
            ))}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredWeapons.map((weapon, i) => (
              <Card key={i} className="overflow-hidden">
                <div className="aspect-video relative">
                  <img
                    src={weapon.image}
                    alt={weapon.name}
                    className="object-cover w-full h-full"
                  />
                  <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
                    <h3 className="text-xl font-semibold text-white">
                      {weapon.name}
                    </h3>
                    <Badge variant="secondary" className="mt-1">
                      {weapon.type}
                    </Badge>
                  </div>
                </div>
                <CardContent className="p-4">
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <h4 className="font-semibold mb-2">ダメージ</h4>
                        <p className="text-sm">
                          胴体: {weapon.damage.body}
                          <br />
                          ヘッド: {weapon.damage.head}
                        </p>
                      </div>
                      <div>
                        <h4 className="font-semibold mb-2">DPS</h4>
                        <p className="text-sm">{weapon.dps}</p>
                      </div>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2">マガジン容量</h4>
                      <p className="text-sm">
                        通常: {weapon.magazine.base}
                        <br />
                        パープル: {weapon.magazine.purple}
                      </p>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2">特徴</h4>
                      <div className="flex flex-wrap gap-2">
                        {weapon.features.map((feature, j) => (
                          <Badge key={j} variant="outline">
                            {feature}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2">今シーズンのTips</h4>
                      <p className="text-sm text-muted-foreground">
                        {weapon.season_tips}
                      </p>
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
