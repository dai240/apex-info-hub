"use client";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card/card";
import { Settings } from "lucide-react";
import { currentSeason } from "@/data/mapMaster";

export default function SettingsPage() {
  return (
    <div className="container px-4 py-8 mx-auto max-w-7xl">
      <Card className="border-orange-500/20 bg-background/50 backdrop-blur">
        <CardHeader className="flex flex-row items-center space-x-4">
          <Settings className="w-6 h-6 text-orange-500" />
          <CardTitle>設定情報</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {currentSeason.splits.map((split) => (
              <div key={split.number}>
                <h3 className="text-lg font-semibold mb-2">
                  {split.name}（{split.startDate}〜{split.endDate}）
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="text-sm font-medium mb-1">
                      ランクマッチマップ
                    </h4>
                    <pre className="p-3 rounded-lg bg-black/20 text-sm overflow-x-auto">
                      {JSON.stringify(split.rankedMaps, null, 2)}
                    </pre>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium mb-1">
                      カジュアルマッチマップ
                    </h4>
                    <pre className="p-3 rounded-lg bg-black/20 text-sm overflow-x-auto">
                      {JSON.stringify(split.casualMaps, null, 2)}
                    </pre>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
