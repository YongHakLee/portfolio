import type { Metadata } from "next";
import Link from "next/link";

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
    </>
  );
}
