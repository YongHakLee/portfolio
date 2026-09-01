// 발표 덱의 슬라이드 내용. 렌더링은 src/components/deck/ 이 맡는다.
// 슬라이드당 발표 시간은 여기 두지 않는다. 시간의 단일 소스는 docs/deck-script.md다.
//
// 화면에는 제목과 용어만 둔다. 구체적인 성능 수치(정확도·오차·소요 시간)와 회귀식은
// 슬라이드에 적지 않고 발표자가 말로 전한다. 수치가 필요하면 docs/deck-script.md를 본다.
// 특허 서지(출원·등록번호, 청구항 수, 발명자)는 성능이 아니라 문서의 신원이므로 남긴다.

export type Block =
  | { kind: "points"; items: { lead: string; text: string }[] }
  | { kind: "bib"; rows: { term: string; desc: string }[] }
  | { kind: "table"; head: string[]; rows: string[][] };

export type FigureKey =
  | "rgb-gap"
  | "squeezeface"
  | "cloudnet"
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
          { lead: "핵심 아이디어", text: "데이터 중심의 멀티 모달 융합" },
          { lead: "구성", text: "2개 주제 · 4편 연구 · 지도교수 김성환" },
        ],
      },
    ],
  },
  {
    id: "s02",
    chapter: "dissertation",
    eyebrow: "박사논문 · 문제",
    title: "2D RGB 카메라의 한계",
    blocks: [
      {
        kind: "points",
        items: [
          {
            lead: "누구인지 또는 진짜인지 (얼굴 인식)",
            text: "모방 공격에 취약 · 조명 변화에 취약",
          },
          {
            lead: "얼마나 큰지 (치수 측정)",
            text: "픽셀 거리 ≠ 실제 거리 · 기준 정보가 없으면 치수 측정 불가",
          },
        ],
      },
    ],
    figure: "rgb-gap",
  },
  {
    id: "s03",
    chapter: "dissertation",
    eyebrow: "박사논문 · Theme I",
    title: "SqueezeFace · 얼굴 인식",
    blocks: [
      {
        kind: "points",
        items: [
          { lead: "입력", text: "RGB · 깊이맵 · 포인트 클라우드를 7채널로" },
          { lead: "구조", text: "ResNet-34 · SAC Block" },
          {
            lead: "손실",
            text: "Additive Large Margin Loss로 클래스 간 분리도 확대",
          },
        ],
      },
    ],
    figure: "squeezeface",
  },
  {
    id: "s04",
    chapter: "dissertation",
    eyebrow: "박사논문 · Theme I",
    title: "CloudNet · 진위 판별",
    blocks: [
      {
        kind: "points",
        items: [
          { lead: "데이터셋", text: "LDFAS: 조건 3구간을 직접 구축" },
          { lead: "구조", text: "RGB Layer와 LiDAR Layer를 따로 학습" },
          { lead: "융합", text: "초기 + 후기 하이브리드" },
        ],
      },
    ],
    figure: "cloudnet",
  },
  {
    id: "s05",
    chapter: "dissertation",
    eyebrow: "박사논문 · Theme II",
    title: "옷 한 장의 치수를 자동으로 측정",
    blocks: [
      {
        kind: "points",
        items: [
          {
            lead: "치수점 검출",
            text: "HRNet-W48 · DeepFashion2 Dataset Fine-tuning",
          },
          {
            lead: "실거리 계산",
            text: "치수점까지의 거리 + 끼인각 (코사인법칙 적용)",
          },
        ],
      },
    ],
    figure: "garment",
  },
  {
    id: "s06",
    chapter: "dissertation",
    eyebrow: "박사논문 · Theme II",
    title: "인체 치수(둘레) 측정",
    blocks: [
      {
        kind: "points",
        items: [
          {
            lead: "표면이 굽어 있다",
            text: "정면과 측면 반둘레를 회귀로 합성",
          },
          {
            lead: "키포인트가 옷에 가려 있다",
            text: "가슴 · 허리 · 엉덩이 · 둔부 · 대퇴골 등",
          },
          {
            lead: "점이 몸이 아니라 배경에 찍힌다",
            text: "Canny Edge Detection 기반 치수점 위치 보정",
          },
        ],
      },
    ],
    figure: "body",
  },
  {
    id: "s07",
    chapter: "dissertation",
    eyebrow: "박사논문 · 종합",
    title: "정리",
    blocks: [
      {
        kind: "table",
        head: ["연구", "RGB의 한계", "LiDAR 활용", "모델 쪽 설계"],
        rows: [
          ["SqueezeFace", "분리도 부족", "표면 굴곡", "SAC Block"],
          ["CloudNet", "조명에 취약", "조명 불변 깊이", "하이브리드 융합"],
          ["의류 계측", "실거리 없음", "절대 거리", "Data Augmentation"],
          ["인체 계측", "실거리 · 가림", "절대 거리", "치수점 위치 보정"],
        ],
      },
    ],
  },
  {
    id: "s08",
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
            text: "2D · 3D 수집 → 핵심점 한 쌍 → 기준 포인트 식별 → 둘레 측정",
          },
        ],
      },
    ],
    figure: "patent1-flow",
  },
  {
    id: "s09",
    chapter: "patent-1",
    eyebrow: "특허 · 출원",
    title: "이 특허의 권리범위",
    blocks: [
      {
        kind: "points",
        items: [
          {
            lead: "기준 포인트 보정 (6 · 7항)",
            text: "배경면과 최근접점의 중간 지점을 기준으로 보정",
          },
          {
            lead: "전 · 후방 합산 (8 · 9항)",
            text: "인접 점 유클리드 거리 합 · 전방과 후방을 각각 구해 합산",
          },
          {
            lead: "검출 모델 (2 · 3 · 5항)",
            text: "LiDAR 촬영 · HRNet 기반",
          },
        ],
      },
    ],
    figure: "patent1-core",
  },
  {
    id: "s10",
    chapter: "patent-2",
    eyebrow: "특허 · 출원 및 등록",
    title: "영상 데이터 융합을 통한 얼굴의 부위별 주름 검출 장치 및 방법",
    blocks: [
      {
        kind: "bib",
        rows: [
          { term: "출원", desc: "10-2024-0174052 (2024.11.28)" },
          { term: "등록", desc: "10-2836534 (2025.07.16) · 공고 2025.07.22" },
          { term: "청구항", desc: "총 4항" },
          { term: "특허권자", desc: "㈜머스트리" },
          { term: "발명자", desc: "김성환, 이용학, 노태욱" },
        ],
      },
      {
        kind: "points",
        items: [
          {
            lead: "장치 구성",
            text: "2D 컬러 영상 입력부 · 3D 깊이 영상 입력부 · 얼굴 특징점 영상 생성부 · 주름 영역 결정부 · 주름 상태 결정부",
          },
        ],
      },
    ],
    figure: "patent2-flow",
  },
  {
    id: "s11",
    chapter: "patent-2",
    eyebrow: "특허 · 출원 및 등록",
    title: "이 특허의 권리범위",
    blocks: [
      {
        kind: "points",
        items: [
          {
            lead: "2단 랜드마크 (1 · 3항)",
            text: "1차 눈 · 코 · 입 → 2차 부위별 주름 영역",
          },
          {
            lead: "영역과 상태 결정",
            text: "2D 특징점 + 3D 깊이 정합 → 포인트 클라우드 → U-Net → 형상과 구간별 깊이",
          },
          {
            lead: "응용 (7항)",
            text: "팔자주름으로 신체적 나이 추정",
          },
        ],
      },
    ],
    figure: "patent2-core",
  },
];
