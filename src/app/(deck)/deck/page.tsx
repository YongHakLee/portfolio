import type { Metadata } from "next";
import Link from "next/link";
import { slides } from "@/data/deck";
import Slide from "@/components/deck/Slide";

export const metadata: Metadata = {
  title: "발표",
  description: "박사논문과 특허 2건을 5분에 설명하는 슬라이드",
};

export default function DeckPage() {
  return (
    <>
      <Link href="/" className="deck-back no-print">
        ← 사이트로
      </Link>
      <div className="deck-stage">
        {slides.map((slide, i) => (
          <Slide
            key={slide.id}
            slide={slide}
            no={i + 1}
            total={slides.length}
            active={i === 0}
          />
        ))}
      </div>
    </>
  );
}
