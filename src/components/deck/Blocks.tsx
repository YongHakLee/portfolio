import type { Block } from "@/data/deck";

/* 슬라이드 본문 블록 네 가지. 새 모양이 필요하면 Block 유니온과 여기만 늘린다. */
export default function Blocks({ blocks }: { blocks: Block[] }) {
  return (
    <>
      {blocks.map((block, i) => {
        switch (block.kind) {
          case "points":
            return (
              <ul key={i} className="deck-points">
                {block.items.map((it) => (
                  <li key={it.lead}>
                    <strong>{it.lead}</strong>
                    <span> — {it.text}</span>
                  </li>
                ))}
              </ul>
            );
          case "bib":
            return (
              <dl key={i} className="deck-bib">
                {block.rows.map((r) => (
                  <div key={r.term}>
                    <dt>{r.term}</dt>
                    <dd>{r.desc}</dd>
                  </div>
                ))}
              </dl>
            );
          case "table":
            return (
              <table key={i} className="deck-table">
                <thead>
                  <tr>
                    {block.head.map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {block.rows.map((row) => (
                    <tr key={row[0]}>
                      {row.map((cell, j) => (
                        <td key={j}>{cell}</td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            );
        }
      })}
    </>
  );
}
