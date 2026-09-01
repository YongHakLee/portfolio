import type { FC } from "react";
import type { FigureKey } from "@/data/deck";

/* 도식은 인라인 SVG로만 그린다. 색은 currentColor와 var(--accent)만 쓰므로
   화면과 인쇄에서 같은 색이 나오고 사이트 토큰과 따로 놀지 않는다.
   선·글자 스타일은 deck.css의 .deck-fig 블록에 모여 있다. */

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
    <text className="fig-em" x="162" y="46">99.88%</text>
    <text x="162" y="62">F1 0.9345</text>

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

    <text x="376" y="30">ACER 열화</text>
    <rect className="fig-fill" x="376" y="38" width="72" height="9" />
    <text x="376" y="58">RGB 단독 +0.40 · +0.41</text>
    <rect className="fig-fill" x="376" y="66" width="24" height="9" />
    <text className="fig-em" x="376" y="86">CloudNet +0.13 · +0.15</text>
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

    <text className="fig-em" x="332" y="44">{"허리 · 엉덩이 < 4%"}</text>
    <text x="332" y="64">1회 0.7초 · 메시 복원 없이</text>
  </svg>
);

const FIGURES: Record<FigureKey, FC> = {
  "rgb-gap": RgbGap,
  theme1: Theme1,
  garment: Garment,
  body: Body,
  "patent1-flow": RgbGap,
  "patent1-core": RgbGap,
  "patent2-flow": RgbGap,
  "patent2-core": RgbGap,
};

export function Figure({ name }: { name: FigureKey }) {
  const Fig = FIGURES[name];
  return (
    <div className="deck-fig">
      <Fig />
    </div>
  );
}
