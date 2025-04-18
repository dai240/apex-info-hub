"use client";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card/card";
import { Badge } from "@/components/ui/feedback/badge";
import { Timer } from "lucide-react";

export function CurrentSeason() {
  // This would come from your data file in production
  const seasonEndDate = new Date("2024-05-15");
  const daysRemaining = Math.ceil(
    (seasonEndDate.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)
  );

  return (
    <Card className="mb-8 border-orange-500/20 bg-background/50 backdrop-blur">
      <CardHeader className="flex flex-row items-center space-x-4">
        <Timer className="w-8 h-8 text-orange-500" />
        <div>
          <CardTitle className="text-2xl">シーズン19</CardTitle>
          <Badge variant="secondary" className="mt-1">
            残り {daysRemaining} 日でスプリット終了！逃げちゃダメだ！
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground">
          今シーズンのランクを上げるラストチャンス！一緒に頑張りましょう！
        </p>
      </CardContent>
    </Card>
  );
}
