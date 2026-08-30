import type { Metadata } from "next";
import { profile } from "@/data/profile";
import { publications, patents, rndProjects } from "@/data/research";
import {
  cvEducations,
  cvExperiences,
  cvSkills,
  cvReference,
  cvLastUpdated,
} from "@/data/cv";

export const metadata: Metadata = {
  title: "CV",
  description: "Academic curriculum vitae of YongHak Lee — computer vision and 3D measurement",
};

/* LaTeX 문서의 \section 처럼 얇은 밑줄이 달린 제목.
   섹션 전체를 print-avoid-break로 묶으면 Publications처럼 긴 섹션이 통째로 다음 장으로
   밀려 앞 쪽이 비므로, 페이지 넘김은 항목(Numbered) 단위로만 막는다. */
function CvSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mt-9">
      <h2 className="border-b border-ink pb-1 text-[17px] font-semibold tracking-tight">{title}</h2>
      <div className="mt-3 pl-4 sm:pl-6">{children}</div>
    </section>
  );
}

/* [1] 처럼 매달린 번호 + 본문 (LaTeX enumerate의 hanging indent) */
function Numbered({ n, children }: { n: number; children: React.ReactNode }) {
  return (
    <li className="flex gap-2.5 print-avoid-break">
      <span className="shrink-0 tabular-nums">[{n}]</span>
      <span className="flex-1">{children}</span>
    </li>
  );
}

export default function CvPage() {
  return (
    <div className="pt-14 pb-6 font-serif">
      <header className="print-avoid-break">
        <h1 className="text-[30px] font-semibold tracking-tight">{profile.nameEn}</h1>
        <p className="mt-2 text-[13.5px] text-muted">
          Email:{" "}
          <a
            href={`mailto:${profile.email}`}
            className="underline decoration-hairline underline-offset-4"
          >
            {profile.email}
          </a>
        </p>
      </header>

      <CvSection title="Education">
        <ul className="space-y-1.5 text-[14px] leading-relaxed">
          {cvEducations.map((e) => (
            <li key={e.degree}>
              {e.degree}, {e.institution}, {e.date}.
            </li>
          ))}
        </ul>
      </CvSection>

      <CvSection title="Experiences">
        <ul className="space-y-1.5 text-[14px] leading-relaxed">
          {cvExperiences.map((x) => (
            <li key={x.position}>
              {x.position}, {x.organization}, {x.date}.
            </li>
          ))}
        </ul>
      </CvSection>

      <CvSection title="Publications">
        <ol className="space-y-2.5 text-[14px] leading-[1.6]">
          {publications.map((p, i) => (
            <Numbered key={p.title} n={i + 1}>
              {p.authors} ({p.year}) <span className="font-semibold">{p.title}</span>, {p.venue}.
            </Numbered>
          ))}
        </ol>
        <p className="mt-4 text-[13px] text-muted">* Corresponding author.</p>
      </CvSection>

      <CvSection title="Patents">
        <ol className="space-y-2.5 text-[14px] leading-[1.6]">
          {patents.map((p, i) => (
            <Numbered key={p.titleEn} n={i + 1}>
              {p.inventorsEn}, <span className="font-semibold">&ldquo;{p.titleEn}&rdquo;</span>,{" "}
              {p.registeredEn ? `${p.registeredEn} (${p.appliedEn})` : p.appliedEn}, Korean
              Intellectual Property Office, {p.status === "등록" ? "Registered" : "Filed"}.
            </Numbered>
          ))}
        </ol>
      </CvSection>

      <CvSection title="Research Projects">
        <p className="text-[14px] leading-relaxed text-muted">
          Participating researcher on the following government-funded national R&amp;D projects.
        </p>
        <ol className="mt-2.5 space-y-2.5 text-[14px] leading-[1.6]">
          {rndProjects.map((r, i) => (
            <Numbered key={r.titleEn} n={i + 1}>
              <span className="font-semibold">&ldquo;{r.titleEn}&rdquo;</span>, {r.periodEn}.
            </Numbered>
          ))}
        </ol>
      </CvSection>

      <CvSection title="Technical Skills">
        <ul className="space-y-1.5 text-[14px] leading-[1.6]">
          {cvSkills.map((s) => (
            <li key={s.label}>
              <span className="font-semibold">{s.label}:</span> {s.detail}
            </li>
          ))}
        </ul>
      </CvSection>

      <CvSection title="References">
        <div className="text-[14px] leading-[1.7] print-avoid-break">
          <p className="font-semibold">
            {cvReference.name}{" "}
            <span className="font-normal text-muted">({cvReference.note})</span>
          </p>
          {cvReference.lines.map((line) => (
            <p key={line}>{line}</p>
          ))}
          <p>
            Email:{" "}
            <a
              href={`mailto:${cvReference.email}`}
              className="underline decoration-hairline underline-offset-4"
            >
              {cvReference.email}
            </a>
          </p>
        </div>
      </CvSection>

      <p className="mt-12 text-center text-[13px] text-faint">
        ∼∼∼ Last updated: {cvLastUpdated} ∼∼∼
      </p>
    </div>
  );
}
