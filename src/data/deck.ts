// 발표 덱의 슬라이드 내용. 렌더링은 src/components/deck/ 이 맡는다.
// 슬라이드당 발표 시간은 여기 두지 않는다 — 시간의 단일 소스는 docs/deck-script.md다.
// 여기 적힌 수치는 files/ 아래 원본 PDF(박사논문·특허 공보)에 있는 값이다.

export type Block =
  | { kind: "points"; items: { lead: string; text: string }[] }
  | { kind: "metrics"; items: { value: string; label: string }[] }
  | { kind: "bib"; rows: { term: string; desc: string }[] }
  | { kind: "table"; head: string[]; rows: string[][] };

export type FigureKey =
  | "rgb-gap"
  | "theme1"
  | "garment"
  | "body"
  | "patent1-flow"
  | "patent1-core"
  | "patent2-flow"
  | "patent2-core";

export type ChapterKey = "dissertation" | "patent-1" | "patent-2";

export interface Slide {
  id: string;
  chapter: ChapterKey;
  eyebrow: string;
  title: string;
  lead?: string;
  blocks: Block[];
  figure?: FigureKey;
  note?: string;
}

export const chapters: { key: ChapterKey; label: string }[] = [
  { key: "dissertation", label: "박사논문" },
  { key: "patent-1", label: "특허1" },
  { key: "patent-2", label: "특허2" },
];

export const slides: Slide[] = [
  {
    id: "s01",
    chapter: "dissertation",
    eyebrow: "박사학위논문 · 건국대학교 응용통계학과 · 2026.08",
    title:
      "Advancements in 3D Biometrics and Automated Metrology Using Mobile LiDAR and Deep Learning Integration",
    lead: "모바일 LiDAR와 딥러닝 결합을 통한 3D 생체인식과 자동 계측",
    blocks: [
      {
        kind: "points",
        items: [
          {
            lead: "관통 주장",
            text: "센서를 바꾸는 것만으로는 부족하다. RGB와 통계적 성질이 다른 LiDAR를, 그 차이를 아는 모델로 다뤄야 한다.",
          },
          { lead: "구성", text: "두 개의 테마, 네 편의 연구. 지도교수 김성환." },
        ],
      },
    ],
  },
  {
    id: "s02",
    chapter: "dissertation",
    eyebrow: "박사논문 · 문제",
    title: "RGB 카메라가 못 하는 두 가지",
    blocks: [
      {
        kind: "points",
        items: [
          {
            lead: "누구인지 · 진짜인지",
            text: "사진과 사람은 색으로는 같다. 조명이 바뀌면 판단이 통째로 무너진다.",
          },
          {
            lead: "얼마나 큰지",
            text: "픽셀 거리는 실제 거리가 아니다. 기준자를 함께 찍지 않으면 치수가 나오지 않는다.",
          },
        ],
      },
    ],
    note: "두 결핍 모두 표면까지의 거리를 몰라서 생긴다 — 모바일 LiDAR가 그 값을 준다",
  },
];
