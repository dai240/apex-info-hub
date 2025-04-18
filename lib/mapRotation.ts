import {
  currentSeason,
  mapMaster,
  type MapId,
  type MapInfo,
} from "@/data/mapMaster";

export function getCurrentSplit() {
  const now = new Date();
  return currentSeason.splits.find(
    (s) => new Date(s.startDate) <= now && new Date(s.endDate) >= now
  );
}

export function getRankedMapIndex(startDate: string): number {
  const base = new Date(startDate);
  const now = new Date();
  base.setHours(2, 0, 0, 0);
  now.setHours(2, 0, 0, 0);
  return (
    Math.floor((now.getTime() - base.getTime()) / (1000 * 60 * 60 * 24)) % 3
  );
}

export function getNextRankRotationTime(): Date {
  const now = new Date();
  const next = new Date(now);
  if (now.getHours() >= 2) next.setDate(now.getDate() + 1);
  next.setHours(2, 0, 0, 0);
  return next;
}

// 2:00起点でカジュアルマップのインデックスを計算
export function getCasualMapIndex(startDate: string): number {
  const base = new Date(`${startDate}T02:00:00+09:00`);
  const now = new Date();

  const diffMs = now.getTime() - base.getTime();
  const slot = Math.floor(diffMs / (1.5 * 60 * 60 * 1000));

  return slot % 3;
}

// 次の切り替え時刻（2:00起点で90分ごと）
export function getNextCasualRotationTime(): Date {
  const base = new Date();
  base.setHours(2, 0, 0, 0); // 今日の2:00に固定

  const now = new Date();
  if (now < base) {
    // 深夜1時などは前日2:00に戻る
    base.setDate(base.getDate() - 1);
  }

  const elapsed = now.getTime() - base.getTime();
  const slot = Math.ceil(elapsed / (1.5 * 60 * 60 * 1000));

  return new Date(base.getTime() + slot * 1.5 * 60 * 60 * 1000);
}

export function getMapList(currentIndex: number, mapIds: MapId[]): MapInfo[] {
  return Array.from({ length: 7 }, (_, i) => {
    const index = (currentIndex + i) % mapIds.length;
    return mapMaster[mapIds[index]];
  });
}

export function formatRotationTime(date: Date): string {
  return date.toLocaleString("ja-JP", {
    month: "numeric",
    day: "numeric",
    weekday: "short",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export function getTimeRemaining(until: Date): string {
  const now = new Date();
  const diff = until.getTime() - now.getTime();
  const h = Math.floor(diff / (1000 * 60 * 60));
  const m = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  return `${h}時間${m}分`;
}

// 2つの時間を「4/18(金) 02:00 ~ 4/19(土) 02:00」形式で表示
export function formatRotationRange(start: Date, end: Date): string {
  const format = (d: Date) =>
    d.toLocaleString("ja-JP", {
      month: "numeric",
      day: "numeric",
      weekday: "short",
      hour: "2-digit",
      minute: "2-digit",
    });

  return `${format(start)} ~ ${format(end)}`;
}
