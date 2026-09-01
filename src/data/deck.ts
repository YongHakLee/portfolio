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
    figure: "rgb-gap",
    note: "두 결핍 모두 표면까지의 거리를 몰라서 생긴다 — 모바일 LiDAR가 그 값을 준다",
  },
  {
    id: "s03",
    chapter: "dissertation",
    eyebrow: "박사논문 · Theme I",
    title: "Theme I — 3D 생체인식",
    blocks: [
      {
        kind: "points",
        items: [
          {
            lead: "SqueezeFace",
            text: "RGB·깊이맵·포인트 클라우드를 7채널로 합치고, ResNet-34에 공간적응 합성곱 주의(SAC) 블록과 마진 손실을 넣었다. 3-shot 검증에서 임계값을 높여도 정확도가 유지된다 — 깊이가 중복 정보가 아니라 클래스 간 분리도를 실제로 넓힌다는 근거다.",
          },
          {
            lead: "CloudNet",
            text: "조명 3구간의 LDFAS 데이터셋을 만들고, RGB망과 LiDAR망을 따로 학습해 초기+후기 하이브리드 융합으로 합쳤다.",
          },
        ],
      },
      {
        kind: "metrics",
        items: [
          { value: "99.88%", label: "SqueezeFace 정확도 · 83명 · F1 0.9345" },
          { value: "1/3", label: "조명이 바뀔 때 ACER 열화 (+0.40·+0.41 → +0.13·+0.15)" },
        ],
      },
    ],
    figure: "theme1",
    note: "LiDAR 특징은 RGB처럼 생기지 않는다 — 그래서 주의 블록과 융합 지점을 따로 설계했다",
  },
  {
    id: "s04",
    chapter: "dissertation",
    eyebrow: "박사논문 · Theme II",
    title: "옷 한 장의 치수를 자동으로",
    blocks: [
      {
        kind: "points",
        items: [
          {
            lead: "치수점 검출",
            text: "HRNet-W48을 DeepFashion2로 파인튜닝해 카테고리별 치수점을 찾는다. 좌·우 키포인트를 비대칭으로 라벨링하는 문제는 좌우 대칭 인식 증강으로 풀었다.",
          },
          {
            lead: "실거리 계산",
            text: "두 점 사이 거리를 픽셀 격자가 아니라 동기 촬영된 포인트 클라우드 위에서 잰다.",
          },
        ],
      },
      {
        kind: "metrics",
        items: [
          { value: "1.59%", label: "평균 상대오차 · 배경 통제" },
          { value: "2.08%", label: "배경 통제 없이" },
          { value: "660회", label: "5개 카테고리 33벌 × 10회" },
        ],
      },
    ],
    figure: "garment",
    note: "배경이 어지러워도 0.5%p만 나빠진다",
  },
  {
    id: "s05",
    chapter: "dissertation",
    eyebrow: "박사논문 · Theme II",
    title: "사람 몸은 왜 더 어려운가",
    blocks: [
      {
        kind: "points",
        items: [
          {
            lead: "표면이 굽어 있다",
            text: "정면과 측면 두 컷의 반둘레를 회귀로 합성한다. Ct = β(Cf + Cs) + ε",
          },
          {
            lead: "키포인트가 옷에 가려 있다",
            text: "가슴·허리·엉덩이·둔부·대퇴골과를 수동 라벨링한 1,000장으로 HRNet을 전이학습했다.",
          },
          {
            lead: "점이 몸이 아니라 배경에 찍힌다",
            text: "Canny 에지 기반 깊이맵 보정으로 검출점을 몸 표면에 되돌린다.",
          },
        ],
      },
      {
        kind: "metrics",
        items: [
          { value: "< 4%", label: "허리 · 엉덩이 둘레 상대오차 · 피험자 4명" },
          { value: "0.7초", label: "1회 측정 · 3D 메시 복원 없이" },
        ],
      },
    ],
    figure: "body",
    note: "↓ 이 방법이 특허1의 청구항이 된다",
  },
  {
    id: "s06",
    chapter: "dissertation",
    eyebrow: "박사논문 · 종합",
    title: "네 연구를 관통하는 하나",
    blocks: [
      {
        kind: "table",
        head: ["연구", "RGB의 한계", "LiDAR가 준 것", "모델 쪽 설계"],
        rows: [
          ["SqueezeFace", "분리도 부족", "표면 굴곡", "SAC 주의 블록"],
          ["CloudNet", "조명에 취약", "조명 불변 깊이", "하이브리드 융합"],
          ["의류 계측", "실거리 없음", "절대 거리", "대칭 인식 증강"],
          ["인체 계측", "실거리 · 가림", "절대 거리", "깊이맵 보정 + 회귀"],
        ],
      },
    ],
    note: "모달리티를 아는 융합 — 이 패턴이 특허 2건으로 이어졌다",
  },
  {
    id: "s07",
    chapter: "patent-1",
    eyebrow: "특허 · 출원",
    title: "2D 및 3D 데이터 융합을 통한 신체 둘레 측정 자동화 방법 및 장치",
    blocks: [
      {
        kind: "bib",
        rows: [
          { term: "출원", desc: "10-2024-0077839 (2024.06.14)" },
          { term: "공개", desc: "10-2025-0177277 (2025.12.23)" },
          { term: "청구항", desc: "총 10항" },
          { term: "출원인", desc: "건국대학교 산학협력단 · ㈜머스트리" },
          { term: "발명자", desc: "김성환, 이용학, 김장환" },
        ],
      },
      {
        kind: "points",
        items: [
          {
            lead: "청구항 1",
            text: "① 2D 이미지와 3D 데이터 수집 → ② 둘레 측정용 한 쌍의 핵심점 검출 → ③ 3D 데이터에서 대응하는 기준 포인트 식별 → ④ 기준 포인트와 3D 데이터로 둘레 측정",
          },
        ],
      },
    ],
    figure: "patent1-flow",
  },
  {
    id: "s08",
    chapter: "patent-1",
    eyebrow: "특허 · 출원",
    title: "이 특허가 실제로 지키는 것",
    blocks: [
      {
        kind: "points",
        items: [
          {
            lead: "기준 포인트 보정 (6 · 7항)",
            text: "배경면에서 신체의 최근접점까지 거리의 중간 지점을 정하고, 3D 데이터 중 그 중간 지점까지의 거리와 같으면서 핵심점에 가장 가까운 두 점을 골라 기준 포인트로 보정한다. 배경면이 없으면 최원점까지의 거리를 배경면 거리로 쓴다.",
          },
          {
            lead: "전 · 후방 합산 (8 · 9항)",
            text: "기준 포인트 사이에서 둘레를 이루는 3D 점들의 인접 점 간 유클리드 거리를 더해 전방 둘레와 후방 둘레를 각각 구하고 합산한다.",
          },
          {
            lead: "검출 모델 (2 · 3 · 5항)",
            text: "촬영은 LiDAR 센서로, 핵심점 검출 모델은 HRNet 기반으로 한정된다.",
          },
        ],
      },
    ],
    figure: "patent1-core",
    note: "참조물도, 3D 스캐너도, 메시 복원도 없이 스마트폰 한 대",
  },
];
