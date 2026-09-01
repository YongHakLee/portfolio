"use client";

import { useEffect, useState } from "react";
import { chapters, slides, type ChapterKey } from "@/data/deck";
import Slide from "./Slide";

const LAST = slides.length - 1;

const chapterStart = (key: ChapterKey) => slides.findIndex((s) => s.chapter === key);
const chapterCount = (key: ChapterKey) => slides.filter((s) => s.chapter === key).length;

export default function DeckViewer() {
  const [index, setIndex] = useState(0);
  // 정적 내보내기라 서버는 해시를 모른다. 첫 렌더 뒤에 맞춘다.
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const i = slides.findIndex((s) => s.id === window.location.hash.slice(1));
    // 마운트 직후 한 번, URL(외부 시스템)의 해시와 동기화한다.
    // 정적 export라 서버 렌더는 항상 0번이므로 여기서 어긋나도 하이드레이션 불일치는 없다.
    // eslint-disable-next-line react-hooks/set-state-in-effect -- 외부 시스템(URL) 동기화
    if (i >= 0) setIndex(i);
    setReady(true);
  }, []);

  // 발표 중 새로고침해도 자리를 잃지 않게 해시를 따라 붙인다.
  // pushState가 아니라 replaceState라 뒤로가기 이력을 더럽히지 않는다.
  useEffect(() => {
    if (!ready) return;
    window.history.replaceState(null, "", `#${slides[index].id}`);
  }, [index, ready]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.metaKey || e.ctrlKey || e.altKey || e.shiftKey) return;
      if (e.key === "ArrowRight" || e.key === " " || e.key === "PageDown") {
        e.preventDefault();
        setIndex((i) => Math.min(i + 1, LAST));
      } else if (e.key === "ArrowLeft" || e.key === "PageUp") {
        e.preventDefault();
        setIndex((i) => Math.max(i - 1, 0));
      } else if (e.key === "Home") {
        e.preventDefault();
        setIndex(0);
      } else if (e.key === "End") {
        e.preventDefault();
        setIndex(LAST);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const current = slides[index];

  return (
    <>
      <div className="deck-stage">
        {slides.map((slide, i) => (
          <Slide
            key={slide.id}
            slide={slide}
            no={i + 1}
            total={slides.length}
            active={i === index}
          />
        ))}
      </div>

      <nav className="deck-chrome no-print" aria-label="슬라이드 이동">
        <button
          type="button"
          className="deck-arrow"
          onClick={(e) => {
            setIndex((i) => Math.max(i - 1, 0));
            // 발표 중 Space가 항상 다음 장을 뜻하도록 포커스를 놓는다.
            (e.currentTarget as HTMLButtonElement).blur();
          }}
          disabled={index === 0}
          aria-label="이전 슬라이드"
        >
          ←
        </button>

        {/* 구간 폭은 슬라이드 개수 비율이다 (시간 비율이 아니다).
            chapters와 slides는 서로 다른 export라 어긋날 수 있다. 슬라이드가 없는
            챕터가 생기면 chapterStart가 -1을 돌려주므로, 버튼을 비활성화해
            setIndex(-1)로 이어지지 않게 막는 방어 코드다. */}
        <ul className="deck-bar">
          {chapters.map((c) => {
            const start = chapterStart(c.key);
            return (
              <li key={c.key} style={{ flexGrow: chapterCount(c.key) }}>
                <button
                  type="button"
                  onClick={(e) => {
                    if (start >= 0) setIndex(start);
                    // 발표 중 Space가 항상 다음 장을 뜻하도록 포커스를 놓는다.
                    (e.currentTarget as HTMLButtonElement).blur();
                  }}
                  disabled={start < 0}
                  aria-current={current.chapter === c.key}
                >
                  {c.label}
                </button>
              </li>
            );
          })}
        </ul>

        <button
          type="button"
          className="deck-arrow"
          onClick={(e) => {
            setIndex((i) => Math.min(i + 1, LAST));
            // 발표 중 Space가 항상 다음 장을 뜻하도록 포커스를 놓는다.
            (e.currentTarget as HTMLButtonElement).blur();
          }}
          disabled={index === LAST}
          aria-label="다음 슬라이드"
        >
          →
        </button>
      </nav>
    </>
  );
}
