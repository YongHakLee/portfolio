"use client";

/* 브라우저 인쇄 대화상자를 연다. 거기서 "PDF로 저장"을 고르면 PDF가 된다.
   인쇄 결과에는 이 버튼이 나오지 않도록 .no-print를 단다. */
export default function PrintButton({ label = "인쇄 · PDF로 저장" }: { label?: string }) {
  return (
    <button
      type="button"
      onClick={() => window.print()}
      className="no-print border border-hairline px-3 py-1.5 text-[12.5px] font-semibold text-muted transition-colors hover:border-accent hover:text-accent"
    >
      {label}
    </button>
  );
}
