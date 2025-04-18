"use client";

import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card/card";
import { Badge } from "@/components/ui/feedback/badge";
import { Timer } from "lucide-react";
import { currentSeason } from "@/data/mapMaster";
import { getRandomSeasonMessage } from "@/lib/messages";

function getCurrentSplit() {
  const now = new Date();
  return currentSeason.splits.find(
    (s) => new Date(s.startDate) <= now && new Date(s.endDate) >= now
  );
}

export function CurrentSeason() {
  const split = getCurrentSplit();
  if (!split) return null;

  const endDate = new Date(split.endDate);
  const daysRemaining = Math.ceil(
    (endDate.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)
  );

  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    setMessage(getRandomSeasonMessage());
  }, []);

  return (
    <Card className="mb-8 border-orange-500/20 bg-background/50 backdrop-blur">
      <CardHeader className="flex flex-row items-center space-x-4">
        <Timer className="w-8 h-8 text-orange-500" />
        <div>
          <CardTitle className="text-2xl">
            {currentSeason.name}（{split.name}）
          </CardTitle>
          <Badge variant="secondary" className="mt-1">
            残り {daysRemaining} 日でスプリット終了！
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        {message ? (
          <p className="text-muted-foreground">{message}</p>
        ) : (
          <p className="text-muted-foreground text-sm text-gray-400">
            読み込み中...
          </p>
        )}
      </CardContent>
    </Card>
  );
}
