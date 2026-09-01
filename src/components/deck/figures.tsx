import type { FC } from "react";
import type { FigureKey } from "@/data/deck";

/* 도식은 인라인 SVG로만 그린다. 색은 currentColor, var(--accent), var(--hairline)
   (채우기로, .fig-fill 경유)만 쓰는 사이트 토큰이라 화면과 인쇄에서 같은 색이 나온다.
   공통 선·글자 스타일은 deck.css의 .deck-fig 블록에 모여 있고, 개별적으로 필요한
   경우에 한해 인라인 SVG 속성을 쓴다. */

const RgbGap = () => (
  <svg viewBox="0 0 460 132" role="img" aria-labelledby="fig-rgbgap">
    <title id="fig-rgbgap">RGB에서는 같아 보이고, 깊이에서는 갈린다</title>

    <text x="0" y="10">RGB로 보면</text>
    <rect x="0" y="20" width="60" height="60" rx="4" />
    <rect x="84" y="20" width="60" height="60" rx="4" />
    <text x="68" y="55">=</text>
    <text x="0" y="96">사람</text>
    <text x="84" y="96">사진</text>

    <text x="180" y="10">깊이로 보면</text>
    <path className="fig-accent" d="M180 76 q30 -36 60 0" />
    <line className="fig-accent" x1="264" y1="76" x2="324" y2="76" />
    <text x="248" y="55">≠</text>
    <text x="180" y="96">굴곡</text>
    <text x="264" y="96">평면</text>

    <line x1="360" y1="14" x2="360" y2="112" />
    <text x="380" y="16">픽셀 ≠ 거리</text>
    <rect x="380" y="26" width="72" height="52" rx="4" />
    <line className="fig-accent" x1="380" y1="90" x2="452" y2="90" />
    <text className="fig-em" x="398" y="106">? mm</text>
  </svg>
);

const Theme1 = () => (
  <svg viewBox="0 0 460 116" role="img" aria-labelledby="fig-theme1">
    <title id="fig-theme1">SqueezeFace의 7채널 입력과 CloudNet의 하이브리드 융합</title>

    <text x="0" y="10">SqueezeFace</text>
    <rect x="0" y="20" width="58" height="16" />
    <text x="6" y="32">RGB 3ch</text>
    <rect x="0" y="42" width="58" height="16" />
    <text x="6" y="54">Depth 1ch</text>
    <rect x="0" y="64" width="58" height="16" />
    <text x="6" y="76">Cloud 3ch</text>
    <line x1="58" y1="50" x2="80" y2="50" />
    <rect x="80" y="32" width="62" height="36" />
    <text x="86" y="54">SAC + R34</text>
    <line x1="142" y1="50" x2="162" y2="50" />
    <text className="fig-em" x="162" y="54">얼굴 식별</text>

    <line x1="234" y1="10" x2="234" y2="100" />

    <text x="252" y="10">CloudNet</text>
    <rect x="252" y="22" width="56" height="20" />
    <text x="258" y="36">RGB 망</text>
    <rect x="252" y="56" width="56" height="20" />
    <text x="258" y="70">LiDAR 망</text>
    <path d="M308 32 h14 v34 h-14" />
    <path d="M308 66 h14" />
    <rect x="322" y="39" width="40" height="20" />
    <text x="328" y="53">융합</text>

    {/* 막대 길이 비율만 보여주고 값은 말로 전한다 */}
    <text x="376" y="30">조명이 바뀔 때 오차</text>
    <rect className="fig-fill" x="376" y="38" width="72" height="9" />
    <text x="376" y="58">RGB 단독</text>
    <rect className="fig-fill" x="376" y="66" width="24" height="9" />
    <text className="fig-em" x="376" y="86">CloudNet</text>
  </svg>
);

const Garment = () => (
  <svg viewBox="0 0 460 116" role="img" aria-labelledby="fig-garment">
    <title id="fig-garment">치수점 두 개, 그리고 픽셀이 아닌 포인트 클라우드 위의 거리</title>

    <path d="M56 20 l24 -10 h44 l24 10 -14 22 -10 -5 v55 h-44 v-55 l-10 5 z" />
    <circle className="fig-accent" cx="80" cy="48" r="4" />
    <circle className="fig-accent" cx="124" cy="48" r="4" />
    <line className="fig-accent" x1="80" y1="48" x2="124" y2="48" />
    <text x="42" y="108">HRNet-W48 치수점</text>

    <line x1="212" y1="10" x2="212" y2="100" />

    <text x="238" y="32">같은 두 점을</text>
    <text x="238" y="56">픽셀 격자에서 재면</text>
    <text x="392" y="56">px</text>
    <text x="238" y="80">포인트 클라우드에서 재면</text>
    <text className="fig-em" x="392" y="80">cm</text>
    <line x1="238" y1="64" x2="440" y2="64" />
  </svg>
);

const Body = () => (
  <svg viewBox="0 0 460 116" role="img" aria-labelledby="fig-body">
    <title id="fig-body">정면·측면 반둘레 합성과 깊이맵 기반 키포인트 보정</title>

    <text x="0" y="10">정면 Cf</text>
    <path className="fig-accent" d="M18 22 q-16 26 0 52" />
    <text x="88" y="10">측면 Cs</text>
    <path className="fig-accent" d="M102 22 q16 26 0 52" />
    <text x="52" y="52">+</text>
    <line x1="0" y1="86" x2="136" y2="86" />
    <text className="fig-em" x="0" y="104">Ct = β(Cf + Cs) + ε</text>

    <line x1="176" y1="10" x2="176" y2="100" />

    <text x="198" y="10">깊이맵 보정</text>
    <path d="M244 22 q-26 32 0 64" />
    <text x="252" y="44">몸 표면</text>
    <circle className="fig-accent" cx="206" cy="54" r="4" />
    <text x="186" y="78">배경에 찍힌 점</text>
    <line className="fig-accent" x1="212" y1="54" x2="230" y2="54" />
    <circle cx="236" cy="54" r="4" />

    <text x="332" y="54">메시 복원 없이</text>
  </svg>
);

const P1_STEPS = [
  { no: "310", step: "①", label: "2D · 3D 수집" },
  { no: "330", step: "②", label: "핵심점 한 쌍" },
  { no: "350", step: "③", label: "기준 포인트" },
  { no: "370", step: "④", label: "둘레 측정" },
];

const Patent1Flow = () => (
  <svg viewBox="0 0 460 116" role="img" aria-labelledby="fig-p1flow">
    <title id="fig-p1flow">청구항 1의 네 단계와 장치의 네 구성부</title>

    <text x="0" y="14">청구항 1 — 방법 / 청구항 10 — 장치</text>
    {P1_STEPS.map((s, i) => (
      <g key={s.no}>
        <rect x={i * 116} y="30" width="96" height="44" rx="3" />
        <text x={i * 116 + 10} y="50">
          {s.step} {s.label}
        </text>
        <text className="fig-em" x={i * 116 + 10} y="68">
          {s.no}
        </text>
        {i < P1_STEPS.length - 1 && (
          <line x1={i * 116 + 96} y1="52" x2={i * 116 + 116} y2="52" />
        )}
      </g>
    ))}
    <text x="0" y="98">
      데이터 수집부 · 핵심점 검출부 · 기준점 식별부 · 신체 둘레 측정부
    </text>
  </svg>
);

const Patent1Core = () => (
  <svg viewBox="0 0 460 116" role="img" aria-labelledby="fig-p1core">
    <title id="fig-p1core">배경면 기준 중간 지점 보정과 전·후방 둘레 합산</title>

    <text x="0" y="10">기준 포인트 보정 (6 · 7항)</text>
    <line x1="0" y1="22" x2="0" y2="94" />
    <text x="6" y="92">배경면</text>
    <path d="M96 24 q34 32 0 64" />
    <text x="102" y="24">몸 표면</text>
    <line className="fig-accent" x1="0" y1="56" x2="96" y2="56" strokeDasharray="3 3" />
    <circle className="fig-accent" cx="48" cy="56" r="4" />
    <text className="fig-em" x="22" y="74">중간 지점</text>

    <line x1="212" y1="10" x2="212" y2="100" />

    <text x="238" y="10">전 · 후방 합산 (8 · 9항)</text>
    <path className="fig-accent" d="M282 24 q-40 32 0 64" />
    <path d="M282 24 q40 32 0 64" />
    <text x="228" y="60">전방</text>
    <text x="298" y="60">후방</text>
    <text className="fig-em" x="342" y="52">Σ ‖ pᵢ₊₁ − pᵢ ‖</text>
    <text x="342" y="72">인접 점 간 유클리드 거리</text>
  </svg>
);

const Patent2Flow = () => (
  <svg viewBox="0 0 460 108" role="img" aria-labelledby="fig-p2flow">
    <title id="fig-p2flow">2D 컬러와 3D 깊이를 정합해 부위별 주름 영역을 정한다</title>

    <rect x="0" y="16" width="96" height="28" rx="3" />
    <text x="10" y="34">2D 컬러 영상</text>
    <rect x="0" y="58" width="96" height="28" rx="3" />
    <text x="10" y="76">3D 깊이 영상</text>
    <path d="M96 30 h20 v42 h-20" />
    <path d="M96 72 h20" />
    <rect x="116" y="37" width="60" height="28" rx="3" />
    <text x="126" y="55">정합</text>
    <line x1="176" y1="51" x2="196" y2="51" />
    <rect x="196" y="37" width="104" height="28" rx="3" />
    <text x="206" y="55">포인트 클라우드</text>
    <line x1="300" y1="51" x2="320" y2="51" />
    <rect className="fig-accent" x="320" y="37" width="132" height="28" rx="3" />
    <text className="fig-em" x="330" y="55">부위별 주름 영역</text>
    <text x="196" y="86">길이 · 깊이 · 밀도로 영역 확정</text>
  </svg>
);

const Patent2Core = () => (
  <svg viewBox="0 0 460 124" role="img" aria-labelledby="fig-p2core">
    <title id="fig-p2core">1차·2차 랜드마크와 팔자주름의 구간별 깊이</title>

    <text x="0" y="10">1차 — 눈 · 코 · 입</text>
    <path d="M60 18 q34 0 34 38 0 38 -34 52 -34 -14 -34 -52 0 -38 34 -38 z" />
    <circle cx="46" cy="46" r="3" />
    <circle cx="74" cy="46" r="3" />
    <circle cx="60" cy="62" r="3" />
    <path d="M46 80 q14 8 28 0" />
    <path className="fig-accent" d="M44 60 q-6 16 2 26" />
    <path className="fig-accent" d="M76 60 q6 16 -2 26" />
    <text className="fig-em" x="0" y="120">2차 — 부위별 주름 영역 (팔자주름)</text>

    <line x1="180" y1="10" x2="180" y2="104" />

    <text x="204" y="10">U-Net → 형상 + 구간별 깊이</text>
    <polyline
      className="fig-accent"
      points="204,38 232,64 260,48 288,70 316,42 344,60 372,38"
    />
    <line x1="204" y1="84" x2="372" y2="84" />
    <text x="204" y="98">구간</text>
    <text x="386" y="56">깊이</text>
    <text x="204" y="120">팔자주름 → 얼굴노화분석 모델 → 신체적 나이</text>
  </svg>
);

const FIGURES: Record<FigureKey, FC> = {
  "rgb-gap": RgbGap,
  theme1: Theme1,
  garment: Garment,
  body: Body,
  "patent1-flow": Patent1Flow,
  "patent1-core": Patent1Core,
  "patent2-flow": Patent2Flow,
  "patent2-core": Patent2Core,
};

export function Figure({ name }: { name: FigureKey }) {
  const Fig = FIGURES[name];
  return (
    <div className="deck-fig">
      <Fig />
    </div>
  );
}
