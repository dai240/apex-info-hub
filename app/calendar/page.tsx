"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card/card";
import { Calendar as CalendarIcon } from "lucide-react";
import { ja } from "date-fns/locale";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs/tabs";
import { currentSeason, mapMaster, type MapId } from "@/data/mapMaster";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/layout/table";

const events = [{ date: "2025-05-03", name: "憲法記念日", type: "holiday" }];

// 🔽 ランクマップを取得（スプリット・順番に基づく）
function getRankedMapForDate(date: Date) {
  const split = currentSeason.splits.find(
    (s) => new Date(s.startDate) <= date && new Date(s.endDate) >= date
  );
  if (!split) return null;

  const start = new Date(split.startDate);
  start.setHours(2, 0, 0, 0);
  const base = new Date(date);
  base.setHours(2, 0, 0, 0);

  const diffDays = Math.floor(
    (base.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)
  );
  const mapId = split.rankedMaps[diffDays % split.rankedMaps.length] as MapId;
  return { ...mapMaster[mapId], id: mapId };
}

// 🔽 カレンダーに表示する日付（前月・当月・次月）
function generateMonthDays(year: number, month: number) {
  const days: Date[] = [];
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const startDay = new Date(firstDay);
  startDay.setDate(firstDay.getDate() - firstDay.getDay());

  const endDay = new Date(lastDay);
  endDay.setDate(lastDay.getDate() + (6 - lastDay.getDay()));

  for (let d = new Date(startDay); d <= endDay; d.setDate(d.getDate() + 1)) {
    days.push(new Date(d));
  }

  return days;
}

// 🔽 今週の日付（7日分）
function getWeekDates(): Date[] {
  const today = new Date();
  return Array.from({ length: 7 }, (_, i) => {
    const d = new Date(today);
    d.setDate(today.getDate() + i);
    return d;
  });
}

// 🔽 マップに応じた色
const mapColors: Record<string, string> = {
  "e-district": "bg-pink-600",
  "kings-canyon": "bg-blue-600",
  "storm-point": "bg-green-600",
};

export default function CalendarPage() {
  const today = new Date();
  const [currentDate, setCurrentDate] = useState(today);

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const monthDays = generateMonthDays(year, month);

  const handlePrev = () => {
    const prev = new Date(currentDate);
    prev.setMonth(prev.getMonth() - 1);
    setCurrentDate(prev);
  };

  const handleNext = () => {
    const next = new Date(currentDate);
    next.setMonth(next.getMonth() + 1);
    setCurrentDate(next);
  };

  const weekDates = getWeekDates();

  return (
    <div className="container px-4 py-8 mx-auto max-w-7xl">
      <Tabs defaultValue="list" className="space-y-4">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="list">リスト表示</TabsTrigger>
          <TabsTrigger value="calendar">カレンダー表示</TabsTrigger>
        </TabsList>

        {/* リスト表示 */}
        <TabsContent value="list">
          <Card className="border-orange-500/20 bg-background/50 backdrop-blur">
            <CardHeader className="flex flex-row items-center space-x-4">
              <CalendarIcon className="w-6 h-6 text-orange-500" />
              <CardTitle>週間マップローテーション</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>日付</TableHead>
                    <TableHead>マップ</TableHead>
                    <TableHead>イベント</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {weekDates.map((date, i) => {
                    const map = getRankedMapForDate(date);
                    const event = events.find(
                      (e) =>
                        new Date(e.date).toDateString() === date.toDateString()
                    );

                    const isToday =
                      date.getFullYear() === today.getFullYear() &&
                      date.getMonth() === today.getMonth() &&
                      date.getDate() === today.getDate();

                    const dayOfWeek = date.getDay(); // 0 = Sun, 6 = Sat
                    const dayClass =
                      dayOfWeek === 0
                        ? "text-red-500"
                        : dayOfWeek === 6
                        ? "text-blue-500"
                        : "";

                    return (
                      <TableRow
                        key={i}
                        className={
                          isToday
                            ? "border-2 border-orange-500 bg-orange-500/5"
                            : ""
                        }
                      >
                        <TableCell
                          className={`font-medium ${dayClass} ${
                            isToday ? "font-bold" : ""
                          }`}
                        >
                          {date.toLocaleDateString("ja-JP", {
                            month: "numeric",
                            day: "numeric",
                            weekday: "short",
                          })}
                        </TableCell>
                        <TableCell>
                          {map ? (
                            <span
                              className={`text-xs text-white px-2 py-1 rounded ${
                                mapColors[map.id]
                              }`}
                            >
                              {map.name}
                            </span>
                          ) : (
                            "不明"
                          )}
                        </TableCell>
                        <TableCell
                          className={
                            event?.type === "holiday"
                              ? "text-orange-500"
                              : "text-blue-500"
                          }
                        >
                          {event?.name || "-"}
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* カレンダー表示 */}
        <TabsContent value="calendar">
          <Card className="border-orange-500/20 bg-background/50 backdrop-blur">
            <CardHeader className="flex flex-row items-center justify-between">
              <div className="flex items-center space-x-2">
                <CalendarIcon className="w-6 h-6 text-orange-500" />
                <CardTitle>カレンダー表示</CardTitle>
              </div>
              <div className="flex items-center space-x-4 text-white font-semibold">
                <button onClick={handlePrev}>＜</button>
                <span>
                  {year}年 {month + 1}月
                </span>
                <button onClick={handleNext}>＞</button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-7 gap-1 text-center font-semibold text-sm mb-2">
                {["日", "月", "火", "水", "木", "金", "土"].map((d) => (
                  <div key={d} className="text-muted-foreground">
                    {d}
                  </div>
                ))}
              </div>
              <div className="grid grid-cols-7 gap-px text-sm text-white">
                {monthDays.map((date, idx) => {
                  const map = getRankedMapForDate(date);
                  const isCurrentMonth = date.getMonth() === month;
                  const isToday =
                    date.getFullYear() === today.getFullYear() &&
                    date.getMonth() === today.getMonth() &&
                    date.getDate() === today.getDate();

                  const holiday = events.find(
                    (e) =>
                      new Date(e.date).toDateString() === date.toDateString()
                  );

                  const dayOfWeek = date.getDay(); // 0 = 日, 6 = 土
                  const dayColor =
                    dayOfWeek === 0
                      ? "text-red-500"
                      : dayOfWeek === 6
                      ? "text-blue-400"
                      : "text-white";

                  return (
                    <div
                      key={idx}
                      className={`p-2 h-[80px] border border-border rounded-md flex flex-col items-start justify-start ${
                        isCurrentMonth ? "" : "opacity-30"
                      } ${isToday ? "border-2 border-orange-500" : ""}`}
                    >
                      <div className={`text-xs font-semibold mb-1 ${dayColor}`}>
                        {date.getDate()}
                      </div>

                      {map && (
                        <div
                          className={`text-xs text-white px-1 py-0.5 rounded ${
                            mapColors[map.id]
                          }`}
                        >
                          {map.name}
                        </div>
                      )}

                      {holiday && (
                        <div className="text-xs text-green-500 mt-1">
                          {holiday.name}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
