import type { Metadata } from "next";
import Link from "next/link";
import SectionHeading from "@/components/SectionHeading";
import { asset } from "@/lib/paths";
import { profile } from "@/data/profile";
import { careers, educations, certificates, skills } from "@/data/career";
import { projects } from "@/data/projects";
import { publications, patents, rndProjects } from "@/data/research";

export const metadata: Metadata = {
  title: "이력서",
  description: "AI 엔지니어 · 응용통계학 박사 이용학의 이력서",
};

// 이력서에는 기여가 분명한 논문과 대표 저널 논문만 싣는다. 전체 목록은 포트폴리오·CV에 있다.
const FEATURED_TITLES = [
  "Topology-Constrained NeuroB-Rep",
  "A Two-Stage Diffusion Pipeline",
  "A Mobile LiDAR-Based",
  "Integrated Analytic Methodology",
];
const featured = publications.filter((p) =>
  FEATURED_TITLES.some((t) => p.title.startsWith(t)),
);

export default function ResumePage() {
  return (
    <div className="pt-14 pb-6">
      {/* 프로필 헤더 */}
      <header className="print-avoid-break">
        <div className="flex items-start gap-6">
          <img
            src={asset(profile.photo)}
            alt={`${profile.name} 프로필 사진`}
            className="w-24 h-24 object-cover"
          />
          <div>
            <h1 className="text-[26px] font-extrabold tracking-[-0.02em]">{profile.name}</h1>
            <p className="mt-1 text-[14px] text-muted">{profile.role}</p>
            <p className="mt-0.5 text-[13px] text-faint">{profile.focus}</p>
            <p className="mt-3 text-[13px]">
              <a
                href={`mailto:${profile.email}`}
                className="underline decoration-hairline underline-offset-4"
              >
                {profile.email}
              </a>
            </p>
          </div>
        </div>
      </header>

      {/* 01 소개 */}
      <section className="mt-12 print-avoid-break">
        <SectionHeading no="01" title="소개" />
        <div className="mt-4 space-y-2 text-[14.5px] leading-[1.75]">
          {profile.intro.map((line) => (
            <p key={line}>{line}</p>
          ))}
        </div>
      </section>

      {/* 02 한눈에 보기 */}
      <section className="mt-12 print-avoid-break">
        <SectionHeading no="02" title="한눈에 보기" />
        <div className="mt-4 flex flex-wrap gap-x-10 gap-y-3">
          {profile.stats.map((s) => (
            <div key={s.label} className="flex items-baseline gap-2">
              <span className="text-[22px] font-extrabold text-accent tabular-nums">{s.value}</span>
              <span className="text-[12px] text-faint">{s.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* 03 경력 */}
      <section className="mt-12">
        <SectionHeading no="03" title="경력" />
        <div className="mt-4 space-y-7">
          {careers.map((c) => (
            <div key={c.company} className="print-avoid-break">
              <div className="flex items-baseline justify-between">
                <h3 className="text-[15px] font-bold">{c.company}</h3>
                <span className="text-[12px] text-faint tabular-nums">{c.period}</span>
              </div>
              <p className="mt-0.5 text-[13px] text-accent">{c.position}</p>
              <ul className="mt-2 space-y-1 text-[13.5px] leading-relaxed text-muted">
                {c.tasks.map((t) => (
                  <li key={t} className="flex gap-2">
                    <span aria-hidden className="text-hairline">—</span>
                    <span>{t}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* 04 학력 — 항목 단위로만 페이지를 넘기지 않게 한다(섹션 전체를 묶으면 앞 쪽에 큰 여백이 생김) */}
      <section className="mt-12">
        <SectionHeading no="04" title="학력" />
        <div className="mt-4 space-y-5">
          {educations.map((e) => (
            <div key={e.period} className="print-avoid-break">
              <div className="flex items-baseline justify-between">
                <h3 className="text-[15px] font-bold">{e.school}</h3>
                <span className="text-[12px] text-faint tabular-nums">{e.period}</span>
              </div>
              <p className="mt-0.5 text-[13.5px] text-muted">{e.degree}</p>
              {e.thesis && <p className="mt-1 text-[12.5px] text-faint">논문 — {e.thesis}</p>}
            </div>
          ))}
        </div>
      </section>

      {/* 05 기술 스택 */}
      <section className="mt-12 print-avoid-break">
        <SectionHeading no="05" title="기술 스택" />
        <div className="mt-4 space-y-2">
          {skills.map((s) => (
            <div key={s.label} className="flex gap-4">
              <span className="w-24 shrink-0 pt-px text-[12px] font-bold tracking-[0.08em] text-faint">
                {s.label}
              </span>
              <span className="flex-1 text-[13.5px] leading-[1.6] text-muted">
                {s.items.join(" · ")}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* 06 연구 · 프로젝트 */}
      <section className="mt-12">
        <SectionHeading no="06" title="연구 · 프로젝트" />

        <h3 className="mt-5 text-[12px] font-bold tracking-[0.12em] text-faint">대표 참여 논문</h3>
        <div className="mt-3 space-y-3 border-t border-hairline pt-3">
          {featured.map((p) => (
            <div key={p.title} className="print-avoid-break">
              <h4 className="text-[14px] font-bold leading-snug">{p.title}</h4>
              <p className="mt-0.5 text-[12.5px] text-muted">
                {p.venue} ({p.year}){p.role ? ` · ${p.role}` : ""}
              </p>
            </div>
          ))}
          <p className="text-[12.5px] text-faint">
            외 참여 논문 {publications.length - featured.length}편 —{" "}
            <Link href="/work#research" className="no-print font-semibold text-accent">
              전체 목록은 포트폴리오에서 →
            </Link>
            <span className="hidden print:inline">전체 목록은 포트폴리오 · CV 페이지 참조</span>
          </p>
        </div>

        <h3 className="mt-8 text-[12px] font-bold tracking-[0.12em] text-faint">특허</h3>
        <div className="mt-3 space-y-2 border-t border-hairline pt-3">
          {patents.map((p) => (
            <p key={p.title} className="text-[13px] leading-relaxed">
              <span className="text-faint">{p.status}</span>{" "}
              <span className="font-semibold">{p.title}</span>{" "}
              <span className="text-faint tabular-nums">— {p.registered ?? p.applied}</span>
            </p>
          ))}
        </div>

        <h3 className="mt-8 text-[12px] font-bold tracking-[0.12em] text-faint">
          국가 R&D 참여 {rndProjects.length}건
        </h3>
        <ul className="mt-3 space-y-1.5 border-t border-hairline pt-3">
          {rndProjects.map((r) => (
            <li key={r.title} className="flex items-baseline gap-3 text-[13px]">
              <span className="flex-1 leading-snug">{r.title}</span>
              <span className="shrink-0 text-[12px] text-faint tabular-nums">{r.period}</span>
            </li>
          ))}
        </ul>

        <h3 className="mt-8 text-[12px] font-bold tracking-[0.12em] text-faint">프로젝트</h3>
        <ul className="mt-3 space-y-1.5 border-t border-hairline pt-3">
          {projects.map((p) => (
            <li key={p.no} className="flex items-baseline gap-3 text-[13.5px]">
              <span className="text-[11px] font-bold text-accent tabular-nums">{p.no}</span>
              <span className="flex-1 leading-snug">{p.title}</span>
              <span className="shrink-0 text-[12px] text-faint tabular-nums">{p.period}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* 07 자격증 */}
      <section className="mt-12 print-avoid-break">
        <SectionHeading no="07" title="자격증" />
        <ul className="mt-4 space-y-2">
          {certificates.map((c) => (
            <li key={c.name} className="flex items-baseline gap-3 text-[13.5px]">
              <span className="flex-1">{c.name}</span>
              <span className="text-[12px] text-muted">{c.org}</span>
              <span className="text-[12px] text-faint tabular-nums">{c.date}</span>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
