"use client";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card/card";
import { Badge } from "@/components/ui/feedback/badge";
import { ScrollArea } from "@/components/ui/media/scroll-area";
import { Newspaper } from "lucide-react";

const news = [
  {
    date: "2024-04-16",
    title: "シーズン19がスタート！",
    type: "アップデート",
    summary:
      "新シーズンでは、新レジェンド「ベノム」が登場。毒を操る新たなレジェンドの活躍にご期待ください。",
    details: [
      "新レジェンド「ベノム」の追加",
      "ランクマッチシステムの改善",
      "武器バランスの調整",
      "バグ修正と性能改善",
    ],
    link: "https://www.ea.com/games/apex-legends/news/season-19-patch-notes",
  },
  {
    date: "2024-04-10",
    title: "期間限定イベント「プレデターハント」開催",
    type: "イベント",
    summary:
      "プレデターたちとの激しい戦いが始まる。特別なスキンやチャームをゲットしよう！",
    details: [
      "限定スキン20種類の追加",
      "新モード「プレデターハント」の実装",
      "チャレンジの追加",
      "報酬トラックの実装",
    ],
    link: "https://www.ea.com/games/apex-legends/news/predator-hunt-event",
  },
  // 他のニュースも同様に追加
];

export default function NewsPage() {
  return (
    <div className="container px-4 py-8 mx-auto max-w-7xl">
      <Card className="border-orange-500/20 bg-background/50 backdrop-blur">
        <CardHeader className="flex flex-row items-center space-x-4">
          <Newspaper className="w-6 h-6 text-orange-500" />
          <CardTitle>最新ニュース</CardTitle>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[800px] pr-4">
            <div className="space-y-6">
              {news.map((item, i) => (
                <Card key={i} className="overflow-hidden">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="space-y-1">
                        <h3 className="text-xl font-semibold">{item.title}</h3>
                        <p className="text-sm text-muted-foreground">
                          {new Date(item.date).toLocaleDateString("ja-JP", {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          })}
                        </p>
                      </div>
                      <Badge variant="secondary">{item.type}</Badge>
                    </div>
                    <p className="text-muted-foreground mb-4">{item.summary}</p>
                    <div className="space-y-4">
                      <h4 className="font-semibold">主な変更点</h4>
                      <ul className="list-disc list-inside space-y-2">
                        {item.details.map((detail, j) => (
                          <li key={j} className="text-sm text-muted-foreground">
                            {detail}
                          </li>
                        ))}
                      </ul>
                      <a
                        href={item.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block text-orange-500 hover:text-orange-600 text-sm mt-4"
                      >
                        詳細を見る →
                      </a>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  );
}
