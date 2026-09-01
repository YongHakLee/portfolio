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

const FIGURES: Record<FigureKey, FC> = {
  "rgb-gap": RgbGap,
  theme1: RgbGap,
  garment: RgbGap,
  body: RgbGap,
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
