import type { Slide as SlideData } from "@/data/deck";
import Blocks from "./Blocks";
import { Figure } from "./figures";

export default function Slide({
  slide,
  no,
  total,
  active,
}: {
  slide: SlideData;
  no: number;
  total: number;
  active: boolean;
}) {
  return (
    <section
      id={slide.id}
      data-slide={no}
      data-chapter={slide.chapter}
      className={`deck-slide${active ? " is-active" : ""}`}
    >
      <header className="deck-head">
        <span>{slide.eyebrow}</span>
        <span className="deck-count tabular-nums">
          {String(no).padStart(2, "0")} / {String(total).padStart(2, "0")}
        </span>
      </header>

      <div className="deck-body">
        <h2 className="deck-title">{slide.title}</h2>
        {slide.lead && <p className="deck-lead">{slide.lead}</p>}
        <Blocks blocks={slide.blocks} />
        {slide.figure && <Figure name={slide.figure} />}
      </div>
    </section>
  );
}
