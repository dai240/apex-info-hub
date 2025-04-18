export const mapMaster = {
    "storm-point": {
    //   name: "Storm Point（ストームポイント）",
      name: "Storm Point",
      image: "/images/map/storm_point.png",
    },
    "worlds-edge": {
    //   name: "World's Edge（ワールズエッジ）",
      name: "World's Edge",
      image: "/images/map/worlds_edge.png",
    },
    "broken-moon": {
    //   name: "Broken Moon（ブロークンムーン）",
      name: "Broken Moon",
      image: "/images/map/broken_moon.png",
    },
    "olympus": {
    //   name: "Olympus（オリンパス）",
      name: "Olympus",
      image: "/images/map/olympus.png",
    },
    "kings-canyon": {
    //   name: "Kings Canyon（キングスキャニオン）",
      name: "Kings Canyon",
      image: "/images/map/kings_canyon.png",
    },
    "e-district": {
    //   name: "E-District（E-ディストリクト）",
      name: "E-District",
      image: "/images/map/e-district.png",
    },
  } as const;
  
  // 型定義
  export type MapId = keyof typeof mapMaster;
  export type MapInfo = (typeof mapMaster)[MapId];
  
  // シーズン・スプリット構成
  export const currentSeason = {
    number: 24,
    name: "シーズン24",
    splits: [
      {
        name: "スプリット1",
        number: 1,
        startDate: "2025-02-12",
        endDate: "2025-03-26",
        rankedMaps: ["storm-point", "worlds-edge", "broken-moon"] as MapId[],
        casualMaps: ["kings-canyon", "olympus", "broken-moon"] as MapId[],
      },
      {
        name: "スプリット2",
        number: 2,
        startDate: "2025-03-26",
        endDate: "2025-05-07",
        rankedMaps: ["kings-canyon", "storm-point", "e-district"] as MapId[],
        casualMaps: ["storm-point", "e-district", "kings-canyon"] as MapId[]
      },
    ],
  };
  